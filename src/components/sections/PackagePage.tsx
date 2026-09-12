import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { MorePackages } from "@/components/sections/MorePackages";

/**
 * One shape for every package page — Never miss a lead, Royto Social,
 * Websites — so the second package a visitor opens is already familiar.
 * Six sections, same order: header · who it's for · included & not ·
 * how it works · pricing · proof + CTA. Each page keeps its own
 * intent-carrying CTA.
 */

export type PackageTier = { name: string; price: string; body: string };

export type PackageContent = {
  /** This page's route — for the breadcrumb and the "more packages" strip. */
  href: string;
  /** Short name for the breadcrumb. */
  name: string;
  eyebrow: string;
  title: string;
  lede: string;
  /** Mono line beside the status tag. */
  statusLine: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  forWho: { heading: string; body: string };
  included: readonly string[];
  notIncluded: readonly string[];
  /** Either an approval split or an ordered list of steps. */
  how:
    | { kind: "approval"; heading: string; automatic: string; held: string }
    | { kind: "steps"; heading: string; steps: readonly string[] };
  pricing: { heading: string; tiers: readonly PackageTier[]; note?: string };
  /** One honest proof line, if there is one. */
  proof?: string;
  closing: { heading: string };
};

function List({ items, kind }: { items: readonly string[]; kind: "yes" | "no" }) {
  return (
    <ul className="mt-6 space-y-3.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-small">
          <span aria-hidden="true" className={kind === "yes" ? "text-teal" : "text-slate"}>
            {kind === "yes" ? "✓" : "✕"}
          </span>
          <span className={kind === "yes" ? "text-ink-soft" : "text-slate"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PackagePage({
  content: c,
  status = "Available now",
  aside,
}: {
  content: PackageContent;
  status?: string;
  /** Optional block rendered under pricing — the monthly numbers example, say. */
  aside?: ReactNode;
}) {
  return (
    <>
      <header className="border-b border-line">
        <div className="container-royto pb-16 pt-[136px] md:pb-20 md:pt-[176px]">
          <Reveal>
            <Breadcrumb parent={{ label: "Packages", href: "/packages" }} current={c.name} />
            <p className="mono-label text-slate">{c.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-[18ch] text-hero font-extrabold text-ink">{c.title}</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 measure-lede text-lede text-ink-soft">{c.lede}</p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href={c.primaryCta.href} arrow>
                {c.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={c.secondaryCta.href} variant="ghost">
                {c.secondaryCta.label}
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.28}>
            <p className="mt-8 flex flex-wrap items-center gap-3">
              <Tag tone="teal">{status}</Tag>
              <span className="font-mono text-mono text-slate">{c.statusLine}</span>
            </p>
          </Reveal>
        </div>
      </header>

      <section className="border-b border-line">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <h2 className="text-h2 font-extrabold text-ink">{c.forWho.heading}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 measure text-body text-ink-soft">{c.forWho.body}</p>
          </Reveal>
        </div>
      </section>

      <section id="included" className="scroll-mt-24 border-b border-line">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <h2 className="text-h2 font-extrabold text-ink">What’s included, and what isn’t</h2>
          </Reveal>
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
            <Reveal delay={0.08}>
              <h3 className="mono-label text-slate">Included</h3>
              <List items={c.included} kind="yes" />
            </Reveal>
            <Reveal delay={0.14}>
              <h3 className="mono-label text-slate">Not included</h3>
              <List items={c.notIncluded} kind="no" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <h2 className="text-h2 font-extrabold text-ink">{c.how.heading}</h2>
          </Reveal>
          {c.how.kind === "approval" ? (
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <Reveal delay={0.08}>
                <Card className="h-full items-start p-7">
                  <Tag tone="teal">Automatic</Tag>
                  <p className="mt-5 text-small text-ink-soft">{c.how.automatic}</p>
                </Card>
              </Reveal>
              <Reveal delay={0.14}>
                <Card className="h-full items-start border-gold/40 p-7">
                  <Tag tone="gold">Needs you</Tag>
                  <p className="mt-5 text-small text-ink-soft">{c.how.held}</p>
                </Card>
              </Reveal>
            </div>
          ) : (
            <Reveal as="ol" delay={0.08} className="mt-10 grid gap-4 md:grid-cols-5">
              {c.how.steps.map((step, index) => (
                <li key={step} className="rounded-card border border-line bg-paper-raised p-5">
                  <p className="mono-label text-teal-ink">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-3 text-small text-ink-soft">{step}</p>
                </li>
              ))}
            </Reveal>
          )}
        </div>
      </section>

      <section className="border-b border-line bg-paper-raised">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <h2 className="text-h2 font-extrabold text-ink">{c.pricing.heading}</h2>
          </Reveal>
          <Reveal as="ul" delay={0.08} className="mt-10 grid gap-4 md:grid-cols-3">
            {c.pricing.tiers.map((tier) => (
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
          {c.pricing.note ? (
            <Reveal delay={0.2}>
              <p className="mt-8 measure text-body text-ink-soft">{c.pricing.note}</p>
            </Reveal>
          ) : null}
          {aside ? <div className="mt-10 max-w-[640px]">{aside}</div> : null}
        </div>
      </section>

      <section>
        <div className="container-royto py-20 md:py-28">
          {c.proof ? (
            <Reveal>
              <p className="mb-10 border-l border-teal pl-4 font-mono text-mono text-slate">{c.proof}</p>
            </Reveal>
          ) : null}
          <Reveal delay={0.06}>
            <div className="rounded-panel bg-ink px-6 py-16 text-center md:px-16 md:py-20">
              <h2 className="mx-auto max-w-[20ch] text-h2 font-extrabold text-[color:var(--paper)]">
                {c.closing.heading}
              </h2>
              <div className="mt-9 flex justify-center">
                <ButtonLink href={c.primaryCta.href} arrow>
                  {c.primaryCta.label}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <MorePackages current={c.href} />
    </>
  );
}
