import { School, Plus, Users, BarChart3, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

const classrooms = [
  { id: 'c1', name: 'Advanced Mathematics — Grade 11', code: 'MATH2024', students: 28, avgMastery: 0.62, activeToday: 22, color: '#3b82f6', emoji: '📐', pendingAssignments: 2 },
  { id: 'c2', name: 'Physics — Grade 11', code: 'PHY2024', students: 24, avgMastery: 0.54, activeToday: 18, color: '#8b5cf6', emoji: '⚡', pendingAssignments: 0 },
  { id: 'c3', name: 'Mathematics — Grade 10', code: 'MATH10', students: 32, avgMastery: 0.51, activeToday: 22, color: '#10b981', emoji: '📐', pendingAssignments: 1 },
];

export default function TeacherClassroomsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <School className="w-6 h-6 text-primary" />
            My Classrooms
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{classrooms.length} active classrooms</p>
        </div>
        <Link href="/teacher/classrooms/create">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Classroom
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {classrooms.map((cls) => (
          <Link key={cls.id} href={`/teacher/classrooms/${cls.id}`}>
            <Card className="border-border bg-card/50 hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer h-full group" style={{ borderColor: cls.color + '20' }}>
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform" style={{ background: cls.color + '20' }}>
                    {cls.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-sm leading-tight">{cls.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Code: <span className="font-mono font-bold">{cls.code}</span></p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3 text-center">
                  <div className="p-2 rounded-lg bg-secondary/50">
                    <p className="font-bold">{cls.students}</p>
                    <p className="text-[10px] text-muted-foreground">Students</p>
                  </div>
                  <div className="p-2 rounded-lg bg-secondary/50">
                    <p className="font-bold text-success">{cls.activeToday}</p>
                    <p className="text-[10px] text-muted-foreground">Active Today</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Avg Mastery</span>
                    <span className="font-bold" style={{ color: cls.color }}>{Math.round(cls.avgMastery * 100)}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${cls.avgMastery * 100}%`, background: cls.color }} />
                  </div>
                </div>
                {cls.pendingAssignments > 0 && (
                  <Badge variant="warning" className="text-xs mt-3">{cls.pendingAssignments} pending assignment{cls.pendingAssignments > 1 ? 's' : ''}</Badge>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}

        {/* Create new */}
        <Link href="/teacher/classrooms/create">
          <Card className="border-dashed border-2 border-border bg-transparent hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer h-full">
            <CardContent className="p-5 flex flex-col items-center justify-center min-h-[200px] gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Plus className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-muted-foreground">Create Classroom</p>
                <p className="text-xs text-muted-foreground/60 mt-0.5">Add a new class</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
