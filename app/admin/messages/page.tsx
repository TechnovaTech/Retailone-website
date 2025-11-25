"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Calendar, MessageSquare, Users } from "lucide-react"
import AdminNavbar from "@/components/admin-navbar"

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

export default function AdminMessages() {
  const [contacts, setContacts] = useState<Contact[]>([])

  useEffect(() => {
    fetchContacts()
  }, [])

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

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar title="Messages Management" subtitle="View and respond to contact messages" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Messages</p>
                  <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
                </div>
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Unread</p>
                  <p className="text-2xl font-bold text-gray-900">{contacts.filter(c => c.status === 'unread').length}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Demo Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{contacts.filter(c => c.subject === 'Request Demo').length}</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today</p>
                  <p className="text-2xl font-bold text-gray-900">{contacts.filter(c => new Date(c.createdAt).toDateString() === new Date().toDateString()).length}</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contact Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact._id} className={`border rounded-lg p-4 hover:bg-gray-50 ${contact.status === 'unread' ? 'border-l-4 border-l-red-500 bg-red-50' : ''}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{contact.firstName} {contact.lastName}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${contact.status === 'unread' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {contact.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${contact.email}`} className="hover:text-blue-600">{contact.email}</a>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          <a href={`tel:${contact.phone}`} className="hover:text-blue-600">{contact.phone}</a>
                        </div>
                      </div>
                      <div className="mb-3">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                          {contact.subject}
                        </span>
                        <p className="text-gray-700">{contact.message}</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(contact.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {contact.status === 'unread' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateContactStatus(contact._id, 'read')}
                          className="text-green-600 hover:text-green-700"
                        >
                          Mark Read
                        </Button>
                      )}
                      {contact.status === 'read' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateContactStatus(contact._id, 'unread')}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          Mark Unread
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {contacts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No messages yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}