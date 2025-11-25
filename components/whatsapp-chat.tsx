"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export default function WhatsAppChat() {
  const [showPopup, setShowPopup] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !hasScrolled) {
        setHasScrolled(true)
        setShowPopup(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasScrolled])

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919427300816?text=Hello! I would like to know more about Retalians.', '_blank')
  }

  if (!showPopup) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <button onClick={() => setShowPopup(false)} className="absolute -top-2 -right-2 w-5 h-5 bg-gray-600 text-white rounded-full flex items-center justify-center text-xs hover:bg-gray-700">
          <X className="w-3 h-3" />
        </button>
        <button
          onClick={handleWhatsAppClick}
          className="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg hover:bg-red-600 transition-colors font-medium text-sm"
        >
          Chat on WhatsApp
        </button>
      </div>
    </div>
  )
}