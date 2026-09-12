/**
 * Royto Social — the one ready-made package, sold from its capability
 * (Content & social) and priced inside the automation lane on /pricing.
 *
 * The naming rule the whole site exists to protect: "Royto" alone always
 * means the agency. A package always carries its full name — "Royto Social" —
 * and is never shortened to "Royto".
 *
 * There is no public product roadmap. Future packages get a page, and a link
 * from their capability, when they are real — not before.
 */

/** Same vocabulary as the capability grid. */
export const PACKAGE_STATUS = "Available now";

import type { PackageContent } from "@/components/sections/PackagePage";
import { socialPricing } from "@/content/pricing";

/** /royto-social — verbatim from attachments/copy.md. */
export const roytoSocial = {
  href: "/royto-social",
  name: "Royto Social",
  eyebrow: "Royto Social — a Royto package",
  title: "Your social media, on autopilot.",
  lede: "Royto Social plans, writes, schedules and helps answer your social media — while you approve anything that needs your judgment. For any business that runs its own accounts and would rather not.",
  statusLine: "Ready — taking the first clients now.",
  primaryCta: { label: "Apply for a pilot spot", href: "/contact?for=social" },
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
  how: {
    kind: "approval",
    heading: "How approval works",
    automatic:
      "Hours, location, general availability and “do you offer X” are answered automatically.",
    held: "Pricing, booking confirmations, complaints and anything sensitive are drafted and held until you approve them.",
  },
  pricing: {
    heading: "Pricing",
    tiers: socialPricing.tiers,
    note: socialPricing.intro,
  },
  closing: { heading: "Want Royto Social running your accounts?" },
  metaTitle: "Royto Social",
  metaDescription:
    "Royto Social plans, writes, schedules and helps answer your social media; you approve anything that needs your judgment. Taking its first clients now.",
} as const satisfies PackageContent & { metaTitle: string; metaDescription: string };
