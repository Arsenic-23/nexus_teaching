// ==================== AI TYPES ====================

export enum AIPurpose {
  TUTORING = 'tutoring',
  HINTS = 'hints',
  EXPLANATION = 'explanation',
  MISCONCEPTION_DETECTION = 'misconceptionDetection',
  ADAPTIVE_RECOMMENDATION = 'adaptiveRecommendation',
  STRUCTURED_OUTPUT = 'structuredOutput',
}

export enum MessageRole {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
  SYSTEM = 'SYSTEM',
}

export enum SessionStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ABANDONED = 'ABANDONED',
}

export interface TutorSession {
  id: string;
  studentId: string;
  topicId?: string;
  lessonId?: string;
  status: SessionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TutorMessage {
  id: string;
  sessionId: string;
  role: MessageRole;
  content: string;
  model?: string;
  createdAt: string;
}

export interface HintRequest {
  questionId: string;
  lessonStepId?: string;
  currentHintLevel: number;
  studentAnswer?: string;
}

export interface HintResponse {
  hintLevel: number;
  hint: string;
  xpPenalty: number;
  remainingHints: number;
  isLastHint: boolean;
}

export interface AIRecommendation {
  type: 'RETENTION_REVIEW' | 'WEAK_AREA_PRACTICE' | 'CONTINUE_LEARNING' | 'BOSS_BATTLE';
  priority: 'HIGH' | 'MEDIUM' | 'NORMAL' | 'LOW';
  topicId?: string;
  lessonId?: string;
  reason: string;
  estimatedTime: number;
  xpReward: number;
}

export interface WeakArea {
  topicId: string;
  topicName: string;
  severity: 'critical' | 'moderate' | 'mild';
  indicators: string[];
  suggestedAction: string;
  estimatedRecoveryTime: number;
}
