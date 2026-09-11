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
  trust:
    "A 30-minute look at where your hours actually go, plus a written map of what’s automatable — ranked by time saved. No tools to install, no account access needed.",
  canvasLabel: "Example workflow",
} as const;

export const foundingBar = {
  lead: "Now taking founding clients in the Triangle.",
  body: "The first two or three North Carolina businesses get a free audit, a discounted build, and my full attention — in exchange for permission to write up what we did.",
  link: { label: "Apply as a founding client", href: "/contact" },
} as const;
