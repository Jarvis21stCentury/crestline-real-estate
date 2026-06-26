"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-init";
import { cn } from "@/lib/utils";
import { SITE, NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { MagneticElement } from "@/components/ui/MagneticElement";

const DARK_CLASSES = ["bg-oxford", "bg-oxford/", "bg-[linear-gradient"];

function isSectionDark(el: Element): boolean {
  const cls = el.className;
  if (typeof cls !== "string") return false;
  return DARK_CLASSES.some((dc) => cls.includes(dc));
}

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(true);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const desktopLinksRef = useRef<HTMLDivElement>(null);

  const detectBackground = useCallback(() => {
    const checkY = 60;

    const sections = document.querySelectorAll("main section, main > div");
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= checkY && rect.bottom > checkY) {
        setIsDarkBg(isSectionDark(section));
        return;
      }
    }

    const main = document.querySelector("main");
    if (main && main.firstElementChild) {
      const firstChild = main.firstElementChild;
      const rect = firstChild.getBoundingClientRect();
      if (rect.top <= checkY && rect.bottom > checkY) {
        setIsDarkBg(isSectionDark(firstChild));
        return;
      }
      const innerSection = firstChild.querySelector("section");
      if (innerSection) {
        setIsDarkBg(isSectionDark(innerSection));
        return;
      }
    }

    const darkPages = ["/", "/about", "/contact", "/tools"];
    setIsDarkBg(darkPages.includes(pathname));
  }, [pathname]);

  useEffect(() => {
    detectBackground();
    requestAnimationFrame(() => detectBackground());
    const t = setTimeout(() => detectBackground(), 200);

    const onScroll = () => detectBackground();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, [detectBackground, pathname]);

  useEffect(() => {
    setMobileOpen(false);
    requestAnimationFrame(() => {
      detectBackground();
      setTimeout(() => detectBackground(), 150);
    });
  }, [pathname, detectBackground]);

  // Progressive blur on scroll
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const onScroll = () => {
      const progress = Math.min(window.scrollY / 300, 1);
      header.style.paddingTop = `${12 - progress * 4}px`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animate mobile overlay with GSAP
  useGSAP(
    () => {
      if (!overlayRef.current || !menuItemsRef.current) return;

      const items = menuItemsRef.current.querySelectorAll("[data-menu-item]");

      if (mobileOpen) {
        gsap.to(overlayRef.current, {
          clipPath: "circle(150% at 95% 3%)",
          duration: 0.8,
          ease: "power4.inOut",
        });
        gsap.from(items, {
          y: 40,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.3,
        });
      } else {
        gsap.to(overlayRef.current, {
          clipPath: "circle(0% at 95% 3%)",
          duration: 0.6,
          ease: "power4.inOut",
        });
      }
    },
    { dependencies: [mobileOpen] }
  );

  // Desktop hover indicator
  useEffect(() => {
    const container = desktopLinksRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator) return;

    const canHover = window.matchMedia("(hover: hover)").matches;
    if (!canHover) return;

    const links = container.querySelectorAll<HTMLElement>("a");

    const moveIndicator = (el: HTMLElement) => {
      const containerRect = container.getBoundingClientRect();
      const linkRect = el.getBoundingClientRect();
      gsap.to(indicator, {
        x: linkRect.left - containerRect.left,
        width: linkRect.width,
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const hideIndicator = () => {
      gsap.to(indicator, { opacity: 0, duration: 0.2 });
    };

    links.forEach((link) => {
      link.addEventListener("mouseenter", () => moveIndicator(link));
    });
    container.addEventListener("mouseleave", hideIndicator);

    return () => {
      links.forEach((link) => {
        link.removeEventListener("mouseenter", () => moveIndicator(link));
      });
      container.removeEventListener("mouseleave", hideIndicator);
    };
  }, []);

  const navOrder = NAV_LINKS.map((l) => l.href);
  const currentIndex = navOrder.indexOf(pathname);
  const getTransitionType = (targetHref: string) => {
    const targetIndex = navOrder.indexOf(targetHref);
    if (targetIndex === currentIndex) return undefined;
    return targetIndex > currentIndex ? "slide-forward" : "slide-back";
  };

  const light = isDarkBg;

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 sm:px-6 transition-[padding] duration-100" style={{ viewTransitionName: "site-header" }}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "rounded-full border px-5 py-2.5 transition-all duration-300 backdrop-blur-lg",
            light
              ? "bg-oxford/60 border-white/[0.1]"
              : "bg-white/60 border-oxford/[0.06] shadow-[0_1px_12px_rgba(0,0,0,0.04)]"
          )}
        >
          <span
            className={cn(
              "font-cormorant text-lg font-bold sm:text-xl transition-colors duration-300",
              light ? "text-white" : "text-oxford"
            )}
          >
            {SITE.name}
          </span>
        </Link>

        {/* Desktop Links */}
        <div
          ref={desktopLinksRef}
          className={cn(
            "relative hidden items-center gap-1 rounded-full border px-2 py-1.5 transition-all duration-300 backdrop-blur-lg lg:flex",
            light
              ? "bg-oxford/60 border-white/[0.1]"
              : "bg-white/60 border-oxford/[0.06] shadow-[0_1px_12px_rgba(0,0,0,0.04)]"
          )}
        >
          {/* Hover indicator */}
          <div
            ref={indicatorRef}
            className={cn(
              "absolute top-1.5 left-0 h-[calc(100%-12px)] rounded-full opacity-0 pointer-events-none",
              light ? "bg-white/[0.1]" : "bg-oxford/[0.06]"
            )}
          />

          {NAV_LINKS.map((link) => {
            const tt = getTransitionType(link.href);
            return (
              <MagneticElement key={link.href} strength={0.2} radius={80}>
                <Link
                  href={link.href}
                  {...(tt ? { transitionTypes: [tt] } : {})}
                  onClick={() => {
                    const sp = Math.min(window.scrollY / document.documentElement.scrollHeight, 1);
                    document.documentElement.style.setProperty("--scroll-progress", String(sp.toFixed(2)));
                  }}
                  className={cn(
                    "relative z-10 block rounded-full px-4 py-2 font-body text-sm tracking-[0.05em] transition-colors duration-300 [font-variant:small-caps]",
                    light
                      ? pathname === link.href
                        ? "bg-white/[0.14] text-white"
                        : "text-white/70 hover:text-white"
                      : pathname === link.href
                        ? "bg-oxford/[0.08] text-oxford"
                        : "text-oxford/60 hover:text-oxford"
                  )}
                >
                  {link.label}
                </Link>
              </MagneticElement>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button
            variant={light ? "cta" : "primary"}
            href="/contact"
            className="text-xs"
          >
            Get a Consultation
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn(
            "flex flex-col gap-1.5 rounded-full border p-3 transition-all duration-300 backdrop-blur-lg lg:hidden",
            light
              ? "bg-oxford/60 border-white/[0.1]"
              : "bg-white/60 border-oxford/[0.06]"
          )}
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              "block h-0.5 w-5 transition-all duration-300",
              light ? "bg-white" : "bg-oxford",
              mobileOpen && "translate-y-[7px] rotate-45"
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 transition-all duration-300",
              light ? "bg-white" : "bg-oxford",
              mobileOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 transition-all duration-300",
              light ? "bg-white" : "bg-oxford",
              mobileOpen && "-translate-y-[7px] -rotate-45"
            )}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay — GSAP clip-path reveal */}
      <div
        ref={overlayRef}
        className="fixed inset-0 top-0 z-40 bg-oxford/95 backdrop-blur-xl lg:hidden"
        style={{ clipPath: "circle(0% at 95% 3%)" }}
      >
        <div ref={menuItemsRef} className="flex h-full flex-col items-center justify-center gap-6">
          {NAV_LINKS.map((link) => (
            <div key={link.href} data-menu-item>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-full px-8 py-3 font-cormorant text-2xl transition-all duration-300",
                  pathname === link.href
                    ? "bg-white/15 text-white"
                    : "text-platinum/70 hover:bg-white/10 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            </div>
          ))}
          <div className="mt-4" data-menu-item>
            <Button variant="cta" href="/contact">
              Get a Consultation
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
