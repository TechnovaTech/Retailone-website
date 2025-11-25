"use client"

import { motion, useInView } from "framer-motion"
import { Star, ChevronDown, ChevronUp } from "lucide-react"
import { useRef, useEffect, useState } from "react"

interface Review {
  _id: string
  customerName: string
  shopName: string
  rating: number
  comment: string
  videoUrl?: string
}

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [reviews, setReviews] = useState<Review[]>([])
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews')
      const data = await response.json()
      setReviews(data)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  const testimonials = reviews.map(review => ({
    quote: review.comment,
    author: review.customerName,
    company: review.shopName,
    rating: review.rating,
    videoUrl: review.videoUrl
  }))

  const duplicatedTestimonials = testimonials.length > 0 ? [...testimonials, ...testimonials] : []

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedCards(newExpanded)
  }

  const truncateText = (text: string, maxLines: number = 4) => {
    const words = text.split(' ')
    const wordsPerLine = 8 // Approximate words per line
    const maxWords = maxLines * wordsPerLine
    if (words.length <= maxWords) return text
    return words.slice(0, maxWords).join(' ') + '...'
  }

  return (
    <section className="pb-10 md:pb-18 pt-0 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #F5F5F5 0%, #ffffff 100%)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#D7263D] to-[#F03A47] bg-clip-text text-transparent">Thousands</span> of retailers
            <br />trust us daily!
          </h2>
        </motion.div>

        {testimonials.length > 0 ? (
          <div ref={ref} className="relative overflow-hidden">
            <motion.div 
              className="flex gap-8"
              animate={{ x: ["-0%", "-50%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {duplicatedTestimonials.map((testimonial, index) => {
                const isExpanded = expandedCards.has(index)
                const shouldShowReadMore = testimonial.quote.split(' ').length > 32
                
                return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-[#D7263D]/30 w-[400px] md:w-[450px] h-[320px] flex-shrink-0 flex flex-col"
                >
                  <div className="flex gap-1 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className={`${i < (testimonial.rating || 5) ? 'fill-[#D7263D] text-[#D7263D]' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  
                  <div className="mb-6 flex-1">
                    <p className="text-gray-700 italic text-lg leading-relaxed">
                      "{isExpanded ? testimonial.quote : truncateText(testimonial.quote)}"
                    </p>
                    
                    {shouldShowReadMore && (
                      <button
                        onClick={() => toggleExpanded(index)}
                        className="flex items-center gap-1 mt-3 text-[#D7263D] hover:text-[#B91C3C] transition-colors text-sm font-medium"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp size={16} />
                            Read Less
                          </>
                        ) : (
                          <>
                            <ChevronDown size={16} />
                            Read More
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{testimonial.author}</p>
                        <p className="text-sm text-[#D7263D] font-medium">{testimonial.company}</p>
                      </div>
                      {testimonial.videoUrl && (
                        <a href={testimonial.videoUrl} target="_blank" className="flex items-center gap-1 px-3 py-2 bg-[#D7263D] text-white rounded-full hover:bg-[#B91C3C] transition-colors text-sm">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                          Watch Video
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                )
              })}
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No reviews yet. Add reviews from the admin panel to see them here.</p>
          </div>
        )}
      </div>
    </section>
  )
}