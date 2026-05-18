'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressCelebrationProps {
  visible: boolean;
  message?: string;
  subMessage?: string;
  onComplete?: () => void;
  className?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  velocity: { x: number; y: number };
}

const COLORS = [
  '#3b82f6', '#8b5cf6', '#fbbf24', '#f97316',
  '#10b981', '#ec4899', '#06b6d4', '#a78bfa',
];

export function ProgressCelebration({
  visible,
  message = '🎉 Achievement Unlocked!',
  subMessage,
  onComplete,
  className,
}: ProgressCelebrationProps) {
  const particles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: Math.random() * 8 + 4,
    velocity: {
      x: (Math.random() - 0.5) * 6,
      y: Math.random() * 4 + 2,
    },
  }));

  useEffect(() => {
    if (visible && onComplete) {
      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <div className={cn('pointer-events-none fixed inset-0 z-50', className)}>
          {/* Confetti particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                x: `${particle.x}vw`,
                y: '-20px',
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                x: `${particle.x + particle.velocity.x * 15}vw`,
                y: '110vh',
                rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 2.5 + Math.random() * 1,
                ease: 'easeIn',
                delay: Math.random() * 0.5,
              }}
              style={{
                position: 'absolute',
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              }}
            />
          ))}

          {/* Center message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: '-50%', x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
            exit={{ opacity: 0, scale: 0.8, y: '-50%', x: '-50%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ position: 'absolute', top: '40%', left: '50%' }}
            className="text-center px-8 py-6 rounded-2xl glass border border-white/10 shadow-2xl pointer-events-none"
          >
            <p className="text-2xl font-display font-bold">{message}</p>
            {subMessage && (
              <p className="text-sm text-muted-foreground mt-1">{subMessage}</p>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
