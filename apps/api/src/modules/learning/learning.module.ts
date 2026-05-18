import { Module } from '@nestjs/common';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';

@Module({
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
