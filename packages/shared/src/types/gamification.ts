// ==================== GAMIFICATION TYPES ====================

export enum XPSource {
  LESSON_COMPLETE = 'LESSON_COMPLETE',
  QUIZ_PASS = 'QUIZ_PASS',
  QUIZ_PERFECT = 'QUIZ_PERFECT',
  STREAK_BONUS = 'STREAK_BONUS',
  DAILY_QUEST = 'DAILY_QUEST',
  BOSS_BATTLE = 'BOSS_BATTLE',
  ACHIEVEMENT = 'ACHIEVEMENT',
  RETENTION_REVIEW = 'RETENTION_REVIEW',
  FIRST_TRY_CORRECT = 'FIRST_TRY_CORRECT',
  EXPLANATION_QUALITY = 'EXPLANATION_QUALITY',
}

export enum RankTier {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
  DIAMOND = 'DIAMOND',
  MASTER = 'MASTER',
}

export enum AchievementCategory {
  LEARNING = 'LEARNING',
  MASTERY = 'MASTERY',
  STREAK = 'STREAK',
  SOCIAL = 'SOCIAL',
  CHALLENGE = 'CHALLENGE',
  MILESTONE = 'MILESTONE',
  EXPLORATION = 'EXPLORATION',
}

export enum Rarity {
  COMMON = 'COMMON',
  UNCOMMON = 'UNCOMMON',
  RARE = 'RARE',
  EPIC = 'EPIC',
  LEGENDARY = 'LEGENDARY',
}

export enum QuestType {
  COMPLETE_LESSONS = 'COMPLETE_LESSONS',
  PASS_QUIZZES = 'PASS_QUIZZES',
  EARN_XP = 'EARN_XP',
  MAINTAIN_STREAK = 'MAINTAIN_STREAK',
  REVIEW_TOPICS = 'REVIEW_TOPICS',
  PERFECT_SCORE = 'PERFECT_SCORE',
  USE_AI_TUTOR = 'USE_AI_TUTOR',
  DEFEAT_BOSS = 'DEFEAT_BOSS',
}

export enum LeaderboardType {
  WEEKLY_XP = 'WEEKLY_XP',
  MONTHLY_XP = 'MONTHLY_XP',
  ALL_TIME_XP = 'ALL_TIME_XP',
  WEEKLY_MASTERY = 'WEEKLY_MASTERY',
  CLASS_XP = 'CLASS_XP',
}

export interface XPTransaction {
  id: string;
  studentId: string;
  amount: number;
  source: XPSource;
  sourceId?: string;
  description?: string;
  multiplier: number;
  streakBonus: number;
  createdAt: string;
}

export interface Rank {
  id: string;
  name: string;
  tier: RankTier;
  division: number;
  minXp: number;
  maxXp: number;
  iconUrl?: string;
  color?: string;
  glowColor?: string;
  order: number;
}

export interface Streak {
  id: string;
  studentId: string;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate?: string;
  freezesAvailable: number;
  freezeUsedToday: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconUrl?: string;
  category: AchievementCategory;
  criteria: Record<string, unknown>;
  xpReward: number;
  rarity: Rarity;
  isActive: boolean;
}

export interface StudentAchievement {
  id: string;
  studentId: string;
  achievementId: string;
  achievement: Achievement;
  unlockedAt: string;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  type: QuestType;
  targetValue: number;
  xpReward: number;
}

export interface QuestProgress {
  id: string;
  studentId: string;
  questId: string;
  quest: DailyQuest;
  currentValue: number;
  isCompleted: boolean;
  completedAt?: string;
  assignedDate: string;
}

export interface LeaderboardEntry {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  rank: Rank;
  type: LeaderboardType;
  scope: string;
  score: number;
  position: number;
  change: number;
}

export interface GamificationState {
  xp: {
    total: number;
    todayEarned: number;
    level: number;
    nextLevelXp: number;
  };
  rank: Rank;
  streak: Streak;
  dailyQuests: QuestProgress[];
  recentAchievements: StudentAchievement[];
}
