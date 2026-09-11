import { Reveal } from "@/components/motion/Reveal";
import { safeToTry } from "@/content/home-sections";

/**
 * The risk reversal, gathered in one place directly before the ask. Every
 * line is a term already stated elsewhere on the site; this is the summary
 * a skeptical buyer reads last.
 */
export function SafeToTry() {
  return (
    <section className="section-y border-b border-line bg-paper-raised">
      <div className="container-royto">
        <Reveal>
          <p className="mono-label text-slate">{safeToTry.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-4 max-w-[20ch] text-h2 font-extrabold text-ink">
            {safeToTry.heading}
          </h2>
        </Reveal>
        <Reveal as="ul" delay={0.12} className="mt-10 grid gap-x-12 gap-y-4 md:grid-cols-2">
          {safeToTry.items.map((item) => (
            <li key={item} className="flex gap-3 border-b border-line pb-4 text-body text-ink-soft">
              <span aria-hidden="true" className="mt-1 text-teal">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
