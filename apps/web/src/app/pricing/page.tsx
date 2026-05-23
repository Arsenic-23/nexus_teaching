'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { LandingShell } from '@/components/landing/landing-shell';
import { PageHero } from '@/components/landing/page-hero';
import { SectionHeader } from '@/components/landing/section-header';
import { Check, ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

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

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-medium pr-4 group-hover:text-foreground transition-colors">{question}</span>
        <ChevronDown className={cn('w-5 h-5 text-muted-foreground shrink-0 transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-muted-foreground leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PricingPage() {
  return (
    <LandingShell>
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

      <section className="landing-section pt-0">
        <div className="landing-container">
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  'landing-card flex flex-col',
                  plan.popular && 'ring-1 ring-primary/40 md:-mt-2 md:mb-2',
                )}
              >
                {plan.popular && (
                  <span className="inline-block w-fit mb-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    Most popular
                  </span>
                )}
                <p className="text-lg font-semibold mb-1">{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-display font-semibold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">/{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/sign-up"
                  className={cn(
                    'block w-full text-center py-3 rounded-xl text-sm font-medium transition-colors',
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border border-border hover:bg-muted',
                  )}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section bg-muted/25 border-t border-border">
        <div className="landing-container max-w-2xl">
          <SectionHeader
            label="FAQ"
            title="Common questions"
            description="Everything you need to know about billing and plans."
          />
          <div className="landing-card p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Can&apos;t find an answer? Contact support from your dashboard.</p>
            </div>
            {faqs.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>
    </LandingShell>
  );
}
