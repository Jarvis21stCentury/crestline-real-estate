import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollFadeIn } from "@/components/ui/ScrollFadeIn";
import { VALUES } from "@/lib/constants";

export function ValuesSection() {
  return (
    <section className="bg-white py-32 sm:py-40">
      <Container>
        <ScrollFadeIn>
          <SectionHeading
            eyebrow="Our Values"
            title={
              <>
                <span className="font-cormorant">What </span>
                <span className="font-bebas">DRIVES</span>
                <span className="font-cormorant italic"> Us</span>
              </>
            }
            description="Four principles guide every decision we make and every engagement we take on."
          />
        </ScrollFadeIn>

        <div className="grid gap-8 sm:grid-cols-2">
          {VALUES.map((value, i) => (
            <div key={value.title} className="flex gap-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-mercury/40">
                <span className="font-bebas text-sm text-oxford/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <h3 className="font-cormorant text-xl text-oxford">
                  {value.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-oxford/60">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
