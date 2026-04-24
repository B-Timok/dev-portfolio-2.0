import Link from "next/link"
import { Apple, ExternalLink } from "lucide-react"
import type { Project, ProjectLink } from "@/data/projects"
import { accentHexByIndex } from "@/lib/playful"
import { TOOL_BRAND, brandColor } from "@/lib/brand-colors"
import { ProjectVisual } from "./project-visual"

type ProjectSlideProps = {
  project: Project
  index: number
  total: number
}

export function ProjectSlide({ project, index, total }: ProjectSlideProps) {
  const accentHex = accentHexByIndex(project.accentIndex)

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}: ${project.title}`}
      className="shrink-0 grow-0 basis-full min-w-0 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-10 md:gap-12 items-center">
          <div className="order-1 md:order-1">
            <ProjectVisual visual={project.visual} accentHex={accentHex} />
          </div>

          <div className="order-2 md:order-2 space-y-5">
            <div className="space-y-2">
              <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                {project.meta}
              </p>
              <h3 className="text-3xl md:text-4xl font-semibold leading-tight">
                {project.title}
              </h3>
              <p
                className="text-lg md:text-xl font-medium leading-snug"
                style={{ color: accentHex }}
              >
                {project.pitch}
              </p>
            </div>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-prose">
              {project.writeup}
            </p>

            {project.stack.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((t) => {
                  const tBrand = brandColor(t, TOOL_BRAND)
                  return (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-mono text-muted-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: tBrand }}
                      />
                      {t}
                    </span>
                  )
                })}
              </div>
            )}

            {project.links.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {project.links.map((link) => (
                  <ProjectLinkButton key={link.href} link={link} accentHex={accentHex} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectLinkButton({
  link,
  accentHex,
}: {
  link: ProjectLink
  accentHex: string
}) {
  const Icon = iconFor(link.icon)
  const isAppStore = link.icon === "app-store"

  if (isAppStore) {
    return (
      <Link
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 rounded-md bg-black px-4 py-2 text-white hover:opacity-90 transition-opacity"
      >
        <Apple className="h-5 w-5" />
        <span className="leading-tight">
          <span className="block text-[10px]">Download on the</span>
          <span className="block text-sm font-semibold">App Store</span>
        </span>
      </Link>
    )
  }

  return (
    <Link
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border text-sm font-medium transition-colors duration-200 hover:border-[var(--link-accent)] hover:text-[var(--link-accent)]"
      style={{ ["--link-accent" as string]: accentHex }}
    >
      <Icon className="h-4 w-4" />
      {link.label}
    </Link>
  )
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.21.09 1.85 1.25 1.85 1.25 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.32.47-2.4 1.24-3.24-.12-.31-.54-1.54.12-3.22 0 0 1.01-.32 3.3 1.24a11.4 11.4 0 0 1 6 0c2.29-1.56 3.3-1.24 3.3-1.24.66 1.68.24 2.91.12 3.22.77.84 1.24 1.92 1.24 3.24 0 4.62-2.81 5.65-5.49 5.94.43.37.82 1.1.82 2.23v3.3c0 .32.22.7.83.58C20.56 22.3 24 17.8 24 12.5 24 5.87 18.63.5 12 .5Z"
      />
    </svg>
  )
}

function iconFor(kind: ProjectLink["icon"]) {
  if (kind === "github") return GithubIcon
  if (kind === "app-store") return Apple
  return ExternalLink
}
