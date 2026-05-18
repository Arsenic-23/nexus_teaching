import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser, CurrentUserPayload } from '../../common/decorators/current-user.decorator';
import { ProgressService } from './progress.service';
import { MasteryService } from './mastery.service';
import { RetentionService } from './retention.service';
import { WeakAreasService } from './weak-areas.service';
import { RecommendationsService } from './recommendations.service';

@ApiTags('Progression')
@ApiBearerAuth()
@Controller('progress')
export class ProgressController {
  constructor(
    private readonly progressService: ProgressService,
    private readonly masteryService: MasteryService,
    private readonly retentionService: RetentionService,
    private readonly weakAreasService: WeakAreasService,
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Get('overview')
  @ApiOperation({ summary: 'Get overall student progress overview' })
  async getOverview(@CurrentUser() user: CurrentUserPayload) {
    const result = await this.progressService.getOverview(user.studentProfileId!);
    return { data: result };
  }

  @Get('topics')
  @ApiOperation({ summary: 'Get progress for all topics' })
  async getTopicProgress(@CurrentUser() user: CurrentUserPayload) {
    const result = await this.progressService.getTopicProgress(user.studentProfileId!);
    return { data: result };
  }

  @Get('topics/:topicId')
  @ApiOperation({ summary: 'Get progress for a specific topic' })
  async getTopicProgressById(
    @Param('topicId') topicId: string,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const result = await this.progressService.getTopicProgressById(
      user.studentProfileId!,
      topicId,
    );
    return { data: result };
  }

  @Get('mastery')
  @ApiOperation({ summary: 'Get detailed mastery scores per topic' })
  async getMastery(@CurrentUser() user: CurrentUserPayload) {
    const result = await this.masteryService.getDetailedMastery(user.studentProfileId!);
    return { data: result };
  }

  @Get('retention')
  @ApiOperation({ summary: 'Get retention data and upcoming reviews' })
  async getRetention(@CurrentUser() user: CurrentUserPayload) {
    const result = await this.retentionService.getRetentionData(user.studentProfileId!);
    return { data: result };
  }

  @Get('weak-areas')
  @ApiOperation({ summary: 'Get identified weak areas' })
  async getWeakAreas(@CurrentUser() user: CurrentUserPayload) {
    const result = await this.weakAreasService.getWeakAreas(user.studentProfileId!);
    return { data: result };
  }

  @Get('recommendations')
  @ApiOperation({ summary: 'Get personalized learning recommendations' })
  async getRecommendations(@CurrentUser() user: CurrentUserPayload) {
    const result = await this.recommendationsService.getRecommendations(user.studentProfileId!);
    return { data: result };
  }
}
