"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"

export default function WhatsAppPopup() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(true)
    }, 120000) // 2 minutes = 120000ms

    return () => clearInterval(timer)
  }, [])

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919427300816', '_blank')
    setIsVisible(false)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-sm border border-gray-200 relative">
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
        
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <MessageCircle className="text-white" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Need Help?</h3>
            <p className="text-sm text-gray-600">Chat with us on WhatsApp!</p>
          </div>
        </div>
        
        <button
          onClick={handleWhatsAppClick}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <MessageCircle size={18} />
          Chat Now
        </button>
      </div>
    </div>
  )
}