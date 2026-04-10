# Portfolio UI Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add motion polish and targeted UI tune-ups across all five sections of the dev-portfolio-2.0 site using a three-pattern motion system and a brand-color map for companies and tools.

**Architecture:** Create a small set of reusable motion primitives (`src/components/motion/`) backed by framer-motion that each section imports rather than defining inline variants. Introduce a brand-color lookup module (`src/lib/brand-colors.ts`) used by Experience and About sections. Preserve the existing `src/lib/playful.ts` palette-rotation pattern intact. Respect `prefers-reduced-motion` globally via a single CSS block in `globals.css`.

**Tech Stack:** Next.js 16 (App Router) · React 18 · TypeScript · Tailwind v4 · framer-motion 10 (already in `package.json`, currently unused) · lucide-react

**Source of truth:** `docs/superpowers/specs/2026-04-10-portfolio-ui-refresh-design.md`

**Validation approach:** No test suite exists in this project and adding one for a visual refresh would violate YAGNI. Every task ends with `npm run lint && npm run build` passing and a manual dev-server verification walkthrough. The final task includes a full-site manual QA including a `prefers-reduced-motion` toggle check.

**Commit style:** Short imperative subject line. No Claude/AI attribution trailer (user preference in this repo).

---

## File Structure

**Added:**
- `src/lib/brand-colors.ts` — company + tool brand hex maps, `brandColor()` helper, `FALLBACK_BRAND` constant
- `src/components/motion/fade-up.tsx` — wrapper that fades + translates up when scrolled into view (Pattern 1)
- `src/components/motion/stagger-group.tsx` — parent container that staggers its direct `StaggerItem` children (Pattern 2 parent)
- `src/components/motion/stagger-item.tsx` — child variant consumed by `StaggerGroup` (Pattern 2 child)
- `src/components/motion/scroll-progress.tsx` — thin gradient scroll-progress bar for the nav
- `src/components/motion/use-active-section.ts` — hook exposing which section id is currently in view

**Modified:**
- `src/app/globals.css` — add a single `prefers-reduced-motion` reset block
- `src/components/navigation.tsx` — scroll progress bar + active section highlighting
- `src/components/sections/hero-section.tsx` — layout restructure, dot grid, conic ring, stagger entry
- `src/components/sections/project-section.tsx` — card hover + glow, pill tech tags, KLS thumbnail fix
- `src/components/sections/experience-section.tsx` — timeline restructure, brand colors, ANA title content fix, mobile details collapse
- `src/components/sections/about-section.tsx` — tool bullet list → brand-color chip row
- `src/components/sections/contact-section.tsx` — floating labels, focus accent rotation, send-button states

**Unchanged (explicitly preserved):**
- `src/lib/playful.ts` — the literal-class predeclaration pattern stays intact
- `tailwind.config.js` — no new keyframes (framer-motion handles entry, CSS handles hover)
- `src/app/layout.tsx` — dark mode class stays
- `src/components/footer.tsx`, `src/components/theme-toggle.tsx`
- All `src/components/ui/*` primitives and `src/app/api/contact/route.ts`

---

## Task 1: Global foundation — reduced-motion reset + brand-color module

**Files:**
- Modify: `src/app/globals.css`
- Create: `src/lib/brand-colors.ts`

- [ ] **Step 1.1: Add `prefers-reduced-motion` reset to globals.css**

Append to the end of `src/app/globals.css` (after the existing `@layer base` block):

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 1.2: Create the brand-colors module**

Write `src/lib/brand-colors.ts` with this exact content:

```ts
export const FALLBACK_BRAND = "#c4b5fd"

export const COMPANY_BRAND: Record<string, string> = {
  "ANA Corp":  "#ef4444",
  "Athlos":    "#3ecf8e",
  "Lessi AI":  "#f97316",
  "Freelance": "#86efac",
  "UNLV OED":  "#cf0a2c",
}

export const TOOL_BRAND: Record<string, string> = {
  "React":        "#61dafb",
  "React Native": "#61dafb",
  "TypeScript":   "#3178c6",
  "JavaScript":   "#f7df1e",
  "Node.js":      "#5fa04e",
  "PostgreSQL":   "#4169e1",
  "Supabase":     "#3ecf8e",
  "AWS":          "#ff9900",
  "Tailwind":     "#38bdf8",
  "Docker":       "#2496ed",
  "Vite":         "#bd34fe",
  "MongoDB":      "#47a248",
  "Terraform":    "#7b42bc",
  "Python":       "#3776ab",
}

export function brandColor(key: string, map: Record<string, string>): string {
  return map[key] ?? FALLBACK_BRAND
}
```

- [ ] **Step 1.3: Lint + build verification**

Run: `npm run lint && npm run build`
Expected: both succeed with no errors. The build is expected to succeed because `brand-colors.ts` is not imported anywhere yet — it will be in later tasks.

- [ ] **Step 1.4: Commit**

```bash
git add src/app/globals.css src/lib/brand-colors.ts
git commit -m "Add reduced-motion reset and brand-color map module"
```

---

## Task 2: Motion primitives — FadeUp, StaggerGroup, StaggerItem

**Files:**
- Create: `src/components/motion/fade-up.tsx`
- Create: `src/components/motion/stagger-group.tsx`
- Create: `src/components/motion/stagger-item.tsx`

- [ ] **Step 2.1: Create `FadeUp`**

Write `src/components/motion/fade-up.tsx`:

```tsx
"use client"

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion"
import type { ReactNode } from "react"

type FadeUpProps = HTMLMotionProps<"div"> & {
  children: ReactNode
  delay?: number
}

export function FadeUp({ children, delay = 0, ...rest }: FadeUpProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2.2: Create `StaggerGroup`**

Write `src/components/motion/stagger-group.tsx`:

```tsx
"use client"

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion"
import type { ReactNode } from "react"

type StaggerGroupProps = HTMLMotionProps<"div"> & {
  children: ReactNode
  stagger?: number
  delayChildren?: number
}

