import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TiltConfig {
  maxRotationX?: number;
  maxRotationY?: number;
  glareOpacity?: number;
  scale?: number;
}

export function use3DTilt(config: TiltConfig = {}) {
  const {
    maxRotationX = 8,
    maxRotationY = 8,
    glareOpacity = 0.15,
    scale = 1.02
  } = config;

  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    // Use gsap.quickTo for optimized, stutter-free animation
    const xTo = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3" });
    const scaleTo = gsap.quickTo(card, "scale", { duration: 0.5, ease: "power3" });
    
    let glareXTo: gsap.QuickToFunc | null = null;
    let glareYTo: gsap.QuickToFunc | null = null;
    let glareOpacityTo: gsap.QuickToFunc | null = null;

    if (glare) {
      glareXTo = gsap.quickTo(glare, "x", { duration: 0.5, ease: "power3" });
      glareYTo = gsap.quickTo(glare, "y", { duration: 0.5, ease: "power3" });
      glareOpacityTo = gsap.quickTo(glare, "opacity", { duration: 0.5, ease: "power3" });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      // Calculate mouse position relative to the center of the card (-1 to 1)
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      xTo(x * maxRotationY * 2); // Mouse moving X rotates around Y axis
      yTo(-y * maxRotationX * 2); // Mouse moving Y rotates around X axis
      
      if (glareXTo && glareYTo && glareOpacityTo) {
        // Move glare opposite to rotation
        glareXTo(x * rect.width);
        glareYTo(y * rect.height);
        glareOpacityTo(glareOpacity);
      }
    };

    const handleMouseEnter = () => {
      scaleTo(scale);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      scaleTo(1);
      if (glareOpacityTo) {
        glareOpacityTo(0);
      }
    };

    // Apply initial transform perspective
    gsap.set(card, { transformPerspective: 1000, transformStyle: "preserve-3d" });
    if (glare) {
      gsap.set(glare, { opacity: 0, xPercent: -50, yPercent: -50 });
    }

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maxRotationX, maxRotationY, glareOpacity, scale]);

  return { cardRef, glareRef };
}
