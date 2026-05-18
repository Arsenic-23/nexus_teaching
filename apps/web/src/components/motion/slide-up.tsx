'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';

interface SlideUpProps extends HTMLMotionProps<'div'> {
  delay?: number;
  duration?: number;
  distance?: number;
}

export function SlideUp({
  children,
  delay = 0,
  duration = 0.35,
  distance = 16,
  ...props
}: SlideUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: distance }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
