"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap-init";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !headingRef.current) return;

      // Eyebrow clip-path wipe
      if (eyebrowRef.current) {
        gsap.fromTo(
          eyebrowRef.current,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Scroll-driven color wash on heading words
      const split = SplitText.create(headingRef.current, { type: "words" });
      split.words.forEach((word: Element) => {
        gsap.fromTo(
          word,
          { color: "rgba(200, 204, 209, 0.35)" },
          {
            color: "#FFFFFF",
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: word,
              start: "top 82%",
              end: "top 55%",
              scrub: true,
            },
          }
        );
      });

      // Description fade in
      if (descRef.current) {
        gsap.from(descRef.current, {
          opacity: 0,
          y: 20,
          filter: "blur(4px)",
          duration: 0.8,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // Buttons slide up
      if (buttonsRef.current) {
        gsap.from(buttonsRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: buttonsRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative bg-oxford py-32 sm:py-40 shadow-[0_40px_60px_20px_rgba(0,0,0,0.3)]">
      <Container className="text-center">
        <p
          ref={eyebrowRef}
          className="mb-4 font-bebas text-sm uppercase tracking-[0.2em] text-mercury"
        >
          Ready to Get Started?
        </p>

        <h2
          ref={headingRef}
          className="mx-auto max-w-3xl text-4xl text-white sm:text-5xl md:text-6xl"
        >
          <span className="font-cormorant">Let&apos;s Build Your </span>
          <span className="font-playfair italic">Strategy </span>
          <span className="font-bebas">TOGETHER.</span>
        </h2>

        <p
          ref={descRef}
          className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed text-mercury"
        >
          Schedule a discovery session with our team. We&apos;ll discuss your
          goals, timeline, and how Crestline can deliver exceptional results.
        </p>

        <div ref={buttonsRef} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="cta" href="/contact" transitionType="circle-wipe" viewTransitionName="cta-morph">
            Schedule Consultation
          </Button>
          <Button variant="ghost" href="/chat">
            Talk to Advisor
          </Button>
        </div>
      </Container>
    </section>
  );
}
