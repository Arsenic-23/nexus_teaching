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
      if (dimensions.w === 0 || !containerRef.current) return;

      // Custom selector that GUARANTEES a pure native Array
      // This completely bypasses the Next.js Turbopack 'a.map is not a function' error
      const q = (selector: string) => Array.from(containerRef.current!.querySelectorAll(selector));
      
      const box = q('.traveler-card')[0] as Element;
      const markers = q('.step-container .desktop-marker');
      
      if (!box || !markers.length) return;

      // Clear any previous inline styles applied by GSAP before measuring
      gsap.set(box, { clearProps: 'all' });
      gsap.set(q('.traveler-icon'), { clearProps: 'all' });

      const boxBaseRect = box.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2 - (boxBaseRect.left + boxBaseRect.width / 2);

      // Calculate base marker positions
      const pathPoints = markers.map((marker: Element) => {
        const r = marker.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - (boxBaseRect.left + boxBaseRect.width / 2),
          y: r.top + r.height / 2 - (boxBaseRect.top + boxBaseRect.height / 2),
        };
      });

      // Inject explicit midpoints at the exact horizontal center of the container
      // This forces the bezier curve to stay in the safe 'gutter' and allows for ultra-smooth high curviness
      const curvedPoints: {x: number, y: number}[] = [];
      for (let i = 0; i < pathPoints.length; i++) {
         curvedPoints.push(pathPoints[i]);
         if (i < pathPoints.length - 1) {
            curvedPoints.push({
               x: centerX,
               y: (pathPoints[i].y + pathPoints[i+1].y) / 2
            });
         }
      }

      // Jump box to the start position immediately
      gsap.set(box, { x: curvedPoints[0].x, y: curvedPoints[0].y });
      const pointsToAnimate = curvedPoints.slice(1);

      // Create a master timeline synced exactly from the center of the first step to the center of the last
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: q('.step-container.initial')[0],
          start: 'center center',
          endTrigger: q('.step-container.final')[0],
          end: 'center center',
          scrub: 1, // 1s smoothing creates an incredibly premium, fluid trailing effect (increased for smoothness)
        },
      });

      // Animate the path
      tl.to(box, {
        duration: 1,
        ease: 'none',
        motionPath: {
          path: pointsToAnimate,
          type: 'soft', // Automatically creates continuous, ultra-smooth cubic beziers through our safe points
          curviness: 1.5, // High curviness for a lush, sweeping circular feel
        },
      }, 0);

      // Epic Morphing & Milestone Activations
      const numSteps = steps.length;
      const segmentDuration = 1 / (numSteps - 1);
      
      const icons = q('.traveler-icon').filter(Boolean);
      const allMarkers = q('.marker').filter(Boolean);
      const pulseRings = q('.pulse-ring').filter(Boolean);
      const orbCore = q('.traveler-orb-core')[0];
      
      // Helper to toggle marker glow classes (CSS handles borderColor/boxShadow with CSS vars)
      const setMarkerState = (els: Element[], active: boolean) => {
        els.forEach(el => {
          el.classList.toggle('marker-active', active);
          el.classList.toggle('marker-dimmed', !active);
        });
      };
      
      // Base states
      if (icons.length > 0) {
         gsap.set(icons, { opacity: 0, scale: 0.5 });
         gsap.set(icons[0], { opacity: 1, scale: 1 });
      }
      gsap.set(pulseRings, { scale: 1, opacity: 0 });
      
      // Set all markers to dimmed state (handled purely by CSS class)
      setMarkerState(allMarkers, false);

      // Ignite the first markers instantly
      const firstMarkers = [allMarkers[0], allMarkers[1]].filter(Boolean);
      setMarkerState(firstMarkers, true);

      for (let i = 0; i < numSteps - 1; i++) {
         const timeAtDestination = (i + 1) * segmentDuration;
         // Short transition = icon sits crisp at each node for ~75% of the segment
         const flipDuration = segmentDuration * 0.25;
         const halfDuration = flipDuration / 2;
         const flipStart = timeAtDestination - halfDuration;
         
         const currentMarkers = [allMarkers[i * 2], allMarkers[i * 2 + 1]].filter(Boolean);
         const nextMarkers = [allMarkers[(i + 1) * 2], allMarkers[(i + 1) * 2 + 1]].filter(Boolean);
         
         // 1. Orb Core Energy Pulse — swells up then snaps back
         if (orbCore) {
            tl.to(orbCore, {
               scale: 1.25,
               duration: halfDuration,
               ease: "power2.out"
            }, flipStart);
            tl.to(orbCore, {
               scale: 1,
               duration: halfDuration,
               ease: "back.out(2)"
            }, flipStart + halfDuration);
         }
         
         // 2. Shockwave Pulse Rings — burst outward on arrival
         pulseRings.forEach((ring, idx) => {
            const delay = idx * (halfDuration * 0.3);
            tl.fromTo(ring, 
               { scale: 1, opacity: 0.6 },
               { scale: 2.5 + idx * 0.5, opacity: 0, duration: flipDuration * 1.5, ease: "power2.out" },
               flipStart + delay
            );
         });

         // 3. Icon Out — smooth twisting fade out
         tl.to(icons[i], {
            opacity: 0,
            scale: 0.5,
            rotation: 90,
            rotationY: 90,
            duration: halfDuration,
            ease: "power2.inOut"
         }, flipStart);

         // 4. Icon In — spiraling snap-in with 3D twist
         tl.fromTo(icons[i+1], 
            { opacity: 0, scale: 1.5, rotation: -90, rotationY: -90 },
            { opacity: 1, scale: 1, rotation: 0, rotationY: 0, duration: halfDuration, ease: "back.out(1.5)" },
            flipStart + halfDuration
         );
         
         // 5. Milestone Markers React (Docking mechanism handled fully by CSS transitions)
         tl.to(currentMarkers, {
            duration: flipDuration,
            onStart: () => setMarkerState(currentMarkers, false),
         }, flipStart);
         
         tl.to(nextMarkers, {
            duration: flipDuration,
            onStart: () => setMarkerState(nextMarkers, true),
         }, flipStart + halfDuration / 2);
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

      <section className="landing-section pt-0 pb-32 overflow-hidden relative">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating gradient blobs */}
          <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[120px] animate-[float-blob_20s_ease-in-out_infinite]" />
          <div className="absolute top-[50%] right-[5%] w-[400px] h-[400px] rounded-full bg-primary/[0.04] blur-[100px] animate-[float-blob_15s_ease-in-out_infinite_reverse]" />
          <div className="absolute bottom-[10%] left-[30%] w-[350px] h-[350px] rounded-full bg-primary/[0.02] blur-[80px] animate-[float-blob_25s_ease-in-out_infinite_2s]" />
          {/* Subtle dot grid */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]" style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }} />
        </div>
        
        <div className="landing-container max-w-5xl relative" ref={containerRef}>
          <div className="relative">
            {/* The Morphing Traveler Orb */}
            <div className="traveler-card absolute left-0 top-0 w-24 h-24 hidden md:flex items-center justify-center z-50" style={{ perspective: 1200 }}>
              {/* Outer orbit rings — multiple layers for depth */}
              <div className="absolute inset-[-20px] rounded-full border border-primary/10 animate-[spin_20s_linear_infinite]" />
              
              {/* Dotted ring */}
              <div className="absolute inset-[-14px] rounded-full border border-dashed border-primary/20 animate-[spin_10s_linear_infinite_reverse]" />
              
              <div className="absolute inset-[-8px] rounded-full border border-primary/20 animate-[spin_7s_linear_infinite]" />

              {/* Shockwave pulse rings (animated via GSAP on milestone hit) */}
              <div className="pulse-ring pulse-ring-1 absolute inset-0 rounded-full border-2 border-primary/40 opacity-0" />
              <div className="pulse-ring pulse-ring-2 absolute inset-0 rounded-full border border-primary/20 opacity-0" />
              
              {/* Multi-layer core orb */}
              <div className="absolute inset-[-2px] rounded-full bg-primary/5 blur-md" />
              <div className="traveler-orb-core absolute inset-0 rounded-full bg-gradient-to-br from-primary/50 via-primary/25 to-transparent backdrop-blur-2xl border-2 border-primary/50" />
              <div className="absolute inset-[6px] rounded-full bg-gradient-to-tl from-primary/10 via-transparent to-primary/20 mix-blend-overlay" />
              
              {/* Icon container */}
              <div className="relative w-full h-full flex items-center justify-center">
                {steps.map((item, i) => (
                  <div 
                    key={item.step} 
                    className={`traveler-icon traveler-icon-${i} absolute inset-0 flex items-center justify-center`}
                  >
                    <item.icon className="w-9 h-9 text-primary drop-shadow-[0_0_16px_hsl(var(--primary)/0.9)]" />
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
                    {/* The Docking Port Node */}
                    <div className="marker desktop-marker hidden md:flex w-28 h-28 items-center justify-center shrink-0 relative transition-all duration-500">
                      {/* Outer Docking Ring */}
                      <div className="marker-ring-outer absolute inset-0 rounded-full border-[3px] border-dashed border-border/40 transition-all duration-700" />
                      {/* Inner Lock Ring */}
                      <div className="marker-ring-inner absolute inset-3 rounded-full border border-border/30 transition-all duration-500" />
                      {/* Center Core */}
                      <div className="marker-core absolute inset-5 rounded-full bg-card/80 backdrop-blur-md border border-border/50 shadow-inner flex items-center justify-center transition-all duration-500">
                        <item.icon className="marker-icon w-8 h-8 text-muted-foreground transition-all duration-500" />
                      </div>
                    </div>

                    <div className="marker mobile-marker md:hidden flex w-24 h-24 items-center justify-center shrink-0 z-10 text-primary mb-4 relative transition-all duration-500">
                      <div className="marker-ring-outer absolute inset-0 rounded-full border-[3px] border-dashed border-primary/20 transition-all duration-700" />
                      <div className="marker-core absolute inset-4 rounded-full bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-primary/30 flex items-center justify-center backdrop-blur-sm transition-all duration-500">
                        <item.icon className="marker-icon w-8 h-8 transition-all duration-500" />
                      </div>
                    </div>

                    {/* The Animating Content Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 40, scale: 0.85 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      animate={i === 0 ? { opacity: 1, y: 0, scale: 1 } : undefined}
                      viewport={{ once: true, margin: i === 0 ? '50px' : '-50px' }}
                      transition={{ type: 'spring', stiffness: 100, damping: i === 0 ? 15 : 20, delay: i === 0 ? 0.2 : 0 }}
                      className={`landing-card group relative overflow-hidden flex-1 w-full max-w-xl ${
                        isEven ? 'md:text-left' : 'md:text-right'
                      }`}
                    >
                      {/* Top accent gradient line */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent z-20" />

                      {/* Background Image Layer */}
                      <div className="absolute inset-0 z-0 pointer-events-none">
                        <div 
                          className="absolute inset-0 opacity-100 transition-transform duration-700 group-hover:scale-105"
                          style={{
                            backgroundImage: "url('/assets/cards_small.jpeg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        />
                        {/* Theme-aware overlay to ensure text contrast without blurring the image */}
                        <div className="absolute inset-0 bg-white/40 dark:bg-black/60 transition-colors duration-500 group-hover:bg-white/20 dark:group-hover:bg-black/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/40 dark:from-black/90 dark:via-transparent dark:to-black/40" />
                      </div>
                      
                      {/* Content Layer */}
                      <div className="relative z-10 py-2">
                        <div
                          className={`flex items-center gap-3 mb-5 md:hidden ${
                            isEven ? 'justify-start' : 'justify-end'
                          }`}
                        >
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1 uppercase tracking-widest">
                            Step {i + 1}
                          </span>
                        </div>
                        <div className={`mb-5 hidden md:block`}>
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1 uppercase tracking-widest">
                            Step {i + 1}
                          </span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-5 drop-shadow-md tracking-tight">{item.step}</h3>
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed drop-shadow-md max-w-md">
                          {item.desc}
                        </p>
                      </div>
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
