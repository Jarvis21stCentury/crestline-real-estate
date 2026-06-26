"use client";

import { useState, useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap-init";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedDivider } from "@/components/ui/AnimatedDivider";
import { ToolsHeroCanvas } from "@/components/tools/ToolsHeroCanvas";
import { MortgageCalculator } from "@/components/tools/MortgageCalculator";
import { AffordabilityCalculator } from "@/components/tools/AffordabilityCalculator";
import { RentVsBuyCalculator } from "@/components/tools/RentVsBuyCalculator";

const TABS = [
  { id: "mortgage", label: "Mortgage Calculator" },
  { id: "affordability", label: "Affordability" },
  { id: "rent-vs-buy", label: "Rent vs. Buy" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("mortgage");
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

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
    { scope: headerRef }
  );

  const updateIndicator = useCallback(() => {
    const activeIndex = TABS.findIndex((t) => t.id === activeTab);
    const activeButton = tabRefs.current[activeIndex];
    if (activeButton && indicatorRef.current && tabsContainerRef.current) {
      const containerRect = tabsContainerRef.current.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      gsap.to(indicatorRef.current, {
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, [activeTab]);

  useGSAP(
    () => {
      updateIndicator();
    },
    { dependencies: [activeTab] }
  );

  useGSAP(
    () => {
      if (!contentRef.current) return;
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 20,
        filter: "blur(4px)",
        duration: 0.5,
        ease: "power3.out",
      });
    },
    { dependencies: [activeTab] }
  );

  return (
    <>
      <section ref={headerRef} className="relative overflow-hidden bg-oxford pb-28 pt-44 sm:pb-36 sm:pt-52">
        <div className="absolute inset-0 opacity-20">
          <ToolsHeroCanvas />
        </div>
        <div className="hero-gradient-animate absolute inset-0 opacity-30" />
        <Container className="relative z-10">
          <p ref={eyebrowRef} className="mb-4 font-bebas text-sm uppercase tracking-[0.2em] text-mercury">
            Financial Tools
          </p>
          <h1 ref={headlineRef} className="max-w-3xl text-4xl leading-tight text-platinum sm:text-5xl md:text-6xl lg:text-7xl" style={{ viewTransitionName: "page-title" }}>
            <span className="font-cormorant">Make </span>
            <span className="font-bebas">INFORMED</span>
            <span className="font-cormorant italic"> Decisions</span>
          </h1>
          <p ref={descRef} className="mt-6 max-w-xl font-body text-lg leading-relaxed text-mercury">
            Use our interactive calculators to explore financing scenarios,
            determine affordability, and compare the economics of renting
            versus buying.
          </p>
        </Container>
      </section>

      <AnimatedDivider />

      <ScrollReveal animation="fade-up">
        <section className="bg-bone py-24 sm:py-32">
          <Container>
            <div ref={tabsContainerRef} className="relative mb-10 flex flex-wrap gap-2 pb-4">
              {TABS.map((tab, index) => (
                <button
                  key={tab.id}
                  ref={(el) => { tabRefs.current[index] = el; }}
                  onClick={() => setActiveTab(tab.id)}
                  data-cursor
                  className={cn(
                    "relative rounded-full px-5 py-2.5 font-bebas text-sm uppercase tracking-[0.1em] transition-all duration-300",
                    activeTab === tab.id
                      ? "bg-oxford text-white shadow-[0_4px_12px_rgba(14,26,54,0.2)]"
                      : "text-oxford/60 hover:bg-oxford/5 hover:text-oxford"
                  )}
                >
                  {activeTab === tab.id && (
                    <span className="absolute inset-0 rounded-full bg-oxford/5 animate-pulse" />
                  )}
                  <span className="relative">{tab.label}</span>
                </button>
              ))}
              <div
                ref={indicatorRef}
                className="absolute bottom-0 h-[2px] rounded-full bg-oxford"
                style={{ left: 0, width: 0 }}
              />
            </div>

            <div ref={contentRef} key={activeTab}>
              {activeTab === "mortgage" && <MortgageCalculator />}
              {activeTab === "affordability" && <AffordabilityCalculator />}
              {activeTab === "rent-vs-buy" && <RentVsBuyCalculator />}
            </div>
          </Container>
        </section>
      </ScrollReveal>
    </>
  );
}
