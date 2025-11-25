"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { RefreshCw, ExternalLink, AlertCircle, CheckCircle } from "lucide-react"
import AdminNavbar from "@/components/admin-navbar"

interface Plan {
  id: string
  name: string
  price: number
  description: string
  maxProducts: number | string
  durationDays: number
  features: string[]
  isActive?: boolean
  sortOrder?: number
}

export default function AdminPlans() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'error' | 'checking'>('checking')

  const fetchPlans = async (forceRefresh = false) => {
    try {
      if (forceRefresh) setRefreshing(true)
      setConnectionStatus('checking')
      
      const url = forceRefresh ? '/api/plans?refresh=true' : '/api/plans'
      const response = await fetch(url)
      const data = await response.json()
      
      setPlans(data)
      setLastUpdated(new Date())
      setConnectionStatus('connected')
    } catch (error) {
      console.error('Error fetching plans:', error)
      setConnectionStatus('error')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Plans Management</h1>
              <p className="text-gray-600 mt-2">Manage plans synced from ERP system</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {connectionStatus === 'connected' && (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Connected to ERP</span>
                  </div>
                )}
                {connectionStatus === 'error' && (
                  <div className="flex items-center gap-1 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">ERP Connection Error</span>
                  </div>
                )}
                {connectionStatus === 'checking' && (
                  <div className="flex items-center gap-1 text-yellow-600">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Checking Connection</span>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => fetchPlans(true)}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 bg-[#D7263D] text-white rounded-lg hover:bg-[#B91C3C] disabled:opacity-50 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh from ERP
              </button>
              
              <a
                href="https://erp.fashionpos.space/admin/plans"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Manage in ERP
              </a>
            </div>
          </div>
          
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {lastUpdated.toLocaleString()}
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D7263D]"></div>
          </div>
        ) : (
          <div className="grid gap-6">
            {plans.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Plans Found</h3>
                <p className="text-gray-600 mb-4">No plans are currently available from the ERP system.</p>
                <button
                  onClick={() => fetchPlans(true)}
                  className="px-4 py-2 bg-[#D7263D] text-white rounded-lg hover:bg-[#B91C3C] transition-colors"
                >
                  Retry Connection
                </button>
              </div>
            ) : (
              plans.map((plan, idx) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Active
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{plan.description}</p>
                      
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Price</span>
                          <p className="text-lg font-semibold text-gray-900">₹{plan.price}/year</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Max Products</span>
                          <p className="text-lg font-semibold text-gray-900">
                            {plan.maxProducts === 'Unlimited' ? 'Unlimited' : plan.maxProducts}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Duration</span>
                          <p className="text-lg font-semibold text-gray-900">{plan.durationDays} days</p>
                        </div>
                      </div>
                      
                      {plan.features && plan.features.length > 0 && (
                        <div>
                          <span className="text-sm text-gray-500 mb-2 block">Features</span>
                          <div className="flex flex-wrap gap-2">
                            {plan.features.map((feature, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">ERP Integration Info</h4>
          <p className="text-sm text-blue-800 mb-2">
            Plans are automatically synced from the ERP system at <strong>https://erp.fashionpos.space/</strong>
          </p>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Plans update automatically when changed in ERP</li>
            <li>• Cache refreshes every 5 minutes</li>
            <li>• Webhook endpoint: <code>/api/webhooks/plans</code></li>
            <li>• Manual refresh available above</li>
          </ul>
        </div>
      </div>
    </div>
  )
}