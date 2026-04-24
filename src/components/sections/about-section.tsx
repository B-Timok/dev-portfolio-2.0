import { Guitar, Keyboard } from "lucide-react"
import { accentHexByIndex, borderClassByIndex } from "@/lib/playful"
import { FadeUp } from "@/components/motion/fade-up"

type Principle = { title: string; body?: string }
type RightNowRow = { label: string; value: React.ReactNode }
type Hobby = {
  label: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  accent: string
  tooltip?: string
  tooltipPosition?: "above" | "below"
}

const PRINCIPLES: Principle[] = [
  {
    title: "Ship small, ship often.",
    body: "80+ PRs in 9 weeks isn't a brag. It's a habit.",
  },
  {
    title: "Own the whole stack.",
    body: "Design, native code, backend, release. I'd rather hold the whole thing than hand it off.",
  },
  {
    title: "Sweat the UI.",
    body: "Small friction compounds; small polish compounds harder.",
  },
  {
    title: "Boring code that's right beats clever code that's almost.",
  },
]

const RIGHT_NOW: RightNowRow[] = [
  {
    label: "Building",
    value: "Athlos and the ANA Corp telematics frontend.",
  },
  {
    label: "Reading",
    value: (
      <>
        Just finished <em className="not-italic font-medium text-foreground/90">Dracula</em>,
        starting <em className="not-italic font-medium text-foreground/90">Berserker</em>.
      </>
    ),
  },
  {
    label: "Learning",
    value: "SvelteKit, plus tighter CI/CD workflows.",
  },
  {
    label: "Playing",
    value: "Back on the tennis court. Rocket League and COD on the side.",
  },
  {
    label: "Studied",
    value: "B.S. Computer Science, UNLV (2024).",
  },
]

const HOBBIES: Hobby[] = [
  { label: "Basketball",     Icon: BasketballIcon, accent: "#F97316", tooltip: "Taking ankles",                     tooltipPosition: "below" }, // orange
  { label: "Speedcubes",     Icon: CubeIcon,       accent: "#7dd3fc", tooltip: "3x3 PB · 11.87s" }, // blue
  { label: "Mech keyboards", Icon: Keyboard,       accent: "#c4b5fd", tooltip: "100-125 wpm" }, // purple
  { label: "Guitar",         Icon: Guitar,         accent: "#f9a8d4", tooltip: "alternative" }, // pink
  { label: "Poker",          Icon: SpadeIcon,      accent: "#86efac", tooltip: "Westgate tournament · 1st place" }, // green
]

