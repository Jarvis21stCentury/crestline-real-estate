"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import { Container } from "@/components/ui/Container";
import { MagneticElement } from "@/components/ui/MagneticElement";
import { SITE, NAV_LINKS, SERVICES } from "@/lib/constants";

const serviceLinks = SERVICES.slice(0, 4).map((s) => s.title);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!footerRef.current) return;

      const cols = footerRef.current.querySelectorAll<HTMLElement>("[data-footer-col]");
      const copyright = footerRef.current.querySelector("[data-footer-copyright]");

      gsap.from(cols, {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      if (borderRef.current) {
        gsap.from(borderRef.current, {
          scaleX: 0,
          duration: 1.2,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: borderRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        });
      }

      if (copyright) {
        gsap.from(copyright, {
          opacity: 0,
          y: 10,
          duration: 0.6,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: copyright,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        });
      }
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="bg-oxford">
      <Container className="py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div data-footer-col className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="font-cormorant text-xl font-bold text-platinum">
              {SITE.name}
            </Link>
            <p className="mt-4 font-body text-sm leading-relaxed text-platinum/60">
              {SITE.description}
            </p>
          </div>

          <div data-footer-col>
            <h4 className="mb-4 font-bebas text-sm uppercase tracking-[0.2em] text-mercury">
              Navigation
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <MagneticElement strength={0.15} radius={60}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-platinum/60 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </MagneticElement>
                </li>
              ))}
            </ul>
          </div>

          <div data-footer-col>
            <h4 className="mb-4 font-bebas text-sm uppercase tracking-[0.2em] text-mercury">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <span className="font-body text-sm text-platinum/60">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-footer-col>
            <h4 className="mb-4 font-bebas text-sm uppercase tracking-[0.2em] text-mercury">
              Contact
            </h4>
            <ul className="space-y-3 font-body text-sm text-platinum/60">
              <li>{SITE.address}</li>
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="transition-colors duration-300 hover:text-white"
                >
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors duration-300 hover:text-white"
                >
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div ref={borderRef} className="mt-16 origin-center border-t border-mercury/20 pt-8 text-center">
          <p data-footer-copyright className="font-body text-xs text-platinum/40">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
            This is a demonstration website with placeholder content.
          </p>
        </div>
      </Container>
    </footer>
  );
}
