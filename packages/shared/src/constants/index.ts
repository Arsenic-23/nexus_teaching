// ==================== PLATFORM CONSTANTS ====================

export const APP_NAME = 'Nexsori Learning';
export const APP_DESCRIPTION = 'Next-generation gamified mastery-based learning platform';

// ==================== XP CONSTANTS ====================

export const XP_REWARDS = {
  LESSON_STEP_CORRECT: 10,
  LESSON_COMPLETE: 50,
  QUIZ_PASS: 100,
  QUIZ_PERFECT: 200,
  BOSS_BATTLE_WIN: 300,
  BOSS_BATTLE_PERFECT: 500,
  DAILY_QUEST: 25,
  RETENTION_REVIEW: 30,
  FIRST_TRY_BONUS: 15,
  STREAK_PER_DAY: 2,
  STREAK_CAP: 50,
  RANK_UP_BONUS: 100,
} as const;

export const XP_MULTIPLIERS = {
  FIRST_TRY: 1.5,
  ADVANCED_DIFFICULTY: 1.25,
  EXPERT_DIFFICULTY: 1.5,
  CONSISTENCY_BONUS: 1.15,
  PERFECT_RUN: 2.0,
  HINT_PENALTY: 0.5,
  REPEAT_CONTENT: 0.25,
} as const;

export const XP_LIMITS = {
  MAX_PER_30_MIN: 500,
  MIN_TIME_PER_QUESTION: 5, // seconds
  MIN_ACCURACY_FOR_XP: 0.3,
} as const;

// ==================== RANK THRESHOLDS ====================

export const RANK_THRESHOLDS = [
  { tier: 'BRONZE', division: 1, minXp: 0, name: 'Bronze I' },
  { tier: 'BRONZE', division: 2, minXp: 600, name: 'Bronze II' },
  { tier: 'BRONZE', division: 3, minXp: 1200, name: 'Bronze III' },
  { tier: 'SILVER', division: 1, minXp: 2000, name: 'Silver I' },
  { tier: 'SILVER', division: 2, minXp: 3500, name: 'Silver II' },
  { tier: 'SILVER', division: 3, minXp: 5000, name: 'Silver III' },
  { tier: 'GOLD', division: 1, minXp: 7000, name: 'Gold I' },
  { tier: 'GOLD', division: 2, minXp: 9000, name: 'Gold II' },
  { tier: 'GOLD', division: 3, minXp: 12000, name: 'Gold III' },
  { tier: 'PLATINUM', division: 1, minXp: 16000, name: 'Platinum I' },
  { tier: 'PLATINUM', division: 2, minXp: 20000, name: 'Platinum II' },
  { tier: 'PLATINUM', division: 3, minXp: 25000, name: 'Platinum III' },
  { tier: 'DIAMOND', division: 1, minXp: 30000, name: 'Diamond I' },
  { tier: 'DIAMOND', division: 2, minXp: 35000, name: 'Diamond II' },
  { tier: 'DIAMOND', division: 3, minXp: 40000, name: 'Diamond III' },
  { tier: 'MASTER', division: 1, minXp: 50000, name: 'Master' },
] as const;

// ==================== RANK COLORS ====================

export const RANK_COLORS = {
  BRONZE: { primary: '#cd7f32', glow: 'rgba(205, 127, 50, 0.3)' },
  SILVER: { primary: '#c0c0c0', glow: 'rgba(192, 192, 192, 0.3)' },
  GOLD: { primary: '#ffd700', glow: 'rgba(255, 215, 0, 0.3)' },
  PLATINUM: { primary: '#e5e4e2', glow: 'rgba(229, 228, 226, 0.3)' },
  DIAMOND: { primary: '#b9f2ff', glow: 'rgba(185, 242, 255, 0.3)' },
  MASTER: { primary: '#ff6b35', glow: 'rgba(255, 107, 53, 0.3)' },
} as const;

// ==================== MASTERY CONSTANTS ====================

export const MASTERY_THRESHOLDS = {
  NOT_STARTED: 0,
  IN_PROGRESS: 0.01,
  PRACTICED: 0.4,
  PROFICIENT: 0.7,
  MASTERED: 0.9,
} as const;

export const MASTERY_WEIGHTS = {
  QUIZ_ACCURACY: 0.35,
  CONSISTENCY: 0.2,
  RETENTION: 0.25,
  APPLICATION: 0.2,
} as const;

export const MASTERY_DECAY = {
  GRACE_PERIOD_DAYS: 3,
  DECAY_RATE_PER_DAY: 0.02,
  MAX_DECAY: 0.4,
  FLOOR: 0.3,
} as const;

// ==================== STREAK CONSTANTS ====================

export const STREAK_MILESTONES = [
  { days: 3, reward: 'freeze', xp: 0 },
  { days: 7, reward: 'achievement', xp: 50 },
  { days: 14, reward: 'freeze', xp: 0 },
  { days: 30, reward: 'achievement', xp: 200 },
  { days: 60, reward: 'achievement', xp: 500 },
  { days: 100, reward: 'achievement', xp: 1000 },
  { days: 365, reward: 'permanent_boost', xp: 2000 },
] as const;

// ==================== AI CONSTANTS ====================

export const AI_RATE_LIMITS = {
  FREE: { queriesPerDay: 10, tutorMessagesPerDay: 5, hintsPerDay: 10 },
  STUDENT_PRO: { queriesPerDay: 100, tutorMessagesPerDay: 50, hintsPerDay: -1 },
  SCHOOL: { queriesPerDay: 200, tutorMessagesPerDay: 100, hintsPerDay: -1 },
  ENTERPRISE: { queriesPerDay: -1, tutorMessagesPerDay: -1, hintsPerDay: -1 },
} as const;

export const HINT_LEVELS = {
  1: { xpPenaltyPercent: 25, description: 'General direction' },
  2: { xpPenaltyPercent: 50, description: 'Specific guidance' },
  3: { xpPenaltyPercent: 75, description: 'Near-complete walkthrough' },
} as const;

// ==================== PAGINATION ====================

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// ==================== CLASSROOM CONSTANTS ====================

export const CLASSROOM_DEFAULTS = {
  MAX_STUDENTS: 40,
  JOIN_CODE_LENGTH: 6,
} as const;
