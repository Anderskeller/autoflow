"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface Pos {
  left: number
  top: number
  x: number
  y: number
  duration: number
  delay: number
}

export default function Particles() {
  const [positions, setPositions] = useState<Pos[]>([])

  useEffect(() => {
    const p = Array.from({ length: 12 }).map(() => ({
      left: 20 + Math.random() * 60,
      top: 20 + Math.random() * 60,
      x: Math.random() * 20 - 10,
      y: Math.random() * 20 - 10,
      duration: 4 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
    setPositions(p)
  }, [])

  if (positions.length === 0) return null

  return (
    <>
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
          style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
            x: [0, pos.x, 0],
            y: [0, pos.y, 0],
          }}
          transition={{
            duration: pos.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: pos.delay,
          }}
        />
      ))}
    </>
  )
} 