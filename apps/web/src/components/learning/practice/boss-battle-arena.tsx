'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword, Shield, Heart, Zap, ChevronRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface BossStats {
  name: string;
  emoji: string;
  hp: number;
  maxHp: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  topic: string;
  xpReward: number;
  description: string;
}

interface PlayerStats {
  hp: number;
  maxHp: number;
  attackPower: number;
  level: number;
}

interface BossBattleArenaProps {
  boss: BossStats;
  player: PlayerStats;
  onStartBattle?: () => void;
  onAnswer?: (correct: boolean) => void;
  phase?: 'lobby' | 'battle' | 'victory' | 'defeat';
  className?: string;
}

const difficultyConfig = {
  easy: { color: 'text-success', bg: 'bg-success/10 border-success/30', label: 'Easy' },
  medium: { color: 'text-mastery', bg: 'bg-mastery/10 border-mastery/30', label: 'Medium' },
  hard: { color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30', label: 'Hard' },
  legendary: { color: 'text-destructive', bg: 'bg-destructive/10 border-destructive/30', label: 'Legendary' },
};

export function BossBattleArena({
  boss,
  player,
  onStartBattle,
  onAnswer,
  phase = 'lobby',
  className,
}: BossBattleArenaProps) {
  const [shake, setShake] = useState<'boss' | 'player' | null>(null);
  const difficulty = difficultyConfig[boss.difficulty];

  const bossHpPercent = Math.max((boss.hp / boss.maxHp) * 100, 0);
  const playerHpPercent = Math.max((player.hp / player.maxHp) * 100, 0);

  const handleAnswer = (correct: boolean) => {
    setShake(correct ? 'boss' : 'player');
    setTimeout(() => setShake(null), 600);
    onAnswer?.(correct);
  };

  return (
    <div
      className={cn(
        'rounded-2xl border overflow-hidden',
        boss.difficulty === 'legendary'
          ? 'border-destructive/40 bg-destructive/5'
          : 'border-border bg-card',
        className,
      )}
    >
      {/* Arena header */}
      <div className="relative p-6 text-center border-b border-border bg-gradient-to-b from-background to-card">
        <Badge
          className={cn('absolute top-4 right-4', difficulty.bg, difficulty.color)}
        >
          {difficulty.label}
        </Badge>

        {/* Boss character */}
        <motion.div
          animate={shake === 'boss' ? { x: [-5, 5, -5, 5, 0] } : { y: [0, -4, 0] }}
          transition={
            shake === 'boss'
              ? { duration: 0.4 }
              : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
          }
          className="text-7xl mb-3 inline-block"
        >
          {boss.emoji}
        </motion.div>

        <h2 className="text-xl font-display font-bold">{boss.name}</h2>
        <p className="text-xs text-muted-foreground mt-0.5">{boss.topic}</p>

        {/* Boss HP */}
        <div className="mt-4 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-destructive">
              <Heart className="w-3 h-3" /> Boss HP
            </span>
            <span className="font-mono font-bold">{boss.hp}/{boss.maxHp}</span>
          </div>
          <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-destructive to-orange-400 rounded-full"
              style={{ width: `${bossHpPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* VS divider */}
      <div className="flex items-center justify-center py-2 bg-secondary/30">
        <span className="text-xs font-bold text-muted-foreground tracking-widest">⚔️ VS ⚔️</span>
      </div>

      {/* Player HP */}
      <div className="px-6 pt-3 pb-4 space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 text-success">
            <Shield className="w-3 h-3" /> Your HP
          </span>
          <span className="font-mono font-bold">{player.hp}/{player.maxHp}</span>
        </div>
        <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
          <motion.div
            className={cn(
              'h-full rounded-full',
              playerHpPercent > 50 ? 'bg-gradient-to-r from-success to-emerald-400' :
              playerHpPercent > 25 ? 'bg-gradient-to-r from-mastery to-yellow-400' :
              'bg-gradient-to-r from-destructive to-red-400',
            )}
            style={{ width: `${playerHpPercent}%` }}
            animate={shake === 'player' ? { scale: [1, 0.97, 1] } : {}}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        {phase === 'lobby' && (
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">{boss.description}</p>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-lg border border-border bg-card text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Sword className="w-4 h-4 text-primary" />
                  <span className="font-bold">Attack Power</span>
                </div>
                <p className="text-muted-foreground text-xs">Correct answers deal {player.attackPower} damage</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-card text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Zap className="w-4 h-4 text-mastery" />
                  <span className="font-bold">Reward</span>
                </div>
                <p className="text-muted-foreground text-xs">+{boss.xpReward} XP on victory</p>
              </div>
            </div>

            <Button
              variant="glow"
              size="lg"
              onClick={onStartBattle}
              className="w-full gap-2"
            >
              <Sword className="w-5 h-5" />
              Start Battle!
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {phase === 'victory' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <div className="text-5xl">🏆</div>
            <h3 className="text-xl font-bold text-mastery">Victory!</h3>
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 text-brand" />
              <span className="font-bold text-brand text-lg">+{boss.xpReward} XP</span>
            </div>
          </motion.div>
        )}

        {phase === 'defeat' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <div className="text-5xl">💀</div>
            <h3 className="text-xl font-bold text-destructive">Defeated!</h3>
            <p className="text-sm text-muted-foreground">You were defeated, but you gained experience. Try again!</p>
            <Button variant="outline" onClick={onStartBattle} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Try Again
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Import RotateCcw for the defeat state
import { RotateCcw } from 'lucide-react';
