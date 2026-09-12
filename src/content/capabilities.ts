/**
 * The six capability areas — verbatim from attachments/copy.md.
 *
 * `status` is load-bearing, not decoration: the brief forbids letting a
 * planned capability read as a shipping one. Every surface that renders a
 * capability must render its status tag too.
 *
 * The order is revenue first — leads, quotes, the site, the inbox — then
 * reputation, then content. Owners buy revenue before they buy hours. It is
 * rendered as-is everywhere,
 * so reordering this array reorders the homepage grid, the /what-we-automate
 * sections and its side rail together.
 */

export type CapabilityStatus = "now" | "roadmap" | "case-by-case";

export const STATUS_LABEL: Record<CapabilityStatus, string> = {
  now: "Available now",
  roadmap: "On the roadmap",
  "case-by-case": "Case by case",
};

export type CapabilityId =
  | "back-office"
  | "websites"
  | "messaging"
  | "content"
  | "calls"
  | "reviews"
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
  /** One problem-led line an owner recognises before the category name. */
  pain: string;
  /**
   * How you buy it. Every area is one of three: a custom build scoped from
   * the audit, a ready-made package, or a fixed website package. Roadmap
   * areas have none — the tag does that job.
   */
  buy?: { label: string; href: string };
};

const LEAD_PACKAGE = {
  label: "Ready-made package: Never miss a lead — see what’s included",
  href: "/never-miss-a-lead",
};

const CUSTOM_BUILD = {
  label: "Custom build, scoped from your audit — see how it’s priced",
  href: "/pricing",
};

export const capabilities: Capability[] = [
  {
    id: "calls",
    title: "Calls & bookings",
    status: "now",
    pain: "The call you missed was a customer.",
    buy: LEAD_PACKAGE,
    body: "Missed calls answered and returned, appointments booked and confirmed, reminders and no-show follow-up sent on their own.",
    expanded:
      "A missed call is usually a lost customer. Calls answered or returned automatically, the appointment booked into the calendar you already use, and reminders sent so fewer people don’t show. Built on a voice platform we configure to your business, not from scratch — which is why it can be live in days.",
    example:
      "A call comes in while you are with a customer and nobody picks up. The caller gets a text back offering the next two free slots, and books one without you touching it.",
  },
  {
    id: "back-office",
    title: "Documents & back office",
    status: "now",
    pain: "The quote that takes an afternoon.",
    buy: CUSTOM_BUILD,
    body: "Quotes, estimates and proposals drafted in minutes instead of days. Reports assembled, and data kept in sync between the tools you already pay for.",
    expanded:
      "The quote that takes an afternoon, the proposal assembled from four old ones, the report rebuilt every month, the same figures re-keyed into three systems. This is where skilled people lose the most hours, and where a system pays for itself fastest. We start with whatever produces revenue — usually quoting and estimating, because the business that quotes first tends to win the job.",
    example:
      "A quote request arrives on Monday morning. By the time you’ve read it, a draft built from your last four similar jobs is waiting for your sign-off — and once it’s accepted, the same figures land in your accounting tool without anyone retyping them.",
  },
  {
    id: "websites",
    title: "Websites & lead capture",
    status: "now",
    pain: "A site that just sits there.",
    buy: { label: "Fixed packages — see the packages", href: "/websites" },
    body: "A fast, modern site on a fixed scope and price — with lead capture, booking and follow-up wired in from day one, not bolted on afterwards.",
    expanded:
      "A site that looks current and loads fast, built on a fixed scope and price. The difference is what happens after someone arrives: enquiries captured properly, routed to the right person, and followed up automatically instead of sitting in an inbox until Thursday.",
    example:
      "Someone fills in the enquiry form at 9pm. They get an acknowledgement within a minute, the enquiry lands with the right person with the details already captured, and if nobody has replied by Wednesday a follow-up goes out on its own.",
  },
  {
    id: "messaging",
    title: "Messaging & inbox",
    status: "now",
    pain: "DMs answered whenever there’s a gap.",
    buy: CUSTOM_BUILD,
    body: "Customer messages across WhatsApp, Instagram and Facebook — answered when they’re routine, routed to you when they’re not.",
    expanded:
      "Customers message on whichever channel they happen to be in. We pull WhatsApp, Instagram and Facebook into one lane, answer what’s routine, capture the details into your records, and route the rest to you with a draft already written.",
    example:
      "Someone asks on Instagram whether you take walk-ins, and gets an answer in under a minute. Someone else asks to change a booking they have already paid for, and that one arrives in your approvals with a reply already drafted.",
  },
  {
    id: "reviews",
    title: "Reviews & reputation",
    status: "now",
    pain: "The review you found out about last.",
    buy: LEAD_PACKAGE,
    body: "A review request after every job, a drafted reply to every review that comes in, and an alert the moment something negative lands.",
    expanded:
      "A review request that goes out after every job without you remembering, a drafted reply waiting for every review that arrives, and an immediate alert on anything negative so you’re never the last to know. Part of the Never miss a lead package.",
    example:
      "A job is marked complete and a review request goes out that evening without anyone remembering. When a two-star review lands the next morning, you already have an alert and a drafted reply waiting.",
  },
  {
    id: "content",
    title: "Content & social",
    status: "now",
    pain: "Posts that never quite go out.",
    buy: {
      label: "Ready-made package: Royto Social — see what’s included",
      href: "/royto-social",
    },
    body: "Posts planned, written and scheduled, with comments and DMs in one place. Packaged as Royto Social.",
    expanded:
      "We plan the month, write the posts, schedule them, and put every comment and DM into one place. Routine questions get answered; anything about price, booking or a complaint gets drafted and held for you. This is the work packaged as Royto Social.",
    example:
      "A cafe posts three times a week without anyone remembering to. The month’s plan is agreed on the first of the month, the posts go out on schedule, and the comments asking about opening hours are answered before the owner has read them.",
  },
];

