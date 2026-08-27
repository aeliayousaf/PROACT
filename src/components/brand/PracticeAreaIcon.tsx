import type { ReactElement } from "react";

type PracticeAreaIconProps = {
  slug: string;
  className?: string;
};

type IconProps = { className?: string };

function IconSmallClaims({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <path
        d="M32 8v44M18 52h28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 24h16l-4 12H16L12 24ZM36 24h16l-4 12H40L36 24Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M20 24 32 16l12 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconHousingTenancy({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <path
        d="M10 30 32 14l22 16v22H10V30Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M26 52V38h12v14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M42 24h12v8H42zM10 24h12v8H10z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBenefitsTribunals({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <path
        d="M14 46h36M18 46V22h28v24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M24 30h16M24 36h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M38 14 32 8 26 14l6 4 6-4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M32 18v8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconRslaPpsa({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <path
        d="M12 40c0-8 8-14 20-14s20 6 20 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 40h28l-2 10H20l-2-10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect
        x="24"
        y="22"
        width="16"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M32 34v6M28 40h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconImmigrationRefugee({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth="2" />
      <path
        d="M32 14v36M14 32h36"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 20c4 2 8 2 12 0M32 44c4-2 8-2 12 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="38"
        y="36"
        width="14"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M41 42h8M41 46h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const icons: Record<string, (props: IconProps) => ReactElement> = {
  "small-claims": IconSmallClaims,
  "housing-tenancy": IconHousingTenancy,
  "benefits-tribunals": IconBenefitsTribunals,
  "rsla-ppsa": IconRslaPpsa,
  "immigration-refugee": IconImmigrationRefugee,
};

export function PracticeAreaIcon({ slug, className = "h-16 w-16" }: PracticeAreaIconProps) {
  const Icon = icons[slug] ?? IconSmallClaims;
  return <Icon className={className} />;
}
