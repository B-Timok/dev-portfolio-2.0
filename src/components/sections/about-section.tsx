"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Download, Code, GraduationCap, User, Gamepad, Guitar, Utensils, Keyboard, Timer } from "lucide-react"
import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiSupabase,
  SiPostgresql,
  SiTailwindcss,
  SiDocker,
  SiDotnet,
} from "react-icons/si"
import { GiBasketballBall, GiTennisRacket, GiPokerHand } from "react-icons/gi"
import { FaRunning, FaDumbbell } from "react-icons/fa"

export default function AboutSection() {
  const skills = [
    { name: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
    { name: "Backend", items: ["Node.js", "C#", "RESTful APIs", "GraphQL"] },
    { name: "Database", items: ["PostgreSQL", "Supabase", "MongoDB"] },
    { name: "DevOps", items: ["Docker", "Git", "CI/CD", "AWS"] },
  ]

  const technologies = [
    { name: "Next.js", icon: SiNextdotjs },
    { name: "TypeScript", icon: SiTypescript },
    { name: "React", icon: SiReact },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "C#", icon: SiDotnet },
    { name: "Supabase", icon: SiSupabase },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "Docker", icon: SiDocker },
  ]

  const interests = [
    { name: "Basketball", icon: GiBasketballBall },
    { name: "Gaming", icon: Gamepad },
    { name: "Guitar", icon: Guitar },
    { name: "Cooking", icon: Utensils },
    { name: "Mechanical Keyboards", icon: Keyboard },
    { name: "Speedcubing", icon: Timer },
    { name: "Poker", icon: GiPokerHand },
    { name: "Tennis", icon: GiTennisRacket },
    { name: "Running", icon: FaRunning },
    { name: "Working Out", icon: FaDumbbell },
  ]

  return (
    <section id="about" className="relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-small-white/[0.02] -z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        <div className="absolute top-1/3 left-1/4 -z-10 h-[500px] w-[500px] bg-[#6BA5D7] blur-[160px] opacity-[0.03]" />
        <div className="absolute bottom-1/3 right-1/4 -z-10 h-[500px] w-[500px] bg-[#6BA5D7] blur-[160px] opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-full bg-[#6BA5D7]/10 flex items-center justify-center">
              <User className="w-5 h-5 text-[#6BA5D7]" />
            </div>
            <h2 className="text-3xl font-bold text-[#6BA5D7]">About Me</h2>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
            {/* Left Column - Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="prose prose-lg dark:prose-invert space-y-6">
                <div className="space-y-2">
                  <p className="text-lg leading-relaxed">
                    <span className="text-[#6BA5D7]">Full-Stack Developer</span> based in{" "}
                    <span className="font-medium">Henderson, NV</span>, passionate about crafting intuitive,
                    user-focused web applications. Specializing in{" "}
                    <span className="text-[#6BA5D7]">modern frameworks</span> and{" "}
                    <span className="text-[#6BA5D7]">robust backend technologies</span>, I bridge the gap between
                    functionality and thoughtful design.
                  </p>
                </div>

                <div className="relative pl-4 border-l-2 border-[#6BA5D7]/20">
                  <p className="leading-relaxed">
                    Recent <span className="font-medium">Computer Science graduate</span> from{" "}
                    <span className="font-medium">UNLV</span> with a track record of success, including an{" "}
                    <span className="text-[#6BA5D7]">award-winning road safety platform</span>. Currently working with{" "}
                    <span className="font-medium">Lessi AI</span> to revolutionize lesson planning through{" "}
                    <span className="text-[#6BA5D7]">AI technology</span>, while developing a{" "}
                    <span className="text-[#6BA5D7]">fitness app</span> that personalizes workout experiences.
                  </p>
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Technologies I Work With</h3>
                <div className="flex flex-wrap gap-3">
                  {technologies.map((tech, index) => {
                    const Icon = tech.icon
                    return (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="flex items-center gap-2 px-4 py-2 bg-card/30 text-[#6BA5D7] rounded-lg border border-[#6BA5D7]/10 hover:border-[#6BA5D7]/30 hover:bg-[#6BA5D7]/5 transition-all"
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{tech.name}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Personal Interests */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-3"
              >
                <h3 className="text-base font-medium text-muted-foreground">When I&apos;m Not Coding</h3>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => {
                    const Icon = interest.icon
                    return (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.05 * index }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-card/30 border border-[#6BA5D7]/10 hover:bg-[#6BA5D7]/5 hover:border-[#6BA5D7]/30 transition-all"
                      >
                        <Icon className="w-4 h-4 text-[#6BA5D7]" />
                        <span>{interest.name}</span>
                      </motion.span>
                    )
                  })}
                </div>
              </motion.div>

              {/* Resume Download */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link
                  href="/BTimokResume24.pdf"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#6BA5D7]/10 text-[#6BA5D7] hover:bg-[#6BA5D7]/20 transition-colors border border-[#6BA5D7]/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column - Education & Skills */}
            <div className="space-y-6">
              {/* Education */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-6 rounded-xl bg-card/30 border border-[#6BA5D7]/20 hover:border-[#6BA5D7]/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-6">
                  <GraduationCap className="w-5 h-5 text-[#6BA5D7]" />
                  <h3 className="text-lg font-semibold">Education</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">B.S. Computer Science</h4>
                    <p className="text-sm text-muted-foreground">University of Nevada, Las Vegas (UNLV), Dec 2024</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Associates of Arts</h4>
                    <p className="text-sm text-muted-foreground">College of Southern Nevada (CSN), May 2021</p>
                  </div>
                </div>
              </motion.div>

              {/* Skills Categories */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="p-6 rounded-xl bg-card/30 border border-[#6BA5D7]/20 hover:border-[#6BA5D7]/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-6">
                  <Code className="w-5 h-5 text-[#6BA5D7]" />
                  <h3 className="text-lg font-semibold">Skill Categories</h3>
                </div>
                <div className="space-y-4">
                  {skills.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="text-sm font-medium text-[#6BA5D7]">{category.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((item, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 text-xs rounded-full bg-[#6BA5D7]/5 border border-[#6BA5D7]/10"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

