# Experience Section Redesign

**Date:** 2026-04-24
**Status:** Approved

## Goal

Replace the flat stack of five equal-weight experience cards with a vertical timeline that cleanly communicates (1) chronological progression, (2) which roles are current, and (3) the reality of three parallel current commitments with two co-primary and one secondary. Lift the strongest stat ("80+ PRs in 9 weeks") out of a buried bullet into a pull-out block. Rewrite Athlos's experience-card content to emphasize role/scope rather than product (which the projects carousel already covers).

## Structure

A single vertical timeline with a continuous rail on the left and role rungs on the right. Two clusters, separated by a "Currently" / "Previously" label:

- **Currently** (top): ANA Corp (full card) → Athlos (full card) → Freelance (compact, expand-on-tap).
- **Previously** (below a divider): Lessi AI (compact) → UNLV OED (compact).

Order within "Currently" is ANA → Athlos → Freelance (ANA first as newest-start paid full-time; Athlos second with equal visual weight via identical full-card treatment; Freelance compressed).

## Rail + markers

- Continuous 1px rail on the left column, muted border color.
- Each role has a circular marker sitting on the rail at its top edge.
- **Current markers**: filled with the company brand color, with a subtle pulsing ring (respects `prefers-reduced-motion`).
- **Past markers**: hollow (border only) in muted color, no animation.
- Cluster labels ("Currently", "Previously"): small mono uppercase, left-aligned with the card column, above each group.

## Full-treatment card (ANA + Athlos)

Existing card structure, plus a new **pull-out stat block**:

- ANA: `80+` · "Pull requests in first 9 weeks"
- Athlos: `End-to-end` · "Solo dev, shipped to the App Store"

Stat block is a bordered inset panel inside the card: large number (company brand color) on the left, label text on the right.

Also:

- **Duration label** auto-computed from the period string (e.g. `9 mos`, `1 yr 4 mos`), rendered next to the period in muted mono.

Existing card hover treatment (border + shadow in brand color) stays.

## Compressed rung (Freelance + past roles)

Single-row summary:

`● Freelance · Web Developer · Dec 2024 – Present · 1 yr 4 mos`

Wrapped in a `<details>` element. Clicking/tapping expands in place to show summary + highlights + tech. No JS needed, keyboard accessible, reduced-motion safe by default.

No stat block on compressed rungs.

## Athlos content refresh

New summary: "Solo developer building a fitness app end-to-end: design, native modules, backend, payments, and release."

New highlights:
- Solo dev building a React Native app end-to-end: UI, native modules, backend, payments
- Architected the Supabase stack (Postgres, RLS, Edge Functions) and shipped through TestFlight (30+ beta testers) to the App Store
- Handle every layer myself: design, code, QA, release, subscriptions, analytics

Tech stack stays the same.

## ANA stat correction

Highlight bullet #1 changes from "Shipped 60+ pull requests across frontend and backend in first 8 weeks" to "Shipped 80+ pull requests across frontend and backend in first 9 weeks." The pull-out stat block above uses the same 80+ / 9 weeks figure.

## Mobile (<md)

Same timeline rail + markers, narrower column. Full cards stay full-width. Compressed rows stay single-line and expand on tap. Highlights on full cards still collapse into `<details>` on mobile so the initial scroll is short and scannable (existing pattern preserved).

## File structure

Follow the pattern used for projects (data out of component, components grouped by feature):

| Path | Responsibility | Rendering |
|---|---|---|
| `src/data/experience.ts` | Typed `Experience[]` — single source of truth. Adds `tier: "primary" \| "secondary" \| "past"` and optional `stat?: { value, label }` | Module |
| `src/components/sections/experience-section.tsx` | Section shell: heading, cluster grouping, rail, cluster labels, renders cards and rows in order | Server |
| `src/components/experience/experience-card.tsx` | Full-treatment card (ANA + Athlos): stat block, highlights, tech, hover | Server |
| `src/components/experience/experience-row.tsx` | Compact row (`<details>`) with summary + expand to highlights + tech | Server |

No client components needed unless a specific interaction requires it — `<details>` covers expand, CSS animations cover the marker pulse.

## Data model

```ts
type ExperienceTier = "primary" | "secondary" | "past"

type Experience = {
  company: string
  position: string
  period: string           // "Dec 2025 – Present"
  summary: string
  highlights: string[]
  tech: string[]
  tier: ExperienceTier
  stat?: { value: string; label: string }
}
```

Tier assignments:
- ANA Corp → primary
- Athlos → primary
- Freelance → secondary
- Lessi AI → past
- UNLV OED → past

## Duration utility

Small pure function in the experience section: parse the period string's start, use the end ("Present" → current date, else parsed), return formatted label (`5 mos`, `1 yr`, `1 yr 4 mos`). Lives alongside the existing `sortByPeriod` parser — same parsing logic.

## Rollout

Build in one session. Not splitting into commits unless the diff grows large. Will NOT commit or push — per user's rule, git stays untouched until they instruct.

## Out of scope

- Company favicons/logos (not all companies have assets; can be added later via optional `logo` field on Experience).
- Horizontal carousel of experiences (considered in brainstorming, rejected — experiences don't have the visual richness of projects, would feel padded).
- Tab-based "Full-time / Freelance / Intern" filter (considered, rejected — only 5 roles, not worth the UI overhead).
- Pulling duration data onto a separate filterable sidebar.
