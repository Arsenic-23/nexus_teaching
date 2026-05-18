import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser, CurrentUserPayload } from '../../common/decorators/current-user.decorator';
import { QuestsService } from './quests.service';

@ApiTags('Gamification - Quests')
@ApiBearerAuth()
@Controller('gamification/quests')
export class QuestsController {
  constructor(private readonly questsService: QuestsService) {}

  @Get('daily')
  @ApiOperation({ summary: 'Get daily quests for the student' })
  async getDailyQuests(@CurrentUser() user: CurrentUserPayload) {
    const result = await this.questsService.getDailyQuests(user.studentProfileId!);
    return { data: result };
  }
}
