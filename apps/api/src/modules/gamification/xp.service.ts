import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../../database/prisma.service';
import { EVENTS } from '../../common/events/events';

const XP_PER_LEVEL_BASE = 100;
const DAILY_XP_CAP = 500;

@Injectable()
export class XpService {
  private readonly logger = new Logger(XpService.name);

  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async getXP(studentProfileId: string) {
    const profile = await this.prisma.studentProfile.findUnique({
      where: { id: studentProfileId },
      include: { streak: true },
    });

    if (!profile) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayXp = await this.prisma.xPTransaction.aggregate({
      where: {
        studentId: studentProfileId,
        createdAt: { gte: today, lt: tomorrow },
      },
      _sum: { amount: true },
    });

    const level = this.calculateLevel(profile.totalXp);
    const nextLevelXp = this.calculateXpForLevel(level + 1);
    const currentLevelXp = this.calculateXpForLevel(level);

    return {
      total: profile.totalXp,
      todayEarned: todayXp._sum.amount || 0,
      level,
      currentLevelXp,
      nextLevelXp,
      progressToNextLevel: profile.totalXp - currentLevelXp,
      xpNeededForNextLevel: nextLevelXp - currentLevelXp,
    };
  }

  async getXPHistory(studentProfileId: string, limit = 20) {
    const transactions = await this.prisma.xPTransaction.findMany({
      where: { studentId: studentProfileId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return transactions;
  }

  async awardXP(
    studentProfileId: string,
    amount: number,
    source: string,
    sourceId?: string,
    description?: string,
  ) {
    // Apply daily cap
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayXp = await this.prisma.xPTransaction.aggregate({
      where: {
        studentId: studentProfileId,
        createdAt: { gte: today, lt: tomorrow },
      },
      _sum: { amount: true },
    });

    const todayTotal = todayXp._sum.amount || 0;
    const capRemaining = DAILY_XP_CAP - todayTotal;

    if (capRemaining <= 0) {
      this.logger.debug(`Student ${studentProfileId} has hit daily XP cap`);
      return null;
    }

    // Get streak bonus multiplier
    const streak = await this.prisma.streak.findUnique({
      where: { studentId: studentProfileId },
    });

    let multiplier = 1.0;
    let streakBonus = 0;
    if (streak && streak.currentStreak >= 7) {
      multiplier = 1.2; // 20% bonus for 7+ day streak
      streakBonus = Math.round(amount * 0.2);
    } else if (streak && streak.currentStreak >= 3) {
      multiplier = 1.1; // 10% bonus for 3+ day streak
      streakBonus = Math.round(amount * 0.1);
    }

    const finalAmount = Math.min(Math.round(amount * multiplier), capRemaining);

    const profile = await this.prisma.studentProfile.update({
      where: { id: studentProfileId },
      data: { totalXp: { increment: finalAmount } },
    });

    const newLevel = this.calculateLevel(profile.totalXp);
    if (newLevel !== profile.level) {
      await this.prisma.studentProfile.update({
        where: { id: studentProfileId },
        data: { level: newLevel },
      });
    }

    const transaction = await this.prisma.xPTransaction.create({
      data: {
        studentId: studentProfileId,
        amount: finalAmount,
        source: source as any,
        sourceId: sourceId || null,
        description: description || null,
        multiplier,
        streakBonus,
      },
    });

    this.eventEmitter.emit(EVENTS.XP_EARNED, {
      studentProfileId,
      amount: finalAmount,
      source,
      sourceId: sourceId || null,
      totalXp: profile.totalXp,
      level: newLevel,
    });

    return transaction;
  }

  calculateLevel(totalXp: number): number {
    return Math.floor(1 + Math.sqrt(totalXp / XP_PER_LEVEL_BASE));
  }

  calculateXpForLevel(level: number): number {
    return Math.round(Math.pow(level - 1, 2) * XP_PER_LEVEL_BASE);
  }
}
