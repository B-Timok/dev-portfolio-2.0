import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-10 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Brandon Timok</p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="mailto:timok@unlv.nevada.edu" className="text-muted-foreground hover:text-foreground">Email</Link>
            <Link href="https://github.com/B-Timok" target="_blank" className="text-muted-foreground hover:text-foreground">GitHub</Link>
            <Link href="https://www.linkedin.com/in/brandon-timok-589765253/" target="_blank" className="text-muted-foreground hover:text-foreground">LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

