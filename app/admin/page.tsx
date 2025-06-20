"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import {
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  MessageSquare,
  Database,
  FileText,
  Calendar,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)

  const requests = [
    {
      id: "req-001",
      userName: "Sarah Chen",
      userEmail: "sarah@techstart.com",
      description:
        "Automate lead qualification process: When someone fills out our contact form, check if they match our ICP criteria, score them, and if score > 80, create a deal in HubSpot and notify sales team in Slack.",
      connectedSystems: ["Gmail", "HubSpot", "Slack", "Typeform"],
      status: "waiting",
      createdAt: "2024-01-15T10:30:00Z",
      priority: "high",
      estimatedHours: 8,
    },
    {
      id: "req-002",
      userName: "Marcus Johnson",
      userEmail: "marcus@growthco.io",
      description:
        "Set up automated customer onboarding: When payment is successful in Stripe, send welcome email series, create Notion page for customer, add to Slack channel, and schedule follow-up call.",
      connectedSystems: ["Stripe", "Gmail", "Notion", "Slack", "Calendar"],
      status: "in_progress",
      createdAt: "2024-01-14T14:20:00Z",
      priority: "medium",
      estimatedHours: 12,
    },
    {
      id: "req-003",
      userName: "Elena Rodriguez",
      userEmail: "elena@marketpro.com",
      description:
        "Automate content distribution: When new blog post is published in our CMS, automatically share on social media, send to email subscribers, and update our content calendar.",
      connectedSystems: ["WordPress", "Twitter", "LinkedIn", "Mailchimp"],
      status: "done",
      createdAt: "2024-01-12T09:15:00Z",
      priority: "low",
      estimatedHours: 6,
    },
    {
      id: "req-004",
      userName: "David Kim",
      userEmail: "david@startupxyz.com",
      description:
        "Customer support automation: Route support tickets based on keywords, assign to appropriate team member, create Notion task, and send acknowledgment email to customer.",
      connectedSystems: ["Zendesk", "Slack", "Notion", "Gmail"],
      status: "waiting",
      createdAt: "2024-01-16T16:45:00Z",
      priority: "high",
      estimatedHours: 10,
    },
    {
      id: "req-005",
      userName: "Lisa Wang",
      userEmail: "lisa@ecommerce.store",
      description:
        "Inventory management automation: When product stock falls below threshold, automatically reorder from supplier, update inventory in Shopify, and notify warehouse team.",
      connectedSystems: ["Shopify", "Gmail", "Slack", "Google Sheets"],
      status: "in_progress",
      createdAt: "2024-01-13T11:30:00Z",
      priority: "medium",
      estimatedHours: 15,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "waiting":
        return <Clock className="w-4 h-4" />
      case "in_progress":
        return <AlertCircle className="w-4 h-4" />
      case "done":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "done":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSystemIcon = (system: string) => {
    const iconMap: { [key: string]: any } = {
      Gmail: Mail,
      Slack: MessageSquare,
      HubSpot: Database,
      Typeform: FileText,
      Notion: FileText,
      Calendar: Calendar,
      Stripe: Database,
      WordPress: FileText,
      Twitter: MessageSquare,
      LinkedIn: MessageSquare,
      Mailchimp: Mail,
      Zendesk: MessageSquare,
      Shopify: Database,
      "Google Sheets": FileText,
    }
    const IconComponent = iconMap[system] || Database
    return <IconComponent className="w-4 h-4" />
  }

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: requests.length,
    waiting: requests.filter((r) => r.status === "waiting").length,
    inProgress: requests.filter((r) => r.status === "in_progress").length,
    done: requests.filter((r) => r.status === "done").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Navigation />

      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Admin <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-600">Manage automation requests and track progress</p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Total Requests", value: stats.total, color: "from-blue-500 to-blue-600", icon: FileText },
              { label: "Waiting", value: stats.waiting, color: "from-yellow-500 to-yellow-600", icon: Clock },
              {
                label: "In Progress",
                value: stats.inProgress,
                color: "from-orange-500 to-orange-600",
                icon: AlertCircle,
              },
              { label: "Completed", value: stats.done, color: "from-green-500 to-green-600", icon: CheckCircle },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
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
          </div>

          {/* Filters */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search requests..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="md:w-48">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="waiting">Waiting</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Requests List */}
          <div className="space-y-6">
            {filteredRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{request.userName}</CardTitle>
                          <p className="text-sm text-gray-600">{request.userEmail}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(request.createdAt).toLocaleDateString()} • {request.estimatedHours}h estimated
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusIcon(request.status)}
                          <span className="ml-1 capitalize">{request.status.replace("_", " ")}</span>
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Automation Description:</h4>
                      <p className="text-gray-700 leading-relaxed">{request.description}</p>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Connected Systems:</h4>
                      <div className="flex flex-wrap gap-2">
                        {request.connectedSystems.map((system) => (
                          <Badge key={system} variant="outline" className="flex items-center">
                            {getSystemIcon(system)}
                            <span className="ml-1">{system}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-sm text-gray-500">Request ID: {request.id}</div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Update Status
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredRequests.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No requests found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
