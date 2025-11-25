import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function EULA() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-12 pt-20 sm:pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 lg:p-10">
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#D7263D] to-[#F03A47] bg-clip-text text-transparent mb-4">
                End User License Agreement (EULA)
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-[#D7263D] to-[#F03A47] mx-auto rounded-full"></div>
            </div>
            
            <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. PERMITTED USE</h2>
                <p className="mb-4">The User may use the Software for legitimate business operations only.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. PROHIBITED USE</h2>
                <p className="mb-4">Users are prohibited from:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Modifying the source code</li>
                  <li>Circumventing security features</li>
                  <li>Reselling or sublicensing</li>
                  <li>Using the Software for unlawful transactions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. INTELLECTUAL PROPERTY</h2>
                <p className="mb-4">All intellectual property—software code, UI/UX, branding, documentation—is owned solely by Retalians.</p>
                <p className="font-semibold text-gray-800">Unauthorized use will result in legal action.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}