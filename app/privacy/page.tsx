import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-12 pt-20 sm:pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 lg:p-10">
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D7263D] to-[#F03A47] bg-clip-text text-transparent mb-4">
                Privacy Policy
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-[#D7263D] to-[#F03A47] mx-auto rounded-full"></div>
            </div>
            
            <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. INFORMATION WE COLLECT</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Business details</li>
                  <li>Transaction data</li>
                  <li>Inventory & customer data</li>
                  <li>Device logs</li>
                  <li>Payment and billing information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. PURPOSE OF DATA USE</h2>
                <p className="mb-4">We use data for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Providing POS services</li>
                  <li>Improving product performance</li>
                  <li>Generating reports & analytics</li>
                  <li>Customer support</li>
                  <li>Compliance with Indian laws</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. DATA SHARING</h2>
                <p className="mb-4">Data is shared only with:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Hosting/cloud service providers</li>
                  <li>SMS/payment gateway partners</li>
                  <li>Government authorities when required</li>
                  <li>Internal teams strictly for operations</li>
                </ul>
                <p className="font-semibold text-gray-800">We never sell or rent user data to any third party.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. USER RIGHTS</h2>
                <p className="mb-4">Users may:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Request deletion of data</li>
                  <li>Request data export</li>
                  <li>Request correction of information</li>
                </ul>
                <p className="text-gray-700">Retention period may vary based on legal requirements.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}