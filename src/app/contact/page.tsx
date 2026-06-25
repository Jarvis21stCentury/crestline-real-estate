import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Crestline & Associates for a consultation on your real estate needs.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-oxford pb-28 pt-44 sm:pb-36 sm:pt-52">
        <Container>
          <p className="mb-4 font-bebas text-sm uppercase tracking-[0.2em] text-mercury">
            Contact Us
          </p>
          <h1 className="max-w-3xl text-4xl leading-tight text-platinum sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="font-cormorant">Start the </span>
            <span className="font-playfair italic">Conversation.</span>
          </h1>
          <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-mercury">
            Whether you have a specific transaction in mind or want to explore
            your options, we&apos;re here to help.
          </p>
        </Container>
      </section>

      <section className="bg-bone py-32 sm:py-40">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h2 className="mb-8 font-cormorant text-2xl text-oxford">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>

            <div className="lg:col-span-2">
              <h2 className="mb-8 font-cormorant text-2xl text-oxford">
                Get in Touch
              </h2>

              <div className="space-y-8">
                <div>
                  <p className="font-bebas text-xs uppercase tracking-[0.2em] text-mercury">
                    Office
                  </p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-oxford/70">
                    {SITE.address}
                  </p>
                </div>

                <div>
                  <p className="font-bebas text-xs uppercase tracking-[0.2em] text-mercury">
                    Phone
                  </p>
                  <a
                    href={`tel:${SITE.phone}`}
                    className="mt-2 block font-body text-sm text-oxford/70 transition-colors duration-300 hover:text-oxford"
                  >
                    {SITE.phone}
                  </a>
                </div>

                <div>
                  <p className="font-bebas text-xs uppercase tracking-[0.2em] text-mercury">
                    Email
                  </p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="mt-2 block font-body text-sm text-oxford/70 transition-colors duration-300 hover:text-oxford"
                  >
                    {SITE.email}
                  </a>
                </div>

                <div>
                  <p className="font-bebas text-xs uppercase tracking-[0.2em] text-mercury">
                    Hours
                  </p>
                  <p className="mt-2 font-body text-sm text-oxford/70">
                    Monday – Friday: 8:00 AM – 6:00 PM
                  </p>
                  <p className="font-body text-sm text-oxford/70">
                    Saturday: By appointment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
