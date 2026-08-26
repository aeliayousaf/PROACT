"use client";

import { useState } from "react";
import { site } from "../../../content/site";
import { homeValue } from "../../../content/home";
import { ScrollBlurReveal } from "@/components/motion/ScrollBlurReveal";
import { ScrollSlideIn } from "@/components/motion/ScrollSlideIn";
import { Section } from "./Section";

function EthosFlipCard({
  letter,
  title,
  description,
}: {
  letter: string;
  title: string;
  description: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <li
      className={`ethos-flip-card${flipped ? " is-flipped" : ""}`}
      tabIndex={0}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onFocus={() => setFlipped(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setFlipped(false);
        }
      }}
    >
      <div className="ethos-flip-card-inner">
        <div className="ethos-flip-card-face ethos-flip-card-front">
          <span className="ethos-flip-letter display-serif text-gold">{letter}</span>
        </div>
        <div className="ethos-flip-card-face ethos-flip-card-back">
          <h3 className="ethos-flip-back-title display-serif text-warm-white">
            {title}
          </h3>
          <p className="ethos-flip-back-copy mt-3 text-text-muted">{description}</p>
        </div>
      </div>
    </li>
  );
}

export function ValueProp() {
  return (
    <Section className="border-transparent bg-transparent">
      <div className="relative flex flex-col gap-10 lg:min-h-[42vh] lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <p
          className="vertical-label vertical-label-side hidden xl:block"
          aria-hidden
        >
          Firm
        </p>
        <ScrollSlideIn
          from="left"
          distance={180}
          className="max-w-md shrink-0 lg:max-w-[22rem] xl:max-w-md"
        >
          <ScrollBlurReveal as="p" className="section-label mb-3">
            {homeValue.eyebrow}
          </ScrollBlurReveal>
          <ScrollBlurReveal
            as="h2"
            className="display-serif text-[clamp(1.8rem,4vw,3rem)] text-warm-white"
          >
            {homeValue.title}
          </ScrollBlurReveal>
        </ScrollSlideIn>
        <div className="hidden flex-1 lg:block" aria-hidden />
        <ScrollSlideIn
          from="right"
          distance={180}
          delay={0.18}
          startAt={0.88}
          endAt={0.22}
          className="ml-auto w-full max-w-sm shrink-0 lg:max-w-md"
        >
          <ScrollBlurReveal
            as="p"
            className="w-full text-left text-base text-text-muted md:text-lg lg:pt-4 lg:text-right"
            startAt={0.88}
            endAt={0.22}
          >
            {homeValue.body}
          </ScrollBlurReveal>
        </ScrollSlideIn>
      </div>
    </Section>
  );
}

export function Differentiators() {
  return (
    <Section id="why-proact" className="border-transparent bg-transparent">
      <div className="relative flex flex-col gap-10 lg:min-h-[55vh] lg:flex-row lg:items-start lg:justify-between lg:gap-12">
        <p
          className="vertical-label vertical-label-side hidden xl:block"
          aria-hidden
        >
          Approach
        </p>
        <div className="max-w-md shrink-0 lg:max-w-[22rem] xl:max-w-lg">
          <ScrollBlurReveal as="p" className="section-label mb-3">
            Why ProAct
          </ScrollBlurReveal>
          <ScrollBlurReveal
            as="h2"
            className="display-serif text-[clamp(1.6rem,3.5vw,2.5rem)] text-warm-white"
          >
            We don’t just represent you — we transform your legal challenges into
            strategic solutions.
          </ScrollBlurReveal>
        </div>
        <div className="hidden flex-1 lg:block" aria-hidden />
        <ul className="ml-auto flex w-full max-w-sm flex-col gap-3 lg:max-w-[20rem]">
          {site.differentiators.map((item, index) => (
            <li
              key={item}
              className="border border-line/80 bg-ink/35 p-4 backdrop-blur-sm transition hover:border-gold/40"
            >
              <span className="section-label">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-sm leading-snug text-warm-white">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function EthosGrid() {
  return (
    <Section className="border-transparent bg-ink/65">
      <div className="relative mb-10 md:mb-14">
        <p
          className="vertical-label vertical-label-side hidden xl:block"
          aria-hidden
        >
          PROACT
        </p>
        <ScrollBlurReveal as="p" className="section-label mb-3">
          The ProAct method
        </ScrollBlurReveal>
        <ScrollBlurReveal
          as="h2"
          className="display-serif max-w-3xl text-[clamp(1.8rem,4vw,3rem)] text-warm-white"
        >
          A foundational approach in every file
        </ScrollBlurReveal>
        <ScrollBlurReveal
          as="p"
          className="mt-4 max-w-2xl text-base text-text-muted md:text-lg"
          startAt={0.88}
          endAt={0.22}
        >
          {site.nameMeaning}
        </ScrollBlurReveal>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {site.ethos.map((item) => (
          <EthosFlipCard
            key={item.letter}
            letter={item.letter}
            title={item.title}
            description={item.description}
          />
        ))}
      </ul>
    </Section>
  );
}
