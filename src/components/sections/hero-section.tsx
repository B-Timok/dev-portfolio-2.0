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
        <StaggerGroup
          stagger={0.12}
          className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8"
        >
            <StaggerItem className="shrink-0">
              <div className="relative w-28 h-28 md:w-36 md:h-36 lg:w-48 lg:h-48">
                {/* Conic gradient blur ring — slow spin + breathe for a liminal feel */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #7dd3fc, #f9a8d4, #c4b5fd, #86efac, #fcd34d, #7dd3fc)",
                    filter: "blur(14px)",
                    opacity: 0.35,
                    animation:
                      "hero-ring-spin 22s linear infinite, hero-ring-breathe 7s ease-in-out infinite",
                    willChange: "transform, filter, opacity",
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
                <p className="text-muted-foreground mb-6 max-w-prose">
                  I build fast, minimal interfaces backed by reliable APIs — currently solo‑shipping Athlos and freelancing on web projects.
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
    </section>
  )
}
