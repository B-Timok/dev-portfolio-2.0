"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Layers } from "lucide-react"
import { motion } from "framer-motion"
import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiMongodb,
  SiDocker,
  SiMysql,
  SiGithub,
  SiPython,
} from "react-icons/si"
import { TbApi } from "react-icons/tb"

export default function ProjectsSection() {
  const projects = [
    {
      title: "Athlos Workout App",
      description:
        "A full-stack web and mobile app designed to personalize and simplify workout routines, leveraging Supabase and advanced API development for optimal user experiences.",
      technologies: [
        { name: "Next.js", icon: SiNextdotjs },
        { name: "TypeScript", icon: SiTypescript },
        { name: "Supabase", icon: SiSupabase },
        { name: "Tailwind CSS", icon: SiTailwindcss },
        { name: "APIs", icon: TbApi },
      ],
      github: "https://github.com/B-Timok/Athlos",
      demo: "https://athlos-plum.vercel.app/",
      image: "/workoutai.png",
      featured: true,
    },
    {
      title: "Roadwatch Safety App",
      description:
        "Award-winning road safety app developed with a team of peers at UNLV. Provides real-time tracking of road conditions and incident reporting to improve community safety.",
      technologies: [
        { name: "React", icon: SiReact },
        { name: "Next.js", icon: SiNextdotjs },
        { name: "MongoDB", icon: SiMongodb },
        { name: "Docker", icon: SiDocker },
      ],
      github: "https://github.com/UNLV-CS472-672/2024-S-GROUP1-Roadwatch",
      demo: "#",
      image: "/roadwatch.png",
    },
    {
      title: "Speedcube Collection",
      description:
        "Database-driven web app to manage and analyze a collection of Rubik's cubes, tracking personal records, solving trends, and performance metrics.",
      technologies: [
        { name: "MySQL", icon: SiMysql },
        { name: "TypeScript", icon: SiTypescript },
        { name: "Next.js", icon: SiNextdotjs },
      ],
      github: "https://github.com/B-Timok/SideProjects/tree/main/sqlProjects/speedCubes",
      image: "/speedcubedb.png",
    },
    {
      title: "NBA Scoreboard Analysis",
      description:
        "Real-time NBA game score and statistic analysis using the NBA API. Developed with Python, using libraries such as requests, pandas, and tkinter.",
      technologies: [
        { name: "Python", icon: SiPython },
        { name: "APIs", icon: TbApi },
      ],
      github: "https://github.com/B-Timok/SideProjects/tree/main/pyProjects/sportsScores",
      image: "/nbascores.png",
    },
  ]

  return (
    <section id="projects" className="relative bg-background dark:bg-background/30">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-small-white/[0.02] -z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#6BA5D7]/10 flex items-center justify-center">
                <Layers className="w-5 h-5 text-[#6BA5D7]" />
              </div>
              <h2 className="text-3xl font-bold text-[#6BA5D7]">Featured Projects</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Some of my recent work, showcasing my skills in full-stack development, UI/UX design, database management,
              and collaborative teamwork.
            </p>
          </motion.div>

          {/* Featured Project */}
          {projects
            .filter((p) => p.featured)
            .map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-card/30 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-[#6BA5D7]/20"
              >
                <div className="order-2 lg:order-1 space-y-6">
                  <div>
                    <div className="inline-block px-3 py-1 mb-2 text-sm font-medium rounded-full bg-[#6BA5D7]/10 text-[#6BA5D7] border border-[#6BA5D7]/20">
                      Featured Project
                    </div>
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                  </div>

                  <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-[#6BA5D7]/10">
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, i) => {
                      const Icon = tech.icon
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#6BA5D7]/5 text-[#6BA5D7] rounded-full border border-[#6BA5D7]/10"
                        >
                          <Icon className="w-4 h-4" />
                          <span>{tech.name}</span>
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex gap-4">
                    <Link
                      href="https://github.com/B-Timok/Athlos"
                      target="_blank"
                      className="inline-flex items-center gap-2 text-muted-foreground hover:text-[#6BA5D7] transition-colors"
                    >
                      <SiGithub className="w-4 h-4" />
                      <span>Source Code (Private)</span>
                    </Link>
                    <Link
                      href="https://athlos-plum.vercel.app/"
                      target="_blank"
                      className="inline-flex items-center gap-2 text-muted-foreground hover:text-[#6BA5D7] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live App</span>
                    </Link>
                  </div>
                </div>

                <div className="order-1 lg:order-2 relative aspect-video overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-[#6BA5D7] mix-blend-multiply opacity-10"></div>
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={640}
                    height={360}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </motion.div>
            ))}

          {/* Additional Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((p) => !p.featured)
              .map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  className="group flex flex-col bg-card/30 backdrop-blur-sm rounded-xl overflow-hidden border border-[#6BA5D7]/20 hover:border-[#6BA5D7]/30 transition-all hover:-translate-y-1"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute inset-0 bg-[#6BA5D7] mix-blend-multiply opacity-10"></div>
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={640}
                      height={360}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex-1 p-5 space-y-4">
                    <h3 className="text-lg font-bold line-clamp-1">{project.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => {
                        const Icon = tech.icon
                        return (
                          <div
                            key={i}
                            className="flex items-center gap-1.5 px-2 py-1 text-xs bg-[#6BA5D7]/5 text-[#6BA5D7] rounded-full border border-[#6BA5D7]/10"
                          >
                            <Icon className="w-3 h-3" />
                            <span>{tech.name}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="p-5 pt-0 mt-auto flex justify-between">
                    <Link
                      href={project.github}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-[#6BA5D7] transition-colors"
                    >
                      <SiGithub className="w-4 h-4" />
                      <span>Code</span>
                    </Link>
                    <Link
                      href={project.demo || "#"}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-[#6BA5D7] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Demo</span>
                    </Link>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* View More Projects Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center pt-8"
          >
            <Link
              href="https://github.com/B-Timok"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#6BA5D7]/10 hover:bg-[#6BA5D7]/20 border border-[#6BA5D7]/20 transition-all"
            >
              <SiGithub className="w-4 h-4" />
              <span>View More on GitHub</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

