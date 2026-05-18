import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser, CurrentUserPayload } from '../../common/decorators/current-user.decorator';
import { TopicsService } from './topics.service';

@ApiTags('Topics')
@ApiBearerAuth()
@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get topic details' })
  async findById(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const result = await this.topicsService.findById(id, user.studentProfileId);
    return { data: result };
  }

  @Get(':id/lessons')
  @ApiOperation({ summary: 'Get lessons for a topic' })
  async getTopicLessons(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const result = await this.topicsService.getTopicLessons(id, user.studentProfileId);
    return { data: result };
  }

  @Get(':id/quizzes')
  @ApiOperation({ summary: 'Get quizzes for a topic' })
  async getTopicQuizzes(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const result = await this.topicsService.getTopicQuizzes(id, user.studentProfileId);
    return { data: result };
  }
}
