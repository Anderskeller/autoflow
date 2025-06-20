"use client"

import { Suspense, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { ArrowRight, Zap, LinkIcon, Settings, Star, Check, Sparkles, Brain, Cpu, Network } from "lucide-react"
import Link from "next/link"

// 3D Automation Brain Component
function AutomationBrain() {
  const meshRef = useRef<any>()
  const groupRef = useRef<any>()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.rotation.y += 0.005
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main Brain Sphere */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={meshRef} args={[2.5, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#6366f1"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      {/* Orbiting Elements */}
      {[...Array(8)].map((_, i) => (
        <Float key={i} speed={2 + i * 0.2} rotationIntensity={0.3} floatIntensity={0.3}>
          <Sphere
            args={[0.15, 16, 16]}
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 4,
              Math.sin((i / 4) * Math.PI) * 2,
              Math.sin((i / 8) * Math.PI * 2) * 4,
            ]}
          >
            <meshStandardMaterial
              color={i % 2 === 0 ? "#06b6d4" : "#10b981"}
              emissive={i % 2 === 0 ? "#06b6d4" : "#10b981"}
              emissiveIntensity={0.2}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

export default function LandingPage() {
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CEO, TechStart",
      avatar: "/placeholder.svg?height=60&width=60",
      quote:
        "AutoFlow saved us 20 hours per week. The automation quality is incredible and the team is super responsive.",
    },
    {
      name: "Marcus Johnson",
      role: "Operations Manager",
      avatar: "/placeholder.svg?height=60&width=60",
      quote:
        "We went from manual data entry to fully automated workflows in just 2 weeks. Game changer for our business.",
    },
    {
      name: "Elena Rodriguez",
      role: "Marketing Director",
      avatar: "/placeholder.svg?height=60&width=60",
      quote:
        "The integrations work flawlessly. Our lead nurturing is now completely automated and more effective than ever.",
    },
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "299",
      description: "Perfect for small teams getting started with automation",
      features: ["Up to 5 automations", "Basic integrations", "Email support", "Monthly optimization"],
      popular: false,
    },
    {
      name: "Pro",
      price: "699",
      description: "Advanced automation for growing businesses",
      features: [
        "Unlimited automations",
        "All integrations",
        "Priority support",
        "Weekly optimization",
        "Custom workflows",
        "Analytics dashboard",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for large organizations",
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantee",
        "Advanced security",
        "Training & onboarding",
      ],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <motion.div className="fixed inset-0 opacity-30" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10" />
        {[...Array(100)].map((_, i) => (
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
      </motion.div>

      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div className="text-left" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="mb-6">
              <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-400/30 mb-4 shadow-lg shadow-cyan-400/10">
                <Cpu className="w-4 h-4 mr-2" />
                AI-Powered Business Automation
              </Badge>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your business
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                automation assistant
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl leading-relaxed"
            >
              Describe what you want. We build it for you.
              <br />
              <span className="text-cyan-400">Connect your tools, automate your workflows, focus on growth.</span>
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-start">
              <Link href="/request">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-lg px-8 py-4 shadow-lg shadow-purple-500/25 border border-purple-400/20"
                  >
                    Start automating
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4 border-gray-600 hover:bg-gray-800/50 text-gray-300 hover:text-white backdrop-blur-sm"
                >
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="flex items-center gap-8 mt-12 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>500+ businesses automated</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span>99.9% uptime</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right 3D Visual */}
          <motion.div
            className="relative h-[500px] w-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Remove the background container div completely and replace with just the Canvas */}
            <div className="w-[500px] h-[500px] relative">
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
                <Suspense fallback={null}>
                  <AutomationBrain />
                  <Environment preset="night" />
                </Suspense>
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
              </Canvas>

              {/* Subtle glow effect behind the 3D element */}
              <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 via-cyan-500/10 to-transparent rounded-full blur-3xl -z-10"></div>
            </div>

            {/* Floating UI Elements - repositioned for smaller container */}
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

            {/* Floating particles around the 3D element */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1],
                  x: [0, Math.random() * 20 - 10, 0],
                  y: [0, Math.random() * 20 - 10, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent"></div>
        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              How it works
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Four simple steps to transform your business operations with AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card
                  className={`p-6 h-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-lg hover:shadow-${feature.glowColor} hover:shadow-2xl`}
                >
                  <CardContent className="p-0">
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-900/50 to-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Loved by businesses worldwide
            </h2>
            <p className="text-xl text-gray-400">See what our customers are saying about AutoFlow</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 h-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-lg hover:shadow-cyan-400/10 hover:shadow-2xl">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4 border-2 border-gray-600"
                      />
                      <div>
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-gray-400 text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-400">Choose the plan that fits your business needs</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card
                  className={`p-8 h-full relative ${
                    plan.popular
                      ? "bg-gradient-to-b from-purple-900/50 to-gray-800/50 border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20"
                      : "bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50"
                  } transition-all duration-300`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-600 shadow-lg">
                      Most Popular
                    </Badge>
                  )}
                  <CardContent className="p-0">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                      <div className="text-4xl font-bold mb-2 text-white">
                        {plan.price === "Custom" ? plan.price : `${plan.price} kr`}
                        {plan.price !== "Custom" && <span className="text-lg text-gray-400">/month</span>}
                      </div>
                      <p className="text-gray-400">{plan.description}</p>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center">
                          <Check className="w-5 h-5 text-green-400 mr-3" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/payment">
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-purple-500/25"
                            : "border-gray-600 hover:bg-gray-700/50 text-gray-300 hover:text-white"
                        }`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 backdrop-blur-sm border-y border-gray-700/50">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to automate your business?</h2>
            <p className="text-xl mb-8 text-gray-300">Join thousands of businesses already saving time with AutoFlow</p>
            <Link href="/request">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-lg px-8 py-4 shadow-lg shadow-purple-500/25 border border-purple-400/20"
                >
                  Start Your Automation Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AutoFlow</span>
              </div>
              <p className="text-gray-400">Automate your business workflows with AI-powered integrations.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="/request" className="hover:text-cyan-400 transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700/50 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AutoFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
