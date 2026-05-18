import Link from 'next/link';
import { Zap } from 'lucide-react';
import { LandingCta } from '@/components/landing/landing-cta';

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'How it works', href: '/how-it-works' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'For teachers', href: '/for-teachers' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Sign up', href: '/sign-up' },
      { label: 'Sign in', href: '/sign-in' },
      { label: 'Student dashboard', href: '/student/dashboard' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="landing-section py-16 md:py-20">
        <div className="landing-container">
          <div className="rounded-2xl border border-border bg-card p-8 md:p-12 mb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-semibold tracking-tight mb-2">
                Ready to start learning?
              </h3>
              <p className="text-muted-foreground max-w-md">
                Join thousands of students mastering subjects with clarity and structure.
              </p>
            </div>
            <LandingCta href="/sign-up" className="shrink-0 w-full md:w-auto justify-center">
              Create free account
            </LandingCta>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            <div className="md:col-span-4">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-display font-semibold">Nexus Learning</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                A mastery-based learning platform built for students and educators who care about real understanding.
              </p>
            </div>
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
              {columns.map(({ title, links }) => (
                <div key={title}>
                  <p className="text-sm font-medium mb-4">{title}</p>
                  <ul className="space-y-3">
                    {links.map(({ label, href }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Nexus Learning. All rights reserved.</p>
            <p className="text-xs">Built for mastery, not memorization.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
