/** Homepage sections 4–7 — verbatim from attachments/copy.md. */

export const beforeAfter = {
  eyebrow: "Before / after",
  heading: "What changes once Royto is running.",
  byHand: {
    title: "By hand",
    items: [
      "Admin done at 11pm because that’s the only quiet hour",
      "Customer messages answered whenever there’s a gap",
      "Four tools that don’t talk to each other",
      "Hiring someone to copy and paste, or letting it slide",
    ],
  },
  withRoyto: {
    title: "With Royto",
    items: [
      "The repetitive work runs on a schedule, without you",
      "Routine questions answered in minutes, day or night",
      "The tools you already pay for wired into one flow",
      "You approve only what genuinely needs your judgment",
    ],
  },
} as const;

/**
 * The scrub panels. The same six tasks on both sides — that is the whole
 * point of the comparison, so the rows are paired by index.
 *
 * "Waiting on you" appears in gold on BOTH sides deliberately: Royto does not
 * claim to remove the owner's judgment, only the work around it.
 */
export type TaskTag = "open" | "missed" | "handled" | "waiting";

export type ScrubRow = { time: string; task: string; tag: TaskTag };

export const scrubTasks: { byHand: ScrubRow[]; withRoyto: ScrubRow[] } = {
  byHand: [
    { time: "22:41", task: "Reply to three Instagram DMs", tag: "open" },
    { time: "22:41", task: "Chase last week’s invoice", tag: "missed" },
    { time: "23:16", task: "Write tomorrow’s post", tag: "handled" },
    { time: "23:16", task: "Answer the booking question", tag: "handled" },
    { time: "23:52", task: "Copy new leads into the sheet", tag: "open" },
    { time: "23:52", task: "Price query from a regular", tag: "waiting" },
  ],
  withRoyto: [
    { time: "09:04", task: "Reply to three Instagram DMs", tag: "handled" },
    { time: "10:30", task: "Chase last week’s invoice", tag: "handled" },
    { time: "11:15", task: "Write tomorrow’s post", tag: "handled" },
    { time: "13:42", task: "Answer the booking question", tag: "handled" },
    { time: "15:20", task: "Copy new leads into the sheet", tag: "handled" },
    { time: "16:05", task: "Price query from a regular", tag: "waiting" },
  ],
};

export const TAG_LABEL: Record<TaskTag, string> = {
  open: "still open",
  missed: "missed",
  handled: "handled",
  waiting: "waiting on you",
};

export const howWeWork = {
  eyebrow: "How we work",
  heading: "Audit, build, run.",
  intro:
    "One shape for every engagement, priced at each stage. You can stop after any of them.",
  stages: [
    {
      number: "01",
      title: "Audit",
      body: "A 30-minute conversation about where your week goes, then a written map of what’s automatable — ranked by hours saved. Yours to keep, whether or not you build anything.",
    },
    {
      number: "02",
      title: "Build",
      body: "We pick the highest-value item, agree a written scope, and build it on your real accounts and tools. Tested, documented, and handed over working.",
    },
    {
      number: "03",
      title: "Run",
      body: "We operate it, watch it, fix it when something changes, and improve it — and send you a monthly summary in plain numbers. Cancel with 30 days’ notice.",
    },
  ],
} as const;

export const included = {
  eyebrow: "Exactly what you get",
  heading: "A bounded engagement, not a vague promise.",
  intro:
    "“AI for your business” is too broad to trust. Here’s precisely what’s in a Royto engagement — and what isn’t.",
  yes: [
    "A named person on your account",
    "A written scope agreed before any build starts",
    "The automation built and tested on your real accounts, not a demo",
    "Plain-language documentation of what it does",
    "Monitoring and fixes for anything on a Run plan",
    "A monthly summary in real numbers",
    "Any change of scope quoted before work begins",
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
  body: "Royto is built by Rateb Al-Omari, an engineer in Raleigh who spent years building automation inside a technical firm — and stood up its digital solutions practice — before turning the same instinct toward other North Carolina businesses. The ones with real customers, real paperwork, and nobody to hand the admin to. Royto is the agency that does that work for them: we build it, and then we run it.",
} as const;

export const finalCta = {
  heading: "What would you stop doing yourself?",
  button: { label: "Get a free automation audit", href: "/contact" },
  note: "royto.tech · 30 minutes, plus a written map of what’s automatable — ranked by hours saved",
} as const;

export const aboutPage = {
  bodies: [
    "I spent years automating repetitive technical work as an engineer — scripts and systems that gave a team back hours a week. Somewhere in that, I kept noticing the same thing outside of work: small businesses doing by hand, every week, exactly the kind of work I’d spent my career teaching systems to do.",
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
