import { Users, AlertTriangle, TrendingDown, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const students = [
  { id: 's1', name: 'Emma L.', mastery: 0.88, xp: 3200, streak: 18, status: 'active' as const, quizScore: 92 },
  { id: 's2', name: 'James R.', mastery: 0.75, xp: 2800, streak: 12, status: 'active' as const, quizScore: 85 },
  { id: 's3', name: 'Sofia M.', mastery: 0.68, xp: 2450, streak: 8, status: 'active' as const, quizScore: 78 },
  { id: 's4', name: 'Liam K.', mastery: 0.55, xp: 1950, streak: 5, status: 'at-risk' as const, quizScore: 62 },
  { id: 's5', name: 'Marcus T.', mastery: 0.28, xp: 800, streak: 0, status: 'at-risk' as const, quizScore: 45 },
];

export default async function ClassStudentsPage({ params }: { params: Promise<{ classId: string }> }) {
  const resolvedParams = await params;
  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumbs items={[{ label: 'Classrooms', href: '/teacher/classrooms' }, { label: 'Advanced Math', href: `/teacher/classrooms/${resolvedParams.classId}` }, { label: 'Students' }]} />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" /> Students
        </h1>
        <div className="flex gap-2 text-xs">
          <Badge variant="success">{students.filter(s => s.status === 'active').length} Active</Badge>
          <Badge variant="warning">{students.filter(s => s.status === 'at-risk').length} At Risk</Badge>
        </div>
      </div>

      <div className="space-y-2">
        {students.map((s, i) => (
          <Link key={s.id} href={`/teacher/students/${s.id}`}>
            <div className={cn('flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md', s.status === 'at-risk' ? 'border-orange-500/20 bg-orange-500/5' : 'border-border bg-card hover:border-primary/30')}>
              <span className="text-sm font-bold w-6 text-center text-muted-foreground">{i + 1}</span>
              <Avatar className="w-9 h-9"><AvatarFallback className="text-xs">{s.name.slice(0, 2)}</AvatarFallback></Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm">{s.name}</p>
                  {s.status === 'at-risk' && <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden max-w-24">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${s.mastery * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{Math.round(s.mastery * 100)}% mastery</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold">{s.xp.toLocaleString()} XP</p>
                <p className="text-xs text-muted-foreground">Quiz avg: {s.quizScore}%</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
