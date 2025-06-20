"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/components/navigation"
import {
  ArrowRight,
  Mail,
  MessageSquare,
  Database,
  FileText,
  Smile,
  Briefcase,
  Zap,
  Calendar,
  DollarSign,
  BarChart,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function AutomationRequestPage() {
  const [description, setDescription] = useState("")
  const [selectedSystems, setSelectedSystems] = useState<string[]>([])
  const [toneOfVoice, setToneOfVoice] = useState("")
  const [isOngoing, setIsOngoing] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)

  const integrations = [
    { id: "gmail", name: "Gmail", icon: Mail, category: "Communication" },
    { id: "slack", name: "Slack", icon: MessageSquare, category: "Communication" },
    { id: "hubspot", name: "HubSpot", icon: Database, category: "CRM" },
    { id: "notion", name: "Notion", icon: FileText, category: "Productivity" },
    { id: "calendar", name: "Google Calendar", icon: Calendar, category: "Productivity" },
    { id: "stripe", name: "Stripe", icon: DollarSign, category: "Payments" },
    { id: "analytics", name: "Google Analytics", icon: BarChart, category: "Analytics" },
    { id: "typeform", name: "Typeform", icon: FileText, category: "Forms" },
  ]

  const tones = [
    { id: "friendly", name: "Friendly", icon: Smile, description: "Warm and approachable" },
    { id: "professional", name: "Professional", icon: Briefcase, description: "Formal and business-like" },
    { id: "technical", name: "Technical", icon: Zap, description: "Detailed and precise" },
  ]

  const toggleSystem = (systemId: string) => {
    setSelectedSystems((prev) => (prev.includes(systemId) ? prev.filter((id) => id !== systemId) : [...prev, systemId]))
  }

  const handleSubmit = () => {
    // Show success modal/toast and redirect
    setCurrentStep(3)
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

  const categories = [...new Set(integrations.map((i) => i.category))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white">
      <Navigation />

      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Progress Indicator */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center space-x-4">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          currentStep >= step
                            ? "bg-gradient-to-r from-cyan-500 to-purple-600 border-cyan-400 text-white"
                            : "border-gray-600 text-gray-400"
                        }`}
                      >
                        {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                      </div>
                      {step < 3 && (
                        <div
                          className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                            currentStep > step ? "bg-gradient-to-r from-cyan-500 to-purple-600" : "bg-gray-600"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Describe your{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    automation
                  </span>
                </h1>
                <p className="text-xl text-gray-400">Tell us what you want to automate and we'll build it for you</p>
              </div>
            </motion.div>

            {currentStep === 3 ? (
              // Success State
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-2xl max-w-md mx-auto">
                  <CardContent className="p-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-8 h-8 text-white" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-white mb-4">Request Submitted!</h2>
                    <p className="text-gray-400 mb-6">
                      We've received your automation request and will get back to you within 24 hours with a custom
                      solution.
                    </p>
                    <div className="space-y-3">
                      <Link href="/dashboard">
                        <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500">
                          Go to Dashboard
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="w-full border-gray-600 hover:bg-gray-700/50 text-gray-300 hover:text-white"
                      >
                        Submit Another Request
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Automation Request</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Description */}
                  <motion.div variants={itemVariants}>
                    <Label className="block text-lg font-semibold mb-4 text-white">
                      What should this automation do?
                    </Label>
                    <Textarea
                      placeholder="Example: When someone fills out our contact form, I want to automatically create a new contact in HubSpot, send them a welcome email series, and notify our sales team in Slack with their details..."
                      className="min-h-[200px] text-base bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Be specific about triggers, actions, and conditions. The more detail, the better!
                    </p>
                  </motion.div>

                  {/* Integration Selection */}
                  <motion.div variants={itemVariants}>
                    <Label className="block text-lg font-semibold mb-4 text-white">
                      Which tools should we integrate?
                    </Label>
                    {categories.map((category) => (
                      <div key={category} className="mb-6">
                        <h3 className="text-md font-medium text-gray-300 mb-3">{category}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {integrations
                            .filter((integration) => integration.category === category)
                            .map((integration) => (
                              <motion.div key={integration.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Card
                                  className={`cursor-pointer transition-all duration-200 ${
                                    selectedSystems.includes(integration.id)
                                      ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20"
                                      : "border-gray-600 hover:border-gray-500 bg-gray-900/30"
                                  }`}
                                  onClick={() => toggleSystem(integration.id)}
                                >
                                  <CardContent className="p-4 text-center">
                                    <integration.icon className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                                    <div className="text-sm font-medium text-white">{integration.name}</div>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))}
                        </div>
                      </div>
                    ))}
                    {selectedSystems.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-400 mb-2">Selected integrations:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedSystems.map((systemId) => {
                            const system = integrations.find((s) => s.id === systemId)
                            return (
                              <Badge key={systemId} className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                                {system?.name}
                              </Badge>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Tone of Voice */}
                  <motion.div variants={itemVariants}>
                    <Label className="block text-lg font-semibold mb-4 text-white">
                      Tone of voice for communications
                    </Label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {tones.map((tone) => (
                        <motion.div key={tone.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Card
                            className={`cursor-pointer transition-all duration-200 ${
                              toneOfVoice === tone.id
                                ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20"
                                : "border-gray-600 hover:border-gray-500 bg-gray-900/30"
                            }`}
                            onClick={() => setToneOfVoice(tone.id)}
                          >
                            <CardContent className="p-4 text-center">
                              <tone.icon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                              <div className="font-medium mb-1 text-white">{tone.name}</div>
                              <div className="text-sm text-gray-400">{tone.description}</div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Automation Type */}
                  <motion.div variants={itemVariants}>
                    <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg border border-gray-700/50">
                      <div>
                        <Label className="text-lg font-semibold text-white">Automation Type</Label>
                        <p className="text-sm text-gray-400 mt-1">
                          {isOngoing ? "Runs continuously when triggered" : "Runs once and stops"}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Label className="text-sm text-gray-400">One-time</Label>
                        <Switch
                          checked={isOngoing}
                          onCheckedChange={setIsOngoing}
                          className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-purple-600"
                        />
                        <Label className="text-sm text-gray-400">Ongoing</Label>
                      </div>
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div variants={itemVariants} className="pt-6">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={handleSubmit}
                        disabled={!description.trim() || selectedSystems.length === 0 || !toneOfVoice}
                        className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-lg py-4 shadow-lg shadow-purple-500/25 border border-purple-400/20"
                      >
                        Submit Automation Request
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </motion.div>
                    <p className="text-sm text-gray-500 text-center mt-3">
                      We'll review your request and get back to you within 24 hours
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
