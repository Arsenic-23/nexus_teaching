import { Users, TrendingUp, BookOpen, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ClassOverviewProps {
  classroom: {
    id: string;
    name: string;
    studentCount: number;
    avgMastery: number;
    avgStreak: number;
    activeToday: number;
    topicsCompleted: number;
  };
  className?: string;
}

export function ClassOverview({ classroom, className }: ClassOverviewProps) {
  const activityPercent = Math.round((classroom.activeToday / classroom.studentCount) * 100);

  return (
    <Card className={cn('border-border bg-card', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            {classroom.name}
          </span>
          <Link href={`/teacher/classrooms/${classroom.id}`} className="text-xs text-primary hover:underline">
            View →
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded-lg bg-secondary/50 text-center">
            <p className="text-2xl font-bold text-primary">{classroom.studentCount}</p>
            <p className="text-xs text-muted-foreground">Students</p>
          </div>
          <div className="p-3 rounded-lg bg-secondary/50 text-center">
            <p className="text-2xl font-bold text-success">{classroom.activeToday}</p>
            <p className="text-xs text-muted-foreground">Active Today</p>
          </div>
        </div>

        {/* Avg Mastery */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-muted-foreground">
              <TrendingUp className="w-3 h-3" /> Avg Mastery
            </span>
            <span className="font-semibold">{Math.round(classroom.avgMastery * 100)}%</span>
          </div>
          <Progress value={classroom.avgMastery * 100} className="h-1.5" />
        </div>

        {/* Activity rate */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-muted-foreground">
              <BarChart3 className="w-3 h-3" /> Activity Rate
            </span>
            <span className="font-semibold">{activityPercent}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
              style={{ width: `${activityPercent}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
