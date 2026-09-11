/**
 * Per-page header copy and metadata — verbatim from attachments/copy.md.
 *
 * Page sections live in their own content files (capabilities.ts, pricing.ts,
 * …). This one holds the parts every page has: what the tab says, what the
 * search result says, and the first thing on the screen.
 */

export type PageHeader = {
  /** Mono eyebrow above the h1, where the copy deck specifies one. */
  eyebrow?: string;
  title: string;
  lede?: string;
  /** <title> and meta description for this route. */
  metaTitle: string;
  metaDescription: string;
};

export const pages = {
  whatWeAutomate: {
    title: "What we automate",
    lede: "Six places the same problem shows up, and every one of them says how you buy it. The audit tells you which is costing you most.",
    metaTitle: "What we automate",
    metaDescription:
      "Six places repetitive work hides — calls, quotes and paperwork, the website, the inbox, reviews, content — and how each one is bought.",
  },
  websites: {
    eyebrow: "Websites",
    title: "The front door the automation lives in.",
    lede: "Most small business websites are a brochure that sits there. We build yours as the place leads actually arrive — fast, current, and wired to do something once someone lands on it.",
    metaTitle: "Websites",
    metaDescription:
      "Fixed-scope websites for North Carolina businesses, built with lead capture and follow-up wired in. From $2,500.",
  },
  roytoSocial: {
    eyebrow: "Royto Social — a Royto package",
    title: "Your social media, on autopilot.",
    lede: "Royto Social plans, writes, schedules and helps answer your social media — while you approve anything that needs your judgment. For any business that runs its own accounts and would rather not.",
    metaTitle: "Royto Social",
    metaDescription:
      "Royto Social plans, writes, schedules and helps answer your social media; you approve anything that needs your judgment. Taking its first clients now.",
  },
  pricing: {
    title: "Pricing",
    lede: "Two ways to work with Royto: automation, priced at each stage, and websites on fixed packages. Priced from what delivery actually takes, not a round figure — everything below is a starting number, and you’ll get an exact one in writing before anything is built.",
    metaTitle: "Pricing",
    metaDescription:
      "Audit free while we take founding clients, builds from $2,500, Run from $750/mo, websites from $2,500 — and what changes the price.",
  },
  about: {
    eyebrow: "About",
    title: "An engineer who got tired of watching people do work a system could do.",
    metaTitle: "About",
    metaDescription:
      "Royto is built by Rateb Al-Omari, a Raleigh engineer who automated repetitive work for years before turning to North Carolina businesses.",
  },
  contact: {
    title: "What would you stop doing yourself?",
    /** The lede depends on `?for=` — see content/contact.ts. */
    metaTitle: "Contact",
    metaDescription:
      "Tell us what’s eating your week and we’ll map what’s automatable in it — 30 minutes, free, and yours whether or not we work together.",
  },
} as const satisfies Record<string, PageHeader>;

export const notFound = {
  title: "That page isn’t automated yet.",
  body: "It isn’t here either. Try the homepage, or tell us what you were looking for.",
  primary: { label: "Back to home", href: "/" },
  secondary: { label: "Get a free audit", href: "/contact" },
} as const;
