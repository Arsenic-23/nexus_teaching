import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CurrentUser, CurrentUserPayload } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { ClassroomsService } from './classrooms.service';
import { AssignmentsService } from './assignments.service';
import { CreateClassroomDto, JoinClassroomDto, CreateAssignmentDto, GradeSubmissionDto } from './dto/classroom.dto';

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
  @Roles('TEACHER')
  @ApiOperation({ summary: 'Create a new classroom (teacher only)' })
  async createClassroom(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: CreateClassroomDto,
  ) {
    const result = await this.classroomsService.createClassroom(user.teacherProfileId!, dto);
    return { data: result };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get classroom details' })
  async getClassroom(@Param('id') id: string) {
    const result = await this.classroomsService.getClassroom(id);
    return { data: result };
  }

  @Delete(':id')
  @Roles('TEACHER')
  @ApiOperation({ summary: 'Archive/deactivate a classroom (teacher only)' })
  async archiveClassroom(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const result = await this.classroomsService.archiveClassroom(id, user.teacherProfileId!);
    return { data: result };
  }

  @Post('join')
  @ApiOperation({ summary: 'Join a classroom by join code' })
  async joinClassroom(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: JoinClassroomDto,
  ) {
    const result = await this.classroomsService.joinClassroom(user.studentProfileId!, dto.joinCode);
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

  @Delete(':id/students/:studentId')
  @Roles('TEACHER')
  @ApiOperation({ summary: 'Remove a student from classroom (teacher only)' })
  async removeStudent(
    @Param('id') classroomId: string,
    @Param('studentId') studentId: string,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const result = await this.classroomsService.removeStudent(classroomId, studentId, user.teacherProfileId!);
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

  @Get(':id/leaderboard')
  @ApiOperation({ summary: 'Get classroom leaderboard' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getLeaderboard(
    @Param('id') id: string,
    @Query('limit') limit?: number,
  ) {
    const result = await this.classroomsService.getClassLeaderboard(id, limit);
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
  @Roles('TEACHER')
  @ApiOperation({ summary: 'Create an assignment (teacher only)' })
  async createAssignment(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: CreateAssignmentDto,
  ) {
    const result = await this.assignmentsService.createAssignment(id, user.teacherProfileId!, dto);
    return { data: result };
  }
}
