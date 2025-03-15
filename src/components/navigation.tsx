"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, FileText } from "lucide-react"
import ThemeToggle from "./theme-toggle"
import { SiGithub, SiLinkedin } from "react-icons/si"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border-dark dark:border-border"
          : "bg-background/50 backdrop-blur-sm dark:bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex flex-col items-start">
            <span className="gradient-text text-lg font-bold leading-none">Brandon Timok</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {["projects", "about", "experience", "contact"].map((item) => (
                <Link
                  key={item}
                  href={`#${item}`}
                  className="text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  <span className="capitalize">{item}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6BA5D7] group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <Link
                href="/BTimokResume24.pdf"
                target="_blank"
                aria-label="Resume"
                className="p-2 rounded-lg bg-card hover:bg-muted border border-border-dark dark:border-border hover:border-[#6BA5D7]/50 dark:hover:border-[#6BA5D7]/20 transition-all shadow-sm hover:shadow-md"
              >
                <FileText className="w-4 h-4 text-[#6BA5D7]" />
              </Link>
              <Link
                href="https://github.com/B-Timok"
                target="_blank"
                aria-label="GitHub"
                className="p-2 rounded-lg bg-card hover:bg-muted border border-border-dark dark:border-border hover:border-[#6BA5D7]/50 dark:hover:border-[#6BA5D7]/20 transition-all shadow-sm hover:shadow-md"
              >
                <SiGithub className="w-4 h-4 text-[#6BA5D7]" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/brandon-timok-589765253/"
                target="_blank"
                aria-label="LinkedIn"
                className="p-2 rounded-lg bg-card hover:bg-muted border border-border-dark dark:border-border hover:border-[#6BA5D7]/50 dark:hover:border-[#6BA5D7]/20 transition-all shadow-sm hover:shadow-md"
              >
                <SiLinkedin className="w-4 h-4 text-[#6BA5D7]" />
              </Link>
              <div className="w-px h-6 bg-border-dark dark:bg-border mx-1" />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-card hover:bg-muted border border-border-dark dark:border-border hover:border-[#6BA5D7]/50 dark:hover:border-[#6BA5D7]/20 transition-all shadow-sm hover:shadow-md"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#6BA5D7]" /> : <Menu className="w-5 h-5 text-[#6BA5D7]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border-dark dark:border-border animate-slide-in-bottom shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {["projects", "about", "experience", "contact"].map((item) => (
                <Link
                  key={item}
                  href={`#${item}`}
                  className="text-lg font-medium capitalize hover:text-[#6BA5D7] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <div className="h-px bg-border-dark dark:bg-border my-2" />
              <div className="flex items-center space-x-4 py-2">
                <Link
                  href="/resume.pdf"
                  target="_blank"
                  aria-label="Resume"
                  className="p-2 rounded-lg bg-card hover:bg-muted border border-border-dark dark:border-border hover:border-[#6BA5D7]/50 dark:hover:border-[#6BA5D7]/20 transition-all shadow-sm hover:shadow-md"
                >
                  <FileText className="w-4 h-4 text-[#6BA5D7]" />
                </Link>
                <Link
                  href="https://github.com"
                  target="_blank"
                  aria-label="GitHub"
                  className="p-2 rounded-lg bg-card hover:bg-muted border border-border-dark dark:border-border hover:border-[#6BA5D7]/50 dark:hover:border-[#6BA5D7]/20 transition-all shadow-sm hover:shadow-md"
                >
                  <SiGithub className="w-4 h-4 text-[#6BA5D7]" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  aria-label="LinkedIn"
                  className="p-2 rounded-lg bg-card hover:bg-muted border border-border-dark dark:border-border hover:border-[#6BA5D7]/50 dark:hover:border-[#6BA5D7]/20 transition-all shadow-sm hover:shadow-md"
                >
                  <SiLinkedin className="w-4 h-4 text-[#6BA5D7]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

