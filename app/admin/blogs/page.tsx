"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, MessageSquare } from "lucide-react"
import AdminNavbar from "@/components/admin-navbar"

interface Blog {
  _id: string
  title: string
  author: string
  content: string
  image?: string
  createdAt: string
  status: string
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    author: '',
    content: '',
    image: ''
  })

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
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar title="Blog Management" subtitle="Create and manage blog posts" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Blogs</p>
                  <p className="text-2xl font-bold text-gray-900">{blogs.length}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Blog Posts</h2>
          <Button 
            className="bg-[#D7263D] hover:bg-[#F03A47]"
            onClick={() => setShowForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Blog
          </Button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setShowForm(false)
                      setEditingBlog(null)
                      setBlogFormData({ title: '', author: '', content: '', image: '' })
                    }}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
              <form onSubmit={async (e) => {
                e.preventDefault()
                try {
                  const method = editingBlog ? 'PUT' : 'POST'
                  const body = editingBlog ? { ...blogFormData, _id: editingBlog._id } : blogFormData
                  
                  const response = await fetch('/api/blogs', {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                  })
                  if (response.ok) {
                    fetchBlogs()
                    setShowForm(false)
                    setEditingBlog(null)
                    setBlogFormData({ title: '', author: '', content: '', image: '' })
                  }
                } catch (error) {
                  console.error('Error saving blog:', error)
                }
              }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Blog Title"
                  value={blogFormData.title}
                  onChange={(e) => setBlogFormData({...blogFormData, title: e.target.value})}
                  required
                />
                <Input
                  placeholder="Author Name"
                  value={blogFormData.author}
                  onChange={(e) => setBlogFormData({...blogFormData, author: e.target.value})}
                  required
                />
                <div className="md:col-span-2 flex gap-2">
                  <Input
                    placeholder="Image URL or select file"
                    value={blogFormData.image}
                    onChange={(e) => setBlogFormData({...blogFormData, image: e.target.value})}
                    className="flex-1"
                  />
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    id="imageUpload"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onload = (event) => {
                          setBlogFormData({...blogFormData, image: event.target?.result as string})
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => document.getElementById('imageUpload')?.click()}
                  >
                    Add
                  </Button>
                </div>
                <textarea
                  placeholder="Blog content..."
                  value={blogFormData.content}
                  onChange={(e) => setBlogFormData({...blogFormData, content: e.target.value})}
                  className="md:col-span-2 p-3 border rounded-lg h-32"
                  required
                />
                <div className="md:col-span-2 flex gap-2">
                  <Button type="submit" className="bg-[#D7263D] hover:bg-[#F03A47]">
                    {editingBlog ? 'Update' : 'Add'} Blog
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setShowForm(false)
                      setEditingBlog(null)
                      setBlogFormData({ title: '', author: '', content: '', image: '' })
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
            <CardTitle>All Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {blogs.map((blog) => (
                <div key={blog._id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start gap-4">
                    {blog.image && (
                      <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={blog.image} 
                          alt={blog.title}
                          className="w-full h-full object-cover"
                          onError={(e) => e.currentTarget.style.display = 'none'}
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>
                      <p className="text-gray-600 mb-2">By {blog.author}</p>
                      <p className="text-gray-700 text-sm line-clamp-3">{blog.content}</p>
                      <p className="text-xs text-gray-500 mt-2">{new Date(blog.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setEditingBlog(blog)
                          setBlogFormData({
                            title: blog.title,
                            author: blog.author,
                            content: blog.content,
                            image: blog.image || ''
                          })
                          setShowForm(true)
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700"
                        onClick={async () => {
                          if (confirm('Are you sure you want to delete this blog?')) {
                            try {
                              const response = await fetch(`/api/blogs?id=${blog._id}`, { method: 'DELETE' })
                              if (response.ok) {
                                fetchBlogs()
                              }
                            } catch (error) {
                              console.error('Error deleting blog:', error)
                            }
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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