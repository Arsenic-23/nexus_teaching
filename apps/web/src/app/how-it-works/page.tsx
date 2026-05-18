'use client';

import { motion } from 'framer-motion';
import { LandingNavbar } from '@/components/layout/landing-navbar';
import { LandingFooter } from '@/components/layout/landing-footer';
import { BookOpen, Sword, Brain, Target, Trophy, Zap } from 'lucide-react';

const steps = [
  { step: 'Learn', icon: BookOpen, color: 'bg-white/5 text-foreground border-white/10', desc: 'Interactive lessons break down complex concepts into digestible insights.' },
  { step: 'Practice', icon: Sword, color: 'bg-white/5 text-foreground border-white/10', desc: 'Solve real problems instantly to ensure the knowledge starts sticking.' },
  { step: 'Explain', icon: Brain, color: 'bg-white/5 text-foreground border-white/10', desc: 'AI tutoring uses the Socratic method to debug your misunderstandings.' },
  { step: 'Apply', icon: Target, color: 'bg-white/5 text-foreground border-white/10', desc: 'Take on quizzes and boss battles that combine multiple concepts.' },
  { step: 'Master', icon: Trophy, color: 'bg-white/5 text-foreground border-white/10', desc: 'Prove true mastery to unlock the next branches of the skill tree.' },
  { step: 'Rank Up', icon: Zap, color: 'bg-white/5 text-foreground border-white/10', desc: 'Earn XP, maintain streaks, and climb the leaderboard as a byproduct of learning.' },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden pt-16">
      <LandingNavbar />
      
      {/* Ultra-premium dark ambient background */}
      <div className="fixed inset-0 z-[-1] bg-[#030303]">
        <div 
          className="absolute inset-0 opacity-[0.25] mix-blend-screen"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%) brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/90 to-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-60" />
      </div>

      <main className="relative py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-6">
              How <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">Nexus</span> Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A systematic approach to learning that guarantees you'll master the material. Every step builds on the last.
            </p>
          </motion.div>
        </div>

        <div className="space-y-8 relative pl-4 md:pl-0">
          {/* Connecting line */}
          <div className="absolute left-[36px] top-8 bottom-8 w-1 bg-gradient-to-b from-transparent via-border/40 to-transparent hidden md:block rounded-full" />

          {steps.map((stepInfo, i) => (
            <motion.div
              key={stepInfo.step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 relative"
            >
              <div className={`w-20 h-20 rounded-3xl border ${stepInfo.color} flex items-center justify-center shrink-0 shadow-xl relative bg-black/40 backdrop-blur-md z-10 hidden md:flex group-hover:bg-white/5 transition-colors duration-500`}>
                <stepInfo.icon className="w-8 h-8 opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-8 rounded-3xl border border-white/5 bg-black/40 hover:bg-black/60 backdrop-blur-xl shadow-2xl hover:shadow-white/5 hover:-translate-y-1 transition-all duration-500 flex-1 w-full group">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl border ${stepInfo.color} flex items-center justify-center shrink-0 shadow-inner md:hidden`}>
                    <stepInfo.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold">Step {i + 1}: {stepInfo.step}</h3>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed group-hover:text-foreground/80 transition-colors">{stepInfo.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
