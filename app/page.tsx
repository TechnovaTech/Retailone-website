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

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
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
