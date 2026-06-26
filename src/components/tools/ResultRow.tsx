"use client";

import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ResultRowProps {
  label: string;
  value: number | string;
  format?: "currency" | "percent";
  bold?: boolean;
  highlight?: boolean;
  className?: string;
}

export function ResultRow({ label, value, format, bold, highlight, className }: ResultRowProps) {
  let displayValue: string;
  if (typeof value === "string") {
    displayValue = value;
  } else if (format === "currency") {
    displayValue = formatCurrency(value);
  } else if (format === "percent") {
    displayValue = `${value.toFixed(1)}%`;
  } else {
    displayValue = formatCurrency(value);
  }

  return (
    <div
      className={cn(
        "-mx-2 flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors duration-200 hover:bg-oxford/[0.03]",
        className
      )}
      data-cursor
    >
      <span className="flex items-center gap-2 font-body text-sm text-oxford/60">
        {highlight && <span className="h-1.5 w-1.5 rounded-full bg-oxford" />}
        {label}
      </span>
      <span
        className={cn(
          "font-bebas tabular-nums text-oxford transition-all duration-200",
          bold ? "text-base font-bold" : "text-sm"
        )}
      >
        {displayValue}
      </span>
    </div>
  );
}
