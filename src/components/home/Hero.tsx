"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center">
      <div className="absolute inset-0 hero-gradient-animate" />

      <Container className="relative z-10 py-32">
        <div className="max-w-4xl">
          <p className="mb-6 font-bebas text-sm uppercase tracking-[0.2em] text-mercury">
            {SITE.market}
          </p>

          <h1 className="text-5xl leading-none text-platinum sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="font-cormorant">Your Next </span>
            <span className="font-bebas">DEAL.</span>
            <br />
            <span className="font-cormorant italic">Our </span>
            <span className="font-bebas">EXPERTISE.</span>
          </h1>

          <p className="mt-8 max-w-xl font-body text-lg leading-relaxed text-mercury">
            Strategic advisory for commercial and residential real estate.
            Data-driven. Results-proven.
          </p>

          <div className="mt-10">
            <Button variant="cta" href="/contact">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-oxford to-transparent" />
    </section>
  );
}
