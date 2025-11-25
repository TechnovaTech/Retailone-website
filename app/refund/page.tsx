import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function RefundPolicy() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-12 pt-20 sm:pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 lg:p-10">
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#D7263D] to-[#F03A47] bg-clip-text text-transparent mb-4">
                Refund & Cancellation Policy
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-[#D7263D] to-[#F03A47] mx-auto rounded-full"></div>
            </div>
            
            <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">SECTION 3 – REFUND & CANCELLATION POLICY</h2>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-4">1. REFUND CONDITIONS</h3>
                <p className="mb-4">All payments are non-refundable, including:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Subscription fees</li>
                  <li>Integration charges</li>
                  <li>Setup/installation fees</li>
                  <li>Custom development work</li>
                  <li>Annual plans</li>
                </ul>
                <p className="font-semibold text-gray-800">Refunds are only applicable if required by Indian law.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}