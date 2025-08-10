import { borderClassByIndex, markerClassByIndex } from "@/lib/playful"

export default function AboutSection() {
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-baseline gap-3 mb-8">
          <h2 className="text-2xl font-semibold">About</h2>
          <span className={"h-0.5 w-10 " + borderClassByIndex(1)}></span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          <div className="max-w-3xl space-y-4 text-muted-foreground">
            <p>
              I’m Brandon — a full‑stack dev based in Henderson, NV. I like building small things that feel fast and
              friendly. Most days I’m working on a fitness app, tinkering with UI details, or shaving seconds off load
              times.
            </p>
            <p>
              Off the keyboard you’ll usually find me in the gym, on a run, or buried in a good book. I’m also
              a fan of cooking, basketball, and the occasional poker tournament.
            </p>
            <ul className="list-disc list-inside space-y-1.5">
              <li className={markerClassByIndex(0)}>Tools I reach for: TypeScript, React/Next.js, Tailwind, Supabase</li>
              <li className={markerClassByIndex(2)}>I enjoy clean interfaces, sensible APIs, and straightforward docs</li>
              <li className={markerClassByIndex(4)}>I care about performance, accessibility, and maintainability</li>
            </ul>
          </div>
          <div className={"rounded-lg p-4 border " + borderClassByIndex(3)}>
            <h3 className="text-sm font-medium mb-2">Education</h3>
            <p className="text-sm text-muted-foreground">B.S. in Computer Science, UNLV (2024)</p>
            <div className="mt-3 h-px w-full bg-border" />
            <h3 className="text-sm font-medium mt-3 mb-2">Currently</h3>
            <p className="text-sm text-muted-foreground">Shipping a fitness app and helping a few folks with web projects.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

