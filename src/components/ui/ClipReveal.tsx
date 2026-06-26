"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import { cn } from "@/lib/utils";

type ClipMode = "circle" | "inset" | "polygon";

const clipStates: Record<ClipMode, { from: string; to: string }> = {
  circle: {
    from: "circle(0% at 50% 50%)",
    to: "circle(75% at 50% 50%)",
  },
  inset: {
    from: "inset(15% 15% 15% 15%)",
    to: "inset(0% 0% 0% 0%)",
  },
  polygon: {
    from: "polygon(0 0, 0 0, 0 100%, 0 100%)",
    to: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  },
};

interface ClipRevealProps {
  children: ReactNode;
  className?: string;
  mode?: ClipMode;
  duration?: number;
  delay?: number;
}

export function ClipReveal({
  children,
  className,
  mode = "inset",
  duration = 1.2,
  delay = 0,
}: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const { from, to } = clipStates[mode];

    gsap.fromTo(
      ref.current,
      { clipPath: from },
      {
        clipPath: to,
        duration,
        delay,
        ease: "power3.inOut",
        immediateRender: false,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
