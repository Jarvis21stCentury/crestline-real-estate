"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import { cn } from "@/lib/utils";

interface DTIProgressBarProps {
  value: number;
  max?: number;
  thresholds?: Array<{ value: number; label: string }>;
  className?: string;
}

export function DTIProgressBar({
  value,
  max = 50,
  thresholds = [
    { value: 28, label: "28%" },
    { value: 36, label: "36%" },
  ],
  className,
}: DTIProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const clampedValue = Math.min(value, max);
  const percent = (clampedValue / max) * 100;

  const barColor =
    value <= 28
      ? "from-emerald-500 to-emerald-600"
      : value <= 36
        ? "from-amber-400 to-amber-500"
        : "from-red-400 to-red-500";

  useGSAP(
    () => {
      if (!barRef.current) return;
      gsap.to(barRef.current, {
        width: `${percent}%`,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    { dependencies: [percent] }
  );

  useGSAP(
    () => {
      if (!glowRef.current) return;
      gsap.to(glowRef.current, {
        opacity: 0.4,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    []
  );

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between font-body text-xs text-oxford/50">
        <span>DTI: {value.toFixed(1)}%</span>
        <span>{max}% max</span>
      </div>

      <div className="relative h-4 overflow-hidden rounded-full bg-mercury/20">
        {/* Threshold markers */}
        {thresholds.map((threshold) => (
          <div
            key={threshold.value}
            className="absolute top-0 h-full w-px bg-oxford/20"
            style={{ left: `${(threshold.value / max) * 100}%` }}
          >
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-bebas text-[10px] text-oxford/40">
              {threshold.label}
            </span>
          </div>
        ))}

        {/* Fill bar */}
        <div
          ref={barRef}
          className={cn("relative h-full rounded-full bg-gradient-to-r", barColor)}
          style={{ width: 0 }}
        >
          {/* Glow at end */}
          <div
            ref={glowRef}
            className="absolute right-0 top-0 h-full w-8 rounded-full bg-white/40 blur-sm"
            style={{ opacity: 0 }}
          />
        </div>

        {/* Floating value label */}
        <div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
          style={{ left: `${percent}%` }}
        >
          <div className="rounded bg-oxford px-1.5 py-0.5 font-bebas text-[10px] tabular-nums text-white shadow-md">
            {value.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Zone labels */}
      <div className="flex gap-3 font-body text-[10px] text-oxford/40">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Safe (&lt;28%)
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          Caution (28-36%)
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
          High (&gt;36%)
        </span>
      </div>
    </div>
  );
}