/**
 * Custom builds are not a card: six cards fill the grid and a seventh orphans
 * a row. On the homepage this is a single line beneath the grid; on
 * /what-we-automate it is the closing section after the six.
 */
export const customBuild: Capability & { note: { lead: string; body: string } } = {
  id: "custom",
  title: "Custom builds",
  status: "case-by-case",
  pain: "The spreadsheet someone rebuilds every Monday.",
  buy: CUSTOM_BUILD,
  body: "Whatever the audit turns up that doesn’t fit a box above — scoped and quoted as a one-off build on your existing tools.",
  expanded:
    "Most businesses have one thing that doesn’t fit any box — a spreadsheet that gets rebuilt weekly, a handover that only works because someone remembers it. If the audit turns it up, we’ll scope and quote it as a one-off build on the tools you already have.",
  example:
    "A workshop rebuilds the same parts-ordering spreadsheet every Monday from four supplier emails. The audit finds it, and it becomes a job that runs itself on Sunday night.",
  note: {
    lead: "Something that doesn’t fit a box above?",
    body: "That’s most businesses. Whatever the audit turns up gets scoped and quoted as a custom build on the tools you already use.",
  },
};

export const capabilitiesSection = {
  eyebrow: "What we automate",
  heading: "Whatever’s eating the week.",
  intro:
    "Every business has a different version of the same problem: work that repeats, that only a few people seem able to do. These are the six places we usually find it.",
  /** Who this is for — stated once, where the offer is laid out. */
  audience:
    "Businesses of five to two hundred people, in any industry where the same work repeats every week.",
  /**
   * TODO(placeholder): name the tools once the list is confirmed — only ones
   * that can actually be connected today. Until then the line stays generic.
   */
  tools:
    "Works with the tools you already have — accounting, CRM, calendar, messaging, email — and most things with an API or an inbox.",
} as const;
