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

// Injected at runtime (not via globals.css) because Turbopack's CSS parser
// in this Next.js version cannot parse the `:active-view-transition-type()`
// pseudo-class, even though it's valid spec-compliant syntax that browsers
// support. A plain <style> tag's contents aren't run through that parser.
const VIEW_TRANSITION_TYPE_CSS = `
@supports (view-transition-name: none) {
  ::view-transition-old(root):active-view-transition-type(slide-forward) {
    animation: 500ms cubic-bezier(0.22, 1, 0.36, 1) both vt-slide-out-left;
  }
  ::view-transition-new(root):active-view-transition-type(slide-forward) {
    animation: 500ms cubic-bezier(0.22, 1, 0.36, 1) both vt-slide-in-right;
  }
  ::view-transition-old(root):active-view-transition-type(slide-back) {
    animation: 500ms cubic-bezier(0.22, 1, 0.36, 1) both vt-slide-out-right;
  }
  ::view-transition-new(root):active-view-transition-type(slide-back) {
    animation: 500ms cubic-bezier(0.22, 1, 0.36, 1) both vt-slide-in-left;
  }
  ::view-transition-old(root):active-view-transition-type(circle-wipe) {
    animation: 600ms cubic-bezier(0.22, 1, 0.36, 1) both vt-page-exit;
    z-index: 1;
  }
  ::view-transition-new(root):active-view-transition-type(circle-wipe) {
    animation: 600ms cubic-bezier(0.22, 1, 0.36, 1) both vt-circle-in;
    z-index: 2;
  }
  ::view-transition-old(root):active-view-transition-type(curtain) {
    animation: 700ms cubic-bezier(0.77, 0, 0.175, 1) both vt-page-exit;
  }
  ::view-transition-new(root):active-view-transition-type(curtain) {
    animation: 700ms cubic-bezier(0.77, 0, 0.175, 1) both vt-curtain-in;
  }
}
`;

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
      <head>
        <style dangerouslySetInnerHTML={{ __html: VIEW_TRANSITION_TYPE_CSS }} />
      </head>
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
