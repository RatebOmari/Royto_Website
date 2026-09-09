import { Reveal } from "@/components/motion/Reveal";

/** Eyebrow + h2 + intro, the shape every homepage section shares. */
export function SectionHeading({
  eyebrow,
  heading,
  intro,
  id,
  className,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  id?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal>
        <p className="mono-label text-slate">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 id={id} className="mt-4 max-w-[20ch] text-h2 font-extrabold text-ink">
          {heading}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={0.12}>
          <p className="mt-5 measure text-body text-ink-soft">{intro}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
