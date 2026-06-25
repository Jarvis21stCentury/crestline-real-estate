import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { TeamSection } from "@/components/about/TeamSection";
import { ValuesSection } from "@/components/about/ValuesSection";
import { CredentialsSection } from "@/components/about/CredentialsSection";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the Crestline & Associates team — experienced real estate advisors serving the Greater Bay Area.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-oxford pb-28 pt-44 sm:pb-36 sm:pt-52">
        <Container>
          <p className="mb-4 font-bebas text-sm uppercase tracking-[0.2em] text-mercury">
            About Us
          </p>
          <h1 className="max-w-3xl text-4xl leading-tight text-platinum sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="font-cormorant">Built on </span>
            <span className="font-bebas">EXPERTISE.</span>
            <br />
            <span className="font-cormorant">Driven by </span>
            <span className="font-playfair italic">Results.</span>
          </h1>
          <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-mercury">
            Crestline &amp; Associates was founded with a simple conviction: real
            estate advisory should be transparent, analytical, and entirely
            aligned with our clients&apos; interests.
          </p>
        </Container>
      </section>

      <TeamSection />
      <ValuesSection />
      <CredentialsSection />
      <CTASection />
    </>
  );
}
