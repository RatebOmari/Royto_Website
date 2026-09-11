import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { AuditMapExample } from "@/components/sections/AuditMapExample";
import { Faq } from "@/components/sections/Faq";
import { Included } from "@/components/sections/Included";
import { PricingCard } from "@/components/sections/Pricing";
import { FixedScopeNote, PackageCard } from "@/components/sections/Websites";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { faq } from "@/content/faq";
import { pages } from "@/content/pages";
import {
  lanes,
  socialPricing,
  tiers,
  typicalEngagement,
  whatChangesPrice,
} from "@/content/pricing";
import { websitePackages } from "@/content/websites";
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
 * Two ways to work with Royto. Lane one is the ladder — Audit, Build, Run —
 * with Royto Social inside it as a build already scoped. Lane two is
 * websites on fixed packages. A price appears where the offer is bought and
 * once here; nowhere else.
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
            <h2 className="mt-4 max-w-[20ch] text-h2 font-extrabold text-ink">
              {lanes.automation.heading}
            </h2>
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
          {/* What the audit hands you, as a labelled example. Plain markup — one
              observed element, not one per row. */}
          <div className="mt-10 max-w-[640px]">
            <AuditMapExample />
          </div>

          {/* Royto Social sits inside the lane: a build already scoped, priced monthly. */}
          <div className="mt-16 border-t border-line pt-12">
            <Reveal>
              <p className="mono-label text-slate">{socialPricing.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h3 className="mt-4 text-h3 font-semibold text-ink">{socialPricing.heading}</h3>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-3 measure text-body text-ink-soft">{socialPricing.intro}</p>
            </Reveal>
            <Reveal as="ul" delay={0.12} className="mt-8 grid gap-4 md:grid-cols-3">
              {socialPricing.tiers.map((tier) => (
                <li key={tier.name}>
                  <Card className="h-full items-start p-7">
                    <p className="mono-label text-slate">{tier.name}</p>
                    <p className="mt-4 font-display text-[24px] font-extrabold leading-none tracking-[-0.02em] text-ink">
                      {tier.price}
                    </p>
                    <p className="mt-4 text-small text-ink-soft">{tier.body}</p>
                  </Card>
                </li>
              ))}
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-6">
                <Link
                  href={socialPricing.link.href}
                  className="inline-flex items-center gap-2 font-mono text-mono text-teal-ink"
                >
                  {socialPricing.link.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Lane 2 — Websites: fixed packages. */}
      <section className="border-b border-line bg-paper-raised">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <p className="mono-label text-slate">{lanes.websites.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 max-w-[20ch] text-h2 font-extrabold text-ink">
              {lanes.websites.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 measure text-body text-ink-soft">{lanes.websites.intro}</p>
          </Reveal>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {websitePackages.map((pkg, index) => (
              <Reveal as="li" key={pkg.name} delay={0.1 + index * 0.06}>
                <PackageCard pkg={pkg} />
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.28} className="mt-8">
            <FixedScopeNote />
          </Reveal>
          <Reveal delay={0.32}>
            <p className="mt-6">
              <Link
                href="/websites"
                className="inline-flex items-center gap-2 font-mono text-mono text-teal-ink"
              >
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
            <h2 className="text-h2 font-extrabold text-ink">
              {whatChangesPrice.heading}
            </h2>
          </Reveal>
          <Reveal as="ul" delay={0.08} className="mt-8 space-y-4">
            {whatChangesPrice.items.map((item) => (
              <li
                key={item}
                className="flex gap-4 border-b border-line pb-4 text-body text-ink-soft last:border-0"
              >
                <span aria-hidden="true" className="font-mono text-mono text-teal">
                  →
                </span>
                <span className="measure">{item}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* The pricing-relevant subset of the homepage FAQ. */}
      <Faq items={faq.filter((item) => item.pricing)} heading="Questions" />

      <section className="border-t border-line">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <p className="measure-lede text-lede text-ink">
              Want an exact number? It starts with the free audit.
            </p>
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
