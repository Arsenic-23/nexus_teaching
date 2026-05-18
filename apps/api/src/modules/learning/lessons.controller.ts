import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser, CurrentUserPayload } from '../../common/decorators/current-user.decorator';
import { LessonsService } from './lessons.service';

@ApiTags('Lessons')
@ApiBearerAuth()
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get lesson details with steps' })
  async findById(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<any> {
    const result = await this.lessonsService.findById(id, user.studentProfileId);
    return { data: result };
  }

  @Post(':id/start')
  @ApiOperation({ summary: 'Start a lesson session' })
  async startLesson(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<any> {
    const result = await this.lessonsService.startLesson(id, user.studentProfileId!);
    return { data: result };
  }

  @Post(':id/steps/:stepId/complete')
  @ApiOperation({ summary: 'Complete a lesson step' })
  async completeStep(
    @Param('id') id: string,
    @Param('stepId') stepId: string,
    @CurrentUser() user: CurrentUserPayload,
    @Body() result: { correct: boolean; answer: unknown; timeSpent: number },
  ): Promise<any> {
    const data = await this.lessonsService.completeStep(id, stepId, user.studentProfileId!, result);
    return { data };
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Mark a lesson as completed' })
  async completeLesson(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<any> {
    const result = await this.lessonsService.completeLesson(id, user.studentProfileId!);
    return { data: result };
  }
}
