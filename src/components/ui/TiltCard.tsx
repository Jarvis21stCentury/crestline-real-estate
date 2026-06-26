"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { gsap } from "@/lib/gsap-init";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  glare?: boolean;
}

export function TiltCard({
  children,
  className,
  maxTilt = 8,
  perspective = 800,
  glare = false,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !canHover) return;

    const rxTo = gsap.quickTo(card, "rotateX", { duration: 0.4, ease: "power3.out" });
    const ryTo = gsap.quickTo(card, "rotateY", { duration: 0.4, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      ryTo(((x - cx) / cx) * maxTilt);
      rxTo(-((y - cy) / cy) * maxTilt);

      if (glare && glareRef.current) {
        const px = ((x / rect.width) * 100).toFixed(0);
        const py = ((y / rect.height) * 100).toFixed(0);
        glareRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;
      }
    };

    const onLeave = () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
      if (glare && glareRef.current) {
        glareRef.current.style.background = "transparent";
      }
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, [canHover, maxTilt, glare]);

  if (!canHover) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div style={{ perspective: `${perspective}px` }}>
      <div
        ref={cardRef}
        className={className}
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {children}
        {glare && (
          <div
            ref={glareRef}
            className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
          />
        )}
      </div>
    </div>
  );
}
