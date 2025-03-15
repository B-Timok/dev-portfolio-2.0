import { Quote } from "lucide-react"
import Image from "next/image"

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Brandon is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills make him a valuable asset to any team.",
      name: "Sarah Johnson",
      title: "CTO at TechSolutions",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "Working with Brandon was a pleasure. He not only understood our technical requirements but also provided valuable insights that improved our product.",
      name: "Michael Chen",
      title: "Product Manager at InnovateCorp",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "Brandon's ability to translate complex requirements into elegant code is impressive. He's a collaborative team player who elevates the entire project.",
      name: "Emily Rodriguez",
      title: "Lead Developer at WebCraft",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Quote className="w-6 h-6 text-[#1db954]" />
              <h2 className="text-3xl font-bold tracking-tight">What People Say</h2>
            </div>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Feedback from colleagues and clients I&apos;ve had the pleasure of working with.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-background rounded-xl p-6 shadow-sm border border-black/5 dark:border-white/5 flex flex-col"
              >
                <div className="mb-6">
                  <Quote className="w-10 h-10 text-[#1db954]/20" />
                </div>

                <p className="text-foreground/80 italic mb-6 flex-1">{testimonial.quote}</p>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-foreground/60">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

