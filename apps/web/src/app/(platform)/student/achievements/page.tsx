import { Star, Lock, Trophy, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Rarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

const achievements = [
  { id: 'a1', name: 'First Steps', description: 'Complete your first lesson', icon: '🎯', rarity: 'COMMON' as Rarity, xpReward: 50, unlocked: true, unlockedDate: '2 weeks ago' },
  { id: 'a2', name: 'On a Roll', description: 'Maintain a 7-day streak', icon: '🔥', rarity: 'COMMON' as Rarity, xpReward: 100, unlocked: true, unlockedDate: 'Last week' },
  { id: 'a3', name: 'Quiz Master', description: 'Pass 10 quizzes with 90%+ score', icon: '⚡', rarity: 'RARE' as Rarity, xpReward: 250, unlocked: true, unlockedDate: '3 days ago' },
  { id: 'a4', name: 'Problem Solver', description: 'Solve 100 practice problems', icon: '🧩', rarity: 'RARE' as Rarity, xpReward: 300, unlocked: true, unlockedDate: 'Today' },
  { id: 'a5', name: 'Boss Slayer', description: 'Defeat your first boss battle', icon: '⚔️', rarity: 'EPIC' as Rarity, xpReward: 500, unlocked: true, unlockedDate: 'Yesterday' },
  { id: 'a6', name: 'Streak Legend', description: 'Maintain a 30-day streak', icon: '🏅', rarity: 'LEGENDARY' as Rarity, xpReward: 1000, unlocked: false },
  { id: 'a7', name: 'Perfect Score', description: 'Get 100% on any quiz', icon: '💯', rarity: 'EPIC' as Rarity, xpReward: 500, unlocked: false },
  { id: 'a8', name: 'Speed Demon', description: 'Complete a lesson in under 5 minutes', icon: '⚡', rarity: 'RARE' as Rarity, xpReward: 200, unlocked: false },
  { id: 'a9', name: 'Knowledge Seeker', description: 'Complete all lessons in a subject', icon: '📚', rarity: 'EPIC' as Rarity, xpReward: 750, unlocked: false },
  { id: 'a10', name: 'The Grandmaster', description: 'Reach Grandmaster rank', icon: '👑', rarity: 'LEGENDARY' as Rarity, xpReward: 2000, unlocked: false },
  { id: 'a11', name: 'Night Owl', description: 'Study after midnight', icon: '🦉', rarity: 'COMMON' as Rarity, xpReward: 50, unlocked: false },
  { id: 'a12', name: 'Consistent Learner', description: 'Study for 7 consecutive weeks', icon: '📅', rarity: 'RARE' as Rarity, xpReward: 350, unlocked: false },
];

const rarityConfig: Record<Rarity, { label: string; colors: string; glow: string; star: string }> = {
  COMMON: { label: 'Common', colors: 'border-border bg-secondary/30', glow: '', star: 'text-muted-foreground' },
  RARE: { label: 'Rare', colors: 'border-blue-500/30 bg-blue-500/5', glow: 'shadow-[0_0_12px_rgba(59,130,246,0.2)]', star: 'text-blue-400' },
  EPIC: { label: 'Epic', colors: 'border-purple-500/30 bg-purple-500/5', glow: 'shadow-[0_0_16px_rgba(139,92,246,0.3)]', star: 'text-purple-400' },
  LEGENDARY: { label: 'Legendary', colors: 'border-mastery/30 bg-mastery/5', glow: 'shadow-[0_0_20px_rgba(251,191,36,0.35)]', star: 'text-mastery' },
};

export default function AchievementsPage() {
  const unlocked = achievements.filter((a) => a.unlocked);
  const locked = achievements.filter((a) => !a.unlocked);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <Trophy className="w-6 h-6 text-mastery" />
            Achievements
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {unlocked.length}/{achievements.length} unlocked
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          {(['COMMON', 'RARE', 'EPIC', 'LEGENDARY'] as Rarity[]).map((r) => {
            const config = rarityConfig[r];
            return (
              <span key={r} className={cn('px-2 py-0.5 rounded-full border font-semibold', config.colors, config.star)}>
                {config.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Unlocked */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Unlocked</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {unlocked.map((achievement) => {
            const config = rarityConfig[achievement.rarity];
            return (
              <Card key={achievement.id} className={cn('border transition-all hover:scale-[1.02]', config.colors, config.glow)}>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className={cn('w-3 h-3 fill-current', config.star)} />
                    <span className={cn('text-[10px] font-semibold uppercase tracking-wider', config.star)}>
                      {config.label}
                    </span>
                  </div>
                  <p className="font-bold text-xs mb-0.5">{achievement.name}</p>
                  <p className="text-[10px] text-muted-foreground mb-2 line-clamp-2">{achievement.description}</p>
                  <Badge variant="xp" className="text-[10px]">+{achievement.xpReward} XP</Badge>
                  <p className="text-[9px] text-muted-foreground mt-1">{achievement.unlockedDate}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Locked */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Locked</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {locked.map((achievement) => {
            const config = rarityConfig[achievement.rarity];
            return (
              <Card key={achievement.id} className="border border-border bg-card/30 opacity-60">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2 grayscale">{achievement.icon}</div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Lock className="w-3 h-3 text-muted-foreground" />
                    <span className={cn('text-[10px] font-semibold uppercase tracking-wider', config.star)}>
                      {config.label}
                    </span>
                  </div>
                  <p className="font-bold text-xs mb-0.5 text-muted-foreground">{achievement.name}</p>
                  <p className="text-[10px] text-muted-foreground mb-2 line-clamp-2">{achievement.description}</p>
                  <Badge variant="secondary" className="text-[10px]">+{achievement.xpReward} XP</Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
