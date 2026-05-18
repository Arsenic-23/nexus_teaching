import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AIProvider, AIProviderResponse } from './ai-provider.interface';

@Injectable()
export class AnthropicProvider implements AIProvider {
  private readonly logger = new Logger(AnthropicProvider.name);
  private client: any = null;

  constructor(private config: ConfigService) {}

  private getClient() {
    if (!this.client) {
      const apiKey = this.config.get<string>('ANTHROPIC_API_KEY');
      if (!apiKey) {
        throw new Error('ANTHROPIC_API_KEY not configured');
      }
      try {
        const { default: Anthropic } = require('@anthropic-ai/sdk');
        this.client = new Anthropic({ apiKey });
      } catch {
        throw new Error('@anthropic-ai/sdk package not installed. Run: pnpm add @anthropic-ai/sdk');
      }
    }
    return this.client;
  }

  async chat(
    messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
    options: { maxTokens?: number; temperature?: number; model?: string } = {},
  ): Promise<AIProviderResponse> {
    const start = Date.now();
    const client = this.getClient();
    const model = options.model || this.config.get<string>('ANTHROPIC_MODEL') || 'claude-3-haiku-20240307';

    // Separate system messages from conversation
    const systemMsg = messages.find((m) => m.role === 'system');
    const conversationMessages = messages.filter((m) => m.role !== 'system');

    const response = await client.messages.create({
      model,
      system: systemMsg?.content,
      messages: conversationMessages,
      max_tokens: options.maxTokens || 1000,
      temperature: options.temperature ?? 0.7,
    });

    const latencyMs = Date.now() - start;
    const content = response.content[0];

    return {
      content: content.type === 'text' ? content.text : '',
      model: response.model,
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
      latencyMs,
    };
  }
}
