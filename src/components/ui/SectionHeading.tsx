"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap-init";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.8, ease: "power2.out" },
          0
        );
      }

      if (titleRef.current) {
        const split = SplitText.create(titleRef.current, { type: "words" });
        tl.from(
          split.words,
          {
            y: 30,
            opacity: 0,
            filter: "blur(4px)",
            stagger: 0.05,
            duration: 0.8,
            ease: "power3.out",
            immediateRender: false,
          },
          0.15
        );
      }

      if (descRef.current) {
        tl.from(
          descRef.current,
          { opacity: 0, y: 20, filter: "blur(4px)", duration: 0.8, ease: "power3.out", immediateRender: false },
          "-=0.4"
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      data-skew
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        align === "left" && "text-left"
      )}
    >
      {eyebrow && (
        <p
          ref={eyebrowRef}
          className="mb-4 font-bebas text-sm uppercase tracking-[0.2em] text-mercury"
        >
          {eyebrow}
        </p>
      )}
      <h2
        ref={titleRef}
        className={cn(
          "text-4xl leading-tight sm:text-5xl md:text-6xl",
          dark ? "text-white" : "text-oxford"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          ref={descRef}
          className={cn(
            "mx-auto mt-6 max-w-2xl font-body text-[17px] leading-relaxed",
            dark ? "text-platinum/80" : "text-oxford/60",
            align === "left" && "mx-0"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
