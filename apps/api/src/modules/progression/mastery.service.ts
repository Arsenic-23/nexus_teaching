import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class MasteryService {
  private readonly logger = new Logger(MasteryService.name);

  // Weights: accuracy 40%, retention 25%, application 20%, consistency 15%
  private readonly WEIGHTS = {
    accuracy: 0.4,
    retention: 0.25,
    application: 0.2,
    consistency: 0.15,
  };

  constructor(private prisma: PrismaService) {}

  async calculateMastery(studentProfileId: string, topicId: string): Promise<number> {
    const progress = await this.prisma.studentProgress.findUnique({
      where: { studentId_topicId: { studentId: studentProfileId, topicId } },
    });

    if (!progress) return 0;

    const quizAttempts = await this.prisma.quizAttempt.findMany({
      where: {
        studentId: studentProfileId,
        quiz: { topicId },
        completedAt: { not: null },
      },
      orderBy: { startedAt: 'desc' },
      take: 10,
    });

    const lessonCompletions = await this.prisma.lessonCompletion.findMany({
      where: {
        studentId: studentProfileId,
        lesson: { topicId },
      },
    });

    const totalLessons = await this.prisma.lesson.count({
      where: { topicId, isActive: true },
    });

    // Accuracy score: average quiz score
    const accuracyScore =
      quizAttempts.length > 0
        ? quizAttempts.reduce((sum, a) => sum + a.score, 0) / quizAttempts.length
        : 0;

    // Retention score: from retention records
    const retention = await this.prisma.retentionRecord.findUnique({
      where: { studentId_topicId: { studentId: studentProfileId, topicId } },
    });
    const retentionScore = retention ? retention.lastScore : 0;

    // Application score: % of lessons completed
    const applicationScore =
      totalLessons > 0 ? lessonCompletions.length / totalLessons : 0;

    // Consistency score: based on number of practice sessions
    const practiceSessionCount = quizAttempts.length + lessonCompletions.length;
    const consistencyScore = Math.min(practiceSessionCount / 10, 1);

    const masteryLevel =
      accuracyScore * this.WEIGHTS.accuracy +
      retentionScore * this.WEIGHTS.retention +
      applicationScore * this.WEIGHTS.application +
      consistencyScore * this.WEIGHTS.consistency;

    return Math.round(masteryLevel * 100) / 100;
  }

  async getMasteryStatus(masteryLevel: number): Promise<string> {
    if (masteryLevel >= 0.9) return 'MASTERED';
    if (masteryLevel >= 0.7) return 'PROFICIENT';
    if (masteryLevel >= 0.4) return 'PRACTICED';
    if (masteryLevel > 0) return 'IN_PROGRESS';
    return 'NOT_STARTED';
  }

  async getDetailedMastery(studentProfileId: string) {
    const progresses = await this.prisma.studentProgress.findMany({
      where: { studentId: studentProfileId },
      include: { topic: { include: { subject: true } } },
      orderBy: { masteryLevel: 'desc' },
    });

    return progresses.map((p) => ({
      topicId: p.topicId,
      topicName: p.topic.name,
      subjectName: p.topic.subject.name,
      masteryLevel: p.masteryLevel,
      masteryStatus: p.masteryStatus,
      lessonsCompleted: p.lessonsCompleted,
      totalLessons: p.totalLessons,
      averageScore: p.averageScore,
      lastPracticed: p.lastPracticed,
    }));
  }
}
