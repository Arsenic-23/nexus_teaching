'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, Zap, Brain, Trophy, Target, Flame, Star,
  BookOpen, Network, Sword, ChevronRight, Check,
  Users, TrendingUp, Award, Play, BarChart3
} from 'lucide-react';
import { LandingNavbar } from '@/components/layout/landing-navbar';
import { LandingFooter } from '@/components/layout/landing-footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
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

      {/* Navigation */}
      <LandingNavbar />

      {/* HERO */}
      <section className="relative pt-36 pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-foreground/80 mb-12 shadow-inner">
              <Star className="w-3.5 h-3.5 fill-current" />
              The future of learning
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tighter leading-[1.05] mb-8"
          >
            Learn. Practice.<br />
            <span className="relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500 animate-gradient-x drop-shadow-sm">
                Master.
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Interactive lessons, AI tutoring, and an RPG progression system that makes expertise feel earned.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/sign-up"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-semibold text-base hover:bg-gray-200 transition-all shadow-xl shadow-white/10 hover:-translate-y-1"
            >
              Start Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-foreground font-medium text-base hover:bg-white/10 transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              Watch Demo
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-6 mt-10 text-sm text-muted-foreground flex-wrap"
          >
            {[
              { icon: Users, text: '10,000+ students' },
              { icon: Star, text: '4.9/5 rating' },
              { icon: TrendingUp, text: '3x faster mastery' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon className="w-4 h-4 text-primary" />
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dashboard preview mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-20 relative"
        >
          <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm shadow-2xl shadow-black/40 overflow-hidden">
            {/* Fake browser chrome */}
            <div className="border-b border-border/50 bg-background/60 px-4 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-mastery/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-6 rounded-md bg-secondary/80 flex items-center px-3">
                  <span className="text-xs text-muted-foreground">nexus.learn / student / dashboard</span>
                </div>
              </div>
            </div>
            {/* Mockup content */}
            <div className="p-6 bg-gradient-to-br from-background to-card/50">
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[
                  { label: 'Level 8', sub: 'Gold III', color: 'text-mastery', bg: 'bg-mastery/10' },
                  { label: '2,450 XP', sub: 'This week', color: 'text-brand', bg: 'bg-brand/10' },
                  { label: '12 🔥', sub: 'Day streak', color: 'text-streak', bg: 'bg-streak/10' },
                ].map(({ label, sub, color, bg }) => (
                  <div key={label} className={`${bg} border border-border/50 rounded-xl p-4 text-center`}>
                    <p className={`text-xl font-bold ${color}`}>{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border/50 bg-background/60 p-4 space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Continue Learning</p>
                  <div className="space-y-2">
                    {['Quadratic Formula', 'Complex Numbers', 'Functions'].map((t, i) => (
                      <div key={t} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-primary' : 'bg-secondary'}`} />
                        <span className="text-sm">{t}</span>
                        {i === 0 && <div className="ml-auto h-1.5 w-16 rounded-full bg-secondary overflow-hidden"><div className="h-full w-2/3 bg-gradient-xp rounded-full" /></div>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-border/50 bg-background/60 p-4 space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Daily Quests</p>
                  {[
                    { text: 'Complete 2 lessons', done: true },
                    { text: 'Practice 10 problems', done: true },
                    { text: 'Review weak topics', done: false },
                  ].map(({ text, done }) => (
                    <div key={text} className="flex items-center gap-2 text-sm">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${done ? 'bg-success/20' : 'bg-secondary'}`}>
                        {done && <Check className="w-2.5 h-2.5 text-success" />}
                      </div>
                      <span className={done ? 'line-through text-muted-foreground' : ''}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-4 -right-6 hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-card border border-border shadow-xl text-sm font-semibold"
          >
            <span className="text-lg">🏆</span>
            <div>
              <p className="text-xs font-bold">Achievement!</p>
              <p className="text-[10px] text-muted-foreground">Quiz Master unlocked</p>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-4 -left-6 hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-card border border-border shadow-xl text-sm"
          >
            <Zap className="w-4 h-4 text-brand" />
            <span className="font-bold text-brand">+75 XP</span>
            <span className="text-xs text-muted-foreground">earned</span>
          </motion.div>
        </motion.div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2564&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#030303]/80 to-[#030303]" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6"
          >
            The Nexus Method
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold mb-20 leading-tight"
          >
            Every step builds on the last.
          </motion.p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {[
              { step: 'Learn', icon: BookOpen },
              { step: 'Practice', icon: Sword },
              { step: 'Explain', icon: Brain },
              { step: 'Apply', icon: Target },
              { step: 'Master', icon: Trophy },
              { step: 'Rank Up', icon: Zap },
            ].map(({ step, icon: Icon }, i) => (
              <div key={step} className="flex items-center gap-4 md:gap-0">
                <div className="flex flex-col items-center gap-3 px-6 py-5 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md min-w-[110px] hover:bg-white/5 transition-colors">
                  <Icon className="w-6 h-6 text-gray-300" />
                  <p className="font-bold text-sm text-foreground">{step}</p>
                </div>
                {i < 5 && (
                  <ChevronRight className="w-6 h-6 text-white/20 shrink-0 md:mx-3 rotate-90 md:rotate-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <FeaturesSection />

      {/* FOR TEACHERS */}
      <TeacherSection />

      {/* STATS */}
      <StatsSection />

      {/* PRICING TEASER */}
      <PricingSection />

      {/* FINAL CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2671&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-[#030303]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative p-16 rounded-[2.5rem] border border-white/10 bg-black/40 overflow-hidden shadow-2xl backdrop-blur-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
                Your journey starts today.
              </h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-lg mx-auto leading-relaxed">
                Join thousands of students who stopped just studying and started mastering.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/sign-up"
                  className="group inline-flex items-center gap-2 px-10 py-5 rounded-2xl bg-white text-black font-bold text-lg hover:bg-gray-200 transition-all shadow-2xl shadow-white/10 hover:-translate-y-1"
                >
                  Start Free Today
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}

function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    { icon: Brain, title: 'AI Tutoring', description: 'Ask anything, anytime. Our AI guides you to answers rather than just giving them.' },
    { icon: Target, title: 'True Mastery', description: 'Topics unlock only when you demonstrate real understanding. No skipping ahead.' },
    { icon: Trophy, title: 'Rank System', description: 'Climb from Bronze to Grandmaster. Your rank reflects actual skill, not time spent.' },
    { icon: Network, title: 'Skill Tree', description: 'See your entire learning journey. Spot gaps and chart the fastest path to mastery.' },
    { icon: Sword, title: 'Boss Battles', description: 'Face multi-phase problems that test every aspect of your knowledge.' },
    { icon: Flame, title: 'Habit Engine', description: 'Daily quests and spaced review sessions keep you consistent.' },
  ];

  return (
    <section ref={ref} className="py-32 px-6 relative overflow-hidden border-y border-white/5">
      <div 
        className="absolute inset-0 opacity-10 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#030303]/90 to-[#030303]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Platform</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">Built for mastery.</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group p-8 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-xl hover:bg-black/60 hover:border-white/10 hover:shadow-2xl hover:shadow-white/5 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <feature.icon className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
              <p className="text-base text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeacherSection() {
  return (
    <section className="py-32 px-6 relative border-y border-white/5">
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2664&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%)'
        }}
      />
      <div className="absolute inset-0 bg-[#030303]/80 backdrop-blur-sm" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">For Educators</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
            Teach smarter.
          </h3>
          <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
            Nexus gives you a real-time window into every student's understanding.
            No more guessing who's struggling.
          </p>
          <ul className="space-y-6 mb-12">
            {[
              { icon: BarChart3, text: 'Live analytics and mastery tracking' },
              { icon: Target, text: 'AI-identified weak areas' },
              { icon: Award, text: 'Automated assignment grading' },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-gray-300" />
                </div>
                <span className="text-base text-foreground/90">{text}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/for-teachers"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 bg-black/40 text-white font-bold hover:bg-white/10 transition-colors shadow-xl"
          >
            Explore Educator Tools
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Teacher dashboard mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-6">
            <p className="text-base font-semibold">Advanced Math — Grade 11</p>
            <span className="text-xs text-white bg-white/10 px-2 py-1 rounded-full font-medium">22/28 active</span>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Emma L.', mastery: 88, status: 'active', rank: '💎' },
              { name: 'James R.', mastery: 75, status: 'active', rank: '🥇' },
              { name: 'Sofia M.', mastery: 68, status: 'active', rank: '🥈' },
              { name: 'Marcus T.', mastery: 28, status: 'at-risk', rank: '⚠️' },
            ].map((s) => (
              <div key={s.name} className={`flex items-center gap-4 p-4 rounded-2xl border ${s.status === 'at-risk' ? 'border-white/20 bg-white/5' : 'border-white/5 bg-black/20'}`}>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-base border border-white/10">{s.rank}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{s.name}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className={`h-full rounded-full ${s.status === 'at-risk' ? 'bg-gray-400' : 'bg-white'}`} style={{ width: `${s.mastery}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-6">{s.mastery}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: '10K+', label: 'Active Students' },
    { value: '3x', label: 'Faster Mastery' },
    { value: '95%', label: 'Retention Rate' },
    { value: '4.9★', label: 'Average Rating' },
  ];

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#030303]/80 to-[#030303]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label }, i) => (
            <motion.div 
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center p-8 rounded-3xl border border-white/5 bg-white/[0.02]"
            >
              <p className="text-5xl font-display font-black text-foreground mb-3">{value}</p>
              <p className="text-base text-muted-foreground font-medium">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Start your mastery journey',
      features: ['3 active subjects', 'Basic skill tree', 'Streak tracking'],
      cta: 'Get Started Free',
    },
    {
      name: 'Pro',
      price: '$12',
      period: 'per month',
      description: 'For serious learners',
      features: ['Unlimited subjects', 'Unlimited AI tutoring', 'Boss battles'],
      cta: 'Start Free Trial',
      popular: true,
    },
  ];

  return (
    <section className="py-32 px-6 relative overflow-hidden border-t border-white/5">
      <div 
        className="absolute inset-0 opacity-[0.12] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2594&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#030303]/90 to-[#030303]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Pricing</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold mb-4">Simple, honest pricing.</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative p-10 rounded-3xl border ${plan.popular ? 'border-white/10 bg-white/5 shadow-2xl scale-100 md:scale-105 z-10' : 'border-white/5 bg-black/40 backdrop-blur-sm'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-bold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-8">
                <p className="font-bold text-xl mb-2">{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-display font-black">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="text-base text-muted-foreground">{plan.description}</p>
              </div>
              <ul className="space-y-4 mb-10">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-base">
                    <Check className="w-5 h-5 text-gray-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/sign-up"
                className={`block w-full text-center py-4 rounded-xl font-bold text-base transition-all ${
                  plan.popular
                    ? 'bg-white text-black hover:bg-gray-200 shadow-xl shadow-white/10'
                    : 'border border-white/10 hover:bg-white/5'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
