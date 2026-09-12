import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Cursor } from "@/components/motion/Cursor";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { StructuredData } from "@/components/layout/StructuredData";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { fontVariables } from "@/lib/fonts";
import { site, SITE_URL } from "@/content/site";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: site.title,
    template: "%s — Royto",
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F3EE" },
    { media: "(prefers-color-scheme: dark)", color: "#11161B" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <StructuredData />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-control focus:border focus:border-teal focus:bg-paper-raised focus:px-4 focus:py-3 focus:text-small focus:text-ink"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Cursor />
        <Nav />
        {/*
          Only the main content participates in the view transition. Nav,
          wordmark and footer sit outside it in the layout, so they persist
          across navigation instead of re-animating (motion.md §2).
        */}
        <ViewTransition default="page">
          <main id="main">{children}</main>
        </ViewTransition>
        <Footer />
        {/*
          Vercel Web Analytics: first-party, cookieless, no personal data —
          page views and the paths people take, nothing else. The one script
          the site loads that isn't its own.
        */}
        <Analytics />
      </body>
    </html>
  );
}
