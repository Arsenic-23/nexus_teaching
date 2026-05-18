import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../../database/prisma.service';
import { EVENTS, StreakUpdatedEvent } from '../../common/events/events';

@Injectable()
export class StreaksService {
  private readonly logger = new Logger(StreaksService.name);

  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async getStreak(studentProfileId: string) {
    let streak = await this.prisma.streak.findUnique({
      where: { studentId: studentProfileId },
    });

    if (!streak) {
      streak = await this.prisma.streak.create({
        data: {
          studentId: studentProfileId,
          currentStreak: 0,
          longestStreak: 0,
        },
      });
    }

    // Check if streak should be broken (missed yesterday)
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    if (streak.lastActiveDate) {
      const lastActive = new Date(streak.lastActiveDate);
      lastActive.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor(
        (today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (daysDiff > 1 && !streak.freezeUsedToday) {
        // Streak should be broken
        streak = await this.prisma.streak.update({
          where: { id: streak.id },
          data: { currentStreak: 0 },
        });
      }
    }

    return streak;
  }

  async freezeStreak(studentProfileId: string) {
    const streak = await this.prisma.streak.findUnique({
      where: { studentId: studentProfileId },
    });

    if (!streak) {
      throw new NotFoundException('Streak not found');
    }

    if (streak.freezesAvailable <= 0) {
      throw new BadRequestException('No streak freezes available');
    }

    if (streak.freezeUsedToday) {
      throw new BadRequestException('Freeze already used today');
    }

    const updated = await this.prisma.streak.update({
      where: { id: streak.id },
      data: {
        freezesAvailable: { decrement: 1 },
        freezeUsedToday: true,
      },
    });

    return updated;
  }

  async updateStreak(studentProfileId: string): Promise<{
    currentStreak: number;
    longestStreak: number;
    maintained: boolean;
  }> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let streak = await this.prisma.streak.findUnique({
      where: { studentId: studentProfileId },
    });

    if (!streak) {
      streak = await this.prisma.streak.create({
        data: {
          studentId: studentProfileId,
          currentStreak: 1,
          longestStreak: 1,
          lastActiveDate: today,
        },
      });
      return { currentStreak: 1, longestStreak: 1, maintained: true };
    }

    const lastActive = streak.lastActiveDate ? new Date(streak.lastActiveDate) : null;
    if (lastActive) lastActive.setHours(0, 0, 0, 0);

    // Already active today
    if (lastActive && lastActive.getTime() === today.getTime()) {
      return {
        currentStreak: streak.currentStreak,
        longestStreak: streak.longestStreak,
        maintained: true,
      };
    }

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let newStreak = 1;
    const maintained = !!(lastActive && lastActive.getTime() === yesterday.getTime());

    if (maintained) {
      newStreak = streak.currentStreak + 1;
    }

    const longestStreak = Math.max(newStreak, streak.longestStreak);

    const updated = await this.prisma.streak.update({
      where: { id: streak.id },
      data: {
        currentStreak: newStreak,
        longestStreak,
        lastActiveDate: today,
        freezeUsedToday: false,
      },
    });

    const profile = await this.prisma.studentProfile.findUnique({
      where: { id: studentProfileId },
    });

    if (profile) {
      this.eventEmitter.emit(
        EVENTS.STREAK_UPDATED,
        new StreakUpdatedEvent(
          studentProfileId,
          profile.userId,
          newStreak,
          longestStreak,
          maintained,
        ),
      );
    }

    return {
      currentStreak: updated.currentStreak,
      longestStreak: updated.longestStreak,
      maintained,
    };
  }
}
