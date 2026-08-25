# ProAct Legal Solutions — Website

Dark editorial multi-page site for ProAct Legal Solutions (Ontario), built with Next.js App Router, TypeScript, and Tailwind CSS.

## Quick start

```bash
npm install
cp .env.example .env.local
# add RESEND_API_KEY and OPENAI_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |
| `RESEND_API_KEY` | Contact form email delivery |
| `CONTACT_TO_EMAIL` | Inbox for form submissions (default `info.ptls@gmail.com`) |
| `CONTACT_FROM_EMAIL` | Verified Resend from address |
| `OPENAI_API_KEY` | Server-side AI chat only |
| `OPENAI_MODEL` | Optional model override (default `gpt-4o-mini`) |

Never commit `.env.local` or put API keys in client code.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Content notes / firm review

- Small Claims monetary limit published as **$50,000** (Home + Commercial Lease sources). Services Word doc also contained older `$35,000` wording — normalized; confirm before launch.
- Contact details from approved logo lockup: **416-822-6860**, **info.ptls@gmail.com**.
- Insights has no articles yet (placeholder only).
- Privacy Policy and Website Terms are drafts for firm review.
- Street address and Law Society / licensing registration numbers were not in source materials and are omitted.
- Design reference: `design-reference/site_refrence_image.png` (not served as a page).
- Approved logos in `public/brand/` — do not recolor or rebuild.

## Architecture

- Content modules: `content/`
- UI: `src/components/`
- APIs: `src/app/api/contact`, `src/app/api/chat`
- Hero scroll-scrub: `src/components/hero/ScrollScrubHero.tsx` (native rAF + `video.currentTime`)