export function StaggerGroup({
  children,
  stagger = 0.08,
  delayChildren = 0,
  ...rest
}: StaggerGroupProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div>{children}</div>
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2.3: Create `StaggerItem`**

Write `src/components/motion/stagger-item.tsx`:

```tsx
"use client"

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion"
import type { ReactNode } from "react"

type StaggerItemProps = HTMLMotionProps<"div"> & {
  children: ReactNode
}

export function StaggerItem({ children, ...rest }: StaggerItemProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div>{children}</div>
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2.4: Lint + build verification**

Run: `npm run lint && npm run build`
Expected: both succeed. The motion components are not imported yet but must compile standalone.

- [ ] **Step 2.5: Commit**

```bash
git add src/components/motion/fade-up.tsx src/components/motion/stagger-group.tsx src/components/motion/stagger-item.tsx
git commit -m "Add FadeUp, StaggerGroup, StaggerItem motion primitives"
```

---

## Task 3: Navigation support primitives — scroll progress + active section hook

**Files:**
- Create: `src/components/motion/scroll-progress.tsx`
- Create: `src/components/motion/use-active-section.ts`

- [ ] **Step 3.1: Create `ScrollProgress`**

Write `src/components/motion/scroll-progress.tsx`:

```tsx
"use client"

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion"

export function ScrollProgress() {
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  })

  if (prefersReduced) {
    return null
  }

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="pointer-events-none absolute left-0 top-0 h-[2px] w-full origin-left"
      aria-hidden="true"
    >
      <div
        className="h-full w-full"
        style={{
          background: "linear-gradient(90deg, #7dd3fc 0%, #f9a8d4 50%, #c4b5fd 100%)",
          boxShadow: "0 0 8px rgba(125, 211, 252, 0.4)",
        }}
      />
    </motion.div>
  )
}
```

- [ ] **Step 3.2: Create `useActiveSection` hook**

Write `src/components/motion/use-active-section.ts`:

```ts
"use client"

import { useEffect, useState } from "react"

export function useActiveSection(sectionIds: string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActive(visible[0].target.id)
        }
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds])

  return active
}
```

- [ ] **Step 3.3: Lint + build verification**

Run: `npm run lint && npm run build`
Expected: both succeed.

- [ ] **Step 3.4: Commit**

```bash
git add src/components/motion/scroll-progress.tsx src/components/motion/use-active-section.ts
git commit -m "Add scroll progress bar and active section hook"
```

---

## Task 4: Navigation — wire up scroll progress and active section

**Files:**
- Modify: `src/components/navigation.tsx` (full rewrite of the returned JSX)

- [ ] **Step 4.1: Replace `src/components/navigation.tsx` contents**

Replace the entire file with:

```tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { borderClassByIndex } from "@/lib/playful"
import { ScrollProgress } from "@/components/motion/scroll-progress"
import { useActiveSection } from "@/components/motion/use-active-section"

const SECTION_IDS = ["projects", "experience", "about", "contact"] as const
const SECTION_ACCENT: Record<string, string> = {
  projects:   "#7dd3fc",
  experience: "#f9a8d4",
  about:      "#c4b5fd",
  contact:    "#86efac",
}

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection([...SECTION_IDS])

  return (
    <nav
      className={
        "fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 " +
        borderClassByIndex(2)
      }
    >
      <ScrollProgress />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-medium">
              Brandon Timok
            </Link>
            <span
              className={
                "hidden sm:inline-block text-[10px] leading-4 px-2 py-0.5 rounded border " +
                borderClassByIndex(0)
              }
            >
              B.S. Computer Science
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {SECTION_IDS.map((item) => {
              const isActive = active === item
              return (
                <Link
                  key={item}
                  href={`#${item}`}
                  className="relative text-sm text-muted-foreground hover:text-foreground transition-colors"
                  style={isActive ? { color: SECTION_ACCENT[item] } : undefined}
                >
                  <span className="capitalize">{item}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 right-0 h-[1.5px]"
                      style={{ background: SECTION_ACCENT[item] }}
                    />
                  )}
                </Link>
              )
            })}
            <div className="h-4 w-px bg-border" />
            <Button asChild variant="outline" size="sm">
              <Link href="/Resume25.pdf" target="_blank" aria-label="Resume">
                <FileText className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col gap-3">
              {SECTION_IDS.map((item) => (
                <Link
                  key={item}
                  href={`#${item}`}
                  className="text-sm"
                  onClick={() => setOpen(false)}
                >
                  <span className="capitalize">{item}</span>
                </Link>
              ))}
              <div className="h-px w-full bg-border" />
              <Link
                href="/Resume25.pdf"
                target="_blank"
                className="text-sm"
                onClick={() => setOpen(false)}
              >
                Resume
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 4.2: Lint + build verification**

Run: `npm run lint && npm run build`
Expected: both succeed.

- [ ] **Step 4.3: Manual dev-server check**

Run: `npm run dev`
Open http://localhost:3000 and verify:
- A thin gradient bar appears at the top of the nav and grows as you scroll down the page
- As you scroll past each section, the corresponding nav link color shifts to that section's accent color and gains a colored underline
- The nav still collapses/expands on mobile (use DevTools responsive mode at 375px)

Stop the dev server with Ctrl+C.

- [ ] **Step 4.4: Commit**

```bash
git add src/components/navigation.tsx
git commit -m "Wire scroll progress bar and active section highlight into nav"
```

---

## Task 5: Hero — layout restructure, dot grid, conic ring, stagger entry

**Files:**
- Modify: `src/components/sections/hero-section.tsx` (full rewrite)

- [ ] **Step 5.1: Replace `src/components/sections/hero-section.tsx` contents**

Replace the entire file with:

```tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { borderClassByIndex } from "@/lib/playful"
import { StaggerGroup } from "@/components/motion/stagger-group"
import { StaggerItem } from "@/components/motion/stagger-item"

export default function HeroSection() {
  return (
    <section className="relative pt-28 pb-10 overflow-hidden">
      {/* Dot-grid backdrop, faded toward the edges */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse at 30% 50%, #000 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 30% 50%, #000 20%, transparent 70%)",
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <StaggerGroup
            stagger={0.12}
            className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8"
          >
            <StaggerItem className="shrink-0">
              <div className="relative w-28 h-28 md:w-36 md:h-36 lg:w-48 lg:h-48">
                {/* Conic gradient blur ring */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-2 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #7dd3fc, #f9a8d4, #c4b5fd, #86efac, #fcd34d, #7dd3fc)",
                    filter: "blur(14px)",
                    opacity: 0.35,
                  }}
                />
                <div
                  className={
                    "relative w-full h-full overflow-hidden rounded-full border " +
                    borderClassByIndex(0)
                  }
                >
                  <Image
                    src="/avatar.png"
                    alt="Brandon Timok"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </StaggerItem>

            <div className="flex-1">
              <StaggerItem>
                <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
                  full‑stack developer
                </p>
              </StaggerItem>
              <StaggerItem>
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-2">
                  Brandon Timok
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="text-xs font-mono text-muted-foreground mb-6">
                  Henderson, NV
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="text-muted-foreground mb-4">
                  I build pragmatic, minimal interfaces and reliable backends.
                  Toolkit: TypeScript, React Native/Expo, PostgreSQL, Vite,
                  Tailwind, and API development — working across Windows and
                  Linux with CI/CD pipelines to ship fast.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="text-muted-foreground mb-6">
                  Currently developing Athlos, a mobile app for personalized
                  workouts, and freelancing on web development projects.
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/Resume25.pdf" target="_blank">
                      Resume
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="#projects">All projects</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="#contact">Contact</Link>
                  </Button>
                </div>
              </StaggerItem>
            </div>
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5.2: Remove the unused `<Head>` import from `src/app/page.tsx`**

The current `page.tsx` still renders `<Head>` which is a pages-router artifact. It's unrelated to the hero but sits in the same file context, and the unused import would trip `next/typescript` lint rules if we leave the page referencing `Head` while editing nothing else.

Check it: `src/app/page.tsx` currently imports `Head from "next/head"` and wraps the page in a `<Head>` element. Leave it as-is unless lint fails. If lint fails on unused import in Step 5.3, delete the `import Head` line and the `<Head>...</Head>` JSX wrapper (keep the `<div>` inside).

- [ ] **Step 5.3: Lint + build verification**

Run: `npm run lint && npm run build`
Expected: both succeed.

- [ ] **Step 5.4: Manual dev-server check**

Run: `npm run dev`
Open http://localhost:3000 and verify:
- The role caption `full-stack developer` renders as a tiny monospace uppercase line above the name
- A subtle dot-grid pattern is visible behind the hero content and fades out past the avatar area
- A soft pastel conic-gradient blur ring surrounds the avatar
- On page load, hero content staggers in top-to-bottom (avatar → role → name → location → intro paragraphs → CTAs)
- The **Resume** button is the only solid white primary; `All projects` and `Contact` are outline/ghost buttons
- No "Currently building Athlos" chip anywhere — if you see one, something from the original brainstorm leaked in; remove it

Also toggle DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce` and refresh. The hero should appear instantly in its final state with no stagger.

Stop the dev server.

- [ ] **Step 5.5: Commit**

```bash
git add src/components/sections/hero-section.tsx
git commit -m "Refresh hero: dot-grid backdrop, conic ring, stagger entry, CTA hierarchy"
```

---

## Task 6: Projects — featured block reveals, card hover glow, pill tech tags

**Files:**
- Modify: `src/components/sections/project-section.tsx`

**Real structure of this file (important context):** It has **two** featured full-bleed blocks — **Athlos** (first) and **KLS** (second) — then an **Other Projects** grid built from `projects.slice(1)`, which renders exactly two cards (Roadwatch and NBA Scoreboard, because KLS at `projects[0]` is already rendered as a featured block and gets skipped in the grid). The `projects[0]` entry is still referenced by the KLS featured block for tech tags and the github URL, so **do not remove or rename it**.

Both featured blocks and the "Other Projects" header already use `markerClassByIndex`, `borderClassByIndex`, `bgClassByIndex`, and `borderLeftClassByIndex` from `@/lib/playful`. **Keep all existing imports** and only *add* new ones.

This task does surgical edits, not a full file rewrite.

- [ ] **Step 6.1: Add new imports at the top of the file**

In `src/components/sections/project-section.tsx`, alongside the existing imports, add:

```tsx
import { FadeUp } from "@/components/motion/fade-up"
import { TOOL_BRAND, brandColor } from "@/lib/brand-colors"
```

Do **not** remove `borderClassByIndex`, `bgClassByIndex`, `borderLeftClassByIndex`, or `markerClassByIndex` — they are used in the Athlos/KLS featured blocks and the "Other Projects" header. Do not change the `projects` array.

- [ ] **Step 6.2: Wrap the featured Athlos block with `FadeUp`**

Locate the element that begins:

```tsx
<div id="athlos" className="mb-12 border-y border-border bg-secondary/30">
```

Wrap this entire element in `<FadeUp>...</FadeUp>`. Do not touch the inner content — the phone-mockup frames using `borderClassByIndex(0/2/4)` stay exactly as they are.

- [ ] **Step 6.3: Wrap the featured KLS block with `FadeUp`**

Locate the element that begins:

```tsx
<div id="kls" className="mb-12 border-y border-border bg-secondary/30">
```

Wrap this entire element in `<FadeUp>...</FadeUp>`. Again, no internal changes.

- [ ] **Step 6.4: Remove the left-bordered description in the "Other Projects" header**

Locate the "Other Projects" section header:

