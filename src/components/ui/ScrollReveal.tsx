"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { cn } from "@/lib/utils";

const animationConfigs = {
  "fade-in": { y: 30, opacity: 0, duration: 0.9 },
  "fade-up": { y: 40, opacity: 0, duration: 0.9 },
  "slide-left": { x: -80, opacity: 0, filter: "blur(8px)", duration: 1 },
  "slide-right": { x: 80, opacity: 0, filter: "blur(8px)", duration: 1 },
  "rotate-in": { y: 50, rotation: -3, opacity: 0, duration: 1.1 },
  "scale-up": { scale: 0.9, y: 30, opacity: 0, duration: 0.9 },
  "blur-left": { x: -50, opacity: 0, filter: "blur(6px)", duration: 0.8 },
} as const;

type Animation = keyof typeof animationConfigs;

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: Animation;
  delay?: number;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className,
  animation = "fade-up",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const config = animationConfigs[animation];

      gsap.from(ref.current, {
        ...config,
        delay: delay / 1000,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref, dependencies: [animation, delay] }
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
