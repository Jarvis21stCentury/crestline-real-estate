"use client";

import { useState, useRef, useEffect } from "react";
import { gsap, SplitText } from "@/lib/gsap-init";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const alreadyShown = sessionStorage.getItem("preloader-shown");
    if (alreadyShown) {
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const split = SplitText.create(textRef.current!, { type: "chars" });

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("preloader-shown", "1");
        document.body.style.overflow = "";
        setVisible(false);
        split.revert();
      },
    });

    tl.from(split.chars, {
      y: 40,
      opacity: 0,
      filter: "blur(8px)",
      stagger: 0.03,
      duration: 1,
      ease: "power4.out",
    });

    tl.fromTo(
      barRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.8, ease: "power2.inOut" },
      0
    );

    const waitForFonts = Promise.all([
      document.fonts.ready,
      new Promise((r) => setTimeout(r, 2200)),
    ]);

    waitForFonts.then(() => {
      tl.to(overlayRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.8,
        ease: "power4.inOut",
        delay: 0.2,
      });
    });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-oxford"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      <h2
        ref={textRef}
        className="font-cormorant text-3xl font-bold tracking-tight text-platinum sm:text-4xl md:text-5xl"
      >
        Crestline & Associates
      </h2>
      <div className="mt-8 h-[1px] w-48 overflow-hidden bg-white/10">
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-platinum/60"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
