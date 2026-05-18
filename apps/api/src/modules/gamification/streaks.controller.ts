import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser, CurrentUserPayload } from '../../common/decorators/current-user.decorator';
import { StreaksService } from './streaks.service';

@ApiTags('Gamification - Streaks')
@ApiBearerAuth()
@Controller('gamification/streaks')
export class StreaksController {
  constructor(private readonly streaksService: StreaksService) {}

  @Get()
  @ApiOperation({ summary: 'Get current streak' })
  async getStreak(@CurrentUser() user: CurrentUserPayload) {
    const result = await this.streaksService.getStreak(user.studentProfileId!);
    return { data: result };
  }

  @Post('freeze')
  @ApiOperation({ summary: 'Use a streak freeze' })
  async freezeStreak(@CurrentUser() user: CurrentUserPayload) {
    const result = await this.streaksService.freezeStreak(user.studentProfileId!);
    return { data: result };
  }
}
