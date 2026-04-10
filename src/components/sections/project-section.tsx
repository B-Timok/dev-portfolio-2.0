"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AppStoreBadge } from "@/components/ui/app-store-badge"
import { bgClassByIndex } from "@/lib/playful"
import { FadeUp } from "@/components/motion/fade-up"
import { StaggerGroup } from "@/components/motion/stagger-group"
import { StaggerItem } from "@/components/motion/stagger-item"
import { TOOL_BRAND, brandColor } from "@/lib/brand-colors"

type Project = {
  title: string
  description: string
  github: string
  image?: string
  demo?: string
  tech?: string[]
  accent: string
  highlights?: string[]
}

const websites: Project[] = [
  {
    title: "KLSLeadership",
    description:
      "Custom marketing site for a leadership coach. Vite + TypeScript with Resend-powered contact flows and Vercel hosting.",
    github: "#",
    image: "/kls-home.png",
    tech: ["Vite", "TypeScript", "Resend", "Vercel"],
    accent: "#7dd3fc",
    highlights: [
      "Custom marketing site with fast, minimal UI",
      "Email workflows powered by Resend API",
      "SEO, metadata, and domain setup on Namecheap",
    ],
  },
  {
    title: "slsmedic.com",
    description:
      "Client site in progress. Copy and thumbnail landing soon.",
    github: "#",
    tech: ["Coming soon"],
    accent: "#fcd34d",
  },
]

const otherProjects: Project[] = [
  {
    title: "Roadwatch",
    description: "Award-winning road safety app (Next.js, MongoDB, Docker).",
    github: "https://github.com/UNLV-CS472-672/2024-S-GROUP1-Roadwatch",
    image: "/roadwatch.png",
    tech: ["Next.js", "MongoDB", "Docker"],
    accent: "#f9a8d4",
    highlights: [
      "Team project; shipped MVP at UNLV",
      "Map, reports, and community features",
      "Containerized dev with Docker",
    ],
  },
  {
    title: "NBA Scoreboard",
    description: "Realtime NBA analysis using public APIs (Python).",
    github:
      "https://github.com/B-Timok/SideProjects/tree/main/pyProjects/sportsScores",
    image: "/nbascores.png",
    tech: ["Python", "APIs"],
    accent: "#c4b5fd",
    highlights: [
      "Realtime scoreboard and box scores",
      "Data fetching, parsing, and caching",
      "Lightweight UI for quick scan",
    ],
  },
]

