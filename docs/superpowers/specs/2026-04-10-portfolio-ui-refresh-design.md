# Portfolio UI Refresh — Design Spec

**Date:** 2026-04-10
**Project:** `dev-portfolio-2.0`
**Scope:** Motion polish + targeted UI tune-ups across all five sections. Not a full visual redesign — the overall layout, section order, and existing pastel accent palette are preserved.

## Goals

- Replace a currently motion-less static page with tasteful entrance animations and hover micro-interactions.
- Tune up visual hierarchy in the two sections most in need of work (Hero, Projects) and polish the rest.
- Introduce a brand-color system so tools and companies are represented by their *real* colors (Supabase green, AWS orange, Athlos green, etc.), falling back to the existing pastel palette for entities without a distinctive brand.
- Respect `prefers-reduced-motion` so motion-opt-out visitors still get a polished static experience.

## Non-Goals

- Full visual rebrand — keep the pastel accent palette in `src/lib/playful.ts`.
- Switching from dark mode. Site stays forced-dark via `<html className="dark">`.
- Changing section order or adding/removing sections.
- Rewriting `src/lib/playful.ts`. It stays because the literal-class predeclaration pattern is load-bearing for Tailwind v4 JIT.
- CMS/data extraction. Section content remains hardcoded.

## Motion System

Three reusable motion patterns are the entire motion vocabulary for the site. Every animated element on the page uses one of these — no one-off choreography.

### Pattern 1 · Fade-up reveal

The workhorse. Used for every section heading, paragraph block, and card on first scroll into view.

- **From:** `opacity: 0; transform: translateY(16px)`
- **To:** `opacity: 1; transform: translateY(0)`
- **Duration:** 600ms
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out cubic)
- **Trigger:** `whileInView` (framer-motion), once only, `viewport: { once: true, margin: "-80px" }`

### Pattern 2 · Stagger children

Used for lists, experience highlight bullets, tool chips, and project tech tags.

- **Parent:** `staggerChildren: 0.08` (80ms between children)
- **Child:** fade-up pattern above
- **Cap:** Lists with more than ~12 children stop staggering after child 12 to avoid a long visible wait

### Pattern 3 · Hover lift + accent glow

CSS-only, no JS. Used for project cards, experience cards, and the Education side card.

- **Rest:** `transform: none; box-shadow: none; border-color: <neutral>`
- **Hover:** `transform: translateY(-3px); box-shadow: 0 12px 28px -12px <accent>; border-color: <accent>`
- **Transition:** 280ms `cubic-bezier(0.22, 1, 0.36, 1)` on `transform`, `box-shadow`, `border-color`
- **Accent source:** the element's own brand color (via CSS variable `--brand`), not a fixed site accent

### Accessibility

A single `@media (prefers-reduced-motion: reduce)` block in `src/app/globals.css` sets `animation-duration: 0.001ms !important` and `transition-duration: 0.001ms !important` on everything. Framer Motion respects this flag natively via `useReducedMotion()` — the entrance variants collapse to final-state values when reduced motion is on.

## Motion Implementation Approach (Hybrid)

- **Framer Motion** for scroll-triggered entrance animations (fade-up, stagger). Uses `whileInView` + `variants`. `framer-motion` is already in `package.json` and currently unused, so there is no new bundle cost.
- **CSS transitions** for hover and focus micro-interactions (card lift, button arrow, input focus ring). JS would be overkill.
- **Shared wrappers** live in a new `src/components/motion/` directory: `<FadeUp>`, `<StaggerGroup>`, `<StaggerItem>`. Section components import these rather than defining variants inline.

## Brand Color System

A new module `src/lib/brand-colors.ts` exports two maps and a lookup helper. Section components use the helper instead of hardcoding hex values.

### Shape

