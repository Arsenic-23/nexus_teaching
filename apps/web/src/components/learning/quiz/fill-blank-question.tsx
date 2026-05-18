'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FillBlankQuestionProps {
  parts: string[]; // alternates between text and blank slots: ['The area of a circle is ', 'π', ' times the radius squared']
  blanks: Array<{ id: string; correctAnswer: string; placeholder?: string }>;
  onSubmit: (answers: Record<string, string>, correct: boolean) => void;
  showResult?: boolean;
  submittedAnswers?: Record<string, string>;
  className?: string;
}

export function FillBlankQuestion({
  parts,
  blanks,
  onSubmit,
  showResult = false,
  submittedAnswers,
  className,
}: FillBlankQuestionProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const correct = blanks.every(
      (blank) =>
        answers[blank.id]?.trim().toLowerCase() ===
        blank.correctAnswer.toLowerCase(),
    );
    onSubmit(answers, correct);
  };

  let blankIndex = 0;

  return (
    <div className={cn('space-y-6', className)}>
      <div className="text-lg leading-relaxed flex flex-wrap items-center gap-1">
        {parts.map((part, i) => {
          if (i % 2 === 0) {
            return (
              <span key={i} className="font-medium">
                {part}
              </span>
            );
          } else {
            const blank = blanks[blankIndex++];
            if (!blank) return null;
            const submitted = submittedAnswers?.[blank.id];
            const isCorrect =
              showResult &&
              submitted?.trim().toLowerCase() === blank.correctAnswer.toLowerCase();
            const isWrong = showResult && !isCorrect && !!submitted;

            return (
              <span key={i} className="inline-flex items-center gap-1">
                <Input
                  value={showResult ? (submitted || '') : (answers[blank.id] || '')}
                  onChange={(e) =>
                    !showResult && setAnswers((prev) => ({ ...prev, [blank.id]: e.target.value }))
                  }
                  placeholder={blank.placeholder || '...'}
                  disabled={showResult}
                  className={cn(
                    'inline h-8 px-2 text-center font-mono w-[120px]',
                    isCorrect && 'border-success/50 bg-success/5 text-success',
                    isWrong && 'border-destructive/50 bg-destructive/5 text-destructive',
                  )}
                />
                {showResult && isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-success" />
                )}
                {showResult && isWrong && (
                  <span className="text-sm text-muted-foreground">
                    ({blank.correctAnswer})
                  </span>
                )}
              </span>
            );
          }
        })}
      </div>

      {!showResult && (
        <Button
          onClick={handleSubmit}
          disabled={blanks.some((b) => !answers[b.id]?.trim())}
          size="sm"
        >
          Submit
        </Button>
      )}
    </div>
  );
}
