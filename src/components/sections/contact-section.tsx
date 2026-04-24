"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { accentHexByIndex, borderClassByIndex } from "@/lib/playful"
import { TOOL_BRAND, brandColor } from "@/lib/brand-colors"
import { FadeUp } from "@/components/motion/fade-up"

const FIELD_ORDER = ["name", "email", "subject", "message"] as const
type FieldKey = (typeof FIELD_ORDER)[number]
const fieldAccent = (key: FieldKey): string =>
  accentHexByIndex(FIELD_ORDER.indexOf(key))

export default function ContactSection() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focused, setFocused] = useState<FieldKey | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    setError(null)

    const form = e.currentTarget
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to send message")
      }

      setSent(true)
      form.reset()
      setTimeout(() => setSent(false), 2500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message")
    } finally {
      setSending(false)
    }
  }

  const fieldStyle = (key: FieldKey): React.CSSProperties => {
    const isFocused = focused === key
    const hex = fieldAccent(key)
    return {
      borderColor: isFocused ? hex : undefined,
      boxShadow: isFocused ? `0 0 0 3px ${hex}1a` : undefined,
    }
  }

  const labelStyle = (key: FieldKey): React.CSSProperties => {
    const isFocused = focused === key
    return {
      color: isFocused ? fieldAccent(key) : undefined,
    }
  }

  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="inline-flex items-baseline gap-3 mb-8">
            <h2 className="text-2xl font-semibold">Contact</h2>
            <span className={"h-0.5 w-10 " + borderClassByIndex(0)} />
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] gap-6">
          <FadeUp className="order-1 lg:order-1">
            <form
              onSubmit={handleSubmit}
              className={"space-y-4 rounded-lg p-4 border " + borderClassByIndex(3)}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(["name", "email"] as FieldKey[]).map((key) => (
                  <div
                    key={key}
                    className="relative rounded-md border border-border bg-card px-3 pt-5 pb-2 transition-[border-color,box-shadow] duration-200"
                    style={fieldStyle(key)}
                  >
                    <label
                      htmlFor={key}
                      className="absolute left-3 top-1 text-[9px] uppercase tracking-widest font-mono text-muted-foreground/70 transition-colors"
                      style={labelStyle(key)}
                    >
                      {key}
                    </label>
                    <input
                      id={key}
                      name={key}
                      type={key === "email" ? "email" : "text"}
                      required
                      onFocus={() => setFocused(key)}
                      onBlur={() => setFocused(null)}
                      className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 outline-none"
                    />
                  </div>
                ))}
              </div>

              <div
                className="relative rounded-md border border-border bg-card px-3 pt-5 pb-2 transition-[border-color,box-shadow] duration-200"
                style={fieldStyle("subject")}
              >
                <label
                  htmlFor="subject"
                  className="absolute left-3 top-1 text-[9px] uppercase tracking-widest font-mono text-muted-foreground/70 transition-colors"
                  style={labelStyle("subject")}
                >
                  subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 outline-none"
                />
              </div>

              <div
                className="relative rounded-md border border-border bg-card px-3 pt-5 pb-2 transition-[border-color,box-shadow] duration-200"
                style={fieldStyle("message")}
              >
                <label
                  htmlFor="message"
                  className="absolute left-3 top-1 text-[9px] uppercase tracking-widest font-mono text-muted-foreground/70 transition-colors"
                  style={labelStyle("message")}
                >
                  message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 outline-none resize-none"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500" role="alert">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={sending}
                className={
                  "group inline-flex items-center gap-2 transition-colors duration-300 " +
                  (sent ? "!bg-[#86efac] !text-black" : "")
                }
              >
                {sending
                  ? "Sending…"
                  : sent
                    ? (
                      <>
                        Sent
                        <span aria-hidden="true">✓</span>
                      </>
                    )
                    : (
                      <>
                        Send message
                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </>
                    )}
              </Button>
            </form>
          </FadeUp>

          <FadeUp className="order-2 lg:order-2">
            <div className="rounded-lg p-5">
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="text-sm font-medium">Availability</h3>
                  <p className="text-muted-foreground mt-1">
                    Open to freelance and full‑time roles.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-muted border border-border">Remote‑friendly</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-muted border border-border">US hours</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Preferred stack</h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {["TypeScript","React","React Native","Tailwind","Postgres","Vite","Docker","WSL","Vercel"].map((tag) => {
                      const brand = brandColor(tag, TOOL_BRAND)
                      return (
                        <span
                          key={tag}
                          style={{ ["--tool-accent" as string]: brand }}
                          className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-muted-foreground transition-[color,border-color,background-color,transform] duration-300 ease-out hover:-translate-y-[1px] hover:text-[var(--tool-accent)] hover:border-[var(--tool-accent)] hover:bg-white/[0.06]"
                        >
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: brand }}
                          />
                          {tag}
                        </span>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Contact</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href="mailto:timok@unlv.nevada.edu">Email</Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link
                        href="https://www.linkedin.com/in/brandon-timok-589765253/"
                        target="_blank"
                      >
                        LinkedIn
                      </Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link href="/Resume25.pdf" target="_blank">
                        Resume
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
