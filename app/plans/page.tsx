"use client"

// Custom CSS for hiding scrollbar and removing focus styles
const customStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  button:focus {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
  }
`

import { motion } from "framer-motion"
import { Check, RefreshCw, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useCallback } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SoftwareComparison from "@/components/software-comparison"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Plan {
  id: string
  name: string
  price: number
  description: string
  maxProducts: number | string
  durationDays: number
  features: string[]
}

export default function Plans() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchPlans = useCallback(async (forceRefresh = false) => {
    try {
      if (forceRefresh) setRefreshing(true)
      
      // Skip cache for now to ensure fresh data
      
      const url = '/api/plans?refresh=true&t=' + Date.now()
      const response = await fetch(url, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`)
      }
      
      const data = await response.json()
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format from API')
      }
      
      // Store in cookies
      const now = Date.now()
      document.cookie = `plans_cache=${encodeURIComponent(JSON.stringify(data))}; max-age=300; path=/`
      document.cookie = `plans_cache_time=${now}; max-age=300; path=/`
      
      setPlans(data)
      setLastUpdated(new Date())
      console.log('Plans updated:', data.length, 'plans')
    } catch (error) {
      console.error('Error fetching plans:', error)
      setPlans([])
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
    const handleStorageChange = (e: StorageEvent) => {
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
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
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
            <p className="text-xl text-gray-600 mb-4">Choose the perfect plan for your retail business needs.</p>
           
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D7263D]"></div>
            </div>
          ) : plans.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <p className="text-xl text-gray-600 mb-4">Unable to load plans</p>
                <p className="text-gray-500">Please try again later or contact support</p>
              </div>
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
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-200 min-h-[650px] flex flex-col cursor-pointer"
                  onClick={() => {
                    setSelectedPlan(plan)
                    setIsModalOpen(true)
                  }}
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h2>
                    <p className="text-gray-600 mb-4 min-h-[48px] flex items-center justify-center text-center">{plan.description}</p>
                    <div className="mb-4">
                      <span className="text-5xl font-bold text-gray-900">₹{plan.price}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-3 text-gray-700">
                        <Check className="w-5 h-5 text-[#D7263D] flex-shrink-0 mt-0.5" />
                        <span>Up to {plan.maxProducts === -1 || plan.maxProducts === 'Unlimited' ? 'Unlimited' : plan.maxProducts} products</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-700">
                        <Check className="w-5 h-5 text-[#D7263D] flex-shrink-0 mt-0.5" />
                        <span>{plan.durationDays} days validity</span>
                      </li>
                      {plan.features?.slice(0, 8).map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700">
                          <Check className="w-4 h-4 text-[#D7263D] flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {plan.features?.length > 8 && (
                        <li className="flex items-start gap-3 text-gray-500 italic">
                          <span className="w-4 h-4 flex-shrink-0">+</span>
                          <span>{plan.features.length - 8} more features...</span>
                        </li>
                      )}
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
      
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide">
          {selectedPlan && (
            <div className="p-6">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-3">{selectedPlan.name}</h2>
                <p className="text-xl text-gray-600 mb-6">{selectedPlan.description}</p>
                <div className="space-y-3">
                  <div className="text-lg font-semibold">₹{selectedPlan.price}/year</div>
                  <div className="text-lg">Up to {selectedPlan.maxProducts === -1 || selectedPlan.maxProducts === 'Unlimited' ? 'Unlimited' : selectedPlan.maxProducts} products</div>
                  <div className="text-lg">{selectedPlan.durationDays} days validity</div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Features Included</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedPlan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Check className="w-5 h-5 text-[#D7263D] flex-shrink-0 mt-0.5" />
                      <span className="font-medium text-gray-800">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <Link 
                  href="/contact" 
                  className="flex-1 py-4 rounded-xl text-center font-bold text-lg bg-gradient-to-r from-[#D7263D] to-[#F03A47] text-white hover:shadow-xl transition-all"
                  onClick={() => setIsModalOpen(false)}
                >
                  Get Started Now
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </main>
  )
}