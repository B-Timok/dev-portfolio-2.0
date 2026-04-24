export type ExperienceTier = "primary" | "secondary" | "past"

export type Experience = {
  company: string
  position: string
  period: string
  summary: string
  highlights: string[]
  tech: string[]
  tier: ExperienceTier
  stat?: { value: string; label: string }
}

export const experiences: Experience[] = [
  {
    company: "ANA Corp",
    position: "Software Engineer",
    period: "Dec 2025 – Present",
    tier: "primary",
    stat: { value: "80+", label: "Pull requests merged in first 9 weeks" },
    summary:
      "Leading frontend development and contributing to backend features for an internal telematics platform that monitors and manages industrial generator fleets.",
    highlights: [
      "Shipped 80+ pull requests across frontend and backend in first 9 weeks",
      "Own all frontend changes for the telematics web application",
      "Redesigned core UI components with fully responsive layouts",
      "Contribute to backend API development, database queries, and AWS infrastructure",
    ],
    tech: ["React", "TypeScript", "Tailwind", "Node.js", "PostgreSQL", "AWS", "Docker", "Terraform", "Vite"],
  },
  {
    company: "Athlos",
    position: "Mobile App Developer",
    period: "Mar 2025 – Present",
    tier: "primary",
    stat: { value: "End-to-end", label: "Solo dev, shipped to the App Store" },
    summary:
      "Solo developer building a fitness app end-to-end: design, native modules, backend, payments, and release.",
    highlights: [
      "Solo dev building a React Native app end-to-end: UI, native modules, backend, payments",
      "Architected the Supabase stack (Postgres, RLS, Edge Functions) and shipped through TestFlight (30+ beta testers) to the App Store",
      "Handle every layer myself: design, code, QA, release, subscriptions, analytics",
    ],
    tech: ["React Native", "TypeScript", "Swift/Obj-C", "Expo", "Supabase", "RevenueCat"],
  },
  {
    company: "Freelance",
    position: "Web Developer",
    period: "Dec 2024 – Present",
    tier: "secondary",
    summary:
      "Delivering websites for local businesses with a focus on speed and maintainability.",
    highlights: [
      "Information architecture, copy support, and brand alignment",
      "Accessible components and SEO‑friendly markup",
      "Simple content workflows for non‑technical editors",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    company: "Lessi AI",
    position: "Software Developer",
    period: "Jul 2024 – March 2025",
    tier: "past",
    summary:
      "Building AI‑assisted tools for educators; shipping fast in a lean environment.",
    highlights: [
      "Designed and implemented modular REST APIs for lesson plans and collaboration",
      "Strengthened data modeling in Postgres; added indexes and RLS policies",
      "Containerized services and improved local DX using Docker Compose",
    ],
    tech: ["C#", "PostgreSQL", "Docker", "GitHub", "REST"],
  },
  {
    company: "UNLV OED",
    position: "Web Development Intern",
    period: "Nov 2023 – Mar 2024",
    tier: "past",
    summary: "Modernized client websites and improved SEO and accessibility.",
    highlights: [
      "Shipped UX improvements that reduced bounce rate on key pages",
      "Audited and improved color contrast, headings, and semantics",
      "Set up meetings with clients to discuss their needs and goals",
    ],
    tech: ["Next.js", "TypeScript", "SEO", "Accessibility"],
  },
]
