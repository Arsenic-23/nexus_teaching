import Link from 'next/link';
import { Orbit } from 'lucide-react';
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
          <div className="relative rounded-3xl border border-border/50 bg-card/60 overflow-hidden p-8 md:p-12 mb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8 group shadow-2xl">
            {/* Background image covering entire card */}
            <div className="absolute inset-0 z-0">
              <img
                src="/landing/landing_cards.jpeg"
                alt="Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-3 drop-shadow-md text-foreground">
                Ready to start learning?
              </h3>
              <p className="text-muted-foreground text-lg max-w-md drop-shadow-sm font-medium">
                Join thousands of students mastering subjects with clarity and structure.
              </p>
            </div>
            <div className="relative z-10 shrink-0 w-full md:w-auto">
              <LandingCta href="/sign-up" className="w-full md:w-auto justify-center shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                Create free account
              </LandingCta>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            <div className="md:col-span-4">
              <Link href="/" className="flex items-center gap-2 mb-4 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center group-hover:scale-105 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-primary/20">
                  <Orbit className="w-4 h-4 text-primary-foreground group-hover:animate-spin-slow" />
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
