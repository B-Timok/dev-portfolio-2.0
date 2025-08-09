import * as React from "react"
import { cn } from "@/lib/utils"

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost" | "outline" | "secondary"
  size?: "sm" | "md" | "lg"
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", asChild, children, ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:opacity-50 disabled:pointer-events-none"
    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
      default: "bg-foreground text-background hover:bg-foreground/90",
      ghost: "hover:bg-muted",
      outline: "border border-border bg-background hover:bg-muted",
      secondary: "bg-muted text-foreground hover:bg-muted/80",
    }
    const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
      sm: "h-8 px-3 text-sm",
      md: "h-9 px-4 text-sm",
      lg: "h-10 px-6",
    }

    const classes = cn(base, variants[variant], sizes[size], className)

    if (asChild && React.isValidElement(children)) {
      type ElementWithClassName = React.ReactElement<{ className?: string }>
      const child = children as ElementWithClassName
      return React.cloneElement(child, {
        className: cn(classes, child.props?.className),
      })
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"


