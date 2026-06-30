"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { HeroCanvas } from "@/components/home/HeroCanvas";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap-init";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!headlineRef.current || !sectionRef.current) return;

      const split = SplitText.create(headlineRef.current, {
        type: "chars,words",
      });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Eyebrow — clip-path wipe
      tl.fromTo(
        eyebrowRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.9, ease: "power2.out" },
        0.2
      );

      // Headline chars — blur-in reveal
      tl.from(
        split.chars,
        {
          y: 80,
          opacity: 0,
          filter: "blur(12px)",
          stagger: 0.025,
          duration: 1.2,
        },
        0.4
      );

      // Subtitle — blur fade
      tl.from(
        subtitleRef.current,
        { opacity: 0, filter: "blur(8px)", y: 30, duration: 1, ease: "power3.out" },
        "-=0.6"
      );

      // CTA — slide up
      tl.from(
        ctaRef.current,
        { opacity: 0, y: 40, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

      // Scroll-scrub exit: content parallaxes up, canvas scales
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        animation: gsap
          .timeline()
          .to(contentRef.current, { y: -120, opacity: 0, ease: "none" }, 0)
          .to(
            canvasWrapRef.current,
            { scale: 1.15, opacity: 0.3, ease: "none" },
            0
          ),
      });

      return () => split.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto w-full min-h-screen overflow-hidden bg-oxford
        flex items-center justify-center text-center px-6 md:px-8"
    >
      <div className="absolute inset-0 hero-gradient-animate" />

      <div ref={canvasWrapRef} className="absolute inset-0">
        <HeroCanvas />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 z-[2] h-[600px] w-full opacity-[0.06]
          bg-[linear-gradient(to_right,#C8CCD1_1px,transparent_1px),linear-gradient(to_bottom,#C8CCD1_1px,transparent_1px)]
          bg-[size:6rem_5rem]
          [mask-image:radial-gradient(ellipse_60%_40%_at_50%_0%,#000_60%,transparent_100%)]"
      />

      {/* Radial glow at bottom */}
      <div
        className="absolute left-1/2 top-[calc(100%-80px)] lg:top-[calc(100%-140px)]
          h-[500px] w-[700px] md:h-[550px] md:w-[1100px] lg:h-[700px] lg:w-[140%]
          -translate-x-1/2 rounded-[100%]
          bg-[radial-gradient(closest-side,#0E1A36_80%,#1a2d52)]
          animate-float z-[2]"
      />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-4xl">
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className="mb-10 font-bebas text-xs uppercase tracking-[0.3em] text-mercury/60"
        >
          {SITE.market}
        </p>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-5xl leading-[0.9] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl
            text-white tracking-tighter"
          style={{ viewTransitionName: "page-title" }}
        >
          <span className="font-cormorant">Your Next </span>
          <span className="font-bebas">DEAL.</span>
          <br />
          <span className="font-cormorant italic">Our </span>
          <span className="font-bebas">EXPERTISE.</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-8 max-w-lg mx-auto font-body text-base leading-relaxed
            text-platinum/50 md:text-lg"
        >
          Strategic advisory for commercial and residential real estate.
          Data-driven. Results-proven.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="mt-12">
          <Button variant="cta" href="/contact" transitionType="circle-wipe">
            Schedule Consultation
          </Button>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-48 z-20
          bg-[linear-gradient(to_top,#0E1A36_15%,transparent)]"
      />
    </section>
  );
}
