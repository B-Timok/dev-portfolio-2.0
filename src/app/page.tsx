"use client"

import Head from "next/head"

import { useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import HeroSection from "@/components/sections/hero-section"
import ProjectsSection from "@/components/sections/project-section"
import AboutSection from "@/components/sections/about-section"
import ExperienceSection from "@/components/sections/experience-section"
import ContactSection from "@/components/sections/contact-section"

export default function Home() {
  // Check system preference for dark mode on initial load
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const storedTheme = localStorage.getItem("theme")

    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  return (
    <>
      <Head>
        <meta property="og:image" content="https://dev-portfolio-2-0.vercel.app/og_image.png"></meta>
      </Head>
      
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main>
          <HeroSection />
          <ProjectsSection />
          <ExperienceSection />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  )
}
