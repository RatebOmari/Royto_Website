import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { PackageSummaryCard } from "@/components/sections/PackagesRow";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { packages, packagesPage } from "@/content/packages";

const page = packagesPage;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/packages" },
  openGraph: {
    title: page.metaTitle,
    description: page.metaDescription,
    url: "/packages",
  },
};

/** The hub: three cards, one custom-build line, one ask. The offer lives on each package's own page. */
export default function Page() {
  return (
    <>
      <PageHeader title={page.title} lede={page.lede} metaTitle={page.metaTitle} metaDescription={page.metaDescription} />

      <section className="border-b border-line">
        <div className="container-royto py-20 md:py-28">
          <Reveal as="ul" className="grid gap-4 md:grid-cols-3">
            {packages.map((item) => (
              <li key={item.name}>
                <PackageSummaryCard item={item} />
              </li>
            ))}
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-12 measure text-body text-ink-soft">
              <strong className="font-semibold text-ink">{page.custom.lead}</strong> {page.custom.body}{" "}
              <Link href={page.custom.link.href} className="whitespace-nowrap font-mono text-mono-sm uppercase tracking-[0.09em] text-teal-ink">
                {page.custom.link.label} <span aria-hidden="true">→</span>
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <p className="measure-lede text-lede text-ink">Not sure which fits? That’s what the audit is for.</p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8">
              <ButtonLink href="/contact" arrow>
                Get a free audit
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
