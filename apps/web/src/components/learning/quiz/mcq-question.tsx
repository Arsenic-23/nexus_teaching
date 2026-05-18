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
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-semibold leading-relaxed">{question}</h3>

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
                'w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200',
                !showResult && !isSelected && 'border-border bg-card/50 hover:border-primary/40 hover:bg-card cursor-pointer',
                !showResult && isSelected && 'border-primary bg-primary/10 shadow-md',
                showResult && isCorrect && 'border-success/50 bg-success/10 text-success',
                showResult && isWrong && 'border-destructive/50 bg-destructive/10 text-destructive',
                showResult && !isCorrect && !isWrong && 'border-border bg-card/30 opacity-60',
              )}
            >
              {/* Letter badge */}
              <span
                className={cn(
                  'w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 transition-colors',
                  !showResult && !isSelected && 'bg-secondary text-muted-foreground',
                  !showResult && isSelected && 'bg-primary text-white',
                  showResult && isCorrect && 'bg-success text-white',
                  showResult && isWrong && 'bg-destructive text-white',
                  showResult && !isCorrect && !isWrong && 'bg-secondary text-muted-foreground',
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