```tsx
<div className="mb-8">
  <div className="flex items-baseline gap-3">
    <h2 className="text-2xl font-semibold">Other Projects</h2>
    <span className={"h-0.5 w-10 " + bgClassByIndex(3)}></span>
  </div>
  <div className={"mt-4 border-l-4 pl-4 text-sm text-muted-foreground " + borderLeftClassByIndex(3)}>
    A selection of recent work. Clean code, minimal interfaces, and strong data models.
  </div>
</div>
```

Replace the entire `<div className="mb-8">...</div>` block with:

```tsx
<FadeUp>
  <div className="mb-8">
    <div className="flex items-baseline gap-3">
      <h2 className="text-2xl font-semibold">Other Projects</h2>
      <span className={"h-0.5 w-10 " + bgClassByIndex(3)}></span>
    </div>
    <p className="mt-3 text-sm text-muted-foreground max-w-prose">
      A selection of recent work. Clean code, minimal interfaces, and strong data models.
    </p>
  </div>
</FadeUp>
```

The left-border + colored left accent is removed (user rejected left-bordered blocks). The description is now a plain paragraph. `borderLeftClassByIndex` may become unused — if lint flags it, remove only that one import.

- [ ] **Step 6.5: Rewrite the `projects.slice(1).map(...)` card grid**

Locate the existing grid:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {projects.slice(1).map((p, index) => (
    <Card key={p.title} ...
      {/* ...existing Card + CardHeader + CardContent ... */}
    </Card>
  ))}
</div>
```

Replace the entire grid block (including the map) with:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {projects.slice(1).map((p, index) => {
    const accent = index === 0 ? "#f9a8d4" : "#c4b5fd"
    return (
      <StaggerItem key={p.title}>
        <div
          className="group rounded-lg border border-border bg-card overflow-hidden transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px]"
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = accent
            e.currentTarget.style.boxShadow = `0 12px 28px -12px ${accent}`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = ""
            e.currentTarget.style.boxShadow = ""
          }}
        >
          <div className="relative w-full h-36 overflow-hidden">
            <Image
              src={p.image}
              alt={p.title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at 70% 30%, ${accent}33, transparent 60%)`,
              }}
            />
          </div>
          <div className="p-5 space-y-2">
            <h3 className="font-medium">{p.title}</h3>
            <p className="text-sm text-muted-foreground">{p.description}</p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1.5">
              {index === 0 ? (
                <>
                  <li className={markerClassByIndex(0)}>Team project; shipped MVP at UNLV</li>
                  <li className={markerClassByIndex(2)}>Map, reports, and community features</li>
                  <li className={markerClassByIndex(4)}>Containerized dev with Docker</li>
                </>
              ) : (
                <>
                  <li className={markerClassByIndex(1)}>Realtime scoreboard and box scores</li>
                  <li className={markerClassByIndex(3)}>Data fetching, parsing, and caching</li>
                  <li className={markerClassByIndex(0)}>Lightweight UI for quick scan</li>
                </>
              )}
            </ul>
            {p.tech && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {p.tech.map((t) => {
                  const tBrand = brandColor(t, TOOL_BRAND)
                  return (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-mono text-muted-foreground"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: tBrand }}
                      />
                      {t}
                    </span>
                  )
                })}
              </div>
            )}
            <div className="pt-2 flex gap-2">
              <Button asChild size="sm" variant="outline">
                <Link href={p.github} target="_blank">Code</Link>
              </Button>
              {p.demo && (
                <Button asChild size="sm">
                  <Link href={p.demo} target="_blank">Demo</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </StaggerItem>
    )
  })}
</div>
```

Also wrap the grid itself in a `<StaggerGroup>` so the two cards animate in together:

```tsx
<StaggerGroup>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* ...the map above... */}
  </div>
</StaggerGroup>
```

Add `StaggerGroup` and `StaggerItem` to the imports added in Step 6.1:

```tsx
import { StaggerGroup } from "@/components/motion/stagger-group"
import { StaggerItem } from "@/components/motion/stagger-item"
```

Note: the grid has 2 cards (Roadwatch at `slice(1)[0]`, NBA Scoreboard at `slice(1)[1]`), so the `index === 0` branch is Roadwatch and `index === 1` is NBA — the original highlight bullets are preserved exactly as they were.

Also note: the old grid used the shadcn `<Card>`/`<CardHeader>`/`<CardContent>` components. The replacement uses a plain `<div>` tree because hover-lift + brand-color glow is simpler without those abstractions. If `Card` / `CardHeader` / `CardContent` become unused in this file after the replacement, remove them from the imports. If they are still used elsewhere in the file, keep them.

- [ ] **Step 6.6: Lint + build verification**

Run: `npm run lint && npm run build`
Expected: both succeed. If lint complains about unused imports (`Card`, `CardHeader`, `CardContent`, `borderLeftClassByIndex`), delete only those specific unused entries.

- [ ] **Step 6.7: Manual dev-server check**

Run: `npm run dev`
Open http://localhost:3000 and scroll to the Projects section. Verify:
- The Athlos featured block fades up on scroll
- The KLS featured block fades up on scroll (also unchanged visually)
- The "Other Projects" header has no more left-bordered description callout — just a plain paragraph
- The two remaining grid cards (Roadwatch, NBA Scoreboard) each lift 3px on hover and glow in their own accent (Roadwatch pink `#f9a8d4`, NBA lavender `#c4b5fd`)
- Their thumbnails gain a subtle radial gradient overlay on hover
- Tech tags on those cards have brand-color dots
- The "Code" / "Demo" buttons still work

Stop the dev server.

- [ ] **Step 6.8: Commit**

```bash
git add src/components/sections/project-section.tsx
git commit -m "Refresh projects: fade-up featured blocks, hover-glow grid cards, pill tech tags"
```

---

## Task 7: Experience — vertical timeline with brand colors and ANA title fix

**Files:**
- Modify: `src/components/sections/experience-section.tsx` (near-full rewrite)

