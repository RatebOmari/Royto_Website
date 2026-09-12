/**
 * Legal and holding pages.
 *
 * The copy deck does not supply Privacy or Terms. Both below are written from
 * what the site actually does — the contact form, the theme preference, one
 * cookieless analytics script — in the site's own voice. Reviewed against the
 * live site and published 12 Sep 2026. When the site starts doing something
 * new with visitors' data, this file changes first and the date with it.
 */

export type LegalSection = { heading: string; body: string[] };

export const privacy = {
  title: "Privacy",
  lede: "Short, because there isn’t much to say. This site collects almost nothing, and what it does collect is here in full.",
  updated: "Last updated September 2026",
  sections: [
    {
      heading: "What we collect",
      body: [
        "If you use the contact form, we receive what you type into it: your name, your business name, your email address, your message, and which of our services you said it was about. That is sent to hello@royto.tech as an email and kept in that mailbox. It is used to reply to you and for nothing else.",
        "If you email us directly, we keep the email the way anyone keeps email.",
        "The site sets no cookies. It runs one analytics script, Vercel Web Analytics, which counts page views and the paths visitors take without cookies, without identifying anyone, and without following you to other sites. It also stores one preference in your browser — whether you chose light or dark — and that never leaves your device.",
      ],
    },
    {
      heading: "Who else sees it",
      body: [
        "The site is hosted on Vercel, and the contact mailbox is hosted with our email provider. Both keep the ordinary server logs any host keeps. Neither is given your enquiry for any purpose of their own, and we don’t sell, share or trade anything you send us.",
      ],
    },
    {
      heading: "How long we keep it",
      body: [
        "Enquiries stay in the mailbox until they’re no longer needed to follow up, and are deleted on request. If we go on to work together, what you’ve sent becomes part of that engagement and is covered by its written scope.",
      ],
    },
    {
      heading: "Your choices",
      body: [
        "Ask and we’ll tell you what we hold about you, correct it, or delete it. Email hello@royto.tech.",
        "If this page changes, the date at the top changes with it.",
      ],
    },
  ] satisfies LegalSection[],
} as const;

export const terms = {
  title: "Terms",
  lede: "What you can rely on when you use this site. Terms for an engagement live in the written scope we agree before any work starts — not here.",
  updated: "Last updated September 2026",
  sections: [
    {
      heading: "This site",
      body: [
        "royto.tech is published by Royto, Raleigh, North Carolina. You can read it, link to it, and share it. Please don’t copy it wholesale, scrape it, or present it as your own.",
        "Simulated content on this site is labelled as such — “Example workflow”, “Example audit map”, “Example monthly numbers”. It shows how an automation behaves, not the result of work for a named client.",
      ],
    },
    {
      heading: "Prices and roadmap",
      body: [
        "Where a price on this site says “from”, it is a starting point; where a page says fixed, it is fixed for the scope described. Either way, the number you can rely on is the one in a written scope. Anything marked “On the roadmap” is a plan, not an offer, and nothing implies it can be bought today.",
      ],
    },
    {
      heading: "Engagements",
      body: [
        "Any audit, build, run plan, package or website is governed by the written scope agreed for it — what it covers, what it costs, when it lands, and what happens if it changes. Where that scope and this page differ, the scope wins.",
        "Two promises on this site are meant literally. The first-build guarantee: if the first build doesn’t do what its written scope says, you don’t pay the balance. The founding-client offer — a free audit, the build at 25% off the scoped price, and permission for us to write up the work — is for the first two or three engagements and ends without notice once they are taken.",
      ],
    },
    {
      heading: "No guarantees from the site itself",
      body: [
        "The site is provided as is. We keep it accurate and current, but nothing on it is a promise of a particular result for your business — the site says so in several places, and it means it.",
      ],
    },
    {
      heading: "Questions",
      body: ["hello@royto.tech. If this page changes, the date at the top changes with it."],
    },
  ] satisfies LegalSection[],
} as const;

/**
 * /work is a real route that is honestly empty. It is not populated with
 * anything invented — the first founding client write-up goes here.
 */
export const work = {
  eyebrow: "Work",
  title: "Case studies",
  holding:
    "No case studies yet — the first founding client work goes here. Royto is taking its first two or three founding clients now, in exchange for permission to write up what we did.",
  cta: { label: "Apply as a founding client", href: "/contact" },
  metaTitle: "Work",
  metaDescription:
    "Royto’s case studies. None yet — the first founding client write-ups go here.",
} as const;
