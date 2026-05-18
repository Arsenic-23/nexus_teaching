'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, BookOpen, Zap, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type LessonStep = {
  id: string;
  type: 'explanation' | 'interactive' | 'quiz' | 'summary';
  title?: string;
  content: React.ReactNode;
};

interface LessonPlayerProps {
  lesson: {
    title: string;
    topic: string;
    xpReward: number;
    steps: LessonStep[];
  };
  onComplete?: () => void;
  onExit?: () => void;
  className?: string;
}

export function LessonPlayer({ lesson, onComplete, onExit, className }: LessonPlayerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const totalSteps = lesson.steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const step = lesson.steps[currentStep];

  const handleNext = () => {
    setCompletedSteps((prev) => new Set([...prev, step.id]));
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      onComplete?.();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div
      className={cn(
        'flex flex-col h-full min-h-screen bg-gradient-page',
        className,
      )}
    >
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-4 px-4 py-3">
          {onExit && (
            <button
              onClick={onExit}
              className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Progress */}
          <div className="flex-1">
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step counter */}
          <span className="text-sm text-muted-foreground shrink-0 font-medium">
            {currentStep + 1}/{totalSteps}
          </span>

          {/* XP badge */}
          <Badge variant="xp" className="shrink-0">
            <Zap className="w-3 h-3 mr-1" />
            +{lesson.xpReward} XP
          </Badge>
        </div>

        {/* Step tabs */}
        <div className="flex gap-1 px-4 pb-2 overflow-x-auto scrollbar-none">
          {lesson.steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(i)}
              className={cn(
                'shrink-0 h-1.5 rounded-full transition-all duration-300',
                i === currentStep
                  ? 'bg-primary w-8'
                  : completedSteps.has(s.id)
                    ? 'bg-success w-4'
                    : 'bg-secondary w-4 hover:bg-muted-foreground',
              )}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Topic breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lesson.topic}</span>
            <span>›</span>
            <span className="text-foreground font-medium">{lesson.title}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {step.content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="sticky bottom-0 border-t border-border bg-background/80 backdrop-blur-sm px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            variant={isLastStep ? 'glow' : 'default'}
            className="gap-2 min-w-[120px]"
          >
            {isLastStep ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Complete
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
