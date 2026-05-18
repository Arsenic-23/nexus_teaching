'use client';

import { cn } from '@/lib/utils';

interface XPBarProps {
  currentXp: number;
  nextLevelXp: number;
  level: number;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-3.5',
};

export function XPBar({
  currentXp,
  nextLevelXp,
  level,
  className,
  showLabel = true,
  size = 'md',
}: XPBarProps) {
  const progress = Math.min(100, (currentXp / nextLevelXp) * 100);

  return (
    <div className={cn('space-y-1', className)}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-foreground">Level {level}</span>
          <span className="text-muted-foreground">
            {currentXp.toLocaleString()} / {nextLevelXp.toLocaleString()} XP
          </span>
        </div>
      )}
      <div className={cn('relative w-full overflow-hidden rounded-full bg-secondary', sizeClasses[size])}>
        <div
          className="h-full bg-gradient-xp transition-all duration-1000 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
