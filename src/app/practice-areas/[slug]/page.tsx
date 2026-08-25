import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand, PageHero, Section } from "@/components/sections/Section";
import {
  getPracticeArea,
  practiceAreas,
} from "../../../../content/practice-areas";
import { site } from "../../../../content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return practiceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) return { title: "Practice area" };
  return {
    title: area.title,
    description: area.summary,
    alternates: { canonical: `/practice-areas/${area.slug}` },
  };
}

export default async function PracticeAreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) notFound();

  return (
    <>
      <PageHero eyebrow="Practice area" title={area.title} body={area.intro} />
      <Section>
        <p className="max-w-3xl text-lg text-text-muted">{area.summary}</p>
        <div className="mt-12 space-y-10">
          {area.services.map((group) => (
            <div key={group.title} className="border-t border-line pt-8">
              <h2 className="display-serif text-2xl text-warm-white">
                {group.title}
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border border-line bg-surface/30 px-4 py-3 text-sm text-text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {area.workflow && (
        <Section className="bg-surface">
          <p className="section-label mb-3">How we work</p>
          <h2 className="display-serif mb-8 text-3xl text-warm-white">
            Complete workflow
          </h2>
          <ol className="space-y-4">
            {area.workflow.map((step, index) => (
              <li
                key={step.title}
                className="grid gap-3 border border-line p-5 md:grid-cols-[4rem_1fr]"
              >
                <span className="display-serif text-2xl text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold tracking-wide text-warm-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {area.whyChoose && (
        <Section>
          <p className="section-label mb-3">Why clients choose ProAct</p>
          <ul className="grid gap-3 md:grid-cols-2">
            {area.whyChoose.map((item) => (
              <li
                key={item}
                className="border border-line px-4 py-4 text-text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand
        headline="Book a consultation"
        body={
          area.cta ??
          "Contact ProAct Legal Solutions for professional, proactive legal support tailored to your situation."
        }
        href={site.cta.href}
        label={site.cta.label}
      />
    </>
  );
}
