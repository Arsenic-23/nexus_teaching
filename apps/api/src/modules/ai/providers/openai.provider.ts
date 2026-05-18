import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AIProvider, AIProviderResponse } from './ai-provider.interface';

@Injectable()
export class OpenAIProvider implements AIProvider {
  private readonly logger = new Logger(OpenAIProvider.name);
  private client: any = null;

  constructor(private config: ConfigService) {}

  private getClient() {
    if (!this.client) {
      const apiKey = this.config.get<string>('OPENAI_API_KEY');
      if (!apiKey) {
        throw new Error('OPENAI_API_KEY not configured');
      }
      // Dynamic import to avoid hard dependency
      try {
        const { default: OpenAI } = require('openai');
        this.client = new OpenAI({ apiKey });
      } catch {
        throw new Error('openai package not installed. Run: pnpm add openai');
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
    const model = options.model || this.config.get<string>('OPENAI_MODEL') || 'gpt-4o-mini';

    const response = await client.chat.completions.create({
      model,
      messages,
      max_tokens: options.maxTokens || 1000,
      temperature: options.temperature ?? 0.7,
    });

    const latencyMs = Date.now() - start;
    const choice = response.choices[0];

    return {
      content: choice.message.content || '',
      model: response.model,
      inputTokens: response.usage?.prompt_tokens || 0,
      outputTokens: response.usage?.completion_tokens || 0,
      latencyMs,
    };
  }
}
