'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={cn(
        'mb-16 md:mb-20',
        align === 'center' && 'text-center mx-auto',
        align === 'left' && 'text-left',
        className,
      )}
    >
      {label && <p className="section-label mb-4">{label}</p>}
      <h2 className="landing-headline mb-5 max-w-3xl mx-auto">{title}</h2>
      {description && (
        <p
          className={cn(
            'landing-subhead',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
