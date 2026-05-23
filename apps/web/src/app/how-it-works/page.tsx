'use client';

import { motion } from 'framer-motion';
import { LandingShell } from '@/components/landing/landing-shell';
import { PageHero } from '@/components/landing/page-hero';
import { LandingCta } from '@/components/landing/landing-cta';
import { BookOpen, Sword, Brain, Target, Trophy, Zap } from 'lucide-react';

const steps = [
  {
    step: 'Learn',
    icon: BookOpen,
    desc: 'Interactive lessons break complex ideas into clear, digestible steps with immediate checks for understanding.',
  },
  {
    step: 'Practice',
    icon: Sword,
    desc: 'Apply what you learned with real problems. Instant feedback shows where reasoning breaks down.',
  },
  {
    step: 'Explain',
    icon: Brain,
    desc: 'The AI tutor asks guiding questions — helping you articulate thinking, not copy answers.',
  },
  {
    step: 'Apply',
    icon: Target,
    desc: 'Quizzes and challenges combine concepts the way exams and real problems do.',
  },
  {
    step: 'Master',
    icon: Trophy,
    desc: 'Demonstrate consistent performance to unlock the next branch of your skill tree.',
  },
  {
    step: 'Rank Up',
    icon: Zap,
    desc: 'Earn XP and maintain streaks as a natural byproduct of genuine progress.',
  },
];

export default function HowItWorksPage() {
  return (
    <LandingShell>
      <PageHero
        badge={<span className="landing-badge">How it works</span>}
        title={
          <>
            A system designed
            <br />
            <span className="text-muted-foreground">for lasting understanding.</span>
          </>
        }
        description="Six deliberate stages. Each one prepares you for the next — so knowledge compounds instead of fading."
      />

      <section className="landing-section pt-0 pb-32">
        <div className="landing-container max-w-3xl">
          <div className="relative">
            <div className="absolute left-[27px] top-4 bottom-4 w-px bg-border hidden md:block" aria-hidden />
            <div className="space-y-6">
              {steps.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-6"
                >
                  <div className="hidden md:flex w-14 h-14 rounded-2xl bg-card border border-border items-center justify-center shrink-0 z-10 shadow-sm">
                    <item.icon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="landing-card flex-1">
                    <div className="flex items-center gap-3 mb-3 md:hidden">
                      <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Step {i + 1}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 hidden md:block">
                      Step {i + 1}
                    </p>
                    <h3 className="text-xl font-semibold mb-2">{item.step}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="text-center mt-16">
            <LandingCta href="/sign-up">Begin your journey</LandingCta>
          </div>
        </div>
      </section>
    </LandingShell>
  );
}
