"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AppStoreBadge } from "@/components/ui/app-store-badge"
import { markerClassByIndex, borderClassByIndex, bgClassByIndex, borderLeftClassByIndex } from "@/lib/playful"

export default function ProjectsSection() {
  type Project = { title: string; description: string; github: string; image: string; demo?: string; tech?: string[] }
  const projects: Project[] = [
    {
      title: "KLSLeadership Website",
      description: "Freelance project: modern website for KLSLeadership (Next.js, Tailwind).",
      github: "#",
      image: "/window.svg",
      tech: ["Vite", "TypeScript", "JavaScript", "Resend", "Vercel", "Namecheap"],
    },
    {
      title: "Roadwatch",
      description: "Award-winning road safety app (Next.js, MongoDB, Docker).",
      github: "https://github.com/UNLV-CS472-672/2024-S-GROUP1-Roadwatch",
      image: "/roadwatch.png",
      tech: ["Next.js", "MongoDB", "Docker"],
    },
    {
      title: "NBA Scoreboard",
      description: "Realtime NBA analysis using public APIs (Python).",
      github: "https://github.com/B-Timok/SideProjects/tree/main/pyProjects/sportsScores",
      image: "/nbascores.png",
      tech: ["Python", "APIs"],
    },
  ]

  return (
    <section id="projects" className="py-16">
      {/* Featured Athlos - full bleed */}
      <div id="athlos" className="mb-12 border-y border-border bg-secondary/30">
        <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
            {/* Content */}
            <div className="space-y-5">
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Featured</span>
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded overflow-hidden bg-muted">
                    <Image src="/athlos-logo.png" alt="Athlos logo" fill className="object-contain p-1" />
                  </div>
                  <h2 className="text-3xl font-semibold">Athlos Fitness</h2>
                </div>
                <p className="text-sm text-muted-foreground max-w-prose">
                  Athlos is a full‑stack mobile app for personalized training. I’m the solo developer building the
                  product end‑to‑end — app, backend, design, and release. Core features include personalized workouts
                  that evolve with each user, a social feed for sharing progress, advanced analytics, and daily/weekly
                  challenges — all syncing securely across devices.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Solo scope</h3>
                  <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                    <li className={markerClassByIndex(0)}>React Native UI; native modules in Swift / Objective‑C</li>
                    <li className={markerClassByIndex(1)}>TestFlight beta (30+ testers) and App Store launch; built with Expo</li>
                    <li className={markerClassByIndex(2)}>Subscriptions via RevenueCat and Apple In‑App Purchases</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Backend & integrations</h3>
                  <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                    <li className={markerClassByIndex(3)}>Supabase: Auth, Postgres, Storage, RLS, Edge Functions</li>
                    <li className={markerClassByIndex(4)}>External APIs: ExerciseDB, RapidAPI sources, OpenAI</li>
                    <li className={markerClassByIndex(1)}>Clean REST endpoints and data modeling for training logic</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {["React Native","TypeScript","Swift/Obj‑C","Expo","Supabase (RLS, Edge)","RevenueCat","Apple IAP","OpenAI","ExerciseDB"].map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-muted text-foreground/80 border border-border">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2 items-center">
                <AppStoreBadge href="https://apps.apple.com/us/app/athlos-fitness/id6744072500" />
                <Button asChild size="sm" variant="outline">
                  <Link href="https://github.com/B-Timok/Athlos" target="_blank">Source</Link>
                </Button>
              </div>
            </div>

            {/* Creative device preview with edge-to-edge screenshots */}
            <div className="relative h-[440px] hidden lg:block">
              <div className={"absolute left-8 top-10 w-[170px] h-[340px] rounded-[2rem] bg-[#111111] shadow-sm rotate-[-6deg] border overflow-hidden " + borderClassByIndex(0)}>
                <Image src="/athlos-workout.jpg" alt="Athlos workout screen" fill className="object-contain" />
              </div>
              <div className={"absolute left-1/2 -translate-x-1/2 top-0 w-[200px] h-[400px] rounded-[2rem] bg-[#111111] shadow md:shadow-md border overflow-hidden " + borderClassByIndex(2)}>
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-2 rounded-full bg-border z-10" />
                <Image src="/athlos-dash.jpg" alt="Athlos dashboard" fill className="object-contain" />
              </div>
              <div className={"absolute right-8 bottom-6 w-[170px] h-[340px] rounded-[2rem] bg-[#111111] shadow-sm rotate-[6deg] border overflow-hidden " + borderClassByIndex(4)}>
                <Image src="/athlos-stats.jpg" alt="Athlos stats screen" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured KLS - full bleed (mirrors Athlos layout) */}
      <div id="kls" className="mb-12 border-y border-border bg-secondary/30">
        <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
            {/* Content */}
            <div className="space-y-5">
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Featured</span>
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded overflow-hidden bg-muted">
                    <Image src="/kls-logo.png" alt="KLSLeadership logo" fill className="object-contain p-1" />
                  </div>
                  <h2 className="text-3xl font-semibold">KLSLeadership Website</h2>
                </div>
                <p className="text-sm text-muted-foreground max-w-prose">
                  Built a custom marketing website with a lean stack. Implemented email via Resend API, deployed on
                  Vercel, handled domain setup on Namecheap, and optimized SEO for fast, discoverable pages.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Project scope</h3>
                  <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                    <li className={markerClassByIndex(0)}>Custom marketing site with fast, minimal UI</li>
                    <li className={markerClassByIndex(2)}>Email workflows powered by Resend API</li>
                    <li className={markerClassByIndex(4)}>Deployment and hosting on Vercel</li>
                    <li className={markerClassByIndex(1)}>Efficient SEO (metadata, sitemaps, structured data)</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Implementation</h3>
                  <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                    <li className={markerClassByIndex(1)}>Vite + TypeScript / JavaScript</li>
                    <li className={markerClassByIndex(3)}>Resend API integration for contact/email</li>
                    <li className={markerClassByIndex(0)}>Domain & DNS setup with Namecheap</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {projects[0].tech?.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-muted text-foreground/80 border border-border">{t}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2 items-center">
                <Button asChild size="sm" variant="outline">
                  <Link href={projects[0].github} target="_blank">Code</Link>
                </Button>
              </div>
            </div>

            {/* Visual preview */}
            <div className="relative h-[440px] hidden lg:block">
              <div className={"absolute left-1/2 -translate-x-1/2 top-0 w-[560px] h-[360px] rounded-xl shadow md:shadow-md"}>
                <div className="absolute inset-6 rounded-lg overflow-hidden flex items-center justify-center">
                  <Image src="/kls-home.png" alt="KLSLeadership homepage" fill className="object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-baseline gap-3">
            <h2 className="text-2xl font-semibold">Other Projects</h2>
            <span className={"h-0.5 w-10 " + bgClassByIndex(3)}></span>
          </div>
          <div className={"mt-4 border-l-4 pl-4 text-sm text-muted-foreground " + borderLeftClassByIndex(3)}>
            A selection of recent work. Clean code, minimal interfaces, and strong data models.
          </div>
        </div>
        

        {/* Remaining projects in a grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.slice(1).map((p, index) => (
            <Card key={p.title} className="card-hover border-0 bg-transparent shadow-none">
              <CardHeader className="p-0">
                <div className="relative w-full h-36 overflow-hidden rounded-t-lg">
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                </div>
              </CardHeader>
              <CardContent className="px-5 sm:px-6">
                <div className="py-3 space-y-2">
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
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span key={t} className="text-xs px-2 py-1 rounded-full bg-muted border border-border">{t}</span>
                      ))}
                    </div>
                  )}
                  <div className="pt-1 flex gap-2">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

