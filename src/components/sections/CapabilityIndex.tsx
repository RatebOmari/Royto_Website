import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import {
  capabilities,
  capabilitiesSection,
  customBuild,
  STATUS_LABEL,
} from "@/content/capabilities";
import { stagger } from "@/lib/motion";

/**
 * The six areas as a compact index — title · pain · status · how you buy it.
 * No diagrams, no body copy: those live on /what-we-automate, the one map.
 * The homepage's job is to route, not to explain.
 */
export function CapabilityIndex() {
  return (
    <section id="what-we-automate" className="section-y border-b border-line">
      <div className="container-royto">
        <SectionHeading
          eyebrow={capabilitiesSection.eyebrow}
          heading={capabilitiesSection.heading}
          intro={capabilitiesSection.intro}
        />
        <Reveal delay={0.16}>
          <p className="mt-4 measure text-body text-ink-soft">{capabilitiesSection.audience}</p>
        </Reveal>

        <Reveal as="ol" stagger={stagger.line} className="mt-12 border-t border-line">
          {capabilities.map((capability, index) => (
            <RevealItem
              as="li"
              key={capability.id}
              index={index}
              className="grid gap-x-6 gap-y-2 border-b border-line py-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_auto] md:items-baseline"
            >
              <div className="flex flex-col items-start gap-1.5">
                <Link
                  href={`/what-we-automate#${capability.id}`}
                  className="text-h3 font-semibold text-ink transition-colors hover:text-teal-ink"
                >
                  {capability.title}
                </Link>
                <Tag tone={capability.status === "now" ? "teal" : "slate"}>
                  {STATUS_LABEL[capability.status]}
                </Tag>
              </div>
              <p className="text-body text-ink-soft">{capability.pain}</p>
              {capability.buy ? (
                <Link
                  href={capability.buy.href}
                  className="inline-flex items-start gap-2 font-mono text-mono-sm text-teal-ink md:justify-self-end md:text-right"
                >
                  <span>{capability.buy.label}</span>
                  <span aria-hidden="true" className="shrink-0">→</span>
                </Link>
              ) : (
                <span />
              )}
            </RevealItem>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 measure text-body text-ink-soft">
            <strong className="font-semibold text-ink">{customBuild.note.lead}</strong>{" "}
            {customBuild.note.body}
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-[62ch] font-mono text-mono text-slate">{capabilitiesSection.tools}</p>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-6">
            <Link
              href="/what-we-automate"
              className="inline-flex items-center gap-2 font-mono text-mono text-teal-ink"
            >
              See all six in depth <span aria-hidden="true">→</span>
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
