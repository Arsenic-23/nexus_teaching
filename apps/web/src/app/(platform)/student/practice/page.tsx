import { Sword, Target, RotateCcw, Zap, ChevronRight, Flame, Clock, BookOpen, Skull } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

const mockPracticeData = {
 dailyQuests: [
 { id: '1', title: 'Complete 2 lessons', type: 'lesson' as const, current: 1, target: 2, xpReward: 30, completed: false, estimatedMinutes: 20, description: 'Pick up where you left off', href: '/student/learn' },
 { id: '2', title: 'Practice 10 problems', type: 'quiz' as const, current: 10, target: 10, xpReward: 25, completed: true, estimatedMinutes: 15, description: 'Problem solving practice', href: '/student/practice/daily' },
 { id: '3', title: 'Review weak topics', type: 'review' as const, current: 0, target: 3, xpReward: 30, completed: false, estimatedMinutes: 10, description: 'Spaced repetition review', href: '/student/practice/review' },
 { id: '4', title: 'Defeat a Boss Battle', type: 'boss' as const, current: 0, target: 1, xpReward: 50, completed: false, estimatedMinutes: 30, description: 'Challenge boss level questions', href: '/student/practice/boss' },
 ],
 bossBattles: [
 { id: 'algebra-boss', name: 'The Algebra Titan', icon: Skull, topic: 'Algebra Mastery', difficulty: 'medium' as const, xpReward: 200, available: true },
 { id: 'calculus-boss', name: 'Derivative Dragon', icon: Skull, topic: 'Calculus Concepts', difficulty: 'hard' as const, xpReward: 350, available: false },
 ],
 reviewItems: {
 dueToday: 8,
 overdue: 3,
 upcoming: 12,
 },
 streak: 12,
};

