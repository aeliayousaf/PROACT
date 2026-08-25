import type { Metadata } from "next";
import { ScrollScrubHero } from "@/components/hero/ScrollScrubHero";
import { PracticeOverview } from "@/components/sections/PracticeOverview";
import {
  Differentiators,
  EthosGrid,
  ValueProp,
} from "@/components/sections/HomeSections";
import { CtaBand } from "@/components/sections/Section";
import { site } from "../../content/site";

export const metadata: Metadata = {
  title: "Home",
  description: site.summary,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <ScrollScrubHero />
      <ValueProp />
      <PracticeOverview />
      <Differentiators />
      <EthosGrid />
      <CtaBand
        headline={site.cta.headline}
        body={site.cta.body}
        href={site.cta.href}
        label={site.cta.label}
      />
    </>
  );
}
