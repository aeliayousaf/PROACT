import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative z-10 border-t border-line px-[var(--grid-gutter)] py-16 md:py-24 ${className}`}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  body,
  vertical,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  vertical?: string;
}) {
  return (
    <div className="relative mb-10 md:mb-14">
      {vertical && (
        <p
          className="vertical-label vertical-label-side hidden xl:block"
          aria-hidden
        >
          {vertical}
        </p>
      )}
      {eyebrow && <p className="section-label mb-3">{eyebrow}</p>}
      <h2 className="display-serif max-w-3xl text-[clamp(1.8rem,4vw,3rem)] text-warm-white">
        {title}
      </h2>
      {body && (
        <p className="mt-4 max-w-2xl text-base text-text-muted md:text-lg">
          {body}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="border-b border-line bg-surface px-[var(--grid-gutter)] py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        {eyebrow && <p className="section-label mb-3">{eyebrow}</p>}
        <h1 className="display-serif text-[clamp(2rem,5vw,3.5rem)] text-warm-white">
          {title}
        </h1>
        {body && (
          <p className="mt-5 max-w-2xl text-base text-text-muted md:text-lg">
            {body}
          </p>
        )}
      </div>
    </div>
  );
}

export { CtaBand } from "./CtaBand";
