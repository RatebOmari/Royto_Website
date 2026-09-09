import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { foundingBar } from "@/content/home";

/** Full-bleed band in the offset colour. One line, one link. */
export function FoundingBar() {
  return (
    <section className="border-b border-line bg-ink text-[color:var(--paper)]">
      <div className="container-royto py-8 md:py-10">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-10">
          <p className="max-w-[70ch] text-small text-[color:var(--paper)]/85">
            <strong className="font-semibold text-[color:var(--paper)]">
              {foundingBar.lead}
            </strong>{" "}
            {foundingBar.body}
          </p>
          <Link
            href={foundingBar.link.href}
            className="group inline-flex shrink-0 items-center gap-2 font-mono text-mono uppercase tracking-[0.09em] text-[color:var(--paper)] underline underline-offset-4 decoration-[color:var(--paper)]/30 transition-colors duration-150 hover:decoration-[color:var(--paper)]"
          >
            {foundingBar.link.label}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-[var(--ease-out-quad)] group-hover:translate-x-[3px] motion-reduce:transition-none"
            >
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