export default function AboutSection() {
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="inline-flex items-baseline gap-3 mb-10">
            <h2 className="text-2xl font-semibold">About</h2>
            <span className={"h-0.5 w-10 " + borderClassByIndex(1)} />
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14 items-start">
          {/* Left: bio + principles */}
          <FadeUp>
            <div className="space-y-10 max-w-2xl">
              <p className="text-muted-foreground text-base leading-relaxed">
                I&apos;m Brandon, a full-stack dev based in Henderson, NV. I like shipping
                things that feel fast and friendly, owning them end-to-end, and sweating
                the small UI details.
              </p>

              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground/70 mb-4">
                  How I work
                </p>
                <div className="space-y-3">
                  {PRINCIPLES.map((p, i) => (
                    <div key={i} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                        style={{ background: accentHexByIndex(i) }}
                      />
                      <p className="text-sm leading-relaxed">
                        <span className="font-semibold text-foreground">{p.title}</span>
                        {p.body && (
                          <>
                            {" "}
                            <span className="text-muted-foreground">{p.body}</span>
                          </>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Right: Right now widget + hobbies */}
          <FadeUp>
            <div className="space-y-8">
              <div className="rounded-lg border border-border bg-card p-5">
                <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground/70 mb-4">
                  Right now
                </p>
                <div className="space-y-3">
                  {RIGHT_NOW.map((row, i) => {
                    const accent = accentHexByIndex(i)
                    return (
                      <div key={row.label} className="flex items-start gap-3 text-sm">
                        <span
                          aria-hidden="true"
                          className="mt-[0.55em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                          style={{ background: accent }}
                        />
                        <div className="flex-1 leading-relaxed">
                          <span
                            className="text-[10px] font-mono uppercase tracking-widest mr-2"
                            style={{ color: accent }}
                          >
                            {row.label}
                          </span>
                          <span className="text-muted-foreground">{row.value}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground/70 mb-3">
                  Off keyboard
                </p>
                <div className="flex flex-wrap gap-2">
                  {HOBBIES.map((h) => (
                    <span
                      key={h.label}
                      tabIndex={h.tooltip ? 0 : -1}
                      style={{ ["--hobby-accent" as string]: h.accent }}
                      className="group/hobby relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-muted-foreground transition-[color,border-color,background-color] duration-300 ease-out hover:text-[var(--hobby-accent)] hover:border-[var(--hobby-accent)] hover:bg-white/[0.06] focus:outline-none focus-visible:text-[var(--hobby-accent)] focus-visible:border-[var(--hobby-accent)]"
                    >
                      <h.Icon
                        className="h-4 w-4"
                        style={{ color: h.accent }}
                        aria-hidden="true"
                      />
                      {h.label}
                      {h.tooltip && (
                        h.tooltipPosition === "below" ? (
                          <span
                            role="tooltip"
                            className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded-md border border-white/10 bg-background text-[10px] font-mono whitespace-nowrap text-foreground opacity-0 -translate-y-1 transition-[opacity,transform] duration-200 ease-out group-hover/hobby:opacity-100 group-hover/hobby:translate-y-0 group-focus-visible/hobby:opacity-100 group-focus-visible/hobby:translate-y-0"
                          >
                            {h.tooltip}
                            <span
                              aria-hidden="true"
                              className="absolute left-1/2 bottom-full -translate-x-1/2 translate-y-[5px] w-2 h-2 rotate-45 bg-background border-l border-t border-white/10"
                            />
                          </span>
                        ) : (
                          <span
                            role="tooltip"
                            className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-md border border-white/10 bg-background text-[10px] font-mono whitespace-nowrap text-foreground opacity-0 translate-y-1 transition-[opacity,transform] duration-200 ease-out group-hover/hobby:opacity-100 group-hover/hobby:translate-y-0 group-focus-visible/hobby:opacity-100 group-focus-visible/hobby:translate-y-0"
                          >
                            {h.tooltip}
                            <span
                              aria-hidden="true"
                              className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[5px] w-2 h-2 rotate-45 bg-background border-r border-b border-white/10"
                            />
                          </span>
                        )
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// Tabler icon: ball-basketball
function BasketballIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M5.65 5.65l12.7 12.7" />
      <path d="M5.65 18.35l12.7 -12.7" />
      <path d="M12 3a9 9 0 0 0 9 9" />
      <path d="M3 12a9 9 0 0 1 9 9" />
    </svg>
  )
}

// Tabler icon: cube
function CubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M21 16.008v-8.018a1.98 1.98 0 0 0 -1 -1.717l-7 -4.008a2.016 2.016 0 0 0 -2 0l-7 4.008c-.619 .355 -1 1.01 -1 1.718v8.018c0 .709 .381 1.363 1 1.717l7 4.008a2.016 2.016 0 0 0 2 0l7 -4.008c.619 -.355 1 -1.01 1 -1.718" />
      <path d="M12 22v-10" />
      <path d="M12 12l8.73 -5.04" />
      <path d="M3.27 6.96l8.73 5.04" />
    </svg>
  )
}

// Tabler icon: spade
function SpadeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3l4.919 4.5c.61 .587 1.177 1.177 1.703 1.771a5.527 5.527 0 0 1 .264 6.979c-1.18 1.56 -3.338 1.92 -4.886 .75v1l1 3h-6l1 -3v-1c-1.54 1.07 -3.735 .772 -4.886 -.75a5.527 5.527 0 0 1 .264 -6.979a30.883 30.883 0 0 1 1.703 -1.771a1541.72 1541.72 0 0 1 4.919 -4.5" />
    </svg>
  )
}
