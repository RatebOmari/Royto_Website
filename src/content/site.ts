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
  title: "Royto — AI agency for North Carolina businesses",
  description:
    "Royto builds the AI automation that takes repetitive work off your plate — quotes and paperwork, customer messages, the website that feeds them — and then runs it for you. Free automation audit, Raleigh NC.",
  tagline:
    "Royto — an AI agency for small and mid-sized businesses. Raleigh, North Carolina. We build the automation, and then we run it.",
  legal: "© 2026 Royto. All rights reserved.",
  email: CONTACT_EMAIL,
  url: SITE_URL,
} as const;

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "What we automate", href: "/what-we-automate" },
  { label: "How we work", href: "/#how-we-work" },
  { label: "Products", href: "/products" },
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
    heading: "Products",
    links: [
      { label: "All products", href: "/products" },
      { label: "Royto Social", href: "/products/royto-social" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Contact", href: "/contact" },
      /** TODO(placeholder): both legal pages are stubs awaiting real copy. */
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
