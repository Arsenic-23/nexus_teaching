import { School, Users, BookOpen, BarChart3, ChevronRight, AlertTriangle, TrendingUp, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const mockClassroom = {
  id: 'c1',
  name: 'Advanced Mathematics — Grade 11',
  code: 'MATH2024',
  emoji: '📐',
  color: '#3b82f6',
  studentCount: 28,
  avgMastery: 0.62,
  activeToday: 22,
  weeklyXp: 4200,
  students: [
    { id: 's1', name: 'Emma L.', mastery: 0.88, xp: 3200, streak: 18, rank: 1, status: 'active' },
    { id: 's2', name: 'James R.', mastery: 0.75, xp: 2800, streak: 12, rank: 2, status: 'active' },
    { id: 's3', name: 'Sofia M.', mastery: 0.68, xp: 2450, streak: 8, rank: 3, status: 'active' },
    { id: 's4', name: 'Liam K.', mastery: 0.55, xp: 1950, streak: 5, rank: 4, status: 'at-risk' },
    { id: 's5', name: 'Marcus T.', mastery: 0.28, xp: 800, streak: 0, rank: 5, status: 'at-risk' },
  ],
  assignments: [
    { id: 'a1', title: 'Quadratic Equations Problem Set', dueDate: 'Tomorrow', submitted: 18, total: 28, avgScore: null, status: 'active' as const },
    { id: 'a2', title: 'Linear Equations Review', dueDate: 'Last week', submitted: 28, total: 28, avgScore: 84, status: 'completed' as const },
  ],
};

export default async function TeacherClassroomPage({ params }: { params: Promise<{ classId: string }> }) {
  const resolvedParams = await params;
  const cls = mockClassroom;
  const atRiskCount = cls.students.filter((s) => s.status === 'at-risk').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumbs items={[{ label: 'Classrooms', href: '/teacher/classrooms' }, { label: cls.name }]} />

      {/* Header */}
      <div className="p-6 rounded-2xl border" style={{ borderColor: cls.color + '30', background: cls.color + '08' }}>
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl" style={{ background: cls.color + '20' }}>{cls.emoji}</div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl font-display font-bold">{cls.name}</h1>
                <p className="text-sm text-muted-foreground">Code: <span className="font-mono font-bold">{cls.code}</span></p>
              </div>
              {atRiskCount > 0 && (
                <Badge variant="warning" className="shrink-0">
                  <AlertTriangle className="w-3 h-3 mr-1" />{atRiskCount} at risk
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-4 gap-3 mt-3">
              {[
                { label: 'Students', value: cls.studentCount, icon: Users },
                { label: 'Active Today', value: cls.activeToday, icon: TrendingUp },
                { label: 'Avg Mastery', value: `${Math.round(cls.avgMastery * 100)}%`, icon: BarChart3 },
                { label: 'Weekly XP', value: cls.weeklyXp.toLocaleString(), icon: TrendingUp },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="text-center p-2 rounded-lg bg-card/80 border border-border">
                  <p className="font-bold text-sm">{value}</p>
                  <p className="text-[10px] text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick navigation links */}
      <div className="flex gap-2 flex-wrap">
        <Link href={`/teacher/classrooms/${resolvedParams.classId}/students`}>
          <Badge variant="secondary" className="cursor-pointer hover:bg-primary/10 px-3 py-1.5 text-xs">
            👥 Students
          </Badge>
        </Link>
        <Link href={`/teacher/classrooms/${resolvedParams.classId}/assignments`}>
          <Badge variant="secondary" className="cursor-pointer hover:bg-primary/10 px-3 py-1.5 text-xs">
            📋 Assignments
          </Badge>
        </Link>
        <Link href={`/teacher/classrooms/${resolvedParams.classId}/analytics`}>
          <Badge variant="secondary" className="cursor-pointer hover:bg-primary/10 px-3 py-1.5 text-xs">
            📊 Analytics
          </Badge>
        </Link>
        <Link href={`/teacher/classrooms/${resolvedParams.classId}/assignments/create`}>
          <Badge className="cursor-pointer bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 px-3 py-1.5 text-xs">
            <Plus className="w-3 h-3 mr-1" />
            New Assignment
          </Badge>
        </Link>
      </div>

      <Tabs defaultValue="students">
        <TabsList>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="assignments">
            Assignments
            {cls.assignments.filter(a => a.status === 'active').length > 0 && (
              <span className="ml-1.5 w-4 h-4 rounded-full bg-primary/20 text-primary text-[9px] font-bold inline-flex items-center justify-center">
                {cls.assignments.filter(a => a.status === 'active').length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <div className="space-y-2 mt-4">
            {cls.students.map((s, i) => (
              <Link key={s.id} href={`/teacher/students/${s.id}`}>
                <div className={cn('flex items-center gap-3 p-3 rounded-xl border transition-all hover:border-primary/30 cursor-pointer', s.status === 'at-risk' ? 'border-orange-500/20 bg-orange-500/5' : 'border-border bg-card/50')}>
                  <span className="text-sm font-bold w-6 text-center text-muted-foreground">#{i + 1}</span>
                  <Avatar className="w-8 h-8"><AvatarFallback className="text-xs">{s.name.slice(0, 2)}</AvatarFallback></Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{s.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${s.mastery * 100}%` }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{Math.round(s.mastery * 100)}%</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold">{s.xp.toLocaleString()} XP</p>
                    <p className="text-[10px] text-muted-foreground">{s.streak}🔥 streak</p>
                  </div>
                  {s.status === 'at-risk' && <AlertTriangle className="w-4 h-4 text-orange-400 shrink-0" />}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link href={`/teacher/classrooms/${resolvedParams.classId}/students`}>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Users className="w-4 h-4" />
                View All Students
              </Button>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="assignments">
          <div className="space-y-3 mt-4">
            <div className="flex justify-end">
              <Link href={`/teacher/classrooms/${resolvedParams.classId}/assignments/create`}>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Assignment
                </Button>
              </Link>
            </div>
            {cls.assignments.map((a) => (
              <Card key={a.id} className="border-border bg-card/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-sm">{a.title}</p>
                      <p className="text-xs text-muted-foreground">Due: {a.dueDate}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {a.avgScore !== null ? (
                        <Badge variant="success" className="text-xs">Avg: {a.avgScore}%</Badge>
                      ) : (
                        <Badge variant="warning" className="text-xs">In Progress</Badge>
                      )}
                      <Link href={`/teacher/classrooms/${resolvedParams.classId}/assignments`}>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Submissions</span>
                      <span>{a.submitted}/{a.total}</span>
                    </div>
                    <Progress value={(a.submitted / a.total) * 100} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            ))}
            <Link href={`/teacher/classrooms/${resolvedParams.classId}/assignments`}>
              <Button variant="outline" size="sm" className="w-full gap-2 mt-2">
                <BookOpen className="w-4 h-4" />
                View All Assignments
              </Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
