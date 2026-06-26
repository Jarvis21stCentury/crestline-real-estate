"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap-init";
import { Container } from "@/components/ui/Container";

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!headlineRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.8, ease: "power2.out" },
          0.2
        );
      }

      const split = SplitText.create(headlineRef.current, { type: "chars,words" });
      tl.from(split.chars, {
        y: 80,
        opacity: 0,
        filter: "blur(12px)",
        stagger: 0.025,
        duration: 1.2,
      }, 0.4);

      if (descRef.current) {
        tl.from(descRef.current, {
          opacity: 0, filter: "blur(8px)", y: 30, duration: 1, ease: "power3.out",
        }, "-=0.6");
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-oxford pb-28 pt-44 sm:pb-36 sm:pt-52">
      <Container>
        <p ref={eyebrowRef} className="mb-4 font-bebas text-sm uppercase tracking-[0.2em] text-mercury">
          About Us
        </p>
        <h1 ref={headlineRef} className="max-w-3xl text-4xl leading-tight text-platinum sm:text-5xl md:text-6xl lg:text-7xl" style={{ viewTransitionName: "page-title" }}>
          <span className="font-cormorant">Built on </span>
          <span className="font-bebas">EXPERTISE.</span>
          <br />
          <span className="font-cormorant">Driven by </span>
          <span className="font-playfair italic">Results.</span>
        </h1>
        <p ref={descRef} className="mt-6 max-w-xl font-body text-lg leading-relaxed text-mercury">
          Crestline &amp; Associates was founded with a simple conviction: real
          estate advisory should be transparent, analytical, and entirely
          aligned with our clients&apos; interests.
        </p>
      </Container>
    </section>
  );
}
