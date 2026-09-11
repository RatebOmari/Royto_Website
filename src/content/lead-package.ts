/**
 * Never miss a lead — the flagship package.
 *
 * The market's fastest sale for a local business is the call or enquiry it
 * would otherwise have missed. This package is built on an existing voice
 * platform configured to the client's business, which is why it can be live
 * in days and priced monthly. "Available now" here means what it means
 * everywhere on the site: work Royto will take on today — nothing about it
 * has been delivered for an outside client yet.
 *
 * TODO(placeholder): the founder picks the voice platform before the first
 * client goes live; the monthly price assumes platform costs are passed
 * through at cost plus margin, never absorbed.
 */

export const leadPackage = {
  name: "Never miss a lead",
  eyebrow: "Never miss a lead — a Royto package",
  title: "Every call answered. Every enquiry replied to. Every job followed by a review.",
  lede: "A missed call is usually a lost customer, and the business that answers first usually wins the job. This package answers the phone when you can’t, replies to web enquiries in minutes, routes messages to the right person, and asks for the review after every job — all on the tools you already use.",
  statusLine: "Available now — configured to your business in days, not built from scratch.",
  primaryCta: { label: "Apply as a founding client", href: "/contact?for=founding" },
  secondaryCta: { label: "See what’s included", href: "#included" },
  forWho: {
    heading: "Who it’s for",
    body: "Trades and home services first — HVAC, plumbing, electrical, roofing — and any business where the phone rings while you’re on a job, enquiries land after hours, and nobody has time to chase reviews. If you’ve ever found a voicemail two days late, it’s for you.",
  },
  included: [
    "Calls answered 24/7 in your business’s voice, with the caller’s details captured",
    "Appointments booked into the calendar you already use, and confirmed",
    "Missed-call text-back the moment a call is dropped",
    "Web enquiries acknowledged in under two minutes, then routed to the right person",
    "DMs and messages across WhatsApp, Instagram and Facebook in one lane",
    "A review request after every completed job, and a drafted reply to every review",
    "An alert the moment something negative lands",
    "A monthly numbers report: calls answered, enquiries replied to, reviews requested",
  ],
  notIncluded: [
    "Outbound sales calls or cold calling",
    "Complaints, pricing disputes or emergencies handled without a person",
    "Paid ad management or lead generation",
    "Original recorded greetings or voice talent beyond the platform’s voices",
  ],
  approval: {
    heading: "How approval works",
    automatic:
      "Hours, location, availability, “do you offer X”, booking into open slots, the missed-call text-back and the review request are handled automatically.",
    held: "Anything about price beyond your published rates, a complaint, a cancellation, or an emergency is drafted and routed to a person — and the caller is told someone will be in touch.",
  },
  pricing: {
    heading: "Pricing",
    tiers: [
      {
        name: "Setup",
        price: "$750",
        body: "Configured to your business: greetings, questions, calendar, routing rules. Waived for founding clients.",
      },
      {
        name: "Monthly",
        price: "From $449/mo",
        body: "Everything above, running and monitored. Call volume sets the exact number; platform costs are passed through at cost.",
      },
      {
        name: "Custom",
        price: "Quoted",
        body: "Multi-location, high call volume, or integration with a job-management system beyond the calendar.",
      },
    ],
    note: "Cancel with 30 days’ notice. What we configured is yours; the platform subscription can move to your name.",
  },
  metaTitle: "Never miss a lead",
  metaDescription:
    "Calls answered 24/7, web enquiries replied to in minutes, a review after every job — configured to your business in days. From $449/mo. Raleigh, NC.",
} as const;
