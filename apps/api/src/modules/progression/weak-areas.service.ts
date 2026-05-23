import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

export interface WeakArea {
  topicId: string;
  topicName: string;
  subjectName: string;
  errorRate: number;
  commonMistakes: string[];
  recommendedActions: string[];
  difficulty: string;
}

@Injectable()
export class WeakAreasService {
  private readonly logger = new Logger(WeakAreasService.name);

  constructor(private prisma: PrismaService) {}

  async getWeakAreas(studentProfileId: string): Promise<WeakArea[]> {
    // Analyze quiz responses to find patterns
    const responses = await this.prisma.questionResponse.findMany({
      where: {
        attempt: { studentId: studentProfileId },
      },
      include: {
        question: true,
        attempt: { include: { quiz: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });

    // Group by topic through quiz
    const topicStats = new Map<
      string,
      { correct: number; wrong: number; conceptTags: string[] }
    >();

    for (const response of responses) {
      const topicId = response.attempt.quiz.topicId;
      const stats = topicStats.get(topicId) || {
        correct: 0,
        wrong: 0,
        conceptTags: [],
      };

      if (response.isCorrect) {
        stats.correct++;
      } else {
        stats.wrong++;
        stats.conceptTags.push(...response.question.conceptTags);
      }

      topicStats.set(topicId, stats);
    }

    // Get topic details for weak areas (error rate > 40%)
    const weakTopicIds = Array.from(topicStats.entries())
      .filter(([_, stats]) => {
        const total = stats.correct + stats.wrong;
        return total > 0 && stats.wrong / total > 0.4;
      })
      .map(([topicId]) => topicId);

    if (weakTopicIds.length === 0) return [];

    const topics = await this.prisma.topic.findMany({
      where: { id: { in: weakTopicIds } },
      include: { subject: true },
    });

    const topicMap = new Map<string, any>(topics.map((t: any) => [t.id, t]));

    return weakTopicIds
      .map((topicId) => {
        const stats = topicStats.get(topicId)!;
        const topic = topicMap.get(topicId);
        if (!topic) return null;

        const total = stats.correct + stats.wrong;
        const errorRate = total > 0 ? stats.wrong / total : 0;

        // Find most common wrong concept tags
        const tagCounts = stats.conceptTags.reduce(
          (acc, tag) => {
            acc[tag] = (acc[tag] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>,
        );

        const commonMistakes = Object.entries(tagCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([tag]) => tag);

        return {
          topicId,
          topicName: topic.name,
          subjectName: topic.subject.name,
          errorRate,
          commonMistakes,
          recommendedActions: this.getRecommendedActions(errorRate, topic.difficulty),
          difficulty: topic.difficulty,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b!.errorRate - a!.errorRate) as WeakArea[];
  }

  private getRecommendedActions(errorRate: number, difficulty: string): string[] {
    const actions: string[] = [];

    if (errorRate > 0.7) {
      actions.push('Review foundational concepts');
      actions.push('Start with beginner-level practice');
    } else if (errorRate > 0.5) {
      actions.push('Practice with guided exercises');
      actions.push('Use AI tutor for personalized help');
    } else {
      actions.push('Additional practice quizzes');
      actions.push('Review specific problem types');
    }

    if (difficulty === 'ADVANCED' || difficulty === 'EXPERT') {
      actions.push('Ensure prerequisite topics are mastered');
    }

    return actions;
  }
}
