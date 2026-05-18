import { Module } from '@nestjs/common';
import { XpController } from './xp.controller';
import { XpService } from './xp.service';
import { RanksController } from './ranks.controller';
import { RanksService } from './ranks.service';
import { StreaksController } from './streaks.controller';
import { StreaksService } from './streaks.service';
import { AchievementsController } from './achievements.controller';
import { AchievementsService } from './achievements.service';
import { QuestsController } from './quests.controller';
import { QuestsService } from './quests.service';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardService } from './leaderboard.service';

@Module({
  controllers: [
    XpController,
    RanksController,
    StreaksController,
    AchievementsController,
    QuestsController,
    LeaderboardController,
  ],
  providers: [
    XpService,
    RanksService,
    StreaksService,
    AchievementsService,
    QuestsService,
    LeaderboardService,
  ],
  exports: [
    XpService,
    RanksService,
    StreaksService,
    AchievementsService,
    QuestsService,
  ],
})
export class GamificationModule {}
