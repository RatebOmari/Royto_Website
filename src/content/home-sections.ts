/** Homepage sections — verbatim from attachments/copy.md. */

/**
 * Each stage renders with its price from pricing.ts — this section replaced
 * both the pinned sequence and the homepage Pricing grid.
 */
export const howWeWork = {
  eyebrow: "How it works, and what it costs",
  heading: "Audit, build, run.",
  intro:
    "One shape for every engagement, priced at each stage. You can stop after any of them.",
  link: { label: "See full pricing", href: "/pricing" },
  stages: [
    {
      number: "01",
      title: "Audit",
      body: "A 30-minute conversation about where your week goes, then a written map of what’s automatable — ranked by hours saved. No tools to install, no account access needed, and yours to keep whether or not you build anything.",
    },
    {
      number: "02",
      title: "Build",
      body: "We pick the highest-value item, agree a written scope, and build it on your real accounts and tools. Tested, documented, and handed over working.",
    },
    {
      number: "03",
      title: "Run",
      body: "We operate it, watch it, fix it when something changes, and improve it — and send you a monthly summary in plain numbers. Cancel with 30 days’ notice: the automation stays yours and keeps running; you just stop getting the monitoring and fixes.",
    },
  ],
} as const;

export const included = {
  eyebrow: "Exactly what you get",
  heading: "A bounded engagement, not a vague promise.",
  intro:
    "“AI for your business” is too broad to trust. Here’s precisely what’s in a Royto engagement — and what isn’t.",
  yes: [
    "The founder on your account — no account manager in between",
    "A written scope agreed before any build starts",
    "The automation built and tested on your real accounts, not a demo — and it’s yours: the accounts, the workflows, the documentation. If you leave, it keeps running",
    "Plain-language documentation of what it does",
    "Monitoring and fixes for anything on a Run plan",
    "A monthly summary in real numbers",
    "Any change of scope quoted before work begins",
    "If the first build doesn’t do what the written scope says, you don’t pay the balance",
  ],
  no: [
    "Strategy decks or workshops with no build attached",
    "Guaranteed revenue, leads, or rankings",
    "Original photography or video production",
    "Paid ad spend management",
    "Anything sensitive sent without a human seeing it first",
  ],
} as const;

export const approval = {
  eyebrow: "How approval & safety work",
  heading: "AI drafts. You decide what actually matters.",
  intro:
    "A wrong answer about money or a commitment costs more than a slow one — so every automation we build states, in writing, what it does on its own and what it holds for a person.",
  autonomous: {
    title: "Runs on its own",
    body: "Routine, factual and reversible: hours, availability, a scheduled post, a record synced between tools. The things where a mistake costs minutes.",
  },
  held: {
    title: "Waits for you",
    body: "Money, commitments, complaints, or anything sensitive: written up by AI, sent only once you’ve approved it.",
  },
} as const;

export const founderSection = {
  eyebrow: "Why Royto exists",
  heading: "Built by someone who automates for a living.",
  /** Two sentences here; the whole story is on /about. */
  body: "Royto is built by Rateb Al-Omari, an engineer in Raleigh who spent years building automation inside a technical firm — and stood up its digital solutions practice — before turning the same instinct toward other North Carolina businesses. The ones with real customers, real paperwork, and nobody to hand the admin to.",
  link: { label: "More about Royto", href: "/about" },
} as const;

/**
 * The risk reversal, stated once before the ask. Nothing here is new — each
 * line is a term the site already makes elsewhere.
 */
export const safeToTry = {
  eyebrow: "Before you ask",
  heading: "Why it’s safe to try.",
  items: [
    "The audit is free and needs no account access",
    "The scope and the price are in writing before anything starts",
    "AI drafts; you approve anything about money, commitments or complaints",
    "You own everything we build",
    "Cancel Run whenever you like — the automation keeps running",
    "If the first build doesn’t do what the written scope says, you don’t pay the balance",
  ],
} as const;

export const finalCta = {
  heading: "What would you stop doing yourself?",
  button: { label: "Get a free audit", href: "/contact" },
  note: "royto.tech · Free · 30 minutes · yours to keep",
} as const;

export const aboutPage = {
  bodies: [
    "I spent years automating repetitive technical work as an engineer — scripts and systems that gave a team back hours a week. Somewhere in that, I kept noticing the same thing outside of work: businesses of every size doing by hand, every week, exactly the kind of work I’d spent my career teaching systems to do.",
    "Not because they don’t know better. Because nobody builds it for them. Software hands them another app to operate. An agency does the work, but costs what an agency costs. Neither one actually solves it.",
    "So Royto does the fourth thing: we look at where your week actually goes, build the automation for the parts that repeat, and then run it — with anything involving money, a commitment, or a complaint still waiting on a person.",
    "Royto is early. There’s no client wall on this site because there aren’t clients to put on it yet — I’d rather show you that than a page of stock logos. Right now I’m running a handful of free audits and taking the first founding clients.",
  ],
  doesNot: {
    heading: "What Royto deliberately doesn’t do",
    items: [
      "Sell you software to operate yourself",
      "Run anything sensitive without a person seeing it",
      "Promise a revenue number before building anything",
      "Charge a retainer with no build attached",
    ],
  },
} as const;
