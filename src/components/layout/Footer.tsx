import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SITE, NAV_LINKS, SERVICES } from "@/lib/constants";

const serviceLinks = SERVICES.slice(0, 4).map((s) => s.title);

export function Footer() {
  return (
    <footer className="bg-oxford">
      <Container className="py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="font-cormorant text-xl font-bold text-platinum">
              {SITE.name}
            </Link>
            <p className="mt-4 font-body text-sm leading-relaxed text-platinum/60">
              {SITE.description}
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-bebas text-sm uppercase tracking-[0.2em] text-mercury">
              Navigation
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-platinum/60 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
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

          <div>
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

        <div className="mt-16 border-t border-mercury/20 pt-8 text-center">
          <p className="font-body text-xs text-platinum/40">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
            This is a demonstration website with placeholder content.
          </p>
        </div>
      </Container>
    </footer>
  );
}
