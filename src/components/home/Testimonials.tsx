"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap-init";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/constants";
import { TiltCard } from "@/components/ui/TiltCard";

export function Testimonials() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll<HTMLElement>("[data-testimonial]");

      cards.forEach((card, i) => {
        const quoteMark = card.querySelector("[data-quote-mark]");
        const quoteText = card.querySelector("[data-quote-text]");
        const attribution = card.querySelector("[data-attribution]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        tl.from(card, {
          y: 60,
          rotateX: -5,
          opacity: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.6)",
          delay: i * 0.15,
          immediateRender: false,
        });

        if (quoteMark) {
          tl.from(quoteMark, {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(2)",
            immediateRender: false,
          }, "-=0.6");
        }

        if (quoteText) {
          const split = SplitText.create(quoteText, { type: "words" });
          tl.from(split.words, {
            opacity: 0,
            y: 12,
            stagger: 0.03,
            duration: 0.5,
            ease: "power3.out",
            immediateRender: false,
          }, "-=0.3");
        }

        if (attribution) {
          tl.from(attribution, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            immediateRender: false,
          }, "-=0.2");
        }
      });
    },
    { scope: gridRef }
  );

  return (
    <section className="bg-white py-32 sm:py-40 [perspective:1000px]">
      <Container>
        <SectionHeading
          eyebrow="Client Testimonials"
          title={
            <>
              <span className="font-cormorant">Trusted by </span>
              <span className="font-playfair italic">Industry Leaders</span>
            </>
          }
        />

        <div ref={gridRef} className="grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <TiltCard
              key={testimonial.name}
              maxTilt={6}
              className="rounded-2xl border border-mercury/30 bg-bone/50 p-8 transition-colors duration-300 hover:border-platinum sm:p-10"
            >
            <div
              data-testimonial
            >
              <span
                data-quote-mark
                className="inline-block font-dm-serif text-5xl leading-none text-mercury/50"
              >
                &ldquo;
              </span>
              <p
                data-quote-text
                className="mt-2 font-dm-serif text-xl italic leading-snug text-oxford/80 sm:text-2xl lg:text-3xl"
              >
                {testimonial.quote}
              </p>
              <div data-attribution className="mt-6 border-t border-mercury/30 pt-6">
                <p className="font-bebas text-sm uppercase tracking-[0.1em] text-oxford">
                  {testimonial.name}
                </p>
                <p className="mt-1 font-body text-sm text-oxford/50">
                  {testimonial.title}
                </p>
              </div>
            </div>
            </TiltCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
