"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faq as allFaq, faqSection, type FaqItem } from "@/content/faq";
import { ease } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Accordion — motion.md §6. Height animated properly, 400ms easeInOutQuart,
 * one open at a time, chevron rotates 180°, content fades in behind the height
 * change so it doesn't appear to stretch.
 *
 * Every answer stays in the DOM as a real element when open; under reduced
 * motion the panel simply appears. Nothing is hidden from a screen reader that
 * a sighted visitor can reach.
 */
function Item({
  item,
  open,
  onToggle,
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
}) {
  const reduced = useReducedMotion();
  const id = useId();

  return (
    <li className="border-b border-line">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          className="flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className="text-h3 font-semibold text-ink">{item.question}</span>
          <motion.span
            aria-hidden="true"
            animate={{ rotate: open ? 180 : 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.4, ease: ease.inOutQuart }}
            className="grid size-7 shrink-0 place-items-center rounded-full border border-line text-slate"
          >
            <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6 l5 5 l5 -5" />
            </svg>
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? { height: 0 } : { height: 0, opacity: 0 }}
            transition={
              reduced
                ? { duration: 0 }
                : {
                    height: { duration: 0.4, ease: ease.inOutQuart },
                    opacity: { duration: 0.4, ease: ease.inOutQuart, delay: 0.1 },
                  }
            }
            className="overflow-hidden"
          >
            <p className="measure pb-6 text-body text-ink-soft">{item.answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

export function Faq({
  items = allFaq.filter((item) => item.home !== false),
  heading = faqSection.heading,
  eyebrow = faqSection.eyebrow,
  id,
}: {
  items?: FaqItem[];
  heading?: string;
  eyebrow?: string;
  id?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id={id} className="scroll-mt-32 section-y border-b border-line">
      <div className="container-royto">
        <SectionHeading eyebrow={eyebrow} heading={heading} />
        <Reveal delay={0.12}>
          <ul className="mt-12 border-t border-line">
            {items.map((item, index) => (
              <Item
                key={item.question}
                item={item}
                open={openIndex === index}
                // One open at a time.
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
