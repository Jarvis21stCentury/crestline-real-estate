"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap-init";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}

export function TextReveal({ children, className }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const split = SplitText.create(ref.current, { type: "words" });

      gsap.from(split.words, {
        y: 24,
        opacity: 0,
        filter: "blur(4px)",
        stagger: 0.06,
        duration: 0.7,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

export function RevealWord({
  children,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return <span>{children}</span>;
}
