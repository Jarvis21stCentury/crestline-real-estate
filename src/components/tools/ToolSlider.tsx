"use client";

import { useRef, useCallback } from "react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ToolSliderProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  format?: "currency";
  className?: string;
}

export function ToolSlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
  format,
  className,
}: ToolSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const display = format === "currency" ? formatCurrency(value) : `${value}${suffix || ""}`;
  const fillPercent = ((value - min) / (max - min)) * 100;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value));
    },
    [onChange]
  );

  return (
    <div className={cn("group", className)} data-cursor>
      <div className="mb-2 flex items-center justify-between">
        <label className="font-body text-sm font-bold text-oxford">{label}</label>
        <span className="font-bebas text-sm tabular-nums text-oxford">{display}</span>
      </div>
      <div ref={trackRef} className="relative py-2">
        {/* Tooltip */}
        <div
          className="pointer-events-none absolute -top-1 z-10 -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ left: `${fillPercent}%` }}
        >
          <div className="rounded-md bg-oxford px-2.5 py-1 font-bebas text-xs tabular-nums text-white shadow-lg">
            {display}
          </div>
          <div className="mx-auto h-0 w-0 border-x-4 border-t-4 border-x-transparent border-t-oxford" />
        </div>

        {/* Custom track visual */}
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-mercury/30 transition-transform duration-200 group-hover:scale-y-150">
          <div
            className="h-full rounded-full bg-oxford transition-all duration-100"
            style={{ width: `${fillPercent}%` }}
          />
        </div>

        {/* Custom thumb visual */}
        <div
          className="pointer-events-none absolute top-1/2 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-oxford bg-white shadow-[0_0_0_4px_rgba(14,26,54,0.08),0_2px_8px_rgba(14,26,54,0.15)] transition-all duration-200 group-active:scale-110"
          style={{ left: `${fillPercent}%` }}
        />

        {/* Native input (invisible, on top for interaction) */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="tool-slider-input relative z-20 w-full cursor-pointer"
        />
      </div>
    </div>
  );
}
