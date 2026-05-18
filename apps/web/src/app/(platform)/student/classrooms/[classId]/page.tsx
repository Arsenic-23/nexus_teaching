import { School, BookOpen, Users, Trophy, ChevronRight, Clock, CheckCircle2, AlertTriangle, Zap, Megaphone, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const mockClassroom = {
 id: 'class1',
 name: 'Advanced Mathematics — Grade 11',
 teacherName: 'Ms. Sarah Chen',
 subjectEmoji: '📐',
 color: '#3b82f6',
 studentCount: 28,
 myRank: 3,
 myXp: 2450,
 assignments: [
 { id: 'a1', title: 'Quadratic Equations Problem Set', dueDate: 'Tomorrow', status: 'pending' as const, points: 100, topicId: 'quadratic-equations' },
 { id: 'a2', title: 'Functions Quiz', dueDate: 'In 3 days', status: 'pending' as const, points: 50, topicId: 'functions' },
 { id: 'a3', title: 'Linear Equations Chapter Review', dueDate: 'Completed', status: 'completed' as const, points: 80, score: 92, topicId: 'linear-equations' },
 ],
 leaderboard: [
 { rank: 1, name: 'Emma L.', xp: 3200 },
 { rank: 2, name: 'James R.', xp: 2800 },
 { rank: 3, name: 'You', xp: 2450, isMe: true },
 { rank: 4, name: 'Sofia M.', xp: 2100 },
 { rank: 5, name: 'Liam K.', xp: 1950 },
 ],
 announcements: [
 { id: 'ann1', text: 'Quiz on Quadratic Equations next Friday. Please complete all practice problems.', date: 'Today', author: 'Ms. Sarah Chen' },
 { id: 'ann2', text: 'Great work on the linear equations test! Average class score was 84%.', date: '2 days ago', author: 'Ms. Sarah Chen' },
 ],
};

export default async function ClassroomDetailPage({ params }: { params: Promise<{ classId: string }> }) {
 const resolvedParams = await params;
 const cls = mockClassroom;
 const pendingCount = cls.assignments.filter((a) => a.status === 'pending').length;

 return (
 <div className="space-y-6 animate-fade-in">
 <Breadcrumbs items={[{ label: 'Classrooms', href: '/student/classrooms' }, { label: cls.name }]} />

 {/* Class header */}
 <div className="p-8 rounded-xl border border-border bg-card shadow-sm overflow-hidden relative">
 <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
 <School className="w-32 h-32 text-foreground" />
 </div>
 <div className="flex items-start gap-6 relative z-10">
 <div className="w-16 h-16 rounded-xl bg-secondary/50 border border-border flex items-center justify-center shrink-0">
 <School className="w-8 h-8 text-foreground" />
 </div>
 <div className="flex-1">
 <h1 className="text-2xl md:text-3xl font-display font-black tracking-tight text-foreground">{cls.name}</h1>
 <p className="text-base text-muted-foreground font-medium mt-1">{cls.teacherName}</p>
 <div className="flex items-center gap-5 mt-4 text-sm font-bold text-muted-foreground">
 <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-foreground" /> {cls.studentCount} students</span>
 <span className="flex items-center gap-1.5"><Trophy className="w-4 h-4 text-foreground" /> Rank #{cls.myRank}</span>
 </div>
 </div>
 <div className="flex gap-3">
 <Link href={`/student/classrooms/${resolvedParams.classId}/assignments`}>
 <Button className="gap-2 relative bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 py-5 text-sm font-bold shadow-sm shadow-white/5">
 <BookOpen className="w-4 h-4" />
 Assignments
 {pendingCount > 0 && (
 <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-black text-foreground border-2 border-gray-200 text-[10px] font-black flex items-center justify-center">
 {pendingCount}
 </span>
 )}
 </Button>
 </Link>
 </div>
 </div>
 </div>

 <Tabs defaultValue="overview">
 <TabsList>
 <TabsTrigger value="overview">Overview</TabsTrigger>
 <TabsTrigger value="assignments">
 Assignments
 {pendingCount > 0 && (
 <span className="ml-1.5 w-4 h-4 rounded-full bg-destructive text-foreground text-[9px] font-bold inline-flex items-center justify-center">
 {pendingCount}
 </span>
 )}
 </TabsTrigger>
 <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
 </TabsList>

 <TabsContent value="overview" className="space-y-6">
 {/* Announcements */}
 {cls.announcements.length > 0 && (
 <Card className="border-border bg-card shadow-sm rounded-xl">
 <CardHeader className="pb-3 border-b border-border">
 <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
 <Megaphone className="w-4 h-4 text-foreground" />
 Announcements
 </CardTitle>
 </CardHeader>
 <CardContent className="pt-5 space-y-3">
 {cls.announcements.map((ann) => (
 <div key={ann.id} className="p-4 rounded-xl bg-secondary/50 border border-border ">
 <p className="text-sm font-medium text-foreground">{ann.text}</p>
 <p className="text-xs font-bold text-muted-foreground mt-2 flex items-center gap-1">
 {ann.author} <span className="opacity-50">•</span> {ann.date}
 </p>
 </div>
 ))}
 </CardContent>
 </Card>
 )}

 {/* Pending assignments */}
 <Card className={cn(' shadow-sm rounded-xl', pendingCount > 0 ? 'border-border bg-secondary/50' : 'border-border bg-card')}>
 <CardHeader className="pb-3 border-b border-border">
 <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
 {pendingCount > 0 ? (
 <><AlertTriangle className="w-4 h-4 text-foreground" /> {pendingCount} Pending Assignments</>
 ) : (
 <><CheckCircle className="w-4 h-4 text-foreground" /> All Caught Up!</>
 )}
 </CardTitle>
 </CardHeader>
 <CardContent className="pt-5 space-y-3">
 {cls.assignments.filter((a) => a.status === 'pending').slice(0, 2).map((a) => (
 <div key={a.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-card border border-border hover:bg-secondary/50 transition-colors gap-4">
 <div>
 <p className="text-sm font-bold text-foreground">{a.title}</p>
 <p className="text-xs font-bold text-muted-foreground flex items-center gap-1.5 mt-1">
 <Clock className="w-3.5 h-3.5 text-muted-foreground" /> Due {a.dueDate}
 </p>
 </div>
 <div className="flex items-center gap-3">
 <div className="px-3 py-1.5 rounded-lg bg-secondary border border-border text-[10px] font-bold text-foreground uppercase tracking-wider">
 {a.points} pts
 </div>
 <Link href={`/student/learn/mathematics/${a.topicId}`}>
 <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-5 text-xs font-bold gap-2">
 Start
 <ChevronRight className="w-3 h-3" />
 </Button>
 </Link>
 </div>
 </div>
 ))}
 {pendingCount > 0 && (
 <Link href={`/student/classrooms/${resolvedParams.classId}/assignments`} className="block mt-4">
 <Button variant="outline" size="sm" className="w-full text-xs font-bold rounded-xl py-5 border-border hover:bg-secondary/50 hover:text-foreground transition-colors">
 View All Assignments
 </Button>
 </Link>
 )}
 </CardContent>
 </Card>
 </TabsContent>

 <TabsContent value="assignments">
 <div className="space-y-3 mt-6">
 {cls.assignments.map((a) => (
 <Card key={a.id} className={cn(' shadow-sm rounded-xl transition-all hover:bg-secondary/50', a.status === 'completed' ? 'border-border bg-secondary/50' : 'border-border bg-card')}>
 <CardContent className="p-5 flex items-center gap-5">
 <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${a.status === 'completed' ? 'bg-secondary border border-border' : 'bg-black border border-border'}`}>
 {a.status === 'completed' ? (
 <CheckCircle className="w-5 h-5 text-foreground" />
 ) : (
 <BookOpen className="w-5 h-5 text-muted-foreground" />
 )}
 </div>
 <div className="flex-1">
 <p className={`text-sm font-bold ${a.status === 'completed' ? 'text-muted-foreground line-through' : 'text-foreground'}`}>{a.title}</p>
 <p className="text-xs font-bold text-muted-foreground flex items-center gap-1.5 mt-1.5"><Clock className="w-3.5 h-3.5" /> {a.dueDate}</p>
 </div>
 <div className="flex items-center gap-3">
 {a.score !== undefined ? (
 <div className="px-3 py-1.5 rounded-lg bg-secondary border border-border text-[10px] font-black text-foreground">
 {a.score}%
 </div>
 ) : (
 <div className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
 {a.points} pts
 </div>
 )}
 {a.status === 'pending' && (
 <Link href={`/student/learn/mathematics/${a.topicId}`}>
 <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-5 text-xs font-bold gap-2 shadow-lg">
 Start <ChevronRight className="w-3 h-3" />
 </Button>
 </Link>
 )}
 </div>
 </CardContent>
 </Card>
 ))}
 </div>
 </TabsContent>

 <TabsContent value="leaderboard">
 <div className="space-y-3 mt-6">
 <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
 <div className="space-y-2">
 {cls.leaderboard.map((entry) => (
 <div key={entry.rank} className={cn('flex items-center gap-4 p-4 rounded-xl transition-all', (entry as any).isMe ? 'bg-white ' : 'border border-transparent hover:border-border hover:bg-secondary/50')}>
 <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black ', (entry as any).isMe ? 'bg-black/10' : 'bg-secondary/50 border border-border text-muted-foreground')}>
 {entry.rank}
 </div>
 <Avatar className="w-10 h-10 border border-border">
 <AvatarFallback className="text-xs bg-black text-foreground">{entry.name.slice(0, 2)}</AvatarFallback>
 </Avatar>
 <span className={cn('flex-1 text-sm font-bold', (entry as any).isMe ? 'text-foreground' : 'text-foreground')}>{entry.name}</span>
 <span className={cn('flex items-center gap-1.5 text-xs font-bold', (entry as any).isMe ? 'text-foreground/60' : 'text-muted-foreground')}>
 <Zap className="w-3.5 h-3.5" />
 {entry.xp.toLocaleString()}
 </span>
 </div>
 ))}
 </div>
 </div>
 </div>
 </TabsContent>
 </Tabs>
 </div>
 );
}
