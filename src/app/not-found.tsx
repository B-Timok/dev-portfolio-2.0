import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-5">
        <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
          404
        </p>
        <h1 className="text-3xl font-semibold">This page slipped through.</h1>
        <p className="text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="pt-2">
          <Button asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
