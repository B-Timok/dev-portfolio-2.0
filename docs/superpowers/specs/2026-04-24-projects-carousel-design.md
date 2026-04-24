# Projects Carousel + Portfolio Sweep — Design

**Date:** 2026-04-24
**Branch:** `feat/portfolio-ui-refresh`
**Status:** Approved

## Goal

Replace the current tri-block projects section (Athlos featured → Websites → Other projects, 471 LoC in one file) with a single unified carousel that gives each of the 6 projects full-slide treatment. Ship a small sweep of portfolio-wide improvements from the 2026-04-24 review alongside it, in the same PR.

## Non-goals

- Per-project case study sub-pages (`/projects/[slug]`) — deferred; content model is designed so those can be added later without refactoring.
- Blog, testimonials content, dark-mode toggle revival, JSON-LD structured data.
- Changes to sections other than Projects, Navigation, and site-wide layout/metadata.

## Carousel — architecture

**Library:** `embla-carousel-react` (headless, ~5 KB, built-in touch/drag/keyboard/a11y). No framer-motion involvement in carousel mechanics.

**File decomposition** (replaces `src/components/sections/project-section.tsx`, 471 LoC):

| Path | Responsibility | Rendering |
|---|---|---|
| `src/data/projects.ts` | Typed `Project[]` — single source of truth for all project content | Module |
| `src/components/sections/projects-section.tsx` | Section shell: `<section id="projects">`, heading, counter, animations wrapper | Server |
| `src/components/projects/projects-carousel.tsx` | Embla instance, arrow buttons, dot indicators, keyboard handling, drag | Client |
| `src/components/projects/project-slide.tsx` | One slide, D1/M1 responsive layout via Tailwind | Client |
| `src/components/projects/project-visual.tsx` | Discriminated render: single-image vs multi-mockup (Athlos) | Client |

Counter + heading can live in the server wrapper; current-index display lives in the client carousel.

## Data model

```ts
// src/data/projects.ts
export type ProjectVisual =
  | { kind: "image"; src: string; alt: string }
  | { kind: "mockups"; mockups: { src: string; alt: string }[]; logo?: string };

export type ProjectLink = {
  label: string;
  href: string;
  icon: "external" | "github" | "app-store";
};

export type Project = {
  slug: string;          // "athlos-app"
  title: string;         // "Athlos"
  meta: string;          // "2025 · Solo dev · Live"
  pitch: string;         // one-sentence big type
  writeup: string;       // 2–3 sentences
  stack: string[];
  links: ProjectLink[];
  visual: ProjectVisual;
  accentIndex: number;   // 0–4, from lib/playful.ts palette
};

export const projects: Project[] = [ /* 6 entries */ ];
```

Array order = carousel order. Athlos slide 1 (`kind: "mockups"`); remaining 5 use `kind: "image"`.

## Desktop layout (D1)

- Slide = full-bleed container, inner content `max-w-[1200px]`.
- Grid: `md:grid-cols-[60%_40%]`, gap-12.
- **Left (60%):** `ProjectVisual`. Image-kind = large framed mockup with ambient shadow. Mockups-kind = existing 3-phone staggered layout.
- **Right (40%):** vertical stack — meta line (mono, muted) → title (large) → pitch (medium, accent-colored) → writeup → stack tags → links row.
- **Arrows:** floating pill buttons at left/right edges of carousel viewport, outside slide content. Disabled (dimmed, non-interactive) at start/end. Carousel does NOT loop.
- **Dots:** center-bottom, current dot uses current slide's accent color.
- **Counter:** top-right of section heading, mono font, `02 / 06` format.
- **Keyboard:** ←/→ advance when carousel region has focus. Tab order: left-arrow → slide content (links focusable) → right-arrow → first dot.

## Mobile layout (M1)

- Each slide = full viewport width, stacked vertical.
- **Top:** visual, framed, aspect-ratio locked. Athlos exception: one featured mockup + horizontal scroll-snap strip of the other two below it (preserves "many screens" story without breaking single-column flow).
- **Below:** meta → title → pitch → writeup → stack tags (wrap) → links row (stacked, full-width tap targets, min 44px height).
- **Nav:** dots centered below slide + native swipe. Arrows hidden below `md` breakpoint.
- **First-view hint:** subtle right-pointing chevron animation on first mount; fades after first swipe or after 4s. Respects `prefers-reduced-motion`.
- Slide snap = full width, no peek — one project fills the viewport per "due diligence" goal.

## Nav bar — name scrolls to top

`src/components/navigation.tsx`: wrap "Brandon Timok" in a `<button>` with `onClick` that calls `window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })`. Preserves existing accent-rotation hover treatment. `aria-label="Scroll to top"`.

## Companion sweep

All in the same PR, independent of carousel:

