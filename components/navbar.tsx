"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Plans", href: "/plans" },
    { label: "Blog", href: "/blog" },
    { label: "About Us", href: "/company" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/logoimage3.png" alt="Logo" className="h-32 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-gray-700 hover:text-[#D7263D] transition-all duration-300 text-sm font-medium rounded-full hover:bg-gradient-to-r hover:from-[#D7263D]/10 hover:to-[#F03A47]/10"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D7263D] to-[#F03A47] text-white rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm font-bold"
            >
               Get in Touch
            </Link>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden pb-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-4 py-3 text-gray-700 hover:text-[#D7263D] transition-all duration-300 rounded-lg hover:bg-gradient-to-r hover:from-[#D7263D]/10 hover:to-[#F03A47]/10"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block px-4 py-3 mt-4 bg-gradient-to-r from-[#D7263D] to-[#F03A47] text-white rounded-full text-center hover:scale-105 transition-all duration-300 font-bold"
              onClick={() => setIsOpen(false)}
            >
              Get in Touch
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
