'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { LandingNavbar } from '@/components/layout/landing-navbar';
import { LandingFooter } from '@/components/layout/landing-footer';
import { Check, ChevronDown, HelpCircle } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Start your mastery journey',
    features: ['3 active subjects', '50 AI tutor messages/month', 'Basic skill tree', 'Streak & XP tracking'],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'per month',
    description: 'For serious learners',
    features: ['Unlimited subjects', 'Unlimited AI tutoring', 'Boss battles', 'Advanced analytics', 'Priority support'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Teacher',
    price: '$29',
    period: 'per month',
    description: 'Manage your classrooms',
    features: ['Up to 5 classrooms', 'Student analytics', 'Assignment creation', 'At-risk student alerts', 'Bulk enrollment'],
    cta: 'Start Teaching',
    popular: false,
  },
];

const faqs = [
  {
    question: 'Can I switch from Free to Pro later?',
    answer: 'Absolutely. You can start on the Free plan to see how Nexus works and upgrade to Pro at any time without losing any of your progress, XP, or streaks.'
  },
  {
    question: 'How does the AI Tutor work?',
    answer: 'The AI Tutor uses advanced models fine-tuned on the Socratic method. Instead of just giving you the answer, it asks guiding questions to help you figure out the solution yourself, ensuring true mastery.'
  },
  {
    question: 'What is included in the Teacher plan?',
    answer: 'The Teacher plan gives you a comprehensive dashboard to monitor up to 5 classrooms. You can see real-time analytics on student mastery, get alerts for at-risk students, and automatically grade assignments.'
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'Yes, you can cancel your subscription at any time from your account settings. You will continue to have access to your premium features until the end of your current billing cycle.'
  }
];

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-border/20 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between py-6 text-left hover:text-foreground transition-colors group"
      >
        <span className="text-lg font-bold text-foreground/80 group-hover:text-foreground">{question}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-muted-foreground text-base leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


export default function PricingPage() {
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

      <main className="relative py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-6">
              Simple, transparent <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Invest in your education with our straightforward plans. Start for free, upgrade when you need to unlock more power.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative p-8 rounded-3xl border backdrop-blur-xl transition-all duration-500 flex flex-col group ${
                plan.popular 
                  ? 'border-white/10 bg-gradient-to-b from-white/5 to-transparent shadow-2xl shadow-white/5 scale-100 md:scale-105 z-10 hover:shadow-white/10 hover:-translate-y-1' 
                  : 'border-white/5 bg-black/40 hover:bg-black/60 shadow-2xl hover:shadow-white/5 hover:-translate-y-1'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full bg-white text-black text-sm font-bold shadow-lg shadow-white/20">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-8">
                <p className="font-bold text-xl mb-2">{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-display font-black">{plan.price}</span>
                  <span className="text-muted-foreground text-base">/{plan.period}</span>
                </div>
                <p className="text-base text-muted-foreground">{plan.description}</p>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-base">
                    <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-success" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/sign-up"
                className={`block w-full text-center py-4 rounded-xl font-bold text-base transition-all duration-300 ${
                  plan.popular
                    ? 'bg-white text-black hover:bg-gray-200 shadow-xl shadow-white/10 hover:-translate-y-1'
                    : 'border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 group-hover:shadow-lg text-white'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-40 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 mb-6 shadow-inner"
            >
              <HelpCircle className="w-6 h-6 text-foreground/80" />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-display font-bold mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Everything you need to know about the product and billing.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-xl p-4 md:p-8 shadow-2xl"
          >
            {faqs.map((faq, i) => (
              <FaqItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </motion.div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
