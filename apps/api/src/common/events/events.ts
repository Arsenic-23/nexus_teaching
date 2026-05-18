// ==================== Application Events ====================

// Learning Events
export class LessonCompletedEvent {
  constructor(
    public readonly studentProfileId: string,
    public readonly lessonId: string,
    public readonly topicId: string,
    public readonly xpEarned: number,
    public readonly score: number,
    public readonly timeSpent: number,
  ) {}
}

export class QuizCompletedEvent {
  constructor(
    public readonly studentProfileId: string,
    public readonly quizId: string,
    public readonly topicId: string,
    public readonly score: number,
    public readonly passed: boolean,
    public readonly isPerfect: boolean,
    public readonly xpEarned: number,
    public readonly timeSpent: number,
  ) {}
}

export class LessonStepCompletedEvent {
  constructor(
    public readonly studentProfileId: string,
    public readonly lessonId: string,
    public readonly stepId: string,
    public readonly correct: boolean,
    public readonly firstTry: boolean,
  ) {}
}

// Gamification Events
export class XPEarnedEvent {
  constructor(
    public readonly studentProfileId: string,
    public readonly amount: number,
    public readonly source: string,
    public readonly sourceId: string | null,
    public readonly totalXp: number,
    public readonly level: number,
  ) {}
}

export class RankUpEvent {
  constructor(
    public readonly studentProfileId: string,
    public readonly userId: string,
    public readonly newRankId: string,
    public readonly previousRankId: string | null,
  ) {}
}

export class AchievementUnlockedEvent {
  constructor(
    public readonly studentProfileId: string,
    public readonly userId: string,
    public readonly achievementId: string,
    public readonly xpReward: number,
  ) {}
}

export class StreakUpdatedEvent {
  constructor(
    public readonly studentProfileId: string,
    public readonly userId: string,
    public readonly currentStreak: number,
    public readonly longestStreak: number,
    public readonly maintained: boolean,
  ) {}
}

export class QuestCompletedEvent {
  constructor(
    public readonly studentProfileId: string,
    public readonly questId: string,
    public readonly xpReward: number,
  ) {}
}

// AI Events
export class TutorSessionCreatedEvent {
  constructor(
    public readonly studentProfileId: string,
    public readonly sessionId: string,
  ) {}
}

// Event Names
export const EVENTS = {
  LESSON_COMPLETED: 'lesson.completed',
  LESSON_STEP_COMPLETED: 'lesson.step.completed',
  QUIZ_COMPLETED: 'quiz.completed',
  XP_EARNED: 'xp.earned',
  RANK_UP: 'rank.up',
  ACHIEVEMENT_UNLOCKED: 'achievement.unlocked',
  STREAK_UPDATED: 'streak.updated',
  QUEST_COMPLETED: 'quest.completed',
  TUTOR_SESSION_CREATED: 'tutor.session.created',
} as const;
