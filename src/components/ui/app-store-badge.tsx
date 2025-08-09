import Link from "next/link"
import { cn } from "@/lib/utils"
import { Apple } from "lucide-react"

type AppStoreBadgeProps = {
  href: string
  className?: string
}

export function AppStoreBadge({ href, className }: AppStoreBadgeProps) {
  return (
    <Link
      href={href}
      target="_blank"
      className={cn(
        "inline-flex items-center gap-3 rounded-md bg-black px-4 py-2 text-white",
        "hover:opacity-90 transition-opacity",
        className
      )}
    >
      <Apple className="h-6 w-6" />
      <span className="leading-tight">
        <span className="block text-[10px]">Download on the</span>
        <span className="block text-sm font-semibold">App Store</span>
      </span>
    </Link>
  )
}


