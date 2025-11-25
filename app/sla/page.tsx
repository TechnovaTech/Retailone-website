import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function SLA() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-12 pt-20 sm:pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 lg:p-10">
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#D7263D] to-[#F03A47] bg-clip-text text-transparent mb-4">
                Service Level Agreement (SLA)
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-[#D7263D] to-[#F03A47] mx-auto rounded-full"></div>
            </div>
            
            <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Uptime Guarantee</h2>
                <p className="mb-4">The Company targets 99% uptime, excluding:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Scheduled maintenance</li>
                  <li>Third-party failures</li>
                  <li>Internet issues</li>
                  <li>Force Majeure events</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. SUPPORT RESPONSE TIME</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Critical system failure: Within 24 hours</li>
                  <li>General support: 1–2 business days</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. DATA BACKUP</h2>
                <p className="mb-4">Automatic backups are performed based on the User's plan.</p>
                <p className="mb-4">The Company is not liable for data loss caused by:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Hardware failure</li>
                  <li>User deletion</li>
                  <li>Third-party storage outages</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}