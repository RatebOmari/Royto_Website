import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { ProductWordmark } from "@/components/ui/Wordmark";
import { pages } from "@/content/pages";
import { PACKAGE_STATUS, roytoSocial } from "@/content/products";
import { socialPricing } from "@/content/pricing";

const page = pages.roytoSocial;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/products/royto-social" },
  openGraph: {
    title: page.metaTitle,
    description: page.metaDescription,
    url: "/products/royto-social",
  },
};

function List({
  items,
  kind,
}: {
  items: readonly string[];
  kind: "yes" | "no";
}) {
  return (
    <ul className="mt-6 space-y-3.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-small">
          <span
            aria-hidden="true"
            className={kind === "yes" ? "text-teal" : "text-slate"}
          >
            {kind === "yes" ? "✓" : "✕"}
          </span>
          <span className={kind === "yes" ? "text-ink-soft" : "text-slate"}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <>
      {/*
        A quieter hero than the homepage: this should feel like a page inside
        the brand, not a second front door. No Flow Canvas, no blueprint grid.
      */}
      <header className="border-b border-line">
        <div className="container-royto pb-16 pt-[144px] md:pb-20 md:pt-[184px]">
          <Reveal>
            <p className="mono-label text-slate">{page.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-5">
              <ProductWordmark product="social" className="text-[26px]" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-[16ch] text-hero font-extrabold text-ink">
              {page.title}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 measure-lede text-lede text-ink-soft">
              {page.lede}
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href={roytoSocial.primaryCta.href} arrow>
                {roytoSocial.primaryCta.label}
              </ButtonLink>
              <ButtonLink
                href={roytoSocial.secondaryCta.href}
                variant="ghost"
              >
                {roytoSocial.secondaryCta.label}
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.28}>
            <p className="mt-8 flex flex-wrap items-center gap-3">
              <Tag tone="teal">{PACKAGE_STATUS}</Tag>
              <span className="font-mono text-mono text-slate">
                {roytoSocial.statusLine}
              </span>
            </p>
          </Reveal>
        </div>
      </header>

      <section className="border-b border-line">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <h2 className="text-h2 font-extrabold text-ink">
              {roytoSocial.forWho.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 measure text-body text-ink-soft">
              {roytoSocial.forWho.body}
            </p>
          </Reveal>
        </div>
      </section>

      <section id="included" className="scroll-mt-24 border-b border-line">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <h2 className="text-h2 font-extrabold text-ink">
              What’s included, and what isn’t
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
            <Reveal delay={0.08}>
              <h3 className="mono-label text-slate">Included</h3>
              <List items={roytoSocial.included} kind="yes" />
            </Reveal>
            <Reveal delay={0.14}>
              <h3 className="mono-label text-slate">Not included</h3>
              <List items={roytoSocial.notIncluded} kind="no" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <h2 className="text-h2 font-extrabold text-ink">
              {roytoSocial.approval.heading}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Reveal delay={0.08}>
              <Card className="h-full items-start p-7">
                <Tag tone="teal">Automatic</Tag>
                <p className="mt-5 text-small text-ink-soft">
                  {roytoSocial.approval.automatic}
                </p>
              </Card>
            </Reveal>
            <Reveal delay={0.14}>
              <Card className="h-full items-start border-gold/40 p-7">
                <Tag tone="gold">Needs you</Tag>
                <p className="mt-5 text-small text-ink-soft">
                  {roytoSocial.approval.held}
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <h2 className="text-h2 font-extrabold text-ink">Pricing</h2>
          </Reveal>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {socialPricing.tiers.map((tier, index) => (
              <Reveal as="li" key={tier.name} delay={0.08 + index * 0.06}>
                <Card className="h-full items-start p-7">
                  <p className="mono-label text-slate">{tier.name}</p>
                  <p className="mt-4 font-display text-[24px] font-extrabold leading-none tracking-[-0.02em] text-ink">
                    {tier.price}
                  </p>
                  <p className="mt-4 text-small text-ink-soft">{tier.body}</p>
                </Card>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.24}>
            <p className="mt-8 measure text-small text-slate">
              {socialPricing.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <div className="rounded-panel bg-ink px-6 py-16 text-center md:px-16 md:py-20">
              <h2 className="mx-auto max-w-[18ch] text-h2 font-extrabold text-[color:var(--paper)]">
                Want Royto Social running your accounts?
              </h2>
              <div className="mt-9 flex justify-center">
                <ButtonLink href={roytoSocial.primaryCta.href} arrow>
                  {roytoSocial.primaryCta.label}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
