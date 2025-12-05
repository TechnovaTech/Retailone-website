"use client"

import { motion } from "framer-motion"
import { FileText, Package, Users, Smartphone, TrendingUp, Shield, CreditCard, CheckSquare } from "lucide-react"

export default function PeddlePlusFeatures() {
  const features = [
    {
      icon: FileText,
      title: "GST Billing",
      description: "Generate GST-compliant invoices with automatic GST calculations."
    },
    {
      icon: Package,
      title: "Inventory Management",
      description: "Monitor live item stock and manage inventory with sales for accurate tracking."
    },
    {
      icon: Users,
      title: "Party Ledger Reports",
      description: "Get report of party balances and reduce overdue payments."
    },
    {
      icon: Smartphone,
      title: "Multi-Device Access",
      description: "Access your accounts anytime, anywhere with our PC and Mobile software."
    },
    {
      icon: TrendingUp,
      title: "Financial Reports",
      description: "Generate detailed financial reports like Party balances, Cash statements, and Tax summaries and profit & loss statements in just a few clicks."
    },
    {
      icon: Shield,
      title: "Secure Data Backup",
      description: "Protect your data with automatic cloud backups, end-to-end encryption, and multi-factor authentication for peace of mind."
    },
    {
      icon: CreditCard,
      title: "Expense Tracking",
      description: "Record and categorize expenses, print receipts, and monitor spending to keep your finances under control."
    },
    {
      icon: CheckSquare,
      title: "Multiple Invoices Formats",
      description: "Professional invoices formats with your logo, sign, and payment terms to enhance your brand identity."
    }
  ]

  return (
    <section className="py-10 sm:py-16 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Retailians <span className="bg-gradient-to-r from-[#D7263D] to-[#F03A47] bg-clip-text text-transparent">Features</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-2 sm:px-0"
        >
          <div className="relative">
            <div className="absolute left-3 sm:left-4 top-0 w-0.5 bg-red-500" style={{height: '100%'}}></div>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6 relative px-2 sm:px-0"
              >
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-red-500 flex-shrink-0">
                    <feature.icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold mb-1 text-black">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}