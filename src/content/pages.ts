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
    lede: "Six places the same problem shows up. Two of them we deliver today; the rest are on the roadmap, and we’ll tell you which is which before you spend anything.",
    metaTitle: "What we automate",
    metaDescription:
      "The six places repetitive work usually hides in a small business — content and social, messaging, calls and bookings, reviews, back office, and custom builds. We say plainly which we deliver today and which are on the roadmap.",
  },
  products: {
    title: "Products",
    lede: "A product is agency work that has repeated often enough to earn a fixed scope and a fixed price. Royto Social is the first. Everything after it is a roadmap, not an offer.",
    metaTitle: "Products",
    metaDescription:
      "Royto Social is the first Royto product, currently in pilot. Royto Voice, Reviews, Chat and Flows are on the roadmap — not available to buy yet.",
  },
  roytoSocial: {
    eyebrow: "Royto Social — a Royto product",
    title: "Your social media, on autopilot.",
    lede: "Royto Social plans, writes, schedules and helps answer your social media — while you approve anything that needs your judgment. For any business that runs its own accounts and would rather not.",
    metaTitle: "Royto Social",
    metaDescription:
      "Royto Social plans, writes, schedules and helps answer your social media, while you approve anything that needs your judgment. In pilot with a small number of founding businesses.",
  },
  pricing: {
    title: "Pricing",
    lede: "Priced from what delivery actually takes, not a round figure. Everything below is a starting number — you’ll get an exact one in writing before anything is built.",
    metaTitle: "Pricing",
    metaDescription:
      "Audit, Build and Run priced with real numbers: a free audit while we take founding clients, builds from $1,200, and running it from $500/mo. Plus what actually changes the price.",
  },
  about: {
    eyebrow: "About",
    title: "An engineer who got tired of watching people do work a system could do.",
    metaTitle: "About",
    metaDescription:
      "Royto is built by Rateb Al-Omari, an engineer who spent years automating repetitive technical work before turning the same instinct toward small businesses.",
  },
  contact: {
    title: "What would you stop doing yourself?",
    lede: "Tell me what’s eating your week. If there’s something automatable in it, I’ll map it and send it back — 30 minutes, free, and yours whether or not we work together.",
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
