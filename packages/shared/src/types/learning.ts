// ==================== LEARNING TYPES ====================

export enum Difficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
}

export enum LessonType {
  INTERACTIVE = 'INTERACTIVE',
  GUIDED = 'GUIDED',
  EXPLORATION = 'EXPLORATION',
  APPLICATION = 'APPLICATION',
}

export enum StepType {
  EXPLANATION = 'EXPLANATION',
  INTERACTIVE = 'INTERACTIVE',
  VISUALIZATION = 'VISUALIZATION',
  CHECKPOINT = 'CHECKPOINT',
  SUMMARY = 'SUMMARY',
}

export enum InteractionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  FREE_INPUT = 'FREE_INPUT',
  DRAG_DROP = 'DRAG_DROP',
  SLIDER = 'SLIDER',
  GRAPH_PLOT = 'GRAPH_PLOT',
  CODE_INPUT = 'CODE_INPUT',
  MATCHING = 'MATCHING',
  ORDERING = 'ORDERING',
  FILL_BLANK = 'FILL_BLANK',
  TRUE_FALSE = 'TRUE_FALSE',
  NUMERIC_INPUT = 'NUMERIC_INPUT',
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  MULTIPLE_SELECT = 'MULTIPLE_SELECT',
  FREE_RESPONSE = 'FREE_RESPONSE',
  NUMERIC_INPUT = 'NUMERIC_INPUT',
  FILL_BLANK = 'FILL_BLANK',
  MATCHING = 'MATCHING',
  ORDERING = 'ORDERING',
  TRUE_FALSE = 'TRUE_FALSE',
}

export enum QuizType {
  MASTERY_CHECK = 'MASTERY_CHECK',
  DIAGNOSTIC = 'DIAGNOSTIC',
  PRACTICE = 'PRACTICE',
  BOSS_BATTLE = 'BOSS_BATTLE',
  RETENTION_CHECK = 'RETENTION_CHECK',
  ASSIGNMENT = 'ASSIGNMENT',
}

export enum MasteryStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  PRACTICED = 'PRACTICED',
  PROFICIENT = 'PROFICIENT',
  MASTERED = 'MASTERED',
}

export enum BloomsLevel {
  REMEMBER = 'REMEMBER',
  UNDERSTAND = 'UNDERSTAND',
  APPLY = 'APPLY',
  ANALYZE = 'ANALYZE',
  EVALUATE = 'EVALUATE',
  CREATE = 'CREATE',
}

export interface Subject {
  id: string;
  name: string;
  slug: string;
  description?: string;
  iconUrl?: string;
  color?: string;
  order: number;
  isActive: boolean;
}

export interface Topic {
  id: string;
  subjectId: string;
  name: string;
  slug: string;
  description?: string;
  iconUrl?: string;
  order: number;
  difficulty: Difficulty;
  estimatedTime?: number;
  isActive: boolean;
  treeX?: number;
  treeY?: number;
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  slug: string;
  description?: string;
  order: number;
  type: LessonType;
  difficulty: Difficulty;
  xpReward: number;
  estimatedTime?: number;
  isActive: boolean;
}

export interface LessonStep {
  id: string;
  lessonId: string;
  order: number;
  type: StepType;
  content: Record<string, unknown>;
  interactionType?: InteractionType;
  correctAnswer?: unknown;
  hints?: string[];
  explanation?: string;
  xpReward: number;
}

export interface Quiz {
  id: string;
  topicId: string;
  title: string;
  slug: string;
  type: QuizType;
  difficulty: Difficulty;
  timeLimit?: number;
  passingScore: number;
  maxAttempts?: number;
  xpReward: number;
  isAdaptive: boolean;
  minQuestions: number;
  maxQuestions: number;
}

export interface Question {
  id: string;
  quizId?: string;
  topicId?: string;
  type: QuestionType;
  difficulty: Difficulty;
  stem: string;
  media?: Record<string, unknown>;
  options?: QuestionOption[];
  correctAnswer: unknown;
  explanation?: string;
  hints?: string[];
  conceptTags: string[];
  bloomsLevel: BloomsLevel;
  points: number;
}

export interface QuestionOption {
  id: string;
  label: string;
  content: string;
}

export interface StudentProgress {
  id: string;
  studentId: string;
  topicId: string;
  masteryLevel: number;
  masteryStatus: MasteryStatus;
  lessonsCompleted: number;
  totalLessons: number;
  quizzesPassed: number;
  averageScore: number;
  totalTimeSpent: number;
  lastPracticed?: string;
  retentionScore: number;
  nextReviewDate?: string;
  isUnlocked: boolean;
}

export interface SkillTreeNode {
  topicId: string;
  name: string;
  position: { x: number; y: number };
  masteryStatus: MasteryStatus;
  masteryLevel: number;
  isUnlocked: boolean;
  prerequisites: string[];
  dependents: string[];
}

export interface SkillTreeEdge {
  from: string;
  to: string;
  requiredMastery: number;
}

export interface SkillTree {
  subjectId: string;
  nodes: SkillTreeNode[];
  edges: SkillTreeEdge[];
}
