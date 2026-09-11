import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { Faq } from "@/components/sections/Faq";
import { PricingCard } from "@/components/sections/Pricing";
import { FixedScopeNote, PackageCard } from "@/components/sections/Websites";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { faq } from "@/content/faq";
import { pages } from "@/content/pages";
import { socialPricing, tiers, whatChangesPrice } from "@/content/pricing";
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

export default function Page() {
  return (
    <>
      <PageHeader {...page} />

      {/* The agency engagement. */}
      <section className="border-b border-line">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <h2 className="mono-label text-slate">Agency engagement</h2>
          </Reveal>
          <ul className="mt-8 grid items-start gap-4 md:grid-cols-3">
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
        </div>
      </section>

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

      {/* Websites: the same three packages as the homepage and /websites. */}
      <section className="border-b border-line">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <h2 className="text-h2 font-extrabold text-ink">Websites</h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mono-label mt-4 text-slate">Fixed scope, fixed price</p>
          </Reveal>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {websitePackages.map((pkg, index) => (
              <Reveal as="li" key={pkg.name} delay={0.1 + index * 0.06}>
                <PackageCard pkg={pkg} />
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.28} className="mt-8">
            <FixedScopeNote />
          </Reveal>
        </div>
      </section>

      {/*
        Product pricing is a separate block, clearly labelled. Royto Social is
        a fixed package; agency work is scoped to the business.
      */}
      <section className="border-b border-line bg-paper-raised">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <h2 className="text-h2 font-extrabold text-ink">
              {socialPricing.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mono-label mt-4 text-slate">Product pricing</p>
          </Reveal>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {socialPricing.tiers.map((tier, index) => (
              <Reveal as="li" key={tier.name} delay={0.1 + index * 0.06}>
                <Card className="h-full items-start bg-paper p-7">
                  <p className="mono-label text-slate">{tier.name}</p>
                  <p className="mt-4 font-display text-[24px] font-extrabold leading-none tracking-[-0.02em] text-ink">
                    {tier.price}
                  </p>
                  <p className="mt-4 text-small text-ink-soft">{tier.body}</p>
                </Card>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.28}>
            <p className="mt-8 measure text-small text-slate">
              {socialPricing.note}
            </p>
          </Reveal>
        </div>
      </section>

      {/* The pricing-relevant subset of the homepage FAQ. */}
      <Faq items={faq.filter((item) => item.pricing)} heading="Pricing questions" />

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
