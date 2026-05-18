import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser, CurrentUserPayload } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { AssignmentsService } from './assignments.service';
import { GradeSubmissionDto } from './dto/classroom.dto';

@ApiTags('Assignments')
@ApiBearerAuth()
@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get assignment details' })
  async getAssignment(@Param('id') id: string) {
    const result = await this.assignmentsService.getAssignment(id);
    return { data: result };
  }

  @Post(':id/submit')
  @ApiOperation({ summary: 'Submit an assignment' })
  async submitAssignment(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
    @Body() body: unknown,
  ) {
    const result = await this.assignmentsService.submitAssignment(id, user.studentProfileId!, body);
    return { data: result };
  }

  @Patch(':id/submissions/:studentId/grade')
  @Roles('TEACHER')
  @ApiOperation({ summary: 'Grade a student submission (teacher only)' })
  async gradeSubmission(
    @Param('id') assignmentId: string,
    @Param('studentId') studentId: string,
    @Body() dto: GradeSubmissionDto,
  ) {
    const result = await this.assignmentsService.gradeSubmission(assignmentId, studentId, dto);
    return { data: result };
  }

  @Get(':id/submissions')
  @Roles('TEACHER')
  @ApiOperation({ summary: 'Get all submissions for an assignment (teacher only)' })
  async getSubmissions(@Param('id') assignmentId: string) {
    const result = await this.assignmentsService.getSubmissions(assignmentId);
    return { data: result };
  }
}
