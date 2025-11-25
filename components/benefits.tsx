"use client"

import { motion } from "framer-motion"

export default function Benefits() {
  return (
    <section className="pb-16 md:pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              We're happy to help you in 10+ cities across India
            </h2>

            <div className="space-y-4">
              {[
                "Priority Support",
                "Free Onsite Demo",
                "Online Tutorial",
                "Hindi Support Available",
                "Low Cost Software",
                "Free Mobile Apps",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D7263D] rounded-full" />
                  <p className="text-gray-700 font-medium">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 rounded-lg border-l-4 border-[#D7263D]" style={{backgroundColor: '#F5F5F5'}}>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Now expanding globally in the Middle East & Africa
              </h3>
              <p className="text-gray-600">Bringing world-class retail solutions to businesses worldwide.</p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-lg p-8" style={{backgroundColor: '#F5F5F5'}}
          >
            <img src="/retail-management.jpg" alt="Retail Benefits" className="w-full h-auto rounded-lg" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
