"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "What is Retailians?",
    answer: "Retailians is a comprehensive 360° retail solution designed by retailers, for retailers. It provides complete business management tools for retail and wholesale operations."
  },
  {
    question: "How can I get started with Retailians?",
    answer: "You can get started by contacting our sales team to learn more about our features, request a demo, or schedule a consultation."
  },
  {
    question: "What industries does Retailians serve?",
    answer: "Retailians serves various retail industries including fashion, electronics, grocery, pharmacy, and many other retail segments with specialized features for each."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a free trial so you can experience all the features of Retailians. Contact us to sign up for your trial."
  },
  {
    question: "What support options are available?",
    answer: "We provide comprehensive support including phone support, email assistance, online documentation, and training resources to ensure your success with Retailians."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20" style={{backgroundColor: '#F5F5F5'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Left Side - Title */}
          <div className="lg:sticky lg:top-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-[#D7263D] to-[#F03A47] bg-clip-text text-transparent">Frequently Asked Questions</span>
               
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
              Find answers to common questions about Retailians, ERP system, including features, setup, and best practices.
            </p>
          </div>

          {/* Right Side - Questions */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl p-4 sm:p-6 border border-white/20">
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl shadow-sm sm:shadow-md border border-gray-100 hover:border-[#D7263D]/30 transition-all duration-300"
                >
                  <button
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-center hover:bg-gradient-to-r hover:from-[#D7263D]/5 hover:to-[#F03A47]/5 transition-all duration-300 rounded-xl sm:rounded-2xl touch-target"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="font-medium text-gray-900 text-sm sm:text-base pr-4">{faq.question}</span>
                    {openIndex === index ? (
                      <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-[#D7263D] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-[#D7263D] flex-shrink-0" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}