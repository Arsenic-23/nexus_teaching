import { Zap, Flame, Trophy, Star, BookOpen, Target, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { MasteryRing } from '@/components/gamification/mastery-ring';
import { LevelIndicator } from '@/components/gamification/level-indicator';
import Link from 'next/link';

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
    { name: 'Problem Solver', icon: '🧩', rarity: 'RARE' },
    { name: 'Boss Slayer', icon: '⚔️', rarity: 'EPIC' },
    { name: 'Quiz Master', icon: '⚡', rarity: 'RARE' },
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
      <Card className="border-border bg-card/50 overflow-hidden">
        {/* Banner */}
        <div className="h-24 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/20" />
        <CardContent className="pt-0">
          <div className="flex items-end gap-4 -mt-12 mb-4">
            <Avatar className="w-20 h-20 border-4 border-card">
              <AvatarFallback className="text-2xl font-bold bg-gradient-xp text-white">
                {profile.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="pb-2">
              <h1 className="text-xl font-display font-bold">{profile.name}</h1>
              <p className="text-sm text-muted-foreground">{profile.username}</p>
            </div>
            <div
              className="ml-auto mb-2 px-3 py-1.5 rounded-lg border text-sm font-bold"
              style={{
                color: profile.rank.color,
                borderColor: profile.rank.color + '40',
                background: profile.rank.color + '10',
                boxShadow: rankGlowMap[profile.rank.tier],
              }}
            >
              <Star className="w-3.5 h-3.5 inline mr-1" />
              {profile.rank.name}
            </div>
          </div>

          {profile.bio && (
            <p className="text-sm text-muted-foreground mb-4">{profile.bio}</p>
          )}

          {/* Level indicator */}
          <LevelIndicator
            level={profile.level}
            currentXp={profile.totalXp}
            nextLevelXp={profile.nextLevelXp}
            size="md"
          />

          <p className="text-xs text-muted-foreground mt-2">Member since {profile.joinedDate}</p>
        </CardContent>
      </Card>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total XP', value: profile.totalXp.toLocaleString(), icon: Zap, color: 'text-brand' },
          { label: 'Day Streak', value: `${profile.streak} 🔥`, icon: Flame, color: 'text-streak' },
          { label: 'Lessons', value: profile.totalLessons, icon: BookOpen, color: 'text-primary' },
          { label: 'Accuracy', value: `${profile.avgAccuracy}%`, icon: Target, color: 'text-success' },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-border bg-card/50 text-center">
            <CardContent className="pt-4 pb-4">
              <Icon className={`w-5 h-5 mx-auto mb-1 ${color}`} />
              <p className="text-xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mastery overview */}
      <Card className="border-border bg-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Target className="w-4 h-4 text-mastery" />
              Mastery
            </span>
            <Link href="/student/progress/mastery" className="text-xs text-primary hover:underline">View details →</Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <MasteryRing level={profile.masteryAvg} size={64} showLabel />
          <div className="flex-1">
            <p className="font-bold text-2xl">{Math.round(profile.masteryAvg * 100)}%</p>
            <p className="text-sm text-muted-foreground">Overall mastery across all topics</p>
            <Progress value={profile.masteryAvg * 100} className="h-2 mt-2" />
          </div>
        </CardContent>
      </Card>

      {/* Recent achievements */}
      <Card className="border-border bg-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-mastery" />
              Recent Achievements
            </span>
            <Link href="/student/achievements" className="text-xs text-primary hover:underline">View all →</Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 flex-wrap">
            {profile.recentAchievements.map((a) => (
              <div
                key={a.name}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border bg-secondary/50 hover:border-primary/30 transition-all cursor-pointer"
              >
                <span className="text-2xl">{a.icon}</span>
                <p className="text-xs font-semibold text-center">{a.name}</p>
                <Badge
                  variant={a.rarity === 'LEGENDARY' ? 'mastery' : a.rarity === 'EPIC' ? 'default' : 'secondary'}
                  className="text-[9px]"
                >
                  {a.rarity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
