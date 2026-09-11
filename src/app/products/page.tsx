import type { Metadata } from "next";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/sections/Products";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { allProducts, productsSection } from "@/content/products";
import { pages } from "@/content/pages";
import { stagger } from "@/lib/motion";

const page = pages.products;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/products" },
  openGraph: {
    title: page.metaTitle,
    description: page.metaDescription,
    url: "/products",
  },
};

export default function Page() {
  return (
    <>
      <PageHeader {...page} />

      <div className="container-royto py-20 md:py-28">
        <Reveal>
          <p className="measure text-body text-ink-soft">
            We don’t design products in advance. We do the work by hand for real
            businesses first, and once the same build has repeated enough times,
            we freeze it into something with a name and a fixed price. It’s slower,
            and it means nothing here gets called proven until it has run for real
            clients.
          </p>
        </Reveal>

        <Reveal
          as="ul"
          stagger={stagger.card}
          delay={0.1}
          className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {allProducts.map((product, index) => (
            <RevealItem as="li" key={product.id} index={index} className="h-full">
              <ProductCard product={product} />
            </RevealItem>
          ))}
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-10 measure text-small text-slate">
            <strong className="font-semibold text-ink">
              {productsSection.noteLead}
            </strong>{" "}
            {productsSection.noteBody}
          </p>
        </Reveal>
      </div>

      <section className="border-t border-line">
        <div className="container-royto py-20 md:py-28">
          <Reveal>
            <p className="measure-lede text-lede text-ink">
              Not sure whether you need a product or a build? That’s what the
              audit is for.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8">
              <ButtonLink href="/contact" arrow>
                Get a free audit
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
