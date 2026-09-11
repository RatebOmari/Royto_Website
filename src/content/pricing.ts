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

/**
 * A typical first engagement, in one sentence, using only numbers already on
 * this page. TODO(placeholder): add a build range once there is real data.
 */
export const typicalEngagement =
  "A typical first engagement: the free audit, then one build from $1,200, then Run from $500 a month. Most businesses start with the single automation that gives back the most hours.";

/**
 * What the audit's written map looks like. Illustrative rows — mechanics,
 * not a client's figures — and labelled as an example on the page.
 */
export const auditMapExample = {
  label: "Example audit map",
  rows: [
    { task: "Quotes from email enquiries", hours: "4 h", outcome: "Draft held for approval", tone: "gold" },
    { task: "Copying leads into the spreadsheet", hours: "2 h", outcome: "Runs on its own", tone: "teal" },
    { task: "Chasing overdue invoices", hours: "1 h", outcome: "Message held for approval", tone: "gold" },
    { task: "Monthly figures into the accountant’s template", hours: "3 h", outcome: "Runs on its own", tone: "teal" },
    { task: "Rewriting the staff rota each week", hours: "1 h", outcome: "Not worth automating yet", tone: "slate" },
  ],
  note: "Illustrative. Your map is built from your own week, ranked by hours saved.",
} as const;

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

/**
 * Two ways to work with Royto. Lane one is the ladder; lane two is websites.
 * Royto Social is not a third system — it sits inside lane one.
 */
export const lanes = {
  automation: {
    eyebrow: "01 · Automation",
    heading: "Audit, build, run.",
    intro:
      "One shape for every automation, priced at each stage. You can stop after any of them, and the number you rely on is the one in the written scope.",
  },
  websites: {
    eyebrow: "02 · Websites",
    heading: "Fixed packages, with the lead capture built in.",
    intro:
      "A website is quoted together with the automation behind it — capture, booking, follow-up — never as a separate project.",
    link: "What each package includes",
  },
} as const;

/** Royto Social: a build we have already scoped, priced as a monthly plan. */
export const socialPricing = {
  eyebrow: "Ready-made package",
  heading: "Royto Social",
  intro:
    "Content & social as a build we’ve already scoped, so there is nothing to audit first. It includes the work itself — twelve posts a month, written and scheduled, and the inbox drafted — which is why it sits above a Run plan, where we operate something already built.",
  link: { label: "See what Royto Social includes", href: "/products/royto-social" },
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
} as const;
