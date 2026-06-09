'use client';

import Link from 'next/link';
import { motion, useInView, useScroll, useTransform, useSpring, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';
import {
  ArrowRight,
  Zap,
  Brain,
  Trophy,
  Target,
  Flame,
  Star,
  BookOpen,
  Network,
  Sword,
  ChevronRight,
  Check,
  Users,
  TrendingUp,
  Award,
  BarChart3,
  GraduationCap,
} from 'lucide-react';
import { LandingShell } from '@/components/landing/landing-shell';
import { PageHero } from '@/components/landing/page-hero';
import { SectionHeader } from '@/components/landing/section-header';
import { LandingCta } from '@/components/landing/landing-cta';
import { cn } from '@/lib/utils';
import { LottieAnimation } from '@/components/ui/lottie-animation';

const methodSteps = [
  { step: 'Learn', icon: BookOpen, desc: 'Structured lessons' },
  { step: 'Practice', icon: Sword, desc: 'Real problems' },
  { step: 'Explain', icon: Brain, desc: 'AI guidance' },
  { step: 'Master', icon: Trophy, desc: 'Prove skill' },
];

const features = [
  { icon: Brain, title: 'AI Tutoring', description: 'Socratic guidance that builds understanding, not dependency.' },
  { icon: Target, title: 'True Mastery', description: 'Topics unlock only when you demonstrate real comprehension.' },
  { icon: Network, title: 'Skill Tree', description: 'Visualize your path and spot gaps before they compound.' },
  { icon: Sword, title: 'Boss Battles', description: 'Multi-phase challenges that test integrated knowledge.' },
  { icon: Trophy, title: 'Rank System', description: 'Progress tied to performance, not hours logged.' },
  { icon: Flame, title: 'Daily Habits', description: 'Quests and spaced review keep learning consistent.' },
];

const stats = [
  { value: '10K+', label: 'Active learners' },
  { value: '3×', label: 'Faster mastery' },
  { value: '95%', label: 'Retention rate' },
  { value: '4.9', label: 'Average rating' },
];

export default function HomePage() {
  const macWindowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: macWindowRef,
    offset: ["start end", "center center"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 });

  const scale = useTransform(smoothProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(smoothProgress, [0, 1], [0.2, 1]);
  const rotateX = useTransform(smoothProgress, [0, 1], [15, 0]);

  return (
    <LandingShell>
      <PageHero
        title={
          <>
            Learn with clarity.
            <br />
            <span className="text-gradient-brand">Master with confidence.</span>
          </>
        }
        description="Structured lessons, intelligent tutoring, and meaningful progress — designed for students who want to truly understand."
      >
        <LandingCta href="/sign-up">Start free</LandingCta>
        <LandingCta href="/how-it-works" variant="secondary" showArrow={false}>
          See how it works
        </LandingCta>
      </PageHero>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-center relative z-10 pointer-events-none -mt-10 mb-8 md:mb-16"
      >
        <LottieAnimation
          animationPath="/lottie/Online Learning.json"
          className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] drop-shadow-2xl opacity-95"
        />
      </motion.div>

      {/* Trust bar */}
      <section className="pb-20 px-6">
        <div className="landing-container">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-sm font-medium text-muted-foreground/80">
            {[
              { icon: Users, text: '10,000+ students' },
              { icon: GraduationCap, text: '500+ classrooms' },
              { icon: TrendingUp, text: '3× faster mastery' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 text-primary opacity-80" />
                <span className="tracking-wide uppercase text-xs font-semibold">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product preview */}
      <section className="landing-section pt-0 relative z-20">
        <div className="landing-container perspective-[2000px]" ref={macWindowRef}>
          {/* Border light wrapper */}
          <motion.div
            style={{ scale, opacity, rotateX }}
            className="rounded-3xl p-[1.5px] max-w-5xl mx-auto transform-gpu relative"
          >
            {/* Spinning border light */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <div className="absolute inset-[-100%] animate-border-spin bg-[conic-gradient(from_0deg,transparent_0%,transparent_40%,hsl(var(--primary)/0.6)_50%,transparent_60%,transparent_100%)]" />
            </div>
            {/* Static subtle border fallback */}
            <div className="absolute inset-0 rounded-3xl border border-border/30" />

            <div
              className="rounded-[calc(1.5rem-1.5px)] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] shadow-primary/10 bg-white overflow-hidden p-0 relative group aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9]"
            >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img 
                src="/landing/learning_dashboard.jpeg" 
                alt="Product Dashboard" 
                className="w-full h-full object-cover object-top" 
              />
              <div className="absolute inset-0 bg-white/40" />
            </div>

            {/* macOS Title Bar */}
            <div className="relative z-10 flex items-center px-5 py-3.5 border-b border-black/5 bg-white/80 backdrop-blur-xl">
              <div className="flex gap-2 shrink-0">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-[#FDBC40] shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-[#33C748] shadow-sm" />
              </div>
              <div className="flex items-center gap-1.5 ml-6 text-slate-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
              </div>
              <div className="flex-1 max-w-sm mx-auto h-7 rounded-md bg-black/[0.04] border border-black/[0.06] flex items-center justify-center gap-1.5">
                <svg className="w-2.5 h-2.5 text-slate-400" fill="currentColor" viewBox="0 0 16 16"><path d="M8 1a4 4 0 0 0-4 4v3a1 1 0 0 0-1 1v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a1 1 0 0 0-1-1V5a4 4 0 0 0-4-4zm3 7V5a3 3 0 1 0-6 0v3h6z"/></svg>
                <span className="text-[11px] text-slate-500 font-medium tracking-wide">nexsori.learn/dashboard</span>
              </div>
              <div className="shrink-0 ml-6">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3v9"/></svg>
              </div>
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="absolute left-0 top-[52px] bottom-0 z-30 w-14 md:w-16 bg-white/70 backdrop-blur-xl border-r border-black/5 flex flex-col items-center py-6 gap-5"
            >
              {[
                { icon: BookOpen, active: true, label: 'Learn' },
                { icon: Brain, active: false, label: 'AI Tutor' },
                { icon: Trophy, active: false, label: 'Ranks' },
                { icon: Target, active: false, label: 'Quests' },
                { icon: BarChart3, active: false, label: 'Analytics' },
              ].map(({ icon: Icon, active, label }, i) => (
                <div key={i} className="relative group/nav">
                  <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer", active ? "bg-primary text-white shadow-md shadow-primary/30 scale-105" : "text-slate-400 hover:bg-slate-100 hover:text-slate-600 hover:scale-110")}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 px-3.5 py-2 rounded-xl bg-white/80 backdrop-blur-2xl border border-white/60 text-slate-800 text-[11px] font-bold whitespace-nowrap opacity-0 scale-90 translate-x-1 group-hover/nav:opacity-100 group-hover/nav:scale-100 group-hover/nav:translate-x-0 transition-all duration-200 ease-out pointer-events-none shadow-xl shadow-black/10">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Center Content: Continue Learning Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute z-10 left-20 md:left-24 top-[72px] md:top-[80px] w-[55%] max-w-[420px] bg-white/90 backdrop-blur-2xl border border-black/[0.06] rounded-3xl p-6 shadow-xl shadow-black/5"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Continue Learning</p>
                    <p className="text-[10px] text-slate-400 font-medium">Mathematics — Grade 11</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase tracking-wider">Active</span>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Quadratic Formula', progress: 85, active: true },
                  { name: 'Complex Numbers', progress: 42, active: false },
                  { name: 'Polynomial Division', progress: 0, active: false },
                ].map((topic) => (
                  <div key={topic.name} className={cn("flex items-center gap-3 p-3 rounded-xl transition-all", topic.active ? "bg-primary/5 border border-primary/10" : "hover:bg-slate-50")}>
                    <div className={cn("w-2 h-2 rounded-full shrink-0", topic.active ? "bg-primary shadow-sm shadow-primary/50" : topic.progress > 0 ? "bg-slate-300" : "bg-slate-200")} />
                    <span className="text-xs font-semibold text-slate-700 flex-1">{topic.name}</span>
                    {topic.progress > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <motion.div 
                            className="h-full rounded-full bg-primary"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${topic.progress}%` }}
                            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 w-7 text-right">{topic.progress}%</span>
                      </div>
                    )}
                    {topic.active && <ChevronRight className="w-3.5 h-3.5 text-primary" />}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right side: Stats Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute z-10 right-6 md:right-10 top-[72px] md:top-[80px] w-[160px] md:w-[180px] flex flex-col gap-4"
            >
              {/* Streak */}
              <div className="bg-white/90 backdrop-blur-2xl border border-black/[0.06] rounded-2xl p-4 shadow-lg shadow-black/5">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-sm shadow-orange-500/30">
                    <Flame className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-slate-900 leading-none">12</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Day Streak</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1,1,1,1,1,1,1].map((_, i) => (
                    <div key={i} className={cn("flex-1 h-1.5 rounded-full", i < 5 ? "bg-orange-400" : "bg-slate-100")} />
                  ))}
                </div>
              </div>

              {/* Level */}
              <div className="bg-white/90 backdrop-blur-2xl border border-black/[0.06] rounded-2xl p-4 shadow-lg shadow-black/5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-sm shadow-yellow-500/30">
                    <Trophy className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-slate-900 leading-none">Lvl 8</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Gold III</p>
                  </div>
                </div>
              </div>

              {/* XP */}
              <div className="bg-white/90 backdrop-blur-2xl border border-black/[0.06] rounded-2xl p-4 shadow-lg shadow-black/5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider">XP</span>
                  </div>
                  <span className="text-[10px] font-bold text-primary">2,450</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <motion.div 
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
                    initial={{ width: 0 }}
                    whileInView={{ width: "72%" }}
                    transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Bottom: Quests + AI Tutor Chat */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute z-10 left-20 md:left-24 bottom-5 md:bottom-8 right-6 md:right-10 flex gap-4"
            >
              {/* Daily Quests */}
              <div className="flex-1 bg-white/90 backdrop-blur-2xl border border-black/[0.06] rounded-2xl p-4 shadow-lg shadow-black/5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                    <Target className="w-3 h-3 text-primary" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Daily Quests</p>
                  <span className="ml-auto text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">1/2</span>
                </div>
                <div className="space-y-2.5">
                  {[
                    { text: 'Complete 2 lessons', done: true },
                    { text: 'Practice 10 problems', done: false },
                  ].map(({ text, done }) => (
                    <div key={text} className="flex items-center gap-2.5 text-[11px] font-medium">
                      <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center shrink-0", done ? "border-emerald-400 bg-emerald-50 text-emerald-500" : "border-slate-200 bg-slate-50 text-transparent")}>
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className={done ? 'text-slate-400 line-through' : 'text-slate-700'}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Tutor Chat Bubble */}
              <div className="flex-1 bg-white/90 backdrop-blur-2xl border border-black/[0.06] rounded-2xl p-4 shadow-lg shadow-black/5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-sm">
                    <Brain className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">AI Tutor</p>
                  <div className="ml-auto flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-semibold text-emerald-600">Online</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-slate-50 border border-slate-100 rounded-xl rounded-tl-sm px-3 py-2 max-w-[85%]">
                    <p className="text-[10px] text-slate-600 leading-relaxed">Try factoring x² + 5x + 6. What two numbers multiply to 6 and add to 5?</p>
                  </div>
                  <div className="bg-primary/5 border border-primary/10 rounded-xl rounded-tr-sm px-3 py-2 ml-auto max-w-[75%]">
                    <p className="text-[10px] text-primary leading-relaxed font-medium">2 and 3! So (x+2)(x+3)?</p>
                  </div>
                </div>
              </div>
            </motion.div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Method */}
      <section className="landing-section bg-muted/25 border-y border-border overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-40 md:opacity-60 pointer-events-none -translate-y-1/4 translate-x-1/4">
           <LottieAnimation animationPath="/lottie/Thinking.json" className="w-[600px] h-[600px]" />
        </div>
        <div className="landing-container relative z-10">
          <SectionHeader
            label="The Nexsori method"
            title="Every step builds on the last"
            description="A deliberate learning loop — not passive video watching."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {methodSteps.map(({ step, icon: Icon, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="landing-card text-center py-8 bg-card/40 backdrop-blur-sm border-border/50 hover:bg-card/60 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-brand shadow-lg shadow-primary/20 flex items-center justify-center mx-auto mb-5 relative group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-bold text-lg mb-2 text-foreground">{step}</p>
                <p className="text-sm font-medium text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              Explore the full journey
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <FeaturesGrid />

      {/* Educators */}
      <section className="landing-section bg-muted/25 border-y border-border">
        <div className="landing-container grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-6 flex justify-start"><span className="section-label px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm shadow-primary/5">For educators</span></div>
            <h2 className="landing-headline mb-5 text-left">
              Teach with full visibility
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              See mastery, engagement, and at-risk students in one calm dashboard — so you intervene before gaps become failures.
            </p>
            <ul className="space-y-5 mb-10">
              {[
                { icon: BarChart3, text: 'Live analytics per topic and student' },
                { icon: Target, text: 'AI-flagged weak areas' },
                { icon: Award, text: 'Automated assignment grading' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-4 text-base font-medium">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  {text}
                </li>
              ))}
            </ul>
            <LandingCta href="/for-teachers" variant="secondary" showArrow={false} className="border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors">
              Explore educator tools
            </LandingCta>
          </div>
          <TeacherPreview />
        </div>
      </section>

      {/* Stats Capsule */}
      <StatsCapsule />

      {/* Pricing teaser */}
      <section className="landing-section bg-muted/25 border-t border-border relative overflow-hidden">
        <div className="absolute bottom-0 left-0 opacity-50 pointer-events-none translate-y-1/4 -translate-x-1/4">
          <LottieAnimation animationPath="/lottie/Rocket Launch.json" className="w-[500px] h-[500px]" />
        </div>
        <div className="landing-container relative z-10">
          <SectionHeader
            label="Pricing"
            title="Simple, honest plans"
            description="Start free. Upgrade when you're ready for unlimited depth."
          />
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { name: 'Free', price: '$0', features: ['3 subjects', 'Basic skill tree', 'Streak tracking'] },
              { name: 'Pro', price: '$12', features: ['Unlimited subjects', 'AI tutoring', 'Boss battles'], popular: true },
            ].map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'landing-card relative bg-card/60 backdrop-blur-xl border-border/60 hover:-translate-y-1',
                  plan.popular && 'ring-2 ring-primary shadow-xl shadow-primary/10 bg-card/80',
                )}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-6 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest shadow-md">
                    Popular
                  </span>
                )}
                <p className="font-bold text-xl mb-2 text-foreground">{plan.name}</p>
                <p className="text-5xl font-display font-black mb-6 text-foreground tracking-tight">
                  {plan.price}
                  <span className="text-lg font-semibold text-muted-foreground">/mo</span>
                </p>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-base font-medium text-muted-foreground">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <LandingCta
                  href="/sign-up"
                  variant={plan.popular ? 'primary' : 'secondary'}
                  className="w-full justify-center"
                  showArrow={plan.popular}
                >
                  Get started
                </LandingCta>
              </div>
            ))}
          </div>
          <p className="text-center mt-8">
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              View full pricing details →
            </Link>
          </p>
        </div>
      </section>
    </LandingShell>
  );
}

function FeaturesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="landing-section">
      <div className="landing-container">
        <SectionHeader
          label="Platform"
          title="Built for real mastery"
          description="Tools that reward understanding — not just time spent."
        />
        
        <div className="flex justify-center mb-16 relative z-10">
          <div className="landing-card relative bg-card/60 border-border/60 shadow-2xl overflow-hidden p-8 md:p-12 max-w-4xl w-full flex flex-col items-start gap-8 group hover:border-primary/40 transition-colors min-h-[400px] justify-center">
            {/* Background image covering entire card */}
            <div className="absolute inset-0 z-0">
              <img
                src="/landing/landing_cards.jpeg"
                alt="Background"
                className="w-full h-full object-cover"
              />
              {/* Darken the left side heavily so the text is readable, let the right side shine */}
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
            </div>

            <div className="relative z-10 max-w-lg space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-xl shadow-primary/20">
                <Brain className="w-7 h-7" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground drop-shadow-md">Intelligent AI Tutoring</h3>
              <p className="text-muted-foreground leading-relaxed font-medium text-lg drop-shadow-sm">
                Socratic guidance that builds understanding, not dependency. Get unblocked without getting the answer handed to you.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.slice(1).map((feature, i) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08, type: "spring", stiffness: 100, damping: 20 }}
              className="relative rounded-2xl bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5 group p-[1px] overflow-hidden h-full"
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
                
                <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-base font-medium text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="text-center mt-12">
          <LandingCta href="/features" variant="secondary" showArrow={false}>
            View all features
          </LandingCta>
        </div>
      </div>
    </section>
  );
}

function TeacherPreview() {
  const students = [
    { name: 'Emma L.', mastery: 88 },
    { name: 'James R.', mastery: 75 },
    { name: 'Marcus T.', mastery: 28, atRisk: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="rounded-3xl border border-border/50 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] shadow-primary/10 overflow-hidden w-full flex flex-col group hover:shadow-primary/20 transition-shadow duration-500 relative bg-card/40"
    >
      {/* Background Image (Same as Landing Page) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="/landing/learning_dashboard.jpeg" 
          alt="Product Dashboard Background" 
          className="w-full h-full object-cover object-top" 
        />
        <div className="absolute inset-0 bg-white/40 dark:bg-black/60" />
      </div>

      {/* macOS Title Bar */}
      <div className="relative z-10 flex items-center px-4 py-3.5 border-b border-border/30 bg-white/60 dark:bg-black/40 backdrop-blur-xl">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] shadow-sm" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FDBC40] shadow-sm" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#33C748] shadow-sm" />
        </div>
        <div className="flex-1 flex justify-center text-[10px] font-bold tracking-widest text-foreground/60 uppercase">
          nexsori.learn/teachers
        </div>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>
      
      {/* Content area */}
      <div className="relative z-10 p-6 md:p-8">
        <div className="flex items-center justify-between mb-8 bg-background/80 dark:bg-background/70 backdrop-blur-md px-5 py-3 rounded-2xl border border-border/40 shadow-sm">
          <p className="font-bold text-lg">Advanced Math — Grade 11</p>
          <span className="text-xs px-2.5 py-1 rounded-full bg-success/15 text-success border border-success/30 font-bold uppercase tracking-wider">
            22 active
          </span>
        </div>
        <div className="space-y-3">
          {students.map((s, index) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              key={s.name}
              className={cn(
                'flex items-center gap-4 p-4 rounded-2xl border transition-colors duration-300 backdrop-blur-xl shadow-lg',
                s.atRisk ? 'border-destructive/30 bg-white/90 dark:bg-black/80 hover:border-destructive/50' : 'border-border/40 bg-white/80 dark:bg-black/70 hover:bg-white/95 dark:hover:bg-black/90 hover:border-primary/30',
              )}
            >
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-sm", s.atRisk ? "bg-destructive/15 text-destructive" : "bg-muted/50 border border-border/50 text-foreground")}>
                {s.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-2">
                  <p className="text-sm font-semibold">{s.name}</p>
                  <span className={cn("text-xs font-bold", s.atRisk ? "text-destructive" : "text-muted-foreground")}>{s.mastery}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.mastery}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 1, ease: "easeOut" }}
                    className={cn('h-full rounded-full', s.atRisk ? 'bg-destructive' : 'bg-primary')}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function StatsCapsule() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 });

  const scale = useTransform(smoothProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(smoothProgress, [0, 1], [0.2, 1]);
  const rotateX = useTransform(smoothProgress, [0, 1], [15, 0]);

  return (
    <section className="landing-section py-20 relative z-20">
      <div className="landing-container perspective-[2000px] px-4 md:px-6" ref={ref}>
        <motion.div
          style={{ scale, opacity, rotateX }}
          className="relative rounded-[3rem] border border-border/50 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] shadow-primary/10 overflow-hidden w-full transform-gpu min-h-[300px] flex items-center justify-center"
        >
          {/* Background image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src="/landing/rating.jpeg" 
              alt="Ratings Background" 
              className="w-full h-full object-cover" 
            />
            {/* Very light tint just to help white text contrast, avoiding the cloudy look */}
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="relative z-10 w-full max-w-6xl mx-auto py-12 md:py-24 px-6 md:px-12 flex justify-center items-center min-h-[400px]">
            <div className="w-full bg-white/70 backdrop-blur-3xl border border-white/60 rounded-[2.5rem] p-10 md:p-16 shadow-2xl shadow-black/10 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 divide-x-0 md:divide-x divide-slate-900/10">
              {[
                { to: 10, suffix: 'K+', label: 'Active learners', decimals: 0 },
                { to: 3, suffix: '×', label: 'Faster mastery', decimals: 0 },
                { to: 95, suffix: '%', label: 'Retention rate', decimals: 0 },
                { to: 4.9, suffix: '', label: 'Average rating', decimals: 1 },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, type: 'spring' }}
                  className="text-center px-2 md:px-6 flex flex-col justify-center"
                >
                  <p className="text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter mb-4 text-slate-900 drop-shadow-sm">
                    <AnimatedCounter to={stat.to} suffix={stat.suffix} decimals={stat.decimals} />
                  </p>
                  <p className="text-sm md:text-base font-bold text-slate-600 uppercase tracking-[0.25em]">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AnimatedCounter({ from = 0, to, suffix = "", decimals = 0 }: { from?: number, to: number, suffix?: string, decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = value.toFixed(decimals) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [inView, from, to, suffix, decimals]);

  return <span ref={ref}>{from.toFixed(decimals)}{suffix}</span>;
}
