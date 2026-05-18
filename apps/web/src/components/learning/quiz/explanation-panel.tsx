'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExplanationPanelProps {
  correct: boolean;
  explanation: string;
  correctAnswerLabel?: string;
  tip?: string;
  defaultOpen?: boolean;
  className?: string;
}

export function ExplanationPanel({
  correct,
  explanation,
  correctAnswerLabel,
  tip,
  defaultOpen = true,
  className,
}: ExplanationPanelProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'rounded-xl border overflow-hidden',
        correct ? 'border-success/30 bg-success/5' : 'border-destructive/30 bg-destructive/5',
        className,
      )}
    >
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        {correct ? (
          <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
        ) : (
          <XCircle className="w-5 h-5 text-destructive shrink-0" />
        )}
        <span className={cn('font-semibold', correct ? 'text-success' : 'text-destructive')}>
          {correct ? 'Correct! Well done.' : 'Not quite right.'}
        </span>
        {correctAnswerLabel && !correct && (
          <span className="text-sm text-muted-foreground ml-auto mr-2 hidden sm:block">
            Answer: <span className="font-semibold text-foreground">{correctAnswerLabel}</span>
          </span>
        )}
        <span className="ml-auto text-muted-foreground">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {/* Collapsible explanation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3 border-t border-border/50 pt-3">
              {correctAnswerLabel && !correct && (
                <p className="text-sm sm:hidden">
                  Correct answer: <span className="font-semibold text-foreground">{correctAnswerLabel}</span>
                </p>
              )}
              <p className="text-sm text-foreground/80 leading-relaxed">{explanation}</p>
              {tip && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-mastery/10 border border-mastery/20">
                  <Lightbulb className="w-4 h-4 text-mastery shrink-0 mt-0.5" />
                  <p className="text-xs text-foreground/80">{tip}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
