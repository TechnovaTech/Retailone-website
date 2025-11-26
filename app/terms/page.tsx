"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useEffect, useState } from 'react'

interface Plan {
  id: string
  name: string
  price: number
  features: string[]
  duration: string
  isActive: boolean
}

export default function TermsAndConditions() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('https://erp.fashionpos.space/api/plans')
        if (response.ok) {
          const data = await response.json()
          setPlans(data.filter((plan: Plan) => plan.isActive))
        }
      } catch (error) {
        console.error('Failed to fetch plans:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
    // Refresh plans every 30 seconds for live updates
    const interval = setInterval(fetchPlans, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-12 pt-20 sm:pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 lg:p-10">
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D7263D] to-[#F03A47] bg-clip-text text-transparent mb-4">
                Terms & Conditions
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-[#D7263D] to-[#F03A47] mx-auto rounded-full"></div>
            </div>
            
            <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. DEFINITIONS</h2>
                <p className="mb-4">For the purpose of this Agreement:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>"Company", "We", "Us", "Our"</strong> refers to Retalians, its employees, contractors, representatives, and successors.</li>
                  <li><strong>"User", "Client", "You", "Your"</strong> refers to any person or entity accessing or using the POS Software.</li>
                  <li><strong>"Software", "POS System"</strong> refers to the Retalians Retail POS application, modules, updates, API integrations, and all related services.</li>
                  <li><strong>"Agreement"</strong> refers to these Terms and Conditions, Privacy Policy, Refund Policy, SLA, and EULA collectively.</li>
                  <li><strong>"Data"</strong> refers to all information uploaded, stored, generated, or processed through the POS System.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. ACCEPTANCE OF TERMS</h2>
                <p className="mb-4">By accessing, installing, using, or subscribing to the POS System, the User legally agrees to be bound by this Agreement under the laws of India.</p>
                <p>If the User disagrees with any part of this Agreement, the User must immediately discontinue use of the Software.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. LICENSE GRANT</h2>
                <p className="mb-4">Retalians grants the User a:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Non-exclusive</li>
                  <li>Non-transferable</li>
                  <li>Non-sublicensable</li>
                  <li>Revocable</li>
                </ul>
                <p className="mb-4">license to use the POS System solely for lawful business operations.</p>
                <p className="mb-4">The User shall not:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Reverse engineer, modify, decode, or decompile the Software</li>
                  <li>Resell, distribute, or lease the Software</li>
                  <li>Use the Software for fraudulent or illegal business activities</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. SUBSCRIPTION PLANS</h2>
                <p className="mb-4">The following subscription plans are available for the POS System:</p>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D7263D]"></div>
                  </div>
                ) : plans.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
                    {plans.map((plan) => (
                      <div key={plan.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{plan.name}</h3>
                        <p className="text-2xl font-bold text-[#D7263D] mb-3">₹{plan.price}<span className="text-sm text-gray-600">/{plan.duration}</span></p>
                        <ul className="space-y-1">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start">
                              <span className="text-[#D7263D] mr-2">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 italic">No active plans available at the moment.</p>
                )}
                <p className="text-sm text-gray-600 mt-4">
                  * Plans and pricing are subject to change. Current active plans are displayed above and updated in real-time.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. GOVERNING LAW & JURISDICTION</h2>
                <p className="mb-4">This Agreement shall be governed by and interpreted in accordance with the laws of India.</p>
                <p>All disputes shall be subject to the exclusive jurisdiction of the Courts of Rajkot, Gujarat.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}