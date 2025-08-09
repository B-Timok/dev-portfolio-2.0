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
              Full‑stack developer based in Henderson, NV. I build pragmatic, maintainable products with a focus on
              clarity, performance, and developer experience.
            </p>
            <p>
              Comfortable across the stack: Next.js, TypeScript, Tailwind, C#/Node backends, and SQL. I enjoy designing
              simple systems, clean APIs, and minimal interfaces.
            </p>
            <ul className="list-disc list-inside space-y-1.5">
              <li className={markerClassByIndex(0)}>Clean, accessible UI with minimal ornamentation</li>
              <li className={markerClassByIndex(2)}>API design focused on clarity and performance</li>
              <li className={markerClassByIndex(4)}>Thoughtful data modeling and maintainability</li>
            </ul>
          </div>
          <div className={"rounded-lg p-4 border " + borderClassByIndex(3)}>
            <h3 className="text-sm font-medium mb-2">Education</h3>
            <p className="text-sm text-muted-foreground">B.S. in Computer Science, UNLV (2024)</p>
            <div className="mt-3 h-px w-full bg-border" />
            <h3 className="text-sm font-medium mt-3 mb-2">Currently</h3>
            <p className="text-sm text-muted-foreground">Building AI‑assisted tools and iterating on a fitness app.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

