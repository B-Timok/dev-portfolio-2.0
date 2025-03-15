import Link from "next/link"
import { Mail } from "lucide-react"
import { SiGithub, SiLinkedin } from "react-icons/si"

export default function Footer() {
  return (
    <footer className="py-10 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Brandon Timok. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/B-Timok"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <SiGithub className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/brandon-timok-589765253/"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <SiLinkedin className="w-5 h-5" />
            </Link>
            <Link
              href="mailto:timok@unlv.nevada.edu"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

