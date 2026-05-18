import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser, CurrentUserPayload } from '../../common/decorators/current-user.decorator';
import { RanksService } from './ranks.service';

@ApiTags('Gamification - Ranks')
@ApiBearerAuth()
@Controller('gamification/ranks')
export class RanksController {
  constructor(private readonly ranksService: RanksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all ranks' })
  async getAllRanks() {
    const result = await this.ranksService.getAllRanks();
    return { data: result };
  }

  @Get('current')
  @ApiOperation({ summary: 'Get current student rank' })
  async getCurrentRank(@CurrentUser() user: CurrentUserPayload) {
    const result = await this.ranksService.getCurrentRank(user.studentProfileId!);
    return { data: result };
  }
}
