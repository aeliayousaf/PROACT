"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { practiceAreas } from "../../../content/practice-areas";
import { navLinks, site } from "../../../content/site";

const practiceAreasHref = "/practice-areas";

function isPracticeAreasActive(pathname: string) {
  return pathname === practiceAreasHref || pathname.startsWith(`${practiceAreasHref}/`);
}

function PracticeAreasDropdown({
  active,
  open,
  onOpenChange,
}: {
  active: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  function closeDropdown() {
    onOpenChange(false);
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={closeDropdown}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          closeDropdown();
        }
      }}
    >
      <Link
        href={practiceAreasHref}
        onClick={closeDropdown}
        className={`inline-flex items-center gap-1.5 text-[0.78rem] font-medium tracking-[0.08em] uppercase no-underline transition-colors ${
          active ? "text-gold" : "text-text-muted hover:text-warm-white"
        }`}
        aria-current={active ? "page" : undefined}
        aria-expanded={open}
      >
        Practice Areas
        <span aria-hidden className="text-[0.55rem] opacity-70">
          ▾
        </span>
      </Link>

      <div
        className={`absolute top-full left-1/2 z-50 w-[17rem] -translate-x-1/2 pt-3 transition duration-200 ${
          open
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <ul className="overflow-hidden rounded-xl border border-line bg-[color-mix(in_srgb,var(--ink)_96%,transparent)] py-2 shadow-2xl backdrop-blur-md">
          {practiceAreas.map((area) => (
            <li key={area.slug}>
              <Link
                href={`${practiceAreasHref}/${area.slug}`}
                onClick={closeDropdown}
                className="block px-4 py-2.5 text-[0.72rem] leading-snug tracking-[0.06em] text-warm-white uppercase no-underline transition-colors hover:bg-surface-elevated hover:text-gold"
              >
                {area.shortTitle}
              </Link>
            </li>
          ))}
          <li className="mt-1 border-t border-line pt-1">
            <Link
              href={practiceAreasHref}
              onClick={closeDropdown}
              className="block px-4 py-2.5 text-[0.72rem] tracking-[0.08em] text-text-muted uppercase no-underline transition-colors hover:bg-surface-elevated hover:text-gold"
            >
              View all areas
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

function PracticeAreasMobileSection({
  active,
  open,
  onToggle,
  onNavigate,
}: {
  active: boolean;
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const panelId = useId();

  return (
    <div>
      <button
        type="button"
        className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm tracking-[0.06em] uppercase ${
          active ? "bg-surface-elevated text-gold" : "text-warm-white"
        }`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        Practice Areas
        <span aria-hidden className={`text-xs transition ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>
      <div id={panelId} hidden={!open} className="mt-1 space-y-1 pl-3">
        {practiceAreas.map((area) => (
          <Link
            key={area.slug}
            href={`${practiceAreasHref}/${area.slug}`}
            onClick={onNavigate}
            className="block rounded-lg px-3 py-2.5 text-sm text-text-muted no-underline transition-colors hover:bg-surface-elevated hover:text-warm-white"
          >
            {area.shortTitle}
          </Link>
        ))}
        <Link
          href={practiceAreasHref}
          onClick={onNavigate}
          className="block rounded-lg px-3 py-2.5 text-sm text-gold no-underline transition-colors hover:bg-surface-elevated"
        >
          View all areas
        </Link>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [practiceDropdownOpen, setPracticeDropdownOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setPracticeOpen(false);
    setPracticeDropdownOpen(false);
  }, [pathname]);

  function closePracticeSubmenu() {
    setPracticeOpen(false);
    setPracticeDropdownOpen(false);
  }

  function closeMenu() {
    setOpen(false);
    closePracticeSubmenu();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[color-mix(in_srgb,var(--ink)_88%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex h-[var(--header-h)] max-w-7xl items-center justify-between gap-4 px-[var(--grid-gutter)]">
        <Link
          href="/"
          className="relative z-10 flex shrink-0 items-center"
          aria-label={`${site.name} home`}
          onClick={closeMenu}
        >
          <Logo size="header" priority />
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            if (link.href === practiceAreasHref) {
              return (
                <PracticeAreasDropdown
                  key={link.href}
                  active={isPracticeAreasActive(pathname)}
                  open={practiceDropdownOpen}
                  onOpenChange={setPracticeDropdownOpen}
                />
              );
            }

            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[0.78rem] font-medium tracking-[0.08em] uppercase no-underline transition-colors ${
                  active ? "text-gold" : "text-text-muted hover:text-warm-white"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="btn btn-primary hidden !min-h-10 !px-4 !text-[0.7rem] sm:inline-flex"
          >
            Contact
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-warm-white lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span
                className={`block h-px w-5 bg-current transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-5 bg-current transition ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px w-5 bg-current transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id={panelId}
        hidden={!open}
        className="border-t border-line bg-ink lg:hidden"
      >
        <nav
          className="flex flex-col gap-1 px-[var(--grid-gutter)] py-4"
          aria-label="Mobile"
        >
          {navLinks.map((link) => {
            if (link.href === practiceAreasHref) {
              return (
                <PracticeAreasMobileSection
                  key={link.href}
                  active={isPracticeAreasActive(pathname)}
                  open={practiceOpen}
                  onToggle={() => setPracticeOpen((v) => !v)}
                  onNavigate={closeMenu}
                />
              );
            }

            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`rounded-lg px-3 py-3 text-sm tracking-[0.06em] uppercase no-underline ${
                  active ? "bg-surface-elevated text-gold" : "text-warm-white"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={site.phoneHref}
            className="mt-2 rounded-lg px-3 py-3 text-sm text-text-muted no-underline"
          >
            {site.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
