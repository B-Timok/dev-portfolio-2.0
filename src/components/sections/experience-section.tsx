"use client"

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
    period: "Jul 2024 – March 2025",
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

        <StaggerGroup stagger={0.1}>
            {ordered.map((e) => {
              const brand = brandColor(e.company, COMPANY_BRAND)
              return (
                <StaggerItem key={e.company} className="pb-8 last:pb-0">

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
                      <div className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                        {e.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span
                              aria-hidden="true"
                              className="mt-[0.55em] h-1 w-1 rounded-full flex-shrink-0"
                              style={{ background: brand }}
                            />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </details>
                    <div className="hidden md:block mt-3 space-y-1.5 text-sm text-muted-foreground">
                      {e.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span
                            aria-hidden="true"
                            className="mt-[0.55em] h-1 w-1 rounded-full flex-shrink-0"
                            style={{ background: brand }}
                          />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

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
    </section>
  )
}
