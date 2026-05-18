import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GamificationState {
  xp: {
    total: number;
    level: number;
    nextLevelXp: number;
    todayEarned: number;
  };
  streak: {
    current: number;
    longest: number;
    lastActiveDate: string | null;
    freezesAvailable: number;
  };
  rank: {
    name: string;
    tier: string;
    division: number;
    color: string;
  } | null;
  notifications: XPNotification[];
}

interface XPNotification {
  id: string;
  amount: number;
  source: string;
  timestamp: number;
}

interface GamificationActions {
  addXP: (amount: number, source: string) => void;
  updateStreak: (streak: Partial<GamificationState['streak']>) => void;
  updateRank: (rank: GamificationState['rank']) => void;
  setGamificationData: (data: Partial<GamificationState>) => void;
  dismissNotification: (id: string) => void;
}

export const useGamificationStore = create<GamificationState & GamificationActions>()(
  persist(
    (set) => ({
      xp: { total: 0, level: 1, nextLevelXp: 600, todayEarned: 0 },
      streak: { current: 0, longest: 0, lastActiveDate: null, freezesAvailable: 1 },
      rank: null,
      notifications: [],

      addXP: (amount, source) =>
        set((state) => ({
          xp: {
            ...state.xp,
            total: state.xp.total + amount,
            todayEarned: state.xp.todayEarned + amount,
          },
          notifications: [
            ...state.notifications,
            { id: `${Date.now()}-${Math.random()}`, amount, source, timestamp: Date.now() },
          ].slice(-5), // Keep last 5
        })),

      updateStreak: (streak) =>
        set((state) => ({
          streak: { ...state.streak, ...streak },
        })),

      updateRank: (rank) => set({ rank }),

      setGamificationData: (data) => set((state) => ({ ...state, ...data })),

      dismissNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
    }),
    {
      name: 'nexus-gamification',
      partialize: (state) => ({
        xp: state.xp,
        streak: state.streak,
        rank: state.rank,
      }),
    },
  ),
);
