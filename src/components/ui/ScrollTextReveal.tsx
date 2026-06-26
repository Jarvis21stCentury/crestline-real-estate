"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap-init";
import { cn } from "@/lib/utils";

interface ScrollTextRevealProps {
  children: string;
  className?: string;
  color?: string;
  dimColor?: string;
  tag?: "p" | "h2" | "h3" | "span";
}

export function ScrollTextReveal({
  children,
  className,
  color = "rgb(14, 26, 54)",
  dimColor = "rgba(14, 26, 54, 0.15)",
  tag: Tag = "p",
}: ScrollTextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const split = SplitText.create(ref.current, { type: "words" });

    gsap.fromTo(
      split.words,
      { color: dimColor },
      {
        color: color,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: true,
        },
      }
    );

    return () => split.revert();
  });

  return (
    <Tag ref={ref as React.RefObject<never>} className={cn(className)}>
      {children}
    </Tag>
  );
}
