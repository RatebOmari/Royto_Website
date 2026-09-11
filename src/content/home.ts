/** Homepage copy — verbatim from attachments/copy.md. */

export const hero = {
  eyebrow: "Royto — an AI agency for North Carolina businesses",
  headline: "AI that does the work.",
  /**
   * Authored line breaks for the headline reveal. Keep in step with
   * `headline` above — these are what actually render.
   */
  headlineLines: ["AI that does", "the work."],
  sub: "We build the automation that takes the repetitive part of your week off your plate — quotes and paperwork, customer messages, the website that feeds them — and then we run it for you. Not a tool to learn. Work that stops being yours.",
  primaryCta: { label: "Get a free audit", href: "/contact" },
  secondaryCta: { label: "See how we work", href: "/#how-we-work" },
  canvasLabel: "Example workflow",
} as const;

/** Rendered as the hero trust line — the one place the offer is stated. */
export const foundingBar = {
  lead: "Now taking founding clients in the Triangle.",
  body: "The first two or three North Carolina businesses get a free audit, the build at 25% off the scoped price, and my full attention — in exchange for permission to write up what we did.",
  link: { label: "Apply as a founding client", href: "/contact?for=founding" },
} as const;
