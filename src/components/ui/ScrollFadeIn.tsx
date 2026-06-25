"use client";

import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import { cn } from "@/lib/utils";

export function ScrollFadeIn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useScrollFadeIn<HTMLDivElement>();
  return (
    <div ref={ref} className={cn("scroll-fade-in", className)}>
      {children}
    </div>
  );
}
