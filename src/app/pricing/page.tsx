import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Faq } from "@/components/sections/Faq";
import { Included } from "@/components/sections/Included";
import { MonthlyReportExample } from "@/components/sections/MonthlyReportExample";
import { PricingCard } from "@/components/sections/Pricing";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { faq } from "@/content/faq";
import { pages } from "@/content/pages";
import {
  lanes,
  packageIndex,
  tiers,
  typicalEngagement,
  whatChangesPrice,
} from "@/content/pricing";
import { fixedScopeNote, websitePackages } from "@/content/websites";
import { cx } from "@/lib/utils";

const page = pages.pricing;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: page.metaTitle,
    description: page.metaDescription,
    url: "/pricing",
  },
};

/**
 * The index. Lane one is the ladder — Audit, Build, Run — with the monthly
 * numbers beside Run and one line each for the two packages that sit inside
 * it. Lane two is websites on fixed packages. A price lives where the offer
 * is bought and once here; the package tiers live on their own pages.
 */
export default function Page() {
  return (
    <>
      <PageHeader {...page} />

      {/* Lane 1 — Automation: the ladder. */}
      <section className="border-b border-line">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <p className="mono-label text-slate">{lanes.automation.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 max-w-[20ch] text-h2 font-extrabold text-ink">{lanes.automation.heading}</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 measure text-body text-ink-soft">{lanes.automation.intro}</p>
          </Reveal>
          <ul className="mt-12 grid items-start gap-4 md:grid-cols-3">
            {tiers.map((tier, index) => (
              <Reveal
                as="li"
                key={tier.number}
                delay={0.06 + index * 0.06}
                className={cx("h-full", tier.featured && "md:-mt-0.5")}
              >
                <PricingCard tier={tier} />
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.24}>
            <p className="mt-8 measure text-body text-ink-soft">{typicalEngagement}</p>
          </Reveal>
          {/* What Run sends every month — beside the stage it belongs to. */}
          <div className="mt-10 max-w-[640px]">
            <MonthlyReportExample />
          </div>

          {/* The two packages inside the lane: a starting price and a link; the tiers live on their pages. */}
          <Reveal as="ul" delay={0.1} className="mt-14 grid gap-4 md:grid-cols-2">
            {packageIndex.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="block h-full rounded-card">
                  <Card as="div" className="h-full items-start p-7">
                    <p className="mono-label text-slate">Ready-made package</p>
                    <p className="mt-3 text-h3 font-semibold text-ink">{item.name}</p>
                    <p className="mt-3 text-small text-ink-soft">{item.body}</p>
                    <p className="mt-5 flex items-baseline justify-between gap-4">
                      <span className="font-display text-[22px] font-extrabold leading-none tracking-[-0.02em] text-ink">
                        {item.price}
                      </span>
                      <span className="font-mono text-mono-sm uppercase tracking-[0.09em] text-teal-ink">
                        See what’s included <span aria-hidden="true">→</span>
                      </span>
                    </p>
                  </Card>
                </Link>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Lane 2 — Websites: fixed packages. */}
      <section className="border-b border-line bg-paper-raised">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <p className="mono-label text-slate">{lanes.websites.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 max-w-[20ch] text-h2 font-extrabold text-ink">{lanes.websites.heading}</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 measure text-body text-ink-soft">{lanes.websites.intro}</p>
          </Reveal>
          <Reveal as="ul" delay={0.1} className="mt-12 grid gap-4 md:grid-cols-3">
            {websitePackages.map((pkg) => (
              <li key={pkg.name}>
                <Card className="h-full items-start p-7">
                  <p className="mono-label text-slate">{pkg.name}</p>
                  <p className="mt-4 font-display text-[24px] font-extrabold leading-none tracking-[-0.02em] text-ink">
                    {pkg.price}
                  </p>
                  <p className="mt-4 text-small text-ink-soft">{pkg.body}</p>
                </Card>
              </li>
            ))}
          </Reveal>
          <Reveal delay={0.28}>
            <p className="mt-8 measure text-body text-ink-soft">
              <strong className="font-semibold text-ink">{fixedScopeNote.lead}</strong> {fixedScopeNote.body}
            </p>
          </Reveal>
          <Reveal delay={0.32}>
            <p className="mt-6">
              <Link href="/websites" className="inline-flex items-center gap-2 font-mono text-mono text-teal-ink">
                {lanes.websites.link}
                <span aria-hidden="true">→</span>
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* What an engagement includes and excludes — a scope statement, so it sits with the prices. */}
      <Included />

      <section className="border-b border-line">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <h2 className="text-h2 font-extrabold text-ink">{whatChangesPrice.heading}</h2>
          </Reveal>
          <Reveal as="ul" delay={0.08} className="mt-8 space-y-4">
            {whatChangesPrice.items.map((item) => (
              <li key={item} className="flex gap-4 border-b border-line pb-4 text-body text-ink-soft last:border-0">
                <span aria-hidden="true" className="font-mono text-mono text-teal">→</span>
                <span className="measure">{item}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <Faq items={faq.filter((item) => item.pricing)} heading="Questions" />

      <section className="border-t border-line">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <p className="measure-lede text-lede text-ink">Want an exact number? It starts with the free audit.</p>
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
