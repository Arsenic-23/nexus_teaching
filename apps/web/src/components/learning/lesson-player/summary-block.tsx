import { CheckCircle2, Star, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface SummaryPoint {
  text: string;
  important?: boolean;
}

interface SummaryBlockProps {
  title?: string;
  summary: string;
  keyPoints?: SummaryPoint[];
  xpEarned?: number;
  nextLesson?: {
    title: string;
    href: string;
  };
  quizHref?: string;
  className?: string;
}

export function SummaryBlock({
  title = 'Lesson Complete!',
  summary,
  keyPoints,
  xpEarned,
  nextLesson,
  quizHref,
  className,
}: SummaryBlockProps) {
  return (
    <div className={cn('space-y-6 text-center', className)}>
      {/* Success icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-2xl bg-success/10 border border-success/20 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-display font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground text-base leading-relaxed max-w-lg mx-auto">{summary}</p>
      </div>

      {/* XP earned */}
      {xpEarned && (
        <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-brand/10 border border-brand/20 w-fit mx-auto">
          <Zap className="w-5 h-5 text-brand" />
          <span className="font-bold text-brand">+{xpEarned} XP Earned</span>
        </div>
      )}

      {/* Key points */}
      {keyPoints && keyPoints.length > 0 && (
        <div className="text-left max-w-md mx-auto p-5 rounded-xl border border-border bg-card/50 space-y-3">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Star className="w-3.5 h-3.5 text-mastery" />
            Key Takeaways
          </p>
          <ul className="space-y-2">
            {keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className={cn('w-4 h-4 mt-0.5 shrink-0', point.important ? 'text-mastery' : 'text-success')} />
                <span className={point.important ? 'font-medium' : 'text-muted-foreground'}>{point.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {quizHref && (
          <Link href={quizHref}>
            <Button variant="glow" size="lg" className="gap-2">
              <Star className="w-4 h-4" />
              Take Quiz
            </Button>
          </Link>
        )}
        {nextLesson && (
          <Link href={nextLesson.href}>
            <Button variant="outline" size="lg" className="gap-2">
              Next: {nextLesson.title}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
