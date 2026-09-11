"use client";

import { CountUp } from "@/components/motion/CountUp";
import { Card } from "@/components/ui/Card";
import { type Tier } from "@/content/pricing";
import { cx } from "@/lib/utils";

/** One agency tier, used on /pricing. The emphasised middle card sits 2px higher. */
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
