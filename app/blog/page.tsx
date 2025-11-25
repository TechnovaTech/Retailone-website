"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, User, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface Blog {
  _id: string
  title: string
  author: string
  content: string
  image?: string
  createdAt: string
  status: string
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs')
      const data = await response.json()
      setBlogs(data)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
        <Navbar />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D7263D] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blogs...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <Navbar />
      <main>
        <section className="pt-32 pb-16 px-6 lg:px-8 bg-gradient-to-br from-[#fef2f2] to-[#fee2e2] relative overflow-hidden mb-16">
            <div className="absolute inset-0 bg-red-900/5"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-10 left-10 w-32 h-32 bg-red-200/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-20 right-20 w-48 h-48 bg-red-100/15 rounded-full blur-2xl"></div>
            </div>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-5xl font-bold text-gray-900 mb-6">Our <span className="bg-gradient-to-r from-[#D7263D] to-[#F03A47] bg-clip-text text-transparent">Blog</span></h1>
                <p className="text-xl text-gray-600 mb-8">
                  Insights, tips, and updates from the retail world.
                </p>
              </motion.div>
            </div>
          </section>

        <div className="max-w-7xl mx-auto px-6 py-8 lg:px-8">
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, index) => (
                <motion.div 
                  key={blog._id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }} 
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300"
                >
                  <div className="relative h-56 w-full bg-gray-200 overflow-hidden">
                    {blog.image ? (
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          const nextElement = e.currentTarget.nextElementSibling as HTMLElement
                          if (nextElement) {
                            nextElement.style.display = 'flex'
                          }
                        }}
                      />
                    ) : null}
                    <div className={`w-full h-full flex items-center justify-center text-gray-500 text-6xl ${blog.image ? 'hidden' : 'flex'}`}>
                      📝
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-4 py-1.5 bg-[#D7263D] text-white text-xs font-semibold rounded-full mb-4">Blog</span>
                    <h3 className="text-xl font-bold text-black mb-3 line-clamp-2 leading-tight">{blog.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{blog.content.substring(0, 150)}...</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User size={14} />
                        <span>{blog.author}</span>
                      </div>
                    </div>
                    <Link href={`/blog/${blog._id}`} className="inline-flex items-center gap-2 text-[#D7263D] font-semibold hover:text-[#F03A47] transition-colors">
                      Read More <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Blog Posts Yet</h3>
              <p className="text-gray-500">Blog posts will appear here once they are added from the admin panel.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
