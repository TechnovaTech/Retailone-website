"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Plus, Edit, Trash2, Star, MessageSquare, Users, TrendingUp, Mail, Phone, Calendar, Lock, LogOut, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

interface Review {
  _id: string
  customerName: string
  shopName: string
  rating: number
  comment: string
  videoUrl?: string
  createdAt: string
}

interface Blog {
  _id: string
  title: string
  author: string
  content: string
  image?: string
  createdAt: string
  status: string
}

interface Contact {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
  status: string
  createdAt: string
}

interface Service {
  _id: string
  name: string
  icon: string
  description: string
  createdAt: string
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("reviews")
  const [searchTerm, setSearchTerm] = useState("")
  const [reviews, setReviews] = useState<Review[]>([])
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [serviceFormData, setServiceFormData] = useState({
    name: '',
    icon: ''
  })
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [aboutStats, setAboutStats] = useState({
    customers: '5000+',
    teamMembers: '100+',
    yearsExperience: '7+'
  })
  const [editingStats, setEditingStats] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingReview, setEditingReview] = useState<Review | null>(null)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [formData, setFormData] = useState({
    customerName: '',
    shopName: '',
    rating: 5,
    comment: '',
    videoUrl: ''
  })
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    author: '',
    content: '',
    image: ''
  })

  const stats = [
    { title: "Total Reviews", value: reviews.length.toString(), icon: MessageSquare, color: "text-blue-600" },
    { title: "5 Star Reviews", value: reviews.filter(r => r.rating === 5).length.toString(), icon: Star, color: "text-yellow-600" },
    { title: "Avg Rating", value: reviews.length ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : "0", icon: TrendingUp, color: "text-green-600" },
    { title: "With Video", value: reviews.filter(r => r.videoUrl).length.toString(), icon: Users, color: "text-purple-600" },
  ]

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn")
    if (loggedIn === "true") {
      setIsLoggedIn(true)
      fetchReviews()
      fetchBlogs()
      fetchContacts()
      fetchServices()
      fetchAboutStats()
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        localStorage.setItem("adminLoggedIn", "true")
        setIsLoggedIn(true)
        setLoginError("")
        fetchReviews()
        fetchBlogs()
        fetchContacts()
        fetchServices()
        fetchAboutStats()
      } else {
        setLoginError(data.error || "Invalid credentials")
      }
    } catch (error) {
      setLoginError("Login failed. Please try again.")
    }
  }

  const handleForgotPassword = async () => {
    setLoginError("")
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      
      const data = await response.json()
      
      if (response.ok) {
        alert(data.message)
      } else {
        alert(data.error || "Failed to send reset link")
      }
    } catch (error) {
      alert("Failed to send reset link. Please try again.")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    setIsLoggedIn(false)
    setEmail("")
    setPassword("")
  }

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews')
      const data = await response.json()
      setReviews(data)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs')
      const data = await response.json()
      setBlogs(data)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    }
  }

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts')
      const data = await response.json()
      setContacts(data)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
  }

  const updateContactStatus = async (id: string, status: string) => {
    try {
      const response = await fetch('/api/contacts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      })
      if (response.ok) {
        fetchContacts()
      }
    } catch (error) {
      console.error('Error updating contact status:', error)
    }
  }

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      const data = await response.json()
      setServices(data)
    } catch (error) {
      console.error('Error fetching services:', error)
    }
  }

  const fetchAboutStats = async () => {
    try {
      const response = await fetch('/api/about-stats')
      const data = await response.json()
      setAboutStats(data)
    } catch (error) {
      console.error('Error fetching about stats:', error)
    }
  }

  const saveAboutStats = async () => {
    try {
      console.log('Saving stats:', aboutStats)
      const response = await fetch('/api/about-stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aboutStats)
      })
      
      const result = await response.json()
      console.log('Save response:', result)
      
      if (response.ok) {
        setEditingStats(false)
        alert('Stats saved successfully!')
      } else {
        alert(`Failed to save stats: ${result.error}`)
      }
    } catch (error) {
      console.error('Error saving about stats:', error)
      alert(`Error saving stats: ${error.message}`)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const method = editingReview ? 'PUT' : 'POST'
      const body = editingReview ? { ...formData, _id: editingReview._id } : formData
      
      const response = await fetch('/api/reviews', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      
      if (response.ok) {
        fetchReviews()
        setShowForm(false)
        setEditingReview(null)
        setFormData({ customerName: '', shopName: '', rating: 5, comment: '', videoUrl: '' })
      }
    } catch (error) {
      console.error('Error saving review:', error)
    }
  }

  const handleEdit = (review: Review) => {
    setEditingReview(review)
    setFormData({
      customerName: review.customerName,
      shopName: review.shopName,
      rating: review.rating,
      comment: review.comment,
      videoUrl: review.videoUrl || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      try {
        const response = await fetch(`/api/reviews?id=${id}`, { method: 'DELETE' })
        if (response.ok) {
          fetchReviews()
        }
      } catch (error) {
        console.error('Error deleting review:', error)
      }
    }
  }

  const filteredReviews = reviews.filter(review =>
    review.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.shopName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
    ))
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-sm shadow-lg border-2">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-[#D7263D] rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">Admin Login</CardTitle>
            <CardDescription className="text-sm sm:text-base text-gray-600">Enter credentials to access admin panel</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-6">
            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2 border-gray-300 focus:border-[#D7263D] h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base"
                  required
                />
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-2 border-gray-300 focus:border-[#D7263D] h-10 sm:h-12 px-3 sm:px-4 pr-10 sm:pr-12 text-sm sm:text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
              {loginError && (
                <div className="text-red-600 text-xs sm:text-sm text-center bg-red-50 p-2 sm:p-3 rounded border border-red-200">
                  {loginError}
                </div>
              )}
              <div className="flex justify-center">
                <Button type="submit" className="bg-[#D7263D] hover:bg-[#F03A47] px-6 sm:px-8 py-2 sm:py-3 text-white font-medium text-sm sm:text-base w-full sm:w-auto">
                  Login
                </Button>
              </div>
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs sm:text-sm text-[#D7263D] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4"><div className="text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D7263D] mx-auto mb-4"></div><p className="text-gray-600">Loading...</p></div></div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-4 lg:py-6 gap-4">
            <div className="text-center lg:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 text-sm lg:text-base">Manage reviews and blog posts</p>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-1 sm:gap-2 lg:gap-4 items-center">
              <Link href="/admin/reviews" className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm lg:px-4 lg:text-base rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-100 border">
                Reviews
              </Link>
              <Link href="/admin/blogs" className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm lg:px-4 lg:text-base rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-100 border">
                Blogs
              </Link>
              <Link href="/admin/messages" className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm lg:px-4 lg:text-base rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-100 border">
                Messages
              </Link>
              <Link href="/admin/services" className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm lg:px-4 lg:text-base rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-100 border">
                Services
              </Link>
              <Link href="/admin/about" className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm lg:px-4 lg:text-base rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-100 border">
                About
              </Link>
              <Link href="/admin/social-media" className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm lg:px-4 lg:text-base rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-100 border">
                Social
              </Link>
              <Link href="/admin/comparisons" className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm lg:px-4 lg:text-base rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-100 border">
                Comparisons
              </Link>
              <Button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1 lg:gap-2 px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm lg:px-4 lg:text-base"
              >
                <LogOut className="w-3 h-3 lg:w-4 lg:h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Welcome to Admin Dashboard</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-4">Select a section from the navigation above to manage your content</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Link href="/admin/reviews" className="block p-4 sm:p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <MessageSquare className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Reviews</h3>
              <p className="text-sm sm:text-base text-gray-600">Manage customer testimonials and feedback</p>
            </Link>
            
            <Link href="/admin/blogs" className="block p-4 sm:p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <Edit className="w-8 h-8 sm:w-12 sm:h-12 text-green-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Blogs</h3>
              <p className="text-sm sm:text-base text-gray-600">Create and manage blog posts</p>
            </Link>
            
            <Link href="/admin/messages" className="block p-4 sm:p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <Mail className="w-8 h-8 sm:w-12 sm:h-12 text-purple-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Messages</h3>
              <p className="text-sm sm:text-base text-gray-600">View and respond to contact messages</p>
            </Link>
            
            <Link href="/admin/services" className="block p-4 sm:p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <Star className="w-8 h-8 sm:w-12 sm:h-12 text-orange-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Services</h3>
              <p className="text-sm sm:text-base text-gray-600">Manage your service offerings</p>
            </Link>
            
            <Link href="/admin/about" className="block p-4 sm:p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <Users className="w-8 h-8 sm:w-12 sm:h-12 text-red-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">About Stats</h3>
              <p className="text-sm sm:text-base text-gray-600">Update company statistics</p>
            </Link>
            
            <Link href="/admin/social-media" className="block p-4 sm:p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <MessageSquare className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Social Media</h3>
              <p className="text-sm sm:text-base text-gray-600">Manage social media links</p>
            </Link>
            
            <Link href="/admin/comparisons" className="block p-4 sm:p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <TrendingUp className="w-8 h-8 sm:w-12 sm:h-12 text-indigo-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Comparisons</h3>
              <p className="text-sm sm:text-base text-gray-600">Manage software comparisons</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}