"use client";

import { useState, useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ_ITEMS } from "@/lib/constants";

function FAQItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!contentRef.current || !iconRef.current) return;

      if (open) {
        gsap.to(contentRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power3.inOut",
        });
        gsap.to(iconRef.current, {
          rotation: 45,
          duration: 0.4,
          ease: "power3.out",
        });
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power3.inOut",
        });
        gsap.to(iconRef.current, {
          rotation: 0,
          duration: 0.4,
          ease: "power3.out",
        });
      }
    },
    { dependencies: [open] }
  );

  return (
    <div className="border-b border-mercury/30">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-6 text-left"
      >
        <span className="pr-8 font-cormorant text-lg text-oxford sm:text-xl">
          {question}
        </span>
        <span
          ref={iconRef}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-mercury/40 text-oxford/60"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="7" y1="1" x2="7" y2="13" />
            <line x1="1" y1="7" x2="13" y2="7" />
          </svg>
        </span>
      </button>
      <div ref={contentRef} className="h-0 overflow-hidden opacity-0">
        <p className="pb-6 font-body leading-relaxed text-oxford/60">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!listRef.current) return;

      const items = listRef.current.querySelectorAll<HTMLElement>("[data-faq-item]");
      gsap.from(items, {
        x: -50,
        opacity: 0,
        filter: "blur(6px)",
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: listRef }
  );

  return (
    <section className="bg-white py-32 sm:py-40">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              <span className="font-cormorant">Frequently Asked </span>
              <span className="font-bebas">QUESTIONS</span>
            </>
          }
        />

        <div ref={listRef}>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} data-faq-item>
              <FAQItem
                question={item.question}
                answer={item.answer}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
