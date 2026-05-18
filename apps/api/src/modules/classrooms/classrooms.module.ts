import { Module } from '@nestjs/common';
import { ClassroomsController } from './classrooms.controller';
import { ClassroomsService } from './classrooms.service';
import { AssignmentsController } from './assignments.controller';
import { AssignmentsService } from './assignments.service';

@Module({
  controllers: [ClassroomsController, AssignmentsController],
  providers: [ClassroomsService, AssignmentsService],
  exports: [ClassroomsService, AssignmentsService],
})
export class ClassroomsModule {}
