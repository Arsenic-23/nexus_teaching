import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

interface SM2Result {
  interval: number;
  easeFactor: number;
  repetitions: number;
  nextReview: Date;
}

@Injectable()
export class RetentionService {
  private readonly logger = new Logger(RetentionService.name);

  constructor(private prisma: PrismaService) {}

  // SM-2 Algorithm implementation
  calculateSM2(
    quality: number, // 0-5 quality of response
    interval: number,
    easeFactor: number,
    repetitions: number,
  ): SM2Result {
    // Quality must be 0-5
    quality = Math.max(0, Math.min(5, quality));

    let newInterval: number;
    let newEaseFactor = easeFactor;
    let newRepetitions = repetitions;

    if (quality >= 3) {
      // Correct response
      if (repetitions === 0) {
        newInterval = 1;
      } else if (repetitions === 1) {
        newInterval = 6;
      } else {
        newInterval = Math.round(interval * easeFactor);
      }
      newRepetitions = repetitions + 1;
    } else {
      // Incorrect response - reset
      newRepetitions = 0;
      newInterval = 1;
    }

    // Update ease factor
    newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (newEaseFactor < 1.3) newEaseFactor = 1.3;

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + newInterval);

    return {
      interval: newInterval,
      easeFactor: newEaseFactor,
      repetitions: newRepetitions,
      nextReview,
    };
  }

  async updateRetention(
    studentProfileId: string,
    topicId: string,
    score: number,
  ) {
    // Convert 0-1 score to 0-5 quality rating for SM-2
    const quality = Math.round(score * 5);

    const existing = await this.prisma.retentionRecord.findUnique({
      where: { studentId_topicId: { studentId: studentProfileId, topicId } },
    });

    const currentInterval = existing?.interval || 1;
    const currentEaseFactor = existing?.easeFactor || 2.5;
    const currentRepetitions = existing?.repetitions || 0;

    const result = this.calculateSM2(
      quality,
      currentInterval,
      currentEaseFactor,
      currentRepetitions,
    );

    await this.prisma.retentionRecord.upsert({
      where: { studentId_topicId: { studentId: studentProfileId, topicId } },
      create: {
        studentId: studentProfileId,
        topicId,
        interval: result.interval,
        easeFactor: result.easeFactor,
        repetitions: result.repetitions,
        lastScore: score,
        nextReview: result.nextReview,
        lastReviewed: new Date(),
      },
      update: {
        interval: result.interval,
        easeFactor: result.easeFactor,
        repetitions: result.repetitions,
        lastScore: score,
        nextReview: result.nextReview,
        lastReviewed: new Date(),
      },
    });

    // Update student progress retention score
    await this.prisma.studentProgress.upsert({
      where: { studentId_topicId: { studentId: studentProfileId, topicId } },
      create: {
        studentId: studentProfileId,
        topicId,
        retentionScore: score,
        nextReviewDate: result.nextReview,
        isUnlocked: true,
      },
      update: {
        retentionScore: score,
        nextReviewDate: result.nextReview,
      },
    });

    return result;
  }

  async getRetentionData(studentProfileId: string) {
    const records = await this.prisma.retentionRecord.findMany({
      where: { studentId: studentProfileId },
      orderBy: { nextReview: 'asc' },
    });

    const now = new Date();
    const dueForReview = records.filter((r) => r.nextReview <= now);
    const upcoming = records.filter((r) => r.nextReview > now);

    return {
      dueForReview,
      upcoming: upcoming.slice(0, 10),
      totalTracked: records.length,
      averageRetention:
        records.length > 0
          ? records.reduce((sum, r) => sum + r.lastScore, 0) / records.length
          : 0,
    };
  }

  async getDueTopics(studentProfileId: string) {
    const now = new Date();
    const records = await this.prisma.retentionRecord.findMany({
      where: {
        studentId: studentProfileId,
        nextReview: { lte: now },
      },
      orderBy: { nextReview: 'asc' },
      take: 5,
    });

    return records;
  }
}
