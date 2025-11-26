"use client"

import { motion } from "framer-motion"
import { Check, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useCallback } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SoftwareComparison from "@/components/software-comparison"

interface Plan {
  id: string
  name: string
  price: number
  description: string
  maxProducts: number
  durationDays: number
  features: string[]
}

export default function Plans() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchPlans = useCallback(async (forceRefresh = false) => {
    try {
      if (forceRefresh) setRefreshing(true)
      
      // Check cookies first
      if (!forceRefresh) {
        const cookies = document.cookie.split(';')
        const plansCookie = cookies.find(c => c.trim().startsWith('plans_cache='))
        const timeCookie = cookies.find(c => c.trim().startsWith('plans_cache_time='))
        
        if (plansCookie && timeCookie) {
          const cacheTime = parseInt(timeCookie.split('=')[1])
          const age = Date.now() - cacheTime
          if (age < 2 * 60 * 1000) { // 2 minutes
            const cachedPlans = JSON.parse(decodeURIComponent(plansCookie.split('=')[1]))
            setPlans(cachedPlans)
            setLastUpdated(new Date(cacheTime))
            setLoading(false)
            return
          }
        }
      }
      
      const url = forceRefresh ? '/api/plans?refresh=true&t=' + Date.now() : '/api/plans?t=' + Date.now()
      const response = await fetch(url, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      const data = await response.json()
      
      // Store in cookies
      const now = Date.now()
      document.cookie = `plans_cache=${encodeURIComponent(JSON.stringify(data))}; max-age=300; path=/`
      document.cookie = `plans_cache_time=${now}; max-age=300; path=/`
      
      setPlans(data)
      setLastUpdated(new Date())
      console.log('Plans updated:', data.length, 'plans')
    } catch (error) {
      console.error('Error fetching plans:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchPlans()
    
    // Auto-refresh every 30 seconds for real-time updates
    const interval = setInterval(() => {
      fetchPlans(true)
    }, 30 * 1000)
    
    // Listen for storage changes (real-time updates)
    const handleStorageChange = (e) => {
      if (e.key === 'plans_updated') {
        console.log('Plans updated via webhook, refreshing...')
        fetchPlans(true)
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // Listen for custom events
    const handlePlansUpdate = () => {
      console.log('Plans update event received')
      fetchPlans(true)
    }
    
    window.addEventListener('plans-updated', handlePlansUpdate)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('plans-updated', handlePlansUpdate)
    }
  }, [fetchPlans])

  return (
    <main>
      <Navbar />
      <section className="pt-32 pb-16 px-6 lg:px-8 bg-gradient-to-br from-[#fef2f2] to-[#fee2e2] relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-red-900/5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-red-200/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-red-100/15 rounded-full blur-2xl"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Our <span className="bg-gradient-to-r from-[#D7263D] to-[#F03A47] bg-clip-text text-transparent">Plans</span></h1>
            <p className="text-xl text-gray-600 mb-4">Choose the perfect plan for your business. </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span>Plans updated live from ERP system</span>
              <button 
                onClick={() => fetchPlans(true)}
                disabled={refreshing}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/50 hover:bg-white/70 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              {lastUpdated && (
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D7263D]"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, idx) => (
                <motion.div 
                  key={plan.id || idx} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: idx * 0.1 }} 
                  whileHover={{ y: -8 }} 
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-200 h-[600px] flex flex-col"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h2>
                    <p className="text-gray-600 mb-4 h-12 flex items-center justify-center">{plan.description}</p>
                    <div className="mb-4">
                      <span className="text-5xl font-bold text-gray-900">₹{plan.price}</span>
                      <span className="text-gray-600">/year</span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-3 text-gray-700">
                        <Check className="w-5 h-5 text-[#D7263D] flex-shrink-0 mt-0.5" />
                        <span>Up to {plan.maxProducts === 'Unlimited' ? 'Unlimited' : plan.maxProducts} products</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-700">
                        <Check className="w-5 h-5 text-[#D7263D] flex-shrink-0 mt-0.5" />
                        <span>{plan.durationDays} days validity</span>
                      </li>
                      {plan.features?.slice(0, 6).map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700">
                          <Check className="w-5 h-5 text-[#D7263D] flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link 
                    href="/contact" 
                    className="block w-full py-3 rounded-full text-center font-semibold transition-all mt-auto bg-gradient-to-r from-[#D7263D] to-[#F03A47] text-white hover:shadow-lg"
                  >
                    Get Started
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      <SoftwareComparison />
      
      <Footer />
    </main>
  )
}