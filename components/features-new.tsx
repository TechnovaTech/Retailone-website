"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { LayoutDashboard, Package, CreditCard, Users, ShoppingCart, UserCheck, Calendar, FileText, Settings, TrendingUp, Monitor, DollarSign, BarChart3, Globe, ChevronDown, ChevronUp, Clock, Smartphone } from "lucide-react"

export default function FeaturesNew() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const features = [
    {
      icon: Package,
      title: "Inventory Management",
      description: "Track stock levels and manage products efficiently.\nMonitor inventory in real-time with automated alerts for low stock."
    },
    {
      icon: Users,
      title: "Customer Management",
      description: "Build stronger relationships with comprehensive customer profiles.\nTrack purchase history and preferences for personalized service."
    },
    {
      icon: ShoppingCart,
      title: "Purchase",
      description: "Streamline procurement with automated purchase orders.\nManage supplier relationships and track deliveries seamlessly."
    },
    {
      icon: UserCheck,
      title: "HR & Staff",
      description: "Manage your workforce with comprehensive employee profiles.\nTrack attendance, performance, and schedule shifts efficiently."
    },
    {
      icon: FileText,
      title: "Bills & Invoices",
      description: "Create professional invoices with customizable templates and branding.\nAutomate tax calculations and ensure GST compliance effortlessly."
    },
    {
      icon: BarChart3,
      title: "Reports & Analytics",
      description: "Generate comprehensive business reports with real-time data insights.\nAnalyze sales trends, inventory performance, and financial metrics."
    },
    {
      icon: Clock,
      title: "Save Time & Money",
      description: "Automate repetitive tasks and reduce manual errors significantly.\nOptimize business processes to increase operational efficiency."
    },
    {
      icon: CreditCard,
      title: "Online Payments",
      description: "Accept digital payments through multiple secure gateways.\nSupport UPI, cards, wallets, and net banking options."
    },
    {
      icon: Smartphone,
      title: "Easy-to-use Platform",
      description: "Enjoy an intuitive interface designed for simplicity and efficiency.\nAccess your business data from any device, anywhere, anytime."
    },
  ]

  return (
    <section id="features" className="pb-12 sm:pb-16 lg:pb-20" style={{backgroundColor: '#F5F5F5'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Features
          </h2>
          <p className="text-base sm:text-lg text-gray-600 px-4">
            We're happy to help you in 10+ cities across India
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center p-4 sm:p-6 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-lg mb-3 sm:mb-4 flex items-center justify-center overflow-hidden">
                  {feature.title === 'Inventory Management' ? (
                    <Image 
                      src="https://bidhee.com/uploads/work/2019-12-25-10-43-45-Inventory.svg" 
                      alt="Inventory Management" 
                      width={160} 
                      height={160} 
                      className="object-cover rounded-lg w-full h-full"
                    />
                  ) : feature.title === 'Customer Management' ? (
                    <Image 
                      src="https://cogzensolutions.com/wp-content/uploads/2025/02/What-is-a-Customer-Relationship-Management-Solution-and-How-Does-It-Work.png" 
                      alt="Customer Management" 
                      width={160} 
                      height={160} 
                      className="object-cover rounded-lg w-full h-full"
                    />
                  ) : feature.title === 'Purchase' ? (
                    <Image 
                      src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://sdlccorp.com/wp-content/uploads/2024/05/T1-What-Is-a-Purchase-Order.webp" 
                      alt="Purchase" 
                      width={160} 
                      height={160} 
                      className="object-cover rounded-lg w-full h-full"
                    />
                  ) : feature.title === 'Bills & Invoices' ? (
                    <Image 
                      src="https://oextech.blr1.digitaloceanspaces.com/Peddle%20Plus/feature-1.png" 
                      alt="Bills & Invoices" 
                      width={128} 
                      height={128} 
                      className="object-cover rounded-lg w-full h-full"
                    />
                  ) : feature.title === 'Easy-to-use Platform' ? (
                    <Image 
                      src="https://oextech.blr1.digitaloceanspaces.com/Peddle%20Plus/feature-2.png" 
                      alt="Easy-to-use Platform" 
                      width={128} 
                      height={128} 
                      className="object-cover rounded-lg w-full h-full"
                    />
                  ) : feature.title === 'Online Payments' ? (
                    <Image 
                      src="https://oextech.blr1.digitaloceanspaces.com/Peddle%20Plus/feature-6.png" 
                      alt="Online Payments" 
                      width={128} 
                      height={128} 
                      className="object-cover rounded-lg w-full h-full"
                    />
                  ) : feature.title === 'Reports & Analytics' ? (
                    <Image 
                      src="https://www.soundandcommunications.com/wp-content/uploads/2019/11/Data-Ana.jpg" 
                      alt="Reports & Analytics" 
                      width={128} 
                      height={128} 
                      className="object-cover rounded-lg w-full h-full"
                    />
                  ) : feature.title === 'Save Time & Money' ? (
                    <Image 
                      src="https://oextech.blr1.digitaloceanspaces.com/Peddle%20Plus/feature-5.png" 
                      alt="Save Time & Money" 
                      width={128} 
                      height={128} 
                      className="object-cover rounded-lg w-full h-full"
                    />
                  ) : feature.title === 'HR & Staff' ? (
                    <Image 
                      src="https://batdacademy.com/uploads/post_images/1730385082.png" 
                      alt="HR & Staff" 
                      width={128} 
                      height={128} 
                      className="object-cover rounded-lg w-full h-full"
                    />
                  ) : (
                    <span className="text-gray-500 text-xs">Image</span>
                  )}
                </div>
                <span className="font-bold text-gray-800 text-center mb-2 text-sm sm:text-base">{feature.title}</span>
                <p className="text-xs sm:text-sm text-gray-600 text-center mb-3 sm:mb-4 leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}