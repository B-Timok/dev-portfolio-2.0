"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Project } from "@/data/projects"
import { accentHexByIndex } from "@/lib/playful"
import { ProjectSlide } from "./project-slide"

type ProjectsCarouselProps = {
  projects: Project[]
}

export function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const prefersReducedMotion = useReducedMotion()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    skipSnaps: false,
    duration: prefersReducedMotion ? 0 : 28,
  })
  const [selected, setSelected] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setSelected(api.selectedScrollSnap())
    setCanPrev(api.canScrollPrev())
    setCanNext(api.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    const markInteracted = () => setHasInteracted(true)
    emblaApi.on("pointerDown", markInteracted)
    emblaApi.on("select", markInteracted)
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
      emblaApi.off("pointerDown", markInteracted)
      emblaApi.off("select", markInteracted)
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  )

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        scrollPrev()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext],
  )

  const total = projects.length
  const selectedAccent = accentHexByIndex(projects[selected]?.accentIndex ?? 0)

  return (
    <div className="relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Projects</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-prose">
            Six projects shipped end-to-end — swipe or use the arrows to move through them.
          </p>
        </div>
        <div className="font-mono text-xs tabular-nums text-muted-foreground shrink-0">
          <span style={{ color: selectedAccent }}>{String(selected + 1).padStart(2, "0")}</span>
          <span className="mx-1 opacity-50">/</span>
          <span>{String(total).padStart(2, "0")}</span>
        </div>
      </div>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Projects"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
        style={{ ["--carousel-ring" as string]: selectedAccent }}
      >
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex touch-pan-y">
            {projects.map((project, i) => (
              <ProjectSlide key={project.slug} project={project} index={i} total={total} />
            ))}
          </div>
        </div>

        {/* Desktop arrows — anchored inside the section container so they
            hug the slide content instead of clinging to the viewport edges. */}
        <div className="hidden md:block pointer-events-none absolute inset-0">
          <div className="container mx-auto h-full relative px-4 sm:px-6 lg:px-8">
            <ArrowButton
              direction="prev"
              onClick={scrollPrev}
              disabled={!canPrev}
              className="pointer-events-auto absolute left-0 top-1/2 -translate-y-1/2"
            />
            <ArrowButton
              direction="next"
              onClick={scrollNext}
              disabled={!canNext}
              className="pointer-events-auto absolute right-0 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>

        {/* Mobile swipe hint — fades after first interaction */}
        {!hasInteracted && !prefersReducedMotion && (
          <div
            aria-hidden="true"
            className="md:hidden pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-muted-foreground animate-swipe-hint"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest">Swipe</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        )}
      </div>

      {/* Dots */}
      <div className="mt-8 flex justify-center gap-2">
        {projects.map((project, i) => {
          const isActive = i === selected
          const dotAccent = accentHexByIndex(project.accentIndex)
          return (
            <button
              key={project.slug}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Go to project ${i + 1}: ${project.title}`}
              aria-current={isActive}
              className="group h-2 rounded-full transition-[width,background-color,opacity] duration-300 ease-out"
              style={{
                width: isActive ? "28px" : "8px",
                backgroundColor: isActive ? dotAccent : "hsl(var(--muted-foreground) / 0.35)",
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

function ArrowButton({
  direction,
  onClick,
  disabled,
  className,
}: {
  direction: "prev" | "next"
  onClick: () => void
  disabled: boolean
  className?: string
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight
  const label = direction === "prev" ? "Previous project" : "Next project"
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={
        "group h-12 w-12 rounded-full border border-white/10 bg-card/90 backdrop-blur-md " +
        "flex items-center justify-center text-foreground/80 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] " +
        "transition-[transform,border-color,color,box-shadow,opacity] duration-200 " +
        "disabled:opacity-20 disabled:cursor-not-allowed " +
        "enabled:hover:border-[var(--carousel-ring)] enabled:hover:text-[var(--carousel-ring)] enabled:hover:scale-105 " +
        "enabled:hover:shadow-[0_12px_30px_-10px_var(--carousel-ring)] " +
        (className ?? "")
      }
    >
      <Icon className="h-5 w-5" />
    </button>
  )
}
