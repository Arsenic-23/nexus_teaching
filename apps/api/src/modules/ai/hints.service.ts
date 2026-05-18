import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { OpenAIProvider } from './providers/openai.provider';
import { AnthropicProvider } from './providers/anthropic.provider';
import { HINT_SYSTEM_PROMPT, EXPLANATION_SYSTEM_PROMPT } from './prompts/system-prompts';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HintsService {
  private readonly logger = new Logger(HintsService.name);

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private openai: OpenAIProvider,
    private anthropic: AnthropicProvider,
  ) {}

  async getHint(
    questionId: string,
    currentHintLevel: number,
    studentAnswer?: string,
  ) {
    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
    });

    if (!question) throw new NotFoundException('Question not found');

    // If question has pre-built hints, return them first
    if (question.hints && Array.isArray(question.hints)) {
      const hints = question.hints as string[];
      if (hints[currentHintLevel - 1]) {
        return {
          hint: hints[currentHintLevel - 1],
          hintLevel: currentHintLevel,
          source: 'cached',
        };
      }
    }

    // Generate hint with AI
    const prompt = `Question: ${question.stem}
${studentAnswer ? `Student's current answer: ${studentAnswer}` : ''}
Hint level requested: ${currentHintLevel} (${this.getHintLevelDescription(currentHintLevel)})

Provide a Level ${currentHintLevel} hint for this question.`;

    const provider = this.getProvider();
    try {
      const response = await provider.chat(
        [
          { role: 'system', content: HINT_SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        { maxTokens: 200, temperature: 0.5 },
      );

      return {
        hint: response.content,
        hintLevel: currentHintLevel,
        source: 'ai',
      };
    } catch (error: any) {
      this.logger.error(`Hint generation failed: ${error?.message}`);
      return {
        hint: 'Try reviewing the concept definitions related to this question.',
        hintLevel: currentHintLevel,
        source: 'fallback',
      };
    }
  }

  async getExplanation(conceptId: string, context?: string) {
    // conceptId could be a question ID or topic ID
    let conceptText = conceptId;

    const question = await this.prisma.question.findUnique({
      where: { id: conceptId },
    });

    if (question) {
      conceptText = `Question: ${question.stem}
Correct Answer: ${JSON.stringify(question.correctAnswer)}
${question.explanation ? `Explanation: ${question.explanation}` : ''}`;
    } else {
      const topic = await this.prisma.topic.findUnique({
        where: { id: conceptId },
        include: { subject: true },
      });
      if (topic) {
        conceptText = `Topic: ${topic.name} (${topic.subject.name})
${topic.description || ''}`;
      }
    }

    const prompt = `Explain the following:
${conceptText}
${context ? `\nStudent context: ${context}` : ''}

Provide a clear, educational explanation.`;

    const provider = this.getProvider();
    try {
      const response = await provider.chat(
        [
          { role: 'system', content: EXPLANATION_SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        { maxTokens: 600, temperature: 0.5 },
      );

      return { explanation: response.content };
    } catch (error: any) {
      this.logger.error(`Explanation generation failed: ${error?.message}`);
      return {
        explanation: question?.explanation || 'Please review the concept in your textbook.',
      };
    }
  }

  private getHintLevelDescription(level: number): string {
    switch (level) {
      case 1: return 'gentle nudge';
      case 2: return 'specific guidance';
      case 3: return 'near-complete walkthrough';
      default: return 'hint';
    }
  }

  private getProvider() {
    const providerName = this.config.get<string>('AI_PROVIDER') || 'openai';
    return providerName === 'anthropic' ? this.anthropic : this.openai;
  }
}
