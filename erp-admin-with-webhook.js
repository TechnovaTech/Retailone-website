// Copy this to: https://erp.fashionpos.space/super-admin/plans/page.js

"use client"

import { useState, useEffect } from 'react'

export default function SuperAdminPlans() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/plans')
      const data = await response.json()
      setPlans(data)
    } catch (error) {
      console.error('Error fetching plans:', error)
    } finally {
      setLoading(false)
    }
  }

  const savePlan = async (plan) => {
    try {
      const response = await fetch('/api/plans', {
        method: plan._id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plan)
      })
      if (response.ok) {
        fetchPlans()
        setEditing(null)
        // Trigger webhook to update website
        await triggerWebhook()
      }
    } catch (error) {
      console.error('Error saving plan:', error)
    }
  }

  const deletePlan = async (id) => {
    if (confirm('Delete this plan?')) {
      try {
        await fetch(`/api/plans/${id}`, { method: 'DELETE' })
        fetchPlans()
        // Trigger webhook to update website
        await triggerWebhook()
      } catch (error) {
        console.error('Error deleting plan:', error)
      }
    }
  }

  const triggerWebhook = async () => {
    try {
      // Notify both local and live websites
      const websites = [
        'http://localhost:3000',
        'https://fashionpos.space'
      ]
      
      for (const site of websites) {
        try {
          await fetch(`${site}/api/webhooks/plans`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-webhook-signature': 'erp_webhook_secret_2024'
            },
            body: JSON.stringify({
              event: 'plans_updated',
              timestamp: new Date().toISOString()
            })
          })
          console.log(`Webhook sent to ${site}`)
        } catch (err) {
          console.log(`Webhook failed for ${site}:`, err.message)
        }
      }
    } catch (error) {
      console.log('Webhook error:', error)
    }
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Plans Management</h1>
      
      <button 
        onClick={() => setEditing({})}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add New Plan
      </button>

      <div className="grid gap-4">
        {plans.map(plan => (
          <div key={plan._id} className="border p-4 rounded">
            <h3 className="font-bold">{plan.name}</h3>
            <p>Price: ₹{plan.price}</p>
            <p>Products: {plan.maxProducts}</p>
            <p>Active: {plan.isActive ? 'Yes' : 'No'}</p>
            <div className="mt-2">
              <button 
                onClick={() => setEditing(plan)}
                className="mr-2 px-3 py-1 bg-green-500 text-white rounded"
              >
                Edit
              </button>
              <button 
                onClick={() => deletePlan(plan._id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editing._id ? 'Edit Plan' : 'Add Plan'}
            </h2>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              savePlan({
                ...editing,
                name: formData.get('name'),
                price: parseInt(formData.get('price')),
                description: formData.get('description'),
                maxProducts: parseInt(formData.get('maxProducts')),
                durationDays: parseInt(formData.get('durationDays')),
                features: formData.get('features').split('\n').filter(f => f.trim()),
                isActive: formData.get('isActive') === 'on'
              })
            }}>
              <input 
                name="name" 
                placeholder="Plan Name" 
                defaultValue={editing.name}
                className="w-full mb-2 p-2 border rounded"
                required 
              />
              <input 
                name="price" 
                type="number" 
                placeholder="Price" 
                defaultValue={editing.price}
                className="w-full mb-2 p-2 border rounded"
                required 
              />
              <input 
                name="description" 
                placeholder="Description" 
                defaultValue={editing.description}
                className="w-full mb-2 p-2 border rounded"
              />
              <input 
                name="maxProducts" 
                type="number" 
                placeholder="Max Products (-1 for unlimited)" 
                defaultValue={editing.maxProducts}
                className="w-full mb-2 p-2 border rounded"
              />
              <input 
                name="durationDays" 
                type="number" 
                placeholder="Duration Days" 
                defaultValue={editing.durationDays || 365}
                className="w-full mb-2 p-2 border rounded"
              />
              <textarea 
                name="features" 
                placeholder="Features (one per line)" 
                defaultValue={editing.features?.join('\n')}
                className="w-full mb-2 p-2 border rounded h-20"
              />
              <label className="flex items-center mb-4">
                <input 
                  name="isActive" 
                  type="checkbox" 
                  defaultChecked={editing.isActive !== false}
                  className="mr-2"
                />
                Active
              </label>
              <div className="flex gap-2">
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
                <button 
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}