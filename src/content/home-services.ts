/**
 * /home-services — the vertical front door for the first year.
 *
 * The site stays horizontal underneath; this page speaks to one trade at a
 * time in its own words. No industry statistics are quoted: the honesty rule
 * covers claims about Royto, and borrowed numbers read as claims about Royto.
 */

export const homeServices = {
  eyebrow: "Home services · Triangle, North Carolina",
  title: "The phone answered, the quote written, the review asked for — while you’re on the job.",
  lede: "HVAC, plumbing, electrical, roofing. The work that loses you customers isn’t the work on the tools — it’s the call that went to voicemail, the quote that waited until Sunday, and the review nobody asked for. We build the automation that does those three, and then we run it.",
  metaTitle: "AI automation for home services in the Triangle",
  metaDescription:
    "Calls answered while you’re on a job, quotes drafted from the enquiry, a review after every job — for HVAC, plumbing, electrical and roofing in Raleigh, Durham and Chapel Hill.",
  pains: {
    heading: "Three places a trade loses money without noticing",
    items: [
      {
        title: "The call you missed was a customer.",
        body: "You’re under a house or on a roof. The phone rings, it goes to voicemail, and the caller rings the next name on the list. We answer it, capture the details, book the slot, and text back the moment a call is dropped.",
        href: "/never-miss-a-lead",
        link: "Never miss a lead",
      },
      {
        title: "The quote that takes an afternoon.",
        body: "The enquiry has the address, the job and the photos. By the time you’re back at the van, a draft quote built from your last similar jobs is waiting for your sign-off — and the business that quotes first tends to win.",
        href: "/what-we-automate#back-office",
        link: "Documents & back office",
      },
      {
        title: "The review nobody asked for.",
        body: "The job’s done, the customer is happy, and nobody sends the link. A request goes out that evening on its own; a drafted reply waits for every review that lands; anything negative reaches you first.",
        href: "/what-we-automate#reviews",
        link: "Reviews & reputation",
      },
    ],
  },
  fit: {
    heading: "What it works with",
    body: "The calendar and job-management tool you already run the business on, your phone number, your Google Business Profile, and the accounts software your bookkeeper uses. We connect what’s there; we don’t make you move.",
  },
  how: {
    heading: "How it starts",
    steps: [
      "A 30-minute conversation — in your office or at the yard, not a video call",
      "A written map of where the hours and the missed jobs are going, ranked",
      "One build first, usually the phone, live in days",
      "A number every month: calls answered, quotes drafted, reviews in",
    ],
  },
  founding: {
    lead: "Founding clients in the Triangle.",
    body: "The first two or three trades get the audit free, the build at 25% off the scoped price, setup on the phone package waived, and my full attention — in exchange for permission to write up what we did.",
    cta: { label: "Apply as a founding client", href: "/contact?for=founding" },
  },
} as const;
