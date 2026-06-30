"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const CREDENTIALS = [
  { label: "CCIM Institute", type: "Affiliation" },
  { label: "SIOR", type: "Affiliation" },
  { label: "National Association of Realtors", type: "Membership" },
  { label: "Urban Land Institute", type: "Membership" },
  { label: "LEED Accredited Professionals", type: "Certification" },
  { label: "California DRE Licensed Brokers", type: "License" },
];

export function CredentialsSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll<HTMLElement>("[data-cred-card]");

      gsap.from(cards, {
        opacity: 0,
        y: 40,
        filter: "blur(10px)",
        stagger: { from: "center", each: 0.1 },
        duration: 1,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: gridRef }
  );

  return (
    <section className="bg-oxford py-32 sm:py-40">
      <Container>
        <SectionHeading
          eyebrow="Credentials & Affiliations"
          title={
            <>
              <span className="font-cormorant">Recognized </span>
              <span className="font-bebas">EXPERTISE</span>
            </>
          }
          description="Our team holds the industry's most respected designations and maintains active memberships in leading professional organizations."
          dark
        />

        <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CREDENTIALS.map((cred) => (
            <div
              key={cred.label}
              data-cred-card
              className="rounded-2xl border border-mercury/10 bg-oxford-light p-6 transition-all duration-300 hover:border-mercury/30"
            >
              <p className="font-bebas text-xs uppercase tracking-[0.15em] text-mercury/60">
                {cred.type}
              </p>
              <p className="mt-2 font-body font-bold text-platinum">
                {cred.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
