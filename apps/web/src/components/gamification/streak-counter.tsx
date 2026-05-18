'use client';

import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakCounterProps {
  current: number;
  longest?: number;
  className?: string;
  showFlame?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeConfig = {
  sm: { text: 'text-sm', icon: 'w-3.5 h-3.5', number: 'text-base' },
  md: { text: 'text-sm', icon: 'w-4 h-4', number: 'text-xl' },
  lg: { text: 'text-base', icon: 'w-6 h-6', number: 'text-3xl' },
};

export function StreakCounter({
  current,
  longest,
  className,
  showFlame = true,
  size = 'md',
}: StreakCounterProps) {
  const config = sizeConfig[size];
  const flameColor =
    current >= 100
      ? 'text-yellow-400'
      : current >= 60
        ? 'text-primary'
        : current >= 30
          ? 'text-primary'
          : current >= 14
            ? 'text-red-400'
            : 'text-streak';

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {showFlame && (
        <Flame className={cn(config.icon, flameColor, 'animate-flame-flicker')} />
      )}
      <span className={cn('font-bold text-foreground', config.number)}>{current}</span>
      {longest !== undefined && (
        <span className={cn('text-muted-foreground', config.text)}>/ {longest} best</span>
      )}
    </div>
  );
}
