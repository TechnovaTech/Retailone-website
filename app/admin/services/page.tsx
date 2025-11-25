"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
import AdminNavbar from "@/components/admin-navbar"

interface Service {
  _id: string
  name: string
  icon: string
  description: string
  createdAt: string
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [serviceFormData, setServiceFormData] = useState({
    name: '',
    icon: ''
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      const data = await response.json()
      setServices(data)
    } catch (error) {
      console.error('Error fetching services:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar title="Services Management" subtitle="Manage your service offerings" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Services List</h2>
          <Button 
            className="bg-[#D7263D] hover:bg-[#F03A47]"
            onClick={() => setShowForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{editingService ? 'Edit Service' : 'Add New Service'}</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setShowForm(false)
                      setEditingService(null)
                      setServiceFormData({ name: '', icon: '' })
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
                  const method = editingService ? 'PUT' : 'POST'
                  const body = editingService ? { ...serviceFormData, _id: editingService._id } : serviceFormData
                  
                  const response = await fetch('/api/services', {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                  })
                  if (response.ok) {
                    fetchServices()
                    setShowForm(false)
                    setEditingService(null)
                    setServiceFormData({ name: '', icon: '' })
                  }
                } catch (error) {
                  console.error('Error saving service:', error)
                }
              }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Service Name"
                  value={serviceFormData.name}
                  onChange={(e) => setServiceFormData({...serviceFormData, name: e.target.value})}
                  required
                />
                <Input
                  placeholder="Icon (emoji or text)"
                  value={serviceFormData.icon}
                  onChange={(e) => setServiceFormData({...serviceFormData, icon: e.target.value})}
                  required
                />
                <div className="md:col-span-2 flex gap-2">
                  <Button type="submit" className="bg-[#D7263D] hover:bg-[#F03A47]">
                    {editingService ? 'Update' : 'Add'} Service
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setShowForm(false)
                      setEditingService(null)
                      setServiceFormData({ name: '', icon: '' })
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
            <CardTitle>All Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Plus className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No services yet. Add your first service!</p>
                </div>
              ) : (
                services.map((service) => (
                  <div key={service._id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{service.icon}</span>
                        <div>
                          <h3 className="font-semibold text-lg">{service.name}</h3>
                          <p className="text-xs text-gray-500 mt-1">{new Date(service.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setEditingService(service)
                            setServiceFormData({
                              name: service.name,
                              icon: service.icon
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
                            if (confirm('Are you sure you want to delete this service?')) {
                              try {
                                const response = await fetch(`/api/services?id=${service._id}`, { method: 'DELETE' })
                                if (response.ok) {
                                  fetchServices()
                                }
                              } catch (error) {
                                console.error('Error deleting service:', error)
                              }
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}