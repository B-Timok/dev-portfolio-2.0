"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { borderClassByIndex } from "@/lib/playful"
import { ScrollProgress } from "@/components/motion/scroll-progress"
import { useActiveSection } from "@/components/motion/use-active-section"

const SECTION_IDS = ["projects", "experience", "about", "contact"] as const
const SECTION_ACCENT: Record<string, string> = {
  projects:   "#7dd3fc",
  experience: "#f9a8d4",
  about:      "#c4b5fd",
  contact:    "#86efac",
}

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection([...SECTION_IDS])

  return (
    <nav
      className={
        "fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 " +
        borderClassByIndex(2)
      }
    >
      <ScrollProgress />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-medium">
              Brandon Timok
            </Link>
            <span
              className={
                "hidden sm:inline-block text-[10px] leading-4 px-2 py-0.5 rounded border " +
                borderClassByIndex(0)
              }
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
                  style={isActive ? { color: SECTION_ACCENT[item] } : undefined}
                >
                  <span className="capitalize">{item}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 right-0 h-[1.5px]"
                      style={{ background: SECTION_ACCENT[item] }}
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

      {open && (
        <div className="md:hidden border-t border-border">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col gap-3">
              {SECTION_IDS.map((item) => (
                <Link
                  key={item}
                  href={`#${item}`}
                  className="text-sm"
                  onClick={() => setOpen(false)}
                >
                  <span className="capitalize">{item}</span>
                </Link>
              ))}
              <div className="h-px w-full bg-border" />
              <Link
                href="/Resume25.pdf"
                target="_blank"
                className="text-sm"
                onClick={() => setOpen(false)}
              >
                Resume
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
