'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InteractiveBlockProps {
  title?: string;
  instruction?: string;
  children: React.ReactNode;
  onComplete?: () => void;
  completed?: boolean;
  className?: string;
}

export function InteractiveBlock({
  title,
  instruction,
  children,
  onComplete,
  completed = false,
  className,
}: InteractiveBlockProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          {title && (
            <h3 className="text-lg font-display font-bold mb-1">{title}</h3>
          )}
          {instruction && (
            <p className="text-sm text-muted-foreground">{instruction}</p>
          )}
        </div>
        {completed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <CheckCircle2 className="w-6 h-6 text-success shrink-0" />
          </motion.div>
        )}
      </div>

      {/* Interactive content */}
      <div
        className={cn(
          'p-8 rounded-3xl border transition-all duration-500 shadow-sm relative overflow-hidden',
          completed
            ? 'border-success/30 bg-gradient-to-b from-success/10 to-success/5 shadow-success/10'
            : 'border-border/60 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-md',
        )}
      >
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.02),transparent_50%)] pointer-events-none" />
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