```ts
// Company brand colors used in Experience + Projects sections
export const COMPANY_BRAND: Record<string, string> = {
  "ANA Corp":  "#ef4444", // scarlet
  "Athlos":    "#3ecf8e", // Athlos brand green
  "Lessi AI":  "#f97316", // orange
  "Freelance": "#86efac", // palette fallback
  "UNLV OED":  "#cf0a2c", // UNLV official red
}

// Tech/tool brand colors used in About section chips + Experience tech tags
export const TOOL_BRAND: Record<string, string> = {
  "React":         "#61dafb",
  "React Native":  "#61dafb",
  "TypeScript":    "#3178c6",
  "JavaScript":    "#f7df1e",
  "Node.js":       "#5fa04e",
  "PostgreSQL":    "#4169e1",
  "Supabase":      "#3ecf8e",
  "AWS":           "#ff9900",
  "Tailwind":      "#38bdf8",
  "Docker":        "#2496ed",
  "Vite":          "#bd34fe",
  "MongoDB":       "#47a248",
  "Terraform":     "#7b42bc",
  "Python":        "#3776ab",
}

// Tools with monochrome brands (Next.js, Vercel, GitHub, Resend, REST, SEO,
// Accessibility, C#, Namecheap, APIs) are NOT listed. The helper returns the
// palette fallback for any missing key.
export const FALLBACK_BRAND = "#c4b5fd" // lavender from site palette

export function brandColor(key: string, map: Record<string,string>): string {
  return map[key] ?? FALLBACK_BRAND
}
```

### Why hex strings, not Tailwind classes

Tailwind v4's JIT can't see dynamically-composed class names. Rather than pre-declare 30+ literal classes in `playful.ts`, brand colors are applied via CSS custom properties (`style={{ '--brand': brandColor(...) }}`) and consumed by Tailwind arbitrary-value utilities. This keeps the `playful.ts` predeclaration pattern clean (only the original 5 pastels).

## Section-by-Section Changes

### 1 · Navigation (`src/components/navigation.tsx`)

- Add a **thin gradient scroll-progress bar** across the top edge of the nav (2px tall). Width animates from 0 → 100% based on `window.scrollY / (document.scrollHeight - window.innerHeight)`. Use a single CSS `transform: scaleX()` bound via a `useScroll` hook from framer-motion (not a state update per scroll — that would thrash).
- Add **active section highlighting**: the link matching the section currently in view gets its text color shifted to that section's accent color, with a 1.5px underline appearing below. Detection via an `IntersectionObserver` on each `<section id>` element.
- Hover state: underline grows in from left, colored in the accent, 200ms.
- Mobile menu unchanged.

### 2 · Hero (`src/components/sections/hero-section.tsx`)

- Role caption moves **above** the name as a tiny monospace line: `full‑stack developer`, uppercase optional, muted gray (`opacity: 0.6`).
- **No status chip.** (Previously considered a "Currently building Athlos" pulsing pill — rejected during brainstorming.)
- Name stays as a single line, same typography.
- Location `Henderson, NV` rendered as a mono caption below the name.
- **Dot-grid backdrop** behind the hero content: `radial-gradient` pattern, 22px spacing, `rgba(255,255,255,0.06)`, with a `mask-image: radial-gradient(ellipse at 30% 50%, #000 20%, transparent 70%)` so the grid fades out around the avatar.
- **Conic-gradient blur ring** around the avatar: `conic-gradient(from 0deg, #7dd3fc, #f9a8d4, #c4b5fd, #86efac, #fcd34d, #7dd3fc)` with `filter: blur(14px); opacity: 0.35`, sitting behind the circle via `::before`.
- **CTA hierarchy:** `Resume` becomes the only primary (solid white) button. `All projects` and `Contact` become ghost buttons (transparent background, neutral border).
- **Motion on entry:** avatar + intro stagger in via Pattern 1 on mount (not scroll, since hero is above the fold). Stagger ~120ms between avatar → name → caption → intro → CTAs.

### 3 · Projects (`src/components/sections/project-section.tsx`)

