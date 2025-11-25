"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #D7263D 0%, #F03A47 100%)'}}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4">
            🎆 Join the Revolution
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Be part of the <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">retail</span>
            <br />revolution! 🚀
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            🌍 Help us digitalize <strong>13.5 million</strong> retail businesses across India and beyond! ✨
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contact"
              className="group px-10 py-4 bg-white text-[#D7263D] rounded-full hover:bg-yellow-50 hover:scale-105 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-2xl"
            >
              💼 Join Our Team
            </Link>
            <Link
              href="/solutions"
              className="group px-10 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 hover:scale-105 transition-all duration-300 font-bold text-lg border border-white/50"
            >
              🔍 Explore Solutions
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
