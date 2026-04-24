import { projects } from "@/data/projects"
import { ProjectsCarousel } from "@/components/projects/projects-carousel"

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24">
      <ProjectsCarousel projects={projects} />
    </section>
  )
}
