import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { WhoWeServe } from "@/components/home/WhoWeServe";
import { PropertyGallery } from "@/components/home/PropertyGallery";
import { Testimonials } from "@/components/home/Testimonials";
import { Services } from "@/components/home/Services";
import { FAQ } from "@/components/home/FAQ";
import { CTASection } from "@/components/home/CTASection";
import { AnimatedDivider } from "@/components/ui/AnimatedDivider";
import { Marquee } from "@/components/ui/Marquee";

const MARQUEE_ITEMS = [
  "$3.2B+ Transaction Volume",
  "200+ Active Clients",
  "25+ Years Experience",
  "97% Client Retention",
  "CCIM Certified",
  "SIOR Member",
  "Top 1% Bay Area",
  "LEED AP Accredited",
];

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <WhoWeServe />
      <Marquee items={MARQUEE_ITEMS} />
      <AnimatedDivider from="bone" to="oxford" />
      <PropertyGallery />
      <Testimonials />
      <AnimatedDivider from="white" to="bone" />
      <Services />
      <AnimatedDivider from="bone" to="white" />
      <FAQ />
      <CTASection />
    </>
  );
}
