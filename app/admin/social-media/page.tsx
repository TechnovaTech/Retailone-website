"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Instagram, Youtube, Twitter, MessageCircle, Save } from "lucide-react"
import AdminNavbar from "@/components/admin-navbar"

export default function SocialMediaPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [socialMedia, setSocialMedia] = useState({
    instagram: '',
    youtube: '',
    twitter: '',
    whatsapp: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn")
    if (loggedIn === "true") {
      setIsLoggedIn(true)
      fetchSocialMedia()
    } else {
      window.location.href = '/admin'
    }
  }, [])

  const fetchSocialMedia = async () => {
    try {
      const response = await fetch('/api/social-media')
      const data = await response.json()
      setSocialMedia(data)
    } catch (error) {
      console.error('Error fetching social media:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    try {
      const response = await fetch('/api/social-media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(socialMedia)
      })
      
      if (response.ok) {
        alert('Social media links updated successfully!')
      } else {
        alert('Failed to update social media links')
      }
    } catch (error) {
      console.error('Error saving social media:', error)
      alert('Error saving social media links')
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (platform: string, value: string) => {
    setSocialMedia(prev => ({
      ...prev,
      [platform]: value
    }))
  }

  if (!isLoggedIn || isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar title="Social Media Management" subtitle="Manage your social media presence" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-[#D7263D]" />
              Social Media Configuration
            </CardTitle>
            <CardDescription>
              Add your social media links. These will appear in the website footer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Instagram className="w-4 h-4 text-pink-600" />
                    Instagram URL
                  </label>
                  <Input
                    type="url"
                    placeholder="https://instagram.com/yourpage"
                    value={socialMedia.instagram}
                    onChange={(e) => handleInputChange('instagram', e.target.value)}
                    className="border-2 border-gray-300 focus:border-[#D7263D]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Youtube className="w-4 h-4 text-red-600" />
                    YouTube URL
                  </label>
                  <Input
                    type="url"
                    placeholder="https://youtube.com/@yourchannel"
                    value={socialMedia.youtube}
                    onChange={(e) => handleInputChange('youtube', e.target.value)}
                    className="border-2 border-gray-300 focus:border-[#D7263D]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Twitter className="w-4 h-4 text-blue-600" />
                    Twitter URL
                  </label>
                  <Input
                    type="url"
                    placeholder="https://twitter.com/yourhandle"
                    value={socialMedia.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                    className="border-2 border-gray-300 focus:border-[#D7263D]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                    WhatsApp Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="919427300816"
                    value={socialMedia.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    className="border-2 border-gray-300 focus:border-[#D7263D]"
                  />
                  <p className="text-xs text-gray-500">
                    Enter phone number with country code (without + sign)
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <Button 
                  type="submit" 
                  disabled={isSaving}
                  className="bg-[#D7263D] hover:bg-[#F03A47] text-white flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}