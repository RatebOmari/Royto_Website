import { Reveal } from "@/components/motion/Reveal";
import { type LegalSection } from "@/content/legal";

/** The shared shape of /privacy and /terms: one column, plain sections. */
export function LegalPage({
  title,
  lede,
  updated,
  sections,
}: {
  title: string;
  lede: string;
  updated: string;
  sections: readonly LegalSection[];
}) {
  return (
    <>
      <header className="border-b border-line">
        <div className="container-royto pb-16 pt-[144px] md:pb-20 md:pt-[184px]">
          <Reveal>
            <h1 className="text-hero font-extrabold text-ink">{title}</h1>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-6 measure-lede text-lede text-ink-soft">{lede}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 font-mono text-mono text-slate">{updated}</p>
          </Reveal>
        </div>
      </header>

      <div className="container-royto py-20 md:py-28">
        <div className="space-y-14">
          {sections.map((section, index) => (
            <Reveal as="section" key={section.heading} delay={index * 0.04}>
              <h2 className="text-h3 font-semibold text-ink">{section.heading}</h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="measure text-body text-ink-soft">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
