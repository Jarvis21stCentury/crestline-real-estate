import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollFadeIn } from "@/components/ui/ScrollFadeIn";
import { SERVICES } from "@/lib/constants";

export function Services() {
  return (
    <section className="bg-bone py-32 sm:py-40">
      <Container>
        <ScrollFadeIn>
          <SectionHeading
            eyebrow="Our Services"
            title={
              <>
                <span className="font-bebas">FULL-SPECTRUM </span>
                <span className="font-cormorant italic">Real Estate Advisory</span>
              </>
            }
            description="From acquisitions to asset management, our services span the entire real estate lifecycle."
          />
        </ScrollFadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-mercury/30 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-platinum"
            >
              <h3 className="font-cormorant text-xl text-oxford">
                {service.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-oxford/60">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