- **Featured Athlos block** keeps its structural layout. Headings and CTAs pick up the stagger-in on scroll.
- **Other projects grid:**
  - Cards adopt **Pattern 3 hover lift + brand glow**. Projects are not companies, so they do *not* use `COMPANY_BRAND`. Instead each project keeps its existing palette pastel assignment from `borderClassByIndex(i)` — the `--brand` variable is set to that palette hex per card: KLS `#7dd3fc` (sky), Roadwatch `#f9a8d4` (pink), NBA Scoreboard `#c4b5fd` (lavender).
  - **Tech tags** become pill-shaped monospace badges and use the same brand-color dot pattern as About chips — `TOOL_BRAND` map with lavender fallback.
  - **KLS thumbnail:** the current raw `/window.svg` placeholder is replaced. Options in priority order:
    1. Use the actual KLSLeadership screenshot if one exists in `public/` (check `kls-home.png` — already present).
    2. If the screenshot doesn't fit, wrap it with a subtle radial gradient overlay in the card's accent color.
  - Thumbnails use `object-cover` with a subtle `scale(1.04)` zoom on card hover, 400ms ease-out.

### 4 · Experience (`src/components/sections/experience-section.tsx`)

- Convert the current grid-with-side-meta layout into a **vertical timeline**:
  - A single 2px-wide solid neutral spine (`bg-[#222]`) runs down the left side of the section.
  - Each entry has a **dot** pinned to the spine: `16px`, dark center, 2.5px border in the company's brand color, soft `box-shadow` glow in the same brand color.
  - Cards sit to the right of the dot, fully outlined in a neutral border (`border-[#1a1a1a]`). **No left border accent** — that was rejected during brainstorming as a look.
  - On **hover**, the card's border shifts to the brand color and it lifts via Pattern 3. The glow shadow is `color-mix` / direct brand hex.
- **Company brand colors** (see map above): ANA `#ef4444`, Athlos `#3ecf8e`, Lessi `#f97316`, Freelance `#86efac`, UNLV `#cf0a2c`.
- **Company name** in each card uses the brand color for the text.
- **Content change:** the ANA Corp position title changes from `Software Engineer Intern` to `Software Engineer` in the hardcoded `experiences` array. UNLV's `Web Development Intern` stays as-is.
- **Tech tags in each card** adopt the same brand-color-dot pill pattern used in About chips (see below).
- **Mobile:** the bullet highlight list collapses into a `<details>` element ("N highlights") that expands on tap. Prevents the mobile experience from being a wall of text.
- **Spine entry:** the spine fades in via Pattern 1 on scroll (no custom draw-in animation). Simpler than `scaleY` + `transform-origin: top` and avoids a new motion primitive.

### 5 · About (`src/components/sections/about-section.tsx`)

- Replace the existing `<ul>` tool bullet list ("Tools I reach for: React, React Native, …") with a **chip row**:
  - Each chip: small brand-color dot + tool name in muted mono.
  - Chips stagger-in via Pattern 2 on scroll.
  - On hover: entire chip tints to the tool's brand color (background, border, text), lifts 1px.
  - Uses `TOOL_BRAND` map with lavender fallback.
- The two remaining bullet items (principles / philosophy) stay as a cleaner marker list — unchanged in content, kept via `markerClassByIndex`.
- Education side card gets Pattern 3 hover-lift using a palette pastel as its accent.

### 6 · Contact (`src/components/sections/contact-section.tsx`)

- **Floating labels:** convert the current `<Label>` above `<Input>` layout into a single field with the label as a small uppercase mono caption inside the top of the input, and the value below it. On focus, the field border shifts to an accent from the palette and gets a `box-shadow: 0 0 0 3px <accent>/10%` ring.
- **Focus accent rotation:** name uses cyan, email uses pink, subject uses lavender, message uses green. Cycles the palette so the form doesn't feel monochrome.
- **Send button:** keep the existing solid style. Add an arrow `→` after the label that translates 3px to the right on hover.
- **Loading state:** when submitting, arrow replaced by a small spinner.
- **Success state:** after a successful POST to `/api/contact`, the button morphs — background tints green, arrow becomes a check mark, label changes to "Sent". Revert after 3 seconds.
- **Error state:** inline error text appears below the form with a fade-up animation.

