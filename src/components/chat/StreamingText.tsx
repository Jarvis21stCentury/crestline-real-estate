"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-init";

interface StreamingTextProps {
  text: string;
  isStreaming: boolean;
}

export function StreamingText({ text, isStreaming }: StreamingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animatedCountRef = useRef(0);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const words = text.split(/(\s+)/).filter(Boolean);

  useEffect(() => {
    if (!containerRef.current) return;

    const spans = containerRef.current.querySelectorAll<HTMLSpanElement>("[data-word]");
    const newStart = animatedCountRef.current;
    const newSpans = Array.from(spans).slice(newStart);

    if (newSpans.length > 0) {
      const toAnimate = newSpans.slice(-20);

      toAnimate.forEach((span) => {
        gsap.from(span, {
          opacity: 0,
          filter: "blur(4px)",
          y: 6,
          duration: 0.25,
          ease: "power2.out",
        });
      });

      animatedCountRef.current = spans.length;
    }
  }, [text]);

  useEffect(() => {
    if (!isStreaming && cursorRef.current) {
      gsap.to(cursorRef.current, { opacity: 0, duration: 0.3 });
    }
  }, [isStreaming]);

  return (
    <div ref={containerRef} className="inline">
      {words.map((word, i) =>
        /^\s+$/.test(word) ? (
          <span key={i}>{word}</span>
        ) : (
          <span key={i} data-word className="inline-block">
            {word}
          </span>
        )
      )}
      {isStreaming && (
        <span
          ref={cursorRef}
          className="ml-0.5 inline-block animate-pulse font-body text-oxford/50"
        >
          |
        </span>
      )}
    </div>
  );
}
