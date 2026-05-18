import { BookOpen, Clock, CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const assignments = [
  { id: 'a1', title: 'Quadratic Equations Problem Set', description: 'Solve 20 problems on factoring, completing the square, and quadratic formula', dueDate: 'Tomorrow', dueTime: '11:59 PM', status: 'pending' as const, points: 100, type: 'Problem Set' },
  { id: 'a2', title: 'Functions Quiz', description: 'Quiz covering domain, range, and function composition', dueDate: 'In 3 days', dueTime: '11:59 PM', status: 'pending' as const, points: 50, type: 'Quiz' },
  { id: 'a3', title: 'Linear Equations Chapter Review', description: 'Complete the chapter review questions', dueDate: 'Dec 10', dueTime: '', status: 'completed' as const, points: 80, score: 92, type: 'Review' },
  { id: 'a4', title: 'Polynomial Identities Worksheet', description: 'Practice worksheet on special polynomial identities', dueDate: 'Dec 5', dueTime: '', status: 'completed' as const, points: 60, score: 78, type: 'Worksheet' },
];

export default async function AssignmentsPage({ params }: { params: Promise<{ classId: string }> }) {
  const resolvedParams = await params;
  const pending = assignments.filter((a) => a.status === 'pending');
  const completed = assignments.filter((a) => a.status === 'completed');

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumbs items={[{ label: 'Classrooms', href: '/student/classrooms' }, { label: 'Math Class', href: `/student/classrooms/${resolvedParams.classId}` }, { label: 'Assignments' }]} />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Assignments</h1>
        <div className="flex gap-2">
          <Badge variant="warning" className="text-xs">{pending.length} Pending</Badge>
          <Badge variant="success" className="text-xs">{completed.length} Completed</Badge>
        </div>
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-orange-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Pending
          </h2>
          {pending.map((a) => (
            <Card key={a.id} className="border-orange-500/20 bg-orange-500/5 hover:border-orange-500/40 transition-all cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-orange-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold">{a.title}</p>
                      <Badge variant="secondary" className="text-xs shrink-0">{a.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{a.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-orange-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Due {a.dueDate} {a.dueTime}
                      </span>
                      <Badge variant="warning" className="text-xs">{a.points} pts</Badge>
                    </div>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-3 gap-1">
                  Start Assignment <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-success flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Completed
          </h2>
          {completed.map((a) => (
            <Card key={a.id} className="border-success/20 bg-success/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold">{a.title}</p>
                      <Badge variant="success" className="text-xs shrink-0">{a.score}%</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{a.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">Submitted {a.dueDate} · {a.points} pts</p>
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
