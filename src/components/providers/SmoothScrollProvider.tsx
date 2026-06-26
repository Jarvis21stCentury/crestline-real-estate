"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.1,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    let skewTargets: NodeListOf<HTMLElement> | null = null;
    const refreshSkewTargets = () => {
      skewTargets = document.querySelectorAll<HTMLElement>("[data-skew]");
    };
    refreshSkewTargets();

    const skewTicker = () => {
      if (!skewTargets || skewTargets.length === 0) {
        refreshSkewTargets();
        return;
      }
      const v = lenis.velocity;
      const skew = Math.max(-3, Math.min(3, v * 0.08));
      gsap.to(skewTargets, {
        skewY: skew,
        duration: 0.3,
        ease: "power3.out",
        overwrite: true,
      });
    };
    gsap.ticker.add(skewTicker);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
