/**
 * Websites — verbatim from attachments/copy.md.
 *
 * A service, not the thesis: the homepage section is deliberately quieter
 * than the automation sections, and the same three packages and fixed-scope
 * line are reused on /websites so the two can never drift apart.
 */

export type WebsitePackage = {
  name: string;
  price: string;
  body: string;
};

export const websitePackages: WebsitePackage[] = [
  {
    name: "Starter",
    price: "$2,500–4,000",
    body: "Up to 5 pages, two weeks, fixed scope. Lead capture and automatic follow-up included.",
  },
  {
    name: "Business",
    price: "$4,500–8,000",
    body: "Up to 12 pages, booking or intake flows, a CMS for the pages that change, analytics set up properly.",
  },
  {
    name: "Care plan",
    price: "From $150/mo",
    body: "Hosting, updates, monitoring and small changes — so it stays current instead of ageing quietly.",
  },
];

/** The protection clause. It is on both surfaces, in bold, for a reason. */
export const fixedScopeNote = {
  lead: "Fixed scope, fixed price, fixed timeline, two revision rounds.",
  body: "No open-ended quotes and no surprise invoices — you’ll know the number and the date before anything starts.",
} as const;

/** Homepage section, placed after "How we work". */
export const websitesSection = {
  eyebrow: "Websites",
  heading: "The front door the automation lives in.",
  intro:
    "Most websites are a brochure that sits there. We build yours as the place leads actually arrive — with capture, booking and follow-up wired in from the first day, so the site does something after someone lands on it.",
  cta: { label: "See the packages", href: "/websites" },
} as const;

/** /websites */
export const websitesPage = {
  body: "A site on its own is a cost. A site with capture, booking and follow-up built in is the cheapest salesperson you’ll ever hire. That’s the only version we build, and it’s why we quote a website and an automation together rather than as two projects.",
  howItWorks: {
    heading: "How it works",
    steps: [
      "One call to agree scope and content",
      "A design direction you sign off before any build",
      "Two weeks (Starter) or three to four (Business)",
      "Two revision rounds",
      "Launch, then the care plan takes over",
    ],
  },
  included: {
    heading: "What’s included",
    yes: [
      "Design and build",
      "Mobile and accessibility pass",
      "Lead capture and routing",
      "Automatic follow-up on every enquiry",
      "Analytics set up properly",
      "Basic SEO structure",
      "Training so you can edit the pages that change",
    ],
    no: [
      "Original photography or video",
      "Ongoing content writing beyond launch",
      "Paid ad management",
      "E-commerce storefronts — we don’t do those, and we’ll tell you who does",
    ],
  },
  packagesHeading: "Packages",
  /**
   * The only proof there is: this site. One honest line, no case study
   * dressed up around it.
   */
  proof:
    "This site is one of ours — it scores 100 across the board on desktop Lighthouse and mid-90s on mobile. Run the test yourself.",
  cta: {
    lead: "Want a number? Tell me what the site needs to do.",
    button: { label: "Get a quote", href: "/contact?for=website" },
  },
} as const;
