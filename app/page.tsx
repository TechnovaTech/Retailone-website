"use client"
import SecondHeader from "@/components/second-header"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import PeddlePlusFeatures from "@/components/peddle-plus-features"
import Services from "@/components/services"
import SpecialistIndustries from "@/components/specialist-industries"
import Benefits from "@/components/benefits"
import FeaturesNew from "@/components/features-new"
import Testimonials from "@/components/testimonials"
import CTASection from "@/components/cta-section"
import FAQ from "@/components/faq"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { useState } from "react"
import { X } from "lucide-react"

export default function Home() {
  const [showPopup, setShowPopup] = useState(true)
  return (
    <main className="min-h-screen">
      <Navbar />
      {showPopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Download RetailOne Android App</h2>
              <button aria-label="Close" onClick={() => setShowPopup(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-700">Get the RetailOne app for Android and manage your retail on the go.</p>
              <a
                href="https://drive.google.com/file/d/1CzcX13MMaU74XUFmJVJ00iNlRT5BFYZa/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D7263D] to-[#F03A47] text-white rounded-lg font-semibold hover:scale-[1.02] hover:shadow-lg transition-all"
              >
                Download Android App
              </a>
            </div>
          </div>
        </div>
      )}
      <SecondHeader />
      <Hero />
      <PeddlePlusFeatures />
      <Services />
      <Benefits />
      <FeaturesNew />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
