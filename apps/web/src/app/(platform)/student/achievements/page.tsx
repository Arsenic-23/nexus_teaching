import { Star, Lock, Trophy, Target, Flame, Zap, Puzzle, Skull, Medal, Award, Clock, BookOpen, Crown, Moon, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Rarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

const achievements = [
 { id: 'a1', name: 'First Steps', description: 'Complete your first lesson', icon: Target, rarity: 'COMMON' as Rarity, xpReward: 50, unlocked: true, unlockedDate: '2 weeks ago' },
 { id: 'a2', name: 'On a Roll', description: 'Maintain a 7-day streak', icon: Flame, rarity: 'COMMON' as Rarity, xpReward: 100, unlocked: true, unlockedDate: 'Last week' },
 { id: 'a3', name: 'Quiz Master', description: 'Pass 10 quizzes with 90%+ score', icon: Zap, rarity: 'RARE' as Rarity, xpReward: 250, unlocked: true, unlockedDate: '3 days ago' },
 { id: 'a4', name: 'Problem Solver', description: 'Solve 100 practice problems', icon: Puzzle, rarity: 'RARE' as Rarity, xpReward: 300, unlocked: true, unlockedDate: 'Today' },
 { id: 'a5', name: 'Boss Slayer', description: 'Defeat your first boss battle', icon: Skull, rarity: 'EPIC' as Rarity, xpReward: 500, unlocked: true, unlockedDate: 'Yesterday' },
 { id: 'a6', name: 'Streak Legend', description: 'Maintain a 30-day streak', icon: Medal, rarity: 'LEGENDARY' as Rarity, xpReward: 1000, unlocked: false },
 { id: 'a7', name: 'Perfect Score', description: 'Get 100% on any quiz', icon: Award, rarity: 'EPIC' as Rarity, xpReward: 500, unlocked: false },
 { id: 'a8', name: 'Speed Demon', description: 'Complete a lesson in under 5 minutes', icon: Clock, rarity: 'RARE' as Rarity, xpReward: 200, unlocked: false },
 { id: 'a9', name: 'Knowledge Seeker', description: 'Complete all lessons in a subject', icon: BookOpen, rarity: 'EPIC' as Rarity, xpReward: 750, unlocked: false },
 { id: 'a10', name: 'The Grandmaster', description: 'Reach Grandmaster rank', icon: Crown, rarity: 'LEGENDARY' as Rarity, xpReward: 2000, unlocked: false },
 { id: 'a11', name: 'Night Owl', description: 'Study after midnight', icon: Moon, rarity: 'COMMON' as Rarity, xpReward: 50, unlocked: false },
 { id: 'a12', name: 'Consistent Learner', description: 'Study for 7 consecutive weeks', icon: Calendar, rarity: 'RARE' as Rarity, xpReward: 350, unlocked: false },
];

const rarityConfig: Record<Rarity, { label: string; colors: string; glow: string; star: string }> = {
 COMMON: { label: 'Common', colors: 'border-border bg-secondary/50 text-muted-foreground', glow: '', star: 'text-muted-foreground' },
 RARE: { label: 'Rare', colors: 'border-blue-500/30 bg-blue-500/10 text-blue-400', glow: '', star: 'text-blue-400' },
 EPIC: { label: 'Epic', colors: 'border-purple-500/30 bg-purple-500/10 text-purple-400', glow: '', star: 'text-purple-400' },
 LEGENDARY: { label: 'Legendary', colors: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400', glow: '', star: 'text-yellow-400' },
};

export default function AchievementsPage() {
 const unlocked = achievements.filter((a) => a.unlocked);
 const locked = achievements.filter((a) => !a.unlocked);

 return (
 <div className="space-y-8 animate-fade-in">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-2 flex items-center gap-3">
 <Trophy className="w-8 h-8 text-foreground" />
 Achievements
 </h1>
 <p className="text-muted-foreground text-lg font-medium">
 {unlocked.length}/{achievements.length} unlocked
 </p>
 </div>
 <div className="flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-wider">
 {(['COMMON', 'RARE', 'EPIC', 'LEGENDARY'] as Rarity[]).map((r) => {
 const config = rarityConfig[r];
 return (
 <span key={r} className={cn('px-3 py-1.5 rounded-lg border ', config.colors)}>
 {config.label}
 </span>
 );
 })}
 </div>
 </div>

 {/* Unlocked */}
 <div>
 <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Unlocked</h2>
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
 {unlocked.map((achievement) => {
 const config = rarityConfig[achievement.rarity];
 const Icon = achievement.icon;
 return (
 <Card key={achievement.id} className={cn('border transition-all hover:scale-[1.03] hover:shadow-sm cursor-pointer rounded-xl overflow-hidden group', config.colors, config.glow)}>
 <CardContent className="p-6 text-center relative h-full flex flex-col justify-between">
 <div className="absolute inset-0 bg-white/0 group-hover:bg-secondary/50 transition-colors pointer-events-none" />
 <div>
 <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-card border border-border flex items-center justify-center group-hover:scale-110 transition-transform">
 <Icon className={cn("w-7 h-7", config.star)} />
 </div>
 <div className="flex items-center justify-center gap-1 mb-2">
 <Star className={cn('w-3 h-3 fill-current', config.star)} />
 <span className={cn('text-[9px] font-black uppercase tracking-wider', config.star)}>
 {config.label}
 </span>
 </div>
 <p className="font-bold text-sm text-foreground mb-1 leading-tight">{achievement.name}</p>
 <p className="text-[11px] font-medium text-muted-foreground mb-4 line-clamp-2">{achievement.description}</p>
 </div>
 <div className="mt-auto">
 <div className="px-3 py-1.5 rounded-lg bg-card border border-border text-[10px] font-black text-foreground inline-block mb-2 uppercase tracking-wider">
 +{achievement.xpReward} XP
 </div>
 <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">{achievement.unlockedDate}</p>
 </div>
 </CardContent>
 </Card>
 );
 })}
 </div>
 </div>

 {/* Locked */}
 <div>
 <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Locked</h2>
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
 {locked.map((achievement) => {
 const config = rarityConfig[achievement.rarity];
 const Icon = achievement.icon;
 return (
 <Card key={achievement.id} className="border border-border bg-black/20 opacity-50 rounded-xl overflow-hidden">
 <CardContent className="p-6 text-center h-full flex flex-col justify-between">
 <div>
 <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-secondary/50 border border-border flex items-center justify-center">
 <Icon className="w-7 h-7 text-muted-foreground" />
 </div>
 <div className="flex items-center justify-center gap-1 mb-2">
 <Lock className="w-3 h-3 text-muted-foreground" />
 <span className={cn('text-[9px] font-black uppercase tracking-wider text-muted-foreground')}>
 {config.label}
 </span>
 </div>
 <p className="font-bold text-sm text-muted-foreground mb-1 leading-tight">{achievement.name}</p>
 <p className="text-[11px] font-medium text-muted-foreground mb-4 line-clamp-2">{achievement.description}</p>
 </div>
 <div className="mt-auto">
 <div className="px-3 py-1.5 rounded-lg bg-card border border-border text-[10px] font-black text-muted-foreground inline-block uppercase tracking-wider">
 +{achievement.xpReward} XP
 </div>
 </div>
 </CardContent>
 </Card>
 );
 })}
 </div>
 </div>
 </div>
 );
}
