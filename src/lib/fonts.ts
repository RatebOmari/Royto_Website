import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

/**
 * Fonts are downloaded at build time and served from our own origin —
 * `next/font/google` self-hosts, so there is no runtime request to Google.
 */

// Archivo ships as a variable font, so 600/700/800 all resolve to the same
// files — listing fewer weights would save nothing.
export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
  preload: true,
});

/**
 * Preloaded: it carries the body copy, and leaving it to arrive on its own
 * pushed FCP from 1.1s to 1.4s for no LCP gain.
 */
export const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
  preload: true,
});

/**
 * Not preloaded. The mono face carries eyebrows, state tags and timestamps —
 * never body copy and never the largest element on screen. Preloading it put
 * ~20KB ahead of Archivo in the queue, delaying the swap on the heading that
 * Lighthouse measures as LCP.
 */
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
});

export const fontVariables = `${archivo.variable} ${plexSans.variable} ${plexMono.variable}`;
