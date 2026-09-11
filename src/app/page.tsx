import { Hero } from "@/components/hero/Hero";
import { ApprovalSafety } from "@/components/sections/ApprovalSafety";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Capabilities } from "@/components/sections/Capabilities";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Founder } from "@/components/sections/Founder";
import { FoundingBar } from "@/components/sections/FoundingBar";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { Included } from "@/components/sections/Included";
import { Pricing } from "@/components/sections/Pricing";
import { Products } from "@/components/sections/Products";
import { Websites } from "@/components/sections/Websites";

export default function Home() {
  return (
    <>
      <Hero />
      <FoundingBar />
      <Capabilities />
      <BeforeAfter />
      <HowWeWork />
      <Websites />
      <Included />
      <ApprovalSafety />
      <Founder />
      <Products />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}
