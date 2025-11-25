"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface Review {
  _id: string
  customerName: string
  shopName: string
  rating: number
  comment: string
  videoUrl?: string
  createdAt: string
}

export default function TestimonialsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews')
      const data = await response.json()
      setReviews(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8 bg-gradient-to-br from-[#fef2f2] to-[#fee2e2] relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-red-900/5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-red-200/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-red-100/15 rounded-full blur-2xl"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Customer <span className="bg-gradient-to-r from-[#D7263D] to-[#F03A47] bg-clip-text text-transparent">Reviews</span></h1>
            <p className="text-xl text-gray-600 mb-8">
              See what our customers say about Retalians.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D7263D]"></div>
            </div>
          ) : reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className={`${i < review.rating ? 'fill-[#D7263D] text-[#D7263D]' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 italic text-lg leading-relaxed mb-6">
                    "{review.comment}"
                  </p>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{review.customerName}</p>
                        <p className="text-sm text-[#D7263D] font-medium">{review.shopName}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(review.createdAt).toLocaleDateString()}</p>
                      </div>
                      {review.videoUrl && (
                        <a href={review.videoUrl} target="_blank" className="flex items-center gap-1 px-3 py-2 bg-[#D7263D] text-white rounded-full hover:bg-[#B91C3C] transition-colors text-sm">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                          Watch Video
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-400 text-6xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Reviews Yet</h3>
              <p className="text-gray-500">Reviews will appear here once they are added from the admin panel.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}