1. **XSS fix in `src/app/api/contact/route.ts`** — escape HTML entities in `name`, `subject`, `message` before HTML template interpolation. Small inline utility (`escapeHtml`), no deps.
2. **Email format validation + length limits** in API route: max name 100, subject 200, message 5000 chars. Email regex. Return 400 on fail.
3. **In-memory IP rate limit** in API route: 3 submissions / 10 min per IP. Map-based, reset on process restart — good enough for a portfolio. Swap to Upstash later if needed.
4. **OG metadata migration** — move `next/head` contents from `src/app/page.tsx` into the `metadata`/`openGraph`/`twitter` exports in `src/app/layout.tsx`. Delete the `<Head>` import and `"use client"` directive on `page.tsx` if no longer needed.
5. **Server-ify static sections** — remove `"use client"` from `hero-section`, `about-section`, `experience-section`. Animation wrappers (`FadeUp`, `StaggerGroup`) stay client and are used as islands. `projects-section` wrapper is server; carousel inside is client.
6. **Skip-to-content link** in `src/app/layout.tsx`, positioned absolute, visible on focus only.
7. **App Router SEO conventions:**
   - `src/app/sitemap.ts` — single entry for the root URL.
   - `src/app/robots.ts` — allow all.
   - `src/app/icon.tsx` OR keep current favicon — confirm at impl time.
8. **Vercel Analytics** — add `@vercel/analytics/next`, mount `<Analytics />` in `layout.tsx`.
9. **`src/app/not-found.tsx`** — minimal branded 404 with link back home.
10. **Deletions** (all confirmed safe by survey):
    - `src/components/theme-toggle.tsx` — orphaned, layout forces dark.
    - `src/components/sections/testimonial-section.tsx` — 4 LoC stub returning null.
    - `react-icons` dep from `package.json` — unused; `lucide-react` is the in-use icon lib.
11. **Consolidate accent colors** — one shared constant in `src/lib/playful.ts`, remove `FIELD_ACCENT` (contact-section) and `SECTION_ACCENT` (navigation) duplicates. All consumers import from `playful.ts`.
12. **CSS `:hover` replacement** — swap inline `onMouseEnter`/`onMouseLeave` handlers on cards and tool tags for Tailwind hover utilities. Reduced-motion-safe by default.
13. **Image compression** — re-export the large PNGs in `public/` to WebP (`kls-home.png` 2.2MB, `dashboard_mockup.png` 1.2MB, `stats_mockup.png` 1.1MB, `workout_mockup.png` 816KB, `athlos-logo.png` 904KB). Update references in code. **Gate:** confirm with user before overwriting source assets; generate WebP alongside PNGs and update references to new paths as the safer path.

## Interfaces / contracts

- `ProjectsCarousel` props: `{ projects: Project[] }`. No other state in.
- `ProjectSlide` props: `{ project: Project }`.
- `ProjectVisual` props: `{ visual: ProjectVisual; title: string }` (title used for decorative alt fallbacks).
- Section wrapper passes `projects` array imported from `src/data/projects.ts` into the carousel.

## Accessibility

- Carousel region: `role="region"` + `aria-roledescription="carousel"` + `aria-label="Projects"`.
- Each slide: `role="group"` + `aria-roledescription="slide"` + `aria-label="{n} of {total}: {title}"`.
- Arrow buttons: `aria-label="Previous project" / "Next project"`, `disabled` at ends.
- Dot buttons: `aria-label="Go to project {n}: {title}"`, `aria-current="true"` for active.
- Offscreen slides: `aria-hidden="true"` (Embla provides this).
- Drag + keyboard + dots all result in the same state — Embla guarantees this.
- Respects `prefers-reduced-motion`: disables the chevron hint animation and uses instant (non-smooth) programmatic scroll for arrow/dot clicks.

## Rollout

- Single feature branch (`feat/portfolio-ui-refresh`, already active).
- Commit groups:
  1. Carousel scaffold + data file (no content change yet)
  2. Project slide layout (desktop + mobile)
  3. Carousel nav (arrows, dots, keyboard, counter, first-view hint)
  4. Delete old project-section, wire new one into page
  5. Nav bar: name → scroll to top
  6. Companion sweep, grouped topically (one commit per cluster: API security; metadata/SEO; server-ify; deletions; hover/a11y; analytics)
- No `Co-Authored-By` trailer on any commit (per user memory).
- Final manual browser pass: desktop viewport + mobile viewport (Chrome devtools emulation), all 6 slides, all nav affordances, contact form submission (should still work unchanged for end user).

## Out of scope / follow-ups

- `/projects/[slug]` case study pages (data model ready for it).
- Migrating in-memory rate limit to Upstash.
- Dark-mode toggle revival (component currently orphaned and deleted in this PR).
- JSON-LD structured data for Person schema.
- Blog or writing section.
