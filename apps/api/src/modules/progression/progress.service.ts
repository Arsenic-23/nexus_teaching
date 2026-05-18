import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { MasteryService } from './mastery.service';

@Injectable()
export class ProgressService {
  private readonly logger = new Logger(ProgressService.name);

  constructor(
    private prisma: PrismaService,
    private masteryService: MasteryService,
  ) {}

  async getOverview(studentProfileId: string) {
    const profile = await this.prisma.studentProfile.findUnique({
      where: { id: studentProfileId },
      include: {
        user: true,
        rank: true,
        streak: true,
      },
    });

    if (!profile) return null;

    const allProgress = await this.prisma.studentProgress.findMany({
      where: { studentId: studentProfileId },
    });

    const totalTopics = allProgress.length;
    const masteredTopics = allProgress.filter(
      (p) => p.masteryStatus === 'MASTERED',
    ).length;
    const inProgressTopics = allProgress.filter(
      (p) => p.masteryStatus === 'IN_PROGRESS' || p.masteryStatus === 'PRACTICED',
    ).length;

    const totalLessonsCompleted = allProgress.reduce(
      (sum, p) => sum + p.lessonsCompleted,
      0,
    );
    const totalTimeSpent = allProgress.reduce(
      (sum, p) => sum + p.totalTimeSpent,
      0,
    );
    const averageMastery =
      totalTopics > 0
        ? allProgress.reduce((sum, p) => sum + p.masteryLevel, 0) / totalTopics
        : 0;

    // Weekly XP
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const weeklyXp = await this.prisma.xPTransaction.aggregate({
      where: {
        studentId: studentProfileId,
        createdAt: { gte: weekStart },
      },
      _sum: { amount: true },
    });

    return {
      totalXp: profile.totalXp,
      level: profile.level,
      rank: profile.rank,
      streak: profile.streak,
      totalTopics,
      masteredTopics,
      inProgressTopics,
      totalLessonsCompleted,
      totalTimeSpent,
      averageMastery: Math.round(averageMastery * 100) / 100,
      weeklyXp: weeklyXp._sum.amount || 0,
      onboardingComplete: profile.onboardingComplete,
    };
  }

  async getTopicProgress(studentProfileId: string) {
    const progresses = await this.prisma.studentProgress.findMany({
      where: { studentId: studentProfileId },
      include: {
        topic: {
          include: {
            subject: true,
            prerequisites: {
              include: { prerequisite: true },
            },
          },
        },
      },
      orderBy: [
        { masteryLevel: 'desc' },
        { updatedAt: 'desc' },
      ],
    });

    return progresses.map((p) => ({
      id: p.id,
      topicId: p.topicId,
      topicName: p.topic.name,
      subjectName: p.topic.subject.name,
      subjectSlug: p.topic.subject.slug,
      masteryLevel: p.masteryLevel,
      masteryStatus: p.masteryStatus,
      lessonsCompleted: p.lessonsCompleted,
      totalLessons: p.totalLessons,
      quizzesPassed: p.quizzesPassed,
      averageScore: p.averageScore,
      totalTimeSpent: p.totalTimeSpent,
      lastPracticed: p.lastPracticed,
      retentionScore: p.retentionScore,
      nextReviewDate: p.nextReviewDate,
      isUnlocked: p.isUnlocked,
    }));
  }

  async getTopicProgressById(studentProfileId: string, topicId: string) {
    const progress = await this.prisma.studentProgress.findUnique({
      where: {
        studentId_topicId: { studentId: studentProfileId, topicId },
      },
      include: {
        topic: {
          include: {
            subject: true,
            lessons: {
              where: { isActive: true },
              orderBy: { order: 'asc' },
            },
            quizzes: {
              where: { isActive: true },
            },
          },
        },
      },
    });

    if (!progress) return null;

    // Get lesson completion details
    const lessonCompletions = await this.prisma.lessonCompletion.findMany({
      where: {
        studentId: studentProfileId,
        lessonId: { in: progress.topic.lessons.map((l) => l.id) },
      },
    });

    const completedLessonIds = new Set(lessonCompletions.map((c) => c.lessonId));

    return {
      ...progress,
      lessons: progress.topic.lessons.map((l) => ({
        ...l,
        isCompleted: completedLessonIds.has(l.id),
      })),
    };
  }
}
