'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface XpGainToastProps {
  amount: number;
  visible: boolean;
  className?: string;
}

export function XpGainToast({ amount, visible, className }: XpGainToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: 1, y: -40, scale: 1.1 }}
          exit={{ opacity: 0, y: -80, scale: 0.8 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className={cn(
            'pointer-events-none absolute z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-xp text-white text-sm font-bold shadow-lg glow-brand',
            className,
          )}
        >
          <Zap className="w-3.5 h-3.5" />
          +{amount} XP
        </motion.div>
      )}
    </AnimatePresence>
  );
}
