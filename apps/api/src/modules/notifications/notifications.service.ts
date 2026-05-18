import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { OnEvent } from '@nestjs/event-emitter';
import {
  EVENTS,
  AchievementUnlockedEvent,
  RankUpEvent,
  StreakUpdatedEvent,
} from '../../common/events/events';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private prisma: PrismaService) {}

  async getNotifications(userId: string, limit = 20): Promise<any[]> {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async getUnreadCount(userId: string): Promise<{ count: number }> {
    const count = await this.prisma.notification.count({
      where: { userId, isRead: false },
    });
    return { count };
  }

  async markRead(notificationId: string, userId: string): Promise<any> {
    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true, readAt: new Date() },
    });
  }

  async markAllRead(userId: string): Promise<{ success: boolean }> {
    await this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true, readAt: new Date() },
    });
    return { success: true };
  }

  async createNotification(
    userId: string,
    type: string,
    title: string,
    message: string,
    data?: Record<string, unknown>,
  ): Promise<any> {
    return this.prisma.notification.create({
      data: {
        userId,
        type: type as any,
        title,
        message,
        data: data as any,
      },
    });
  }

  @OnEvent(EVENTS.ACHIEVEMENT_UNLOCKED)
  async handleAchievementUnlocked(event: AchievementUnlockedEvent): Promise<void> {
    try {
      const profile = await this.prisma.studentProfile.findUnique({
        where: { id: event.studentProfileId },
      });
      if (!profile) return;

      const achievement = await this.prisma.achievement.findUnique({
        where: { id: event.achievementId },
      });
      if (!achievement) return;

      await this.createNotification(
        profile.userId,
        'ACHIEVEMENT_UNLOCKED',
        '🏆 Achievement Unlocked!',
        `You unlocked: ${achievement.name} (+${event.xpReward} XP)`,
        { achievementId: event.achievementId, xpReward: event.xpReward },
      );
    } catch (error: any) {
      this.logger.error(`Failed to create achievement notification: ${error?.message}`);
    }
  }

  @OnEvent(EVENTS.RANK_UP)
  async handleRankUp(event: RankUpEvent): Promise<void> {
    try {
      const newRank = await this.prisma.rank.findUnique({
        where: { id: event.newRankId },
      });
      if (!newRank) return;

      await this.createNotification(
        event.userId,
        'RANK_UP',
        '⬆️ Rank Up!',
        `Congratulations! You've reached ${newRank.name}!`,
        { newRankId: event.newRankId, previousRankId: event.previousRankId },
      );
    } catch (error: any) {
      this.logger.error(`Failed to create rank-up notification: ${error?.message}`);
    }
  }

  @OnEvent(EVENTS.STREAK_UPDATED)
  async handleStreakUpdated(event: StreakUpdatedEvent): Promise<void> {
    try {
      const milestones = [7, 14, 30, 60, 100];
      if (milestones.includes(event.currentStreak)) {
        await this.createNotification(
          event.userId,
          'STREAK_REMINDER',
          `🔥 ${event.currentStreak} Day Streak!`,
          `Amazing! You've maintained a ${event.currentStreak}-day learning streak!`,
          { currentStreak: event.currentStreak },
        );
      }
    } catch (error: any) {
      this.logger.error(`Failed to create streak notification: ${error?.message}`);
    }
  }
}
