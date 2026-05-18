'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  badge?: React.ReactNode;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  align?: 'center' | 'left';
  className?: string;
}

export function PageHero({
  badge,
  title,
  description,
  children,
  align = 'center',
  className,
}: PageHeroProps) {
  return (
    <section className={cn('landing-section pb-16 md:pb-20', className)}>
      <div
        className={cn(
          'landing-container',
          align === 'center' && 'text-center',
        )}
      >
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn('mb-8', align === 'center' && 'flex justify-center')}
          >
            {badge}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className={cn(
            'landing-headline mb-6',
            align === 'center' && 'mx-auto max-w-4xl',
          )}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={cn(
              'landing-subhead mb-10',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={cn(
              'flex flex-col sm:flex-row gap-4',
              align === 'center' && 'justify-center items-center',
            )}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
