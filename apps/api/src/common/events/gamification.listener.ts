import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../../database/prisma.service';
import {
  EVENTS,
  LessonCompletedEvent,
  QuizCompletedEvent,
  XPEarnedEvent,
  LessonStepCompletedEvent,
  TutorSessionCreatedEvent,
} from './events';

@Injectable()
export class GamificationListener {
  private readonly logger = new Logger(GamificationListener.name);

  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  @OnEvent(EVENTS.LESSON_COMPLETED)
  async handleLessonCompleted(event: LessonCompletedEvent) {
    this.logger.debug(`Lesson completed: ${event.lessonId} by ${event.studentProfileId}`);

    // Update streak
    await this.updateStreak(event.studentProfileId);

    // Update quest progress for COMPLETE_LESSONS
    await this.updateQuestProgress(event.studentProfileId, 'COMPLETE_LESSONS', 1);

    // Check achievements
    await this.checkLessonAchievements(event.studentProfileId);
  }

  @OnEvent(EVENTS.QUIZ_COMPLETED)
  async handleQuizCompleted(event: QuizCompletedEvent) {
    this.logger.debug(`Quiz completed: ${event.quizId} by ${event.studentProfileId}`);

    // Update quest progress for PASS_QUIZZES
    if (event.passed) {
      await this.updateQuestProgress(event.studentProfileId, 'PASS_QUIZZES', 1);
    }

    // Update quest progress for PERFECT_SCORE
    if (event.isPerfect) {
      await this.updateQuestProgress(event.studentProfileId, 'PERFECT_SCORE', 1);
    }

    // Check achievements
    await this.checkQuizAchievements(event.studentProfileId, event.isPerfect);
  }

  @OnEvent(EVENTS.XP_EARNED)
  async handleXPEarned(event: XPEarnedEvent) {
    this.logger.debug(`XP earned: ${event.amount} by ${event.studentProfileId}`);

    // Update quest progress for EARN_XP
    await this.updateQuestProgress(event.studentProfileId, 'EARN_XP', event.amount);

    // Check rank up
    await this.checkRankUp(event.studentProfileId, event.totalXp);
  }

  @OnEvent(EVENTS.TUTOR_SESSION_CREATED)
  async handleTutorSessionCreated(event: TutorSessionCreatedEvent) {
    await this.updateQuestProgress(event.studentProfileId, 'USE_AI_TUTOR', 1);
  }

  @OnEvent('quest.update')
  async handleQuestUpdate(payload: { studentProfileId: string; questType: string; increment: number }) {
    await this.updateQuestProgress(payload.studentProfileId, payload.questType, payload.increment);
  }

  private async updateStreak(studentProfileId: string) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const streak = await this.prisma.streak.findUnique({
        where: { studentId: studentProfileId },
      });

      if (!streak) {
        await this.prisma.streak.create({
          data: {
            studentId: studentProfileId,
            currentStreak: 1,
            longestStreak: 1,
            lastActiveDate: today,
          },
        });
        return;
      }

      const lastActive = streak.lastActiveDate ? new Date(streak.lastActiveDate) : null;
      if (lastActive) {
        lastActive.setHours(0, 0, 0, 0);
      }

      // Already active today
      if (lastActive && lastActive.getTime() === today.getTime()) {
        return;
      }

      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let newStreak = 1;
      if (lastActive && lastActive.getTime() === yesterday.getTime()) {
        newStreak = streak.currentStreak + 1;
      }

      const longestStreak = Math.max(newStreak, streak.longestStreak);

