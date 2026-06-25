import { Container } from "@/components/ui/Container";
import { STATS } from "@/lib/constants";

export function Stats() {
  return (
    <section className="bg-oxford py-32 sm:py-40">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-bebas text-5xl text-platinum sm:text-6xl md:text-7xl">
                {stat.value}
              </p>
              <p className="mt-3 font-body text-xs uppercase tracking-[0.15em] text-mercury [font-variant:small-caps]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
