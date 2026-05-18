import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser, CurrentUserPayload } from '../../common/decorators/current-user.decorator';
import { XpService } from './xp.service';

@ApiTags('Gamification - XP')
@ApiBearerAuth()
@Controller('gamification')
export class XpController {
  constructor(private readonly xpService: XpService) {}

  @Get('xp')
  @ApiOperation({ summary: 'Get student XP summary' })
  async getXP(@CurrentUser() user: CurrentUserPayload) {
    const result = await this.xpService.getXP(user.studentProfileId!);
    return { data: result };
  }

  @Get('xp/history')
  @ApiOperation({ summary: 'Get XP transaction history' })
  async getXPHistory(
    @CurrentUser() user: CurrentUserPayload,
    @Query('limit') limit?: number,
  ) {
    const result = await this.xpService.getXPHistory(user.studentProfileId!, limit);
    return { data: result };
  }
}
