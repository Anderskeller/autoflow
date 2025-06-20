"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { ArrowRight, Zap, LinkIcon, Settings, Sparkles, Brain, Network } from "lucide-react"
import Link from "next/link"
import React from "react"
import Particles from "@/components/Particles"

function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-16 flex flex-col items-center">
      <motion.h1
        className="text-5xl md:text-7xl font-extrabold text-center mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Automate your business<br />with AI in minutes
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl text-center mb-8 max-w-2xl text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Autoflow builds, manages, and scales your automations so you can focus on what matters.
      </motion.p>
      <motion.div
        className="flex flex-col md:flex-row gap-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <Link href="/signup">
          <Button size="lg" className="text-lg font-semibold px-8 py-4 flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600">
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
        <Link href="/login">
          <Button variant="outline" size="lg" className="text-lg font-semibold px-8 py-4 flex items-center gap-2 border-gray-700 text-gray-200 hover:bg-gray-800">
            Demo Login
            <Zap className="w-5 h-5" />
          </Button>
        </Link>
      </motion.div>
      <motion.div
        className="relative h-[500px] w-full flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Floating UI Elements */}
        <motion.div
          className="absolute top-8 right-8 bg-gray-800/60 backdrop-blur-sm border border-gray-600/30 rounded-lg p-3 shadow-lg"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-300">AI Processing</span>
          </div>
        </motion.div>
        <motion.div
          className="absolute bottom-8 left-8 bg-gray-800/60 backdrop-blur-sm border border-gray-600/30 rounded-lg p-3 shadow-lg"
          animate={{ y: [5, -5, 5] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        >
          <div className="flex items-center gap-2 text-sm">
            <Network className="w-4 h-4 text-cyan-400" />
            <span className="text-gray-300">50+ Integrations</span>
          </div>
        </motion.div>
        <Particles />
      </motion.div>
      {/* ErrorBoundary test button */}
      <button
        className="mt-8 px-4 py-2 bg-red-600 text-white rounded"
        onClick={() => { throw new Error('Test error from landing page!') }}
      >
        Trigger Error
      </button>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: LinkIcon,
      title: "Connect your tools",
      description: "Seamlessly integrate with Gmail, Slack, HubSpot, Notion, and 50+ other platforms.",
      color: "from-cyan-400 to-blue-500",
      glowColor: "cyan-400/20",
    },
    {
      icon: Brain,
      title: "AI understands your workflow",
      description: "Simply describe what you want to automate in plain English. Our AI does the rest.",
      color: "from-purple-400 to-pink-500",
      glowColor: "purple-400/20",
    },
    {
      icon: Settings,
      title: "We build it for you",
      description: "Our AI creates custom automations tailored to your specific business needs.",
      color: "from-emerald-400 to-green-500",
      glowColor: "emerald-400/20",
    },
    {
      icon: Sparkles,
      title: "You scale effortlessly",
      description: "Watch your productivity soar while we handle the repetitive tasks automatically.",
      color: "from-orange-400 to-red-500",
      glowColor: "orange-400/20",
    },
  ]
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            className={`relative bg-gradient-to-br ${feature.color} rounded-2xl p-6 shadow-lg flex flex-col items-start justify-between min-h-[220px] overflow-hidden`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
          >
            <div className={`absolute inset-0 blur-2xl opacity-40 bg-${feature.glowColor}`}></div>
            <feature.icon className="w-8 h-8 mb-4 text-white" />
            <h3 className="text-2xl font-bold mb-2 z-10">{feature.title}</h3>
            <p className="text-gray-100 mb-4 z-10">{feature.description}</p>
            <Badge className="z-10">AI Powered</Badge>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
    </main>
  )
} 