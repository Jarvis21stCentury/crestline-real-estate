"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageDistortion } from "@/components/ui/ImageDistortion";
import { SERVICES } from "@/lib/constants";

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      if (!isDesktop) {
        const mobileCards = sectionRef.current.querySelectorAll<HTMLElement>("[data-mobile-service-card]");
        if (mobileCards.length > 0) {
          gsap.from(mobileCards, {
            scale: 0.85,
            opacity: 0,
            y: 40,
            filter: "blur(4px)",
            stagger: { from: "center", each: 0.1 },
            duration: 0.8,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: sectionRef.current.querySelector("[data-mobile-grid]"),
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }
        return;
      }

      const cards = sectionRef.current.querySelectorAll<HTMLElement>("[data-stacked-card]");

      cards.forEach((card, i) => {
        if (i >= cards.length - 1) return;

        gsap.to(card, {
          scale: 0.95 - i * 0.02,
          filter: `brightness(${1 - (i + 1) * 0.08})`,
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top+=100",
            scrub: true,
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [isDesktop] }
  );

  return (
    <section ref={sectionRef} className="bg-bone py-32 sm:py-40">
      <Container>
        <SectionHeading
          eyebrow="Our Services"
          title={
            <>
              <span className="font-bebas">FULL-SPECTRUM </span>
              <span className="font-cormorant italic">
                Real Estate Advisory
              </span>
            </>
          }
          description="From acquisitions to asset management, our services span the entire real estate lifecycle."
        />

        {isDesktop ? (
          <div className="relative">
            {SERVICES.map((service, i) => {
              const hasImage = !!service.image;
              const isEven = i % 2 === 0;

              return (
                <div
                  key={service.title}
                  data-stacked-card
                  className="sticky rounded-2xl border border-mercury/30 bg-white overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.06)] mb-6 last:mb-0"
                  style={{ top: `${100 + i * 40}px`, zIndex: i }}
                >
                  <div className={`flex min-h-[280px] ${isEven ? "flex-row" : "flex-row-reverse"}`}>
                    {hasImage && (
                      <div className="relative w-2/5 shrink-0">
                        <ImageDistortion
                          src={service.image!}
                          alt=""
                          className="h-full w-full"
                        />
                        <div
                          className={`absolute inset-0 ${
                            isEven
                              ? "bg-gradient-to-l from-white/20 to-transparent"
                              : "bg-gradient-to-r from-white/20 to-transparent"
                          }`}
                        />
                      </div>
                    )}
                    <div className={`flex flex-col justify-center ${hasImage ? "w-3/5" : "w-full"} p-10 lg:p-14`}>
                      <span className="font-bebas text-xs uppercase tracking-[0.2em] text-mercury">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-2 font-cormorant text-2xl text-oxford lg:text-3xl">
                        {service.title}
                      </h3>
                      <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-oxford/60">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div data-mobile-grid className="grid gap-6 sm:grid-cols-2">
            {SERVICES.map((service) => {
              const hasImage = !!service.image;
              return (
                <div
                  key={service.title}
                  data-mobile-service-card
                  className={`relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                    hasImage
                      ? "border-white/10 min-h-[240px]"
                      : "border-mercury/30 bg-white hover:border-platinum"
                  }`}
                >
                  {hasImage && (
                    <>
                      <ImageDistortion
                        src={service.image!}
                        alt=""
                        className="absolute inset-0 h-full w-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-oxford/90 via-oxford/60 to-oxford/30" />
                    </>
                  )}
                  <div className={`relative z-10 p-8 ${hasImage ? "flex h-full flex-col justify-end" : ""}`}>
                    <h3 className={`font-cormorant text-xl ${hasImage ? "text-white" : "text-oxford"}`}>
                      {service.title}
                    </h3>
                    <p className={`mt-3 font-body text-sm leading-relaxed ${hasImage ? "text-white/70" : "text-oxford/60"}`}>
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
