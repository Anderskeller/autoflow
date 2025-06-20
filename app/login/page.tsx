"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Navigation } from "@/components/navigation"
import { ArrowRight, Mail, Lock, Eye, EyeOff, Github, Chrome, LogIn } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10" />
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <Navigation />

      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-md">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <LogIn className="w-8 h-8 text-white" />
                </motion.div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">back</span>
              </h1>
              <p className="text-gray-400">Sign in to continue automating your workflows</p>
            </motion.div>

            {/* Login Form */}
            <motion.div variants={itemVariants}>
              <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-2xl shadow-purple-500/10">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-center text-white">Sign in to AutoFlow</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">
                        Email address
                      </Label>
                      <div className="relative">
                        <motion.div
                          animate={{
                            scale: focusedField === "email" ? 1.02 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                            className="pl-10 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-200"
                          />
                        </motion.div>
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-gray-300">
                          Password
                        </Label>
                        <Link
                          href="/forgot-password"
                          className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <motion.div
                          animate={{
                            scale: focusedField === "password" ? 1.02 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            onFocus={() => setFocusedField("password")}
                            onBlur={() => setFocusedField(null)}
                            className="pl-10 pr-10 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-200"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </motion.div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-lg py-3 shadow-lg shadow-purple-500/25 border border-purple-400/20 transition-all duration-200"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <motion.div
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />
                            Signing in...
                          </div>
                        ) : (
                          <>
                            Sign in
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>

                  {/* Divider */}
                  <div className="relative">
                    <Separator className="bg-gray-600" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-gray-800 px-3 text-gray-400 text-sm">or continue with</span>
                    </div>
                  </div>

                  {/* OAuth Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        className="w-full bg-gray-900/50 border-gray-600 hover:bg-gray-700/50 text-gray-300 hover:text-white transition-all duration-200"
                      >
                        <Chrome className="w-5 h-5 mr-2" />
                        Google
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        className="w-full bg-gray-900/50 border-gray-600 hover:bg-gray-700/50 text-gray-300 hover:text-white transition-all duration-200"
                      >
                        <Github className="w-5 h-5 mr-2" />
                        GitHub
                      </Button>
                    </motion.div>
                  </div>

                  {/* Signup Link */}
                  <div className="text-center pt-4">
                    <p className="text-gray-400">
                      Don't have an account?{" "}
                      <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                        Sign up
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
