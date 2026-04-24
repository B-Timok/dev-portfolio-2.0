export type ProjectVisual =
  | { kind: "image"; src: string; alt: string }
  | {
      kind: "mockups"
      featured: { src: string; alt: string }
      secondary: { src: string; alt: string }[]
    }

export type ProjectLink = {
  label: string
  href: string
  icon: "external" | "github" | "app-store"
}

export type Project = {
  slug: string
  title: string
  meta: string
  pitch: string
  writeup: string
  stack: string[]
  links: ProjectLink[]
  visual: ProjectVisual
  accentIndex: number
  /** Optional SVG path rendered as a brand mark next to the title.
   *  The SVG is applied as a mask over the slide's accent color. */
  brandMark?: string
  /** Optional override color for the brand mark (hex). Defaults to the
   *  slide's accentHex if omitted. */
  brandMarkColor?: string
}

export const projects: Project[] = [
  {
    slug: "athlos-app",
    title: "Athlos",
    meta: "2025 · Solo dev · Live on the App Store",
    pitch: "A full-stack mobile app for personalized training, built end-to-end.",
    writeup:
      "Athlos delivers workouts that evolve with each user, a social feed for sharing progress, advanced analytics, and daily and weekly challenges — all synced securely across devices. I built and shipped the whole stack myself: React Native UI with native modules in Swift and Objective-C, a Supabase backend (Auth, Postgres, Storage, RLS, Edge Functions), and subscriptions via RevenueCat and Apple IAP. Launched through TestFlight (30+ beta testers) and now live on the App Store.",
    stack: [
      "React Native",
      "TypeScript",
      "Swift/Obj-C",
      "Expo",
      "Supabase",
      "RevenueCat",
      "Apple IAP",
      "OpenAI",
      "ExerciseDB",
    ],
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/athlos-fitness/id6744072500",
        icon: "app-store",
      },
      {
        label: "Website",
        href: "https://athlos-plum.vercel.app/",
        icon: "external",
      },
    ],
    visual: {
      kind: "mockups",
      featured: { src: "/dashboard_mockup.png", alt: "Athlos dashboard screen" },
      secondary: [
        { src: "/workout_mockup.png", alt: "Athlos workout screen" },
        { src: "/stats_mockup.png", alt: "Athlos stats screen" },
      ],
    },
    accentIndex: 3, // green (#86efac) — matches Athlos brand
    brandMark: "/athlos-avatar-v2.svg",
    brandMarkColor: "#3ecf8e",
  },
  {
    slug: "athlos-site",
    title: "Athlos Fitness — Website",
    meta: "2025 · Solo dev · Live",
    pitch: "The product site that sells the Athlos app.",
    writeup:
      "A marketing site for Athlos covering feature breakdowns, pricing, FAQ, and App Store links, paired with interactive app mockup previews. Built with Next.js on Vercel, designed to be fast, responsive, and match the app's visual language.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    links: [
      {
        label: "Visit site",
        href: "https://athlos-plum.vercel.app/",
        icon: "external",
      },
    ],
    visual: { kind: "image", src: "/athlos-landing.png", alt: "Athlos Fitness landing page" },
    accentIndex: 3,
    brandMark: "/athlos-avatar-v2.svg",
    brandMarkColor: "#3ecf8e",
  },
  {
    slug: "kls",
    title: "KLS Leadership",
    meta: "2024 · Client · Live",
    pitch: "Marketing site for a restaurant operations and hospitality consulting firm.",
    writeup:
      "Service offerings, about, and a Resend-powered contact flow, shipped on a custom domain. Built with Vite and TypeScript, tuned for SEO, with clean metadata and a consistent visual system across every page.",
    stack: ["Vite", "TypeScript", "Resend", "Vercel"],
    links: [
      {
        label: "Visit site",
        href: "https://www.klsleadership.com/",
        icon: "external",
      },
    ],
    visual: { kind: "image", src: "/kls-home.png", alt: "KLS Leadership homepage" },
    accentIndex: 0,
  },
  {
    slug: "sales-medic",
    title: "The Sales Medic",
    meta: "2024 · Client · Live",
    pitch: "Marketing site for a sales training and consulting business.",
    writeup:
      "Hero, about, services, and contact pages with animated transitions and a validated contact form (React Hook Form + Zod). Scroll-triggered animations with Framer Motion keep the experience responsive without feeling flashy.",
    stack: ["React", "TypeScript", "Vite", "Tailwind"],
    links: [
      {
        label: "Visit site",
        href: "https://www.slsmedic.com/",
        icon: "external",
      },
    ],
    visual: { kind: "image", src: "/slsmedic.png", alt: "The Sales Medic homepage" },
    accentIndex: 1,
  },
  {
    slug: "nba-tracker",
    title: "NBA Tracker",
    meta: "2024 · Personal · Open source",
    pitch: "A full-stack NBA companion with scores, stats, standings, and playoff brackets.",
    writeup:
      "Three interfaces from one backend: a web app (SvelteKit), a terminal UI, and a CLI. Features live scores, box scores, play-by-play, standings, player profiles, team and player stats, and a playoff bracket. FastAPI handles the data layer, Python powers the terminal experiences.",
    stack: ["SvelteKit", "FastAPI", "Python", "Textual"],
    links: [
      {
        label: "Source",
        href: "https://github.com/B-Timok/nba-tracker",
        icon: "github",
      },
    ],
    visual: { kind: "image", src: "/nba-tracker.png", alt: "NBA Tracker web app" },
    accentIndex: 4,
  },
  {
    slug: "roadwatch",
    title: "Roadwatch",
    meta: "2024 · UNLV team · Award winner",
    pitch: "Road safety app shipped as a team MVP at UNLV.",
    writeup:
      "A community-driven road safety app with a map, user reports, and social features. Built with Next.js and MongoDB, containerized with Docker for consistent team development. Recognized at UNLV's senior design showcase.",
    stack: ["Next.js", "MongoDB", "Docker"],
    links: [
      {
        label: "Source",
        href: "https://github.com/UNLV-CS472-672/2024-S-GROUP1-Roadwatch",
        icon: "github",
      },
    ],
    visual: { kind: "image", src: "/roadwatch.png", alt: "Roadwatch app" },
    accentIndex: 2,
  },
]
