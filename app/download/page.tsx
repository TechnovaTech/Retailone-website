import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export default function Download() {
  return (
    <main>
      <Navbar />
      <section className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">Download Peddle Plus</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Desktop Software</h2>
              <p className="text-gray-600 mb-6">Download the full-featured desktop ERP software for Windows.</p>
              <Link
                href="#"
                className="inline-block px-6 py-3 bg-[#e91e8c] text-white rounded-full hover:bg-[#d01a7a] transition-colors font-semibold"
              >
                Download Windows Version
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Mobile Apps</h2>
              <p className="text-gray-600 mb-6">
                Get the mobile app for iOS and Android to manage your store on the go.
              </p>
              <div className="space-y-3">
                <Link
                  href="#"
                  className="block px-6 py-3 bg-[#e91e8c] text-white rounded-full hover:bg-[#d01a7a] transition-colors font-semibold text-center"
                >
                  iOS App Store
                </Link>
                <Link
                  href="#"
                  className="block px-6 py-3 bg-[#e91e8c] text-white rounded-full hover:bg-[#d01a7a] transition-colors font-semibold text-center"
                >
                  Google Play Store
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
