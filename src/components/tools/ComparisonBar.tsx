"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import { formatCurrency, cn } from "@/lib/utils";

interface ComparisonItem {
  label: string;
  value: number;
  color: string;
  isWinner?: boolean;
}

interface ComparisonBarProps {
  items: ComparisonItem[];
  className?: string;
}

export function ComparisonBar({ items, className }: ComparisonBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const maxValue = Math.max(...items.map((i) => Math.abs(i.value)));

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const bars = containerRef.current.querySelectorAll("[data-bar]");
      bars.forEach((bar) => {
        gsap.from(bar, {
          width: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    },
    { dependencies: [items.map((i) => i.value).join(",")], scope: containerRef }
  );

  return (
    <div ref={containerRef} className={cn("space-y-4", className)}>
      {items.map((item) => {
        const widthPercent = maxValue > 0 ? (Math.abs(item.value) / maxValue) * 100 : 0;
        return (
          <div key={item.label} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-bebas text-xs uppercase tracking-[0.15em] text-oxford/60">
                {item.isWinner && (
                  <span className="h-1.5 w-1.5 rounded-full bg-oxford animate-pulse" />
                )}
                {item.label}
              </span>
              <span className="font-bebas text-sm tabular-nums text-oxford">
                {formatCurrency(item.value)}
              </span>
            </div>
            <div className="h-8 overflow-hidden rounded-lg bg-mercury/15">
              <div
                data-bar
                className={cn(
                  "flex h-full items-center rounded-lg px-3 transition-all duration-500",
                  item.isWinner && "shadow-[0_0_20px_rgba(14,26,54,0.12)]"
                )}
                style={{
                  width: `${Math.max(widthPercent, 2)}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
