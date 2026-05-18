export interface AIProvider {
  chat(
    messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
    options?: {
      maxTokens?: number;
      temperature?: number;
      model?: string;
    },
  ): Promise<AIProviderResponse>;
}

export interface AIProviderResponse {
  content: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  latencyMs: number;
}
