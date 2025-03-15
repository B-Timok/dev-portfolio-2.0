"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar, ArrowRight } from "lucide-react"

export default function ExperienceSection() {
  const experiences = [
    {
      company: "Lessi AI",
      position: "Software Developer",
      period: "July 2024 – Present",
      description:
        "Building innovative AI-driven software to simplify lesson planning for K-12 educators. Working closely with the CTO to deliver impactful new features and enhance existing tools.",
      achievements: [
        "Developed APIs and backend systems using C#, PostgreSQL, and Docker",
        "Implemented collaborative workflows with GitHub, improving team efficiency",
        "Contributed directly to product direction and feature development",
      ],
      technologies: ["C#", "PostgreSQL", "Docker", "GitHub", "APIs"],
    },
    {
      company: "UNLV Office of Economic Development",
      position: "Web Development Intern",
      period: "Nov 2023 – Mar 2024",
      description:
        "Collaborated directly with local small businesses to enhance their online presence and drive engagement through improved website design and SEO practices.",
      achievements: [
        "Delivered client-facing solutions using HTML, CSS, and JavaScript",
        "Optimized websites for better SEO performance and user experience",
        "Worked closely with businesses, gaining valuable client interaction experience",
      ],
      technologies: ["HTML", "CSS", "JavaScript", "SEO"],
    },
    {
      company: "E-Commerce Business (Shopify)",
      position: "Owner & Website Developer",
      period: "Feb 2017 – Jan 2021",
      description:
        "Built and scaled a successful e-commerce operation, managing a large team of contractors, customer relations, and digital marketing initiatives.",
      achievements: [
        "Scaled business from a solo operation to managing 100+ contractors",
        "Implemented and customized Shopify website and integrated complex payment systems",
        "Executed data-driven marketing strategies that significantly boosted revenue",
        "Managed payroll, recruitment, and daily operations, developing strong leadership skills",
      ],
      technologies: ["Shopify", "E-commerce", "Marketing", "Project Management"],
    },
  ]

  return (
    <section id="experience" className="relative bg-muted/30 dark:bg-muted/10">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-small-white/[0.02] -z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-4">
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
              <Briefcase className="w-5 h-5 text-[#6BA5D7]" />
            </div>
            <h2 className="text-3xl font-bold text-[#6BA5D7]">Work Experience</h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative space-y-12">
            {/* Timeline Line */}
            <div className="absolute left-8 top-3 bottom-3 w-px bg-gradient-to-b from-[#6BA5D7] via-[#6BA5D7]/50 to-transparent md:left-1/2 md:-translate-x-px" />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative grid grid-cols-1 md:grid-cols-2 items-start gap-4"
              >
                {/* Timeline Node */}
                <div className="absolute left-8 top-3 w-3 h-3 rounded-full bg-[#6BA5D7] shadow-lg shadow-[#6BA5D7]/20 md:left-1/2 md:-translate-x-[6px]">
                  <div className="absolute inset-0 rounded-full bg-[#6BA5D7] animate-ping opacity-20" />
                </div>

                {/* Date Column */}
                <div
                  className={`flex items-center gap-4 ${
                    index % 2 === 0 ? "md:text-right md:justify-end md:pr-8" : "md:order-2 md:pl-8"
                  }`}
                >
                  <Calendar className={`w-4 h-4 text-[#6BA5D7] ${index % 2 === 0 ? "md:order-2" : ""}`} />
                  <span className="text-sm font-medium text-[#6BA5D7]">{exp.period}</span>
                </div>

                {/* Content Card */}
                <div className={`${index % 2 === 0 ? "md:order-2 md:pl-8" : "md:pr-8"}`}>
                  <div className="bg-card/30 backdrop-blur-sm rounded-xl p-5 border border-[#6BA5D7]/20 hover:border-[#6BA5D7]/30 transition-all hover:shadow-lg hover:shadow-[#6BA5D7]/5">
                    {/* Header */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold">{exp.position}</h3>
                      <p className="text-[#6BA5D7]">{exp.company}</p>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4">{exp.description}</p>

                    {/* Achievements */}
                    <div className="space-y-3 mb-4">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-[#6BA5D7]" />
                        Key Role
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.1 * i }}
                            className="flex items-start gap-2 text-sm group"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#6BA5D7]/50 group-hover:bg-[#6BA5D7] transition-colors" />
                            <span className="leading-relaxed">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.2, delay: 0.05 * i }}
                          className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-[#6BA5D7]/5 text-[#6BA5D7] border border-[#6BA5D7]/10 hover:border-[#6BA5D7]/30 transition-colors"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

