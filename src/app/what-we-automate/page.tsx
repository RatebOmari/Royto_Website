import type { Metadata } from "next";
import { CapabilityDiagram } from "@/components/diagrams";
import { Reveal } from "@/components/motion/Reveal";
import { CapabilityRail } from "@/components/sections/CapabilityRail";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tag } from "@/components/ui/Tag";
import { capabilities, STATUS_LABEL } from "@/content/capabilities";
import { pages } from "@/content/pages";
import { cx } from "@/lib/utils";

const page = pages.whatWeAutomate;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/what-we-automate" },
  openGraph: {
    title: page.metaTitle,
    description: page.metaDescription,
    url: "/what-we-automate",
  },
};

export default function Page() {
  return (
    <>
      <PageHeader {...page} />

      <div className="container-royto grid gap-16 py-24 md:py-32 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-20">
        <CapabilityRail />

        <div className="space-y-24 md:space-y-32">
          {capabilities.map((capability, index) => (
            <section
              key={capability.id}
              id={capability.id}
              aria-labelledby={`${capability.id}-title`}
              className="scroll-mt-28"
            >
              <div
                className={cx(
                  "grid items-center gap-10 md:grid-cols-2 md:gap-14",
                  // Alternating layout: the diagram swaps sides each section.
                  index % 2 === 1 && "md:[&>*:first-child]:order-2",
                )}
              >
                <div>
                  <Reveal>
                    <Tag tone={capability.status === "now" ? "teal" : "slate"}>
                      {STATUS_LABEL[capability.status]}
                    </Tag>
                  </Reveal>
                  <Reveal delay={0.06}>
                    <h2
                      id={`${capability.id}-title`}
                      className="mt-5 text-h2 font-extrabold text-ink"
                    >
                      {capability.title}
                    </h2>
                  </Reveal>
                  <Reveal delay={0.12}>
                    <p className="mt-5 measure text-body text-ink-soft">
                      {capability.expanded}
                    </p>
                  </Reveal>
                  <Reveal delay={0.18}>
                    <div className="mt-7 rounded-card border border-line bg-paper-raised p-5">
                      <p className="mono-label text-slate">Example</p>
                      <p className="mt-3 measure text-small text-ink-soft">
                        {capability.example}
                      </p>
                    </div>
                  </Reveal>
                </div>

                <Reveal delay={0.1}>
                  <div className="rounded-panel border border-line bg-paper-raised p-6 shadow-card">
                    <p className="mono-label mb-4 text-slate">Example workflow</p>
                    <CapabilityDiagram id={capability.id} />
                  </div>
                </Reveal>
              </div>
            </section>
          ))}
        </div>
      </div>

      <section className="border-t border-line">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <p className="measure-lede text-lede text-ink">
              Not sure which of these is costing you most? That’s what the audit
              is for.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8">
              <ButtonLink href="/contact" arrow>
                Get a free automation audit
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
