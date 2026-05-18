import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../../database/prisma.service';
import {
  EVENTS,
  AchievementUnlockedEvent,
  StreakUpdatedEvent,
} from '../../common/events/events';

@Injectable()
export class AchievementsService {
  private readonly logger = new Logger(AchievementsService.name);

  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async getAchievements(studentProfileId: string): Promise<any> {
    const allAchievements = await this.prisma.achievement.findMany({
      where: { isActive: true },
      orderBy: [{ category: 'asc' }, { rarity: 'asc' }],
    });

    const unlocked = await this.prisma.studentAchievement.findMany({
      where: { studentId: studentProfileId },
      include: { achievement: true },
    });

    const unlockedIds = new Set(unlocked.map((u) => u.achievementId));

    return {
      unlocked: unlocked.map((u) => ({
        ...u.achievement,
        unlockedAt: u.unlockedAt,
        isUnlocked: true,
      })),
      locked: allAchievements
        .filter((a) => !unlockedIds.has(a.id))
        .map((a) => ({ ...a, isUnlocked: false })),
      totalUnlocked: unlocked.length,
      totalAchievements: allAchievements.length,
    };
  }

  async unlockAchievement(studentProfileId: string, achievementSlug: string): Promise<any> {
    const achievement = await this.prisma.achievement.findUnique({
      where: { slug: achievementSlug },
    });

    if (!achievement) return null;

    const existing = await this.prisma.studentAchievement.findUnique({
      where: {
        studentId_achievementId: {
          studentId: studentProfileId,
          achievementId: achievement.id,
        },
      },
    });

    if (existing) return null;

    const unlocked = await this.prisma.studentAchievement.create({
      data: {
        studentId: studentProfileId,
        achievementId: achievement.id,
      },
      include: { achievement: true },
    });

    const profile = await this.prisma.studentProfile.findUnique({
      where: { id: studentProfileId },
    });

    if (profile) {
      this.eventEmitter.emit(
        EVENTS.ACHIEVEMENT_UNLOCKED,
        new AchievementUnlockedEvent(
          studentProfileId,
          profile.userId,
          achievement.id,
          achievement.xpReward,
        ),
      );
    }

    return unlocked;
  }

  @OnEvent(EVENTS.STREAK_UPDATED)
  async handleStreakUpdated(event: StreakUpdatedEvent): Promise<void> {
    const milestones = [3, 7, 14, 30, 60, 100, 365];
    for (const milestone of milestones) {
      if (event.currentStreak === milestone) {
        await this.unlockAchievement(event.studentProfileId, `streak-${milestone}`);
      }
    }
  }
}
