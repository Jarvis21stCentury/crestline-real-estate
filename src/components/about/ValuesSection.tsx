"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollTextReveal } from "@/components/ui/ScrollTextReveal";
import { VALUES } from "@/lib/constants";

export function ValuesSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll<HTMLElement>("[data-value-card]");

      cards.forEach((card, i) => {
        gsap.from(card, {
          x: i % 2 === 0 ? -60 : 60,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.9,
          delay: i * 0.1,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: gridRef }
  );

  return (
    <section className="bg-white py-32 sm:py-40">
      <Container>
        <SectionHeading
          eyebrow="Our Values"
          title={
            <>
              <span className="font-cormorant">What </span>
              <span className="font-bebas">DRIVES</span>
              <span className="font-cormorant italic"> Us</span>
            </>
          }
          description="Four principles guide every decision we make and every engagement we take on."
        />

        <div ref={gridRef} className="grid gap-8 sm:grid-cols-2">
          {VALUES.map((value, i) => (
            <div key={value.title} data-value-card className="flex gap-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-mercury/40">
                <span className="font-bebas text-sm text-oxford/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <h3 className="font-cormorant text-xl text-oxford">{value.title}</h3>
                <ScrollTextReveal className="mt-3 font-body text-sm leading-relaxed text-oxford/60">
                  {value.description}
                </ScrollTextReveal>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
