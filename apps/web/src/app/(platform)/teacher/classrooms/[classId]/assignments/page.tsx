import { BookOpen, Plus, CheckCircle2, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const assignments = [
  { id: 'a1', title: 'Quadratic Equations Problem Set', type: 'Problem Set', dueDate: 'Tomorrow', submitted: 18, total: 28, avgScore: null, status: 'active' as const },
  { id: 'a2', title: 'Functions Quiz', type: 'Quiz', dueDate: 'In 3 days', submitted: 5, total: 28, avgScore: null, status: 'active' as const },
  { id: 'a3', title: 'Linear Equations Review', type: 'Review', dueDate: 'Last week', submitted: 28, total: 28, avgScore: 84, status: 'completed' as const },
  { id: 'a4', title: 'Polynomial Identities Worksheet', type: 'Worksheet', dueDate: '2 weeks ago', submitted: 26, total: 28, avgScore: 79, status: 'completed' as const },
];

export default async function ClassAssignmentsPage({ params }: { params: Promise<{ classId: string }> }) {
  const resolvedParams = await params;
  const active = assignments.filter((a) => a.status === 'active');
  const completed = assignments.filter((a) => a.status === 'completed');

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumbs items={[{ label: 'Classrooms', href: '/teacher/classrooms' }, { label: 'Advanced Math', href: `/teacher/classrooms/${resolvedParams.classId}` }, { label: 'Assignments' }]} />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" /> Assignments
        </h1>
        <Link href={`/teacher/classrooms/${resolvedParams.classId}/assignments/create`}>
          <Button className="gap-2"><Plus className="w-4 h-4" /> Create Assignment</Button>
        </Link>
      </div>

      {active.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Active</h2>
          {active.map((a) => (
            <Card key={a.id} className="border-primary/20 bg-primary/5 hover:border-primary/40 transition-all">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-sm">{a.title}</p>
                      <Badge variant="secondary" className="text-xs shrink-0">{a.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> Due {a.dueDate}
                    </p>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Submissions</span><span>{a.submitted}/{a.total}</span>
                      </div>
                      <Progress value={(a.submitted / a.total) * 100} className="h-1.5" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {completed.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Completed</h2>
          {completed.map((a) => (
            <Card key={a.id} className="border-border bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-sm">{a.title}</p>
                      <div className="flex items-center gap-2 shrink-0">
                        {a.avgScore !== null && <Badge variant="success" className="text-xs">Avg: {a.avgScore}%</Badge>}
                        <Badge variant="secondary" className="text-xs">{a.type}</Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{a.dueDate} · {a.submitted}/{a.total} submitted</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
