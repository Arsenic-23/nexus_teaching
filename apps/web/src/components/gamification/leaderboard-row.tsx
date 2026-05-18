'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Zap } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface LeaderboardRowProps {
  entry: {
    position: number;
    previousPosition?: number;
    name: string;
    avatarUrl?: string;
    xp: number;
    level?: number;
    rankName?: string;
    rankColor?: string;
    isCurrentUser?: boolean;
  };
  className?: string;
}

function PositionChange({ current, previous }: { current: number; previous?: number }) {
  if (!previous) return null;
  const diff = previous - current;
  if (diff > 0)
    return (
      <span className="flex items-center text-xs text-success font-semibold">
        <TrendingUp className="w-3 h-3 mr-0.5" />+{diff}
      </span>
    );
  if (diff < 0)
    return (
      <span className="flex items-center text-xs text-destructive font-semibold">
        <TrendingDown className="w-3 h-3 mr-0.5" />{diff}
      </span>
    );
  return (
    <span className="flex items-center text-xs text-muted-foreground">
      <Minus className="w-3 h-3" />
    </span>
  );
}

const positionEmojis: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

export function LeaderboardRow({ entry, className }: LeaderboardRowProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        'flex items-center gap-3 p-3 rounded-xl transition-all duration-200',
        entry.isCurrentUser
          ? 'bg-primary/10 border border-primary/20 glow-brand'
          : 'hover:bg-secondary/50 border border-transparent',
        className,
      )}
    >
      {/* Position */}
      <div className="w-8 text-center shrink-0">
        {positionEmojis[entry.position] ? (
          <span className="text-lg">{positionEmojis[entry.position]}</span>
        ) : (
          <span className="text-sm font-bold text-muted-foreground">#{entry.position}</span>
        )}
      </div>

      {/* Avatar */}
      <Avatar className="w-8 h-8 shrink-0">
        <AvatarImage src={entry.avatarUrl} alt={entry.name} />
        <AvatarFallback className="text-xs">
          {entry.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {/* Name + Rank */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={cn('text-sm truncate', entry.isCurrentUser && 'font-bold')}>
            {entry.name}
            {entry.isCurrentUser && (
              <span className="ml-1 text-xs text-primary">(You)</span>
            )}
          </p>
          {entry.rankName && (
            <span
              className="text-xs font-semibold shrink-0 hidden sm:block"
              style={{ color: entry.rankColor || 'inherit' }}
            >
              {entry.rankName}
            </span>
          )}
        </div>
        {entry.level && (
          <p className="text-xs text-muted-foreground">Level {entry.level}</p>
        )}
      </div>

      {/* XP + Change */}
      <div className="flex flex-col items-end gap-0.5 shrink-0">
        <div className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-brand" />
          <span className="text-sm font-bold">{entry.xp.toLocaleString()}</span>
        </div>
        <PositionChange current={entry.position} previous={entry.previousPosition} />
      </div>
    </motion.div>
  );
}
