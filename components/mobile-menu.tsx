"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, Home, FileText, Users, Phone, Menu } from "lucide-react"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Plans", href: "/plans", icon: FileText },
    { label: "Blog", href: "/blog", icon: FileText },
    { label: "About Us", href: "/company", icon: Users },
    { label: "Contact", href: "/contact", icon: Phone },
  ]

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <Link href="/" onClick={onClose} className="flex items-center">
                  <img src="/image1.png" alt="Logo" className="h-16 w-auto" />
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 py-6">
                <div className="space-y-2 px-4">
                  {navItems.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-[#D7263D] hover:bg-gradient-to-r hover:from-[#D7263D]/10 hover:to-[#F03A47]/10 rounded-lg transition-all duration-300 font-medium"
                        >
                          <Icon size={20} />
                          {item.label}
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              </nav>

              {/* CTA Button */}
              <div className="p-4 border-t border-gray-200">
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="block w-full py-3 px-6 bg-gradient-to-r from-[#D7263D] to-[#F03A47] text-white rounded-full text-center hover:scale-105 transition-all duration-300 font-bold"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}