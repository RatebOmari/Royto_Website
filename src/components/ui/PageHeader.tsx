import { Reveal } from "@/components/motion/Reveal";
import type { PageHeader as PageHeaderContent } from "@/content/pages";

/**
 * The top of every interior page. Deliberately quieter than the homepage
 * hero — an interior page should feel like a page *inside* the brand, not a
 * second front door.
 */
export function PageHeader({ eyebrow, title, lede }: PageHeaderContent) {
  return (
    <header className="border-b border-line">
      <div className="container-royto pb-16 pt-[144px] md:pb-24 md:pt-[184px]">
        {eyebrow ? (
          <Reveal>
            <p className="mono-label text-slate">{eyebrow}</p>
          </Reveal>
        ) : null}
        <Reveal delay={eyebrow ? 0.06 : 0}>
          <h1 className="mt-4 max-w-[18ch] text-hero font-extrabold text-ink">
            {title}
          </h1>
        </Reveal>
        {lede ? (
          <Reveal delay={0.12}>
            <p className="mt-6 measure-lede text-lede text-ink-soft">{lede}</p>
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}

/**
 * Marks a section that is structurally in place but whose content lands in a
 * later build step. Never ships: the final audit checks for it.
 */
export function SectionPending({ label }: { label: string }) {
  return (
    <div className="container-royto section-y">
      <div className="rounded-panel border border-dashed border-line-strong p-8 md:p-12">
        <p className="mono-label text-slate">In progress</p>
        <p className="mt-4 measure text-body text-ink-soft">{label}</p>
      </div>
    </div>
  );
}
