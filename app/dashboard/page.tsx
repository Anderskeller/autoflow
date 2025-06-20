"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import {
  Plus,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  Mail,
  MessageSquare,
  Database,
  FileText,
  MoreHorizontal,
  TrendingUp,
  Users,
  Activity,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [userName] = useState("Anders")

  const workflows = [
    {
      id: 1,
      title: "Lead Qualification Automation",
      description: "Automatically score and route new leads from contact forms",
      status: "active",
      connectedSystems: ["Gmail", "HubSpot", "Slack"],
      createdDate: "2024-01-15",
      runs: 47,
      successRate: 98,
    },
    {
      id: 2,
      title: "Customer Onboarding Flow",
      description: "Welcome new customers with email series and setup tasks",
      status: "in_progress",
      connectedSystems: ["Stripe", "Gmail", "Notion"],
      createdDate: "2024-01-12",
      runs: 23,
      successRate: 100,
    },
    {
      id: 3,
      title: "Content Distribution Pipeline",
      description: "Share new blog posts across social media and email",
      status: "pending",
      connectedSystems: ["WordPress", "Twitter", "Mailchimp"],
      createdDate: "2024-01-10",
      runs: 0,
      successRate: 0,
    },
  ]

  const notifications = [
    {
      id: 1,
      type: "success",
      message: "Automation #1 processed 5 new leads successfully",
      time: "2 minutes ago",
    },
    {
      id: 2,
      type: "info",
      message: "Automation #3 is ready for testing",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "warning",
      message: "HubSpot connection needs re-authorization",
      time: "3 hours ago",
    },
  ]

  const stats = [
    {
      label: "Active Workflows",
      value: "3",
      change: "+1",
      icon: Zap,
      color: "from-cyan-500 to-blue-500",
    },
    {
      label: "Total Runs",
      value: "70",
      change: "+12",
      icon: Activity,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Success Rate",
      value: "99%",
      change: "+2%",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Time Saved",
      value: "24h",
      change: "+6h",
      icon: Clock,
      color: "from-orange-500 to-red-500",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />
      case "in_progress":
        return <Clock className="w-4 h-4" />
      case "pending":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSystemIcon = (system: string) => {
    const iconMap: { [key: string]: any } = {
      Gmail: Mail,
      Slack: MessageSquare,
      HubSpot: Database,
      Notion: FileText,
      Stripe: Database,
      WordPress: FileText,
      Twitter: MessageSquare,
      Mailchimp: Mail,
    }
    const IconComponent = iconMap[system] || Database
    return <IconComponent className="w-4 h-4" />
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      case "info":
        return <Clock className="w-5 h-5 text-blue-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Hi {userName} 👋{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Ready to automate?
                </span>
              </h1>
              <p className="text-xl text-gray-400">Here's what's happening with your workflows</p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div key={stat.label} whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                          <p className="text-3xl font-bold text-white">{stat.value}</p>
                          <p className="text-sm text-green-400 mt-1">{stat.change} this week</p>
                        </div>
                        <motion.div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <stat.icon className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Workflows */}
              <div className="lg:col-span-2">
                <motion.div variants={itemVariants} className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Your Workflows</h2>
                  <Link href="/automation-request">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-purple-500/25">
                        <Plus className="w-4 h-4 mr-2" />
                        Request New Automation
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>

                <div className="space-y-6">
                  {workflows.map((workflow, index) => (
                    <motion.div
                      key={workflow.id}
                      variants={itemVariants}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <CardTitle className="text-lg text-white">{workflow.title}</CardTitle>
                                <Badge className={getStatusColor(workflow.status)}>
                                  {getStatusIcon(workflow.status)}
                                  <span className="ml-1 capitalize">{workflow.status.replace("_", " ")}</span>
                                </Badge>
                              </div>
                              <p className="text-gray-400 text-sm">{workflow.description}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span>Created {workflow.createdDate}</span>
                              <span>•</span>
                              <span>{workflow.runs} runs</span>
                              <span>•</span>
                              <span>{workflow.successRate}% success</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-400">Connected:</span>
                              <div className="flex gap-1">
                                {workflow.connectedSystems.map((system) => (
                                  <Badge
                                    key={system}
                                    variant="outline"
                                    className="flex items-center text-xs border-gray-600"
                                  >
                                    {getSystemIcon(system)}
                                    <span className="ml-1">{system}</span>
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Link href={`/analytics?workflow=${workflow.id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-600 hover:bg-gray-700/50 text-gray-300 hover:text-white"
                              >
                                View Analytics
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Notifications */}
              <div>
                <motion.div variants={itemVariants}>
                  <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
                  <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {notifications.map((notification, index) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3 p-3 rounded-lg bg-gray-900/30 border border-gray-700/30"
                          >
                            {getNotificationIcon(notification.type)}
                            <div className="flex-1">
                              <p className="text-sm text-gray-300">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Quick Actions */}
                <motion.div variants={itemVariants} className="mt-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link href="/request">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="outline"
                          className="w-full justify-start border-gray-600 hover:bg-gray-700/50 text-gray-300 hover:text-white"
                        >
                          <Users className="w-4 h-4 mr-2" />
                          Request Automation
                        </Button>
                      </motion.div>
                    </Link>
                    <Link href="/analytics">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="outline"
                          className="w-full justify-start border-gray-600 hover:bg-gray-700/50 text-gray-300 hover:text-white"
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          View All Analytics
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
