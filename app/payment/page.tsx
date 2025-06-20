"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Check, Crown, Zap, Shield, ArrowRight, CreditCard } from "lucide-react"

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState("pro")
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: isAnnual ? 249 : 299,
      originalPrice: isAnnual ? 299 : null,
      description: "Perfect for small teams getting started",
      icon: Zap,
      features: [
        "Up to 5 automations",
        "Basic integrations (Gmail, Slack)",
        "Email support",
        "Monthly optimization review",
        "Basic analytics dashboard",
        "Community access",
      ],
      popular: false,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "pro",
      name: "Pro",
      price: isAnnual ? 599 : 699,
      originalPrice: isAnnual ? 699 : null,
      description: "Advanced automation for growing businesses",
      icon: Crown,
      features: [
        "Unlimited automations",
        "All integrations included",
        "Priority support (24/7)",
        "Weekly optimization reviews",
        "Custom workflow builder",
        "Advanced analytics & reporting",
        "API access",
        "Team collaboration tools",
        "White-label options",
      ],
      popular: true,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for large organizations",
      icon: Shield,
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Custom integrations built",
        "SLA guarantee (99.9% uptime)",
        "Advanced security & compliance",
        "On-premise deployment option",
        "Training & onboarding",
        "Custom contract terms",
        "Priority feature requests",
      ],
      popular: false,
      color: "from-gray-500 to-gray-600",
    },
  ]

  const comparisonFeatures = [
    {
      category: "Automations",
      features: [
        { name: "Number of automations", starter: "5", pro: "Unlimited", enterprise: "Unlimited" },
        { name: "Workflow complexity", starter: "Basic", pro: "Advanced", enterprise: "Enterprise" },
        { name: "Custom triggers", starter: "❌", pro: "✅", enterprise: "✅" },
        { name: "Conditional logic", starter: "Basic", pro: "Advanced", enterprise: "Advanced" },
      ],
    },
    {
      category: "Integrations",
      features: [
        { name: "Pre-built integrations", starter: "10+", pro: "50+", enterprise: "50+" },
        { name: "Custom integrations", starter: "❌", pro: "❌", enterprise: "✅" },
        { name: "API access", starter: "❌", pro: "✅", enterprise: "✅" },
        { name: "Webhooks", starter: "❌", pro: "✅", enterprise: "✅" },
      ],
    },
    {
      category: "Support",
      features: [
        { name: "Response time", starter: "48h", pro: "4h", enterprise: "1h" },
        { name: "Support channels", starter: "Email", pro: "Email, Chat", enterprise: "Phone, Email, Chat" },
        { name: "Dedicated manager", starter: "❌", pro: "❌", enterprise: "✅" },
        { name: "Training included", starter: "❌", pro: "❌", enterprise: "✅" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Navigation />

      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Choose your <span className="gradient-text">plan</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Start automating your business today. All plans include a 14-day free trial.
            </p>

            {/* Annual/Monthly Toggle */}
            <div className="flex items-center justify-center mb-8">
              <span className={`mr-3 ${!isAnnual ? "font-semibold" : "text-gray-500"}`}>Monthly</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAnnual ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={`ml-3 ${isAnnual ? "font-semibold" : "text-gray-500"}`}>
                Annual
                <Badge className="ml-2 bg-green-100 text-green-800">Save 20%</Badge>
              </span>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card
                  className={`relative h-full cursor-pointer transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? "border-2 border-blue-500 shadow-xl"
                      : plan.popular
                        ? "border-2 border-purple-500 shadow-xl"
                        : "border shadow-lg hover:shadow-xl"
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <plan.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        {plan.originalPrice && (
                          <span className="text-lg text-gray-400 line-through mr-2">{plan.originalPrice} kr</span>
                        )}
                        <span className="text-4xl font-bold">
                          {typeof plan.price === "number" ? `${plan.price} kr` : plan.price}
                        </span>
                      </div>
                      {typeof plan.price === "number" && (
                        <span className="text-gray-600">/{isAnnual ? "year" : "month"}</span>
                      )}
                    </div>
                    <p className="text-gray-600 mt-2">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${
                        selectedPlan === plan.id || plan.popular
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          : ""
                      }`}
                      variant={selectedPlan === plan.id || plan.popular ? "default" : "outline"}
                    >
                      {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                      {plan.price !== "Custom" && <CreditCard className="ml-2 w-4 h-4" />}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Feature Comparison Table */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Feature Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-4 px-4">Features</th>
                        <th className="text-center py-4 px-4">Starter</th>
                        <th className="text-center py-4 px-4">Pro</th>
                        <th className="text-center py-4 px-4">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonFeatures.map((category, categoryIndex) => (
                        <>
                          <tr key={`category-${categoryIndex}`} className="bg-gray-50">
                            <td colSpan={4} className="py-3 px-4 font-semibold text-gray-800">
                              {category.category}
                            </td>
                          </tr>
                          {category.features.map((feature, featureIndex) => (
                            <tr key={`feature-${categoryIndex}-${featureIndex}`} className="border-b">
                              <td className="py-3 px-4">{feature.name}</td>
                              <td className="py-3 px-4 text-center">{feature.starter}</td>
                              <td className="py-3 px-4 text-center">{feature.pro}</td>
                              <td className="py-3 px-4 text-center">{feature.enterprise}</td>
                            </tr>
                          ))}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="max-w-md mx-auto shadow-xl">
              <CardHeader>
                <CardTitle>Ready to get started?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="text-3xl font-bold mb-2">{plans.find((p) => p.id === selectedPlan)?.name} Plan</div>
                  <div className="text-2xl text-gray-600">
                    {typeof plans.find((p) => p.id === selectedPlan)?.price === "number"
                      ? `${plans.find((p) => p.id === selectedPlan)?.price} kr/${isAnnual ? "year" : "month"}`
                      : "Custom Pricing"}
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-4"
                  >
                    {selectedPlan === "enterprise" ? "Contact Sales" : "Start Subscription"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
                <p className="text-sm text-gray-500 mt-4">
                  14-day free trial • No credit card required • Cancel anytime
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
