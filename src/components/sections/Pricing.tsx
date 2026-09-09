"use client";

import { motion } from "motion/react";
import { CountUp } from "@/components/motion/CountUp";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricingSection, tiers, type Tier } from "@/content/pricing";
import { duration, ease, viewportOnce } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cx } from "@/lib/utils";

/**
 * Cards enter staggered from the centre outward — the emphasised middle card
 * arrives first and settles 2px higher than its neighbours (motion.md §6).
 */
const ORDER: Record<number, number> = { 1: 0, 0: 1, 2: 1 };

export function PricingCard({ tier }: { tier: Tier }) {
  return (
    <Card
      className={cx(
        "h-full items-start p-8",
        tier.featured && "border-teal",
      )}
    >
      <p className="mono-label text-slate">
        {tier.number} · {tier.name}
      </p>
      <p className="mt-5 font-display text-[28px] font-extrabold leading-none tracking-[-0.02em] text-ink">
        {tier.amount !== undefined ? (
          <CountUp
            value={tier.amount}
            prefix={tier.prefix}
            suffix={tier.suffix}
          />
        ) : (
          tier.price
        )}
      </p>
      <p className="mt-5 text-small text-ink-soft">{tier.body}</p>
    </Card>
  );
}

export function Pricing({ withCta = true }: { withCta?: boolean }) {
  const reduced = useReducedMotion();

  return (
    <section id="pricing" className="section-y border-b border-line">
      <div className="container-royto">
        <SectionHeading
          eyebrow={pricingSection.eyebrow}
          heading={pricingSection.heading}
          intro={pricingSection.intro}
        />

        <ul className="mt-14 grid items-start gap-4 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.li
              key={tier.number}
              className={cx("h-full", tier.featured && "md:-mt-0.5")}
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: duration.base,
                ease: ease.outExpo,
                delay: ORDER[index] * 0.08,
              }}
            >
              <PricingCard tier={tier} />
            </motion.li>
          ))}
        </ul>

        {withCta ? (
          <div className="mt-10">
            <ButtonLink href="/pricing" variant="ghost">
              See full pricing
            </ButtonLink>
          </div>
        ) : null}
      </div>
    </section>
  );
}
