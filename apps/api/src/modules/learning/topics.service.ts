import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class TopicsService {
  constructor(private prisma: PrismaService) {}

  async findById(topicId: string, studentProfileId?: string) {
    const topic = await this.prisma.topic.findUnique({
      where: { id: topicId },
      include: {
        subject: true,
        prerequisites: {
          include: { prerequisite: true },
        },
        _count: {
          select: { lessons: true, quizzes: true },
        },
      },
    });

    if (!topic) {
      throw new NotFoundException(`Topic not found`);
    }

    let progress = null;
    if (studentProfileId) {
      progress = await this.prisma.studentProgress.findUnique({
        where: {
          studentId_topicId: {
            studentId: studentProfileId,
            topicId,
          },
        },
      });
    }

    return { ...topic, progress };
  }

  async getTopicLessons(topicId: string, studentProfileId?: string) {
    const topic = await this.prisma.topic.findUnique({
      where: { id: topicId },
    });

    if (!topic) {
      throw new NotFoundException('Topic not found');
    }

    const lessons = await this.prisma.lesson.findMany({
      where: { topicId, isActive: true },
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { steps: true },
        },
      },
    });

    // Get completion status if student
    let completionMap = new Map<string, any>();
    if (studentProfileId) {
      const completions = await this.prisma.lessonCompletion.findMany({
        where: {
          studentId: studentProfileId,
          lessonId: { in: lessons.map((l) => l.id) },
        },
      });
      completionMap = new Map(completions.map((c) => [c.lessonId, c]));
    }

    return lessons.map((lesson) => ({
      ...lesson,
      totalSteps: lesson._count.steps,
      completion: completionMap.get(lesson.id) || null,
      isCompleted: !!completionMap.get(lesson.id),
    }));
  }

  async getTopicQuizzes(topicId: string, studentProfileId?: string) {
    const topic = await this.prisma.topic.findUnique({
      where: { id: topicId },
    });

    if (!topic) {
      throw new NotFoundException('Topic not found');
    }

    const quizzes = await this.prisma.quiz.findMany({
      where: { topicId, isActive: true },
      include: {
        _count: {
          select: { questions: true },
        },
      },
    });

    // Get attempt history if student
    let attemptMap = new Map<string, any[]>();
    if (studentProfileId) {
      const attempts = await this.prisma.quizAttempt.findMany({
        where: {
          studentId: studentProfileId,
          quizId: { in: quizzes.map((q) => q.id) },
        },
        orderBy: { startedAt: 'desc' },
      });

      for (const attempt of attempts) {
        const existing = attemptMap.get(attempt.quizId) || [];
        existing.push(attempt);
        attemptMap.set(attempt.quizId, existing);
      }
    }

    return quizzes.map((quiz) => ({
      ...quiz,
      totalQuestions: quiz._count.questions,
      attempts: attemptMap.get(quiz.id) || [],
      bestScore: Math.max(...(attemptMap.get(quiz.id)?.map((a) => a.score) || [0])),
    }));
  }

  async checkUnlocked(topicId: string, studentProfileId: string): Promise<boolean> {
    const prerequisites = await this.prisma.topicPrerequisite.findMany({
      where: { topicId },
    });

    if (prerequisites.length === 0) return true;

    for (const prereq of prerequisites) {
      const progress = await this.prisma.studentProgress.findUnique({
        where: {
          studentId_topicId: {
            studentId: studentProfileId,
            topicId: prereq.prerequisiteId,
          },
        },
      });

      if (!progress || progress.masteryLevel < prereq.requiredMastery) {
        return false;
      }
    }

    return true;
  }
}
