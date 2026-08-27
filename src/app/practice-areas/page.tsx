import type { Metadata } from "next";
import Link from "next/link";
import { PracticeAreaIcon } from "@/components/brand/PracticeAreaIcon";
import { CtaBand, PageHero, Section } from "@/components/sections/Section";
import { practiceAreas } from "../../../content/practice-areas";
import { site } from "../../../content/site";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Small Claims, housing and tenancy, benefits appeals, RSLA & PPSA liens, and immigration & refugee hearings across Ontario.",
  alternates: { canonical: "/practice-areas" },
};

export default function PracticeAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Practice areas"
        title="Trusted representation across Ontario"
        body="We provide trusted representation in Small Claims Court, social housing, residential tenancy, commercial lease disputes, benefits and tribunal appeals, RSLA & PPSA lien disputes, and immigration and refugee hearings."
      />
      <Section>
        <ul className="grid gap-4 md:grid-cols-2">
          {practiceAreas.map((area, index) => (
            <li key={area.slug}>
              <Link
                href={`/practice-areas/${area.slug}`}
                className="group flex h-full gap-5 border border-line bg-surface/40 p-6 no-underline transition hover:border-gold/50"
              >
                <div className="practice-area-icon-wrap shrink-0 self-start text-gold/80 transition-colors group-hover:text-gold">
                  <PracticeAreaIcon slug={area.slug} className="h-20 w-20" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="section-label block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="display-serif mt-3 text-2xl text-warm-white group-hover:text-gold">
                    {area.title}
                  </h2>
                  <p className="mt-3 text-sm text-text-muted">{area.summary}</p>
                  <span className="mt-6 inline-block text-xs tracking-[0.14em] text-gold uppercase">
                    View details →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand
        headline={site.cta.headline}
        body={site.cta.body}
        href={site.cta.href}
        label={site.cta.label}
      />
    </>
  );
}
