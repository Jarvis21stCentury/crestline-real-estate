"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import { formatCurrency, cn } from "@/lib/utils";

interface ToolAnimatedValueProps {
  value: number;
  format?: "currency" | "number" | "percent";
  className?: string;
}

export function ToolAnimatedValue({ value, format = "currency", className }: ToolAnimatedValueProps) {
  const prevValue = useRef(value);
  const counterRef = useRef({ val: value });
  const [display, setDisplay] = useState(() => formatValue(value, format));

  function formatValue(v: number, fmt: string) {
    if (fmt === "currency") return formatCurrency(Math.round(v));
    if (fmt === "percent") return `${v.toFixed(1)}%`;
    return Math.round(v).toLocaleString();
  }

  useGSAP(
    () => {
      counterRef.current.val = prevValue.current;
      gsap.to(counterRef.current, {
        val: value,
        duration: 0.6,
        ease: "power2.out",
        onUpdate: () => {
          setDisplay(formatValue(counterRef.current.val, format));
        },
        onComplete: () => {
          prevValue.current = value;
          setDisplay(formatValue(value, format));
        },
      });
    },
    { dependencies: [value, format] }
  );

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return <span className={cn("tabular-nums", className)}>{display}</span>;
}
