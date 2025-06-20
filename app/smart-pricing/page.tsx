"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Copy,
  Sparkles,
  Calculator,
  Target,
  Zap,
  BarChart3,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface FormData {
  hoursPerWeek: number
  hourlyRate: number
  frequency: string
  importance: string
  buildForYou: boolean
}

export default function SmartPricingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    hoursPerWeek: 0,
    hourlyRate: 0,
    frequency: "",
    importance: "",
    buildForYou: false,
  })
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  const totalSteps = 4

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("pricing-wizard-data")
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
  }, [])

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("pricing-wizard-data", JSON.stringify(formData))
  }, [formData])

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Calculation logic
  const calculateSavings = () => {
    const { hoursPerWeek, hourlyRate, frequency, importance } = formData

    let weeklyHours = hoursPerWeek
    if (frequency === "Daily") weeklyHours = hoursPerWeek * 7
    if (frequency === "Monthly") weeklyHours = hoursPerWeek / 4

    const monthlyHours = weeklyHours * 4
    const yearlyHours = monthlyHours * 12
    const monthlyValue = monthlyHours * hourlyRate
    const yearlyValue = yearlyHours * hourlyRate

    let multiplier = 1
    if (importance === "High") multiplier = 1.3
    if (importance === "Medium") multiplier = 1.15

    const suggestedPrice = Math.ceil(monthlyValue * multiplier * 0.25)

    return {
      monthlyHours: Math.round(monthlyHours),
      yearlyHours: Math.round(yearlyHours),
      monthlyValue: Math.round(monthlyValue),
      yearlyValue: Math.round(yearlyValue),
      suggestedPrice,
    }
  }

  const results = calculateSavings()

  const copyToClipboard = () => {
    const text = `Automation Savings Analysis:
• Monthly time saved: ${results.monthlyHours} hours
• Monthly value saved: ${results.monthlyValue.toLocaleString()} DKK
• Yearly value saved: ${results.yearlyValue.toLocaleString()} DKK
• Recommended project price: ${results.suggestedPrice.toLocaleString()} DKK`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRequestAutomation = () => {
    // Save current data and redirect to automation request with prefilled values
    localStorage.setItem("pricing-wizard-results", JSON.stringify({ formData, results }))
    router.push("/automation-request?from=pricing")
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.hoursPerWeek > 0 && formData.frequency !== ""
      case 2:
        return formData.hourlyRate > 0 && formData.importance !== ""
      case 3:
        return true // Build preference is optional
      default:
        return true
    }
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

  const stepVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />

      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                AI-Powered Pricing
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Smart Pricing <span className="text-blue-600">Wizard</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover how much time and money you could save with automation, and get a personalized price
                recommendation
              </p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center space-x-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          currentStep >= step
                            ? "bg-blue-600 border-blue-600 text-white"
                            : currentStep === step
                              ? "border-blue-600 text-blue-600 bg-blue-50"
                              : "border-gray-300 text-gray-400 bg-white"
                        }`}
                      >
                        {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                      </div>
                      {step < 4 && (
                        <div
                          className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                            currentStep > step ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Step {currentStep} of {totalSteps}
                </p>
              </div>
            </motion.div>

            {/* Main Card */}
            <Card className="bg-white shadow-xl border border-gray-200">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-gray-900">
                  {currentStep === 1 && "Task Details"}
                  {currentStep === 2 && "Business Impact"}
                  {currentStep === 3 && "Service Preference"}
                  {currentStep === 4 && "Your Savings Analysis"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {/* Step 1: Task Details */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            Hours spent on this task per week?
                          </Label>
                          <Input
                            type="number"
                            placeholder="e.g., 5"
                            value={formData.hoursPerWeek || ""}
                            onChange={(e) => updateFormData("hoursPerWeek", Number.parseFloat(e.target.value) || 0)}
                            className="text-lg py-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                          />
                          <p className="text-sm text-gray-500">
                            Include time for preparation, execution, and follow-up
                          </p>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900 flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-blue-600" />
                            How often do you perform this task?
                          </Label>
                          <Select
                            value={formData.frequency}
                            onValueChange={(value) => updateFormData("frequency", value)}
                          >
                            <SelectTrigger className="text-lg py-3 border-gray-300 focus:border-blue-500">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Daily">Daily</SelectItem>
                              <SelectItem value="Weekly">Weekly</SelectItem>
                              <SelectItem value="Monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-sm text-gray-500">This helps us calculate your total time investment</p>
                        </div>
                      </div>

                      {formData.hoursPerWeek > 0 && formData.frequency && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Calculator className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-blue-900">Quick Preview</span>
                          </div>
                          <p className="text-blue-800">
                            You spend approximately{" "}
                            <span className="font-bold">
                              {formData.frequency === "Daily"
                                ? formData.hoursPerWeek * 7 * 4
                                : formData.frequency === "Weekly"
                                  ? formData.hoursPerWeek * 4
                                  : formData.hoursPerWeek}{" "}
                              hours per month
                            </span>{" "}
                            on this task.
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Step 2: Business Impact */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900 flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-blue-600" />
                            Your hourly rate in DKK?
                          </Label>
                          <Input
                            type="number"
                            placeholder="e.g., 500"
                            value={formData.hourlyRate || ""}
                            onChange={(e) => updateFormData("hourlyRate", Number.parseFloat(e.target.value) || 0)}
                            className="text-lg py-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                          />
                          <p className="text-sm text-gray-500">What you charge clients or your internal hourly value</p>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900 flex items-center gap-2">
                            <Target className="w-4 h-4 text-blue-600" />
                            How important is this task to your business?
                          </Label>
                          <RadioGroup
                            value={formData.importance}
                            onValueChange={(value) => updateFormData("importance", value)}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                              <RadioGroupItem value="Low" id="low" className="text-blue-600" />
                              <Label htmlFor="low" className="flex-1 cursor-pointer">
                                <div className="font-medium">Low Priority</div>
                                <div className="text-sm text-gray-500">Nice to have, but not critical</div>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                              <RadioGroupItem value="Medium" id="medium" className="text-blue-600" />
                              <Label htmlFor="medium" className="flex-1 cursor-pointer">
                                <div className="font-medium">Medium Priority</div>
                                <div className="text-sm text-gray-500">Important for efficiency</div>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                              <RadioGroupItem value="High" id="high" className="text-blue-600" />
                              <Label htmlFor="high" className="flex-1 cursor-pointer">
                                <div className="font-medium">High Priority</div>
                                <div className="text-sm text-gray-500">Critical for business operations</div>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Service Preference */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Would you like us to build this automation for you?
                        </h3>
                        <p className="text-gray-600">
                          We can create a custom automation solution tailored to your specific needs
                        </p>
                      </div>

                      <div className="flex items-center justify-center space-x-8">
                        <div className="flex items-center space-x-4">
                          <Label className="text-lg text-gray-600">I'll do it myself</Label>
                          <Switch
                            checked={formData.buildForYou}
                            onCheckedChange={(checked) => updateFormData("buildForYou", checked)}
                            className="data-[state=checked]:bg-blue-600"
                          />
                          <Label className="text-lg text-gray-600">Build it for me</Label>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mt-8">
                        <Card
                          className={`border-2 transition-all ${!formData.buildForYou ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                        >
                          <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Target className="w-6 h-6 text-gray-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">DIY Approach</h4>
                            <p className="text-sm text-gray-600">
                              Get recommendations and build the automation yourself using our platform
                            </p>
                          </CardContent>
                        </Card>

                        <Card
                          className={`border-2 transition-all ${formData.buildForYou ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                        >
                          <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Zap className="w-6 h-6 text-blue-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Full Service</h4>
                            <p className="text-sm text-gray-600">
                              Our experts will build, test, and deploy the automation for you
                            </p>
                            <Badge className="mt-2 bg-orange-100 text-orange-700 border-orange-200">Recommended</Badge>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Results */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <TrendingUp className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Automation Analysis</h3>
                        <p className="text-gray-600">Here's how much time and money you could save with automation</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <Clock className="w-6 h-6 text-blue-600" />
                              <h4 className="font-semibold text-blue-900">Time Savings</h4>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-blue-800">Monthly:</span>
                                <span className="font-bold text-blue-900">{results.monthlyHours} hours</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-blue-800">Yearly:</span>
                                <span className="font-bold text-blue-900">{results.yearlyHours} hours</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <DollarSign className="w-6 h-6 text-green-600" />
                              <h4 className="font-semibold text-green-900">Value Savings</h4>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-green-800">Monthly:</span>
                                <span className="font-bold text-green-900">
                                  {results.monthlyValue.toLocaleString()} DKK
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-green-800">Yearly:</span>
                                <span className="font-bold text-green-900">
                                  {results.yearlyValue.toLocaleString()} DKK
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
                        <CardContent className="p-6 text-center">
                          <h4 className="text-xl font-bold text-purple-900 mb-2">Recommended Project Price</h4>
                          <div className="text-4xl font-bold text-purple-600 mb-4">
                            {results.suggestedPrice.toLocaleString()} DKK
                          </div>
                          <p className="text-purple-800 mb-4">
                            This represents approximately 25% of your monthly savings, ensuring a positive ROI within
                            the first month.
                          </p>
                          <div className="flex items-center justify-center gap-4">
                            <Button
                              onClick={copyToClipboard}
                              variant="outline"
                              className="border-purple-300 text-purple-700 hover:bg-purple-100"
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              {copied ? "Copied!" : "Copy Analysis"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <div className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-blue-900 mb-2">AI Summary</h4>
                            <p className="text-blue-800">
                              This automation will free up <strong>{results.yearlyHours} hours per year</strong>,
                              equivalent to <strong>{Math.round(results.yearlyHours / 8)} working days</strong>. The
                              time saved can be reinvested in high-value activities, client work, or strategic planning.
                              With a one-time investment of {results.suggestedPrice.toLocaleString()} DKK, you'll break
                              even in less than a month and save {results.yearlyValue.toLocaleString()} DKK annually.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-8 border-t border-gray-200">
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    disabled={currentStep === 1}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Next Step
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleRequestAutomation}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    >
                      Request This Automation
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
