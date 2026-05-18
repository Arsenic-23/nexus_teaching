import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { RetentionService } from './retention.service';
import { WeakAreasService } from './weak-areas.service';

export interface Recommendation {
  type: 'review' | 'next_lesson' | 'quiz' | 'weak_area';
  priority: 'high' | 'medium' | 'low';
  topicId?: string;
  lessonId?: string;
  quizId?: string;
  title: string;
  reason: string;
  estimatedTime?: number;
}

@Injectable()
export class RecommendationsService {
  private readonly logger = new Logger(RecommendationsService.name);

  constructor(
    private prisma: PrismaService,
    private retentionService: RetentionService,
    private weakAreasService: WeakAreasService,
  ) {}

  async getRecommendations(studentProfileId: string): Promise<Recommendation[]> {
    const recommendations: Recommendation[] = [];

    // 1. Spaced repetition reviews (high priority)
    const dueTopics = await this.retentionService.getDueTopics(studentProfileId);
    for (const record of dueTopics.slice(0, 2)) {
      const topic = await this.prisma.topic.findUnique({
        where: { id: record.topicId },
      });
      if (topic) {
        recommendations.push({
          type: 'review',
          priority: 'high',
          topicId: record.topicId,
          title: `Review: ${topic.name}`,
          reason: 'Spaced repetition review due - reinforce your memory',
          estimatedTime: 10,
        });
      }
    }

    // 2. Weak areas (high priority)
    const weakAreas = await this.weakAreasService.getWeakAreas(studentProfileId);
    for (const area of weakAreas.slice(0, 2)) {
      const quiz = await this.prisma.quiz.findFirst({
        where: { topicId: area.topicId, isActive: true },
      });
      if (quiz) {
        recommendations.push({
          type: 'weak_area',
          priority: 'high',
          topicId: area.topicId,
          quizId: quiz.id,
          title: `Practice: ${area.topicName}`,
          reason: `You're struggling here (${Math.round(area.errorRate * 100)}% error rate)`,
          estimatedTime: 15,
        });
      }
    }

    // 3. Next unstarted lessons (medium priority)
    const inProgressTopics = await this.prisma.studentProgress.findMany({
      where: {
        studentId: studentProfileId,
        masteryStatus: 'IN_PROGRESS',
        isUnlocked: true,
      },
      include: { topic: true },
      take: 3,
    });

    for (const progress of inProgressTopics) {
      const nextLesson = await this.prisma.lesson.findFirst({
        where: {
          topicId: progress.topicId,
          isActive: true,
          completions: {
            none: { studentId: studentProfileId },
          },
        },
        orderBy: { order: 'asc' },
      });

      if (nextLesson) {
        recommendations.push({
          type: 'next_lesson',
          priority: 'medium',
          topicId: progress.topicId,
          lessonId: nextLesson.id,
          title: `Continue: ${nextLesson.title}`,
          reason: `Pick up where you left off in ${progress.topic.name}`,
          estimatedTime: nextLesson.estimatedTime || 15,
        });
      }
    }

    // 4. Mastery quizzes for proficient topics (low priority)
    const proficientTopics = await this.prisma.studentProgress.findMany({
      where: {
        studentId: studentProfileId,
        masteryStatus: 'PRACTICED',
      },
      include: { topic: true },
      take: 2,
    });

    for (const progress of proficientTopics) {
      const quiz = await this.prisma.quiz.findFirst({
        where: {
          topicId: progress.topicId,
          type: 'MASTERY_CHECK',
          isActive: true,
        },
      });

      if (quiz) {
        recommendations.push({
          type: 'quiz',
          priority: 'low',
          topicId: progress.topicId,
          quizId: quiz.id,
          title: `Master: ${progress.topic.name}`,
          reason: 'Take the mastery check to advance your level',
          estimatedTime: 20,
        });
      }
    }

    return recommendations.slice(0, 6);
  }
}
