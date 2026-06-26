"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  speed?: number;
  separator?: string;
  dark?: boolean;
}

export function Marquee({
  items,
  className,
  speed = 40,
  separator = "—",
  dark = false,
}: MarqueeProps) {
  const duration = (items.length * 12) / (speed / 40);
  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        "overflow-hidden py-8",
        dark ? "bg-oxford" : "bg-bone",
        className
      )}
    >
      <div
        className="flex whitespace-nowrap hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${duration}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={cn(
              "mx-6 font-bebas text-sm uppercase tracking-[0.2em] sm:mx-10",
              dark ? "text-platinum/30" : "text-oxford/20"
            )}
          >
            {item}
            <span className="ml-6 sm:ml-10">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
