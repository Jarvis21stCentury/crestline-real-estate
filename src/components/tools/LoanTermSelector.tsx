"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import { cn } from "@/lib/utils";

interface LoanTermSelectorProps {
  value: number;
  onChange: (term: number) => void;
  options?: number[];
}

export function LoanTermSelector({ value, onChange, options = [15, 20, 30] }: LoanTermSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const active = containerRef.current.querySelector("[data-active='true']");
      if (active) {
        gsap.from(active, {
          scale: 0.95,
          duration: 0.25,
          ease: "back.out(2)",
        });
      }
    },
    { dependencies: [value], scope: containerRef }
  );

  return (
    <div>
      <label className="mb-1.5 block font-body text-sm font-bold text-oxford">Loan Term</label>
      <div ref={containerRef} className="flex gap-3">
        {options.map((term) => (
          <button
            key={term}
            data-active={value === term}
            data-cursor
            onClick={() => onChange(term)}
            className={cn(
              "flex-1 rounded-lg border py-2.5 font-bebas text-sm uppercase tracking-[0.1em] transition-all duration-300",
              value === term
                ? "border-oxford bg-oxford text-white shadow-[0_4px_12px_rgba(14,26,54,0.2)]"
                : "border-mercury/40 text-oxford/60 hover:border-oxford/30 hover:bg-oxford/[0.03]"
            )}
          >
            {term} yr
          </button>
        ))}
      </div>
    </div>
  );
}
