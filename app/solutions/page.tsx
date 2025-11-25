"use client"

import { motion } from "framer-motion"
import { Store, Package, Building2, ShoppingCart, BarChart3, Users } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const solutions = [
  { icon: Store, title: "Retail Businesses", desc: "Complete POS and inventory management for independent retailers and small store chains.", features: ["Point of Sale", "Inventory Tracking", "Customer Management", "Sales Analytics"] },
  { icon: Package, title: "Wholesalers", desc: "Specialized modules for wholesale and distribution businesses with bulk operations.", features: ["Bulk Billing", "Multi-warehouse", "B2B Portal", "Credit Management"] },
  { icon: Building2, title: "Enterprise Solutions", desc: "Scalable solutions for large retail chains and multi-location operations.", features: ["Multi-store Management", "Centralized Control", "Advanced Analytics", "Custom Integrations"] },
  { icon: ShoppingCart, title: "E-commerce Integration", desc: "Seamlessly connect your online and offline sales channels.", features: ["Online Store Sync", "Order Management", "Unified Inventory", "Omnichannel Experience"] },
  { icon: BarChart3, title: "Analytics & Reporting", desc: "Data-driven insights to make informed business decisions.", features: ["Real-time Reports", "Sales Forecasting", "Performance Metrics", "Custom Dashboards"] },
  { icon: Users, title: "Customer Loyalty", desc: "Build lasting relationships with integrated loyalty programs.", features: ["Rewards Program", "Customer Insights", "Personalized Offers", "Retention Tools"] },
]

export default function Solutions() {
  return (
    <main>
      <Navbar />
      <section className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Solutions</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Tailored solutions for every business size and industry. From small retailers to large enterprises.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -8 }} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                <div className="w-14 h-14 bg-gradient-to-r from-[#D7263D] to-[#F03A47] rounded-lg flex items-center justify-center mb-4">
                  <solution.icon className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{solution.title}</h2>
                <p className="text-gray-600 mb-6">{solution.desc}</p>
                <ul className="space-y-2">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-[#D7263D] rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
