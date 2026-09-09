import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { finalCta } from "@/content/home-sections";

/** Inverted panel, single button. The blueprint grid returns here only. */
export function FinalCta() {
  return (
    <section className="section-y">
      <div className="container-royto">
        <Reveal>
          <div className="relative overflow-hidden rounded-panel bg-ink px-6 py-20 text-center md:px-16 md:py-28">
            <div
              aria-hidden="true"
              className="blueprint pointer-events-none absolute inset-0 opacity-[0.14] [mask-image:radial-gradient(90%_70%_at_50%_50%,#000,transparent_80%)]"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-[16ch] text-h2 font-extrabold text-[color:var(--paper)]">
                {finalCta.heading}
              </h2>
              <div className="mt-10 flex justify-center">
                <ButtonLink href={finalCta.button.href} arrow>
                  {finalCta.button.label}
                </ButtonLink>
              </div>
              <p className="mx-auto mt-8 max-w-[52ch] font-mono text-mono text-[color:var(--slate)]">
                {finalCta.note}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
