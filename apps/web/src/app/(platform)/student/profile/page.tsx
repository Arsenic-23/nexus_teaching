import { Zap, Flame, Trophy, Star, BookOpen, Target, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { MasteryRing } from '@/components/gamification/mastery-ring';
import { LevelIndicator } from '@/components/gamification/level-indicator';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LottieAnimation } from '@/components/ui/lottie-animation';

const mockProfile = {
 name: 'Alex Johnson',
 username: '@alexj',
 bio: 'Aspiring mathematician and physics enthusiast. Learning one concept at a time.',
 joinedDate: 'September 2024',
 level: 8,
 totalXp: 2450,
 nextLevelXp: 3000,
 rank: { name: 'Gold III', tier: 'GOLD', color: '#ffd700' },
 streak: 12,
 longestStreak: 28,
 totalLessons: 32,
 totalQuizzes: 18,
 avgAccuracy: 82,
 masteryAvg: 0.52,
 recentAchievements: [
 { name: 'Problem Solver', icon: Trophy, rarity: 'RARE' },
 { name: 'Boss Slayer', icon: Zap, rarity: 'EPIC' },
 { name: 'Quiz Master', icon: Star, rarity: 'RARE' },
 ],
};

const rankGlowMap: Record<string, string> = {
 BRONZE: '0 0 20px rgba(205,127,50,0.3)',
 SILVER: '0 0 20px rgba(192,192,192,0.3)',
 GOLD: '0 0 25px rgba(255,215,0,0.4)',
 PLATINUM: '0 0 25px rgba(229,228,226,0.3)',
 DIAMOND: '0 0 30px rgba(185,242,255,0.4)',
 MASTER: '0 0 35px rgba(255,107,53,0.5)',
};

