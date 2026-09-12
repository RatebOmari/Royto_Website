/**
 * Single source of truth for site-wide values.
 *
 * Every `TODO(placeholder)` below is a real value that has to be filled in
 * before launch. They are listed together in README.md — search this file for
 * `TODO(placeholder)` to find them all in one pass.
 */

/** TODO(placeholder): confirm this mailbox exists and is monitored before launch. */
export const CONTACT_EMAIL = "hello@royto.tech";

export const SITE_URL = "https://royto.tech";

/**
 * Where Royto is and who it serves — feeds the LocalBusiness schema. No street
 * address or phone until they are real; never invent either.
 */
export const location = {
  locality: "Raleigh",
  region: "NC",
  country: "US",
  areaServed: "North Carolina",
} as const;

export const site = {
  name: "Royto",
  /** The wordmark is always lowercase, with the period in teal. */
  wordmark: "royto",
  title: "Royto — AI that does the work, for trades in the Triangle",
  description:
    "The phone answered, the quote written, the review asked for — while you’re on the job. AI automation for HVAC, plumbing, electrical and roofing, built and run for you. Raleigh, NC.",
  tagline:
    "Royto — an AI agency for small and mid-sized businesses. Raleigh, North Carolina. We build the automation, and then we run it.",
  legal: "© 2026 Royto. All rights reserved.",
  email: CONTACT_EMAIL,
  url: SITE_URL,
} as const;

export type NavLink = { label: string; href: string };

/**
 * Four items. The flagship package takes the slot; Websites is a lane, not
 * the thesis, and lives in the footer and the map. "How it works" is on the
 * homepage and /pricing.
 */
export const navLinks: NavLink[] = [
  { label: "What we automate", href: "/what-we-automate" },
  { label: "Never miss a lead", href: "/never-miss-a-lead" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export const navCta = { label: "Get a free audit", href: "/contact" };

/**
 * TODO(placeholder): social handles are not confirmed. These render as links
 * so the footer is structurally complete — verify or replace every URL, and
 * delete any account Royto does not actually hold, before launch.
 */
export const socialLinks: NavLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/royto" },
  { label: "Instagram", href: "https://www.instagram.com/royto.tech" },
  { label: "Facebook", href: "https://www.facebook.com/royto.tech" },
];

export const footerColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Agency",
    links: [
      { label: "What we automate", href: "/what-we-automate" },
      { label: "How we work", href: "/#how-we-work" },
      { label: "Pricing", href: "/pricing" },
      { label: "About", href: "/about" },
    ],
  },
  {
    heading: "Packages",
    links: [
      { label: "Never miss a lead", href: "/never-miss-a-lead" },
      { label: "Royto Social", href: "/royto-social" },
      { label: "Websites", href: "/websites" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Work", href: "/work" },
      { label: "Contact", href: "/contact" },
      /** TODO(review): both legal pages are drafts awaiting review. */
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export const founder = {
  name: "Rateb Al-Omari",
  role: "Founder, Royto",
  signature: "Rateb Al-Omari — Founder, Royto",
  /** TODO(placeholder): no founder photograph yet. FounderPortrait renders a
   *  designed placeholder — swap it for the real image when one exists. */
  photo: null,
} as const;
