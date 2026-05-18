import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LeaderboardService } from './leaderboard.service';

@ApiTags('Gamification - Leaderboard')
@ApiBearerAuth()
@Controller('gamification/leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get(':type')
  @ApiOperation({ summary: 'Get leaderboard (global/weekly/monthly)' })
  async getLeaderboard(
    @Param('type') type: 'global' | 'weekly' | 'monthly',
    @Query('limit') limit?: number,
  ) {
    const result = await this.leaderboardService.getLeaderboard(type, limit);
    return { data: result };
  }

  @Get('class/:classId')
  @ApiOperation({ summary: 'Get classroom leaderboard' })
  async getClassLeaderboard(
    @Param('classId') classId: string,
    @Query('limit') limit?: number,
  ) {
    const result = await this.leaderboardService.getClassLeaderboard(classId, limit);
    return { data: result };
  }
}
