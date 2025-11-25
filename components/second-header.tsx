"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function SecondHeader() {
  const [services, setServices] = useState([])

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      const data = await response.json()
      setServices(data)
    } catch (error) {
      console.error('Error fetching services:', error)
    }
  }

  return (
    <div className="mt-16">
      {/* Continuous Scrolling Services */}
      <div className="bg-red-500 py-4 border-b border-red-600">
        <div className="overflow-hidden">
          <div className="flex whitespace-nowrap" style={{animation: 'scroll 30s linear infinite'}}>
            <div className="flex items-center space-x-8 text-white font-medium">
              {services.length > 0 ? (
                services.concat(services).map((service, index) => (
                  <span key={index}>{service.icon} {service.name}</span>
                ))
              ) : (
                <>
                  <span>🛒 POS System</span>
                  <span>📊 Inventory Management</span>
                  <span>💰 Billing & Invoicing</span>
                  <span>📈 Sales Analytics</span>
                  <span>👥 Customer Management</span>
                  <span>🏪 Multi-Store Support</span>
                  <span>📱 Mobile App</span>
                  <span>☁️ Cloud Backup</span>
                  <span>🔒 Secure Payments</span>
                  <span>📋 Reports & Insights</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}