import { Users, Search, AlertTriangle, ChevronRight, TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const mockStudents = [
  { id: 's1', name: 'Emma L.', classroom: 'Advanced Math', mastery: 0.88, xp: 3200, streak: 18, trend: 'up' as const, status: 'active' as const },
  { id: 's2', name: 'James R.', classroom: 'Advanced Math', mastery: 0.75, xp: 2800, streak: 12, trend: 'up' as const, status: 'active' as const },
  { id: 's3', name: 'Sofia M.', classroom: 'Physics', mastery: 0.68, xp: 2450, streak: 8, trend: 'stable' as const, status: 'active' as const },
  { id: 's4', name: 'Liam K.', classroom: 'Advanced Math', mastery: 0.55, xp: 1950, streak: 5, trend: 'down' as const, status: 'at-risk' as const },
  { id: 's5', name: 'Marcus T.', classroom: 'Physics', mastery: 0.28, xp: 800, streak: 0, trend: 'down' as const, status: 'at-risk' as const },
  { id: 's6', name: 'Priya R.', classroom: 'Mathematics', mastery: 0.61, xp: 2100, streak: 7, trend: 'up' as const, status: 'active' as const },
];

export default function TeacherStudentsPage() {
  const atRisk = mockStudents.filter((s) => s.status === 'at-risk');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            All Students
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{mockStudents.length} students across all classrooms</p>
        </div>
        {atRisk.length > 0 && (
          <Badge variant="warning" className="gap-1">
            <AlertTriangle className="w-3 h-3" />{atRisk.length} at risk
          </Badge>
        )}
      </div>

      <div className="space-y-2">
        {mockStudents.map((student, i) => (
          <Link key={student.id} href={`/teacher/students/${student.id}`}>
            <div className={cn(
              'flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md',
              student.status === 'at-risk' ? 'border-orange-500/20 bg-orange-500/5 hover:border-orange-500/40' : 'border-border bg-card hover:border-primary/30',
            )}>
              <span className="text-sm font-bold w-6 text-center text-muted-foreground">{i + 1}</span>
              <Avatar className="w-10 h-10 shrink-0">
                <AvatarFallback>{student.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm">{student.name}</p>
                  {student.status === 'at-risk' && <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />}
                </div>
                <p className="text-xs text-muted-foreground">{student.classroom}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden max-w-32">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${student.mastery * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{Math.round(student.mastery * 100)}%</span>
                </div>
              </div>
              <div className="text-right shrink-0 space-y-0.5">
                <p className="text-sm font-bold">{student.xp.toLocaleString()} XP</p>
                <p className="text-xs text-muted-foreground">{student.streak}🔥 streak</p>
                <div className="flex items-center justify-end gap-1">
                  {student.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3 text-success" />
                  ) : student.trend === 'down' ? (
                    <TrendingDown className="w-3 h-3 text-destructive" />
                  ) : null}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
