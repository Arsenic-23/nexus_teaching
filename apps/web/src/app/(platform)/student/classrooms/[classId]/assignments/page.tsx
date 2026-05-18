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
 <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight">Assignments</h1>
 <div className="flex gap-3">
 <div className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-xs font-bold text-muted-foreground">
 {pending.length} Pending
 </div>
 <div className="px-3 py-1.5 rounded-lg bg-secondary border border-border text-xs font-bold text-foreground">
 {completed.length} Completed
 </div>
 </div>
 </div>

 {/* Pending */}
 {pending.length > 0 && (
 <div className="space-y-4">
 <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
 <AlertTriangle className="w-4 h-4 text-foreground" /> Pending
 </h2>
 {pending.map((a) => (
 <Card key={a.id} className="border-border bg-secondary/50 hover:bg-secondary transition-all cursor-pointer shadow-sm rounded-xl overflow-hidden group">
 <CardContent className="p-6">
 <div className="flex flex-col sm:flex-row sm:items-start gap-5">
 <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
 <BookOpen className="w-5 h-5 text-foreground" />
 </div>
 <div className="flex-1 min-w-0">
 <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
 <div>
 <p className="font-bold text-lg text-foreground mb-1">{a.title}</p>
 <p className="text-sm font-medium text-muted-foreground">{a.description}</p>
 </div>
 <div className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground shrink-0">
 {a.type}
 </div>
 </div>
 <div className="flex items-center justify-between mt-5 pt-5 border-t border-border">
 <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
 <Clock className="w-4 h-4 text-muted-foreground" /> Due {a.dueDate} {a.dueTime}
 </span>
 <div className="px-3 py-1.5 rounded-lg bg-white border border-white text-[10px] font-black uppercase tracking-wider text-foreground">
 {a.points} pts
 </div>
 </div>
 </div>
 </div>
 <Button className="w-full mt-6 gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl py-6 font-bold shadow-lg">
 Start Assignment <ChevronRight className="w-4 h-4" />
 </Button>
 </CardContent>
 </Card>
 ))}
 </div>
 )}

 {/* Completed */}
 {completed.length > 0 && (
 <div className="space-y-4">
 <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
 <CheckCircle2 className="w-4 h-4 text-muted-foreground" /> Completed
 </h2>
 {completed.map((a) => (
 <Card key={a.id} className="border-border bg-card shadow-sm rounded-xl opacity-80 hover:opacity-100 transition-opacity">
 <CardContent className="p-6">
 <div className="flex flex-col sm:flex-row sm:items-start gap-5">
 <div className="w-12 h-12 rounded-xl bg-secondary/50 border border-border flex items-center justify-center shrink-0">
 <CheckCircle2 className="w-5 h-5 text-foreground" />
 </div>
 <div className="flex-1 min-w-0">
 <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
 <div>
 <p className="font-bold text-lg text-muted-foreground line-through mb-1">{a.title}</p>
 <div className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-[10px] font-bold text-foreground mb-2 inline-block">
 Score: {a.score}%
 </div>
 </div>
 </div>
 <p className="text-sm font-medium text-muted-foreground">{a.description}</p>
 <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
 <p className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
 <Clock className="w-4 h-4 text-muted-foreground" /> Submitted {a.dueDate}
 </p>
 <span className="text-muted-foreground">•</span>
 <p className="text-xs font-bold text-muted-foreground">{a.points} pts</p>
 </div>
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