export default function ProfilePage() {
 const profile = mockProfile;

 return (
 <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
 {/* Profile header */}
 <Card className="border-border bg-card shadow-sm rounded-xl overflow-hidden group">
 {/* Banner */}
 <div className="h-32 bg-gradient-brand relative overflow-hidden flex items-center justify-center">
 <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent opacity-50 z-10" />
 <div className="absolute inset-0 opacity-80 z-0 scale-150 pointer-events-none">
 <LottieAnimation animationPath="/lottie/Confetti.json" loop={true} />
 </div>
 </div>
 <CardContent className="pt-0 relative">
 <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-16 mb-6">
 <Avatar className="w-32 h-32 border-4 border-black shadow-sm rounded-xl relative">
 <AvatarFallback className="text-4xl font-black bg-white text-foreground rounded-xl">
 {profile.name.slice(0, 2)}
 </AvatarFallback>
 </Avatar>
 <div className="pb-2 flex-1 min-w-0">
 <h1 className="text-3xl font-display font-black text-foreground truncate">{profile.name}</h1>
 <p className="text-base font-bold text-muted-foreground">{profile.username}</p>
 </div>
 <div
 className="sm:ml-auto mb-2 px-4 py-2 rounded-xl border text-xs font-black uppercase tracking-wider "
 style={{
 color: profile.rank.color,
 borderColor: profile.rank.color + '40',
 background: profile.rank.color + '10',
 boxShadow: rankGlowMap[profile.rank.tier],
 }}
 >
 <Star className="w-4 h-4 inline mr-1.5" />
 {profile.rank.name}
 </div>
 </div>

 {profile.bio && (
 <p className="text-base font-medium text-muted-foreground mb-8 max-w-lg">{profile.bio}</p>
 )}

 {/* Level indicator */}
 <div className="bg-secondary/50 border border-border rounded-xl p-5 ">
 <LevelIndicator
 level={profile.level}
 currentXp={profile.totalXp}
 nextLevelXp={profile.nextLevelXp}
 size="md"
 />
 </div>

 <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-6 text-center sm:text-left">Member since {profile.joinedDate}</p>
 </CardContent>
 </Card>

 {/* Stats grid */}
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {[
 { label: 'Total XP', value: profile.totalXp.toLocaleString(), icon: Zap, color: 'text-foreground' },
 { label: 'Day Streak', value: `${profile.streak} 🔥`, icon: Flame, color: 'text-orange-500' },
 { label: 'Lessons', value: profile.totalLessons, icon: BookOpen, color: 'text-muted-foreground' },
 { label: 'Accuracy', value: `${profile.avgAccuracy}%`, icon: Target, color: 'text-foreground' },
 ].map(({ label, value, icon: Icon, color }) => (
 <Card key={label} className="border-border bg-card rounded-xl shadow-sm overflow-hidden group">
 <CardContent className="p-6 text-center relative">
 <div className="absolute inset-0 bg-white/0 group-hover:bg-secondary/50 transition-colors pointer-events-none" />
 <div className="w-12 h-12 mx-auto rounded-xl bg-secondary/50 border border-border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
 <Icon className={`w-6 h-6 ${color}`} />
 </div>
 <p className="text-2xl font-black text-foreground mb-1">{value}</p>
 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{label}</p>
 </CardContent>
 </Card>
 ))}
 </div>

 {/* Mastery overview */}
 <Card className="border-border bg-card rounded-xl shadow-sm overflow-hidden">
 <CardHeader className="pb-4 border-b border-border">
 <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-widest flex items-center justify-between">
 <span className="flex items-center gap-2 text-foreground">
 <Target className="w-4 h-4" />
 Mastery
 </span>
 <Link href="/student/progress/mastery" className="text-[10px] font-bold text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors">View details →</Link>
 </CardTitle>
 </CardHeader>
 <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
 <MasteryRing level={profile.masteryAvg} size={80} className="shrink-0 drop-" showLabel />
 <div className="flex-1 text-center sm:text-left w-full min-w-0">
 <p className="font-black text-3xl text-foreground mb-1">{Math.round(profile.masteryAvg * 100)}%</p>
 <p className="text-sm font-medium text-muted-foreground mb-4">Overall mastery across all topics</p>
 <div className="h-2 w-full rounded-full bg-secondary overflow-hidden ">
 <div className="h-full rounded-full bg-white transition-all" style={{ width: `${profile.masteryAvg * 100}%` }} />
 </div>
 </div>
 </CardContent>
 </Card>

 {/* Recent achievements */}
 <Card className="border-border bg-card rounded-xl shadow-sm overflow-hidden relative">
 <div className="absolute top-0 right-0 w-32 h-32 opacity-50 md:opacity-80 pointer-events-none translate-x-1/4 -translate-y-1/4">
 <LottieAnimation animationPath="/lottie/Trophy.json" />
 </div>
 <CardHeader className="pb-4 border-b border-border relative z-10">
 <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-widest flex items-center justify-between">
 <span className="flex items-center gap-2 text-foreground">
 <Award className="w-4 h-4" />
 Recent Achievements
 </span>
 <Link href="/student/achievements" className="text-[10px] font-bold text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors">View all →</Link>
 </CardTitle>
 </CardHeader>
 <CardContent className="p-6">
 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
 {profile.recentAchievements.map((a) => {
 const Icon = a.icon;
 return (
 <div
 key={a.name}
 className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border bg-secondary/50 hover:bg-secondary hover:scale-[1.02] transition-all cursor-pointer group"
 >
 <div className="w-12 h-12 rounded-full bg-muted/50 border border-border flex items-center justify-center group-hover:scale-110 transition-transform">
 <Icon className="w-6 h-6 text-foreground" />
 </div>
 <div className="text-center w-full">
 <p className="text-sm font-bold text-foreground mb-1 truncate w-full">{a.name}</p>
 <div className={cn(
 "px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider inline-block",
 a.rarity === 'LEGENDARY' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' :
 a.rarity === 'EPIC' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
 'bg-secondary text-muted-foreground border border-border'
 )}>
 {a.rarity}
 </div>
 </div>
 </div>
 );
 })}
 </div>
 </CardContent>
 </Card>
 </div>
 );
}
