"use client"

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion"
import type { ReactNode } from "react"

type StaggerItemProps = HTMLMotionProps<"div"> & {
  children: ReactNode
}

export function StaggerItem({ children, ...rest }: StaggerItemProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div>{children}</div>
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
