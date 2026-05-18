import { BookOpen, Lock, ChevronRight, Zap, Star, Calculator, Atom, FlaskConical, Microscope, TerminalSquare, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const mockSubjects = [
 {
 id: 'mathematics',
 name: 'Mathematics',
 icon: Calculator,
 description: 'Algebra, calculus, geometry, and beyond',
 color: '#ffffff',
 totalTopics: 24,
 completedTopics: 8,
 masteryPercent: 45,
 xpEarned: 2400,
 locked: false,
 },
 {
 id: 'physics',
 name: 'Physics',
 icon: Atom,
 description: 'Mechanics, thermodynamics, waves & more',
 color: '#ffffff',
 totalTopics: 20,
 completedTopics: 3,
 masteryPercent: 22,
 xpEarned: 800,
 locked: false,
 },
 {
 id: 'chemistry',
 name: 'Chemistry',
 icon: FlaskConical,
 description: 'Elements, reactions, organic chemistry',
 color: '#ffffff',
 totalTopics: 18,
 completedTopics: 0,
 masteryPercent: 0,
 xpEarned: 0,
 locked: false,
 },
 {
 id: 'biology',
 name: 'Biology',
 icon: Microscope,
 description: 'Cell biology, genetics, ecosystems',
 color: '#ffffff',
 totalTopics: 22,
 completedTopics: 0,
 masteryPercent: 0,
 xpEarned: 0,
 locked: true,
 },
 {
 id: 'computer-science',
 name: 'Computer Science',
 icon: TerminalSquare,
 description: 'Algorithms, data structures, programming',
 color: '#ffffff',
 totalTopics: 16,
 completedTopics: 0,
 masteryPercent: 0,
 xpEarned: 0,
 locked: true,
 },
 {
 id: 'economics',
 name: 'Economics',
 icon: TrendingUp,
 description: 'Microeconomics, macroeconomics, finance',
 color: '#ffffff',
 totalTopics: 14,
 completedTopics: 0,
 masteryPercent: 0,
 xpEarned: 0,
 locked: true,
 },
];

export default function LearnPage() {
 const activeSubjects = mockSubjects.filter((s) => !s.locked);
 const lockedSubjects = mockSubjects.filter((s) => s.locked);

 return (
 <div className="space-y-8 animate-fade-in">
 {/* Header */}
 <div>
 <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-2">Learn</h1>
 <p className="text-muted-foreground text-lg font-medium">
 Choose a subject to continue your learning journey
 </p>
 </div>

 {/* Active Subjects */}
 <section>
 <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">
 Your Subjects
 </h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {activeSubjects.map((subject) => {
 const Icon = subject.icon;
 return (
 <Link key={subject.id} href={`/student/learn/${subject.id}`}>
 <Card
 className="h-full border-border bg-card hover:border-border hover:bg-accent shadow-sm transition-all duration-300 cursor-pointer group rounded-xl overflow-hidden"
 >
 <CardContent className="p-6">
 <div className="flex items-start justify-between mb-5">
 <div
 className="w-14 h-14 rounded-xl flex items-center justify-center text-foreground bg-secondary/50 border border-border transition-transform group-hover:scale-110"
 >
 <Icon className="w-7 h-7" />
 </div>
 <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-xs font-bold text-muted-foreground">
 <Zap className="w-3.5 h-3.5" />
 {subject.xpEarned.toLocaleString()} XP
 </div>
 </div>

 <h3 className="font-display font-bold text-xl text-foreground mb-2">{subject.name}</h3>
 <p className="text-sm font-medium text-muted-foreground mb-6 line-clamp-2">{subject.description}</p>

 <div className="space-y-3 mt-auto">
 <div className="flex items-center justify-between text-xs font-bold">
 <span className="text-muted-foreground uppercase tracking-wider">
 {subject.completedTopics}/{subject.totalTopics} topics
 </span>
 <span className="text-foreground">
 {subject.masteryPercent}%
 </span>
 </div>
 <div className="h-2 w-full rounded-full bg-secondary overflow-hidden ">
 <div
 className="h-full rounded-full bg-white transition-all duration-700 "
 style={{
 width: `${subject.masteryPercent}%`,
 }}
 />
 </div>
 </div>
 </CardContent>
 </Card>
 </Link>
 );
 })}
 </div>
 </section>

 {/* Locked Subjects */}
 {lockedSubjects.length > 0 && (
 <section>
 <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">
 Coming Soon
 </h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {lockedSubjects.map((subject) => {
 const Icon = subject.icon;
 return (
 <Card
 key={subject.id}
 className="border-border bg-secondary/80 opacity-60 cursor-not-allowed rounded-xl"
 >
 <CardContent className="p-6">
 <div className="flex items-start justify-between mb-5">
 <div className="w-14 h-14 rounded-xl bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground">
 <Icon className="w-7 h-7" />
 </div>
 <div className="w-8 h-8 rounded-full bg-muted/50 border border-border flex items-center justify-center">
 <Lock className="w-4 h-4 text-muted-foreground" />
 </div>
 </div>
 <h3 className="font-display font-bold text-xl text-muted-foreground mb-2">{subject.name}</h3>
 <p className="text-sm font-medium text-muted-foreground line-clamp-2">{subject.description}</p>
 <div className="mt-4 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-xs font-bold text-muted-foreground inline-block uppercase tracking-wider">
 {subject.totalTopics} topics
 </div>
 </CardContent>
 </Card>
 );
 })}
 </div>
 </section>
 )}
 </div>
 );
}
