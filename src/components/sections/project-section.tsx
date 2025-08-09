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
      tech: ["Next.js", "TypeScript", "Tailwind"],
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
                <h2 className="text-3xl font-semibold">Athlos Fitness</h2>
                <p className="text-sm text-muted-foreground max-w-prose">
                  Athlos is a full‑stack mobile app for personalized training. It generates adaptive workout plans,
                  tracks progress, and syncs securely across devices.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Product scope</h3>
                  <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                    <li className={markerClassByIndex(0)}>Adaptive plans, exercise logging, and progress charts</li>
                    <li className={markerClassByIndex(1)}>Offline‑first UX with seamless sync</li>
                    <li className={markerClassByIndex(2)}>Privacy by default; exportable data</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Full‑stack implementation</h3>
                  <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                    <li className={markerClassByIndex(3)}>Mobile: React Native + TypeScript</li>
                    <li className={markerClassByIndex(4)}>Backend: Supabase (Auth, Postgres, Storage, Row‑level security)</li>
                    <li className={markerClassByIndex(1)}>APIs: clean REST endpoints for training and analytics</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {["React Native","TypeScript","Supabase","Postgres","RLS","REST APIs"].map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-muted text-foreground/80 border border-border">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2 items-center">
                <AppStoreBadge href="https://apps.apple.com/" />
                <Button asChild size="sm" variant="outline">
                  <Link href="https://testflight.apple.com/join/VQkRyejA" target="_blank">TestFlight</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="https://github.com/B-Timok/Athlos" target="_blank">Source</Link>
                </Button>
              </div>
            </div>

            {/* Creative device preview (no screenshots until provided) */}
            <div className="relative h-[440px] hidden lg:block">
              <div className={"absolute left-8 top-10 w-[170px] h-[340px] rounded-[2rem] bg-muted shadow-sm rotate-[-6deg] border " + borderClassByIndex(0)} />
              <div className={"absolute left-1/2 -translate-x-1/2 top-0 w-[200px] h-[400px] rounded-[2rem] bg-card shadow md:shadow-md border " + borderClassByIndex(2)}>
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-2 rounded-full bg-border" />
                <div className="absolute inset-6 rounded-xl border border-dashed border-border/60 flex items-center justify-center text-xs text-muted-foreground">
                  Screenshots coming soon
                </div>
              </div>
              <div className={"absolute right-8 bottom-6 w-[170px] h-[340px] rounded-[2rem] bg-muted shadow-sm rotate-[6deg] border " + borderClassByIndex(4)} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-baseline gap-3">
            <h2 className="text-2xl font-semibold">Projects</h2>
            <span className={"h-0.5 w-10 " + bgClassByIndex(3)}></span>
          </div>
          <div className={"mt-4 border-l-4 pl-4 text-sm text-muted-foreground " + borderLeftClassByIndex(3)}>
            A selection of recent work. Clean code, minimal interfaces, and strong data models.
          </div>
        </div>
        {/* Featured first project as a split card */}
        {projects[0] && (
          <Card className={"mb-8 border-0"}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-xl font-medium">{projects[0].title}</h3>
                  <span className={"text-xs px-2 py-0.5 rounded border " + borderClassByIndex(1)}>Freelance</span>
                </div>
                <p className="text-sm text-muted-foreground max-w-prose">
                  Designed and built a modern marketing website for a local consulting company with a focus on speed,
                  accessibility, and straightforward content management.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium">Highlights</h4>
                    <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
                      <li className={markerClassByIndex(0)}>Clean information architecture and copy pass</li>
                      <li className={markerClassByIndex(2)}>Responsive, accessible components</li>
                      <li className={markerClassByIndex(4)}>Deployed with fast edge caching</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Stack</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {projects[0].tech?.map((t) => (
                        <span key={t} className="text-xs px-2 py-1 rounded-full bg-muted border border-border">{t}</span>
                      ))}
                    </div>
                    <div className={"mt-4 border-l-4 pl-3 text-xs text-muted-foreground " + borderLeftClassByIndex(0)}>
                      Result: fast load, easy edits, and a professional presence for client outreach.
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={projects[0].github} target="_blank">Code</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Remaining projects in a grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.slice(1).map((p, index) => (
            <Card key={p.title} className="card-hover border-0">
              <CardHeader className="p-0">
                <div className="relative w-full h-36 overflow-hidden rounded-t-lg">
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                </div>
              </CardHeader>
              <CardContent>
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

