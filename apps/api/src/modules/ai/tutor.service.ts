import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ConfigService } from '@nestjs/config';
import { OpenAIProvider } from './providers/openai.provider';
import { AnthropicProvider } from './providers/anthropic.provider';
import { TUTOR_SYSTEM_PROMPT } from './prompts/system-prompts';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENTS, TutorSessionCreatedEvent } from '../../common/events/events';

@Injectable()
export class TutorService {
  private readonly logger = new Logger(TutorService.name);

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private openai: OpenAIProvider,
    private anthropic: AnthropicProvider,
    private eventEmitter: EventEmitter2,
  ) {}

  async createSession(
    studentProfileId: string,
    options?: { topicId?: string; lessonId?: string },
  ) {
    const session = await this.prisma.tutorSession.create({
      data: {
        studentId: studentProfileId,
        topicId: options?.topicId || null,
        lessonId: options?.lessonId || null,
        status: 'ACTIVE',
      },
    });

    // Add system message
    await this.prisma.tutorMessage.create({
      data: {
        sessionId: session.id,
        role: 'SYSTEM',
        content: TUTOR_SYSTEM_PROMPT,
      },
    });

    this.eventEmitter.emit(
      EVENTS.TUTOR_SESSION_CREATED,
      new TutorSessionCreatedEvent(studentProfileId, session.id),
    );

    return session;
  }

  async getSessions(studentProfileId: string) {
    return this.prisma.tutorSession.findMany({
      where: { studentId: studentProfileId },
      orderBy: { updatedAt: 'desc' },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });
  }

  async getSession(sessionId: string, studentProfileId: string) {
    const session = await this.prisma.tutorSession.findFirst({
      where: { id: sessionId, studentId: studentProfileId },
      include: {
        messages: {
          where: { role: { not: 'SYSTEM' } },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!session) throw new NotFoundException('Session not found');
    return session;
  }

  async sendMessage(
    sessionId: string,
    studentProfileId: string,
    message: string,
  ) {
    const session = await this.prisma.tutorSession.findFirst({
      where: { id: sessionId, studentId: studentProfileId, status: 'ACTIVE' },
      include: {
        messages: { orderBy: { createdAt: 'asc' } },
      },
    });

    if (!session) throw new NotFoundException('Active session not found');

    // Save user message
    await this.prisma.tutorMessage.create({
      data: {
        sessionId,
        role: 'USER',
        content: message,
      },
    });

    // Build messages for AI
    const aiMessages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> =
      session.messages
        .filter((m) => m.role !== 'SYSTEM')
        .map((m) => ({
          role: m.role === 'USER' ? 'user' : 'assistant',
          content: m.content,
        }));

    // Add new message
    aiMessages.push({ role: 'user', content: message });

    // Build context
    let contextPrompt = TUTOR_SYSTEM_PROMPT;
    if (session.topicId) {
      const topic = await this.prisma.topic.findUnique({
        where: { id: session.topicId },
        include: { subject: true },
      });
      if (topic) {
        contextPrompt += `\n\nCurrent topic: ${topic.name} (${topic.subject.name})`;
      }
    }

    const fullMessages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = [
      { role: 'system', content: contextPrompt },
      ...aiMessages,
    ];

    // Call AI provider
    const provider = this.getProvider();
    let aiResponse;
    const start = Date.now();

    try {
      aiResponse = await provider.chat(fullMessages, {
        maxTokens: 500,
        temperature: 0.7,
      });
    } catch (error: any) {
      this.logger.error(`AI call failed: ${error?.message}`);
      aiResponse = {
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        model: 'fallback',
        inputTokens: 0,
        outputTokens: 0,
        latencyMs: Date.now() - start,
      };
    }

    // Save assistant response
    const assistantMessage = await this.prisma.tutorMessage.create({
      data: {
        sessionId,
        role: 'ASSISTANT',
        content: aiResponse.content,
        model: aiResponse.model,
        tokensUsed: aiResponse.inputTokens + aiResponse.outputTokens,
        latencyMs: aiResponse.latencyMs,
      },
    });

    // Log usage
    const profile = await this.prisma.studentProfile.findUnique({
      where: { id: studentProfileId },
    });
    if (profile) {
      await this.prisma.aIUsageLog.create({
        data: {
          userId: profile.userId,
          provider: this.config.get('AI_PROVIDER') || 'openai',
          model: aiResponse.model,
          purpose: 'tutor_chat',
          inputTokens: aiResponse.inputTokens,
          outputTokens: aiResponse.outputTokens,
          cost: this.estimateCost(aiResponse.model, aiResponse.inputTokens, aiResponse.outputTokens),
          latencyMs: aiResponse.latencyMs,
          success: true,
        },
      });
    }

    // Update session timestamp
    await this.prisma.tutorSession.update({
      where: { id: sessionId },
      data: { updatedAt: new Date() },
    });

    return assistantMessage;
  }

  private getProvider() {
    const providerName = this.config.get<string>('AI_PROVIDER') || 'openai';
    return providerName === 'anthropic' ? this.anthropic : this.openai;
  }

  private estimateCost(model: string, inputTokens: number, outputTokens: number): number {
    // Rough cost estimates per 1K tokens
    const costs: Record<string, { input: number; output: number }> = {
      'gpt-4o-mini': { input: 0.000150, output: 0.000600 },
      'gpt-4o': { input: 0.005, output: 0.015 },
      'claude-3-haiku-20240307': { input: 0.00025, output: 0.00125 },
      'claude-3-sonnet-20240229': { input: 0.003, output: 0.015 },
    };

    const modelCost = costs[model] || { input: 0.001, output: 0.002 };
    return (inputTokens / 1000) * modelCost.input + (outputTokens / 1000) * modelCost.output;
  }
}
