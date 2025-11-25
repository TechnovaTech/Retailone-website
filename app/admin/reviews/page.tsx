"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Plus, Edit, Trash2, Star, MessageSquare, Users, TrendingUp } from "lucide-react"
import AdminNavbar from "@/components/admin-navbar"

interface Review {
  _id: string
  customerName: string
  shopName: string
  rating: number
  comment: string
  videoUrl?: string
  createdAt: string
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingReview, setEditingReview] = useState<Review | null>(null)
  const [formData, setFormData] = useState({
    customerName: '',
    shopName: '',
    rating: 5,
    comment: '',
    videoUrl: ''
  })

  const stats = [
    { title: "Total Reviews", value: reviews.length.toString(), icon: MessageSquare, color: "text-blue-600" },
    { title: "5 Star Reviews", value: reviews.filter(r => r.rating === 5).length.toString(), icon: Star, color: "text-yellow-600" },
    { title: "Avg Rating", value: reviews.length ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : "0", icon: TrendingUp, color: "text-green-600" },
    { title: "With Video", value: reviews.filter(r => r.videoUrl).length.toString(), icon: Users, color: "text-purple-600" },
  ]

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

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar title="Reviews Management" subtitle="Manage customer testimonials and feedback" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          <Button 
            className="bg-[#D7263D] hover:bg-[#F03A47]"
            onClick={() => setShowForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Review
          </Button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{editingReview ? 'Edit Review' : 'Add New Review'}</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setShowForm(false)
                      setEditingReview(null)
                      setFormData({ customerName: '', shopName: '', rating: 5, comment: '', videoUrl: '' })
                    }}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Input
                  placeholder="Customer Name"
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  required
                />
                <Input
                  placeholder="Shop Name"
                  value={formData.shopName}
                  onChange={(e) => setFormData({...formData, shopName: e.target.value})}
                  required
                />
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                  className="p-3 border rounded-lg"
                >
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                </select>
                <Input
                  placeholder="Video URL (optional)"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                />
                <textarea
                  placeholder="Review comment..."
                  value={formData.comment}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                  className="lg:col-span-2 p-3 border rounded-lg h-24"
                  required
                />
                <div className="lg:col-span-2 flex gap-2">
                  <Button type="submit" className="bg-[#D7263D] hover:bg-[#F03A47]">
                    {editingReview ? 'Update' : 'Add'} Review
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setShowForm(false)
                      setEditingReview(null)
                      setFormData({ customerName: '', shopName: '', rating: 5, comment: '', videoUrl: '' })
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
              </CardContent>
            </Card>
          </div>
        )}

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>All Reviews</CardTitle>
                <CardDescription>Manage customer testimonials</CardDescription>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <div key={review._id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{review.customerName}</h3>
                      <p className="text-gray-600">{review.shopName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-gray-500">({review.rating}/5)</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(review)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(review._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                    {review.videoUrl && (
                      <a href={review.videoUrl} target="_blank" className="text-blue-500 hover:underline">
                        Watch Video
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}