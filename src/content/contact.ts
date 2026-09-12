/**
 * Contact intents. Every contextual button on the site keeps its own label
 * and carries its intent here as `/contact?for=…`, so the form asks the
 * question that matches what was clicked and the enquiry arrives already
 * triaged. The default (no query) is the free audit — the site's primary ask.
 */

export type ContactIntent = "audit" | "website" | "social" | "founding";

export const DEFAULT_INTENT: ContactIntent = "audit";

export type IntentCopy = {
  /** Option label in the "What is this about?" field. */
  label: string;
  /** The page lede for this intent. */
  lede: string;
  /** Label on the message field. */
  prompt: string;
  /** Subject-line prefix on the email. */
  subject: string;
};

export const contactIntents: Record<ContactIntent, IntentCopy> = {
  audit: {
    label: "A free automation audit",
    lede: "Tell me what’s eating your week. If there’s something automatable in it, I’ll map it and send it back — 30 minutes, free, and yours whether or not we work together.",
    prompt: "What’s eating your week?",
    subject: "Audit request",
  },
  website: {
    label: "A website",
    lede: "Tell me what the site needs to do — who lands on it, what they should be able to do there, and what should happen afterwards. I’ll come back with the package that fits and a number.",
    prompt: "What does the site need to do?",
    subject: "Website quote",
  },
  social: {
    label: "Royto Social",
    lede: "Tell me which accounts you run and what keeps slipping. If Royto Social fits, I’ll come back with a pilot scope and a start date.",
    prompt: "Which accounts, and what keeps slipping?",
    subject: "Royto Social pilot",
  },
  founding: {
    label: "Becoming a founding client",
    lede: "Tell me what’s eating your week. The first two or three founding clients get a free audit, the build at 25% off the scoped price, and my full attention — in exchange for permission to write up what we did.",
    prompt: "What’s eating your week?",
    subject: "Founding client application",
  },
};

export function isContactIntent(value: unknown): value is ContactIntent {
  return typeof value === "string" && value in contactIntents;
}

/** Builds the href a contextual button should carry. */
export function contactHref(intent: ContactIntent): string {
  return intent === DEFAULT_INTENT ? "/contact" : `/contact?for=${intent}`;
}
