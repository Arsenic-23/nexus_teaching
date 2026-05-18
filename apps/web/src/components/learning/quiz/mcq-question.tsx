'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Choice {
  id: string;
  text: string;
  isCorrect?: boolean;
}

interface MCQQuestionProps {
  question: string;
  choices: Choice[];
  selectedId?: string | null;
  correctId?: string | null;
  onSelect: (id: string) => void;
  showResult?: boolean;
  className?: string;
}

export function MCQQuestion({
  question,
  choices,
  selectedId,
  correctId,
  onSelect,
  showResult = false,
  className,
}: MCQQuestionProps) {
  return (
    <div className={cn('space-y-6', className)}>
      <h3 className="text-xl font-display font-bold leading-relaxed">{question}</h3>

      <div className="space-y-2.5">
        {choices.map((choice, index) => {
          const isSelected = selectedId === choice.id;
          const isCorrect = showResult && choice.id === correctId;
          const isWrong = showResult && isSelected && choice.id !== correctId;

          return (
            <motion.button
              key={choice.id}
              whileHover={!showResult ? { scale: 1.01 } : {}}
              whileTap={!showResult ? { scale: 0.99 } : {}}
              onClick={() => !showResult && onSelect(choice.id)}
              disabled={showResult}
              className={cn(
                'w-full flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-300 shadow-sm relative overflow-hidden',
                !showResult && !isSelected && 'border-border/60 bg-card/40 hover:border-primary/50 hover:bg-card hover:shadow-md cursor-pointer',
                !showResult && isSelected && 'border-primary bg-primary/5 shadow-md shadow-primary/10 ring-1 ring-primary/20',
                showResult && isCorrect && 'border-success/50 bg-success/10 text-success shadow-success/10',
                showResult && isWrong && 'border-destructive/50 bg-destructive/10 text-destructive shadow-destructive/10',
                showResult && !isCorrect && !isWrong && 'border-border/40 bg-card/20 opacity-50',
              )}
            >
              {/* Letter badge */}
              <span
                className={cn(
                  'w-8 h-8 rounded-xl text-sm font-bold flex items-center justify-center shrink-0 transition-colors shadow-sm',
                  !showResult && !isSelected && 'bg-secondary/80 text-muted-foreground border border-border/50',
                  !showResult && isSelected && 'bg-primary text-primary-foreground shadow-primary/30',
                  showResult && isCorrect && 'bg-success text-success-foreground',
                  showResult && isWrong && 'bg-destructive text-destructive-foreground',
                  showResult && !isCorrect && !isWrong && 'bg-secondary/50 text-muted-foreground/50',
                )}
              >
                {String.fromCharCode(65 + index)}
              </span>

              <span className="flex-1 text-sm font-medium">{choice.text}</span>

              {/* Result icon */}
              {showResult && isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
              )}
              {showResult && isWrong && (
                <XCircle className="w-5 h-5 text-destructive shrink-0" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
