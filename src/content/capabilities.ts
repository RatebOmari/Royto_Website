/**
 * The six capability areas — verbatim from attachments/copy.md.
 *
 * `status` is load-bearing, not decoration: the brief forbids letting a
 * planned capability read as a shipping one. Every surface that renders a
 * capability must render its status tag too.
 */

export type CapabilityStatus = "now" | "roadmap" | "case-by-case";

export const STATUS_LABEL: Record<CapabilityStatus, string> = {
  now: "Delivering now",
  roadmap: "On the roadmap",
  "case-by-case": "Case by case",
};

export type CapabilityId =
  | "content"
  | "messaging"
  | "calls"
  | "reviews"
  | "back-office"
  | "custom";

export type Capability = {
  id: CapabilityId;
  title: string;
  status: CapabilityStatus;
  /** Homepage card copy. */
  body: string;
  /** The expanded section on /what-we-automate. */
  expanded: string;
  /**
   * A concrete two-sentence example for /what-we-automate.
   *
   * TODO(copy): the brief asks for an example per capability but the copy
   * deck does not supply one, so these are written to match its voice and
   * its bounds — they describe mechanics only and make no outcome claims.
   * Review before launch.
   */
  example: string;
};

export const capabilities: Capability[] = [
  {
    id: "content",
    title: "Content & social",
    status: "now",
    body: "Posts planned, written and scheduled. Comments and DMs in one inbox, with replies drafted for you. Packaged as Royto Social.",
    expanded:
      "We plan the month, write the posts, schedule them, and put every comment and DM into one place. Routine questions get answered; anything about price, booking or a complaint gets drafted and held for you. This is the work packaged as Royto Social.",
    example:
      "A cafe posts three times a week without anyone remembering to. The month’s plan is agreed on the first of the month, the posts go out on schedule, and the comments asking about opening hours are answered before the owner has read them.",
  },
  {
    id: "messaging",
    title: "Messaging & inbox",
    status: "now",
    body: "Customer messages across WhatsApp, Instagram and Facebook — answered when they’re routine, routed to you when they’re not.",
    expanded:
      "Customers message on whichever channel they happen to be in. We pull WhatsApp, Instagram and Facebook into one lane, answer what’s routine, capture the details into your records, and route the rest to you with a draft already written.",
    example:
      "Someone asks on Instagram whether you take walk-ins, and gets an answer in under a minute. Someone else asks to change a booking they have already paid for, and that one arrives in your approvals with a reply already drafted.",
  },
  {
    id: "calls",
    title: "Calls & bookings",
    status: "roadmap",
    body: "Missed calls answered and returned, appointments booked and confirmed, reminders and no-show follow-up sent on their own.",
    expanded:
      "A missed call is usually a lost customer. The plan: calls answered or returned automatically, the appointment booked into the calendar you already use, and reminders sent so fewer people don’t show.",
    example:
      "A call comes in while you are with a customer and nobody picks up. The caller gets a text back offering the next two free slots, and books one without you touching it.",
  },
  {
    id: "reviews",
    title: "Reviews & reputation",
    status: "roadmap",
    body: "A review request after every job, a drafted reply to every review that comes in, and an alert the moment something negative lands.",
    expanded:
      "The plan: a review request that goes out after every job without you remembering, a drafted reply waiting for every review that arrives, and an immediate alert on anything negative so you’re never the last to know.",
    example:
      "A job is marked complete and a review request goes out that evening without anyone remembering. When a two-star review lands the next morning, you already have an alert and a drafted reply waiting.",
  },
  {
    id: "back-office",
    title: "Back office",
    status: "roadmap",
    body: "Quotes and invoices raised and chased, data kept in sync between the tools you already pay for, recurring reports built and sent.",
    expanded:
      "The plan: quotes and invoices raised and chased on schedule, records kept in sync between the tools you already pay for, and the reports you rebuild every month built once and sent automatically.",
    example:
      "A quote is accepted and the invoice is raised, sent and chased on schedule. The same record updates in your accounting tool without anyone retyping it.",
  },
  {
    id: "custom",
    title: "Custom builds",
    status: "case-by-case",
    body: "Whatever the audit turns up that doesn’t fit a box above — scoped and quoted as a one-off build on your existing tools.",
    expanded:
      "Most businesses have one thing that doesn’t fit any box — a spreadsheet that gets rebuilt weekly, a handover that only works because someone remembers it. If the audit turns it up, we’ll scope and quote it as a one-off build on the tools you already have.",
    example:
      "A workshop rebuilds the same parts-ordering spreadsheet every Monday from four supplier emails. The audit finds it, and it becomes a job that runs itself on Sunday night.",
  },
];

export const capabilitiesSection = {
  eyebrow: "What we automate",
  heading: "Whatever’s eating the week.",
  intro:
    "Every business has a different version of the same problem: work that repeats, that only the owner seems able to do. These are the six places we usually find it.",
} as const;