export default function PracticePage() {
 const { dailyQuests, bossBattles, reviewItems } = mockPracticeData;
 const completedQuests = dailyQuests.filter((q) => q.completed).length;
 const questProgress = (completedQuests / dailyQuests.length) * 100;

 return (
 <div className="space-y-8 animate-fade-in">
 {/* Header */}
 <div>
 <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-2 flex items-center gap-3">
 <Sword className="w-8 h-8 text-foreground" />
 Practice Hub
 </h1>
 <p className="text-muted-foreground text-lg font-medium">
 Sharpen your skills with daily practice and boss battles
 </p>
 </div>

 {/* Daily progress bar */}
 <Card className="border-border bg-card shadow-sm rounded-xl overflow-hidden">
 <CardContent className="p-6">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
 <div>
 <p className="font-bold text-foreground text-lg">Daily Goal</p>
 <p className="text-sm font-medium text-muted-foreground">{completedQuests}/{dailyQuests.length} quests completed</p>
 </div>
 <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 border border-border ">
 <Flame className="w-5 h-5 text-orange-500" />
 <span className="font-bold text-foreground">{mockPracticeData.streak} day streak</span>
 </div>
 </div>
 <div className="h-3 w-full rounded-full bg-secondary overflow-hidden ">
 <div className="h-full rounded-full bg-white transition-all duration-1000" style={{ width: `${questProgress}%` }} />
 </div>
 {questProgress === 100 && (
 <p className="text-sm font-bold text-foreground mt-4 flex items-center gap-2">
 <Zap className="w-4 h-4 text-foreground" /> Daily goal complete! +50 bonus XP earned
 </p>
 )}
 </CardContent>
 </Card>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 <div className="space-y-6">
 <div className="flex items-center justify-between">
 <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
 <Target className="w-4 h-4 text-foreground" />
 Daily Quests
 </h2>
 <Link href="/student/practice/daily">
 <Button size="sm" className="h-8 text-xs gap-1 bg-secondary text-foreground hover:bg-secondary/80 border border-border rounded-lg font-bold">
 Start All
 <ChevronRight className="w-3.5 h-3.5" />
 </Button>
 </Link>
 </div>
 <div className="space-y-4">
 {dailyQuests.map((quest) => (
 <Link key={quest.id} href={quest.href} className="block">
 <Card className={`border-border bg-card hover:border-border hover:bg-accent shadow-sm transition-all cursor-pointer rounded-xl group ${quest.completed ? 'opacity-50' : ''}`}>
 <CardContent className="p-6">
 <div className="flex items-start gap-4">
 <div className="w-12 h-12 rounded-xl bg-secondary/50 border border-border flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
 {quest.completed ? <Target className="w-6 h-6 text-muted-foreground" /> : quest.type === 'lesson' ? <BookOpen className="w-6 h-6 text-foreground" /> : quest.type === 'quiz' ? <Zap className="w-6 h-6 text-foreground" /> : quest.type === 'review' ? <RotateCcw className="w-6 h-6 text-foreground" /> : <Sword className="w-6 h-6 text-foreground" />}
 </div>
 <div className="flex-1 min-w-0">
 <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
 <p className={`font-bold text-lg ${quest.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{quest.title}</p>
 <div className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-[10px] font-black text-foreground shrink-0 uppercase tracking-wider">
 +{quest.xpReward} XP
 </div>
 </div>
 <p className="text-sm font-medium text-muted-foreground mb-4">{quest.description}</p>
 {!quest.completed && quest.current > 0 && (
 <div className="mt-auto">
 <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
 <span>Progress</span>
 <span>{quest.current}/{quest.target}</span>
 </div>
 <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden ">
 <div className="h-full rounded-full bg-white transition-all" style={{ width: `${(quest.current / quest.target) * 100}%` }} />
 </div>
 </div>
 )}
 </div>
 </div>
 </CardContent>
 </Card>
 </Link>
 ))}
 </div>
 </div>

 {/* Right column: Review + Boss */}
 <div className="space-y-6">
 {/* Spaced Repetition Review */}
 <Card className="border-border bg-card shadow-sm rounded-xl overflow-hidden group">
 <CardHeader className="pb-4 border-b border-border">
 <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-widest flex items-center justify-between">
 <span className="flex items-center gap-2 text-foreground">
 <RotateCcw className="w-4 h-4" />
 Spaced Review
 </span>
 <div className="px-3 py-1.5 rounded-lg bg-white text-[10px] font-black uppercase tracking-wider text-foreground">
 {reviewItems.dueToday + reviewItems.overdue} due
 </div>
 </CardTitle>
 </CardHeader>
 <CardContent className="pt-6 pb-6">
 <div className="grid grid-cols-3 gap-4 mb-6 text-center">
 <div className="p-4 rounded-xl bg-secondary/50 border border-border ">
 <p className="font-black text-xl text-foreground mb-1">{reviewItems.overdue}</p>
 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Overdue</p>
 </div>
 <div className="p-4 rounded-xl bg-secondary border border-border relative">
 <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse " />
 <p className="font-black text-xl text-foreground mb-1">{reviewItems.dueToday}</p>
 <p className="text-[10px] font-bold text-foreground uppercase tracking-wider">Due Today</p>
 </div>
 <div className="p-4 rounded-xl bg-secondary/50 border border-border ">
 <p className="font-black text-xl text-muted-foreground mb-1">{reviewItems.upcoming}</p>
 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Upcoming</p>
 </div>
 </div>
 <Link href="/student/practice/review" className="block">
 <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl py-6 font-bold shadow-lg">
 <RotateCcw className="w-4 h-4" />
 Start Review Session
 </Button>
 </Link>
 </CardContent>
 </Card>

 {/* Boss Battles */}
 <Card className="border-border bg-card shadow-sm rounded-xl overflow-hidden">
 <CardHeader className="pb-4 border-b border-border">
 <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-widest flex items-center justify-between">
 <span className="flex items-center gap-2 text-foreground">
 <Skull className="w-4 h-4" />
 Boss Battles
 </span>
 </CardTitle>
 </CardHeader>
 <CardContent className="pt-6 pb-6">
 <div className="space-y-4">
 {bossBattles.map((boss) => {
 const Icon = boss.icon;
 return (
 <div key={boss.id} className={`flex items-center gap-4 p-5 rounded-xl border transition-all ${boss.available ? 'border-border bg-secondary/50 hover:bg-secondary group' : 'border-border bg-muted/50 opacity-50'}`}>
 <div className="w-12 h-12 rounded-xl bg-primary border border-border flex items-center justify-center shrink-0">
 <Icon className="w-6 h-6 text-foreground" />
 </div>
 <div className="flex-1 min-w-0">
 <p className="font-bold text-base text-foreground mb-1">{boss.name}</p>
 <p className="text-xs font-medium text-muted-foreground">{boss.topic}</p>
 </div>
 <div className="text-right shrink-0">
 <div className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-[10px] font-black text-foreground mb-2 inline-block">
 +{boss.xpReward} XP
 </div>
 {boss.available ? (
 <Link href="/student/practice/boss" className="block">
 <Button size="sm" className="w-full h-8 text-xs bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-bold">
 Fight <Sword className="w-3 h-3 ml-1" />
 </Button>
 </Link>
 ) : (
 <div className="w-full text-center text-[10px] font-bold text-muted-foreground uppercase tracking-wider py-1.5 border border-border rounded-lg">
 Locked
 </div>
 )}
 </div>
 </div>
 );
 })}
 </div>
 <Link href="/student/practice/boss" className="block mt-6">
 <p className="text-xs font-bold text-center text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors">View all boss battles →</p>
 </Link>
 </CardContent>
 </Card>
 </div>
 </div>
 </div>
 );
}
