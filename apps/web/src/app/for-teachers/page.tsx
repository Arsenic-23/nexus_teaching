'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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
  const quoteRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: quoteRef,
    offset: ["start end", "center center"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 });

  const scale = useTransform(smoothProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(smoothProgress, [0, 1], [0.2, 1]);
  const rotateX = useTransform(smoothProgress, [0, 1], [15, 0]);

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
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
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
                nexus.learn/teachers
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
                    animate={{ opacity: 1, x: 0 }}
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
                          animate={{ width: `${s.mastery}%` }}
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
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 100, damping: 20 }}
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
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{tool.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="landing-container max-w-3xl perspective-[2000px]" ref={quoteRef}>
          <motion.blockquote 
            style={{ scale, opacity, rotateX }}
            className="relative rounded-3xl border border-border p-[1px] overflow-hidden group shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] shadow-primary/10 transform-gpu"
          >
            {/* Background image layer */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div 
                className="absolute inset-0 opacity-100 transition-transform duration-1000 group-hover:scale-105"
                style={{
                  backgroundImage: "url('/assets/teachers_card.jpeg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              {/* Very subtle overlay just to ensure text isn't completely lost, but image remains perfectly clear */}
              <div className="absolute inset-0 bg-primary/5 dark:bg-black/20 transition-colors duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent dark:from-background/60 dark:to-transparent" />
            </div>

            {/* Frosted glass text container - keeps text readable while letting image shine through */}
            <div className="relative z-10 flex flex-col items-center text-center py-12 md:py-16 px-8 md:px-12 bg-background/60 dark:bg-background/40 backdrop-blur-md rounded-[23px] m-4 md:m-6 border border-white/20 dark:border-white/10 shadow-2xl">
              <p className="text-xl md:text-3xl font-display leading-relaxed mb-8 text-foreground/90 font-medium drop-shadow-sm">
                &ldquo;I finally know exactly who needs help and what they don&apos;t understand — before the test, not after.&rdquo;
              </p>
              <footer>
                <p className="font-bold text-lg drop-shadow-sm">Sarah Jenkins</p>
                <p className="text-sm font-medium text-muted-foreground mt-1">High school mathematics teacher</p>
              </footer>
            </div>
          </motion.blockquote>
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
