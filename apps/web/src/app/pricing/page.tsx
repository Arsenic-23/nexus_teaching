'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { LandingShell } from '@/components/landing/landing-shell';
import { PageHero } from '@/components/landing/page-hero';
import { SectionHeader } from '@/components/landing/section-header';
import { Check, ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { use3DTilt } from '@/hooks/use-3d-tilt';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Everything you need to begin your mastery journey.',
    features: ['3 active subjects', '50 AI messages / month', 'Basic skill tree', 'Streak & XP tracking'],
    cta: 'Get started free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'per month',
    description: 'For learners committed to depth and consistency.',
    features: ['Unlimited subjects', 'Unlimited AI tutoring', 'Boss battles', 'Advanced analytics', 'Priority support'],
    cta: 'Start free trial',
    popular: true,
  },
  {
    name: 'Teacher',
    price: '$29',
    period: 'per month',
    description: 'Full classroom visibility and assignment tools.',
    features: ['Up to 5 classrooms', 'Student analytics', 'Assignment builder', 'At-risk alerts', 'Bulk enrollment'],
    cta: 'Start teaching',
    popular: false,
  },
];

const faqs = [
  {
    question: 'Can I switch from Free to Pro later?',
    answer: 'Yes. Upgrade anytime without losing progress, XP, or streaks.',
  },
  {
    question: 'How does the AI tutor work?',
    answer: 'It uses the Socratic method — guiding you with questions rather than handing over answers.',
  },
  {
    question: 'What is included in the Teacher plan?',
    answer: 'Dashboards for up to 5 classrooms, real-time mastery analytics, and automated grading.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes. Cancel from settings; premium access continues until the end of your billing period.',
  },
];

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div 
      initial={false}
      className={cn(
        "faq-item rounded-2xl border transition-all duration-300 overflow-hidden mb-4 opacity-0",
        open ? "border-primary/30 bg-primary/[0.02] shadow-lg shadow-primary/5" : "border-border bg-card hover:border-primary/20 hover:shadow-md"
      )}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left group"
      >
        <span className={cn(
          "font-semibold pr-4 transition-colors duration-300",
          open ? "text-primary" : "text-foreground group-hover:text-primary"
        )}>
          {question}
        </span>
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
          open ? "bg-primary text-primary-foreground rotate-180" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
        )}>
          <ChevronDown className="w-4 h-4 transition-transform" />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="px-5 md:px-6 pb-6 pt-2 text-muted-foreground leading-relaxed border-t border-border/50">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PricingCard({ plan }: { plan: typeof plans[0] }) {
  const { cardRef, glareRef } = use3DTilt({
    maxRotationX: 0,
    maxRotationY: 0,
    scale: 1.02,
    glareOpacity: 0.1,
  });

  return (
    <div 
      ref={cardRef}
      className={cn(
        "pricing-card-wrapper opacity-0",
        plan.popular && "md:-mt-4 md:mb-4"
      )}
      style={{ perspective: 1000 }}
    >
      <div 
        className={cn(
          'relative rounded-3xl border border-border bg-card p-[1px] transition-all duration-500 flex flex-col group overflow-hidden h-full',
          plan.popular && 'shadow-xl shadow-primary/10'
        )}
      >
        {/* Rolling Border for Popular Plan */}
        {plan.popular && (
          <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] opacity-30 pointer-events-none" 
               style={{ backgroundImage: 'conic-gradient(from 90deg at 50% 50%, transparent 70%, hsl(var(--primary)))' }} />
        )}
        
        {/* Dynamic 3D Glare */}
        <div 
          ref={glareRef}
          className="absolute w-[200%] h-[200%] pointer-events-none z-50 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_50%)] mix-blend-overlay"
        />

        <div className="relative z-10 flex flex-col h-full bg-card rounded-[23px] overflow-hidden">
          {/* Glassmorphic image layer for popular plan */}
          {plan.popular && (
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
          )}

          <div className="relative z-10 p-10 flex flex-col h-full">
            {plan.popular && (
              <span className="inline-block w-fit mb-6 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest shadow-sm">
                Most popular
              </span>
            )}
            <p className="text-xl font-bold mb-2">{plan.name}</p>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-5xl font-display font-bold tracking-tight">{plan.price}</span>
              <span className="text-muted-foreground text-sm font-medium">/{plan.period}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">{plan.description}</p>
            
            <div className="h-[1px] w-full bg-border mb-8" />

            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/sign-up"
              className={cn(
                'block w-full text-center py-3.5 rounded-xl text-sm font-bold transition-all duration-300',
                plan.popular
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5'
                  : 'bg-muted text-foreground hover:bg-foreground hover:text-background'
              )}
            >
              {plan.cta}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Entrance
    gsap.fromTo(
      ".hero-element",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out" }
    );

    // Cards Staggered Entrance
    gsap.fromTo(
      ".pricing-card-wrapper",
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pricing-grid",
          start: "top 85%",
        }
      }
    );

    // FAQ Section Reveal
    gsap.fromTo(
      ".faq-header",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faq-section",
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(
      ".faq-item",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faq-list",
          start: "top 85%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <LandingShell>
      <div ref={containerRef}>
        <div className="hero-element opacity-0">
          <PageHero
            badge={<span className="landing-badge">Pricing</span>}
            title={
              <>
                Transparent plans.
                <br />
                <span className="text-muted-foreground">No surprises.</span>
              </>
            }
            description="Start free and upgrade when you need more depth. Every plan is designed around real learning outcomes."
          />
        </div>

        <section className="landing-section pt-0">
          <div className="landing-container">
            <div className="pricing-grid grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <PricingCard key={plan.name} plan={plan} />
              ))}
            </div>
          </div>
        </section>

        <section className="faq-section landing-section bg-muted/25 border-t border-border relative overflow-hidden">
          {/* Subtle dot grid */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }} />
          
          <div className="landing-container max-w-3xl relative z-10">
            <div className="faq-header opacity-0">
              <SectionHeader
                label="FAQ"
                title="Common questions"
                description="Everything you need to know about billing and plans."
              />
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border/50 justify-center">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-inner">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <p className="text-sm text-muted-foreground font-medium">Can&apos;t find an answer? <Link href="#" className="text-primary hover:underline">Contact support</Link></p>
              </div>
            </div>
            
            <div className="faq-list space-y-2">
              {faqs.map((faq, i) => (
                <FaqItem key={faq.question} question={faq.question} answer={faq.answer} index={i} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </LandingShell>
  );
}
