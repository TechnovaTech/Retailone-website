"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, User, ArrowLeft } from "lucide-react"
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

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBlog()
  }, [])

  const fetchBlog = async () => {
    try {
      const response = await fetch('/api/blogs')
      const blogs = await response.json()
      const foundBlog = blogs.find((b: Blog) => b._id === params.slug)
      setBlog(foundBlog || null)
    } catch (error) {
      console.error('Error fetching blog:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D7263D] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-24 pb-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D7263D] text-white rounded-lg font-semibold hover:bg-[#F03A47] transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 lg:px-8 bg-gradient-to-br from-[#fef2f2] to-[#fee2e2] relative overflow-hidden">
        <div className="absolute inset-0 bg-red-900/5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-red-200/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-red-100/15 rounded-full blur-2xl"></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-[#D7263D] font-semibold hover:text-[#F03A47] transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{blog.author}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Content Section */}
      <main className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {blog.image && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="relative h-96 w-full rounded-2xl overflow-hidden mb-12 shadow-lg"
            >
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-full object-cover"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
            </motion.div>
          )}

          <motion.article 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
              {blog.content}
            </div>
          </motion.article>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        .prose h2 {
          font-size: 1.75rem;
          font-weight: 600;
          color: #374151;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .prose p {
          color: #4b5563;
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }
      `}</style>
    </div>
  )
}