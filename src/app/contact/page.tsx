import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { PageHeader } from "@/components/ui/PageHeader";
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

export default function Page() {
  return (
    <>
      <PageHeader {...page} />
      <div className="container-royto py-20 md:py-28">
        <Reveal className="max-w-[640px]">
          <ContactForm />
        </Reveal>
      </div>
    </>
  );
}