## Files Changed / Added

**Added:**
- `src/lib/brand-colors.ts` — company + tool brand color maps, `brandColor()` helper
- `src/components/motion/fade-up.tsx` — wrapper component using framer-motion `whileInView`
- `src/components/motion/stagger-group.tsx` — parent container with staggered children
- `src/components/motion/stagger-item.tsx` — child variant for use inside `StaggerGroup`
- `src/components/motion/scroll-progress.tsx` — thin gradient bar for nav
- `src/components/motion/active-section.tsx` — hook for tracking which section is in view
- `docs/superpowers/specs/2026-04-10-portfolio-ui-refresh-design.md` — this file

**Modified:**
- `src/app/globals.css` — add `prefers-reduced-motion` reset
- `src/components/navigation.tsx` — scroll progress bar + active section highlighting
- `src/components/sections/hero-section.tsx` — layout restructure, dot grid, conic ring, stagger entry
- `src/components/sections/project-section.tsx` — card hover + glow, pill tags, KLS thumbnail fix
- `src/components/sections/experience-section.tsx` — timeline restructure, brand colors, ANA title content change, mobile details collapse
- `src/components/sections/about-section.tsx` — tool bullet list → chip row
- `src/components/sections/contact-section.tsx` — floating labels, focus accents, send button states
- `public/` — possibly a new gradient placeholder for KLS if `kls-home.png` doesn't fit

**Unchanged (explicitly preserved):**
- `src/lib/playful.ts` — pastel palette predeclaration pattern stays intact
- `tailwind.config.js` — no new keyframes needed (framer-motion handles entry, CSS handles hover)
- `src/app/layout.tsx` — dark mode class stays
- Footer, all `src/components/ui/*` primitives, API route

## Testing Approach

No test suite exists in this project. Validation is manual:

1. **Dev server smoke test:** `npm run dev`, walk through each section at full width and verify animations feel right.
2. **Mobile viewport check:** DevTools responsive mode at 375px, verify hero avatar stacks, timeline compresses cleanly, bullets collapse into details.
3. **Reduced motion check:** DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce` → every section's final state should render instantly, no fade, no stagger.
4. **Lint + build:** `npm run lint && npm run build` must pass before merging.
5. **Production preview:** deploy to Vercel preview, open on a real mobile device to confirm timing feels right (dev server is noisier than production).

## Risks & Trade-offs

- **Bundle size:** framer-motion is ~60KB gzipped. Already installed, so strictly speaking free, but this is the moment it actually starts being paid for. If bundle size becomes an issue later, the three motion wrappers can be swapped for an IntersectionObserver + CSS keyframes implementation without changing the component API.
- **Color clash:** ANA scarlet `#ef4444` and UNLV red `#cf0a2c` are both reds. They're distinguishable side-by-side but similar. Accepted during brainstorming; can be revisited if it looks worse in context than in the mockup.
- **Mobile timeline:** the `<details>` collapse is a functional pattern, not the prettiest. If it feels clunky on mobile, fall back to always-expanded and rely on vertical rhythm.
- **KLS thumbnail:** assumes `public/kls-home.png` is usable. If it isn't, scope includes generating a gradient placeholder — not blocking.

## Open Questions / Deferred

None blocking. The following were surfaced and resolved during brainstorming:

- ~~Use framer-motion or pure CSS?~~ → Hybrid
- ~~Full visual redesign or targeted?~~ → Targeted, all five sections
- ~~Personality: minimal, playful, cinematic?~~ → Playful pastel, preserving existing palette
- ~~Role text in hero?~~ → Variant A: tiny mono caption above the name
- ~~Status "currently building" chip?~~ → Dropped
- ~~Experience spine gradient?~~ → Solid neutral `#222`, no blend
- ~~Left-border accent on timeline cards?~~ → Dropped, full outline instead
- ~~ANA Corp red vs UNLV red?~~ → ANA scarlet `#ef4444`, UNLV stays `#cf0a2c`
- ~~Drop "Intern" everywhere?~~ → Only from ANA title
