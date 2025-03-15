"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mail, ChevronDown, FileText } from "lucide-react"
import { motion } from "framer-motion"
import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiDotnet,
  SiTailwindcss,
  SiSupabase,
  SiPostgresql,
  SiDocker,
  SiGithub,
  SiLinkedin,
} from "react-icons/si"

export default function HeroSection() {
  const technologies = [
    { name: "Next.js", icon: SiNextdotjs },
    { name: "TypeScript", icon: SiTypescript },
    { name: "React", icon: SiReact },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "C#", icon: SiDotnet },
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "Supabase", icon: SiSupabase },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "Docker", icon: SiDocker },
  ]

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height

      container.style.setProperty("--mouse-x", `${x}`)
      container.style.setProperty("--mouse-y", `${y}`)
    }

    container.addEventListener("mousemove", handleMouseMove)
    return () => container.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-small-white/[0.02] -z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        <div className="absolute left-1/3 top-1/4 -z-10 h-[500px] w-[500px] bg-[#6BA5D7] blur-[128px] opacity-10" />
        <div className="absolute right-1/4 bottom-1/4 -z-10 h-[500px] w-[500px] bg-[#6BA5D7] blur-[128px] opacity-10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden" ref={containerRef}>
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6BA5D7]/10 border border-[#6BA5D7]/20 mb-6 group hover:bg-[#6BA5D7]/20 transition-all duration-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6BA5D7] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6BA5D7]"></span>
              </span>
              <span className="text-sm font-medium text-[#5ba3e1]">Available for new opportunities</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              Hi, I&apos;m <span className="text-[#6BA5D7]">Brandon</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl font-medium text-muted-foreground mb-6"
            >
              Full-Stack Developer | Crafting modern apps with Next.js, TypeScript, and APIs
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-muted-foreground mb-8 max-w-lg leading-relaxed"
            >
              I&apos;m a full-stack developer specializing in building elegant, scalable web and mobile applications. With
              deep expertise in Next.js, TypeScript, C#, and robust backend API development, I deliver user-focused
              solutions emphasizing clean code, thoughtful design, and data-driven development.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#6BA5D7] text-white hover:bg-[#6BA5D7]/90 transition-all"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#6BA5D7]/10 hover:bg-[#6BA5D7]/20 border border-[#6BA5D7]/20 transition-all"
              >
                Contact Me
                <Mail className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex items-center gap-4 mt-8"
            >
              <Link
                href="https://github.com/B-Timok"
                target="_blank"
                className="p-2 rounded-full bg-[#6BA5D7]/10 hover:bg-[#6BA5D7]/20 border border-[#6BA5D7]/20 transition-all"
                aria-label="GitHub"
              >
                <SiGithub className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/brandon-timok-589765253/"
                target="_blank"
                className="p-2 rounded-full bg-[#6BA5D7]/10 hover:bg-[#6BA5D7]/20 border border-[#6BA5D7]/20 transition-all"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="w-5 h-5" />
              </Link>
              <Link
                href="/BTimokResume24.pdf"
                target="_blank"
                className="p-2 rounded-full bg-[#6BA5D7]/10 hover:bg-[#6BA5D7]/20 border border-[#6BA5D7]/20 transition-all"
                aria-label="Resume"
              >
                <FileText className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-[#6BA5D7] rounded-full blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-[#6BA5D7]/20">
                <Image
                  src="/avatar.png"
                  alt="Brandon Timok"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 md:mt-24"
        >
          <h3 className="text-center text-muted-foreground text-sm uppercase tracking-wider mb-6">
            Technologies I work with
          </h3>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {technologies.map((tech, index) => {
              const Icon = tech.icon
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  className="group relative px-4 py-2"
                >
                  <div className="relative z-10 bg-card backdrop-blur-sm rounded-lg border border-border-dark dark:border-border hover:border-[#6BA5D7]/50 dark:hover:border-[#6BA5D7]/20 px-4 py-2 transition-all duration-300 hover:translate-y-[-2px] shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-[#6BA5D7]" />
                      <span className="text-foreground">{tech.name}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <Link href="#projects" aria-label="Scroll down" className="animate-bounce">
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

