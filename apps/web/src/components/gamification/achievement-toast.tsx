'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type Rarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

interface AchievementToastProps {
  achievement: {
    name: string;
    description: string;
    rarity: Rarity;
    xpReward?: number;
    icon?: string;
  };
  visible: boolean;
  onClose?: () => void;
  className?: string;
}

const rarityConfig: Record<Rarity, { color: string; glow: string; label: string; bg: string }> = {
  COMMON: {
    color: 'text-muted-foreground',
    glow: 'shadow-none',
    label: 'Common',
    bg: 'border-border bg-card',
  },
  RARE: {
    color: 'text-blue-400',
    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]',
    label: 'Rare',
    bg: 'border-blue-500/30 bg-blue-500/5',
  },
  EPIC: {
    color: 'text-purple-400',
    glow: 'shadow-[0_0_25px_rgba(139,92,246,0.4)]',
    label: 'Epic',
    bg: 'border-purple-500/30 bg-purple-500/5',
  },
  LEGENDARY: {
    color: 'text-mastery',
    glow: 'shadow-[0_0_30px_rgba(251,191,36,0.5)]',
    label: 'Legendary',
    bg: 'border-mastery/30 bg-mastery/5',
  },
};

export function AchievementToast({ achievement, visible, onClose, className }: AchievementToastProps) {
  const config = rarityConfig[achievement.rarity];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={cn(
            'fixed bottom-6 right-6 z-50 flex items-start gap-3 p-4 rounded-xl border max-w-sm',
            config.bg,
            config.glow,
            className,
          )}
        >
          {/* Icon */}
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0',
              'bg-secondary/80',
            )}
          >
            {achievement.icon || '🏆'}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <Star className={cn('w-3 h-3', config.color)} />
              <span className={cn('text-xs font-semibold uppercase tracking-wider', config.color)}>
                {config.label} Achievement
              </span>
            </div>
            <p className="font-semibold text-sm text-foreground">{achievement.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
              {achievement.description}
            </p>
            {achievement.xpReward && (
              <div className="flex items-center gap-1 mt-1.5">
                <Zap className="w-3 h-3 text-brand" />
                <span className="text-xs font-semibold text-brand">+{achievement.xpReward} XP</span>
              </div>
            )}
          </div>

          {/* Close */}
          {onClose && (
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
