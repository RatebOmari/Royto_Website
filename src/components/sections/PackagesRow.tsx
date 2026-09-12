import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { packages, packagesSection } from "@/content/packages";
import { stagger } from "@/lib/motion";

/** One package card — shared by the homepage row and the /packages hub. */
export function PackageSummaryCard({ item }: { item: (typeof packages)[number] }) {
  return (
    <Link href={item.href} className="block h-full rounded-card">
      <Card as="div" className="h-full items-start p-7">
        <p className="text-h3 font-semibold text-ink">{item.name}</p>
        <p className="mt-3 text-small text-ink-soft">{item.body}</p>
        <p className="mt-6 flex w-full flex-col gap-3">
          <span className="whitespace-nowrap font-display text-[22px] font-extrabold leading-none tracking-[-0.02em] text-ink">
            {item.price}
          </span>
          <span className="font-mono text-mono-sm uppercase tracking-[0.09em] text-teal-ink">
            See what’s included <span aria-hidden="true">→</span>
          </span>
        </p>
      </Card>
    </Link>
  );
}

/** Homepage row: the three packages, so a visitor sees what is ready-made without leaving. */
export function PackagesRow() {
  return (
    <section id="packages" className="section-y border-b border-line bg-paper-raised">
      <div className="container-royto">
        <SectionHeading
          eyebrow={packagesSection.eyebrow}
          heading={packagesSection.heading}
          intro={packagesSection.intro}
        />
        <Reveal as="ul" stagger={stagger.card} className="mt-12 grid gap-4 md:grid-cols-3">
          {packages.map((item, index) => (
            <RevealItem as="li" key={item.name} index={index}>
              <PackageSummaryCard item={item} />
            </RevealItem>
          ))}
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-10">
            <ButtonLink href={packagesSection.link.href} variant="ghost" arrow>
              {packagesSection.link.label}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
