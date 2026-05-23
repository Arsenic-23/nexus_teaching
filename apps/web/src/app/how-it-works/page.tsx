'use client';

import { motion } from 'framer-motion';
import { LandingShell } from '@/components/landing/landing-shell';
import { PageHero } from '@/components/landing/page-hero';
import { LandingCta } from '@/components/landing/landing-cta';
import { BookOpen, Sword, Brain, Target, Trophy, Zap } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP);
}

const steps = [
  {
    step: 'Learn',
    icon: BookOpen,
    desc: 'Interactive lessons break complex ideas into clear, digestible steps with immediate checks for understanding.',
  },
  {
    step: 'Practice',
    icon: Sword,
    desc: 'Apply what you learned with real problems. Instant feedback shows where reasoning breaks down.',
  },
  {
    step: 'Explain',
    icon: Brain,
    desc: 'The AI tutor asks guiding questions — helping you articulate thinking, not copy answers.',
  },
  {
    step: 'Apply',
    icon: Target,
    desc: 'Quizzes and challenges combine concepts the way exams and real problems do.',
  },
  {
    step: 'Master',
    icon: Trophy,
    desc: 'Demonstrate consistent performance to unlock the next branch of your skill tree.',
  },
  {
    step: 'Rank Up',
    icon: Zap,
    desc: 'Earn XP and maintain streaks as a natural byproduct of genuine progress.',
  },
];

export default function HowItWorksPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  // Use ResizeObserver for rock-solid responsive path recalculation
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setDimensions({ w: entries[0].contentRect.width, h: entries[0].contentRect.height });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      // Don't run until we have valid dimensions
      if (dimensions.w === 0) return;

      const q = gsap.utils.selector(containerRef);
      const box = q('.traveler-card')[0];
      const markers = q('.step-container .desktop-marker');
      
      if (!box || !markers.length) return;

      // Clear any previous inline styles applied by GSAP before measuring
      gsap.set(box, { clearProps: 'all' });
      gsap.set(q('.traveler-icon'), { clearProps: 'all' });

      const boxBaseRect = box.getBoundingClientRect();

      // Calculate path perfectly tracking to the center of each static marker
      const pathPoints = markers.map((marker: Element) => {
        const r = marker.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - (boxBaseRect.left + boxBaseRect.width / 2),
          y: r.top + r.height / 2 - (boxBaseRect.top + boxBaseRect.height / 2),
        };
      });

      // Jump box to the start position immediately
      gsap.set(box, { x: pathPoints[0].x, y: pathPoints[0].y });
      const pointsToAnimate = pathPoints.slice(1);

      // Create a master timeline synced exactly from the center of the first step to the center of the last
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: q('.step-container.initial')[0],
          start: 'center center',
          endTrigger: q('.step-container.final')[0],
          end: 'center center',
          scrub: 0.5, // 0.5s smoothing creates an incredibly premium, fluid trailing effect
        },
      });

      // Animate the path
      tl.to(box, {
        duration: 1,
        ease: 'none',
        motionPath: {
          path: pointsToAnimate,
          curviness: 0.8, // Slightly tighter curve for the zig-zag
        },
      }, 0);

      // Morph the icons strictly via the timeline (0 React re-renders)
      const numSteps = steps.length;
      const segmentDuration = 1 / (numSteps - 1);
      
      const icons = q('.traveler-icon');
      gsap.set(icons, { opacity: 0, rotateY: -90, scale: 0.5 });
      gsap.set(icons[0], { opacity: 1, rotateY: 0, scale: 1 });

      for (let i = 0; i < numSteps - 1; i++) {
         const timeAtDestination = (i + 1) * segmentDuration;
         const flipDuration = segmentDuration * 0.4; // Flip happens quickly over 40% of the segment
         const flipStart = timeAtDestination - flipDuration / 2;
         
         // Animate out current icon
         tl.to(icons[i], {
            opacity: 0,
            rotateY: 90,
            scale: 0.5,
            duration: flipDuration / 2,
            ease: "power2.in"
         }, flipStart);

         // Animate in next icon
         tl.to(icons[i+1], {
            opacity: 1,
            rotateY: 0,
            scale: 1,
            duration: flipDuration / 2,
            ease: "power2.out"
         }, flipStart + flipDuration / 2);
      }
    },
    { scope: containerRef, dependencies: [dimensions] }
  );

  return (
    <LandingShell>
      <PageHero
        badge={<span className="landing-badge">How it works</span>}
        title={
          <>
            A system designed
            <br />
            <span className="text-muted-foreground">for lasting understanding.</span>
          </>
        }
        description="Six deliberate stages. Each one prepares you for the next — so knowledge compounds instead of fading."
      />

      <section className="landing-section pt-0 pb-32 overflow-hidden">
        <div className="landing-container max-w-5xl" ref={containerRef}>
          <div className="relative">
            {/* The Morphing Traveler Card */}
            <div className="traveler-card absolute left-0 top-0 w-20 h-20 hidden md:flex items-center justify-center rounded-3xl bg-gradient-to-br from-primary/30 to-primary/5 backdrop-blur-xl border-2 border-primary/40 shadow-[0_0_50px_rgba(var(--primary),0.25)] z-50">
              <div
                className="w-full h-full relative flex items-center justify-center"
                style={{ perspective: 1000 }}
              >
                {steps.map((item, i) => (
                  <div 
                    key={item.step} 
                    className={`traveler-icon traveler-icon-${i} absolute inset-0 flex items-center justify-center`}
                  >
                    <item.icon className="w-8 h-8 text-primary drop-shadow-[0_0_12px_rgba(var(--primary),0.8)]" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-24 md:space-y-40 relative z-10">
              {steps.map((item, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div
                    key={item.step}
                    className={`step-container flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24 ${
                      i === 0 ? 'initial' : ''
                    } ${i === steps.length - 1 ? 'final' : ''} ${
                      !isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* The Static Destination Marker */}
                    <div className="marker desktop-marker hidden md:flex w-20 h-20 rounded-3xl bg-card border-2 border-border/50 items-center justify-center shrink-0 shadow-sm relative opacity-40 transition-opacity duration-500">
                      <item.icon className="w-8 h-8 text-muted-foreground" />
                    </div>

                    <div className="marker mobile-marker md:hidden flex w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 items-center justify-center shrink-0 z-10 text-primary mb-4">
                      <item.icon className="w-8 h-8" />
                    </div>

                    {/* The Animating Content Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 32 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.7, delay: 0.1 }}
                      className={`landing-card flex-1 w-full max-w-lg ${
                        isEven ? 'md:text-left' : 'md:text-right'
                      }`}
                    >
                      <div
                        className={`flex items-center gap-3 mb-4 md:hidden ${
                          isEven ? 'justify-start' : 'justify-end'
                        }`}
                      >
                        <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                          Step {i + 1}
                        </span>
                      </div>
                      <p
                        className={`text-sm font-semibold text-primary uppercase tracking-wider mb-3 hidden md:block`}
                      >
                        Step {i + 1}
                      </p>
                      <h3 className="text-3xl font-bold mb-4">{item.step}</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="text-center mt-32">
            <LandingCta href="/sign-up">Begin your journey</LandingCta>
          </div>
        </div>
      </section>
    </LandingShell>
  );
}
