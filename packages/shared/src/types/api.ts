// ==================== API TYPES ====================

export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  cursor?: string;
  hasMore?: boolean;
  total?: number;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: unknown;
    statusCode: number;
  };
}

export interface PaginationQuery {
  cursor?: string;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// WebSocket Event Types
export interface WSEvent<T = unknown> {
  event: string;
  data: T;
  timestamp: string;
}

export interface XPGainedEvent {
  amount: number;
  source: string;
  total: number;
  level: number;
  multiplier?: number;
  streakBonus?: number;
}

export interface RankUpEvent {
  newRank: {
    name: string;
    tier: string;
    division: number;
    color: string;
  };
  previousRank: {
    name: string;
    tier: string;
    division: number;
  };
}

export interface AchievementUnlockedEvent {
  achievement: {
    id: string;
    name: string;
    description: string;
    iconUrl?: string;
    rarity: string;
  };
  xpReward: number;
}

export interface StreakUpdatedEvent {
  current: number;
  longest: number;
  maintained: boolean;
}

export interface QuestCompletedEvent {
  quest: {
    id: string;
    title: string;
  };
  xpReward: number;
}

export interface NotificationEvent {
  id: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, unknown>;
}