- [ ] **Step 7.1: Replace `src/components/sections/experience-section.tsx` contents**

Replace the entire file with:

```tsx
"use client"

import { markerClassByIndex } from "@/lib/playful"
import { COMPANY_BRAND, TOOL_BRAND, brandColor } from "@/lib/brand-colors"
import { FadeUp } from "@/components/motion/fade-up"
import { StaggerGroup } from "@/components/motion/stagger-group"
import { StaggerItem } from "@/components/motion/stagger-item"

type Experience = {
  company: string
  position: string
  period: string
  summary: string
  highlights: string[]
  tech: string[]
}

const experiences: Experience[] = [
  {
    company: "ANA Corp",
    position: "Software Engineer",
    period: "Dec 2025 – Present",
    summary:
      "Leading frontend development and contributing to backend features for an internal telematics platform that monitors and manages industrial generator fleets.",
    highlights: [
      "Shipped 60+ pull requests across frontend and backend in first 8 weeks",
      "Own all frontend changes for the telematics web application",
      "Redesigned core UI components with fully responsive layouts",
      "Contribute to backend API development, database queries, and AWS infrastructure",
    ],
    tech: ["React", "TypeScript", "Tailwind", "Node.js", "PostgreSQL", "AWS", "Docker", "Terraform", "Vite"],
  },
  {
    company: "Lessi AI",
    position: "Software Developer",
    period: "Jul 2024 – Present",
    summary:
      "Building AI‑assisted tools for educators; shipping fast in a lean environment.",
    highlights: [
      "Designed and implemented modular REST APIs for lesson plans and collaboration",
      "Strengthened data modeling in Postgres; added indexes and RLS policies",
      "Containerized services and improved local DX using Docker Compose",
    ],
    tech: ["C#", "PostgreSQL", "Docker", "GitHub", "REST"],
  },
  {
    company: "UNLV OED",
    position: "Web Development Intern",
    period: "Nov 2023 – Mar 2024",
    summary: "Modernized client websites and improved SEO and accessibility.",
    highlights: [
      "Shipped UX improvements that reduced bounce rate on key pages",
      "Audited and improved color contrast, headings, and semantics",
      "Set up meetings with clients to discuss their needs and goals",
    ],
    tech: ["Next.js", "TypeScript", "SEO", "Accessibility"],
  },
  {
    company: "Freelance",
    position: "Web Developer",
    period: "Dec 2024 – Present",
    summary:
      "Delivering websites for local businesses with a focus on speed and maintainability.",
    highlights: [
      "Information architecture, copy support, and brand alignment",
      "Accessible components and SEO‑friendly markup",
      "Simple content workflows for non‑technical editors",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    company: "Athlos",
    position: "Mobile App Developer",
    period: "Mar 2025 – Present",
    summary:
      "Designing and building a personalized workout app end‑to‑end.",
    highlights: [
      "React Native app architecture and UI patterns",
      "Supabase auth, Postgres schema design, and RLS policies",
      "REST APIs for training logic and analytics",
    ],
    tech: ["React Native", "TypeScript", "Vite", "Supabase"],
  },
]

function sortByPeriod(list: Experience[]): Experience[] {
  const monthIndex: Record<string, number> = {
    Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
    Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
  }
  const parseStart = (p: string) => {
    const m = p.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)?\s*(\d{4})/)
    const year = m ? parseInt(m[2], 10) : 0
    const month = m && m[1] ? monthIndex[m[1]] ?? 0 : 0
    return { year, month }
  }
  return [...list].sort((a, b) => {
    const sa = parseStart(a.period)
    const sb = parseStart(b.period)
    if (sb.year !== sa.year) return sb.year - sa.year
    return sb.month - sa.month
  })
}

export default function ExperienceSection() {
  const ordered = sortByPeriod(experiences)

  return (
    <section id="experience" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="inline-flex items-baseline gap-3 mb-8">
            <h2 className="text-2xl font-semibold">Experience</h2>
            <span className="h-0.5 w-10 bg-[#f9a8d4]" />
          </div>
        </FadeUp>

        <div className="relative pl-8 md:pl-10">
          {/* Solid neutral spine */}
          <FadeUp className="absolute left-[10px] md:left-[14px] top-2 bottom-2 w-[2px] bg-[#222]" />

          <StaggerGroup stagger={0.1}>
            {ordered.map((e) => {
              const brand = brandColor(e.company, COMPANY_BRAND)
              return (
                <StaggerItem key={e.company} className="relative pb-8 last:pb-0">
                  {/* Dot on the spine */}
                  <div
                    aria-hidden="true"
                    className="absolute left-[-28px] md:left-[-24px] top-2 w-4 h-4 rounded-full bg-background"
                    style={{
                      border: `2.5px solid ${brand}`,
                      boxShadow: `0 0 12px -2px ${brand}`,
                    }}
                  />

                  <div
                    className="group rounded-lg border border-border bg-card p-4 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px]"
                    onMouseEnter={(ev) => {
                      ev.currentTarget.style.borderColor = brand
                      ev.currentTarget.style.boxShadow = `0 10px 24px -12px ${brand}`
                    }}
                    onMouseLeave={(ev) => {
                      ev.currentTarget.style.borderColor = ""
                      ev.currentTarget.style.boxShadow = ""
                    }}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <h3 className="font-medium">{e.position}</h3>
                        <p
                          className="text-xs font-mono font-medium mt-0.5"
                          style={{ color: brand }}
                        >
                          {e.company}
                        </p>
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {e.period}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {e.summary}
                    </p>

                    {/* Mobile-collapsed highlights, expanded on md+ */}
                    <details className="mt-3 md:hidden" open={false}>
                      <summary className="text-xs text-muted-foreground cursor-pointer select-none">
                        {e.highlights.length} highlights
                      </summary>
                      <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
                        {e.highlights.map((h, i) => (
                          <li key={i} className={markerClassByIndex(i % 5)}>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </details>
                    <ul className="hidden md:block mt-3 space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
                      {e.highlights.map((h, i) => (
                        <li key={i} className={markerClassByIndex(i % 5)}>
                          {h}
                        </li>
                      ))}
                    </ul>

                    {e.tech.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {e.tech.map((t) => {
                          const toolBrand = brandColor(t, TOOL_BRAND)
                          return (
                            <span
                              key={t}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-mono text-muted-foreground"
                            >
                              <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ background: toolBrand }}
                              />
                              {t}
                            </span>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 7.2: Lint + build verification**

Run: `npm run lint && npm run build`
Expected: both succeed.

- [ ] **Step 7.3: Manual dev-server check**

Run: `npm run dev`
Open http://localhost:3000 and scroll to the Experience section. Verify:
- The section renders as a vertical timeline with a thin solid dark spine on the left
- Each entry has a glowing dot on the spine colored in its brand color: ANA scarlet, Athlos green, Lessi orange, Freelance green, UNLV red
- Each card has a plain neutral border by default, **no colored left bar**
- Hovering a card shifts its border and shadow to the company's brand color and lifts the card 2px
- The ANA entry title reads `Software Engineer` (no "Intern"), UNLV still reads `Web Development Intern`
- Cards stagger in top-to-bottom on scroll
- The tech tags have brand-color dots (React cyan, PostgreSQL blue, Docker blue, etc.)

Then resize to mobile width (375px). Verify:
- The highlights list is hidden and replaced by a `N highlights` expandable summary
- Clicking expands to show the bullets

Stop the dev server.

- [ ] **Step 7.4: Commit**

```bash
git add src/components/sections/experience-section.tsx
git commit -m "Refresh experience: timeline layout, brand colors, mobile collapse, drop ANA Intern"
```

---

## Task 8: About — tool bullet list becomes brand-color chip row

**Files:**
- Modify: `src/components/sections/about-section.tsx`

- [ ] **Step 8.1: Replace `src/components/sections/about-section.tsx` contents**

Replace the entire file with:

```tsx
import { borderClassByIndex, markerClassByIndex } from "@/lib/playful"
import { TOOL_BRAND, brandColor } from "@/lib/brand-colors"
import { FadeUp } from "@/components/motion/fade-up"
import { StaggerGroup } from "@/components/motion/stagger-group"
import { StaggerItem } from "@/components/motion/stagger-item"

