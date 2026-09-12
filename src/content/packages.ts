/**
 * The packages hub — the one place the three ready-made packages sit side by
 * side. Each card is a line and a starting price; the page behind it is the
 * offer. Also rendered as a row on the homepage.
 */

export type PackageSummary = {
  name: string;
  /** What it is, in one line an owner recognises. */
  body: string;
  price: string;
  href: string;
};

export const packages: PackageSummary[] = [
  {
    name: "Never miss a lead",
    body: "Calls answered and booked, enquiries replied to in minutes, a review after every job. Configured to your business in days.",
    price: "From $449/mo",
    href: "/never-miss-a-lead",
  },
  {
    name: "Royto Social",
    body: "Social media run for you — planned, written, scheduled, and the inbox answered. You approve anything that needs your judgment.",
    price: "From $750/mo",
    href: "/royto-social",
  },
  {
    name: "Websites",
    body: "A fast, modern site on a fixed scope and price, with lead capture, booking and follow-up wired in from day one.",
    price: "From $2,500",
    href: "/websites",
  },
];

export const packagesSection = {
  eyebrow: "Packages",
  heading: "Ready-made, fixed price.",
  intro:
    "Three things we’ve scoped so often they have a name and a number. Everything else is a custom build, scoped from the audit.",
  link: { label: "Compare the packages", href: "/packages" },
} as const;

export const packagesPage = {
  title: "Packages",
  lede: "A package is agency work we’ve scoped often enough to give it a fixed scope and a fixed price. Three exist. Anything that doesn’t fit one is a custom build — scoped from the free audit, priced in writing before it starts.",
  metaTitle: "Packages",
  metaDescription:
    "Three ready-made packages with a fixed scope and price — Never miss a lead, Royto Social, and Websites — plus custom builds scoped from a free audit.",
  custom: {
    lead: "Something that doesn’t fit a package?",
    body: "That’s most businesses, and it’s what the audit is for. Whatever it turns up gets scoped and quoted as a custom build on the tools you already use — from $2,500, then from $750 a month if you want us to run it.",
    link: { label: "How custom builds are priced", href: "/pricing" },
  },
} as const;
