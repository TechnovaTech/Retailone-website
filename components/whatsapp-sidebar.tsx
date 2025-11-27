"use client"

import { MessageCircle } from "lucide-react"
import { usePathname } from "next/navigation"

export default function WhatsAppSidebar() {
  const pathname = usePathname()
  
  // Hide WhatsApp button on admin pages
  if (pathname?.startsWith('/admin')) {
    return null
  }

  const handleWhatsAppClick = () => {
    const phoneNumber = "919427300816"
    const message = "Hello! I'm interested in Retalians. Can you help me?"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
      <button
        onClick={handleWhatsAppClick}
        className="bg-gradient-to-b from-[#D7263D] to-[#F03A47] text-white w-16 h-48 rounded-l-lg shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-6"
      >
        <span className="text-lg font-medium -rotate-90 whitespace-nowrap">Chat on WhatsApp</span>
      </button>
    </div>
  )
}