import { Module } from '@nestjs/common';
import { AIController } from './ai.controller';
import { AIService } from './ai.service';
import { TutorService } from './tutor.service';
import { HintsService } from './hints.service';
import { OpenAIProvider } from './providers/openai.provider';
import { AnthropicProvider } from './providers/anthropic.provider';

@Module({
  controllers: [AIController],
  providers: [
    AIService,
    TutorService,
    HintsService,
    OpenAIProvider,
    AnthropicProvider,
  ],
  exports: [AIService, TutorService, HintsService],
})
export class AIModule {}
