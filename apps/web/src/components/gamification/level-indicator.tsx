'use client';

import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LevelIndicatorProps {
  level: number;
  currentXp: number;
  nextLevelXp: number;
  size?: 'sm' | 'md' | 'lg';
  showProgress?: boolean;
  className?: string;
}

export function LevelIndicator({
  level,
  currentXp,
  nextLevelXp,
  size = 'md',
  showProgress = true,
  className,
}: LevelIndicatorProps) {
  const progress = Math.min((currentXp / nextLevelXp) * 100, 100);

  const sizeClasses = {
    sm: { badge: 'w-8 h-8 text-xs', icon: 'w-3 h-3', label: 'text-xs', bar: 'h-1' },
    md: { badge: 'w-10 h-10 text-sm', icon: 'w-4 h-4', label: 'text-sm', bar: 'h-1.5' },
    lg: { badge: 'w-14 h-14 text-base', icon: 'w-5 h-5', label: 'text-base', bar: 'h-2' },
  };

  const classes = sizeClasses[size];

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Level badge */}
      <div
        className={cn(
          'rounded-xl bg-gradient-xp flex items-center justify-center font-bold text-white shrink-0 glow-brand',
          classes.badge,
        )}
      >
        {level}
      </div>

      {/* XP info */}
      {showProgress && (
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              <Zap className={cn('text-brand', classes.icon)} />
              <span className={cn('font-semibold', classes.label)}>Level {level}</span>
            </div>
            <span className={cn('text-muted-foreground', classes.label)}>
              {currentXp.toLocaleString()}/{nextLevelXp.toLocaleString()}
            </span>
          </div>
          <div className={cn('w-full rounded-full bg-secondary overflow-hidden', classes.bar)}>
            <div
              className="h-full bg-gradient-xp rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
