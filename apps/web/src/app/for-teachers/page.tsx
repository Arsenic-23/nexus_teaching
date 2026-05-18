'use client';

import { motion } from 'framer-motion';
import { LandingShell } from '@/components/landing/landing-shell';
import { SectionHeader } from '@/components/landing/section-header';
import { LandingCta } from '@/components/landing/landing-cta';
import { Users, BarChart3, Target, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const tools = [
  {
    icon: Award,
    title: 'Automated grading',
    desc: 'Assignments graded instantly — multiple choice, numeric, and structured responses.',
  },
  {
    icon: Target,
    title: 'Early intervention',
    desc: 'AI flags knowledge gaps before they become failures, with specific topic recommendations.',
  },
  {
    icon: BarChart3,
    title: 'Curriculum control',
    desc: 'Custom skill trees, pacing, and assignments aligned to your classroom goals.',
  },
];

const students = [
  { name: 'Emma L.', mastery: 88 },
  { name: 'James R.', mastery: 75 },
  { name: 'Sofia M.', mastery: 68 },
  { name: 'Marcus T.', mastery: 28, atRisk: true },
];

export default function ForTeachersPage() {
  return (
    <LandingShell>
      <section className="landing-section">
        <div className="landing-container grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="landing-badge mb-8 inline-flex">For educators</span>
            <h1 className="landing-headline mb-6">
              Teach with clarity.
              <br />
              <span className="text-muted-foreground">Lead with data.</span>
            </h1>
            <p className="landing-subhead mb-10">
              A calm dashboard for mastery, engagement, and intervention — so you spend time teaching, not guessing.
            </p>
            <LandingCta href="/sign-up">Start teaching free</LandingCta>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="landing-card"
          >
            <div className="flex items-center justify-between mb-6">
              <p className="font-medium">Advanced Math — Grade 11</p>
              <span className="text-xs px-2.5 py-1 rounded-full bg-success/10 text-success border border-success/20 font-medium">
                22 active
              </span>
            </div>
            <div className="space-y-3">
              {students.map((s) => (
                <div
                  key={s.name}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-xl border',
                    s.atRisk ? 'border-border bg-muted/40' : 'border-border/60 bg-muted/20',
                  )}
                >
                  <div className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-xs font-semibold">
                    {s.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1.5">
                      <p className="text-sm font-medium">{s.name}</p>
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
        </div>
      </section>

      <section className="landing-section bg-muted/25 border-y border-border">
        <div className="landing-container">
          <SectionHeader
            label="Educator tools"
            title="Everything your classroom needs"
            description="Purpose-built for teachers who care about outcomes, not just completion rates."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="landing-card"
              >
                <div className="w-11 h-11 rounded-xl bg-muted border border-border flex items-center justify-center mb-5">
                  <tool.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{tool.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="landing-container max-w-3xl">
          <blockquote className="landing-card text-center py-12 md:py-16">
            <p className="text-xl md:text-2xl font-display leading-relaxed mb-8 text-foreground/90">
              &ldquo;I finally know exactly who needs help and what they don&apos;t understand — before the test, not after.&rdquo;
            </p>
            <footer>
              <p className="font-semibold">Sarah Jenkins</p>
              <p className="text-sm text-muted-foreground mt-1">High school mathematics teacher</p>
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="landing-section pt-0 pb-24">
        <div className="landing-container text-center">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground mb-10">
            {[
              { icon: Users, text: 'Classroom management' },
              { icon: BarChart3, text: 'Live analytics' },
              { icon: Target, text: 'Weak-area detection' },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {text}
              </li>
            ))}
          </ul>
          <LandingCta href="/sign-up">Create educator account</LandingCta>
        </div>
      </section>
    </LandingShell>
  );
}
