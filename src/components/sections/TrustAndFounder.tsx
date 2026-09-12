import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { FounderPortrait } from "@/components/ui/FounderPortrait";
import { founderSection, safeToTry } from "@/content/home-sections";
import { founder } from "@/content/site";

/**
 * Two sections' worth of trust on one screen: the terms on the left, the
 * person on the right. Both were already on the page; they now share it.
 */
export function TrustAndFounder() {
  return (
    <section className="section-y border-b border-line bg-paper-raised">
      <div className="container-royto grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <Reveal>
            <p className="mono-label text-slate">{safeToTry.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 max-w-[18ch] text-h2 font-extrabold text-ink">{safeToTry.heading}</h2>
          </Reveal>
          <Reveal as="ul" delay={0.12} className="mt-8 space-y-4">
            {safeToTry.items.map((item) => (
              <li key={item} className="flex gap-3 border-b border-line pb-4 text-body text-ink-soft">
                <span aria-hidden="true" className="mt-1 text-teal">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </Reveal>
        </div>

        <div className="grid gap-8 sm:grid-cols-[minmax(0,200px)_minmax(0,1fr)] lg:grid-cols-1">
          <Reveal>
            <FounderPortrait name={founder.name} />
          </Reveal>
          <div>
            <Reveal>
              <p className="mono-label text-slate">{founderSection.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-4 max-w-[18ch] text-h3 font-semibold text-ink">{founderSection.heading}</h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 text-small text-ink-soft">{founderSection.body}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-5 border-l border-teal pl-4 font-mono text-mono-sm text-slate">{founder.signature}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-6">
                <ButtonLink href={founderSection.link.href} variant="ghost" arrow>
                  {founderSection.link.label}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
