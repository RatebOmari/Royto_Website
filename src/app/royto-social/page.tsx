import type { Metadata } from "next";
import { PackagePage } from "@/components/sections/PackagePage";
import { roytoSocial } from "@/content/products";

export const metadata: Metadata = {
  title: roytoSocial.metaTitle,
  description: roytoSocial.metaDescription,
  alternates: { canonical: "/royto-social" },
  openGraph: {
    title: roytoSocial.metaTitle,
    description: roytoSocial.metaDescription,
    url: "/royto-social",
  },
};

export default function Page() {
  return <PackagePage content={roytoSocial} />;
}
