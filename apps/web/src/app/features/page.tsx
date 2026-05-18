'use client';

import { motion } from 'framer-motion';
import { LandingNavbar } from '@/components/layout/landing-navbar';
import { LandingFooter } from '@/components/layout/landing-footer';
import { Brain, Target, Trophy, Network, Sword, Flame, Star } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Tutoring',
    description: 'Ask anything, anytime. Our AI uses the Socratic method to guide you to answers rather than just giving them — so understanding sticks.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
    tag: 'Powered by Claude & GPT-4',
  },
  {
    icon: Target,
    title: 'True Mastery Progression',
    description: 'Topics unlock only when you\'ve demonstrated real understanding. No skipping ahead — no leaving gaps. Mastery, not memorization.',
    color: 'text-success',
    bg: 'bg-success/10 border-success/20',
    tag: 'Spaced repetition built in',
  },
  {
    icon: Trophy,
    title: 'RPG Rank System',
    description: 'Climb from Bronze to Grandmaster through consistent performance. Your rank reflects actual skill, not time spent.',
    color: 'text-mastery',
    bg: 'bg-mastery/10 border-mastery/20',
    tag: '6 rank tiers',
  },
  {
    icon: Network,
    title: 'Visual Skill Tree',
    description: 'See your entire learning journey as an interactive skill tree. Understand dependencies, spot gaps, and chart the fastest path to mastery.',
    color: 'text-primary',
    bg: 'bg-primary/10 border-primary/20',
    tag: 'DAG-based curriculum',
  },
  {
    icon: Sword,
    title: 'Boss Battles',
    description: 'When you\'re ready, face boss-level challenges. Multi-phase problems that test every aspect of your mastery. Defeat the boss, earn legendary XP.',
    color: 'text-destructive',
    bg: 'bg-destructive/10 border-destructive/20',
    tag: 'Epic rewards',
  },
  {
    icon: Flame,
    title: 'Habit Engine',
    description: 'Daily quests, streak tracking, and spaced review sessions keep you consistent. The system remembers what you\'re about to forget before you do.',
    color: 'text-streak',
    bg: 'bg-streak/10 border-streak/20',
    tag: '7-day grace streak shield',
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden pt-16">
      <LandingNavbar />
      
      {/* Premium ambient background */}
      <div className="fixed inset-0 z-[-1] bg-[#0a0a0a]">
        <div 
          className="absolute inset-0 opacity-[0.15] mix-blend-screen"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/90 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
      </div>

      <main className="relative py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-6">
              Features built for <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">Mastery</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We've re-engineered the learning process from the ground up to ensure you actually understand, not just memorize.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group p-8 rounded-3xl border border-border/60 bg-gradient-to-b from-card/80 to-card/30 backdrop-blur-md hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl border ${feature.bg} flex items-center justify-center mb-6 shadow-inner`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{feature.description}</p>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${feature.bg} ${feature.color}`}>
                  <Star className="w-3.5 h-3.5" />
                  {feature.tag}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
