import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const SITE_URL = "https://dev-portfolio-2-0.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Brandon Timok | Full-Stack Developer",
  description:
    "Full-Stack Developer specializing in React and Node.js. View my portfolio, projects, and experience.",
  keywords: ["developer", "portfolio", "react", "node.js", "full-stack", "web development"],
  authors: [{ name: "Brandon Timok" }],
  creator: "Brandon Timok",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Brandon Timok | Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in React and Node.js. View my portfolio, projects, and experience.",
    siteName: "Brandon Timok",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "Brandon Timok — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brandon Timok | Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in React and Node.js. View my portfolio, projects, and experience.",
    images: ["/og_image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-background focus:text-foreground focus:px-3 focus:py-2 focus:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--avatar-accent)]"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
