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
                transition={{ delay: i * 0.07 }}
                className="landing-card"
              >
                <div className="w-11 h-11 rounded-xl bg-muted border border-border flex items-center justify-center mb-5">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{feature.description}</p>
                <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                  {feature.tag}
                </span>
              </motion.article>
            ))}
          </div>
          <div className="text-center mt-14">
            <LandingCta href="/sign-up">Start learning free</LandingCta>
          </div>
        </div>
      </section>

      <section className="landing-section bg-muted/25 border-t border-border">
        <div className="landing-container">
          <SectionHeader
            label="Why Nexus"
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
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </LandingShell>
  );
}
