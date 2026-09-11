import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  contactIntents,
  DEFAULT_INTENT,
  isContactIntent,
} from "@/content/contact";
import { pages } from "@/content/pages";

const page = pages.contact;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: page.metaTitle,
    description: page.metaDescription,
    url: "/contact",
  },
};

/**
 * Rendered on request rather than prerendered: the lede and the form's first
 * field depend on `?for=`, and reading it here means a visitor who clicked
 * "Get a quote" sees the website lede on first paint, not after hydration.
 */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ for?: string }>;
}) {
  const { for: query } = await searchParams;
  const intent = isContactIntent(query) ? query : DEFAULT_INTENT;

  return (
    <>
      <PageHeader {...page} lede={contactIntents[intent].lede} />
      <div className="container-royto py-20 md:py-28">
        <Reveal className="max-w-[640px]">
          <ContactForm intent={intent} />
        </Reveal>
      </div>
    </>
  );
}
