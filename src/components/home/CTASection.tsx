import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollFadeIn } from "@/components/ui/ScrollFadeIn";

export function CTASection() {
  return (
    <section className="bg-oxford py-32 sm:py-40">
      <Container className="text-center">
        <ScrollFadeIn>
          <p className="mb-4 font-bebas text-sm uppercase tracking-[0.2em] text-mercury">
            Ready to Get Started?
          </p>
          <h2 className="mx-auto max-w-3xl text-4xl text-white sm:text-5xl md:text-6xl">
            <span className="font-cormorant">Let&apos;s Build Your </span>
            <span className="font-playfair italic">Strategy </span>
            <span className="font-bebas">TOGETHER.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed text-mercury">
            Schedule a discovery session with our team. We&apos;ll discuss your
            goals, timeline, and how Crestline can deliver exceptional results.
          </p>
        </ScrollFadeIn>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="cta" href="/contact">
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
