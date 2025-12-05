"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Building2, Users, Globe, Award } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Company() {
  const [aboutStats, setAboutStats] = useState({
    customers: '5000+',
    teamMembers: '100+',
    yearsExperience: '7+'
  })

  useEffect(() => {
    const fetchAboutStats = async () => {
      try {
        const response = await fetch('/api/about-stats', {
          cache: 'no-store'
        })
        const data = await response.json()
        setAboutStats(data)
      } catch (error) {
        console.error('Error fetching about stats:', error)
      }
    }
    fetchAboutStats()
    
    const interval = setInterval(fetchAboutStats, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8 bg-gradient-to-br from-[#fef2f2] to-[#fee2e2] relative overflow-hidden">
        <div className="absolute inset-0 bg-red-900/5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-red-200/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-red-100/15 rounded-full blur-2xl"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">About <span className="bg-gradient-to-r from-[#D7263D] to-[#F03A47] bg-clip-text text-transparent">Retailians</span></h1>
            <p className="text-xl text-gray-600 mb-8">
              We help retail businesses grow with simple and powerful software solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Who <span className="bg-gradient-to-r from-[#D7263D] to-[#F03A47] bg-clip-text text-transparent">We Are</span></h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Retailians is a leading retail management software company serving thousands of businesses across India, UAE, and Africa. We make retail operations simple, efficient, and profitable.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our mission is to empower retail business owners with technology that helps them grow their business and serve their customers better.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#D7263D] to-[#F03A47] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Building2 className="text-white" size={32} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{aboutStats.customers}</div>
              <div className="text-gray-600">Happy Customers</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.2 }}
              className="p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#D7263D] to-[#F03A47] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="text-white" size={32} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{aboutStats.teamMembers}</div>
              <div className="text-gray-600">Team Members</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.3 }}
              className="p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#D7263D] to-[#F03A47] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="text-white" size={32} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{aboutStats.yearsExperience}</div>
              <div className="text-gray-600">Years Experience</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our <span className="bg-gradient-to-r from-[#D7263D] to-[#F03A47] bg-clip-text text-transparent">Values</span></h2>
            <p className="text-lg text-gray-600">What drives us every day</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer First</h3>
              <p className="text-gray-600">We put our customers at the center of everything we do and build solutions that truly help their business grow.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">Simple Solutions</h3>
              <p className="text-gray-600">We believe technology should be simple and easy to use, not complicated and confusing.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.1 }} 
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Support</h3>
              <p className="text-gray-600">Our support team is always ready to help you succeed with friendly and expert assistance.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.1 }} 
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">Continuous Growth</h3>
              <p className="text-gray-600">We keep improving our software and services to help your business stay ahead of the competition.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to <span className="bg-gradient-to-r from-[#D7263D] to-[#F03A47] bg-clip-text text-transparent">Get Started?</span></h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of successful retailers who trust Retalians for their business growth.
            </p>
            <a 
              href="/contact" 
              className="inline-block px-8 py-4 bg-[#D7263D] text-white rounded-lg font-semibold hover:bg-[#F03A47] transition-colors duration-300"
            >
              Contact Us Today
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}