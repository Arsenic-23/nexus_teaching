import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser, CurrentUserPayload } from '../../common/decorators/current-user.decorator';
import { ClassroomsService } from './classrooms.service';
import { AssignmentsService } from './assignments.service';

@ApiTags('Classrooms')
@ApiBearerAuth()
@Controller('classrooms')
export class ClassroomsController {
  constructor(
    private readonly classroomsService: ClassroomsService,
    private readonly assignmentsService: AssignmentsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get classrooms for current user' })
  async getClassrooms(@CurrentUser() user: CurrentUserPayload) {
    if (user.role === 'TEACHER' && user.teacherProfileId) {
      const result = await this.classroomsService.getClassroomsForTeacher(user.teacherProfileId);
      return { data: result };
    }
    const result = await this.classroomsService.getClassroomsForStudent(user.studentProfileId!);
    return { data: result };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new classroom (teacher only)' })
  async createClassroom(
    @CurrentUser() user: CurrentUserPayload,
    @Body() body: { name: string; subject: string; description?: string; gradeLevel?: number },
  ) {
    const result = await this.classroomsService.createClassroom(user.teacherProfileId!, body);
    return { data: result };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get classroom details' })
  async getClassroom(@Param('id') id: string) {
    const result = await this.classroomsService.getClassroom(id);
    return { data: result };
  }

  @Post('join')
  @ApiOperation({ summary: 'Join a classroom by join code' })
  async joinClassroom(
    @CurrentUser() user: CurrentUserPayload,
    @Body() body: { joinCode: string },
  ) {
    const result = await this.classroomsService.joinClassroom(user.studentProfileId!, body.joinCode);
    return { data: result };
  }

  @Post(':id/leave')
  @ApiOperation({ summary: 'Leave a classroom' })
  async leaveClassroom(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const result = await this.classroomsService.leaveClassroom(user.studentProfileId!, id);
    return { data: result };
  }

  @Get(':id/students')
  @ApiOperation({ summary: 'Get students in a classroom' })
  async getStudents(@Param('id') id: string) {
    const result = await this.classroomsService.getStudents(id);
    return { data: result };
  }

  @Get(':id/analytics')
  @ApiOperation({ summary: 'Get classroom analytics' })
  async getClassAnalytics(@Param('id') id: string) {
    const result = await this.classroomsService.getClassAnalytics(id);
    return { data: result };
  }

  @Get(':id/assignments')
  @ApiOperation({ summary: 'Get assignments for a classroom' })
  async getAssignments(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const result = await this.assignmentsService.getAssignments(id, user.studentProfileId);
    return { data: result };
  }

  @Post(':id/assignments')
  @ApiOperation({ summary: 'Create an assignment (teacher only)' })
  async createAssignment(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
    @Body() body: {
      title: string;
      description?: string;
      type: string;
      topicId?: string;
      quizId?: string;
      lessonIds?: string[];
      dueDate?: string;
      maxAttempts?: number;
      passingScore?: number;
      xpBonus?: number;
    },
  ) {
    const result = await this.assignmentsService.createAssignment(id, user.teacherProfileId!, body);
    return { data: result };
  }
}
