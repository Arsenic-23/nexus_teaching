'use client';

import { motion } from 'framer-motion';
import { Lock, CheckCircle2, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export type MasteryState = 'locked' | 'available' | 'in_progress' | 'mastered';

export interface SkillNodeData {
  id: string;
  title: string;
  masteryState: MasteryState;
  masteryPercent?: number;
  lessonCount?: number;
  href?: string;
}

interface SkillNodeProps {
  node: SkillNodeData;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

const stateConfig: Record<MasteryState, {
  bg: string;
  border: string;
  text: string;
  icon: React.ElementType;
  glow?: string;
}> = {
  locked: {
    bg: 'bg-secondary/60',
    border: 'border-border',
    text: 'text-muted-foreground',
    icon: Lock,
  },
  available: {
    bg: 'bg-card',
    border: 'border-primary/40',
    text: 'text-foreground',
    icon: BookOpen,
    glow: 'shadow-[0_0_15px_rgba(59,130,246,0.2)]',
  },
  in_progress: {
    bg: 'bg-primary/10',
    border: 'border-primary/60',
    text: 'text-primary',
    icon: BookOpen,
    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]',
  },
  mastered: {
    bg: 'bg-success/10',
    border: 'border-success/50',
    text: 'text-success',
    icon: CheckCircle2,
    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.25)]',
  },
};

export function SkillNode({ node, isSelected, onClick, className }: SkillNodeProps) {
  const config = stateConfig[node.masteryState];
  const Icon = config.icon;
  const isLocked = node.masteryState === 'locked';

  return (
    <motion.div
      whileHover={!isLocked ? { scale: 1.05 } : {}}
      whileTap={!isLocked ? { scale: 0.95 } : {}}
      onClick={!isLocked ? onClick : undefined}
      className={cn(
        'w-20 h-20 rounded-2xl flex flex-col items-center justify-center gap-1 border-2 transition-all duration-200 select-none',
        config.bg,
        config.border,
        config.glow,
        !isLocked && 'cursor-pointer',
        isLocked && 'opacity-60',
        isSelected && 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-105',
        className,
      )}
    >
      <Icon className={cn('w-6 h-6', config.text)} />
      <span className={cn('text-[9px] font-bold text-center leading-tight px-1 line-clamp-2', config.text)}>
        {node.title}
      </span>

      {/* Mastery ring progress for in_progress */}
      {node.masteryState === 'in_progress' && node.masteryPercent !== undefined && (
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
          <span className="text-[7px] font-bold text-primary">
            {node.masteryPercent}%
          </span>
        </div>
      )}

      {/* Lesson count badge */}
      {node.lessonCount !== undefined && (
        <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-card border border-border rounded-full text-[8px] font-bold text-muted-foreground flex items-center justify-center">
          {node.lessonCount}
        </span>
      )}
    </motion.div>
  );
}
