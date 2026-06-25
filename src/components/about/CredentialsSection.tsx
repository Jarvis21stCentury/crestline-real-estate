import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollFadeIn } from "@/components/ui/ScrollFadeIn";

const CREDENTIALS = [
  { label: "CCIM Institute", type: "Affiliation" },
  { label: "SIOR", type: "Affiliation" },
  { label: "National Association of Realtors", type: "Membership" },
  { label: "Urban Land Institute", type: "Membership" },
  { label: "LEED Accredited Professionals", type: "Certification" },
  { label: "California DRE Licensed Brokers", type: "License" },
];

export function CredentialsSection() {
  return (
    <section className="bg-oxford py-32 sm:py-40">
      <Container>
        <ScrollFadeIn>
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
        </ScrollFadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CREDENTIALS.map((cred) => (
            <div
              key={cred.label}
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
