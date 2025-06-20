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
import { ArrowRight, Mail, Lock, Eye, EyeOff, Github, Chrome, Zap, CheckCircle, AlertCircle, User } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 8
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    // Handle successful signup
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

  const getFieldStatus = (field: string) => {
    if (errors[field]) return "error"
    if (formData[field as keyof typeof formData] && !errors[field]) return "success"
    return "default"
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
                  <User className="w-8 h-8 text-white" />
                </motion.div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Create your{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  account
                </span>
              </h1>
              <p className="text-gray-400">Start automating your business workflows today</p>
            </motion.div>

            {/* Signup Form */}
            <motion.div variants={itemVariants}>
              <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-2xl shadow-purple-500/10">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-center text-white">Sign up for AutoFlow</CardTitle>
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
                          className={`relative ${focusedField === "email" ? "scale-105" : "scale-100"}`}
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
                            className={`pl-10 pr-10 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-200 ${
                              getFieldStatus("email") === "error"
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                : getFieldStatus("email") === "success"
                                  ? "border-green-500"
                                  : ""
                            }`}
                          />
                          {getFieldStatus("email") === "success" && (
                            <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
                          )}
                          {getFieldStatus("email") === "error" && (
                            <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400" />
                          )}
                        </motion.div>
                      </div>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </motion.p>
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-300">
                        Password
                      </Label>
                      <div className="relative">
                        <motion.div
                          className={`relative ${focusedField === "password" ? "scale-105" : "scale-100"}`}
                          animate={{
                            scale: focusedField === "password" ? 1.02 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            onFocus={() => setFocusedField("password")}
                            onBlur={() => setFocusedField(null)}
                            className={`pl-10 pr-10 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-200 ${
                              getFieldStatus("password") === "error"
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                : getFieldStatus("password") === "success"
                                  ? "border-green-500"
                                  : ""
                            }`}
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
                      {errors.password && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.password}
                        </motion.p>
                      )}
                      {formData.password && !errors.password && (
                        <div className="text-sm text-gray-400">
                          <div className="flex items-center gap-2 mt-2">
                            <div
                              className={`w-2 h-2 rounded-full ${formData.password.length >= 8 ? "bg-green-400" : "bg-gray-600"}`}
                            />
                            <span>At least 8 characters</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-gray-300">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <motion.div
                          className={`relative ${focusedField === "confirmPassword" ? "scale-105" : "scale-100"}`}
                          animate={{
                            scale: focusedField === "confirmPassword" ? 1.02 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                            onFocus={() => setFocusedField("confirmPassword")}
                            onBlur={() => setFocusedField(null)}
                            className={`pl-10 pr-10 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-200 ${
                              getFieldStatus("confirmPassword") === "error"
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                : getFieldStatus("confirmPassword") === "success"
                                  ? "border-green-500"
                                  : ""
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </motion.div>
                      </div>
                      {errors.confirmPassword && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.confirmPassword}
                        </motion.p>
                      )}
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
                            Creating Account...
                          </div>
                        ) : (
                          <>
                            Create Account
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

                  {/* Login Link */}
                  <div className="text-center pt-4">
                    <p className="text-gray-400">
                      Already have an account?{" "}
                      <Link href="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Features Preview */}
            <motion.div variants={itemVariants} className="mt-8">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { icon: Zap, text: "Fast Setup" },
                  { icon: CheckCircle, text: "Secure" },
                  { icon: ArrowRight, text: "Easy to Use" },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-800/30 backdrop-blur-sm border border-gray-700/30"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <feature.icon className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm text-gray-400">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
