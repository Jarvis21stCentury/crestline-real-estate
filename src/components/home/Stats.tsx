"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { STATS } from "@/lib/constants";

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelsRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.from(labelsRef.current.filter(Boolean), {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-oxford py-32 sm:py-40">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter
                value={stat.value}
                delay={i * 150}
                className="font-bebas text-5xl text-platinum sm:text-6xl md:text-7xl"
              />
              <p
                ref={(el) => { labelsRef.current[i] = el; }}
                className="mt-3 font-body text-xs uppercase tracking-[0.15em] text-mercury [font-variant:small-caps]"
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
