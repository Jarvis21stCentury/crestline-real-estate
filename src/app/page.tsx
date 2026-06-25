import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { WhoWeServe } from "@/components/home/WhoWeServe";
import { Testimonials } from "@/components/home/Testimonials";
import { Services } from "@/components/home/Services";
import { FAQ } from "@/components/home/FAQ";
import { CTASection } from "@/components/home/CTASection";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <WhoWeServe />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <FAQ />
      <CTASection />
    </>
  );
}
