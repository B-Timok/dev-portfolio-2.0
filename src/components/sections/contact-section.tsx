"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Send, MapPin, Phone, Loader2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitSuccess(true)

    // Reset success message after 3 seconds
    setTimeout(() => setSubmitSuccess(false), 3000)
  }

  return (
    <section id="contact" className="relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-small-white/[0.02] -z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#6BA5D7]/20 blur-3xl opacity-20" />
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-[#6BA5D7]/20 blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 space-y-4"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#6BA5D7]/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#6BA5D7]" />
              </div>
              <h2 className="text-3xl font-bold text-[#6BA5D7]">Get In Touch</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I&apos;m currently available for freelance work and full-time positions. If you have a project that needs some
              creative work, let&apos;s talk!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Contact Information Card */}
              <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-[#6BA5D7]/20">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4 group">
                    <div className="bg-[#6BA5D7]/10 p-3 rounded-full border border-[#6BA5D7]/20 group-hover:border-[#6BA5D7]/40 transition-colors">
                      <Mail className="w-5 h-5 text-[#6BA5D7]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
                      <Link
                        href="mailto:timok@unlv.nevada.edu"
                        className="text-foreground hover:text-[#6BA5D7] transition-colors"
                      >
                        timok@unlv.nevada.edu
                      </Link>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4 group">
                    <div className="bg-[#6BA5D7]/10 p-3 rounded-full border border-[#6BA5D7]/20 group-hover:border-[#6BA5D7]/40 transition-colors">
                      <Phone className="w-5 h-5 text-[#6BA5D7]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Phone</h4>
                      <Link href="tel:+17024970203" className="text-foreground hover:text-[#6BA5D7] transition-colors">
                        (702) 497-0203
                      </Link>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4 group">
                    <div className="bg-[#6BA5D7]/10 p-3 rounded-full border border-[#6BA5D7]/20 group-hover:border-[#6BA5D7]/40 transition-colors">
                      <MapPin className="w-5 h-5 text-[#6BA5D7]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                      <p className="text-foreground">Henderson, Nevada</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Availability Card */}
              <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-[#6BA5D7]/20">
                <h3 className="text-xl font-bold mb-4">Availability</h3>
                <p className="text-muted-foreground mb-4">
                  I&apos;m currently available for new opportunities and would love to discuss how I can contribute to your
                  team or project.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-50"></div>
                  </div>
                  <span>Available for work</span>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-[#6BA5D7]/20"
            >
              <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full rounded-lg border border-[#6BA5D7]/50 bg-card/50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6BA5D7] transition-all placeholder:text-gray-400 resize-none"
                      placeholder="Your name"
                      required
                    />
                    </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full rounded-lg border border-[#6BA5D7]/50 bg-card/50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6BA5D7] transition-all placeholder:text-gray-400 resize-none"
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="w-full rounded-lg border border-[#6BA5D7]/50 bg-card/50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6BA5D7] transition-all placeholder:text-gray-400 resize-none"
                    placeholder="Subject"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full rounded-lg border border-[#6BA5D7]/50 bg-card/50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6BA5D7] transition-all placeholder:text-gray-400 resize-none"
                    placeholder="Your message"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-lg bg-gradient-to-r from-[#6BA5D7] to-[#6BA5D7]/80 px-6 py-3 text-white hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : submitSuccess ? (
                    <>
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

