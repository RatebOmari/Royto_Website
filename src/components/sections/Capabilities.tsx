import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { CapabilityDiagram } from "@/components/diagrams";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import {
  capabilities,
  capabilitiesSection,
  customBuild,
  STATUS_LABEL,
  type CapabilityStatus,
} from "@/content/capabilities";
import { stagger } from "@/lib/motion";

/** Roadmap items must read as roadmap everywhere they appear. */
export function statusTone(status: CapabilityStatus) {
  return status === "now" ? "teal" : "slate";
}

export function Capabilities() {
  return (
    <section id="what-we-automate" className="section-y border-b border-line">
      <div className="container-royto">
        <SectionHeading
          eyebrow={capabilitiesSection.eyebrow}
          heading={capabilitiesSection.heading}
          intro={capabilitiesSection.intro}
        />
        <Reveal delay={0.16}>
          <p className="mt-4 measure text-body text-ink-soft">
            {capabilitiesSection.audience}
          </p>
        </Reveal>

        <Reveal
          as="ul"
          stagger={stagger.capability}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {capabilities.map((capability, index) => (
              <RevealItem as="li" key={capability.id} index={index}>
                <Card as="div" className="dg-host h-full p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-h3 font-semibold text-ink">
                      {capability.title}
                    </h3>
                    <Tag tone={statusTone(capability.status)}>
                      {STATUS_LABEL[capability.status]}
                    </Tag>
                  </div>
                  <p className="mt-4 text-small text-ink-soft">{capability.body}</p>
                  {capability.link ? (
                    <Link
                      href={capability.link.href}
                      className="mt-4 inline-flex items-center gap-2 font-mono text-mono-sm uppercase tracking-[0.09em] text-teal-ink"
                    >
                      {capability.link.label}
                      <span aria-hidden="true">→</span>
                    </Link>
                  ) : null}
                  <div className="mt-6 rounded-control border border-line bg-paper p-3">
                    {/* Simulated activity must always say so, visibly. */}
                    <p className="mono-label mb-2 text-slate">Example workflow</p>
                    <CapabilityDiagram id={capability.id} />
                  </div>
                </Card>
              </RevealItem>
          ))}
        </Reveal>

        {/* Custom builds is a line, not a seventh card — six fill the grid. */}
        <Reveal delay={0.1}>
          <p className="mt-10 measure text-body text-ink-soft">
            <strong className="font-semibold text-ink">{customBuild.note.lead}</strong>{" "}
            {customBuild.note.body}
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-[62ch] font-mono text-mono text-slate">
            {capabilitiesSection.tools}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
