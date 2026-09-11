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
    lede: "Six places the same problem shows up. Four are available today; two are on the roadmap, and we’ll tell you which is which before you spend anything.",
    metaTitle: "What we automate",
    metaDescription:
      "Six places repetitive work hides — documents and back office, websites, messaging, content, calls, reviews. Four available today, two on the roadmap.",
  },
  websites: {
    eyebrow: "Websites",
    title: "The front door the automation lives in.",
    lede: "Most small business websites are a brochure that sits there. We build yours as the place leads actually arrive — fast, current, and wired to do something once someone lands on it.",
    metaTitle: "Websites",
    metaDescription:
      "Fixed-scope websites for North Carolina businesses, built with lead capture and follow-up wired in. From $2,500.",
  },
  products: {
    title: "Products",
    lede: "A product is agency work that has repeated often enough to earn a fixed scope and a fixed price. Royto Social is the first. Everything after it is a roadmap, not an offer.",
    metaTitle: "Products",
    metaDescription:
      "Royto Social is the first Royto product, open for its first clients. Voice, Reviews, Chat and Flows are on the roadmap — not for sale yet.",
  },
  roytoSocial: {
    eyebrow: "Royto Social — a Royto product",
    title: "Your social media, on autopilot.",
    lede: "Royto Social plans, writes, schedules and helps answer your social media — while you approve anything that needs your judgment. For any business that runs its own accounts and would rather not.",
    metaTitle: "Royto Social",
    metaDescription:
      "Royto Social plans, writes, schedules and helps answer your social media; you approve anything that needs your judgment. Taking its first clients now.",
  },
  pricing: {
    title: "Pricing",
    lede: "Priced from what delivery actually takes, not a round figure. Everything below is a starting number — you’ll get an exact one in writing before anything is built.",
    metaTitle: "Pricing",
    metaDescription:
      "Audit free while we take founding clients, builds from $1,200, Run from $500/mo, websites from $2,500 — and what changes the price.",
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
