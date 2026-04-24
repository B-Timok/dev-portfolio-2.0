import Image from "next/image"
import type { ProjectVisual as ProjectVisualType } from "@/data/projects"

type ProjectVisualProps = {
  visual: ProjectVisualType
  accentHex: string
}

export function ProjectVisual({ visual, accentHex }: ProjectVisualProps) {
  if (visual.kind === "mockups") {
    return <MockupsVisual visual={visual} accentHex={accentHex} />
  }
  return <ImageVisual src={visual.src} alt={visual.alt} accentHex={accentHex} />
}

function ImageVisual({
  src,
  alt,
  accentHex,
}: {
  src: string
  alt: string
  accentHex: string
}) {
  return (
    <div
      className="relative w-full aspect-[16/10] md:aspect-[4/3] rounded-xl border border-border bg-card overflow-hidden transition-shadow duration-500 ease-out"
      style={{ boxShadow: `0 30px 60px -30px ${accentHex}66` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-top"
        sizes="(max-width: 768px) 100vw, 60vw"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 80% 10%, ${accentHex}1f, transparent 55%)`,
        }}
      />
    </div>
  )
}

function MockupsVisual({
  visual,
  accentHex,
}: {
  visual: Extract<ProjectVisualType, { kind: "mockups" }>
  accentHex: string
}) {
  return (
    <>
      {/* Desktop: 3-phone staggered arrangement */}
      <div className="relative hidden md:block h-[480px] w-full max-w-[520px] mx-auto">
        <div
          className="absolute left-4 top-16 w-[180px] h-[360px] rounded-[2rem] bg-[#111] overflow-hidden rotate-[-6deg] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-3 hover:rotate-[-3deg] hover:z-20 will-change-transform"
          style={{ boxShadow: `0 20px 50px -18px ${accentHex}88` }}
        >
          <Image src={visual.secondary[0].src} alt={visual.secondary[0].alt} fill className="object-contain" />
        </div>
        <div
          className="absolute right-4 bottom-8 w-[180px] h-[360px] rounded-[2rem] bg-[#111] overflow-hidden rotate-[6deg] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-3 hover:rotate-[3deg] hover:z-20 will-change-transform"
          style={{ boxShadow: `0 20px 50px -18px ${accentHex}88` }}
        >
          <Image src={visual.secondary[1].src} alt={visual.secondary[1].alt} fill className="object-contain" />
        </div>
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 z-10 w-[210px] h-[420px] rounded-[2rem] bg-[#111] overflow-hidden transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-3 hover:z-20 will-change-transform"
          style={{ boxShadow: `0 24px 60px -20px ${accentHex}aa` }}
        >
          <div aria-hidden="true" className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-2 rounded-full bg-border z-10" />
          <Image src={visual.featured.src} alt={visual.featured.alt} fill className="object-contain" />
        </div>
      </div>

      {/* Mobile: featured phone + horizontal snap strip below */}
      <div className="md:hidden">
        <div
          className="relative mx-auto w-[220px] h-[440px] rounded-[2rem] bg-[#111] overflow-hidden"
          style={{ boxShadow: `0 24px 60px -20px ${accentHex}aa` }}
        >
          <div aria-hidden="true" className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-2 rounded-full bg-border z-10" />
          <Image src={visual.featured.src} alt={visual.featured.alt} fill className="object-contain" />
        </div>
        <div className="mt-4 flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 -mx-4 pb-2 scrollbar-none">
          {visual.secondary.map((m) => (
            <div
              key={m.src}
              className="relative shrink-0 w-[140px] h-[280px] rounded-[1.5rem] bg-[#111] overflow-hidden snap-center"
              style={{ boxShadow: `0 16px 40px -14px ${accentHex}66` }}
            >
              <Image src={m.src} alt={m.alt} fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
