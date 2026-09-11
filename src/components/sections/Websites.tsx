import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  fixedScopeNote,
  websitePackages,
  websitesSection,
  type WebsitePackage,
} from "@/content/websites";
import { stagger } from "@/lib/motion";

/** One package card — shared with /websites so the two never drift. */
export function PackageCard({ pkg }: { pkg: WebsitePackage }) {
  return (
    <Card className="h-full items-start p-7">
      <p className="mono-label text-slate">{pkg.name}</p>
      <p className="mt-4 font-display text-[24px] font-extrabold leading-none tracking-[-0.02em] text-ink">
        {pkg.price}
      </p>
      <p className="mt-4 text-small text-ink-soft">{pkg.body}</p>
    </Card>
  );
}

/** The fixed-scope line under the packages. Bold lead on both surfaces. */
export function FixedScopeNote() {
  return (
    <p className="measure text-body text-ink-soft">
      <strong className="font-semibold text-ink">{fixedScopeNote.lead}</strong>{" "}
      {fixedScopeNote.body}
    </p>
  );
}

/**
 * Homepage section. Quieter than the automation sections on purpose — plain
 * reveals, no diagrams, no scroll-linked motion. This is an offer, not the
 * thesis.
 */
export function Websites() {
  return (
    <section id="websites" className="section-y border-b border-line bg-paper-raised">
      <div className="container-royto">
        <SectionHeading
          eyebrow={websitesSection.eyebrow}
          heading={websitesSection.heading}
          intro={websitesSection.intro}
        />

        <Reveal
          as="ul"
          stagger={stagger.capability}
          className="mt-12 grid gap-4 md:grid-cols-3"
        >
          {websitePackages.map((pkg, index) => (
            <RevealItem as="li" key={pkg.name} index={index}>
              <PackageCard pkg={pkg} />
            </RevealItem>
          ))}
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <FixedScopeNote />
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10">
            <ButtonLink href={websitesSection.cta.href} variant="ghost" arrow>
              {websitesSection.cta.label}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
