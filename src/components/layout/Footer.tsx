import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { footerLegalLinks, navLinks, site } from "../../../content/site";
import { practiceAreas } from "../../../content/practice-areas";

const footerPracticeAreaPrimaryLinks = [
  "small-claims",
  "benefits-tribunals",
  "immigration-refugee",
] as const;

const footerPracticeAreaSecondaryLinks = [
  "housing-tenancy",
  "rsla-ppsa",
] as const;

function getPracticeAreaLink(slug: string) {
  const area = practiceAreas.find((item) => item.slug === slug);
  if (!area) return null;

  return (
    <li key={area.slug}>
      <Link
        href={`/practice-areas/${area.slug}`}
        className="no-underline hover:text-gold"
      >
        {area.shortTitle}
      </Link>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-[var(--grid-gutter)] py-14 md:grid-cols-12">
        <div className="md:col-span-3">
          <Logo size="footer" />
        </div>

        <div className="md:col-span-2">
          <p className="section-label mb-4">Explore</p>
          <ul className="space-y-2 text-sm text-text-muted">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="no-underline hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="section-label mb-4">Practice areas</p>
          <ul className="space-y-2 text-sm text-text-muted">
            {[...footerPracticeAreaPrimaryLinks, ...footerPracticeAreaSecondaryLinks].map(
              (slug) => getPracticeAreaLink(slug),
            )}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="section-label mb-4">Contact</p>
          <p className="max-w-sm text-sm text-text-muted">{site.summary}</p>
          <p className="mt-4 text-sm text-text-muted">
            <a href={site.phoneHref} className="text-warm-white no-underline">
              {site.phone}
            </a>
            <br />
            <a href={site.emailHref} className="text-warm-white no-underline">
              {site.email}
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-[var(--grid-gutter)] py-6 text-xs text-text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Serving {site.jurisdiction}.
          </p>
          <div className="flex flex-wrap gap-4">
            {footerLegalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="no-underline hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <p className="mx-auto max-w-7xl px-[var(--grid-gutter)] pb-8 text-xs leading-relaxed text-text-muted/80">
          {site.disclaimerShort}
        </p>
      </div>
    </footer>
  );
}
