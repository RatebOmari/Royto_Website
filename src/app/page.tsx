import { Hero } from "@/components/hero/Hero";
import { ApprovalSafety } from "@/components/sections/ApprovalSafety";
import { Capabilities } from "@/components/sections/Capabilities";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Founder } from "@/components/sections/Founder";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SafeToTry } from "@/components/sections/SafeToTry";
import { Websites } from "@/components/sections/Websites";

/**
 * Eight sections. Everything else on the site is one link away:
 * scope on /pricing, the Royto Social package from its capability, the
 * founder on /about.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Capabilities />
      <HowItWorks />
      <Websites />
      <ApprovalSafety />
      <Founder />
      <Faq />
      <SafeToTry />
      <FinalCta />
    </>
  );
}