// Match the exact 7 tools from the original bullet list
const TOOLS = [
  "React",
  "React Native",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "AWS",
]

export default function AboutSection() {
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="inline-flex items-baseline gap-3 mb-8">
            <h2 className="text-2xl font-semibold">About</h2>
            <span className={"h-0.5 w-10 " + borderClassByIndex(1)} />
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          <FadeUp>
            <div className="max-w-3xl space-y-4 text-muted-foreground">
              <p>
                I’m Brandon — a full‑stack dev based in Henderson, NV. I like
                building things that feel fast and friendly. Currently I’m
                leading frontend development on a telematics platform at ANA
                Corp while growing Athlos, a fitness app with paying
                subscribers.
              </p>
              <p>
                Most days I’m shipping features, tinkering with UI details, or
                shaving seconds off load times.
              </p>
              <p>
                Off the keyboard you’ll usually find me in the gym, on a run,
                or buried in a good book. Also a fan of cooking, basketball,
                and the occasional poker tournament.
              </p>

              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground/70 mb-2">
                  Tools I reach for
                </p>
                <StaggerGroup
                  stagger={0.05}
                  className="flex flex-wrap gap-1.5"
                >
                  {TOOLS.map((tool) => {
                    const brand = brandColor(tool, TOOL_BRAND)
                    return (
                      <StaggerItem key={tool}>
                        <span
                          className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-muted-foreground transition-[color,border-color,background-color,transform] duration-300 ease-out hover:-translate-y-[1px]"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = brand
                            e.currentTarget.style.borderColor = brand
                            e.currentTarget.style.backgroundColor = `${brand}14`
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = ""
                            e.currentTarget.style.borderColor = ""
                            e.currentTarget.style.backgroundColor = ""
                          }}
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: brand }}
                          />
                          {tool}
                        </span>
                      </StaggerItem>
                    )
                  })}
                </StaggerGroup>
              </div>

              <ul className="list-disc list-inside space-y-1.5">
                <li className={markerClassByIndex(2)}>
                  I enjoy clean interfaces, sensible APIs, and straightforward docs
                </li>
                <li className={markerClassByIndex(4)}>
                  I care about performance, accessibility, and maintainability
                </li>
              </ul>
            </div>
          </FadeUp>

          <FadeUp>
            <div
              className={
                "rounded-lg p-4 border transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] hover:shadow-[0_10px_24px_-12px_rgba(134,239,172,0.4)] " +
                borderClassByIndex(3)
              }
            >
              <h3 className="text-sm font-medium mb-2">Education</h3>
              <p className="text-sm text-muted-foreground">
                B.S. in Computer Science, UNLV (2024)
              </p>
              <div className="mt-3 h-px w-full bg-border" />
              <h3 className="text-sm font-medium mt-3 mb-2">Currently</h3>
              <p className="text-sm text-muted-foreground">
                Software Engineer at ANA Corp, building Athlos, and freelancing
                on web projects.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
