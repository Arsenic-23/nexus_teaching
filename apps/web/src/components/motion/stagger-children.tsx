'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';

interface StaggerChildrenProps extends HTMLMotionProps<'div'> {
  staggerDelay?: number;
  initialDelay?: number;
}

const containerVariants = (staggerDelay: number, initialDelay: number) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export function StaggerChildren({
  children,
  staggerDelay = 0.07,
  initialDelay = 0,
  ...props
}: StaggerChildrenProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants(staggerDelay, initialDelay)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...props }: HTMLMotionProps<'div'>) {
  return (
    <motion.div variants={staggerItemVariants} {...props}>
      {children}
    </motion.div>
  );
}
