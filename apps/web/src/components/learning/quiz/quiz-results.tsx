'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Zap, RotateCcw, ArrowRight, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface QuizResultsProps {
  score: number;
  total: number;
  xpEarned: number;
  timeSpent?: number; // seconds
  results: Array<{
    questionId: string;
    question: string;
    correct: boolean;
  }>;
  onRetry?: () => void;
  nextHref?: string;
  nextLabel?: string;
  className?: string;
}

export function QuizResults({
  score,
  total,
  xpEarned,
  timeSpent,
  results,
  onRetry,
  nextHref,
  nextLabel = 'Continue',
  className,
}: QuizResultsProps) {
  const percentage = Math.round((score / total) * 100);
  const isPerfect = score === total;
  const isPassing = percentage >= 70;

  const gradeConfig = isPerfect
    ? { emoji: '🏆', label: 'Perfect Score!', color: 'text-mastery', bg: 'bg-mastery/10 border-mastery/20' }
    : percentage >= 90
      ? { emoji: '⭐', label: 'Excellent!', color: 'text-success', bg: 'bg-success/10 border-success/20' }
      : percentage >= 70
        ? { emoji: '✅', label: 'Good Job!', color: 'text-primary', bg: 'bg-primary/10 border-primary/20' }
        : { emoji: '📚', label: 'Keep Practicing', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Score card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn('p-6 rounded-2xl border text-center', gradeConfig.bg)}
      >
        <div className="text-5xl mb-3">{gradeConfig.emoji}</div>
        <h2 className={cn('text-2xl font-display font-bold mb-1', gradeConfig.color)}>
          {gradeConfig.label}
        </h2>
        <p className="text-4xl font-bold mb-1">
          {score}/{total}
        </p>
        <p className="text-muted-foreground text-sm">{percentage}% correct</p>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Zap className="w-4 h-4 text-brand" />
            <span className="font-bold text-brand">+{xpEarned}</span>
          </div>
          <p className="text-xs text-muted-foreground">XP Earned</p>
        </div>
        <div className="text-center p-3 rounded-xl border border-border bg-card">
          <p className="font-bold text-success mb-1">{score}</p>
          <p className="text-xs text-muted-foreground">Correct</p>
        </div>
        <div className="text-center p-3 rounded-xl border border-border bg-card">
          <p className="font-bold text-destructive mb-1">{total - score}</p>
          <p className="text-xs text-muted-foreground">Incorrect</p>
        </div>
      </div>

      {/* Score bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Score</span>
          <span>{percentage}%</span>
        </div>
        <Progress
          value={percentage}
          className="h-3"
        />
      </div>

      {/* Question breakdown */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-muted-foreground">Review</p>
        {results.map((r, i) => (
          <div
            key={r.questionId}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg border text-sm',
              r.correct
                ? 'border-success/20 bg-success/5'
                : 'border-destructive/20 bg-destructive/5',
            )}
          >
            {r.correct ? (
              <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-destructive shrink-0" />
            )}
            <span className="text-xs text-muted-foreground mr-1">Q{i + 1}.</span>
            <span className="flex-1 truncate">{r.question}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {onRetry && (
          <Button variant="outline" onClick={onRetry} className="gap-2 flex-1">
            <RotateCcw className="w-4 h-4" />
            Retry
          </Button>
        )}
        {nextHref && (
          <Link href={nextHref} className="flex-1">
            <Button variant={isPassing ? 'glow' : 'default'} className="w-full gap-2">
              {nextLabel}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
