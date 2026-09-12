import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { homeServices } from "@/content/home-services";

/** The three places a trade loses money — the first thing after the hero. */
export function ThreePains() {
  const { pains } = homeServices;
  return (
    <section className="section-y border-b border-line">
      <div className="container-royto">
        <Reveal>
          <h2 className="max-w-[22ch] text-h2 font-extrabold text-ink">{pains.heading}</h2>
        </Reveal>
        <Reveal as="ul" delay={0.08} className="mt-12 grid gap-4 md:grid-cols-3">
          {pains.items.map((item) => (
            <li key={item.title}>
              <Card className="h-full items-start p-7">
                <h3 className="text-h3 font-semibold text-ink">{item.title}</h3>
                <p className="mt-4 text-small text-ink-soft">{item.body}</p>
                <Link
                  href={item.href}
                  className="mt-6 inline-flex items-center gap-2 font-mono text-mono-sm uppercase tracking-[0.09em] text-teal-ink"
                >
                  {item.link}
                  <span aria-hidden="true">→</span>
                </Link>
              </Card>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
