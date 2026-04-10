"use client"

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion"

export function ScrollProgress() {
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  })

  if (prefersReduced) {
    return null
  }

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="pointer-events-none absolute left-0 top-0 h-[2px] w-full origin-left"
      aria-hidden="true"
    >
      <div
        className="h-full w-full"
        style={{
          background: "linear-gradient(90deg, #7dd3fc 0%, #f9a8d4 50%, #c4b5fd 100%)",
          boxShadow: "0 0 8px rgba(125, 211, 252, 0.4)",
        }}
      />
    </motion.div>
  )
}
