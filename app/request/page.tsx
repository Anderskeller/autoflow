"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { Label } from "@/components/ui/label"
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
  Search,
  Star,
  Clock,
  Users,
  TrendingUp,
  ShoppingCart,
  Target,
  Sparkles,
  Play,
  Copy,
  Phone,
  Clipboard,
  CreditCard,
  Share2,
  Camera,
  Video,
  Music,
  GitBranch,
  Code,
  Settings,
  Cloud,
  Archive,
  Headphones,
  PenTool,
  Layers,
  Shield,
  Lock,
} from "lucide-react"
import Link from "next/link"

export default function AutomationRequestPage() {
  const [activeTab, setActiveTab] = useState<"templates" | "custom">("templates")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Custom automation form state
  const [description, setDescription] = useState("")
  const [selectedSystems, setSelectedSystems] = useState<string[]>([])
  const [toneOfVoice, setToneOfVoice] = useState("")
  const [isOngoing, setIsOngoing] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)

  // Dynamic pricing state
  const [hoursSavedPerWeek, setHoursSavedPerWeek] = useState<number>(0)
  const [hourlyRate, setHourlyRate] = useState<number>(0)
  const [workflowFrequency, setWorkflowFrequency] = useState<string>("")
  const [goal, setGoal] = useState<string>("")
  const [showAnnualValue, setShowAnnualValue] = useState(false)

  const prebuiltWorkflows = [
    {
      id: "lead-qualification",
      title: "Lead Qualification & Scoring",
      description: "Automatically score and route new leads from contact forms based on your ideal customer profile",
      category: "Sales & CRM",
      difficulty: "Beginner",
      setupTime: "5 minutes",
      popularity: 4.9,
      users: "2.1K+",
      tags: ["HubSpot", "Gmail", "Slack", "Typeform"],
      icon: Target,
      color: "from-blue-500 to-blue-600",
      popular: true,
      workflow: {
        trigger: "New form submission received",
        steps: [
          "Extract lead information from form",
          "Score lead based on company size, industry, budget",
          "If score > 80: Create deal in HubSpot",
          "Send personalized welcome email",
          "Notify sales team in Slack with lead details",
        ],
      },
    },
    {
      id: "customer-onboarding",
      title: "Customer Onboarding Automation",
      description: "Welcome new customers with email sequences, account setup, and team notifications",
      category: "Customer Success",
      difficulty: "Intermediate",
      setupTime: "10 minutes",
      popularity: 4.8,
      users: "1.8K+",
      tags: ["Stripe", "Gmail", "Notion", "Slack", "Calendar"],
      icon: Users,
      color: "from-green-500 to-green-600",
      popular: true,
      workflow: {
        trigger: "Payment successful in Stripe",
        steps: [
          "Create customer record in Notion",
          "Send welcome email with getting started guide",
          "Schedule onboarding call in calendar",
          "Add customer to Slack channel",
          "Trigger 7-day email sequence",
        ],
      },
    },
    {
      id: "content-distribution",
      title: "Content Distribution Pipeline",
      description: "Automatically share new blog posts across social media and email subscribers",
      category: "Marketing",
      difficulty: "Beginner",
      setupTime: "7 minutes",
      popularity: 4.7,
      users: "1.5K+",
      tags: ["WordPress", "Twitter", "LinkedIn", "Mailchimp"],
      icon: Sparkles,
      color: "from-purple-500 to-purple-600",
      popular: true,
      workflow: {
        trigger: "New blog post published",
        steps: [
          "Extract post title, excerpt, and featured image",
          "Create social media posts for Twitter and LinkedIn",
          "Schedule posts for optimal engagement times",
          "Send newsletter to email subscribers",
          "Track engagement metrics",
        ],
      },
    },
    {
      id: "support-ticket-routing",
      title: "Smart Support Ticket Routing",
      description: "Route support tickets to the right team member based on keywords and priority",
      category: "Customer Support",
      difficulty: "Intermediate",
      setupTime: "12 minutes",
      popularity: 4.6,
      users: "1.2K+",
      tags: ["Zendesk", "Slack", "Notion", "Gmail"],
      icon: MessageSquare,
      color: "from-cyan-500 to-cyan-600",
      popular: false,
      workflow: {
        trigger: "New support ticket created",
        steps: [
          "Analyze ticket content for keywords",
          "Determine priority level (urgent, high, normal)",
          "Assign to appropriate team member",
          "Create task in Notion project board",
          "Send acknowledgment email to customer",
        ],
      },
    },
    {
      id: "inventory-management",
      title: "Inventory Reorder Automation",
      description: "Automatically reorder products when stock falls below threshold",
      category: "E-commerce",
      difficulty: "Advanced",
      setupTime: "15 minutes",
      popularity: 4.5,
      users: "890+",
      tags: ["Shopify", "Gmail", "Slack", "Google Sheets"],
      icon: ShoppingCart,
      color: "from-orange-500 to-orange-600",
      popular: false,
      workflow: {
        trigger: "Product stock below threshold",
        steps: [
          "Check current inventory levels",
          "Calculate reorder quantity based on sales velocity",
          "Send purchase order to supplier via email",
          "Update inventory tracking in Google Sheets",
          "Notify warehouse team in Slack",
        ],
      },
    },
    {
      id: "social-media-monitoring",
      title: "Social Media Mention Alerts",
      description: "Monitor brand mentions across social platforms and respond quickly",
      category: "Marketing",
      difficulty: "Intermediate",
      setupTime: "8 minutes",
      popularity: 4.4,
      users: "750+",
      tags: ["Twitter", "Facebook", "Slack", "Gmail"],
      icon: TrendingUp,
      color: "from-pink-500 to-pink-600",
      popular: false,
      workflow: {
        trigger: "Brand mention detected",
        steps: [
          "Scan social media for brand mentions",
          "Analyze sentiment (positive, negative, neutral)",
          "Alert team in Slack for negative mentions",
          "Create response template based on context",
          "Track mention metrics in dashboard",
        ],
      },
    },
    {
      id: "meeting-follow-up",
      title: "Meeting Follow-up Automation",
      description: "Automatically send meeting summaries and action items to participants",
      category: "Productivity",
      difficulty: "Beginner",
      setupTime: "6 minutes",
      popularity: 4.3,
      users: "680+",
      tags: ["Calendar", "Gmail", "Notion", "Slack"],
      icon: Calendar,
      color: "from-indigo-500 to-indigo-600",
      popular: false,
      workflow: {
        trigger: "Meeting ends in calendar",
        steps: [
          "Extract meeting notes and action items",
          "Generate meeting summary",
          "Send follow-up email to all participants",
          "Create tasks in Notion for action items",
          "Schedule follow-up reminders",
        ],
      },
    },
    {
      id: "expense-tracking",
      title: "Expense Report Automation",
      description: "Automatically categorize and process expense receipts",
      category: "Finance",
      difficulty: "Intermediate",
      setupTime: "10 minutes",
      popularity: 4.2,
      users: "520+",
      tags: ["Gmail", "Google Sheets", "Slack", "QuickBooks"],
      icon: DollarSign,
      color: "from-emerald-500 to-emerald-600",
      popular: false,
      workflow: {
        trigger: "Receipt email received",
        steps: [
          "Extract receipt data using OCR",
          "Categorize expense automatically",
          "Add to expense tracking spreadsheet",
          "Flag unusual expenses for review",
          "Generate monthly expense reports",
        ],
      },
    },
  ]

  const integrations = [
    // Communication & Messaging
    { id: "gmail", name: "Gmail", icon: Mail, category: "Communication" },
    { id: "slack", name: "Slack", icon: MessageSquare, category: "Communication" },
    { id: "discord", name: "Discord", icon: MessageSquare, category: "Communication" },
    { id: "teams", name: "Microsoft Teams", icon: MessageSquare, category: "Communication" },
    { id: "whatsapp", name: "WhatsApp Business", icon: Phone, category: "Communication" },
    { id: "telegram", name: "Telegram", icon: MessageSquare, category: "Communication" },

    // CRM & Sales
    { id: "hubspot", name: "HubSpot", icon: Database, category: "CRM" },
    { id: "salesforce", name: "Salesforce", icon: Users, category: "CRM" },
    { id: "pipedrive", name: "Pipedrive", icon: TrendingUp, category: "CRM" },
    { id: "zoho", name: "Zoho CRM", icon: Database, category: "CRM" },
    { id: "freshworks", name: "Freshworks", icon: Users, category: "CRM" },

    // Productivity & Project Management
    { id: "notion", name: "Notion", icon: FileText, category: "Productivity" },
    { id: "calendar", name: "Google Calendar", icon: Calendar, category: "Productivity" },
    { id: "trello", name: "Trello", icon: Clipboard, category: "Productivity" },
    { id: "asana", name: "Asana", icon: Target, category: "Productivity" },
    { id: "monday", name: "Monday.com", icon: Calendar, category: "Productivity" },
    { id: "clickup", name: "ClickUp", icon: Zap, category: "Productivity" },
    { id: "airtable", name: "Airtable", icon: Database, category: "Productivity" },

    // Forms & Surveys
    { id: "typeform", name: "Typeform", icon: FileText, category: "Forms" },
    { id: "googleforms", name: "Google Forms", icon: FileText, category: "Forms" },
    { id: "surveymonkey", name: "SurveyMonkey", icon: Clipboard, category: "Forms" },
    { id: "jotform", name: "JotForm", icon: FileText, category: "Forms" },

    // E-commerce & Payments
    { id: "stripe", name: "Stripe", icon: CreditCard, category: "Payments" },
    { id: "paypal", name: "PayPal", icon: DollarSign, category: "Payments" },
    { id: "shopify", name: "Shopify", icon: ShoppingCart, category: "E-commerce" },
    { id: "woocommerce", name: "WooCommerce", icon: ShoppingCart, category: "E-commerce" },
    { id: "square", name: "Square", icon: CreditCard, category: "Payments" },

    // Marketing & Social Media
    { id: "mailchimp", name: "Mailchimp", icon: Mail, category: "Marketing" },
    { id: "facebook", name: "Facebook", icon: Share2, category: "Social Media" },
    { id: "instagram", name: "Instagram", icon: Camera, category: "Social Media" },
    { id: "twitter", name: "Twitter/X", icon: MessageSquare, category: "Social Media" },
    { id: "linkedin", name: "LinkedIn", icon: Briefcase, category: "Social Media" },
    { id: "youtube", name: "YouTube", icon: Video, category: "Social Media" },
    { id: "tiktok", name: "TikTok", icon: Music, category: "Social Media" },

    // Analytics & Reporting
    { id: "analytics", name: "Google Analytics", icon: BarChart, category: "Analytics" },
    { id: "mixpanel", name: "Mixpanel", icon: TrendingUp, category: "Analytics" },
    { id: "hotjar", name: "Hotjar", icon: Target, category: "Analytics" },

    // Development & Code
    { id: "github", name: "GitHub", icon: GitBranch, category: "Development" },
    { id: "gitlab", name: "GitLab", icon: Code, category: "Development" },
    { id: "jira", name: "Jira", icon: Settings, category: "Development" },

    // Cloud Storage & Files
    { id: "googledrive", name: "Google Drive", icon: Cloud, category: "Storage" },
    { id: "dropbox", name: "Dropbox", icon: Archive, category: "Storage" },
    { id: "onedrive", name: "OneDrive", icon: Cloud, category: "Storage" },

    // Customer Support
    { id: "zendesk", name: "Zendesk", icon: Headphones, category: "Support" },
    { id: "intercom", name: "Intercom", icon: MessageSquare, category: "Support" },

    // Design & Creative
    { id: "figma", name: "Figma", icon: PenTool, category: "Design" },
    { id: "canva", name: "Canva", icon: Layers, category: "Design" },

    // Security & Authentication
    { id: "auth0", name: "Auth0", icon: Shield, category: "Security" },
    { id: "okta", name: "Okta", icon: Lock, category: "Security" },
  ]

  const tones = [
    { id: "friendly", name: "Friendly", icon: Smile, description: "Warm and approachable" },
    { id: "professional", name: "Professional", icon: Briefcase, description: "Formal and business-like" },
    { id: "technical", name: "Technical", icon: Zap, description: "Detailed and precise" },
  ]

  // Search-filter categories for the workflow grid
  const workflowCategories = [
    { id: "all", name: "All Categories" },
    { id: "Sales & CRM", name: "Sales & CRM" },
    { id: "Marketing", name: "Marketing" },
    { id: "Customer Success", name: "Customer Success" },
    { id: "Customer Support", name: "Customer Support" },
    { id: "E-commerce", name: "E-commerce" },
    { id: "Productivity", name: "Productivity" },
    { id: "Finance", name: "Finance" },
  ]
  const integrationCategories = [...new Set(integrations.map((i) => i.category))]

  const filteredWorkflows = prebuiltWorkflows.filter((workflow) => {
    const matchesSearch =
      workflow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || workflow.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleSystem = (systemId: string) => {
    setSelectedSystems((prev) => (prev.includes(systemId) ? prev.filter((id) => id !== systemId) : [...prev, systemId]))
  }

  const handleSubmit = () => {
    setCurrentStep(3)
  }

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    // Auto-populate form with template data
    const template = prebuiltWorkflows.find((w) => w.id === templateId)
    if (template) {
      setDescription(template.description)
      setSelectedSystems(template.tags)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-900 border-green-200"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-900 border-yellow-200"
      case "Advanced":
        return "bg-red-100 text-red-900 border-red-200"
      default:
        return "bg-gray-100 text-gray-900 border-gray-200"
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

  // Pricing calculation functions
  const calculateTimeSaved = () => {
    if (!hoursSavedPerWeek || !workflowFrequency) return 0

    const frequencyMultiplier =
      {
        daily: 7,
        weekly: 1,
        monthly: 0.25,
      }[workflowFrequency] || 1

    return hoursSavedPerWeek * frequencyMultiplier
  }

  const calculateMonthlySavings = () => {
    const weeklyHours = calculateTimeSaved()
    const monthlyHours = weeklyHours * 4.33 // average weeks per month
    return hourlyRate ? monthlyHours * hourlyRate : 0
  }

  const calculateSuggestedPrice = () => {
    const monthlySavings = calculateMonthlySavings()
    if (!monthlySavings) return 0

    const goalMultiplier =
      {
        "Lead generation": 1.4,
        Sales: 1.5,
        Support: 1.2,
        "Admin tasks": 1.1,
        "Content creation": 1.3,
        Reporting: 1.2,
        Other: 1.2,
      }[goal] || 1.2

    return Math.ceil(monthlySavings * goalMultiplier * 0.3)
  }

  const getBusinessBenefit = () => {
    const benefits = {
      "Lead generation": "May help generate 3–5 additional leads per week",
      Sales: "Can improve conversion rates by ~20%",
      Support: "Can reduce response times by 60–80%",
      "Admin tasks": "Reduces manual workload significantly",
      "Content creation": "Accelerates content creation pipeline",
      Reporting: "Provides consistent updates automatically",
      Other: "Streamlines your workflow processes",
    }
    return benefits[goal] || ""
  }

  const goals = ["Lead generation", "Sales", "Support", "Admin tasks", "Content creation", "Reporting", "Other"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      <Navigation />

      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Start your{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  automation journey
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose from pre-built AI workflows or describe your custom automation needs
              </p>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex justify-center">
                <div className="bg-white border border-gray-200 rounded-lg p-1 inline-flex shadow-sm">
                  <Button
                    variant={activeTab === "templates" ? "default" : "ghost"}
                    onClick={() => setActiveTab("templates")}
                    className={`${
                      activeTab === "templates"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Pre-built Workflows
                  </Button>
                  <Button
                    variant={activeTab === "custom" ? "default" : "ghost"}
                    onClick={() => setActiveTab("custom")}
                    className={`${
                      activeTab === "custom"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Custom Automation
                  </Button>
                </div>
              </div>
            </motion.div>

            {activeTab === "templates" ? (
              /* Pre-built Workflows Section */
              <motion.div variants={itemVariants}>
                {/* Search and Filters */}
                <div className="mb-8">
                  <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        placeholder="Search workflows..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20"
                      >
                        {workflowCategories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      <div className="text-sm text-gray-500">{filteredWorkflows.length} workflows</div>
                    </div>
                  </div>
                </div>

                {/* Workflows Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredWorkflows.map((workflow, index) => (
                    <motion.div
                      key={workflow.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.03 }}
                      className="group"
                    >
                      <Card
                        className={`cursor-pointer transition-all duration-500 h-full relative overflow-hidden ${
                          selectedTemplate === workflow.id
                            ? "border-2 border-blue-500 bg-blue-50 shadow-xl"
                            : "border border-gray-200 bg-white hover:border-blue-300 hover:shadow-2xl"
                        }`}
                        onClick={() => handleTemplateSelect(workflow.id)}
                      >
                        {/* Background Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {workflow.popular && (
                          <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white shadow-lg font-medium z-10">
                            <Star className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}

                        {/* Default Card Content */}
                        <motion.div
                          className="relative z-10"
                          initial={false}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          whileHover={{
                            opacity: 0.3,
                            scale: 0.95,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <CardHeader className="pb-4">
                            <div className="flex items-start justify-between mb-3">
                              <motion.div
                                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${workflow.color} flex items-center justify-center shadow-sm`}
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                              >
                                <workflow.icon className="w-6 h-6 text-white" />
                              </motion.div>
                              <div className="text-right">
                                <div className="flex items-center text-xs text-gray-500 mb-1">
                                  <Star className="w-3 h-3 mr-1 text-yellow-500" />
                                  {workflow.popularity}
                                </div>
                                <div className="text-xs text-gray-400">{workflow.users} users</div>
                              </div>
                            </div>
                            <CardTitle className="text-lg text-gray-900 mb-2">{workflow.title}</CardTitle>
                            <p className="text-gray-600 text-sm leading-relaxed">{workflow.description}</p>
                          </CardHeader>
                          <CardContent>
                            {/* Tags */}
                            <div className="mb-4">
                              <div className="flex flex-wrap gap-1">
                                {workflow.tags.slice(0, 3).map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="outline"
                                    className="text-xs border-gray-300 bg-gray-50 text-gray-700"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                                {workflow.tags.length > 3 && (
                                  <Badge variant="outline" className="text-xs border-gray-300 bg-gray-50 text-gray-700">
                                    +{workflow.tags.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>

                            {/* Metadata */}
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                              <Badge className={getDifficultyColor(workflow.difficulty)}>{workflow.difficulty}</Badge>
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {workflow.setupTime}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className={`flex-1 ${
                                  selectedTemplate === workflow.id
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-gray-600 hover:bg-gray-700"
                                }`}
                              >
                                {selectedTemplate === workflow.id ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Selected
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-4 h-4 mr-1" />
                                    Use Template
                                  </>
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </motion.div>

                        {/* Animated Workflow Preview Overlay */}
                        <motion.div
                          className="absolute inset-0 p-6 flex flex-col justify-center items-center bg-white/95 backdrop-blur-sm"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <div className="w-full max-w-sm">
                            {/* Workflow Title */}
                            <motion.div
                              initial={{ opacity: 0, y: -20 }}
                              whileHover={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: 0.2 }}
                              className="text-center mb-6"
                            >
                              <h3 className="text-lg font-bold text-gray-900 mb-1">Workflow Preview</h3>
                              <p className="text-sm text-gray-600">{workflow.title}</p>
                            </motion.div>

                            {/* Animated Workflow Steps */}
                            <div className="space-y-3">
                              {/* Trigger */}
                              <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileHover={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex items-center"
                              >
                                <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0" />
                                <div className="ml-3 flex-1">
                                  <div className="text-xs font-medium text-gray-900">Trigger</div>
                                  <div className="text-xs text-gray-600 truncate">{workflow.workflow.trigger}</div>
                                </div>
                              </motion.div>

                              {/* Arrow */}
                              <motion.div
                                initial={{ opacity: 0, scaleY: 0 }}
                                whileHover={{ opacity: 1, scaleY: 1 }}
                                transition={{ duration: 0.3, delay: 0.5 }}
                                className="flex justify-center"
                              >
                                <ArrowRight className="w-4 h-4 text-gray-400 rotate-90" />
                              </motion.div>

                              {/* Steps */}
                              {workflow.workflow.steps.slice(0, 3).map((step, stepIndex) => (
                                <motion.div
                                  key={stepIndex}
                                  initial={{ opacity: 0, x: 50 }}
                                  whileHover={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.5, delay: 0.6 + stepIndex * 0.2 }}
                                  className="flex items-center"
                                >
                                  <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0" />
                                  <div className="ml-3 flex-1">
                                    <div className="text-xs font-medium text-gray-900">Step {stepIndex + 1}</div>
                                    <div className="text-xs text-gray-600 truncate">{step}</div>
                                  </div>
                                </motion.div>
                              ))}

                              {workflow.workflow.steps.length > 3 && (
                                <motion.div
                                  initial={{ opacity: 0, x: 50 }}
                                  whileHover={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.5, delay: 1.2 }}
                                  className="flex items-center justify-center"
                                >
                                  <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                    +{workflow.workflow.steps.length - 3} more steps
                                  </div>
                                </motion.div>
                              )}

                              {/* Final Arrow */}
                              <motion.div
                                initial={{ opacity: 0, scaleY: 0 }}
                                whileHover={{ opacity: 1, scaleY: 1 }}
                                transition={{ duration: 0.3, delay: 1.4 }}
                                className="flex justify-center"
                              >
                                <ArrowRight className="w-4 h-4 text-gray-400 rotate-90" />
                              </motion.div>

                              {/* Success */}
                              <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileHover={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 1.5 }}
                                className="flex items-center justify-center"
                              >
                                <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                                  <span className="text-xs font-medium text-green-800">Automation Complete</span>
                                </div>
                              </motion.div>
                            </div>

                            {/* Preview CTA */}
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              whileHover={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: 1.7 }}
                              className="mt-6 text-center"
                            >
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleTemplateSelect(workflow.id)
                                }}
                              >
                                <Sparkles className="w-4 h-4 mr-2" />
                                Use This Workflow
                              </Button>
                            </motion.div>
                          </div>
                        </motion.div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Continue with Template */}
                {selectedTemplate && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <Card className="bg-blue-50 border border-blue-200 shadow-lg max-w-md mx-auto">
                      <CardContent className="p-6">
                        <CheckCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Template Selected!</h3>
                        <p className="text-gray-600 mb-6">
                          Ready to set up your {prebuiltWorkflows.find((w) => w.id === selectedTemplate)?.title}{" "}
                          automation
                        </p>
                        <Link href="/integrations">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
                            Continue to Integrations
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            ) : /* Custom Automation Section */
            currentStep === 3 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <Card className="bg-white border border-gray-200 shadow-xl max-w-md mx-auto">
                  <CardContent className="p-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-8 h-8 text-white" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Request Submitted!</h2>
                    <p className="text-gray-600 mb-6">
                      We've received your automation request and will get back to you within 24 hours with a custom
                      solution.
                    </p>
                    <div className="space-y-3">
                      <Link href="/dashboard">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">Go to Dashboard</Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="w-full border-gray-300 hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                        onClick={() => setCurrentStep(1)}
                      >
                        Submit Another Request
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="space-y-8">
                {/* Progress Indicator */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        1
                      </div>
                      <span className="ml-2 text-gray-900 font-medium">Describe</span>
                    </div>
                    <div className="w-16 h-0.5 bg-blue-600"></div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        2
                      </div>
                      <span className="ml-2 text-gray-900 font-medium">Configure</span>
                    </div>
                    <div className="w-16 h-0.5 bg-gray-300"></div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm font-bold">
                        3
                      </div>
                      <span className="ml-2 text-gray-500 font-medium">Submit</span>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Column - Main Form */}
                  <div className="space-y-6">
                    {/* Description Card */}
                    <motion.div variants={itemVariants}>
                      <Card className="bg-white border border-gray-200 shadow-sm">
                        <CardHeader className="pb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                              <Zap className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-xl text-gray-900">Describe Your Automation</CardTitle>
                              <p className="text-gray-600 text-sm">Tell us what you want to automate</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="relative">
                            <Textarea
                              placeholder="✨ Example: When someone fills out our contact form, I want to automatically create a new contact in HubSpot, send them a personalized welcome email series, and notify our sales team in Slack with their details and lead score..."
                              className="min-h-[180px] text-base bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg resize-none"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                              {description.length}/1000
                            </div>
                          </div>
                          <div className="mt-3 flex items-center space-x-2 text-sm text-gray-600">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Be specific about triggers, actions, and conditions for best results</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Value Estimation Inputs */}
                    <motion.div variants={itemVariants}>
                      <Card className="bg-white border border-gray-200 shadow-sm">
                        <CardHeader className="pb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                              <BarChart className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-xl text-gray-900">Value Estimation</CardTitle>
                              <p className="text-gray-600 text-sm">Help us calculate the value of your automation</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                Hours saved per week
                              </Label>
                              <Input
                                type="number"
                                placeholder="e.g. 5"
                                value={hoursSavedPerWeek || ""}
                                onChange={(e) => setHoursSavedPerWeek(Number(e.target.value))}
                                className="bg-gray-50 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20"
                              />
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                Your hourly rate (DKK) <span className="text-gray-400">- optional</span>
                              </Label>
                              <Input
                                type="number"
                                placeholder="e.g. 500"
                                value={hourlyRate || ""}
                                onChange={(e) => setHourlyRate(Number(e.target.value))}
                                className="bg-gray-50 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20"
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                How often do you perform this task?
                              </Label>
                              <select
                                value={workflowFrequency}
                                onChange={(e) => setWorkflowFrequency(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500/20"
                              >
                                <option value="">Select frequency</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                              </select>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                Primary goal of this automation
                              </Label>
                              <select
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500/20"
                              >
                                <option value="">Select goal</option>
                                {goals.map((goalOption) => (
                                  <option key={goalOption} value={goalOption}>
                                    {goalOption}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Tone of Voice Card */}
                    <motion.div variants={itemVariants}>
                      <Card className="bg-white border border-gray-200 shadow-sm">
                        <CardHeader className="pb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                              <MessageSquare className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-xl text-gray-900">Communication Style</CardTitle>
                              <p className="text-gray-600 text-sm">How should your automation communicate?</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 gap-3">
                            {tones.map((tone) => (
                              <motion.div key={tone.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Card
                                  className={`cursor-pointer transition-all duration-300 ${
                                    toneOfVoice === tone.id
                                      ? "border-2 border-indigo-500 bg-indigo-50 shadow-md"
                                      : "border border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-white"
                                  }`}
                                  onClick={() => setToneOfVoice(tone.id)}
                                >
                                  <CardContent className="p-4">
                                    <div className="flex items-center space-x-3">
                                      <div
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                          toneOfVoice === tone.id ? "bg-indigo-600" : "bg-gray-400"
                                        }`}
                                      >
                                        <tone.icon className="w-4 h-4 text-white" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="font-medium text-gray-900">{tone.name}</div>
                                        <div className="text-sm text-gray-600">{tone.description}</div>
                                      </div>
                                      {toneOfVoice === tone.id && <CheckCircle className="w-5 h-5 text-indigo-600" />}
                                    </div>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Automation Type Card */}
                    <motion.div variants={itemVariants}>
                      <Card className="bg-white border border-gray-200 shadow-sm">
                        <CardHeader className="pb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                              <Settings className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-xl text-gray-900">Automation Type</CardTitle>
                              <p className="text-gray-600 text-sm">How often should this run?</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  isOngoing ? "bg-green-600" : "bg-gray-400"
                                }`}
                              >
                                {isOngoing ? (
                                  <Zap className="w-4 h-4 text-white" />
                                ) : (
                                  <Clock className="w-4 h-4 text-white" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {isOngoing ? "Ongoing Automation" : "One-time Automation"}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {isOngoing ? "Runs continuously when triggered" : "Runs once and stops"}
                                </div>
                              </div>
                            </div>
                            <Switch
                              checked={isOngoing}
                              onCheckedChange={setIsOngoing}
                              className="data-[state=checked]:bg-green-600"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Right Column - Integration Selection */}
                  <div className="space-y-6">
                    <motion.div variants={itemVariants}>
                      <Card className="bg-white border border-gray-200 shadow-sm">
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                                <Database className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-xl text-gray-900">Select Integrations</CardTitle>
                                <p className="text-gray-600 text-sm">Choose the tools to connect</p>
                              </div>
                            </div>
                            {selectedSystems.length > 0 && (
                              <Badge className="bg-blue-600 text-white">{selectedSystems.length} selected</Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="max-h-[600px] overflow-y-auto custom-scrollbar">
                          <div className="space-y-4">
                            {integrationCategories.map((category) => {
                              const categoryIntegrations = integrations.filter(
                                (integration) => integration.category === category,
                              )
                              return (
                                <div key={category} className="space-y-3">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                      {category}
                                    </h3>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    {categoryIntegrations.map((integration) => {
                                      if (!integration.icon) return null
                                      return (
                                        <motion.div
                                          key={integration.id}
                                          whileHover={{ scale: 1.02 }}
                                          whileTap={{ scale: 0.98 }}
                                        >
                                          <Card
                                            className={`cursor-pointer transition-all duration-200 ${
                                              selectedSystems.includes(integration.id)
                                                ? "border-2 border-blue-500 bg-blue-50 shadow-md"
                                                : "border border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-white"
                                            }`}
                                            onClick={() => toggleSystem(integration.id)}
                                          >
                                            <CardContent className="p-3">
                                              <div className="flex items-center space-x-2">
                                                <div
                                                  className={`w-6 h-6 rounded-md flex items-center justify-center ${
                                                    selectedSystems.includes(integration.id)
                                                      ? "bg-blue-600"
                                                      : "bg-gray-400"
                                                  }`}
                                                >
                                                  <integration.icon className="w-3 h-3 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                  <div className="text-xs font-medium text-gray-900 truncate">
                                                    {integration.name}
                                                  </div>
                                                </div>
                                                {selectedSystems.includes(integration.id) && (
                                                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                                )}
                                              </div>
                                            </CardContent>
                                          </Card>
                                        </motion.div>
                                      )
                                    })}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </div>

                {/* Dynamic Value Insight Card */}
                {(hoursSavedPerWeek > 0 || hourlyRate > 0 || workflowFrequency || goal) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                  >
                    <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 border border-emerald-200 shadow-lg backdrop-blur-sm">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center">
                              <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-xl text-gray-900">Automation Value Analysis</CardTitle>
                              <p className="text-gray-600 text-sm">Real-time estimation based on your inputs</p>
                            </div>
                          </div>
                          {calculateMonthlySavings() > 0 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowAnnualValue(!showAnnualValue)}
                              className="border-emerald-300 bg-white/80 text-emerald-700 hover:bg-emerald-50"
                            >
                              {showAnnualValue ? "Monthly" : "Annual"} View
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {/* Time Saved */}
                          {hoursSavedPerWeek > 0 && workflowFrequency && (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                              className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                            >
                              <div className="flex items-center space-x-2 mb-2">
                                <Clock className="w-5 h-5 text-emerald-600" />
                                <h3 className="font-semibold text-gray-900">Time Saved</h3>
                              </div>
                              <p className="text-2xl font-bold text-emerald-600">{calculateTimeSaved().toFixed(1)}h</p>
                              <p className="text-sm text-gray-600">per week</p>
                            </motion.div>
                          )}

                          {/* Value Saved */}
                          {calculateMonthlySavings() > 0 && (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                            >
                              <div className="flex items-center space-x-2 mb-2">
                                <DollarSign className="w-5 h-5 text-blue-600" />
                                <h3 className="font-semibold text-gray-900">Value Saved</h3>
                              </div>
                              <p className="text-2xl font-bold text-blue-600">
                                {showAnnualValue
                                  ? `${(calculateMonthlySavings() * 12).toLocaleString()} kr`
                                  : `${calculateMonthlySavings().toLocaleString()} kr`}
                              </p>
                              <p className="text-sm text-gray-600">{showAnnualValue ? "per year" : "per month"}</p>
                            </motion.div>
                          )}

                          {/* Business Benefit */}
                          {goal && (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.3 }}
                              className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                            >
                              <div className="flex items-center space-x-2 mb-2">
                                <Target className="w-5 h-5 text-purple-600" />
                                <h3 className="font-semibold text-gray-900">Business Impact</h3>
                              </div>
                              <p className="text-sm text-gray-700 leading-relaxed">{getBusinessBenefit()}</p>
                            </motion.div>
                          )}

                          {/* Suggested Price */}
                          {calculateSuggestedPrice() > 0 && (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.4 }}
                              className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                            >
                              <div className="flex items-center space-x-2 mb-2">
                                <Sparkles className="w-5 h-5 text-orange-600" />
                                <h3 className="font-semibold text-gray-900">Estimated Price</h3>
                              </div>
                              <p className="text-2xl font-bold text-orange-600">
                                {calculateSuggestedPrice().toLocaleString()} kr
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                Based on {showAnnualValue ? "annual" : "monthly"} value
                              </p>
                            </motion.div>
                          )}
                        </div>

                        {/* ROI Explanation */}
                        {calculateMonthlySavings() > 0 && calculateSuggestedPrice() > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 p-4 bg-white/40 backdrop-blur-sm rounded-lg border border-white/30"
                          >
                            <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">ROI Analysis</h4>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                  This automation saves you approximately{" "}
                                  <span className="font-semibold text-emerald-600">
                                    {(calculateTimeSaved() * 4.33 * (showAnnualValue ? 12 : 1)).toFixed(0)} hours
                                  </span>{" "}
                                  {showAnnualValue ? "annually" : "monthly"}, worth{" "}
                                  <span className="font-semibold text-blue-600">
                                    {showAnnualValue
                                      ? `${(calculateMonthlySavings() * 12).toLocaleString()} kr/year`
                                      : `${calculateMonthlySavings().toLocaleString()} kr/month`}
                                  </span>
                                  . The suggested price of{" "}
                                  <span className="font-semibold text-orange-600">
                                    {calculateSuggestedPrice().toLocaleString()} kr
                                  </span>{" "}
                                  represents excellent value, paying for itself in{" "}
                                  <span className="font-semibold">
                                    {Math.ceil(calculateSuggestedPrice() / calculateMonthlySavings())} months
                                  </span>
                                  .
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Selected Integrations Summary */}
                {selectedSystems.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="bg-blue-50 border border-blue-200 shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">Selected Integrations</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedSystems.map((systemId) => {
                            const system = integrations.find((s) => s.id === systemId)
                            if (!system) return null
                            return (
                              <motion.div
                                key={systemId}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                              >
                                <Badge className="bg-blue-100 text-blue-800 border border-blue-200 px-3 py-1">
                                  <system.icon className="w-3 h-3 mr-1" />
                                  {system.name}
                                </Badge>
                              </motion.div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.div variants={itemVariants} className="pt-6">
                  <div className="text-center space-y-4">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={handleSubmit}
                        disabled={!description.trim() || selectedSystems.length === 0 || !toneOfVoice}
                        className="w-full max-w-md mx-auto bg-blue-600 hover:bg-blue-700 text-lg py-6 shadow-lg rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Sparkles className="mr-3 w-5 h-5" />
                        Create My Automation
                        <ArrowRight className="ml-3 w-5 h-5" />
                      </Button>
                    </motion.div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>We'll review your request and get back to you within 24 hours</span>
                    </div>
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Shield className="w-3 h-3" />
                        <span>Secure & Private</span>
                      </div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="flex items-center space-x-1">
                        <Zap className="w-3 h-3" />
                        <span>AI-Powered</span>
                      </div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>Expert Support</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
