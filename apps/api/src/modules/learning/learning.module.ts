import { Module } from '@nestjs/common';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { GamificationModule } from '../gamification/gamification.module';

@Module({
  imports: [GamificationModule],
  controllers: [
    SubjectsController,
    TopicsController,
    LessonsController,
    QuizzesController,
  ],
  providers: [
    SubjectsService,
    TopicsService,
    LessonsService,
    QuizzesService,
  ],
  exports: [LessonsService, QuizzesService],
})
export class LearningModule {}
