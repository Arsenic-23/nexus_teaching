import { BarChart3, TrendingUp, Target, Brain, ChevronRight, Zap, Calculator, Atom } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MasteryRing } from '@/components/gamification/mastery-ring';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Link from 'next/link';

const mockProgressData = {
 overall: {
 xpTotal: 2450,
 xpThisWeek: 380,
 masteryAvg: 0.52,
 topicsStarted: 7,
 topicsMastered: 4,
 lessonsCompleted: 32,
 quizzesPassed: 18,
 streakDays: 12,
 },
 subjects: [
 { id: 'mathematics', name: 'Mathematics', icon: Calculator, mastery: 0.45, xp: 1800, topics: 8, color: '#ffffff' },
 { id: 'physics', name: 'Physics', icon: Atom, mastery: 0.28, xp: 650, topics: 3, color: '#ffffff' },
 ],
 weeklyXp: [120, 95, 180, 210, 140, 380, 0],
 recentActivity: [
 { action: 'Completed lesson', item: 'The Quadratic Formula', xp: 75, time: '2h ago' },
 { action: 'Passed quiz', item: 'Factoring Quadratics', xp: 60, time: '3h ago' },
 { action: 'Boss Battle Victory', item: 'Algebra Titan', xp: 200, time: 'Yesterday' },
 { action: 'Completed lesson', item: 'Completing the Square', xp: 90, time: 'Yesterday' },
 ],
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const maxXp = Math.max(...mockProgressData.weeklyXp, 1);

export default function ProgressPage() {
 const { overall, subjects, weeklyXp, recentActivity } = mockProgressData;

 return (
 <div className="space-y-6 animate-fade-in">
 <div className="flex items-center justify-between">
 <div>
 <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-2">
 Progress
 </h1>
 <p className="text-muted-foreground text-lg font-medium">Track your learning journey</p>
 </div>
 </div>

 {/* Quick stats */}
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
 {[
 { label: 'Total XP', value: overall.xpTotal.toLocaleString(), icon: Zap, color: 'text-foreground' },
 { label: 'This Week', value: `+${overall.xpThisWeek}`, icon: TrendingUp, color: 'text-foreground' },
 { label: 'Topics Done', value: `${overall.topicsMastered}/${overall.topicsStarted}`, icon: Target, color: 'text-foreground' },
 { label: 'Day Streak', value: `${overall.streakDays}🔥`, icon: Brain, color: 'text-foreground' },
 ].map(({ label, value, icon: Icon, color }) => (
 <Card key={label} className="border-border bg-card shadow-sm rounded-xl overflow-hidden">
 <CardContent className="p-6">
 <div className="flex items-center justify-between mb-4">
 <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">{label}</span>
 <div className="w-10 h-10 rounded-xl bg-secondary/50 border border-border flex items-center justify-center ">
 <Icon className={`w-5 h-5 ${color}`} />
 </div>
 </div>
 <p className="text-3xl font-black text-foreground">{value}</p>
 </CardContent>
 </Card>
 ))}
 </div>

 {/* Weekly XP chart */}
 <Card className="border-border bg-card shadow-sm rounded-xl overflow-hidden">
 <CardHeader className="pb-6 border-b border-border">
 <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-widest flex items-center justify-between">
 <span className="flex items-center gap-2">
 <BarChart3 className="w-4 h-4" />
 Weekly XP
 </span>
 <div className="px-3 py-1.5 rounded-lg bg-white text-[10px] font-black uppercase tracking-wider text-foreground">
 +{overall.xpThisWeek} this week
 </div>
 </CardTitle>
 </CardHeader>
 <CardContent className="pt-8 pb-6">
 <div className="flex items-end gap-3 h-32">
 {weeklyXp.map((xp, i) => (
 <div key={i} className="flex-1 flex flex-col items-center gap-3">
 <div
 className="w-full rounded-t-xl bg-secondary hover:bg-secondary/80 transition-all relative group"
 style={{ height: `${(xp / maxXp) * 120}px`, minHeight: xp > 0 ? '8px' : '0' }}
 >
 <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
 {xp} XP
 </div>
 </div>
 <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{days[i]}</span>
 </div>
 ))}
 </div>
 </CardContent>
 </Card>

 {/* Subject mastery */}
 <div className="space-y-6">
 <div className="flex items-center justify-between">
 <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Subject Mastery</h2>
 <Link href="/student/progress/mastery" className="text-xs font-bold text-foreground hover:text-muted-foreground flex items-center gap-1">
 Detailed View <ChevronRight className="w-3 h-3" />
 </Link>
 </div>
 <div className="space-y-4">
 {subjects.map((subject) => {
 const Icon = subject.icon;
 return (
 <Link key={subject.id} href={`/student/progress/mastery?subject=${subject.id}`} className="block">
 <Card className="border-border bg-card shadow-sm hover:border-border hover:bg-accent transition-all cursor-pointer rounded-xl group">
 <CardContent className="p-6">
 <div className="flex flex-col sm:flex-row sm:items-center gap-6">
 <MasteryRing level={subject.mastery} size={64} className="shrink-0 drop-" />
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-3 mb-2">
 <div className="w-8 h-8 rounded-lg bg-secondary/50 border border-border flex items-center justify-center text-foreground shrink-0 group-hover:scale-110 transition-transform">
 <Icon className="w-4 h-4" />
 </div>
 <p className="text-xl font-bold text-foreground truncate">{subject.name}</p>
 </div>
 <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-muted-foreground">
 <span className="text-foreground">{Math.round(subject.mastery * 100)}% mastery</span>
 <span className="w-1 h-1 rounded-full bg-secondary/80" />
 <span>{subject.xp.toLocaleString()} XP</span>
 <span className="w-1 h-1 rounded-full bg-secondary/80" />
 <span>{subject.topics} topics</span>
 </div>
 <div className="mt-4 h-2 w-full rounded-full bg-secondary overflow-hidden ">
 <div className="h-full rounded-full bg-white transition-all" style={{ width: `${subject.mastery * 100}%` }} />
 </div>
 </div>
 <div className="hidden sm:flex w-10 h-10 rounded-full bg-secondary/50 border border-border items-center justify-center group-hover:bg-white group-hover:text-foreground transition-colors shrink-0">
 <ChevronRight className="w-5 h-5" />
 </div>
 </div>
 </CardContent>
 </Card>
 </Link>
 );
 })}
 </div>
 </div>

 {/* Detailed analytics links */}
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
 {[
 { label: 'Analytics', desc: 'Performance trends', href: '/student/progress/analytics', icon: BarChart3 },
 { label: 'Mastery Breakdown', desc: 'Topic by topic', href: '/student/progress/mastery', icon: Target },
 { label: 'Retention Heatmap', desc: 'Memory tracking', href: '/student/progress/retention', icon: Brain },
 ].map(({ label, desc, href, icon: Icon }) => (
 <Link key={href} href={href}>
 <Card className="border-border bg-card shadow-sm hover:border-border hover:bg-accent transition-all cursor-pointer h-full rounded-xl group">
 <CardContent className="p-6 flex items-start gap-4">
 <div className="w-12 h-12 rounded-xl bg-secondary/50 border border-border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
 <Icon className="w-6 h-6 text-foreground" />
 </div>
 <div>
 <p className="font-bold text-lg text-foreground mb-1">{label}</p>
 <p className="text-sm font-medium text-muted-foreground">{desc}</p>
 </div>
 </CardContent>
 </Card>
 </Link>
 ))}
 </div>

 {/* Recent activity */}
 <Card className="border-border bg-card shadow-sm rounded-xl overflow-hidden">
 <CardHeader className="pb-4 border-b border-border">
 <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
 <TrendingUp className="w-4 h-4 text-foreground" />
 Recent Activity
 </CardTitle>
 </CardHeader>
 <CardContent className="pt-4 px-2 pb-2">
 <div className="space-y-1">
 {recentActivity.map((activity, i) => (
 <div key={i} className="flex items-center justify-between gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors group">
 <div className="flex-1 min-w-0">
 <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{activity.action}</p>
 <p className="text-sm font-bold text-foreground truncate">{activity.item}</p>
 </div>
 <div className="text-right shrink-0">
 <div className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-[10px] font-black text-foreground mb-1.5 inline-block">
 +{activity.xp} XP
 </div>
 <p className="text-[10px] font-bold text-muted-foreground block">{activity.time}</p>
 </div>
 </div>
 ))}
 </div>
 </CardContent>
 </Card>
 </div>
 );
}
