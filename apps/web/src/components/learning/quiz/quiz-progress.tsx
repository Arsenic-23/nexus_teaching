import { CheckCircle2, Circle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizProgressProps {
  total: number;
  current: number;
  results?: Array<'correct' | 'incorrect' | 'unanswered'>;
  className?: string;
}

export function QuizProgress({ total, current, results = [], className }: QuizProgressProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {/* Progress dots */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {Array.from({ length: total }).map((_, i) => {
          const result = results[i];
          const isCurrent = i === current;

          return (
            <div
              key={i}
              className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300',
                isCurrent && 'ring-2 ring-primary ring-offset-1 ring-offset-background scale-110',
                result === 'correct' && 'bg-success/20 text-success',
                result === 'incorrect' && 'bg-destructive/20 text-destructive',
                result === 'unanswered' && 'bg-secondary text-muted-foreground',
                !result && !isCurrent && 'bg-secondary/50',
                !result && isCurrent && 'bg-primary/20',
              )}
            >
              {result === 'correct' ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : result === 'incorrect' ? (
                <XCircle className="w-3.5 h-3.5" />
              ) : (
                <span className="text-xs font-bold">{i + 1}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Text progress */}
      <p className="text-xs text-muted-foreground">
        Question {Math.min(current + 1, total)} of {total}
      </p>
    </div>
  );
}
