import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollFadeIn } from "@/components/ui/ScrollFadeIn";
import { Button } from "@/components/ui/Button";
import { WHO_WE_SERVE } from "@/lib/constants";

export function WhoWeServe() {
  return (
    <section className="bg-bone py-32 sm:py-40">
      <Container>
        <ScrollFadeIn>
          <SectionHeading
            eyebrow="Who We Serve"
            title={
              <>
                <span className="font-cormorant">Commercial </span>
                <span className="font-bebas">&amp; RESIDENTIAL</span>
                <span className="font-playfair italic"> Excellence</span>
              </>
            }
            description="Whether you're navigating a complex commercial transaction or seeking your ideal home, our dedicated teams bring institutional-grade expertise to every engagement."
          />
        </ScrollFadeIn>

        <div className="grid gap-8 md:grid-cols-2">
          {WHO_WE_SERVE.map((segment) => (
            <div
              key={segment.title}
              className="rounded-2xl border border-mercury/30 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-platinum sm:p-10"
            >
              <h3 className="font-cormorant text-2xl text-oxford">
                {segment.title}
              </h3>
              <p className="mt-4 font-body leading-relaxed text-oxford/60">
                {segment.description}
              </p>
              <ul className="mt-6 space-y-3">
                {segment.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 font-body text-sm text-oxford/70"
                  >
                    <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-mercury" />
                    {point}
                  </li>
                ))}
              </ul>
              <Button
                variant="secondary"
                href="/contact"
                className="mt-8 text-xs"
              >
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
