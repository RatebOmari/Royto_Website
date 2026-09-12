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
  title: "Royto — AI that does the work",
  description:
    "AI automation that takes repetitive work off your plate — quotes, paperwork, customer messages — built and then run for you, for any business. Free audit.",
  tagline:
    "Royto — an AI agency for small and mid-sized businesses. Raleigh, North Carolina. We build the automation, and then we run it.",
  legal: "© 2026 Royto. All rights reserved.",
  email: CONTACT_EMAIL,
  url: SITE_URL,
} as const;

export type NavLink = {
  label: string;
  href: string;
  /**
   * Other routes this item is "current" for. A package page lives at a flat
   * URL, so the Packages item has to claim it explicitly.
   */
  covers?: readonly string[];
};

/**
 * Four items. Packages is a category, so it gets the slot rather than any
 * one package. "How it works" is on the homepage and /pricing.
 */
export const navLinks: NavLink[] = [
  { label: "What we automate", href: "/what-we-automate" },
  {
    label: "Packages",
    href: "/packages",
    covers: ["/never-miss-a-lead", "/royto-social", "/websites"],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export const navCta = { label: "Get a free audit", href: "/contact" };

/**
 * Only accounts Royto actually holds. LinkedIn was removed on 12 Sep 2026 —
 * the company page did not exist; add it back when it does.
 */
export const socialLinks: NavLink[] = [
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
      { label: "All packages", href: "/packages" },
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
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export const founder = {
  name: "Rateb Al-Omari",
  role: "Founder, Royto",
  signature: "Rateb Al-Omari — Founder, Royto",
  /** public/founder.jpg — rendered by FounderPortrait. */
  photo: "/founder.jpg",
} as const;
