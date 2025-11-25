"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Pricing() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/plans')
        const data = await response.json()
        setPlans(data)
      } catch (error) {
        console.error('Error fetching plans:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])
  return (
    <main>
      <Navbar />
      <section className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Choose the perfect plan for your business. All plans include free updates and 30-day money-back guarantee.</p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D7263D]"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, idx) => (
              <motion.div key={plan.id || idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -8 }} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h2>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">₹{plan.price}</span>
                  <span className="text-gray-600">/year</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-[#D7263D] flex-shrink-0 mt-0.5" />
                    <span>Up to {plan.maxProducts} products</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-[#D7263D] flex-shrink-0 mt-0.5" />
                    <span>{plan.durationDays} days validity</span>
                  </li>
                  {plan.features?.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <Check className="w-5 h-5 text-[#D7263D] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="block w-full py-3 rounded-full text-center font-semibold transition-all bg-gradient-to-r from-[#D7263D] to-[#F03A47] text-white hover:shadow-lg">
                  Get Started
                </Link>
              </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
