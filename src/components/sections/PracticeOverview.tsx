"use client";

import Link from "next/link";
import { useState } from "react";
import { practiceAreas } from "../../../content/practice-areas";
import { PracticeAreaIcon } from "@/components/brand/PracticeAreaIcon";
import { ScrollBlurReveal } from "@/components/motion/ScrollBlurReveal";
import { Section } from "./Section";

export function PracticeOverview() {
  const [active, setActive] = useState(practiceAreas[0].slug);
  const current =
    practiceAreas.find((area) => area.slug === active) ?? practiceAreas[0];

  return (
    <Section id="practice-overview" className="border-transparent bg-ink/45 backdrop-blur-sm">
      <div className="relative mb-5 flex flex-col gap-8 md:mb-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
        <p
          className="vertical-label vertical-label-side hidden xl:block"
          aria-hidden
        >
          Services
        </p>
        <div className="max-w-md shrink-0 lg:max-w-[22rem] xl:max-w-lg">
          <ScrollBlurReveal as="p" className="section-label mb-3">
            Practice areas
          </ScrollBlurReveal>
          <ScrollBlurReveal
            as="h2"
            className="display-serif text-[clamp(1.8rem,4vw,3rem)] text-warm-white"
          >
            Focused advocacy across Ontario tribunals and Small Claims Court
          </ScrollBlurReveal>
        </div>
        <div className="hidden flex-1 lg:block" aria-hidden />
        <ScrollBlurReveal
          as="p"
          className="ml-auto w-full max-w-sm shrink-0 text-left text-base text-text-muted md:text-lg lg:max-w-md lg:pt-4 lg:text-right"
          startAt={0.88}
          endAt={0.22}
        >
          Explore the matters we handle. Each area is grounded in clear process,
          organized evidence, and practical next steps.
        </ScrollBlurReveal>
      </div>

      <div
        role="tablist"
        aria-label="Practice areas"
        className="flex gap-1 overflow-x-auto border-b border-line pb-px"
      >
        {practiceAreas.map((area) => {
          const selected = area.slug === active;
          return (
            <button
              key={area.slug}
              type="button"
              role="tab"
              aria-selected={selected}
              id={`tab-${area.slug}`}
              aria-controls={`panel-${area.slug}`}
              className={`shrink-0 border-b-2 px-3 py-3 text-xs font-semibold tracking-[0.1em] whitespace-nowrap uppercase transition-colors md:px-4 ${
                selected
                  ? "border-gold text-gold"
                  : "border-transparent text-text-muted hover:text-warm-white"
              }`}
              onClick={() => setActive(area.slug)}
            >
              {area.shortTitle}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${current.slug}`}
        aria-labelledby={`tab-${current.slug}`}
        className="mt-8 grid gap-8 md:grid-cols-12"
      >
        <div className="md:col-span-7">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="practice-area-icon-wrap shrink-0 text-gold/80">
              <PracticeAreaIcon slug={current.slug} className="h-24 w-24" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="display-serif text-2xl text-warm-white md:text-3xl">
                {current.title}
              </h3>
              <p className="mt-4 text-text-muted">{current.summary}</p>
              <Link
                href={`/practice-areas/${current.slug}`}
                className="btn btn-ghost mt-8"
              >
                Explore this area
              </Link>
            </div>
          </div>
        </div>
        <div className="md:col-span-5">
          <ul className="space-y-3 border border-line/80 bg-ink/30 p-6 backdrop-blur-sm">
            {current.services[0]?.items.slice(0, 5).map((item) => (
              <li
                key={item}
                className="border-b border-line pb-3 text-sm text-text-muted last:border-0 last:pb-0"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <Link href="/practice-areas" className="text-sm text-gold no-underline">
          View all practice areas →
        </Link>
      </div>
    </Section>
  );
}
