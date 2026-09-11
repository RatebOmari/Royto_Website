import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { work } from "@/content/legal";

export const metadata: Metadata = {
  title: work.metaTitle,
  description: work.metaDescription,
  alternates: { canonical: "/work" },
  // Nothing to index until there is a case study to read.
  robots: { index: false, follow: true },
};

/**
 * Genuinely empty on purpose. No placeholder cards, no "coming soon" grid,
 * nothing that could be mistaken for delivered work.
 */
export default function Page() {
  return (
    <div className="container-royto flex min-h-[70vh] flex-col justify-center pb-24 pt-[144px] md:pt-[184px]">
      <Reveal>
        <p className="mono-label text-slate">{work.eyebrow}</p>
      </Reveal>
      <Reveal delay={0.06}>
        <h1 className="mt-4 text-hero font-extrabold text-ink">{work.title}</h1>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="mt-6 measure-lede text-lede text-ink-soft">{work.holding}</p>
      </Reveal>
      <Reveal delay={0.18}>
        <div className="mt-10">
          <ButtonLink href={work.cta.href} arrow>
            {work.cta.label}
          </ButtonLink>
        </div>
      </Reveal>
    </div>
  );
}
