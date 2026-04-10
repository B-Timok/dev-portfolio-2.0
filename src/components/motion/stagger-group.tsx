"use client"

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion"
import type { ReactNode } from "react"

type StaggerGroupProps = HTMLMotionProps<"div"> & {
  children: ReactNode
  stagger?: number
  delayChildren?: number
}

export function StaggerGroup({
  children,
  stagger = 0.08,
  delayChildren = 0,
  ...rest
}: StaggerGroupProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div>{children}</div>
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
