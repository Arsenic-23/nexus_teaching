'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
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
  return (
    <LandingShell>
      <PageHero
        badge={
          <span className="landing-badge">
            <Star className="w-3.5 h-3.5" />
            Mastery-based learning platform
          </span>
        }
        title={
          <>
            Learn with clarity.
            <br />
            <span className="text-muted-foreground">Master with confidence.</span>
          </>
        }
        description="Structured lessons, intelligent tutoring, and meaningful progress — designed for students who want to truly understand."
      >
        <LandingCta href="/sign-up">Start free</LandingCta>
        <LandingCta href="/how-it-works" variant="secondary" showArrow={false}>
          See how it works
        </LandingCta>
      </PageHero>

      {/* Trust bar */}
      <section className="pb-20 px-6">
        <div className="landing-container">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-muted-foreground">
            {[
              { icon: Users, text: '10,000+ students' },
              { icon: GraduationCap, text: '500+ classrooms' },
              { icon: TrendingUp, text: '3× faster mastery' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-primary" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product preview */}
      <section className="landing-section pt-0">
        <div className="landing-container">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="landing-card overflow-hidden p-0"
          >
            <div className="flex items-center gap-3 px-5 py-3 border-b border-border bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
              </div>
              <div className="flex-1 max-w-sm mx-auto h-7 rounded-md bg-muted flex items-center justify-center">
                <span className="text-[11px] text-muted-foreground font-mono">nexus.learn/dashboard</span>
              </div>
            </div>
            <div className="p-6 md:p-8 grid md:grid-cols-3 gap-4">
              {[
                { label: 'Level 8', sub: 'Gold III' },
                { label: '2,450 XP', sub: 'This week' },
                { label: '12 days', sub: 'Streak' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-muted/20 p-5 text-center">
                  <p className="text-xl font-semibold">{stat.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
                </div>
              ))}
            </div>
            <div className="px-6 md:px-8 pb-8 grid md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border p-5 space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Continue learning</p>
                {['Quadratic Formula', 'Complex Numbers'].map((t, i) => (
                  <div key={t} className="flex items-center gap-2 text-sm">
                    <div className={cn('w-1.5 h-1.5 rounded-full', i === 0 ? 'bg-primary' : 'bg-border')} />
                    {t}
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-border p-5 space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Daily quests</p>
                {[
                  { text: 'Complete 2 lessons', done: true },
                  { text: 'Practice 10 problems', done: false },
                ].map(({ text, done }) => (
                  <div key={text} className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 rounded-full border border-border flex items-center justify-center">
                      {done && <Check className="w-2.5 h-2.5 text-success" />}
                    </div>
                    <span className={done ? 'text-muted-foreground line-through' : ''}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Method */}
      <section className="landing-section bg-muted/25 border-y border-border">
        <div className="landing-container">
          <SectionHeader
            label="The Nexus method"
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
                className="landing-card text-center py-8"
              >
                <div className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-foreground" />
                </div>
                <p className="font-semibold mb-1">{step}</p>
                <p className="text-sm text-muted-foreground">{desc}</p>
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
            <p className="section-label mb-4">For educators</p>
            <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-5">
              Teach with full visibility
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              See mastery, engagement, and at-risk students in one calm dashboard — so you intervene before gaps become failures.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                { icon: BarChart3, text: 'Live analytics per topic and student' },
                { icon: Target, text: 'AI-flagged weak areas' },
                { icon: Award, text: 'Automated assignment grading' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm">
                  <div className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  {text}
                </li>
              ))}
            </ul>
            <LandingCta href="/for-teachers" variant="secondary" showArrow={false}>
              Explore educator tools
            </LandingCta>
          </div>
          <TeacherPreview />
        </div>
      </section>

      {/* Stats */}
      <section className="landing-section">
        <div className="landing-container grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="text-center py-6"
            >
              <p className="text-4xl md:text-5xl font-display font-semibold tracking-tight mb-2">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="landing-section bg-muted/25 border-t border-border">
        <div className="landing-container">
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
                  'landing-card relative',
                  plan.popular && 'ring-1 ring-primary/30',
                )}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    Popular
                  </span>
                )}
                <p className="font-semibold text-lg mb-1">{plan.name}</p>
                <p className="text-4xl font-display font-semibold mb-6">
                  {plan.price}
                  <span className="text-base font-normal text-muted-foreground">/mo</span>
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary shrink-0" />
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="landing-card group"
            >
              <div className="w-11 h-11 rounded-xl bg-muted border border-border flex items-center justify-center mb-5">
                <feature.icon className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
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
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="landing-card"
    >
      <div className="flex items-center justify-between mb-6">
        <p className="font-medium">Advanced Math — Grade 11</p>
        <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">22 active</span>
      </div>
      <div className="space-y-3">
        {students.map((s) => (
          <div key={s.name} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/20">
            <div className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-xs font-medium">
              {s.name.split(' ')[0][0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-sm font-medium truncate">{s.name}</p>
                <span className="text-xs text-muted-foreground">{s.mastery}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className={cn('h-full rounded-full', s.atRisk ? 'bg-muted-foreground' : 'bg-primary')}
                  style={{ width: `${s.mastery}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
