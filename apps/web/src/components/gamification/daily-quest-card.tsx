'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DailyQuestCardProps {
  quest: {
    id: string;
    title: string;
    description?: string;
    type: string;
    current: number;
    target: number;
    xpReward: number;
    completed: boolean;
    icon?: string;
  };
  onClick?: () => void;
  className?: string;
}

export function DailyQuestCard({ quest, onClick, className }: DailyQuestCardProps) {
  const progress = Math.min((quest.current / quest.target) * 100, 100);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer',
        quest.completed
          ? 'border-success/20 bg-success/5'
          : 'border-border bg-card/50 hover:border-primary/30 hover:bg-card',
        className,
      )}
    >
      {/* Status Icon */}
      <div className="shrink-0">
        {quest.completed ? (
          <CheckCircle2 className="w-5 h-5 text-success" />
        ) : quest.icon ? (
          <span className="text-xl leading-none">{quest.icon}</span>
        ) : (
          <Circle className="w-5 h-5 text-muted-foreground" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <p
            className={cn(
              'text-sm font-medium truncate',
              quest.completed && 'line-through text-muted-foreground',
            )}
          >
            {quest.title}
          </p>
          <Badge variant="xp" className="text-xs shrink-0">
            <Zap className="w-2.5 h-2.5 mr-0.5" />
            {quest.xpReward}
          </Badge>
        </div>

        {!quest.completed && (
          <div className="space-y-1">
            <Progress value={progress} className="h-1.5" />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {quest.current}/{quest.target}
              </p>
              {quest.description && (
                <p className="text-xs text-muted-foreground truncate">{quest.description}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