function ProjectCard({ project }: { project: Project }) {
  const { accent } = project
  return (
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
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${accent}22 0%, ${accent}0a 60%, #050505 100%)`,
            }}
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70">
              Coming soon
            </span>
          </div>
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 70% 30%, ${accent}33, transparent 60%)`,
          }}
        />
      </div>
      <div className="p-5 space-y-2">
        <h3 className="font-medium">{project.title}</h3>
        <p className="text-sm text-muted-foreground">{project.description}</p>
        {project.highlights && project.highlights.length > 0 && (
          <div className="mt-1 space-y-1.5 text-sm text-muted-foreground">
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2">
                <span
                  aria-hidden="true"
                  className="mt-[0.55em] h-1 w-1 rounded-full flex-shrink-0"
                  style={{ background: accent }}
                />
                <span>{h}</span>
              </div>
            ))}
          </div>
        )}
        {project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tech.map((t) => {
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
        {project.github && project.github !== "#" && (
          <div className="pt-2 flex gap-2">
            <Button asChild size="sm" variant="outline">
              <Link href={project.github} target="_blank">
                Code
              </Link>
            </Button>
            {project.demo && (
              <Button asChild size="sm">
                <Link href={project.demo} target="_blank">
                  Demo
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16">
      {/* Featured — Athlos only */}
      <FadeUp>
        <div id="athlos" className="mb-16 border-y border-border bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="inline-flex items-baseline gap-3 mb-8">
              <h2 className="text-2xl font-semibold">Featured</h2>
              <span className={"h-0.5 w-10 " + bgClassByIndex(3)} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
              {/* Content */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div
                      role="img"
                      aria-label="Athlos logo"
                      className="w-14 h-14 shrink-0"
                      style={{
                        backgroundColor: "#3ecf8e",
                        maskImage: "url(/athlos-avatar-v2.svg)",
                        WebkitMaskImage: "url(/athlos-avatar-v2.svg)",
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                      }}
                    />
                    <h3 className="text-3xl font-semibold">Athlos Fitness</h3>
                  </div>
                  <p className="text-sm text-muted-foreground max-w-prose">
                    Athlos is a full‑stack mobile app for personalized training. I&apos;m the solo developer building the
                    product end‑to‑end — app, backend, design, and release. Core features include personalized workouts
                    that evolve with each user, a social feed for sharing progress, advanced analytics, and daily/weekly
                    challenges — all syncing securely across devices.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Solo scope</h4>
                    <div className="space-y-1.5 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-[0.55em] h-1 w-1 rounded-full flex-shrink-0"
                          style={{ background: "#3ecf8e" }}
                        />
                        <span>React Native UI; native modules in Swift / Objective‑C</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-[0.55em] h-1 w-1 rounded-full flex-shrink-0"
                          style={{ background: "#3ecf8e" }}
                        />
                        <span>TestFlight beta (30+ testers) and App Store launch; built with Expo</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-[0.55em] h-1 w-1 rounded-full flex-shrink-0"
                          style={{ background: "#3ecf8e" }}
                        />
                        <span>Subscriptions via RevenueCat and Apple In‑App Purchases</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Backend & integrations</h4>
                    <div className="space-y-1.5 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-[0.55em] h-1 w-1 rounded-full flex-shrink-0"
                          style={{ background: "#3ecf8e" }}
                        />
                        <span>Supabase: Auth, Postgres, Storage, RLS, Edge Functions</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-[0.55em] h-1 w-1 rounded-full flex-shrink-0"
                          style={{ background: "#3ecf8e" }}
                        />
                        <span>External APIs: ExerciseDB, RapidAPI sources, OpenAI</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-[0.55em] h-1 w-1 rounded-full flex-shrink-0"
                          style={{ background: "#3ecf8e" }}
                        />
                        <span>Clean REST endpoints and data modeling for training logic</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {["React Native","TypeScript","Swift/Obj‑C","Expo","Supabase","RevenueCat","Apple IAP","OpenAI","ExerciseDB"].map((t) => {
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

                <div className="flex flex-wrap gap-3 pt-2 items-center">
                  <AppStoreBadge href="https://apps.apple.com/us/app/athlos-fitness/id6744072500" />
                </div>
              </div>

              {/* Creative device preview with edge-to-edge screenshots */}
              <div className="relative h-[440px] hidden lg:block max-w-[480px] mx-auto w-full">
                <div className="absolute left-8 top-15 w-[170px] h-[340px] rounded-[2rem] bg-[#111111] shadow-sm rotate-[-6deg] overflow-hidden transition-[transform,translate,scale,rotate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-3 hover:scale-[1.06] hover:rotate-[-3deg] hover:z-20 hover:shadow-[0_20px_50px_-10px_rgba(62,207,142,0.55)] will-change-transform">
                  <Image src="/workout_mockup.png" alt="Athlos workout screen" fill className="object-contain" />
                </div>
                <div className="absolute right-8 bottom-7 w-[170px] h-[340px] rounded-[2rem] bg-[#111111] shadow-sm rotate-[6deg] overflow-hidden transition-[transform,translate,scale,rotate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-3 hover:scale-[1.06] hover:rotate-[3deg] hover:z-20 hover:shadow-[0_20px_50px_-10px_rgba(62,207,142,0.55)] will-change-transform">
                  <Image src="/stats_mockup.png" alt="Athlos stats screen" fill className="object-contain" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 top-0 z-10 w-[200px] h-[400px] rounded-[2rem] bg-[#111111] shadow md:shadow-md overflow-hidden transition-[transform,translate,scale,rotate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-3 hover:scale-[1.06] hover:z-20 hover:shadow-[0_20px_50px_-10px_rgba(62,207,142,0.55)] will-change-transform">
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-2 rounded-full bg-border z-10" />
                  <Image src="/dashboard_mockup.png" alt="Athlos dashboard screen" fill className="object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeUp>

      {/* Websites */}
      <div id="websites" className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <FadeUp>
          <div className="inline-flex items-baseline gap-3 mb-8">
            <h2 className="text-2xl font-semibold">Websites</h2>
            <span className="h-0.5 w-10 bg-[#7dd3fc]" />
          </div>
        </FadeUp>
        <StaggerGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {websites.map((p) => (
              <StaggerItem key={p.title}>
                <ProjectCard project={p} />
              </StaggerItem>
            ))}
          </div>
        </StaggerGroup>
      </div>

      {/* Other Projects */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="mb-8">
            <div className="flex items-baseline gap-3">
              <h2 className="text-2xl font-semibold">Other Projects</h2>
              <span className={"h-0.5 w-10 " + bgClassByIndex(3)} />
            </div>
            <p className="mt-3 text-sm text-muted-foreground max-w-prose">
              A selection of recent work. Clean code, minimal interfaces, and strong data models.
            </p>
          </div>
        </FadeUp>
        <StaggerGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((p) => (
              <StaggerItem key={p.title}>
                <ProjectCard project={p} />
              </StaggerItem>
            ))}
          </div>
        </StaggerGroup>
      </div>
    </section>
  )
}
