"use client"

import { useCallback, useState } from "react"
import Link from "next/link"
import { Menu, X, FileText } from "lucide-react"
import { useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useActiveSection } from "@/components/motion/use-active-section"
import { accentHexByIndex } from "@/lib/playful"

const SECTION_IDS = ["projects", "experience", "about", "contact"]
const sectionAccent = (id: string): string =>
  accentHexByIndex(SECTION_IDS.indexOf(id))

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)
  const prefersReducedMotion = useReducedMotion()

  const scrollToTop = useCallback(() => {
    setOpen(false)
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })
  }, [prefersReducedMotion])

  return (
    <nav
      className="fixed top-0 w-full z-50 border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/95"
      style={{ borderBottomColor: "var(--avatar-accent)" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="text-sm font-medium transition-colors hover:text-[var(--avatar-accent)]"
            >
              Brandon Timok
            </button>
            <span
              className="hidden sm:inline-block text-[10px] leading-4 px-2 py-0.5 rounded border"
              style={{ borderColor: "var(--avatar-accent)" }}
            >
              B.S. Computer Science
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {SECTION_IDS.map((item) => {
              const isActive = active === item
              return (
                <Link
                  key={item}
                  href={`#${item}`}
                  className="relative text-sm text-muted-foreground hover:text-foreground transition-colors"
                  style={isActive ? { color: sectionAccent(item) } : undefined}
                >
                  <span className="capitalize">{item}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 right-0 h-[1.5px]"
                      style={{ background: sectionAccent(item) }}
                    />
                  )}
                </Link>
              )
            })}
            <div className="h-4 w-px bg-border" />
            <Button asChild variant="outline" size="sm">
              <Link href="/Resume25.pdf" target="_blank" aria-label="Resume">
                <FileText className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      <div
        className="md:hidden grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="border-t container mx-auto px-4 py-3" style={{ borderColor: "var(--avatar-accent)" }}>
            <div className="flex flex-col gap-1">
              {SECTION_IDS.map((item) => {
                const isActive = active === item
                return (
                  <Link
                    key={item}
                    href={`#${item}`}
                    className="text-sm py-2 px-3 rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
                    style={isActive ? { color: sectionAccent(item) } : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span className="capitalize">{item}</span>
                  </Link>
                )
              })}
              <div className="h-px w-full bg-border my-1" />
              <Link
                href="/Resume25.pdf"
                target="_blank"
                className="flex items-center gap-2 text-sm py-2 px-3 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => setOpen(false)}
              >
                <FileText className="h-3.5 w-3.5" />
                Resume
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
