'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    // Initialize state on mount
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Features', 'How It Works', 'Pricing', 'For Teachers'];

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "border-b border-border/40 bg-background/80 backdrop-blur-xl shadow-sm" 
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-xp flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-all">
            <Zap className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">Nexus</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const href = `/${item.toLowerCase().replace(/ /g, '-')}`;
            const isActive = pathname === href;
            
            return (
              <Link
                key={item}
                href={href}
                className={cn(
                  "text-sm transition-colors",
                  isActive 
                    ? "text-foreground font-semibold" 
                    : "text-muted-foreground hover:text-foreground font-medium"
                )}
              >
                {item}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/sign-in" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5">
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <button className="md:hidden p-1 rounded-md hover:bg-foreground/5 transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background px-6 py-4 space-y-3 overflow-hidden"
          >
            {navItems.map((item) => {
              const href = `/${item.toLowerCase().replace(/ /g, '-')}`;
              const isActive = pathname === href;
              return (
                <Link 
                  key={item} 
                  href={href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block py-2 text-sm transition-colors",
                    isActive 
                      ? "text-primary font-bold" 
                      : "text-muted-foreground hover:text-foreground font-medium"
                  )}
                >
                  {item}
                </Link>
              );
            })}
            <div className="flex gap-3 pt-4 pb-2">
              <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-card transition-colors">Sign In</Link>
              <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">Get Started</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
