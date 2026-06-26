import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
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
      <AboutHero />
      <TeamSection />
      <ValuesSection />
      <CredentialsSection />
      <CTASection />
    </>
  );
}
