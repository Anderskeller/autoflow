"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Zap } from "lucide-react"
import Link from "next/link"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/25"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Zap className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              AutoFlow
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Home
            </Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Dashboard
            </Link>
            <Link href="/analytics" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Analytics
            </Link>
            <Link href="/admin" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Admin
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800/50">
                Sign In
              </Button>
            </Link>
            <Link href="/request">
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-purple-500/25 border border-purple-400/20">
                Get Started
              </Button>
            </Link>
          </div>

          <button className="md:hidden text-gray-300" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isOpen && (
          <motion.div
            className="md:hidden mt-4 pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-300 hover:text-cyan-400">
                Home
              </Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-cyan-400">
                Dashboard
              </Link>
              <Link href="/analytics" className="text-gray-300 hover:text-cyan-400">
                Analytics
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800/50">
                    Sign In
                  </Button>
                </Link>
                <Link href="/request">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 shadow-lg shadow-purple-500/25">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
