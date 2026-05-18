import { Trophy, Zap, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const weeklyData = [
  { rank: 1, prevRank: 2, name: 'Emma L.', xp: 3200, level: 12, rankName: 'Diamond I', rankColor: '#b9f2ff', avatarUrl: null },
  { rank: 2, prevRank: 1, name: 'James R.', xp: 2800, level: 10, rankName: 'Platinum III', rankColor: '#e5e4e2', avatarUrl: null },
  { rank: 3, prevRank: 3, name: 'You', xp: 2450, level: 8, rankName: 'Gold III', rankColor: '#ffd700', isMe: true, avatarUrl: null },
  { rank: 4, prevRank: 5, name: 'Sofia M.', xp: 2100, level: 7, rankName: 'Gold II', rankColor: '#ffd700', avatarUrl: null },
  { rank: 5, prevRank: 4, name: 'Liam K.', xp: 1950, level: 7, rankName: 'Gold I', rankColor: '#ffd700', avatarUrl: null },
  { rank: 6, prevRank: 6, name: 'Mia P.', xp: 1780, level: 6, rankName: 'Silver III', rankColor: '#c0c0c0', avatarUrl: null },
  { rank: 7, prevRank: 8, name: 'Noah C.', xp: 1620, level: 6, rankName: 'Silver II', rankColor: '#c0c0c0', avatarUrl: null },
  { rank: 8, prevRank: 7, name: 'Ava W.', xp: 1490, level: 5, rankName: 'Silver I', rankColor: '#c0c0c0', avatarUrl: null },
  { rank: 9, prevRank: 9, name: 'Ethan B.', xp: 1320, level: 5, rankName: 'Bronze III', rankColor: '#cd7f32', avatarUrl: null },
  { rank: 10, prevRank: 10, name: 'Olivia N.', xp: 1200, level: 4, rankName: 'Bronze II', rankColor: '#cd7f32', avatarUrl: null },
];

const positionEmojis: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

function LeaderboardEntry({ entry }: { entry: typeof weeklyData[0] }) {
  const change = entry.prevRank - entry.rank;
  return (
    <div className={cn(
      'flex items-center gap-3 p-3 rounded-xl border transition-all',
      entry.isMe ? 'bg-primary/10 border-primary/30 shadow-md' : 'border-border hover:bg-secondary/50',
    )}>
      {/* Position */}
      <div className="w-8 text-center shrink-0">
        {positionEmojis[entry.rank] ? (
          <span className="text-lg">{positionEmojis[entry.rank]}</span>
        ) : (
          <span className="text-sm font-bold text-muted-foreground">#{entry.rank}</span>
        )}
      </div>

      {/* Avatar */}
      <Avatar className="w-9 h-9 shrink-0">
        <AvatarImage src={entry.avatarUrl || undefined} />
        <AvatarFallback className="text-xs">{entry.name.slice(0, 2)}</AvatarFallback>
      </Avatar>

      {/* Name + rank */}
      <div className="flex-1 min-w-0">
        <p className={cn('text-sm truncate', entry.isMe && 'font-bold')}>
          {entry.name} {entry.isMe && <span className="text-primary text-xs">(You)</span>}
        </p>
        <p className="text-xs font-semibold" style={{ color: entry.rankColor }}>{entry.rankName}</p>
      </div>

      {/* XP */}
      <div className="text-right shrink-0">
        <div className="flex items-center gap-1 justify-end">
          <Zap className="w-3 h-3 text-brand" />
          <span className="text-sm font-bold">{entry.xp.toLocaleString()}</span>
        </div>
        {change !== 0 && (
          <p className={cn('text-[10px]', change > 0 ? 'text-success' : 'text-destructive')}>
            {change > 0 ? `↑${change}` : `↓${Math.abs(change)}`}
          </p>
        )}
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  const myEntry = weeklyData.find((e) => e.isMe);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <Trophy className="w-6 h-6 text-mastery" />
          Leaderboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Compete with your classmates</p>
      </div>

      {/* My position card */}
      {myEntry && (
        <div className="p-4 rounded-2xl border border-primary/30 bg-primary/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-xp flex items-center justify-center text-white font-bold text-lg">
            #{myEntry.rank}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Your Position</p>
            <p className="font-display font-bold text-xl">Rank #{myEntry.rank}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-muted-foreground">Total XP</p>
            <p className="font-bold text-lg text-brand">{myEntry.xp.toLocaleString()}</p>
          </div>
        </div>
      )}

      <Tabs defaultValue="weekly">
        <TabsList>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="alltime">All Time</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-2 mt-4">
          {weeklyData.map((entry) => (
            <LeaderboardEntry key={entry.rank} entry={entry} />
          ))}
        </TabsContent>
        <TabsContent value="monthly" className="mt-4">
          <div className="space-y-2">
            {[...weeklyData].sort(() => Math.random() - 0.5).map((entry, i) => (
              <LeaderboardEntry key={entry.rank} entry={{ ...entry, rank: i + 1, prevRank: entry.rank }} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="alltime" className="mt-4">
          <div className="space-y-2">
            {weeklyData.map((entry) => (
              <LeaderboardEntry key={entry.rank} entry={entry} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
