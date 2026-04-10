# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js with --turbopack) on http://localhost:3000
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # next lint (eslint flat config: next/core-web-vitals + next/typescript)
```

There is no test suite in this project.

## Architecture

Next.js 16 (App Router) personal portfolio for Brandon Timok. TypeScript strict, Tailwind v4, dark mode forced via `className="dark"` on `<html>` in `src/app/layout.tsx`. Path alias `@/*` → `./src/*`.

**Single-page layout.** `src/app/page.tsx` is the only route — it stitches together the section components from `src/components/sections/` (`hero`, `project`, `experience`, `about`, `contact`) under a shared `Navigation` and `Footer`. Each section is a `"use client"` component that owns its own copy. There is no CMS or data layer: project lists, experience entries, testimonials, etc. are all hardcoded inside their respective section components — to update content, edit the arrays at the top of those files.

**Contact form → Resend.** `src/app/api/contact/route.ts` is the only API route. It POSTs to Resend using `RESEND_API_KEY` and sends to `CONTACT_EMAIL` (both required env vars). The `from` address is currently `onboarding@resend.dev` (Resend's shared sandbox sender) — switch to a verified domain before changing the contact flow.

**Styling system.** Tailwind v4 via `@tailwindcss/postcss`. Theme colors are HSL CSS variables defined in `src/app/globals.css` (`--background`, `--primary`, `--accent`, etc.) and re-exported in `tailwind.config.js` so utilities like `bg-background` / `text-foreground` work. When adding colors, add them in both places.

**`src/lib/playful.ts` — read this before adding accent colors.** Tailwind v4's JIT only includes classes that appear as literal strings in source. `playful.ts` predeclares the rotating accent palette (`#7dd3fc`, `#f9a8d4`, `#c4b5fd`, `#86efac`, `#fcd34d`) as full literal class strings (`border-[#7dd3fc]`, `marker:text-[...]`, `bg-[...]`, `border-l-[...]`) and exposes `borderClassByIndex(i)` / `markerClassByIndex(i)` / `bgClassByIndex(i)` / `borderLeftClassByIndex(i)`. Section components cycle through these by index. Never build these class names dynamically — add them to the literal arrays first or Tailwind will strip them.

**Images.** Project/screenshot assets live in `public/` and are referenced by absolute path (`/athlos-logo.png`, `/roadwatch.png`, etc.) through `next/image`.

**Deployment.** Vercel — site is live at `https://dev-portfolio-2-0.vercel.app` (referenced in the OG image meta in `page.tsx`).
