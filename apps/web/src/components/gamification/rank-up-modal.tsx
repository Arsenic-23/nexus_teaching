'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Star, Zap, Crown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RankUpModalProps {
  visible: boolean;
  onClose: () => void;
  previousRank: { name: string; tier: string; color: string };
  newRank: { name: string; tier: string; color: string };
  xpEarned?: number;
  className?: string;
}

const tierGlows: Record<string, string> = {
  BRONZE: 'shadow-[0_0_60px_rgba(205,127,50,0.4)]',
  SILVER: 'shadow-[0_0_60px_rgba(192,192,192,0.4)]',
  GOLD: 'shadow-[0_0_60px_rgba(255,215,0,0.5)]',
  PLATINUM: 'shadow-[0_0_60px_rgba(229,228,226,0.4)]',
  DIAMOND: 'shadow-[0_0_60px_rgba(185,242,255,0.5)]',
  MASTER: 'shadow-[0_0_80px_rgba(255,107,53,0.6)]',
};

export function RankUpModal({
  visible,
  onClose,
  previousRank,
  newRank,
  xpEarned,
  className,
}: RankUpModalProps) {
  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-primary/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className={cn(
              'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-md',
              className,
            )}
          >
            <div
              className={cn(
                'relative border border-border bg-card rounded-2xl p-8 text-center overflow-hidden',
                tierGlows[newRank.tier] || '',
              )}
            >
              {/* Background radial glow */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, ${newRank.color}, transparent 70%)`,
                }}
              />

              {/* Crown icon with animation */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                className="flex justify-center mb-4"
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
                  style={{
                    background: `linear-gradient(135deg, ${newRank.color}33, ${newRank.color}11)`,
                    border: `2px solid ${newRank.color}40`,
                  }}
                >
                  👑
                </div>
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mb-1">
                  Rank Up!
                </p>
                <h2 className="text-3xl font-display font-bold mb-2" style={{ color: newRank.color }}>
                  {newRank.name}
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  You&apos;ve advanced from{' '}
                  <span className="font-semibold text-foreground">{previousRank.name}</span>
                </p>
              </motion.div>

              {/* Rank transition display */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-4 mb-6 p-4 rounded-xl bg-secondary/50"
              >
                <div
                  className="px-3 py-1.5 rounded-lg font-semibold text-sm border"
                  style={{
                    color: previousRank.color,
                    borderColor: previousRank.color + '40',
                    background: previousRank.color + '10',
                  }}
                >
                  {previousRank.name}
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
                <div
                  className="px-3 py-1.5 rounded-lg font-bold text-sm border"
                  style={{
                    color: newRank.color,
                    borderColor: newRank.color + '60',
                    background: newRank.color + '20',
                    boxShadow: `0 0 15px ${newRank.color}30`,
                  }}
                >
                  {newRank.name}
                </div>
              </motion.div>

              {/* XP earned */}
              {xpEarned && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 w-fit mx-auto"
                >
                  <Zap className="w-4 h-4 text-brand" />
                  <span className="text-sm font-bold text-brand">+{xpEarned} XP bonus</span>
                </motion.div>
              )}

              {/* Stars animation */}
              <div className="flex justify-center gap-2 mb-6">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <Star className="w-6 h-6 fill-mastery text-mastery" />
                  </motion.div>
                ))}
              </div>

              <Button onClick={onClose} variant="glow" className="w-full">
                <Crown className="w-4 h-4 mr-2" />
                Claim Your Rank!
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
