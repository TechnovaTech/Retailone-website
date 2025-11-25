"use client"

import { motion } from "framer-motion"
import { ShoppingBag, TrendingUp, BarChart3 } from "lucide-react"

export default function Stats() {
  const stats = [
    {
      icon: ShoppingBag,
      number: "0,000+",
      label: "Retailers",
    },
    {
      icon: TrendingUp,
      number: "0,00,000+",
      label: "Transactions per day",
    },
    {
      icon: BarChart3,
      number: "000 Cr+",
      label: "Turnover recorded",
    },
  ]

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #F5F5F5 0%, #ffffff 100%)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-2xl mb-2 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: '#fef2f2'}}>
                      <Icon className="w-12 h-12" style={{color: '#D7263D'}} />
                    </div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#D7263D] to-[#F03A47] bg-clip-text text-transparent mb-2">{stat.number}</h3>
                  <p className="text-gray-700 font-bold text-lg">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
