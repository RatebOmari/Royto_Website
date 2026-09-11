import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { FounderPortrait } from "@/components/ui/FounderPortrait";
import { founderSection } from "@/content/home-sections";
import { founder } from "@/content/site";

export function Founder() {
  return (
    <section className="section-y border-b border-line">
      <div className="container-royto grid gap-12 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:gap-16">
        <Reveal>
          <FounderPortrait name={founder.name} />
        </Reveal>

        <div className="md:pt-4">
          <Reveal>
            <p className="mono-label text-slate">{founderSection.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 max-w-[18ch] text-h2 font-extrabold text-ink">
              {founderSection.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 measure text-body text-ink-soft">
              {founderSection.body}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-8 border-l border-teal pl-4 font-mono text-mono text-slate">
              {founder.signature}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8">
              <ButtonLink href={founderSection.link.href} variant="ghost" arrow>
                {founderSection.link.label}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
