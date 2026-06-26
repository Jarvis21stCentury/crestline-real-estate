import type { Metadata } from "next";
import { ViewTransition } from "react";
import {
  fontCormorant,
  fontBebas,
  fontDmSerif,
  fontBody,
  fontPlayfair,
} from "@/styles/fonts";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Preloader } from "@/components/ui/Preloader";
import { SITE } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontCormorant.variable} ${fontBebas.variable} ${fontDmSerif.variable} ${fontBody.variable} ${fontPlayfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Preloader />
        <SmoothScrollProvider>
          <ScrollProgress />
          <CustomCursor />
          <Nav />
          <main className="relative z-10 flex flex-1 flex-col">
            <ViewTransition>{children}</ViewTransition>
          </main>
          <div className="sticky bottom-0 z-0">
            <Footer />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
