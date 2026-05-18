'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Hint {
  id: string;
  text: string;
  level: number; // 1 = subtle, 2 = moderate, 3 = near answer
}

interface HintBubbleProps {
  hints: Hint[];
  onHintReveal?: (hintId: string) => void;
  className?: string;
}

export function HintBubble({ hints, onHintReveal, className }: HintBubbleProps) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleReveal = () => {
    if (revealedCount < hints.length) {
      const nextIndex = revealedCount;
      setRevealedCount(nextIndex + 1);
      onHintReveal?.(hints[nextIndex].id);
    }
  };

  const hintLevelLabel = ['', 'Subtle hint', 'Bigger hint', 'Strong hint'];
  const hintLevelColors = ['', 'text-mastery', 'text-orange-400', 'text-destructive'];

  return (
    <div className={cn('relative', className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2 border-mastery/30 text-mastery hover:bg-mastery/5 hover:border-mastery/50"
      >
        <Lightbulb className="w-4 h-4" />
        Hints ({revealedCount}/{hints.length})
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full mb-2 left-0 z-10 w-72 p-4 rounded-xl border border-mastery/20 bg-card shadow-xl"
          >
            <div className="space-y-3">
              {hints.map((hint, i) => {
                const revealed = i < revealedCount;
                return (
                  <div key={hint.id} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={cn('text-xs font-semibold', hintLevelColors[hint.level])}>
                        {hintLevelLabel[hint.level]}
                      </span>
                      {!revealed && <Lock className="w-3 h-3 text-muted-foreground" />}
                    </div>
                    <div
                      className={cn(
                        'p-3 rounded-lg border text-sm transition-all duration-300',
                        revealed
                          ? 'border-mastery/20 bg-mastery/5 text-foreground'
                          : 'border-border bg-secondary/50 text-transparent select-none',
                      )}
                      style={!revealed ? { filter: 'blur(5px)' } : {}}
                    >
                      {hint.text}
                    </div>
                  </div>
                );
              })}

              {revealedCount < hints.length && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleReveal}
                  className="w-full gap-2 border-mastery/30 text-mastery"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  Reveal Next Hint
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              )}

              {revealedCount >= hints.length && (
                <p className="text-xs text-center text-muted-foreground">
                  All hints revealed
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
