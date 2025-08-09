"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { borderClassByIndex } from "@/lib/playful"

export default function ContactSection() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSending(false)
    setSent(true)
    setTimeout(() => setSent(false), 2500)
  }

  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-baseline gap-3 mb-8">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <span className={"h-0.5 w-10 " + borderClassByIndex(0)}></span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] gap-6">
          <form onSubmit={handleSubmit} className={"order-1 lg:order-1 space-y-4 rounded-lg p-4 border " + borderClassByIndex(3)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" required placeholder="Your name" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required placeholder="you@example.com" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" required placeholder="Project inquiry" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={5} required placeholder="Tell me a bit about your project" />
            </div>
            <Button type="submit" disabled={sending}>
              {sending ? "Sending…" : sent ? "Sent!" : "Send message"}
            </Button>
          </form>

          <div className="order-2 lg:order-2 rounded-lg p-5">
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="text-sm font-medium">Availability</h3>
                <p className="text-muted-foreground mt-1">Open to freelance and full‑time roles.</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-muted border border-border">Remote‑friendly</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted border border-border">US hours</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium">Preferred stack</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['Next.js','TypeScript','Tailwind','C# / Node','Postgres'].map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-muted border border-border">{tag}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium">Contact</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href="mailto:timok@unlv.nevada.edu">Email</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link href="https://www.linkedin.com/in/brandon-timok-589765253/" target="_blank">LinkedIn</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/BTimokResume24.pdf" target="_blank">Resume</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

