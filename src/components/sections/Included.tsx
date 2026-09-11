import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { included } from "@/content/home-sections";
import { stagger } from "@/lib/motion";

/**
 * Included / not included. A Server Component driven by the shared CSS
 * reveal: one observer on each column, rows staggered by index. It used to
 * hydrate a Motion tree that drew every ✓ and ✕ as a path — the one
 * section on /pricing still paying for JavaScript animation — and the
 * marks read no differently drawn or not.
 */
function Mark({ kind }: { kind: "yes" | "no" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="mt-0.5 size-4 shrink-0"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={kind === "yes" ? "var(--teal)" : "var(--slate)"}
    >
      <path d={kind === "yes" ? "M2,7 l4,4 l8,-9" : "M3,3 l10,10 M13,3 l-10,10"} />
    </svg>
  );
}

function Column({
  heading,
  items,
  kind,
}: {
  heading: string;
  items: readonly string[];
  kind: "yes" | "no";
}) {
  return (
    <div>
      <h3 className="mono-label text-slate">{heading}</h3>
      <Reveal as="ul" stagger={stagger.line} className="mt-6 space-y-4">
        {items.map((item, index) => (
          <RevealItem
            as="li"
            key={item}
            index={index}
            className="flex gap-3 text-small text-ink-soft"
          >
            <Mark kind={kind} />
            <span className={kind === "no" ? "text-slate" : undefined}>{item}</span>
          </RevealItem>
        ))}
      </Reveal>
    </div>
  );
}

export function Included() {
  return (
    <section className="section-y border-b border-line">
      <div className="container-royto">
        <SectionHeading
          eyebrow={included.eyebrow}
          heading={included.heading}
          intro={included.intro}
        />
        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
          <Column heading="Included" items={included.yes} kind="yes" />
          <Column heading="Not included" items={included.no} kind="no" />
        </div>
      </div>
    </section>
  );
}
