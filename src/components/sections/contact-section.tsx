"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { accentHexByIndex, borderClassByIndex } from "@/lib/playful"
import { FadeUp } from "@/components/motion/fade-up"

const FIELD_ORDER = ["name", "email", "subject", "message"] as const
type FieldKey = (typeof FIELD_ORDER)[number]
const fieldAccent = (key: FieldKey): string =>
  accentHexByIndex(FIELD_ORDER.indexOf(key))

const EMAIL = "btimok@gmail.com"
const GITHUB_URL = "https://github.com/B-Timok"
const LINKEDIN_URL = "https://www.linkedin.com/in/brandon-timok-589765253/"

const SUBJECT_SUGGESTIONS = [
  "Project inquiry",
  "Job opportunity",
  "Quick question",
  "Just saying hi",
]

export default function ContactSection() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focused, setFocused] = useState<FieldKey | null>(null)
  const [copied, setCopied] = useState(false)
  const subjectRef = useRef<HTMLInputElement>(null)

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

  const fillSubject = (value: string) => {
    const input = subjectRef.current
    if (!input) return
    input.value = value
    input.focus()
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard may be unavailable; fallthrough silently
    }
  }

  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="inline-flex items-baseline gap-3 mb-3">
            <h2 className="text-2xl font-semibold">Contact</h2>
            <span className={"h-0.5 w-10 " + borderClassByIndex(0)} />
          </div>
          <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground/70 mb-8">
            Replies within ~2 days
          </p>
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

              {/* Subject suggestion pills */}
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60 self-center mr-1">
                  Subject
                </span>
                {SUBJECT_SUGGESTIONS.map((s, i) => {
                  const accent = accentHexByIndex(i)
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => fillSubject(s)}
                      style={{ ["--pill-accent" as string]: accent }}
                      className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-mono text-muted-foreground transition-[color,border-color,background-color] duration-200 hover:text-[var(--pill-accent)] hover:border-[var(--pill-accent)] hover:bg-white/[0.06]"
                    >
                      {s}
                    </button>
                  )
                })}
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
                  ref={subjectRef}
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
              <div className="space-y-5 text-sm">
                <div>
                  <h3 className="text-sm font-medium">Availability</h3>
                  <p className="text-muted-foreground mt-1">
                    Open to freelance and contract work. Selective on new full-time roles.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-muted border border-border">Remote-friendly</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-muted border border-border">US hours</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Reach me</h3>
                  <div className="mt-2 flex items-center gap-1.5">
                    <Link
                      href={`mailto:${EMAIL}`}
                      className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {EMAIL}
                    </Link>
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label={copied ? "Email copied" : "Copy email"}
                      className="inline-flex items-center justify-center h-7 w-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-colors"
                    >
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                        <GithubIcon className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
                        GitHub
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
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

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.21.09 1.85 1.25 1.85 1.25 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.32.47-2.4 1.24-3.24-.12-.31-.54-1.54.12-3.22 0 0 1.01-.32 3.3 1.24a11.4 11.4 0 0 1 6 0c2.29-1.56 3.3-1.24 3.3-1.24.66 1.68.24 2.91.12 3.22.77.84 1.24 1.92 1.24 3.24 0 4.62-2.81 5.65-5.49 5.94.43.37.82 1.1.82 2.23v3.3c0 .32.22.7.83.58C20.56 22.3 24 17.8 24 12.5 24 5.87 18.63.5 12 .5Z"
      />
    </svg>
  )
}
