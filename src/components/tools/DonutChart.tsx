"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import { cn } from "@/lib/utils";

interface Segment {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  segments: Segment[];
  centerLabel?: string;
  centerValue?: string;
  className?: string;
}

const RADIUS = 70;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const STROKE_WIDTH = 22;

export function DonutChart({ segments, centerLabel, centerValue, className }: DonutChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const total = segments.reduce((sum, s) => sum + s.value, 0);

  useGSAP(
    () => {
      if (!svgRef.current) return;
      const circles = svgRef.current.querySelectorAll("[data-segment]");
      circles.forEach((circle) => {
        gsap.from(circle, {
          strokeDashoffset: CIRCUMFERENCE,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    },
    { dependencies: [segments.map((s) => s.value).join(",")], scope: svgRef }
  );

  let cumulativeOffset = 0;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative">
        <svg ref={svgRef} viewBox="0 0 200 200" className="h-48 w-48">
          {/* Background ring */}
          <circle
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
            className="text-mercury/20"
          />

          {/* Segments */}
          {segments.map((segment) => {
            const segmentLength = total > 0 ? (segment.value / total) * CIRCUMFERENCE : 0;
            const offset = cumulativeOffset;
            cumulativeOffset += segmentLength;

            return (
              <circle
                key={segment.label}
                data-segment
                cx="100"
                cy="100"
                r={RADIUS}
                fill="none"
                stroke={segment.color}
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={`${segmentLength} ${CIRCUMFERENCE - segmentLength}`}
                strokeDashoffset={-offset}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
                className="transition-all duration-500"
              />
            );
          })}
        </svg>

        {/* Center text */}
        {(centerLabel || centerValue) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {centerLabel && (
              <span className="font-bebas text-[10px] uppercase tracking-[0.15em] text-mercury">
                {centerLabel}
              </span>
            )}
            {centerValue && (
              <span className="font-bebas text-xl text-oxford">{centerValue}</span>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {segments.map((segment) => (
          <div key={segment.label} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
            <span className="font-body text-xs text-oxford/60">{segment.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
