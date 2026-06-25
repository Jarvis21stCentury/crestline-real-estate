import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollFadeIn } from "@/components/ui/ScrollFadeIn";
import { TEAM } from "@/lib/constants";

export function TeamSection() {
  return (
    <section className="bg-bone py-32 sm:py-40">
      <Container>
        <ScrollFadeIn>
          <SectionHeading
            eyebrow="Our Team"
            title={
              <>
                <span className="font-cormorant">Leadership You Can </span>
                <span className="font-playfair italic">Trust</span>
              </>
            }
            description="Our principals bring decades of institutional real estate experience to every client engagement."
          />
        </ScrollFadeIn>

        <div className="grid gap-8 md:grid-cols-3">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl border border-mercury/30 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-platinum sm:p-10"
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-oxford">
                <span className="font-cormorant text-2xl font-bold text-white">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>

              <h3 className="font-cormorant text-xl text-oxford">
                {member.name}
              </h3>
              <p className="mt-1 font-bebas text-sm uppercase tracking-[0.15em] text-mercury">
                {member.title}
              </p>
              <p className="mt-4 font-body text-sm leading-relaxed text-oxford/60">
                {member.bio}
              </p>

              <div className="mt-6 border-t border-mercury/30 pt-6">
                <ul className="space-y-2">
                  {member.credentials.map((cred) => (
                    <li
                      key={cred}
                      className="flex items-start gap-2 font-body text-xs text-oxford/50"
                    >
                      <span className="mt-1 block h-1 w-1 shrink-0 rounded-full bg-mercury" />
                      {cred}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
