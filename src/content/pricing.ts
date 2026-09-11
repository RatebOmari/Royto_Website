/** Pricing — verbatim from attachments/copy.md. Real numbers, stated plainly. */

export type Tier = {
  number: string;
  name: string;
  price: string;
  /** The numeric part, for <CountUp>. Only set where a real number exists. */
  amount?: number;
  prefix?: string;
  suffix?: string;
  body: string;
  /** The middle tier is emphasised. */
  featured?: boolean;
};

export const tiers: Tier[] = [
  {
    number: "01",
    name: "Audit",
    price: "Free right now",
    body: "One session plus a written map of what’s automatable, ranked by hours saved. Free while we’re taking founding clients — $250 after that.",
  },
  {
    number: "02",
    name: "Build",
    price: "From $1,200",
    amount: 1200,
    prefix: "From $",
    body: "One-off project fee, scoped from the audit. Built and tested on your real accounts, documented, and handed over working.",
    featured: true,
  },
  {
    number: "03",
    name: "Run",
    price: "From $500/mo",
    amount: 500,
    prefix: "From $",
    suffix: "/mo",
    body: "We operate, monitor, fix and improve it, plus a monthly summary. Cancel with 30 days’ notice.",
  },
];

export const pricingSection = {
  eyebrow: "Pricing",
  heading: "Real numbers, not “call us.”",
  intro:
    "Priced from what delivery actually takes, not a round figure. The exact number depends on how many tools have to be connected and how much runs through them.",
} as const;

export const whatChangesPrice = {
  heading: "What changes the price",
  items: [
    "How many tools have to be connected, and how well they expose their data",
    "How much runs through the automation each month",
    "How much of it can run unattended versus needing approval",
    "Whether you want us to run it or hand it over",
  ],
} as const;

/** Product pricing is separate from an agency engagement. Keep it visibly so. */
export const socialPricing = {
  heading: "Royto Social — product pricing",
  tiers: [
    {
      name: "Pilot",
      price: "$500–750",
      body: "Flat, 30 days, limited scope in exchange for feedback and case-study permission. This is the founding-client offer for Royto Social.",
    },
    {
      name: "Core",
      price: "From $750–1,250/mo",
      body: "Content and inbox volume set the exact price.",
    },
    {
      name: "Custom",
      price: "Quoted",
      body: "For multi-location, higher volume, original content or deeper integrations.",
    },
  ],
  note: "Product pricing is separate from an agency engagement. Royto Social is a fixed package that includes the work itself — twelve posts a month, written and scheduled, and the inbox drafted — which is why it sits above a Run plan, where we operate something already built. Agency work is scoped to your business.",
} as const;
