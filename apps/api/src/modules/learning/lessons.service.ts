import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../../database/prisma.service';
import { EVENTS, LessonCompletedEvent, LessonStepCompletedEvent } from '../../common/events/events';

@Injectable()
export class LessonsService {
  private readonly logger = new Logger(LessonsService.name);

  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async findById(lessonId: string, studentProfileId?: string): Promise<any> {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        topic: {
          include: { subject: true },
        },
        steps: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!lesson || !lesson.isActive) {
      throw new NotFoundException('Lesson not found');
    }

    let completion = null;
    if (studentProfileId) {
      completion = await this.prisma.lessonCompletion.findUnique({
        where: {
          studentId_lessonId: {
            studentId: studentProfileId,
            lessonId,
          },
        },
      });
    }

    return { ...lesson, completion };
  }

  async startLesson(lessonId: string, studentProfileId: string): Promise<any> {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { steps: true },
    });

    if (!lesson || !lesson.isActive) {
      throw new NotFoundException('Lesson not found');
    }

    // Ensure student progress exists for this topic
    await this.prisma.studentProgress.upsert({
      where: {
        studentId_topicId: {
          studentId: studentProfileId,
          topicId: lesson.topicId,
        },
      },
      create: {
        studentId: studentProfileId,
        topicId: lesson.topicId,
        totalLessons: await this.prisma.lesson.count({
          where: { topicId: lesson.topicId, isActive: true },
        }),
        masteryStatus: 'IN_PROGRESS',
        isUnlocked: true,
        unlockedAt: new Date(),
      },
      update: {
        masteryStatus: 'IN_PROGRESS',
      },
    });

    return {
      lesson,
      steps: lesson.steps,
      totalSteps: lesson.steps.length,
    };
  }

  async completeStep(
    lessonId: string,
    stepId: string,
    studentProfileId: string,
    result: { correct: boolean; answer: unknown; timeSpent: number },
  ) {
    const step = await this.prisma.lessonStep.findUnique({
      where: { id: stepId },
    });

    if (!step || step.lessonId !== lessonId) {
      throw new NotFoundException('Step not found');
    }

    // Emit step completion event for gamification
    this.eventEmitter.emit(
      EVENTS.LESSON_STEP_COMPLETED,
      new LessonStepCompletedEvent(
        studentProfileId,
        lessonId,
        stepId,
        result.correct,
        true, // firstTry - would need session tracking to determine accurately
      ),
    );

    let xpEarned = 0;
    if (result.correct && step.type === 'INTERACTIVE') {
      xpEarned = step.xpReward;
    }

    return {
      stepId,
      correct: result.correct,
      xpEarned,
      explanation: step.explanation,
    };
  }

  async completeLesson(lessonId: string, studentProfileId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        steps: true,
        topic: true,
      },
    });

    if (!lesson || !lesson.isActive) {
      throw new NotFoundException('Lesson not found');
    }

    const totalSteps = lesson.steps.length;

    // Upsert lesson completion
    const existing = await this.prisma.lessonCompletion.findUnique({
      where: {
        studentId_lessonId: {
          studentId: studentProfileId,
          lessonId,
        },
      },
    });

    let completion;
    if (existing) {
      completion = existing;
    } else {
      completion = await this.prisma.lessonCompletion.create({
        data: {
          studentId: studentProfileId,
          lessonId,
          timeSpent: 0,
          stepsCompleted: totalSteps,
          totalSteps,
          xpEarned: lesson.xpReward,
          completedAt: new Date(),
        },
      });

      // Update topic progress
      await this.prisma.studentProgress.upsert({
        where: {
          studentId_topicId: {
            studentId: studentProfileId,
            topicId: lesson.topicId,
          },
        },
        create: {
          studentId: studentProfileId,
          topicId: lesson.topicId,
          lessonsCompleted: 1,
          totalLessons: await this.prisma.lesson.count({
            where: { topicId: lesson.topicId, isActive: true },
          }),
          masteryStatus: 'IN_PROGRESS',
          lastPracticed: new Date(),
          isUnlocked: true,
          unlockedAt: new Date(),
        },
        update: {
          lessonsCompleted: { increment: 1 },
          lastPracticed: new Date(),
        },
      });

      // Award XP
      await this.awardXP(studentProfileId, lesson.xpReward, 'LESSON_COMPLETE', lessonId);

      // Emit lesson completed event
      this.eventEmitter.emit(
        EVENTS.LESSON_COMPLETED,
        new LessonCompletedEvent(
          studentProfileId,
          lessonId,
          lesson.topicId,
          lesson.xpReward,
          1.0,
          0,
        ),
      );
    }

    return {
      completion,
      xpEarned: existing ? 0 : lesson.xpReward,
      alreadyCompleted: !!existing,
    };
  }

  private async awardXP(
    studentProfileId: string,
    amount: number,
    source: string,
    sourceId: string,
  ) {
    // Update student total XP
    const profile = await this.prisma.studentProfile.update({
      where: { id: studentProfileId },
      data: {
        totalXp: { increment: amount },
      },
    });

    // Calculate new level (100 XP per level as base, increases)
    const newLevel = this.calculateLevel(profile.totalXp);
    if (newLevel !== profile.level) {
      await this.prisma.studentProfile.update({
        where: { id: studentProfileId },
        data: { level: newLevel },
      });
    }

    // Record transaction
    await this.prisma.xPTransaction.create({
      data: {
        studentId: studentProfileId,
        amount,
        source: source as any,
        sourceId,
        multiplier: 1.0,
        streakBonus: 0,
      },
    });

    this.eventEmitter.emit(EVENTS.XP_EARNED, {
      studentProfileId,
      amount,
      source,
      sourceId,
      totalXp: profile.totalXp + amount,
      level: newLevel,
    });
  }

  private calculateLevel(totalXp: number): number {
    // Level formula: level = floor(1 + sqrt(totalXp / 100))
    return Math.floor(1 + Math.sqrt(totalXp / 100));
  }
}
