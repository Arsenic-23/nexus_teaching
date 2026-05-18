'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NumericQuestionProps {
  question: string;
  unit?: string;
  correctAnswer: number;
  tolerance?: number;
  hint?: string;
  onSubmit: (value: number, correct: boolean) => void;
  showResult?: boolean;
  submittedValue?: number | null;
  className?: string;
}

export function NumericQuestion({
  question,
  unit,
  correctAnswer,
  tolerance = 0.01,
  hint,
  onSubmit,
  showResult = false,
  submittedValue,
  className,
}: NumericQuestionProps) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    const num = parseFloat(value);
    if (isNaN(num)) return;
    const correct = Math.abs(num - correctAnswer) <= tolerance * Math.max(1, Math.abs(correctAnswer));
    onSubmit(num, correct);
  };

  const isCorrect =
    submittedValue !== null &&
    submittedValue !== undefined &&
    Math.abs(submittedValue - correctAnswer) <= tolerance * Math.max(1, Math.abs(correctAnswer));

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-semibold leading-relaxed">{question}</h3>

      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={value}
          onChange={(e) => !showResult && setValue(e.target.value)}
          placeholder="Enter your answer..."
          disabled={showResult}
          className={cn(
            'max-w-[200px] text-center font-mono text-lg',
            showResult && isCorrect && 'border-success/50 bg-success/5 text-success',
            showResult && !isCorrect && submittedValue !== null && submittedValue !== undefined && 'border-destructive/50 bg-destructive/5 text-destructive',
          )}
          onKeyDown={(e) => e.key === 'Enter' && !showResult && handleSubmit()}
        />
        {unit && <span className="text-muted-foreground font-medium">{unit}</span>}

        {showResult && isCorrect && <CheckCircle2 className="w-5 h-5 text-success" />}
        {showResult && !isCorrect && submittedValue !== null && submittedValue !== undefined && (
          <XCircle className="w-5 h-5 text-destructive" />
        )}
      </div>

      {showResult && !isCorrect && (
        <p className="text-sm text-muted-foreground">
          Correct answer: <span className="font-mono font-bold text-foreground">{correctAnswer}{unit ? ` ${unit}` : ''}</span>
        </p>
      )}

      {hint && !showResult && (
        <p className="text-xs text-muted-foreground italic">💡 {hint}</p>
      )}

      {!showResult && (
        <Button
          onClick={handleSubmit}
          disabled={!value || isNaN(parseFloat(value))}
          size="sm"
        >
          Submit Answer
        </Button>
      )}
    </div>
  );
}
