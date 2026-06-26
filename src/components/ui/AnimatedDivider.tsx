"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import { cn } from "@/lib/utils";

const COLOR_MAP: Record<string, string> = {
  oxford: "#0E1A36",
  bone: "#F0EFEC",
  white: "#FFFFFF",
};

interface AnimatedDividerProps {
  dark?: boolean;
  from?: keyof typeof COLOR_MAP;
  to?: keyof typeof COLOR_MAP;
}

export function AnimatedDivider({ dark = false, from, to }: AnimatedDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const hasGradient = from && to;

  useGSAP(
    () => {
      if (!lineRef.current) return;

      gsap.from(lineRef.current, {
        scaleX: 0,
        duration: 1.2,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref }
  );

  if (hasGradient) {
    return (
      <div
        ref={ref}
        className="relative h-[120px] w-full"
        style={{
          background: `linear-gradient(to bottom, ${COLOR_MAP[from]}, ${COLOR_MAP[to]})`,
        }}
      >
        <div
          ref={lineRef}
          className="absolute top-1/2 left-0 right-0 h-px origin-center bg-white/[0.06]"
        />
      </div>
    );
  }

  return (
    <div ref={ref}>
      <div
        ref={lineRef}
        className={cn(
          "h-px w-full origin-center",
          dark ? "bg-white/10" : "bg-oxford/10"
        )}
      />
    </div>
  );
}
