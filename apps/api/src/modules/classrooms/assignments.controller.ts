import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser, CurrentUserPayload } from '../../common/decorators/current-user.decorator';
import { AssignmentsService } from './assignments.service';

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
}