```

Note: the first "Tools I reach for" bullet from the original markup is gone (replaced by the chip row). The two remaining bullets below the chips are the philosophy lines. The "Currently" side card line is updated to match the ANA title change (`Software Engineer`, not `Software Engineer Intern`).

- [ ] **Step 8.2: Lint + build verification**

Run: `npm run lint && npm run build`
Expected: both succeed.

- [ ] **Step 8.3: Manual dev-server check**

Run: `npm run dev`
Open http://localhost:3000 and scroll to the About section. Verify:
- The "Tools I reach for" list is now a row of pill chips, each with a brand-color dot (React cyan, Supabase green, AWS orange, etc.)
- Hovering a chip tints the whole chip toward that tool's brand color
- Chips stagger in on scroll
- The Education side card still renders and lifts slightly on hover

Stop the dev server.

- [ ] **Step 8.4: Commit**

```bash
git add src/components/sections/about-section.tsx
git commit -m "Refresh about: tool bullets become brand-color chip row"
```

---

## Task 9: Contact — floating labels, focus accent rotation, send button states

**Files:**
- Modify: `src/components/sections/contact-section.tsx` (full rewrite)

**Real structure of this file (important context):** The contact section has a **two-column layout**: the form on the left, and an info panel on the right containing Availability, Preferred stack tags, and Contact buttons (Email / LinkedIn / Resume). The info panel must be **preserved entirely** — this task only replaces the form fields with the floating-label pattern. The existing `handleSubmit` already calls `form.reset()` and uses a 2500ms timeout — keep that behavior exactly. The section heading stays as `"Contact"` (not "Get in touch").

- [ ] **Step 9.1: Replace the full file**

Replace the entire contents of `src/components/sections/contact-section.tsx` with:

```tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { borderClassByIndex } from "@/lib/playful"
import { FadeUp } from "@/components/motion/fade-up"

const FIELD_ACCENT = {
  name:    "#7dd3fc",
  email:   "#f9a8d4",
  subject: "#c4b5fd",
  message: "#86efac",
} as const

type FieldKey = keyof typeof FIELD_ACCENT

