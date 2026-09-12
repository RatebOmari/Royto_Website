/** Homepage copy — verbatim from attachments/copy.md. */

export const hero = {
  /** The brand line rides the eyebrow; the H1 is the concrete promise. */
  eyebrow: "Royto — AI that does the work. For trades in the Triangle.",
  headline:
    "The phone answered, the quote written, the review asked for — while you’re on the job.",
  /**
   * Authored line breaks for the headline reveal. Keep in step with
   * `headline` above — these are what actually render.
   */
  headlineLines: [
    "The phone answered,",
    "the quote written,",
    "the review asked for —",
    "while you’re on the job.",
  ],
  sub: "HVAC, plumbing, electrical, roofing. We build the automation that answers the call you’d have missed, drafts the quote from the enquiry, and asks for the review after every job — and then we run it. Not a tool to learn. Work that stops being yours.",
  /** Everyone who isn’t a trade is one link away. */
  escape: { label: "Not a trade? The same six things apply", href: "/what-we-automate" },
  primaryCta: { label: "Get a free audit", href: "/contact" },
  secondaryCta: { label: "See Never miss a lead", href: "/never-miss-a-lead" },
  canvasLabel: "Example workflow",
} as const;

/** Rendered as the hero trust line — the one place the offer is stated. */
export const foundingBar = {
  lead: "Now taking founding clients in the Triangle.",
  body: "The first two or three North Carolina businesses get a free audit, the build at 25% off the scoped price, and my full attention — in exchange for permission to write up what we did.",
  link: { label: "Apply as a founding client", href: "/contact?for=founding" },
} as const;
