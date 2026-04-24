import { experiences, type Experience } from "@/data/experience"
import { COMPANY_BRAND, brandColor } from "@/lib/brand-colors"
import { FadeUp } from "@/components/motion/fade-up"
import { ExperienceCard } from "@/components/experience/experience-card"
import { ExperienceRow } from "@/components/experience/experience-row"

export default function ExperienceSection() {
  const current = experiences.filter((e) => e.tier !== "past")
  const past = experiences.filter((e) => e.tier === "past")

  return (
    <section id="experience" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] gap-10 lg:gap-16">
          {/* Sticky left column: section heading + kicker */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <FadeUp>
              <h2 className="text-2xl font-semibold">Experience</h2>
              <p className="mt-3 text-sm text-muted-foreground max-w-xs">
                {current.length} current roles running in parallel. Shipping full-stack since 2023.
              </p>
            </FadeUp>
          </div>

          {/* Right column: timeline */}
          <div className="relative max-w-3xl">
            {/* Continuous rail */}
            <div
              aria-hidden="true"
              className="absolute left-[11px] top-2 bottom-2 w-px bg-border"
            />

            <ClusterLabel>Currently</ClusterLabel>
            {current.map((exp) => (
              <TimelineRung key={exp.company} experience={exp} active />
            ))}

            <div className="h-6" aria-hidden="true" />

            <ClusterLabel>Previously</ClusterLabel>
            {past.map((exp) => (
              <TimelineRung key={exp.company} experience={exp} active={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ClusterLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="pl-10 mb-4">
      <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        {children}
      </p>
    </div>
  )
}

function TimelineRung({
  experience,
  active,
}: {
  experience: Experience
  active: boolean
}) {
  const brand = brandColor(experience.company, COMPANY_BRAND)
  return (
    <div className="relative pl-10 pb-5 last:pb-0">
      <Marker brand={brand} active={active} />
      {experience.tier === "primary" ? (
        <ExperienceCard experience={experience} />
      ) : (
        <ExperienceRow experience={experience} />
      )}
    </div>
  )
}

function Marker({ brand, active }: { brand: string; active: boolean }) {
  if (active) {
    return (
      <span
        aria-hidden="true"
        className="absolute left-[4px] top-4 w-4 h-4 flex items-center justify-center"
      >
        <span
          className="absolute inset-0 rounded-full opacity-50 animate-marker-pulse"
          style={{ background: brand }}
        />
        <span
          className="relative w-3 h-3 rounded-full ring-2 ring-background"
          style={{ background: brand }}
        />
      </span>
    )
  }
  return (
    <span
      aria-hidden="true"
      className="absolute left-[4px] top-4 w-4 h-4 flex items-center justify-center"
    >
      <span
        className="w-3 h-3 rounded-full border-2 bg-background"
        style={{ borderColor: `${brand}66` }}
      />
    </span>
  )
}
