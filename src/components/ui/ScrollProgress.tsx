"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!barRef.current) return;

    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] h-[2px]">
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-platinum/60"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
