"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import { ImageDistortion } from "@/components/ui/ImageDistortion";
import { TiltCard } from "@/components/ui/TiltCard";

const GALLERY_ITEMS = [
  {
    src: "/images/architecture.jpg",
    title: "Modern Architecture",
    subtitle: "Design Excellence",
  },
  {
    src: "/images/city-aerial.jpg",
    title: "Urban Developments",
    subtitle: "Strategic Locations",
  },
  {
    src: "/images/commercial.jpg",
    title: "Commercial Spaces",
    subtitle: "Investment Grade",
  },
  {
    src: "/images/office-interior.jpg",
    title: "Premium Interiors",
    subtitle: "Crafted Details",
  },
  {
    src: "/images/residential.jpg",
    title: "Luxury Residences",
    subtitle: "Refined Living",
  },
];

export function PropertyGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const scrollWidth = track.scrollWidth - track.offsetWidth;

      if (scrollWidth <= 0) return;

      const horizontalTween = gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      const cards = track.querySelectorAll<HTMLElement>("[data-gallery-card]");
      cards.forEach((card) => {
        gsap.from(card, {
          scale: 0.85,
          opacity: 0,
          y: 30,
          filter: "blur(4px)",
          duration: 0.8,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalTween,
            start: "left 85%",
            toggleActions: "play none none none",
          },
        });

        gsap.fromTo(
          card,
          { filter: "grayscale(1) brightness(0.7)" },
          {
            filter: "grayscale(0) brightness(1)",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left 80%",
              end: "left 30%",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative bg-oxford overflow-hidden">
      <div
        ref={trackRef}
        className="flex items-center gap-8 px-8 py-32 sm:py-40 md:gap-12 md:px-16"
        style={{ width: "fit-content" }}
      >
        {/* Heading card */}
        <div className="flex w-[300px] shrink-0 flex-col justify-center md:w-[400px]">
          <p className="font-bebas text-xs uppercase tracking-[0.3em] text-mercury/60">
            Portfolio
          </p>
          <h2 className="mt-4 text-4xl text-white sm:text-5xl md:text-6xl">
            <span className="font-cormorant">Featured </span>
            <span className="font-bebas">PROPERTIES</span>
          </h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-platinum/50">
            A curated selection of our most exceptional engagements.
          </p>
        </div>

        {/* Gallery cards */}
        {GALLERY_ITEMS.map((item) => (
          <TiltCard
            key={item.title}
            glare
            className="group relative h-[60vh] w-[350px] shrink-0 overflow-hidden rounded-2xl md:h-[70vh] md:w-[450px]"
          >
          <div
            data-gallery-card
            data-skew
            className="h-full w-full"
          >
            <ImageDistortion
              src={item.src}
              alt={item.title}
              className="h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-oxford/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="font-bebas text-xs uppercase tracking-[0.2em] text-platinum/60">
                {item.subtitle}
              </p>
              <h3 className="mt-1 font-cormorant text-2xl text-white">
                {item.title}
              </h3>
            </div>
          </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
