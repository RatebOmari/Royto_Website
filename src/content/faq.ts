/** FAQ — verbatim from attachments/copy.md. */

export type FaqItem = {
  question: string;
  answer: string;
  /** Reused on /pricing, which shows only the pricing-relevant subset. */
  pricing?: boolean;
  /** False for items that only restate a homepage section; they show on /pricing instead. */
  home?: false;
};

export const faqSection = {
  eyebrow: "Questions",
  heading: "What owners usually ask.",
} as const;

export const faq: FaqItem[] = [
  {
    question: "What actually happens in the free audit?",
    answer:
      "A 30-minute conversation about where your week goes, then a written map of what could be automated, ranked by hours saved. You keep it either way — there’s no obligation to build anything with us.",
    pricing: true,
    home: false,
  },
  {
    question: "Do I have to change the tools I already use?",
    answer:
      "Usually not. Most builds connect the tools you already pay for rather than replacing them. If something genuinely needs replacing, we’ll say so and tell you what it costs.",
    pricing: true,
  },
  {
    question: "What happens when the AI gets something wrong?",
    answer:
      "Anything involving money, a commitment, or a complaint is drafted but held for you. Only routine, reversible things run unattended — and every build states in writing which is which before it goes live.",
    pricing: true,
    home: false,
  },
  {
    question: "How long does a build take?",
    answer:
      "Most first builds run one to three weeks from agreed scope to live, depending on how many tools have to be connected. You’ll get a date with the scope, not after it.",
    pricing: true,
  },
  {
    question: "Do you only work with North Carolina businesses?",
    answer:
      "For now, mostly yes — and deliberately. Being able to sit in your office beats a video call, and the early work is better for it. If you’re elsewhere and the fit is obviously right, ask anyway.",
  },
  {
    question: "We’re bigger than a small business. Is that a problem?",
    answer:
      "The opposite. Most of what we build pays off hardest at 20–200 people, where there’s enough repetition to be worth automating and enough going on that nobody has time to fix it.",
  },
  {
    question: "What results should I realistically expect?",
    answer:
      "Hours back, and fewer things dropped. We’re not going to promise a revenue number before we’ve built anything in your business — that’s what the first build is for.",
    pricing: true,
  },
];
