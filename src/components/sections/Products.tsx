import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { ProductWordmark } from "@/components/ui/Wordmark";
import {
  homeProducts,
  productsSection,
  ROADMAP_NOTE,
  STAGE_LABEL,
  type Product,
} from "@/content/products";
import { stagger } from "@/lib/motion";

/** Only the piloted product is a link; a roadmap card must not look buyable. */
export function ProductCard({ product }: { product: Product }) {
  const inner = (
    <Card
      as="div"
      interactive={Boolean(product.href)}
      className="h-full items-start p-6"
    >
      <div className="flex w-full items-start justify-between gap-3">
        <ProductWordmark product={product.name} className="text-[17px]" />
        <Tag tone={product.stage === "pilot" ? "teal" : "slate"}>
          {STAGE_LABEL[product.stage]}
        </Tag>
      </div>
      <p className="mt-5 text-small text-ink-soft">{product.body}</p>

      {product.href ? (
        <span className="mt-6 inline-flex items-center gap-2 font-mono text-mono-sm uppercase tracking-[0.09em] text-teal-ink">
          See Royto Social
          <span
            aria-hidden="true"
            className="transition-transform duration-300 ease-[var(--ease-out-quad)] group-hover/card:translate-x-[3px] motion-reduce:transition-none"
          >
            →
          </span>
        </span>
      ) : (
        <p className="mt-6 border-t border-line pt-4 text-small text-slate">
          {ROADMAP_NOTE}
        </p>
      )}
    </Card>
  );

  return product.href ? (
    <Link href={product.href} className="block h-full rounded-card">
      {inner}
    </Link>
  ) : (
    inner
  );
}

export function Products() {
  return (
    <section id="products" className="section-y border-b border-line">
      <div className="container-royto">
        <SectionHeading
          eyebrow={productsSection.eyebrow}
          heading={productsSection.heading}
          intro={productsSection.intro}
        />

        <Reveal
          as="ul"
          stagger={stagger.card}
          delay={0.18}
          className="mt-14 grid gap-4 md:grid-cols-3"
        >
          {homeProducts.map((product, index) => (
            <RevealItem as="li" key={product.id} index={index} className="h-full">
              <ProductCard product={product} />
            </RevealItem>
          ))}
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-8 measure text-small text-slate">
            <strong className="font-semibold text-ink">
              {productsSection.noteLead}
            </strong>{" "}
            {productsSection.noteBody}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
