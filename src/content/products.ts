/**
 * Products — verbatim from attachments/copy.md.
 *
 * The naming rule the whole site exists to protect: "Royto" alone always
 * means the agency. A product always carries its full name — "Royto Social" —
 * and is never shortened to "Royto". Royto Social is one product Royto makes.
 *
 * `stage` must be rendered everywhere a product appears. Nothing gets promoted
 * before it has been delivered for real clients.
 */

export type ProductStage = "pilot" | "next" | "later";

export const STAGE_LABEL: Record<ProductStage, string> = {
  pilot: "In pilot",
  next: "Next",
  later: "Later",
};

export type Product = {
  id: string;
  /** The part that follows the wordmark: "royto. social". */
  name: string;
  fullName: string;
  stage: ProductStage;
  body: string;
  /** Only Royto Social has a page to link through to. */
  href?: string;
};

/** The three cards on the homepage. */
export const homeProducts: Product[] = [
  {
    id: "social",
    name: "social",
    fullName: "Royto Social",
    stage: "pilot",
    body: "Social media, run for you — planned, written, scheduled, and the inbox answered. For any business that runs its own accounts and would rather not.",
    href: "/products/royto-social",
  },
  {
    id: "voice-reviews",
    name: "voice & reviews",
    fullName: "Royto Voice & Reviews",
    stage: "next",
    body: "Missed calls answered and booked. Review requests sent after every job, replies drafted for every review that arrives.",
  },
  {
    id: "chat-flows",
    name: "chat & flows",
    fullName: "Royto Chat & Flows",
    stage: "later",
    body: "A site widget that qualifies and books around the clock, and back-office automation packaged: invoicing, syncing, reporting.",
  },
];

/** The five cards on /products, where the pairs are split out. */
export const allProducts: Product[] = [
  homeProducts[0],
  {
    id: "voice",
    name: "voice",
    fullName: "Royto Voice",
    stage: "next",
    body: "Missed calls answered and booked, appointments confirmed, and reminders sent so fewer people don’t show.",
  },
  {
    id: "reviews",
    name: "reviews",
    fullName: "Royto Reviews",
    stage: "next",
    body: "Review requests sent after every job, replies drafted for every review that arrives, and an alert the moment something negative lands.",
  },
  {
    id: "chat",
    name: "chat",
    fullName: "Royto Chat",
    stage: "later",
    body: "A site widget that qualifies and books around the clock, so an enquiry at 11pm is still an enquiry in the morning.",
  },
  {
    id: "flows",
    name: "flows",
    fullName: "Royto Flows",
    stage: "later",
    body: "Back-office automation packaged: invoicing, syncing between the tools you already pay for, and recurring reporting.",
  },
];

/** Shown on every roadmap card, so a planned product never reads as shipping. */
export const ROADMAP_NOTE =
  "Not available yet. On the roadmap, and it stays there until it’s been delivered for real clients.";

export const productsSection = {
  eyebrow: "Products",
  heading: "Work that repeats becomes a product.",
  intro:
    "When we’ve built the same automation enough times, we freeze it into a package with a fixed scope and price. Royto Social is the first. Nothing here gets promoted before it’s been delivered for real clients.",
  noteLead: "Everything above starts as agency work.",
  noteBody:
    "Until a product has run for real clients, it’s on this page as a roadmap — not as something you can buy today.",
} as const;

/** /products/royto-social — verbatim from attachments/copy.md. */
export const roytoSocial = {
  statusLine: "In pilot — running by hand for a small number of founding businesses.",
  primaryCta: { label: "Apply for a pilot spot", href: "/contact" },
  secondaryCta: { label: "See what’s included", href: "#included" },
  forWho: {
    heading: "Who it’s for",
    body: "Restaurants, retail, gyms, salons, trades, clinics, professional services — different content and tone, the same underlying pattern of inconsistent posting and unanswered messages. If you run your own accounts and it keeps slipping, it’s for you.",
  },
  included: [
    "Brand and account setup",
    "12 posts per month, written and scheduled",
    "Content calendar, planned monthly",
    "Scheduling to Instagram and Facebook",
    "Drafted replies to messages and comments",
    "Weekly approval round with you",
    "Monthly performance summary in plain numbers",
    "One revision round",
    "30-day initial engagement",
  ],
  notIncluded: [
    "Original photography or onsite filming",
    "Paid media / ad spend management",
    "Customer support escalation",
    "Complaints, pricing disputes, or medical and legal questions",
    "Guaranteed reach, leads, or revenue",
  ],
  approval: {
    heading: "How approval works",
    automatic:
      "Hours, location, general availability and “do you offer X” are answered automatically.",
    held: "Pricing, booking confirmations, complaints and anything sensitive are drafted and held until you approve them.",
  },
} as const;
