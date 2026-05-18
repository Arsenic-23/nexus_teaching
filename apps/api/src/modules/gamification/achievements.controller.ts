import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser, CurrentUserPayload } from '../../common/decorators/current-user.decorator';
import { AchievementsService } from './achievements.service';

@ApiTags('Gamification - Achievements')
@ApiBearerAuth()
@Controller('gamification/achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all achievements (unlocked and locked)' })
  async getAchievements(@CurrentUser() user: CurrentUserPayload): Promise<any> {
    const result = await this.achievementsService.getAchievements(user.studentProfileId!);
    return { data: result };
  }
}
