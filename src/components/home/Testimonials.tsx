import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollFadeIn } from "@/components/ui/ScrollFadeIn";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <section className="bg-white py-32 sm:py-40">
      <Container>
        <ScrollFadeIn>
          <SectionHeading
            eyebrow="Client Testimonials"
            title={
              <>
                <span className="font-cormorant">Trusted by </span>
                <span className="font-playfair italic">Industry Leaders</span>
              </>
            }
          />
        </ScrollFadeIn>

        <div className="grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-2xl border border-mercury/30 bg-bone/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-platinum sm:p-10"
            >
              <span className="font-dm-serif text-5xl leading-none text-mercury/50">
                &ldquo;
              </span>
              <p className="mt-2 font-dm-serif text-xl italic leading-snug text-oxford/80 sm:text-2xl lg:text-3xl">
                {testimonial.quote}
              </p>
              <div className="mt-6 border-t border-mercury/30 pt-6">
                <p className="font-bebas text-sm uppercase tracking-[0.1em] text-oxford">
                  {testimonial.name}
                </p>
                <p className="mt-1 font-body text-sm text-oxford/50">
                  {testimonial.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
