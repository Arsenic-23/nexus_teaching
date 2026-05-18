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
          'p-6 rounded-xl border transition-all duration-300',
          completed
            ? 'border-success/20 bg-success/5'
            : 'border-border bg-card/50',
        )}
      >
        {children}
      </div>
    </div>
  );
}
