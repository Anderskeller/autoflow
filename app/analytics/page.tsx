"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import {
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  Send,
  Bot,
  BarChart3,
  LineChart,
  Zap,
  TrendingUp,
} from "lucide-react"

export default function AnalyticsPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState("1")
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([
    {
      type: "ai",
      message:
        "Hi! I'm your AI assistant. I can help you analyze and optimize your automation workflows. What would you like to know?",
      timestamp: "Just now",
    },
  ])

  const workflows = [
    { id: "1", name: "Lead Qualification Automation" },
    { id: "2", name: "Customer Onboarding Flow" },
    { id: "3", name: "Content Distribution Pipeline" },
  ]

  const metrics = [
    {
      label: "Total Runs",
      value: "47",
      change: "+12%",
      icon: Activity,
      color: "from-cyan-500 to-blue-500",
    },
    {
      label: "Success Rate",
      value: "98%",
      change: "+2%",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Avg Runtime",
      value: "2.3s",
      change: "-0.5s",
      icon: Clock,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Error Rate",
      value: "2%",
      change: "-1%",
      icon: AlertTriangle,
      color: "from-orange-500 to-red-500",
    },
  ]

  const recentRuns = [
    { id: 1, status: "success", timestamp: "2 minutes ago", runtime: "1.8s", trigger: "New form submission" },
    { id: 2, status: "success", timestamp: "15 minutes ago", runtime: "2.1s", trigger: "New form submission" },
    {
      id: 3,
      status: "error",
      timestamp: "1 hour ago",
      runtime: "0.5s",
      trigger: "API timeout",
      error: "HubSpot API timeout",
    },
    { id: 4, status: "success", timestamp: "2 hours ago", runtime: "2.3s", trigger: "New form submission" },
    { id: 5, status: "success", timestamp: "3 hours ago", runtime: "1.9s", trigger: "New form submission" },
  ]

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return

    const newMessage = {
      type: "user",
      message: chatMessage,
      timestamp: "Just now",
    }

    setChatHistory((prev) => [...prev, newMessage])

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        type: "ai",
        message:
          "Based on your workflow data, I notice your success rate is excellent at 98%. To improve further, consider adding retry logic for the 2% of failed runs, which are mostly due to API timeouts. You could also optimize performance by batching similar operations.",
        timestamp: "Just now",
      }
      setChatHistory((prev) => [...prev, aiResponse])
    }, 1000)

    setChatMessage("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200"
      case "error":
        return "bg-red-100 text-red-800 border-red-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white">
      <Navigation />

      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Automation{" "}
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      Analytics
                    </span>
                  </h1>
                  <p className="text-xl text-gray-400">Monitor performance and optimize your workflows</p>
                </div>
                <div className="md:w-64">
                  <Select value={selectedWorkflow} onValueChange={setSelectedWorkflow}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                      <SelectValue placeholder="Select workflow" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {workflows.map((workflow) => (
                        <SelectItem key={workflow.id} value={workflow.id} className="text-white hover:bg-gray-700">
                          {workflow.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>

            {/* Metrics Grid */}
            <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric, index) => (
                <motion.div key={metric.label} whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
                          <p className="text-3xl font-bold text-white">{metric.value}</p>
                          <p
                            className={`text-sm mt-1 ${metric.change.startsWith("+") ? "text-green-400" : metric.change.startsWith("-") && metric.label !== "Error Rate" ? "text-red-400" : "text-green-400"}`}
                          >
                            {metric.change} this week
                          </p>
                        </div>
                        <motion.div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${metric.color} flex items-center justify-center`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <metric.icon className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Workflow Success Insights Section */}
            <motion.div variants={itemVariants} className="mt-12">
              <h2 className="text-3xl font-bold mb-8 text-center">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Workflow Success Insights
                </span>
              </h2>

              {/* Success Metrics Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Hours Saved */}
                <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Estimated Hours Saved</p>
                          <p className="text-3xl font-bold text-white">84</p>
                          <p className="text-sm text-green-400 mt-1">hours this month</p>
                        </div>
                        <motion.div
                          className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Clock className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Value Created */}
                <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Estimated Value Created</p>
                          <p className="text-3xl font-bold text-white">DKK 10,500</p>
                          <p className="text-sm text-green-400 mt-1">@ DKK 125/hour</p>
                        </div>
                        <motion.div
                          className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <TrendingUp className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Manual Effort Avoided */}
                <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Manual Effort Avoided</p>
                          <p className="text-3xl font-bold text-white">320</p>
                          <p className="text-sm text-green-400 mt-1">tasks automated</p>
                        </div>
                        <motion.div
                          className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Zap className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Workflow Efficiency */}
                <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Workflow Efficiency</p>
                          <p className="text-3xl font-bold text-white">95%</p>
                          <p className="text-sm text-green-400 mt-1">success rate</p>
                        </div>
                        <motion.div
                          className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <CheckCircle className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Before vs After Comparison Chart */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <BarChart3 className="w-5 h-5" />
                    Before vs After Automation Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Before Automation */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white mb-4">Before Automation</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-red-900/20 rounded-lg border border-red-500/30">
                          <span className="text-gray-300">Daily Manual Tasks</span>
                          <span className="text-red-400 font-bold">12 tasks</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-900/20 rounded-lg border border-red-500/30">
                          <span className="text-gray-300">Time Spent Daily</span>
                          <span className="text-red-400 font-bold">3.2 hours</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-900/20 rounded-lg border border-red-500/30">
                          <span className="text-gray-300">Error Rate</span>
                          <span className="text-red-400 font-bold">15%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-900/20 rounded-lg border border-red-500/30">
                          <span className="text-gray-300">Monthly Cost</span>
                          <span className="text-red-400 font-bold">DKK 12,000</span>
                        </div>
                      </div>
                    </div>

                    {/* After Automation */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white mb-4">After Automation</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                          <span className="text-gray-300">Automated Tasks</span>
                          <span className="text-green-400 font-bold">11 tasks</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                          <span className="text-gray-300">Time Spent Daily</span>
                          <span className="text-green-400 font-bold">0.3 hours</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                          <span className="text-gray-300">Error Rate</span>
                          <span className="text-green-400 font-bold">2%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                          <span className="text-gray-300">Monthly Cost</span>
                          <span className="text-green-400 font-bold">DKK 1,500</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Progress Bars */}
                  <div className="mt-8 space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Time Efficiency Improvement</span>
                        <span className="text-sm text-green-400">91% reduction</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <motion.div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "91%" }}
                          transition={{ duration: 2, delay: 0.5 }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Cost Savings</span>
                        <span className="text-sm text-green-400">87% reduction</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <motion.div
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "87%" }}
                          transition={{ duration: 2, delay: 0.7 }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Error Reduction</span>
                        <span className="text-sm text-green-400">87% improvement</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <motion.div
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "87%" }}
                          transition={{ duration: 2, delay: 0.9 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-lg border border-green-500/30">
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-white mb-2">Total Impact Summary</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-2xl font-bold text-green-400">84h</p>
                          <p className="text-xs text-gray-400">Time Saved</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-400">DKK 10.5K</p>
                          <p className="text-xs text-gray-400">Value Created</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-400">320</p>
                          <p className="text-xs text-gray-400">Tasks Automated</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-400">95%</p>
                          <p className="text-xs text-gray-400">Success Rate</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Charts and Logs */}
              <div className="lg:col-span-2 space-y-8">
                {/* Performance Chart */}
                <motion.div variants={itemVariants}>
                  <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <BarChart3 className="w-5 h-5" />
                        Performance Over Time
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-gray-900/30 rounded-lg border border-gray-700/30 flex items-center justify-center">
                        <div className="text-center">
                          <LineChart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                          <p className="text-gray-400">Chart visualization would go here</p>
                          <p className="text-sm text-gray-500">Integration with Chart.js or similar</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Recent Runs */}
                <motion.div variants={itemVariants}>
                  <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Activity className="w-5 h-5" />
                        Recent Runs
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentRuns.map((run, index) => (
                          <motion.div
                            key={run.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg border border-gray-700/30"
                          >
                            <div className="flex items-center gap-4">
                              <Badge className={getStatusColor(run.status)}>
                                {run.status === "success" ? (
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                ) : (
                                  <AlertTriangle className="w-4 h-4 mr-1" />
                                )}
                                {run.status}
                              </Badge>
                              <div>
                                <p className="text-sm text-white">{run.trigger}</p>
                                {run.error && <p className="text-xs text-red-400">{run.error}</p>}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-400">{run.timestamp}</p>
                              <p className="text-xs text-gray-500">{run.runtime}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* AI Assistant Chat */}
              <div>
                <motion.div variants={itemVariants}>
                  <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg h-[600px] flex flex-col">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Bot className="w-5 h-5" />
                        AI Assistant
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      {/* Chat History */}
                      <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
                        {chatHistory.map((message, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] p-3 rounded-lg ${
                                message.type === "user"
                                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                                  : "bg-gray-900/50 border border-gray-700/50 text-gray-300"
                              }`}
                            >
                              <p className="text-sm">{message.message}</p>
                              <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Chat Input */}
                      <div className="flex gap-2">
                        <Textarea
                          placeholder="Ask me how to improve this workflow..."
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          className="flex-1 min-h-[60px] bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 resize-none"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              handleSendMessage()
                            }
                          }}
                        />
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            onClick={handleSendMessage}
                            disabled={!chatMessage.trim()}
                            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-purple-500/25"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
