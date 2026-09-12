import type { Metadata } from "next";
import { PackagePage } from "@/components/sections/PackagePage";
import { pages } from "@/content/pages";
import { websitesPage } from "@/content/websites";

const page = pages.websites;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/websites" },
  openGraph: {
    title: page.metaTitle,
    description: page.metaDescription,
    url: "/websites",
  },
};

export default function Page() {
  return <PackagePage content={websitesPage} status="Fixed scope" />;
}
