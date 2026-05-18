import { BookOpen, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ContinueLearningProps {
  lesson: {
    title: string;
    topicName: string;
    progress: number;
    xpReward: number;
    href: string;
    estimatedMinutes?: number;
  };
  className?: string;
}

export function ContinueLearning({ lesson, className }: ContinueLearningProps) {
  return (
    <Card className={cn('border-border bg-card/50 hover:border-primary/30 transition-colors', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          Continue Learning
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="font-semibold text-sm">{lesson.title}</p>
            <p className="text-xs text-muted-foreground">{lesson.topicName}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="xp" className="text-xs">+{lesson.xpReward} XP</Badge>
            {lesson.estimatedMinutes && (
              <span className="text-[10px] text-muted-foreground">~{lesson.estimatedMinutes}min</span>
            )}
          </div>
        </div>
        <Progress value={lesson.progress} className="h-2 mb-3" />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{lesson.progress}% complete</span>
          <Link href={lesson.href}>
            <Button size="sm" className="gap-1 h-7 text-xs">
              Continue
              <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
