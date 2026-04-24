import { borderClassByIndex, markerClassByIndex } from "@/lib/playful"
import { TOOL_BRAND, brandColor } from "@/lib/brand-colors"
import { FadeUp } from "@/components/motion/fade-up"
import { StaggerGroup } from "@/components/motion/stagger-group"
import { StaggerItem } from "@/components/motion/stagger-item"

// Match the exact 7 tools from the original bullet list
const TOOLS = [
  "React",
  "React Native",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "AWS",
]

export default function AboutSection() {
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="inline-flex items-baseline gap-3 mb-8">
            <h2 className="text-2xl font-semibold">About</h2>
            <span className={"h-0.5 w-10 " + borderClassByIndex(1)} />
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          <FadeUp>
            <div className="max-w-3xl space-y-4 text-muted-foreground">
              <p>
                I&apos;m Brandon — a full‑stack dev based in Henderson, NV. I like
                building things that feel fast and friendly. Currently I&apos;m
                leading frontend development on a telematics platform at ANA
                Corp while growing Athlos, a fitness app with paying
                subscribers.
              </p>
              <p>
                Most days I&apos;m shipping features, tinkering with UI details, or
                shaving seconds off load times.
              </p>
              <p>
                Off the keyboard you&apos;ll find me playing basketball, in the
                gym, collecting and solving speedcubes, or tinkering with
                mechanical keyboards. I also enjoy video games, reading,
                guitar, and the occasional poker night.
              </p>

              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground/70 mb-2">
                  Tools I reach for
                </p>
                <StaggerGroup
                  stagger={0.05}
                  className="flex flex-wrap gap-1.5"
                >
                  {TOOLS.map((tool) => {
                    const brand = brandColor(tool, TOOL_BRAND)
                    return (
                      <StaggerItem key={tool}>
                        <span
                          style={{ ["--tool-accent" as string]: brand }}
                          className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-muted-foreground transition-[color,border-color,background-color,transform] duration-300 ease-out hover:-translate-y-[1px] hover:text-[var(--tool-accent)] hover:border-[var(--tool-accent)] hover:bg-white/[0.06]"
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: brand }}
                          />
                          {tool}
                        </span>
                      </StaggerItem>
                    )
                  })}
                </StaggerGroup>
              </div>

              <ul className="list-disc list-inside space-y-1.5">
                <li className={markerClassByIndex(2)}>
                  I enjoy clean interfaces, sensible APIs, and straightforward docs
                </li>
                <li className={markerClassByIndex(4)}>
                  I care about performance, accessibility, and maintainability
                </li>
              </ul>
            </div>
          </FadeUp>

          <FadeUp>
            <div
              className={
                "rounded-lg p-4 border transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] hover:shadow-[0_10px_24px_-12px_rgba(134,239,172,0.4)] " +
                borderClassByIndex(3)
              }
            >
              <h3 className="text-sm font-medium mb-2">Education</h3>
              <p className="text-sm text-muted-foreground">
                B.S. in Computer Science, UNLV (2024)
              </p>
              <div className="mt-3 h-px w-full bg-border" />
              <h3 className="text-sm font-medium mt-3 mb-2">Currently</h3>
              <p className="text-sm text-muted-foreground">
                Software Engineer at ANA Corp, building Athlos, and freelancing
                on web projects.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
