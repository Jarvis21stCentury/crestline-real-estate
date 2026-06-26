"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import { cn } from "@/lib/utils";

function parseStatValue(value: string) {
  const match = value.match(/^([^0-9]*)([\d.]+)(.*)$/);
  if (!match) return { prefix: "", digits: "0", suffix: value };
  return { prefix: match[1], digits: match[2], suffix: match[3] };
}

interface AnimatedCounterProps {
  value: string;
  className?: string;
  delay?: number;
  duration?: number;
}

const DIGIT_STRIP = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function AnimatedCounter({
  value,
  className,
  delay = 0,
  duration = 1.5,
}: AnimatedCounterProps) {
  const { prefix, digits, suffix } = parseStatValue(value);
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const cols = ref.current.querySelectorAll<HTMLElement>("[data-odometer-col]");

      cols.forEach((col, i) => {
        const target = parseInt(col.dataset.target || "0", 10);
        gsap.fromTo(
          col,
          { y: 0 },
          {
            y: `-${target}em`,
            duration: duration + i * 0.1,
            delay: delay / 1000 + i * 0.05,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: ref, dependencies: [value, delay, duration] }
  );

  const chars = digits.split("");

  return (
    <div ref={ref} className={cn("inline-flex items-baseline", className)}>
      {prefix && <span>{prefix}</span>}
      {chars.map((char, i) => {
        if (char === ".") {
          return <span key={`dot-${i}`}>.</span>;
        }
        const targetDigit = parseInt(char, 10);
        return (
          <span
            key={i}
            className="inline-block overflow-hidden"
            style={{ height: "1em", lineHeight: "1em" }}
          >
            <span
              data-odometer-col
              data-target={targetDigit}
              className="flex flex-col"
              style={{ lineHeight: "1em" }}
            >
              {DIGIT_STRIP.map((d) => (
                <span key={d} className="block h-[1em]">
                  {d}
                </span>
              ))}
            </span>
          </span>
        );
      })}
      {suffix && <span>{suffix}</span>}
    </div>
  );
}
