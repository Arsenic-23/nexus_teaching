'use client';

import { motion } from 'framer-motion';
import { Sword, Target, Clock, Zap, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface PracticeDailyQuestCardProps {
  quest: {
    id: string;
    title: string;
    description: string;
    type: 'lesson' | 'quiz' | 'review' | 'boss' | 'streak';
    current: number;
    target: number;
    xpReward: number;
    completed: boolean;
    href?: string;
    estimatedMinutes?: number;
  };
  className?: string;
}

const questTypeConfig = {
  lesson: { icon: '📚', color: 'text-primary', bg: 'bg-primary/10 border-primary/20' },
  quiz: { icon: '⚡', color: 'text-mastery', bg: 'bg-mastery/10 border-mastery/20' },
  review: { icon: '🔄', color: 'text-primary', bg: 'bg-primary/10 border-border' },
  boss: { icon: '⚔️', color: 'text-destructive', bg: 'bg-destructive/10 border-destructive/20' },
  streak: { icon: '🔥', color: 'text-streak', bg: 'bg-streak/10 border-streak/20' },
};

export function PracticeDailyQuestCard({ quest, className }: PracticeDailyQuestCardProps) {
  const config = questTypeConfig[quest.type];
  const progress = Math.min((quest.current / quest.target) * 100, 100);

  return (
    <motion.div
      whileHover={{ y: -1 }}
      className={cn(
        'p-4 rounded-xl border transition-all duration-200',
        quest.completed
          ? 'border-success/20 bg-success/5 opacity-80'
          : `${config.bg} hover:shadow-md`,
        className,
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="w-10 h-10 rounded-xl bg-secondary/80 flex items-center justify-center text-xl shrink-0">
          {quest.completed ? '✅' : config.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <p className={cn(
              'font-semibold text-sm',
              quest.completed && 'line-through text-muted-foreground',
            )}>
              {quest.title}
            </p>
            <Badge variant="xp" className="shrink-0 text-xs">
              <Zap className="w-2.5 h-2.5 mr-0.5" />
              {quest.xpReward}
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground mb-2">{quest.description}</p>

          {!quest.completed && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{quest.current}/{quest.target}</span>
                {quest.estimatedMinutes && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>~{quest.estimatedMinutes}min</span>
                  </div>
                )}
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          )}
        </div>
      </div>

      {!quest.completed && quest.href && (
        <Link href={quest.href} className="mt-3 block">
          <Button size="sm" variant="outline" className={cn('w-full gap-2 text-xs', config.color)}>
            Start
            <ArrowRight className="w-3 h-3" />
          </Button>
        </Link>
      )}
    </motion.div>
  );
}
