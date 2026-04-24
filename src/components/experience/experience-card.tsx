import type { Experience } from "@/data/experience"
import { COMPANY_BRAND, TOOL_BRAND, brandColor } from "@/lib/brand-colors"
import { formatDuration } from "@/lib/duration"

export function ExperienceCard({ experience }: { experience: Experience }) {
  const brand = brandColor(experience.company, COMPANY_BRAND)
  const duration = formatDuration(experience.period)

  return (
    <div
      style={{ ["--card-accent" as string]: brand }}
      className="group rounded-lg border border-border bg-card p-5 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] hover:border-[var(--card-accent)] hover:shadow-[0_10px_24px_-12px_var(--card-accent)]"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h3 className="font-medium">{experience.position}</h3>
          <p className="text-xs font-mono font-medium mt-0.5" style={{ color: brand }}>
            {experience.company}
          </p>
        </div>
        <div className="flex items-baseline gap-2 text-[11px] font-mono text-muted-foreground">
          <span>{experience.period}</span>
          {duration && <span className="opacity-60">· {duration}</span>}
        </div>
      </div>

      <p className="text-sm text-muted-foreground mt-3">{experience.summary}</p>

      {experience.stat && (
        <div
          className="mt-4 flex items-center gap-4 rounded-md border border-white/10 bg-white/[0.02] px-4 py-3"
          style={{ borderColor: `${brand}3a` }}
        >
          <span className="text-2xl md:text-3xl font-semibold tabular-nums" style={{ color: brand }}>
            {experience.stat.value}
          </span>
          <span className="h-8 w-px bg-white/10" aria-hidden="true" />
          <span className="text-xs text-muted-foreground leading-snug">{experience.stat.label}</span>
        </div>
      )}

      {/* Mobile-collapsed highlights, expanded on md+ */}
      <details className="mt-4 md:hidden" open={false}>
        <summary className="text-xs text-muted-foreground cursor-pointer select-none">
          {experience.highlights.length} highlights
        </summary>
        <HighlightsList highlights={experience.highlights} brand={brand} />
      </details>
      <div className="hidden md:block">
        <HighlightsList highlights={experience.highlights} brand={brand} />
      </div>

      {experience.tech.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {experience.tech.map((t) => (
            <TechTag key={t} tool={t} />
          ))}
        </div>
      )}
    </div>
  )
}

function HighlightsList({ highlights, brand }: { highlights: string[]; brand: string }) {
  return (
    <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
      {highlights.map((h, i) => (
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
  )
}

function TechTag({ tool }: { tool: string }) {
  const toolBrand = brandColor(tool, TOOL_BRAND)
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-mono text-muted-foreground">
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: toolBrand }}
      />
      {tool}
    </span>
  )
}