      await this.prisma.streak.update({
        where: { studentId: studentProfileId },
        data: {
          currentStreak: newStreak,
          longestStreak,
          lastActiveDate: today,
          freezeUsedToday: false,
        },
      });
    } catch (error: any) {
      this.logger.error(`Failed to update streak: ${error?.message}`);
    }
  }

  private async updateQuestProgress(
    studentProfileId: string,
    questType: string,
    increment: number,
  ) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const questProgressList = await this.prisma.questProgress.findMany({
        where: {
          studentId: studentProfileId,
          assignedDate: {
            gte: today,
          },
          isCompleted: false,
          quest: {
            type: questType as any,
          },
        },
        include: { quest: true },
      });

      for (const qp of questProgressList) {
        const newValue = qp.currentValue + increment;
        const isCompleted = newValue >= qp.quest.targetValue;

        await this.prisma.questProgress.update({
          where: { id: qp.id },
          data: {
            currentValue: newValue,
            isCompleted,
            completedAt: isCompleted ? new Date() : null,
          },
        });

        if (isCompleted) {
          this.eventEmitter.emit(EVENTS.QUEST_COMPLETED, {
            studentProfileId,
            questId: qp.questId,
            xpReward: qp.quest.xpReward,
          });
        }
      }
    } catch (error: any) {
      this.logger.error(`Failed to update quest progress: ${error?.message}`);
    }
  }

  private async checkRankUp(studentProfileId: string, totalXp: number) {
    try {
      const profile = await this.prisma.studentProfile.findUnique({
        where: { id: studentProfileId },
        include: { rank: true },
      });

      if (!profile) return;

      // Find the appropriate rank for current XP
      const newRank = await this.prisma.rank.findFirst({
        where: {
          minXp: { lte: totalXp },
          maxXp: { gt: totalXp },
        },
        orderBy: { order: 'desc' },
      });

      if (newRank && newRank.id !== profile.rankId) {
        await this.prisma.studentProfile.update({
          where: { id: studentProfileId },
          data: { rankId: newRank.id },
        });

        this.eventEmitter.emit(EVENTS.RANK_UP, {
          studentProfileId,
          userId: profile.userId,
          newRankId: newRank.id,
          previousRankId: profile.rankId,
        });
      }
    } catch (error: any) {
      this.logger.error(`Failed to check rank up: ${error?.message}`);
    }
  }

  private async checkLessonAchievements(studentProfileId: string) {
    try {
      const completionCount = await this.prisma.lessonCompletion.count({
        where: { studentId: studentProfileId },
      });

      const milestones = [1, 5, 10, 25, 50, 100, 250, 500];
      for (const milestone of milestones) {
        if (completionCount === milestone) {
          await this.tryUnlockAchievement(
            studentProfileId,
            `lessons-completed-${milestone}`,
          );
        }
      }
    } catch (error: any) {
      this.logger.error(`Failed to check lesson achievements: ${error?.message}`);
    }
  }

  private async checkQuizAchievements(studentProfileId: string, isPerfect: boolean) {
    try {
      if (isPerfect) {
        const perfectCount = await this.prisma.quizAttempt.count({
          where: { studentId: studentProfileId, score: 1.0 },
        });

        const milestones = [1, 5, 10, 25];
        for (const milestone of milestones) {
          if (perfectCount === milestone) {
            await this.tryUnlockAchievement(
              studentProfileId,
              `perfect-quizzes-${milestone}`,
            );
          }
        }
      }
    } catch (error: any) {
      this.logger.error(`Failed to check quiz achievements: ${error?.message}`);
    }
  }

  private async tryUnlockAchievement(studentProfileId: string, achievementSlug: string) {
    try {
      const achievement = await this.prisma.achievement.findUnique({
        where: { slug: achievementSlug },
      });

      if (!achievement) return;

      const existing = await this.prisma.studentAchievement.findUnique({
        where: {
          studentId_achievementId: {
            studentId: studentProfileId,
            achievementId: achievement.id,
          },
        },
      });

      if (existing) return;

      await this.prisma.studentAchievement.create({
        data: {
          studentId: studentProfileId,
          achievementId: achievement.id,
        },
      });

      // Get userId for the event
      const profile = await this.prisma.studentProfile.findUnique({
        where: { id: studentProfileId },
      });

      if (profile) {
        this.eventEmitter.emit(EVENTS.ACHIEVEMENT_UNLOCKED, {
          studentProfileId,
          userId: profile.userId,
          achievementId: achievement.id,
          xpReward: achievement.xpReward,
        });
      }
    } catch (error: any) {
      this.logger.error(`Failed to unlock achievement: ${error?.message}`);
    }
  }
}
