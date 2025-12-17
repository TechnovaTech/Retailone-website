"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Instagram, Youtube, Twitter, MessageCircle } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Footer() {
  const pathname = usePathname()
  
  // Determine wave color based on current page
  const getWaveColor = () => {
    if (pathname === '/') {
      return '#f7dada' // Perfect pink shade matching home section
    }
    return '#ffffff' // Pure white for other pages
  }
  
  return (
    <footer className="text-gray-300 relative" style={{backgroundColor: '#000000'}}>
      {/* Wave SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg className="relative block w-full h-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill={getWaveColor()}></path>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="text-white font-bold text-lg mb-4 block hover:text-gray-300 transition-colors">
              Retailians
            </Link>
            <p className="text-sm mb-4">A 360° Retail Solution by the Retailians, for the Retailers.</p>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Mail size={16} className="mt-1 flex-shrink-0 cursor-pointer" />
                <div className="text-sm">
                  <a href="mailto:hello.technovatechnologies@gmail.com" className="hover:text-white block cursor-pointer transition-colors">
                    hello.technovatechnologies@gmail.com
                  </a>
                  <a href="mailto:madevisionstudios@gmail.com" className="hover:text-white block cursor-pointer transition-colors">
                    madevisionstudios@gmail.com
                  </a>
                  <a href="mailto:retailianspos@gmail.com" className="hover:text-white block cursor-pointer transition-colors">
                    retailianspos@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <div className="text-sm">
                  Customer Care:
                  <a href="tel:+919427300816" className="hover:text-white block">
                    +91 94273 00816
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <span className="hover:text-white">
                    326-The spire 2,150ft ring road,<br />
                    Rajkot, Gujarat-360005.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/solutions" className="text-sm hover:text-white transition-colors">
                  Specialist Industries
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-sm hover:text-white transition-colors">
                  Features
                </Link>
              </li>

              <li>
                <Link href="/pricing" className="text-sm hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/company" className="text-sm hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white font-semibold mb-4">Policies</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
            
            {/* Social Media */}
            <h4 className="text-white font-semibold mb-4 mt-8">Follow Us</h4>
            <div className="flex gap-4">
              <a href="https://instagram.com/retalians" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com/@retalians" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
              <a href="https://twitter.com/retalians" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://wa.me/919427300816" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>


        </div>

        {/* Divider */}
        <div className="py-8" style={{borderTop: '1px solid #D1D1D1'}}>
          <div className="flex justify-center items-center">
            <p className="text-sm text-center text-gray-400">
              © 2025 All rights reserved By Retailians.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
