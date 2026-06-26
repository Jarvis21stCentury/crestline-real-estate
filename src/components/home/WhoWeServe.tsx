"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollTextReveal } from "@/components/ui/ScrollTextReveal";
import { ImageDistortion } from "@/components/ui/ImageDistortion";
import { ClipReveal } from "@/components/ui/ClipReveal";
import { WHO_WE_SERVE } from "@/lib/constants";

export function WhoWeServe() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll<HTMLElement>("[data-serve-card]");
      const images = gridRef.current.querySelectorAll<HTMLElement>("[data-serve-image]");
      const bulletGroups = gridRef.current.querySelectorAll<HTMLElement>("[data-serve-bullets]");

      // Cards enter from opposite sides
      cards.forEach((card, i) => {
        const fromX = i === 0 ? -80 : 80;

        gsap.from(card, {
          x: fromX,
          opacity: 0,
          filter: "blur(8px)",
          duration: 1.1,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      // Parallax on inner images
      images.forEach((img) => {
        gsap.to(img, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: img.closest("[data-serve-card]"),
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Bullet points stagger in after card
      bulletGroups.forEach((group) => {
        const bullets = group.querySelectorAll("li");
        gsap.from(bullets, {
          x: -20,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: group,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: gridRef }
  );

  return (
    <section className="bg-bone py-32 sm:py-40">
      <Container>
        <SectionHeading
          eyebrow="Who We Serve"
          title={
            <>
              <span className="font-cormorant">Commercial </span>
              <span className="font-bebas">&amp; RESIDENTIAL</span>
              <span className="font-playfair italic"> Excellence</span>
            </>
          }
          description="Whether you're navigating a complex commercial transaction or seeking your ideal home, our dedicated teams bring institutional-grade expertise to every engagement."
        />

        <div ref={gridRef} className="grid gap-8 md:grid-cols-2">
          {WHO_WE_SERVE.map((segment, i) => {
            const hasImage = !!segment.image;

            return (
              <div
                key={segment.title}
                data-serve-card
                className={`relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  hasImage
                    ? "border-white/10 min-h-[420px]"
                    : "border-mercury/30 bg-white hover:border-platinum"
                }`}
              >
                {hasImage && (
                  <ClipReveal mode="inset" className="absolute inset-0">
                    <div data-serve-image className="absolute inset-0 scale-110">
                      <ImageDistortion
                        src={segment.image!}
                        alt=""
                        className="h-full w-full"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-oxford/90 via-oxford/60 to-oxford/30" />
                  </ClipReveal>
                )}

                <div
                  className={`relative z-10 p-8 sm:p-10 ${
                    hasImage ? "flex h-full flex-col justify-end" : ""
                  }`}
                >
                  <h3
                    className={`font-cormorant text-2xl ${
                      hasImage ? "text-white" : "text-oxford"
                    }`}
                  >
                    {segment.title}
                  </h3>
                  <ScrollTextReveal
                    className={`mt-4 font-body leading-relaxed ${
                      hasImage ? "text-white/70" : "text-oxford/60"
                    }`}
                    color={hasImage ? "rgba(255,255,255,0.7)" : "rgba(14,26,54,0.6)"}
                    dimColor={hasImage ? "rgba(255,255,255,0.1)" : "rgba(14,26,54,0.1)"}
                  >
                    {segment.description}
                  </ScrollTextReveal>
                  <ul data-serve-bullets className="mt-6 space-y-3">
                    {segment.points.map((point) => (
                      <li
                        key={point}
                        className={`flex items-start gap-3 font-body text-sm ${
                          hasImage ? "text-white/60" : "text-oxford/70"
                        }`}
                      >
                        <span
                          className={`mt-2 block h-1 w-1 shrink-0 rounded-full ${
                            hasImage ? "bg-white/40" : "bg-mercury"
                          }`}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={hasImage ? "cta" : "secondary"}
                    href="/contact"
                    className="mt-8 text-xs"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
