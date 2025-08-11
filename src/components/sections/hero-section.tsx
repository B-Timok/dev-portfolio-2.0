"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { borderClassByIndex } from "@/lib/playful"

export default function HeroSection() {
  return (
    <section className="pt-28 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            <div className={"relative shrink-0 w-28 h-28 md:w-36 md:h-36 lg:w-48 lg:h-48 overflow-hidden rounded-full border " + borderClassByIndex(0)}>
              <Image src="/avatar.png" alt="Avatar" fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3">Brandon Timok</h1>
              <p className="text-sm text-muted-foreground mb-6">Full‑stack developer • Henderson, NV</p>
              <p className="text-muted-foreground mb-4">
                I build pragmatic, minimal interfaces and reliable backends. Toolkit: Next.js, TypeScript, Tailwind,
                React Native/Expo, Supabase/Postgres, Docker, and C#/.NET or Node APIs — shipping with Vercel, Resend,
                and integrations like RevenueCat + Apple IAP.
              </p>
              <p className="text-muted-foreground mb-6">
                Currently developing Athlos, a mobile app for personalized workouts, and shipping AI‑assisted tools for
                educators.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <Link href="#projects">All projects</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="#contact">Contact</Link>
                </Button>
                <Button asChild>
                  <Link href="/BTimokResume24.pdf" target="_blank">Resume</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

