import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../../database/prisma.service';
import { EVENTS, QuizCompletedEvent } from '../../common/events/events';
import { XpService } from '../gamification/xp.service';

interface SubmitAnswerDto {
  questionId: string;
  answer: unknown;
  timeSpent: number;
}

// In-memory store for active quiz attempts (in production, use Redis)
const activeAttempts = new Map<
  string,
  { quizId: string; studentId: string; questionIndex: number; responses: any[] }
>();

@Injectable()
export class QuizzesService {
  private readonly logger = new Logger(QuizzesService.name);

  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
    private xpService: XpService,
  ) {}

  async getQuiz(quizId: string, studentProfileId?: string): Promise<any> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        topic: { include: { subject: true } },
        _count: { select: { questions: true } },
      },
    });

    if (!quiz || !quiz.isActive) {
      throw new NotFoundException('Quiz not found');
    }

    let attempts: any[] = [];
    if (studentProfileId) {
      attempts = await this.prisma.quizAttempt.findMany({
        where: { quizId, studentId: studentProfileId },
        orderBy: { startedAt: 'desc' },
        take: 5,
      });
    }

    return {
      id: quiz.id,
      title: quiz.title,
      type: quiz.type,
      difficulty: quiz.difficulty,
      timeLimit: quiz.timeLimit,
      passingScore: quiz.passingScore,
      maxAttempts: quiz.maxAttempts,
      xpReward: quiz.xpReward,
      isAdaptive: quiz.isAdaptive,
      totalQuestions: quiz._count.questions,
      topic: quiz.topic,
      myAttempts: attempts,
      bestScore: attempts.length > 0 ? Math.max(...attempts.map((a) => a.score)) : null,
    };
  }

  async startQuiz(quizId: string, studentProfileId: string): Promise<any> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          where: { isActive: true },
          orderBy: { id: 'asc' },
        },
      },
    });

    if (!quiz || !quiz.isActive) {
      throw new NotFoundException('Quiz not found');
    }

    // Check max attempts
    if (quiz.maxAttempts) {
      const attemptCount = await this.prisma.quizAttempt.count({
        where: { quizId, studentId: studentProfileId },
      });
      if (attemptCount >= quiz.maxAttempts) {
        throw new BadRequestException('Maximum attempts reached for this quiz');
      }
    }

    // Select questions (adaptive or random)
    let selectedQuestions: typeof quiz.questions = quiz.questions;
    if (quiz.isAdaptive) {
      selectedQuestions = (await this.selectAdaptiveQuestions(
        quiz,
        studentProfileId,
      )) as typeof quiz.questions;
    } else if (selectedQuestions.length > quiz.maxQuestions) {
      selectedQuestions = this.shuffleArray(selectedQuestions).slice(
        0,
        quiz.maxQuestions,
      );
    }

    // Create attempt record
    const attempt = await this.prisma.quizAttempt.create({
      data: {
        quizId,
        studentId: studentProfileId,
        score: 0,
        totalQuestions: selectedQuestions.length,
        correctCount: 0,
        timeSpent: 0,
        passed: false,
        xpEarned: 0,
      },
    });

    // Store in memory with question list
    activeAttempts.set(attempt.id, {
      quizId,
      studentId: studentProfileId,
      questionIndex: 0,
      responses: [],
    });

    // Return quiz with scrubbed questions (no correct answers)
    return {
      attemptId: attempt.id,
      quiz: {
        id: quiz.id,
        title: quiz.title,
        type: quiz.type,
        timeLimit: quiz.timeLimit,
        passingScore: quiz.passingScore,
      },
      questions: selectedQuestions.map((q) => ({
        id: q.id,
        type: q.type,
        difficulty: q.difficulty,
        stem: q.stem,
        media: q.media,
        options: q.options,
        hints: q.hints,
        points: q.points,
        bloomsLevel: q.bloomsLevel,
        conceptTags: q.conceptTags,
        // Never send correctAnswer to client
      })),
    };
  }

  async submitAnswer(
    quizId: string,
    studentProfileId: string,
    dto: SubmitAnswerDto,
  ): Promise<any> {
    const question = await this.prisma.question.findUnique({
      where: { id: dto.questionId },
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    // Evaluate answer
    const isCorrect = this.evaluateAnswer(question, dto.answer);

    // Find the active attempt
    const attempt = await this.prisma.quizAttempt.findFirst({
      where: {
        quizId,
        studentId: studentProfileId,
        completedAt: null,
      },
      orderBy: { startedAt: 'desc' },
    });

    if (!attempt) {
      throw new BadRequestException('No active attempt found. Start the quiz first.');
    }

    // Save response
    await this.prisma.questionResponse.create({
      data: {
        attemptId: attempt.id,
        questionId: dto.questionId,
        answer: dto.answer as any,
        isCorrect,
        timeSpent: dto.timeSpent,
      },
    });

    return {
      questionId: dto.questionId,
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
    };
  }

  async completeQuiz(quizId: string, studentProfileId: string): Promise<any> {
    const attempt = await this.prisma.quizAttempt.findFirst({
      where: {
        quizId,
        studentId: studentProfileId,
        completedAt: null,
      },
      orderBy: { startedAt: 'desc' },
      include: {
        responses: true,
        quiz: true,
      },
    });

    if (!attempt) {
      throw new BadRequestException('No active attempt found');
    }

    // Calculate score
    const correctCount = attempt.responses.filter((r) => r.isCorrect).length;
    const totalQuestions = attempt.totalQuestions;
    const score = totalQuestions > 0 ? correctCount / totalQuestions : 0;
    const passed = score >= attempt.quiz.passingScore;
    const isPerfect = score === 1.0;

    // Calculate XP earned
    let xpEarned = 0;
    if (passed) {
      xpEarned = attempt.quiz.xpReward;
      if (isPerfect) {
        xpEarned = Math.round(xpEarned * 1.5); // 50% bonus for perfect score
      }
    }

    const timeSpent = attempt.responses.reduce((sum, r) => sum + r.timeSpent, 0);

    // Update attempt
    const updatedAttempt = await this.prisma.quizAttempt.update({
      where: { id: attempt.id },
      data: {
        score,
        correctCount,
        timeSpent,
        passed,
        xpEarned,
        completedAt: new Date(),
      },
    });

    // Update topic progress if passed
    if (passed) {
      const quiz = await this.prisma.quiz.findUnique({
        where: { id: quizId },
      });

      if (quiz) {
        await this.prisma.studentProgress.upsert({
          where: {
            studentId_topicId: {
              studentId: studentProfileId,
              topicId: quiz.topicId,
            },
          },
          create: {
            studentId: studentProfileId,
            topicId: quiz.topicId,
            quizzesPassed: 1,
            averageScore: score,
            lastPracticed: new Date(),
            isUnlocked: true,
            unlockedAt: new Date(),
          },
          update: {
            quizzesPassed: { increment: 1 },
            averageScore: score, // Simplified - should be running average
            lastPracticed: new Date(),
          },
        });

        // Award XP via XpService (handles daily cap + streak bonus)
        if (xpEarned > 0) {
          await this.xpService.awardXP(
            studentProfileId,
            xpEarned,
            isPerfect ? 'QUIZ_PERFECT' : 'QUIZ_PASS',
            quizId,
            isPerfect ? 'Perfect quiz score!' : 'Quiz passed',
          );
        }

        // Update DEFEAT_BOSS quest if this is a boss battle quiz
        if (quiz.type === 'BOSS_BATTLE' && passed) {
          this.eventEmitter.emit('quest.update', {
            studentProfileId,
            questType: 'DEFEAT_BOSS',
            increment: 1,
          });
        }

        // Emit quiz completed event
        this.eventEmitter.emit(
          EVENTS.QUIZ_COMPLETED,
          new QuizCompletedEvent(
            studentProfileId,
            quizId,
            quiz.topicId,
            score,
            passed,
            isPerfect,
            xpEarned,
            timeSpent,
          ),
        );
      }
    }

    // Clean up active attempt tracking
    activeAttempts.delete(attempt.id);

    return {
      attemptId: attempt.id,
      score,
      correctCount,
      totalQuestions,
      passed,
      isPerfect,
      xpEarned,
      timeSpent,
      responses: attempt.responses,
    };
  }

  private evaluateAnswer(question: any, answer: unknown): boolean {
    const correct = question.correctAnswer;

    switch (question.type) {
      case 'MULTIPLE_CHOICE':
      case 'TRUE_FALSE':
        return answer === correct;
      case 'MULTIPLE_SELECT':
        if (!Array.isArray(answer) || !Array.isArray(correct)) return false;
        const answerSet = new Set(answer as string[]);
        const correctSet = new Set(correct as string[]);
        if (answerSet.size !== correctSet.size) return false;
        return [...correctSet].every((v) => answerSet.has(v));
      case 'NUMERIC_INPUT':
        const numAnswer = parseFloat(String(answer));
        const numCorrect = parseFloat(String(correct));
        const tolerance = (correct as any).tolerance || 0.001;
        return Math.abs(numAnswer - numCorrect) <= tolerance;
      case 'FREE_RESPONSE':
        // Basic string match - in production, would use AI
        return (
          String(answer).toLowerCase().trim() ===
          String(correct).toLowerCase().trim()
        );
      default:
        return JSON.stringify(answer) === JSON.stringify(correct);
    }
  }

  private async selectAdaptiveQuestions(quiz: any, studentProfileId: string) {
    // Get student's recent performance on this topic
    const recentAttempts = await this.prisma.quizAttempt.findMany({
      where: { studentId: studentProfileId, quizId: quiz.id },
      orderBy: { startedAt: 'desc' },
      take: 3,
      include: { responses: true },
    });

    let targetDifficulty = 'INTERMEDIATE';
    if (recentAttempts.length > 0) {
      const avgScore =
        recentAttempts.reduce((sum, a) => sum + a.score, 0) /
        recentAttempts.length;
      if (avgScore > 0.8) targetDifficulty = 'ADVANCED';
      else if (avgScore < 0.5) targetDifficulty = 'BEGINNER';
    }

    const questions = quiz.questions.filter(
      (q: any) => q.difficulty === targetDifficulty,
    );

    if (questions.length < quiz.minQuestions) {
      // Fall back to all questions if not enough of target difficulty
      return this.shuffleArray(quiz.questions).slice(0, quiz.maxQuestions);
    }

    return this.shuffleArray(questions).slice(0, quiz.maxQuestions);
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

}