export default function ContactSection() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focused, setFocused] = useState<FieldKey | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    setError(null)

    const form = e.currentTarget
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to send message")
      }

      setSent(true)
      form.reset()
      setTimeout(() => setSent(false), 2500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message")
    } finally {
      setSending(false)
    }
  }

  const fieldStyle = (key: FieldKey): React.CSSProperties => {
    const isFocused = focused === key
    return {
      borderColor: isFocused ? FIELD_ACCENT[key] : undefined,
      boxShadow: isFocused ? `0 0 0 3px ${FIELD_ACCENT[key]}1a` : undefined,
    }
  }

  const labelStyle = (key: FieldKey): React.CSSProperties => {
    const isFocused = focused === key
    return {
      color: isFocused ? FIELD_ACCENT[key] : undefined,
    }
  }

  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="inline-flex items-baseline gap-3 mb-8">
            <h2 className="text-2xl font-semibold">Contact</h2>
            <span className={"h-0.5 w-10 " + borderClassByIndex(0)} />
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] gap-6">
          <FadeUp className="order-1 lg:order-1">
            <form
              onSubmit={handleSubmit}
              className={"space-y-4 rounded-lg p-4 border " + borderClassByIndex(3)}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(["name", "email"] as FieldKey[]).map((key) => (
                  <div
                    key={key}
                    className="relative rounded-md border border-border bg-card px-3 pt-5 pb-2 transition-[border-color,box-shadow] duration-200"
                    style={fieldStyle(key)}
                  >
                    <label
                      htmlFor={key}
                      className="absolute left-3 top-1 text-[9px] uppercase tracking-widest font-mono text-muted-foreground/70 transition-colors"
                      style={labelStyle(key)}
                    >
                      {key}
                    </label>
                    <input
                      id={key}
                      name={key}
                      type={key === "email" ? "email" : "text"}
                      required
                      onFocus={() => setFocused(key)}
                      onBlur={() => setFocused(null)}
                      className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 outline-none"
                    />
                  </div>
                ))}
              </div>

              <div
                className="relative rounded-md border border-border bg-card px-3 pt-5 pb-2 transition-[border-color,box-shadow] duration-200"
                style={fieldStyle("subject")}
              >
                <label
                  htmlFor="subject"
                  className="absolute left-3 top-1 text-[9px] uppercase tracking-widest font-mono text-muted-foreground/70 transition-colors"
                  style={labelStyle("subject")}
                >
                  subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 outline-none"
                />
              </div>

              <div
                className="relative rounded-md border border-border bg-card px-3 pt-5 pb-2 transition-[border-color,box-shadow] duration-200"
                style={fieldStyle("message")}
              >
                <label
                  htmlFor="message"
                  className="absolute left-3 top-1 text-[9px] uppercase tracking-widest font-mono text-muted-foreground/70 transition-colors"
                  style={labelStyle("message")}
                >
                  message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 outline-none resize-none"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500" role="alert">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={sending}
                className={
                  "group inline-flex items-center gap-2 transition-colors duration-300 " +
                  (sent ? "!bg-[#86efac] !text-black" : "")
                }
              >
                {sending
                  ? "Sending…"
                  : sent
                    ? (
                      <>
                        Sent
                        <span aria-hidden="true">✓</span>
                      </>
                    )
                    : (
                      <>
                        Send message
                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </>
                    )}
              </Button>
            </form>
          </FadeUp>

          <FadeUp className="order-2 lg:order-2">
            <div className="rounded-lg p-5">
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="text-sm font-medium">Availability</h3>
                  <p className="text-muted-foreground mt-1">
                    Open to freelance and full‑time roles.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-muted border border-border">Remote‑friendly</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-muted border border-border">US hours</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Preferred stack</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["TypeScript","React","React Native","Tailwind","Postgres","Vite","Docker","WSL","Vercel"].map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-muted border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Contact</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href="mailto:timok@unlv.nevada.edu">Email</Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link
                        href="https://www.linkedin.com/in/brandon-timok-589765253/"
                        target="_blank"
                      >
                        LinkedIn
                      </Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link href="/BTimokResume24.pdf" target="_blank">
                        Resume
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
```

**What changed vs the original:**
- Form fields replaced `<Label>` + `<Input>` / `<Textarea>` (from `@/components/ui/*`) with raw `<input>` / `<textarea>` wrapped in a floating-label container. The ui primitives stay in the repo unchanged for anything else that imports them.
- Name + Email still sit in a 2-column grid, Subject and Message are full-width.
- The form wrapper keeps its `rounded-lg p-4 border` + `borderClassByIndex(3)` (green outline). Each individual field gets its own focus accent from `FIELD_ACCENT`.
- Send button gains the `→` slide-on-hover and the sent-state green-tint with a check mark.
- The right-hand info panel (Availability / Preferred stack / Contact buttons) is **preserved exactly as-is** — only the wrapper gets a `FadeUp` around it for scroll reveal. The pre-existing resume inconsistency (`/BTimokResume24.pdf` here vs `/Resume25.pdf` elsewhere in the site) is left untouched; flag it as a follow-up if desired, but this refresh is not the place to edit file references.
- The section heading stays `"Contact"` (not "Get in touch").

- [ ] **Step 9.2: Lint + build verification**

Run: `npm run lint && npm run build`
Expected: both succeed.

- [ ] **Step 9.3: Manual dev-server check**

Run: `npm run dev`
Open http://localhost:3000 and scroll to the Contact section. Verify:
- The two-column layout is preserved — form on the left, info panel on the right
- Each form field has a floating monospace label at the top (`NAME`, `EMAIL`, `SUBJECT`, `MESSAGE`)
- Clicking a field shifts its border and label color to the accent (name cyan, email pink, subject lavender, message green) and adds a subtle colored glow ring
- The submit button has a `→` arrow that slides right on hover
- The info panel on the right still shows Availability, Preferred stack tags, and the Email / LinkedIn / Resume buttons
- Both columns fade up on scroll

**Do not submit the form** in local dev unless `RESEND_API_KEY` and `CONTACT_EMAIL` are set in `.env.local`. If they are, submit a test message and verify the success state (green button, "Sent ✓"). If they aren't, trust the state transitions and move on.

Stop the dev server.

- [ ] **Step 9.4: Commit**

```bash
git add src/components/sections/contact-section.tsx
git commit -m "Refresh contact: floating labels, focus accent rotation, send button states"
```

---

## Task 10: Full-site verification + cleanup

**Files:** none modified — this is a QA pass.

- [ ] **Step 10.1: Run lint + build one more time**

Run: `npm run lint && npm run build`
Expected: both clean.

- [ ] **Step 10.2: Full-site walkthrough at desktop width**

Run: `npm run dev`. Open http://localhost:3000 at a desktop window (~1440px). Scroll top-to-bottom slowly and verify:

- Nav scroll progress bar grows from 0 → 100% as you scroll
- Nav active section highlighter moves as you scroll between sections
- **Hero:** stagger-in on load, dot grid visible, conic ring around avatar, Resume is primary CTA
- **Projects:** Athlos featured block fades in, three cards lift + glow on hover with per-card accent, KLS shows real screenshot, tech tags have brand dots
- **Experience:** vertical timeline with neutral spine, brand-colored dots, cards lift + border-shift to brand color on hover, ANA reads "Software Engineer" (no Intern), UNLV reads "Web Development Intern"
- **About:** tool chips stagger in, hovering a chip tints it to its tool's brand color, Education side card lifts on hover
- **Contact:** fields focus with accent color ring, send button arrow slides on hover

- [ ] **Step 10.3: Mobile viewport check**

Open DevTools, switch to responsive mode at 375px width. Walk through the site again. Verify:
- Nav collapses into the hamburger menu
- Hero stacks avatar above text
- Project grid stacks to single column
- Experience timeline highlights collapse behind the `N highlights` `<details>` toggle
- About chips wrap cleanly
- Contact form takes full width with no overflow

- [ ] **Step 10.4: Reduced-motion check**

Still in DevTools, open the Command Palette (Cmd/Ctrl + Shift + P) and run `Emulate CSS prefers-reduced-motion`. Set it to `reduce`. Reload the page. Verify:
- No fade-ups anywhere — everything appears at its final state immediately
- No stagger animations in the hero, about chips, or experience timeline
- Scroll progress bar does not render (it's hidden by the `useReducedMotion` early return)
- Hover transitions on cards still work (those are CSS-transition-based and the reduced-motion reset in `globals.css` brings them to 0.001ms — effectively instant, which is correct)

Stop the dev server.

- [ ] **Step 10.5: Optional — remove the unused `.superpowers/` mockups directory from git ignoring if you want to tidy**

This is optional. The `.superpowers/` directory holds the visual companion mockups from brainstorming and is already in `.gitignore`. If you want to delete the local files:

```bash
rm -rf .superpowers
```

Skip if you want to keep them for reference.

- [ ] **Step 10.6: Push and deploy**

```bash
git push origin main
```

Vercel will deploy a preview automatically. Open the preview URL, walk through it on a real phone if possible, and confirm the motion timing feels right in production (dev server can be slightly jankier).

- [ ] **Step 10.7: Final commit (if any tidy-ups)**

If Step 10.5 or any small polish was applied:

```bash
git add -u
git commit -m "Post-verification cleanup"
git push origin main
```

Otherwise, this step is a no-op. The refresh is shipped.

---

## Notes for the Executing Engineer

- **Worktree:** This plan was not run in a dedicated worktree. If you prefer, you can create one with the `superpowers:using-git-worktrees` skill before starting Task 1. Not required.
- **Framer Motion is already installed** — no `npm install` needed. Check `package.json` if you're unsure.
- **The playful.ts pattern is load-bearing.** Do not inline-compose Tailwind classes for the 5 pastels — always use `borderClassByIndex(i)` etc. Brand-color hex values from `brand-colors.ts` go through `style={{}}` props, not Tailwind classes, and that's intentional.
- **No Claude attribution in commits** (user preference in this repo). Use plain commit messages, no `Co-Authored-By` trailer.
- **If you hit a visual issue you can't reconcile** with the spec, stop and ask. Don't guess. The spec at `docs/superpowers/specs/2026-04-10-portfolio-ui-refresh-design.md` is the source of truth; if the plan contradicts it, the spec wins.
