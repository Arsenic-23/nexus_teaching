'use client';

import { motion } from 'framer-motion';
import { LandingShell } from '@/components/landing/landing-shell';
import { PageHero } from '@/components/landing/page-hero';
import { SectionHeader } from '@/components/landing/section-header';
import { LandingCta } from '@/components/landing/landing-cta';
import { Brain, Target, Trophy, Network, Sword, Flame } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Tutoring',
    description: 'Ask anything, anytime. Guided questions help you discover answers — so understanding sticks.',
    tag: 'Socratic method',
  },
  {
    icon: Target,
    title: 'True Mastery Progression',
    description: 'Topics unlock only after demonstrated understanding. No skipping, no hidden gaps.',
    tag: 'Spaced repetition',
  },
  {
    icon: Trophy,
    title: 'Rank System',
    description: 'Climb from Bronze to Grandmaster. Your rank reflects skill, not hours logged.',
    tag: '6 tiers',
  },
  {
    icon: Network,
    title: 'Visual Skill Tree',
    description: 'See dependencies, spot gaps, and chart the fastest path to mastery.',
    tag: 'DAG curriculum',
  },
  {
    icon: Sword,
    title: 'Boss Battles',
    description: 'Multi-phase challenges that test integrated knowledge when you are ready.',
    tag: 'Epic rewards',
  },
  {
    icon: Flame,
    title: 'Habit Engine',
    description: 'Daily quests and spaced review keep you consistent before you forget.',
    tag: 'Streak shield',
  },
];

export default function FeaturesPage() {
  return (
    <LandingShell>
      <PageHero
        badge={<span className="landing-badge">Platform</span>}
        title={
          <>
            Built for mastery,
            <br />
            <span className="text-muted-foreground">not memorization.</span>
          </>
        }
        description="Every feature exists to help you understand deeply — and prove it."
      />

      <section className="landing-section pt-0">
        <div className="landing-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, type: "spring", stiffness: 100, damping: 20 }}
                className="relative rounded-2xl bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5 group p-[1px] overflow-hidden"
              >
                {/* Default static border */}
                <div className="absolute inset-0 rounded-2xl border border-border transition-opacity duration-300 group-hover:opacity-0" />
                
                {/* The animated spinning gradient border */}
                <div 
                  className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                  style={{ backgroundImage: 'conic-gradient(from 90deg at 50% 50%, transparent 70%, hsl(var(--primary)))' }}
                />
                
                {/* Inner card container */}
                <div className="relative z-10 h-full w-full rounded-[15px] bg-card overflow-hidden flex flex-col">
                  {/* Top accent gradient line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Background Image Layer */}
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <div 
                      className="absolute inset-0 opacity-100 transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: "url('/assets/cards_small.jpeg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <div className="absolute inset-0 bg-white/70 dark:bg-black/80 transition-colors duration-500 group-hover:bg-white/50 dark:group-hover:bg-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-transparent to-white/60 dark:from-black/95 dark:via-transparent dark:to-black/60" />
                  </div>

                  <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-6 transition-transform duration-300">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">{feature.description}</p>
                    <div className="mt-auto">
                      <span className="inline-block text-xs font-medium px-3 py-1.5 rounded-full bg-background/80 backdrop-blur border border-border text-foreground/80 shadow-sm transition-colors duration-300 group-hover:border-primary/30 group-hover:text-primary">
                        {feature.tag}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="text-center mt-14">
            <LandingCta href="/sign-up">Start learning free</LandingCta>
          </div>
        </div>
      </section>

      <section className="landing-section bg-muted/25 border-t border-border relative overflow-hidden">
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        
        <div className="landing-container relative z-10">
          <SectionHeader
            label="Why Nexsori"
            title="Learning that respects your intelligence"
            description="No endless videos. No passive consumption. Just structured progress toward real competence."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Evidence-based', desc: 'Spaced repetition and mastery thresholds backed by learning science.' },
              { title: 'Always personal', desc: 'AI adapts to your gaps and pace — not a one-size-fits-all curriculum.' },
              { title: 'Motivation built in', desc: 'Streaks and ranks reward consistency without replacing real skill.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 100, damping: 20 }}
                className="relative rounded-2xl bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5 group p-[1px] overflow-hidden"
              >
                {/* Default static border */}
                <div className="absolute inset-0 rounded-2xl border border-border transition-opacity duration-300 group-hover:opacity-0" />
                
                {/* The animated spinning gradient border */}
                <div 
                  className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                  style={{ backgroundImage: 'conic-gradient(from 90deg at 50% 50%, transparent 70%, hsl(var(--primary)))' }}
                />
                
                {/* Inner card container */}
                <div className="relative z-10 h-full w-full rounded-[15px] bg-card overflow-hidden">
                  {/* Background Image Layer */}
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <div 
                      className="absolute inset-0 opacity-100 transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: "url('/assets/cards_small.jpeg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <div className="absolute inset-0 bg-white/70 dark:bg-black/80 transition-colors duration-500 group-hover:bg-white/50 dark:group-hover:bg-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-transparent to-white/60 dark:from-black/95 dark:via-transparent dark:to-black/60" />
                  </div>
                  
                  <div className="relative z-10 p-6 sm:p-8">
                    <h4 className="font-semibold text-lg mb-3">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </LandingShell>
  );
}
