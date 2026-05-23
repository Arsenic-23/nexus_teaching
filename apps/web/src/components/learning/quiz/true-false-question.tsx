'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrueFalseQuestionProps {
  question: string;
  correctAnswer: boolean;
  selectedAnswer?: boolean | null;
  onSelect: (value: boolean) => void;
  showResult?: boolean;
  className?: string;
}

export function TrueFalseQuestion({
  question,
  correctAnswer,
  selectedAnswer,
  onSelect,
  showResult = false,
  className,
}: TrueFalseQuestionProps) {
  const options: Array<{ label: string; value: boolean; emoji: string }> = [
    { label: 'True', value: true, emoji: '✓' },
    { label: 'False', value: false, emoji: '✗' },
  ];

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-semibold leading-relaxed">{question}</h3>

      <div className="grid grid-cols-2 gap-3">
        {options.map(({ label, value, emoji }) => {
          const isSelected = selectedAnswer === value;
          const isCorrect = showResult && value === correctAnswer;
          const isWrong = showResult && isSelected && value !== correctAnswer;

          return (
            <motion.button
              key={label}
              whileHover={!showResult ? { scale: 1.02 } : {}}
              whileTap={!showResult ? { scale: 0.98 } : {}}
              onClick={() => !showResult && onSelect(value)}
              disabled={showResult}
              className={cn(
                'flex flex-col items-center gap-2 p-6 rounded-xl border transition-all duration-200 font-semibold text-lg',
                !showResult && !isSelected && 'border-border bg-card hover:border-primary/40 hover:bg-card cursor-pointer',
                !showResult && isSelected && 'border-primary bg-primary/10 shadow-md',
                showResult && isCorrect && 'border-success/50 bg-success/10 text-success',
                showResult && isWrong && 'border-destructive/50 bg-destructive/10 text-destructive',
                showResult && !isCorrect && !isWrong && 'border-border bg-muted/50 opacity-50',
              )}
            >
              <span className="text-2xl">{emoji}</span>
              <span>{label}</span>
              {showResult && isCorrect && <CheckCircle2 className="w-4 h-4" />}
              {showResult && isWrong && <XCircle className="w-4 h-4" />}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
