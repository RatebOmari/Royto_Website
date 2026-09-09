import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The social card. Built from the brand tokens rather than a screenshot, so it
 * stays correct if the site changes.
 *
 * The faces are vendored as TTF alongside this file. `next/og` renders with
 * satori, which does not read `next/font` and cannot parse woff2 — the only
 * format next/font emits — so without these the wordmark would fall back to a
 * system face at the wrong weight, and brand.md is explicit that the wordmark
 * is never set in another face.
 *
 * Next 16 passes `params` to image-generating functions as a Promise. This
 * route has no dynamic segments, but the signature has to match.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<Record<string, never>>;
}) {
  await params;

  const fontDir = join(process.cwd(), "src/app/_og-fonts");
  const [archivo, plexSans] = await Promise.all([
    readFile(join(fontDir, "archivo-800.ttf")),
    readFile(join(fontDir, "plex-sans-400.ttf")),
  ]);

  const ink = "#16212B";
  const paper = "#F3F3EE";
  const teal = "#0E6E5C";
  const slate = "#5C6773";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: paper,
          padding: "72px 80px",
          fontFamily: "IBM Plex Sans",
        }}
      >
        {/* Wordmark: the period is the mark, and it is always teal. */}
        <div style={{ display: "flex", alignItems: "center", fontSize: 42, fontFamily: "Archivo", color: ink, letterSpacing: "-0.03em" }}>
          royto<span style={{ color: teal }}>.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontFamily: "Archivo",
              color: ink,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            AI that does the work.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 28,
              color: "#3C4753",
              lineHeight: 1.45,
              maxWidth: 900,
            }}
          >
            We build the automation that takes the repetitive part of your week
            off your plate — and then we run it for you.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 20, color: slate, letterSpacing: "0.09em" }}>
            AN AI AGENCY FOR SMALL BUSINESSES
          </div>
          <div style={{ display: "flex", height: 6, width: 120, background: teal }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: archivo, weight: 800, style: "normal" },
        { name: "IBM Plex Sans", data: plexSans, weight: 400, style: "normal" },
      ],
    },
  );
}
