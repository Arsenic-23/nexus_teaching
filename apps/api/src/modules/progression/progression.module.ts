import { Module } from '@nestjs/common';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { MasteryService } from './mastery.service';
import { RetentionService } from './retention.service';
import { WeakAreasService } from './weak-areas.service';
import { RecommendationsService } from './recommendations.service';

@Module({
  controllers: [ProgressController],
  providers: [
    ProgressService,
    MasteryService,
    RetentionService,
    WeakAreasService,
    RecommendationsService,
  ],
  exports: [ProgressService, MasteryService, RetentionService],
})
export class ProgressionModule {}
