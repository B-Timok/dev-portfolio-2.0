import { borderClassByIndex, markerClassByIndex } from "@/lib/playful"

export default function ExperienceSection() {
  const experiences = [
    {
      company: "Lessi AI",
      position: "Software Developer",
      period: "Jul 2024 – Present",
      summary: "Building AI‑assisted tools for educators; shipping fast in a lean environment.",
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
      company: "E‑commerce (Shopify)",
      position: "Founder & Operator",
      period: "2017 – 2021",
      summary: "Bootstrapped a Shopify business pre‑CS: storefront build, growth, and operations.",
      highlights: [
        "Launched and maintained a custom Shopify storefront (themes, payments, apps)",
        "Hired and managed 100+ contractors; built processes for recruiting and onboarding",
        "Owned customer support, marketing, and advertising across channels",
        "Scaled to $250k+ gross revenue; tracked unit economics and retention",
      ],
      tech: ["Shopify", "Liquid", "Ads", "Operations", "Analytics"],
    },
    {
      company: "Freelance",
      position: "Web Developer",
      period: "Dec 2024 – Present",
      summary: "Delivering websites for local businesses with a focus on speed and maintainability.",
      highlights: [
        "Information architecture, copy support, and brand alignment",
        "Accessible components and SEO‑friendly markup",
        "Simple content workflows for non‑technical editors",
      ],
      tech: ["Next.js", "TypeScript", "Tailwind"],
    },
    {
      company: "Athlos (solo)",
      position: "Mobile App Developer",
      period: "Mar 2025 – Present",
      summary: "Designing and building a personalized workout app end‑to‑end.",
      highlights: [
        "React Native app architecture and UI patterns",
        "Supabase auth, Postgres schema design, and RLS policies",
        "REST APIs for training logic and analytics",
      ],
      tech: ["React Native", "TypeScript", "Supabase"],
    },
  ] as const

  const ordered = [...experiences].sort((a, b) => {
    // Sort by period start (year, then month) descending
    const monthIndex: Record<string, number> = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 }
    const parseStart = (p: string) => {
      const m = p.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)?\s*(\d{4})/)
      const year = m ? parseInt(m[2], 10) : 0
      const month = m && m[1] ? monthIndex[m[1]] ?? 0 : 0
      return { year, month }
    }
    const sa = parseStart(a.period)
    const sb = parseStart(b.period)
    if (sb.year !== sa.year) return sb.year - sa.year
    return sb.month - sa.month
  })

  return (
    <section id="experience" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-baseline gap-3 mb-8">
          <h2 className="text-2xl font-semibold">Experience</h2>
          <span className={"h-0.5 w-10 " + borderClassByIndex(2)}></span>
        </div>
        <div className="space-y-8">
          {ordered.map((e, idx) => (
            <div key={e.company} className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-3 md:gap-8">
              <div className="md:text-right">
                <div className="inline-flex items-center gap-2 md:flex-col md:items-end">
                  <span className="text-xs text-muted-foreground">{e.period}</span>
                  <span className={"text-xs px-2 py-0.5 rounded border " + borderClassByIndex(idx)}>{e.company}</span>
                </div>
              </div>
              <div className={"rounded-lg p-4 border " + borderClassByIndex((idx + 2) % 5)}>
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="font-medium">{e.position}</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{e.summary}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
                  {e.highlights?.map((h, i) => (
                    <li key={i} className={markerClassByIndex((idx + i) % 5)}>{h}</li>
                  ))}
                </ul>
                {e.tech && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {e.tech.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded-full bg-muted border border-border">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

