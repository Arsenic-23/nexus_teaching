'use client';

import { cn } from '@/lib/utils';

interface MasteryRingProps {
  level: number; // 0-1
  size?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
}

const STATUS_COLORS: Record<string, { stroke: string; glow: string; label: string }> = {
  not_started: { stroke: 'stroke-muted', glow: '', label: 'Not Started' },
  in_progress: { stroke: 'stroke-primary', glow: 'drop-shadow(0 0 6px rgba(59,130,246,0.5))', label: 'In Progress' },
  practiced: { stroke: 'stroke-purple-500', glow: 'drop-shadow(0 0 6px rgba(139,92,246,0.5))', label: 'Practiced' },
  proficient: { stroke: 'stroke-violet-400', glow: 'drop-shadow(0 0 8px rgba(139,92,246,0.6))', label: 'Proficient' },
  mastered: { stroke: 'stroke-yellow-400', glow: 'drop-shadow(0 0 12px rgba(251,191,36,0.7))', label: 'Mastered' },
};

function getMasteryStatus(level: number) {
  if (level === 0) return 'not_started';
  if (level < 0.4) return 'in_progress';
  if (level < 0.7) return 'practiced';
  if (level < 0.9) return 'proficient';
  return 'mastered';
}

export function MasteryRing({ level, size = 48, className, showLabel = false, label }: MasteryRingProps) {
  const status = getMasteryStatus(level);
  const colors = STATUS_COLORS[status];

  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - level * circumference;
  const center = size / 2;

  return (
    <div className={cn('relative inline-flex items-center justify-center flex-col gap-1', className)}>
      <svg
        width={size}
        height={size}
        style={{ filter: colors.glow }}
        className="-rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={4}
          className="stroke-secondary"
        />
        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={4}
          strokeLinecap="round"
          className={cn(colors.stroke, 'transition-all duration-1000 ease-out')}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      {showLabel && (
        <span className="text-xs text-muted-foreground">{label || colors.label}</span>
      )}
    </div>
  );
}
