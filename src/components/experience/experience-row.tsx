"use client"

import { useState } from "react"
import type { Experience } from "@/data/experience"
import { COMPANY_BRAND, TOOL_BRAND, brandColor } from "@/lib/brand-colors"
import { formatDuration } from "@/lib/duration"

export function ExperienceRow({ experience }: { experience: Experience }) {
  const [open, setOpen] = useState(false)
  const brand = brandColor(experience.company, COMPANY_BRAND)
  const duration = formatDuration(experience.period)

  return (
    <div
      className="rounded-lg border border-border bg-card transition-[border-color] duration-300"
      style={{ ["--row-accent" as string]: brand }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex flex-wrap items-baseline gap-x-3 gap-y-1 px-4 py-3 text-left rounded-lg cursor-pointer transition-colors duration-200 hover:bg-white/[0.02]"
      >
        <span className="text-sm font-medium">{experience.position}</span>
        <span className="text-xs font-mono font-medium" style={{ color: brand }}>
          {experience.company}
        </span>
        <span className="ml-auto text-[11px] font-mono text-muted-foreground">
          {experience.period}
          {duration && <span className="opacity-60"> · {duration}</span>}
        </span>
        <span
          aria-hidden="true"
          className={
            "text-xs text-muted-foreground transition-transform duration-300 " +
            (open ? "rotate-180" : "")
          }
        >
          ▾
        </span>
      </button>

      {/* Drawer: grid-template-rows animates 0fr ↔ 1fr on every toggle. */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden min-h-0">
          <div className="px-4 pb-4 pt-1 border-t border-white/[0.04]">
            <p className="text-sm text-muted-foreground mt-3">{experience.summary}</p>

            <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              {experience.highlights.map((h, i) => (
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

            {experience.tech.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {experience.tech.map((t) => {
                  const toolBrand = brandColor(t, TOOL_BRAND)
                  return (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-mono text-muted-foreground"
                    >
                      <span
                        aria-hidden="true"
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
        </div>
      </div>
    </div>
  )
}
