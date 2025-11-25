# ERP Integration Guide for Plans

## Overview
This guide explains how to set up the ERP system at https://erp.fashionpos.space/ to automatically sync plans with the website.

## 1. ERP API Endpoint Setup

Add this endpoint to your ERP system at `https://erp.fashionpos.space/api/public/plans`:

```javascript
// File: pages/api/public/plans.js or app/api/public/plans/route.js
import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb' // Your DB connection

export async function GET(request) {
  try {
    // Optional: Check API key for security
    const apiKey = request.headers.get('x-api-key')
    if (process.env.API_KEY_REQUIRED && apiKey !== process.env.PUBLIC_API_KEY) {
      return NextResponse.json({ success: false, error: 'Invalid API key' }, { status: 401 })
    }

    const { db } = await connectToDatabase()
    
    // Fetch active plans from your ERP database
    const plans = await db.collection('plans').find({ 
      isActive: true 
    }).sort({ sortOrder: 1 }).toArray()
    
    // Format for website consumption
    const formattedPlans = plans.map(plan => ({
      _id: plan._id.toString(),
      name: plan.name,
      price: plan.price,
      description: plan.description,
      maxProducts: plan.maxProducts, // Use -1 for unlimited
      durationDays: plan.durationDays || 365,
      features: plan.features || [],
      allowedFeatures: plan.allowedFeatures || plan.features || [],
      isActive: plan.isActive !== false,
      sortOrder: plan.sortOrder || 0
    }))

    return NextResponse.json({
      success: true,
      data: formattedPlans,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Plans API error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch plans' 
    }, { status: 500 })
  }
}
```

## 2. Database Schema

Ensure your plans collection has this structure:

```javascript
{
  _id: ObjectId,
  name: "Basic Plan",
  price: 5000,
  description: "Perfect for small businesses",
  maxProducts: 100, // -1 for unlimited
  durationDays: 365,
  features: [
    "Inventory Management",
    "Basic Reporting",
    "Customer Management"
  ],
  isActive: true,
  sortOrder: 1,
  createdAt: Date,
  updatedAt: Date
}
```

## 3. Webhook Setup (Optional but Recommended)

Add webhook triggers when plans are created/updated/deleted:

```javascript
// In your plan management functions
async function updatePlan(planId, updateData) {
  // Update plan in database
  await db.collection('plans').updateOne(
    { _id: planId },
    { $set: { ...updateData, updatedAt: new Date() } }
  )
  
  // Trigger webhook to refresh website cache
  await triggerWebhook()
}

async function triggerWebhook() {
  try {
    await fetch('https://your-website.com/api/webhooks/plans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-signature': process.env.WEBHOOK_SECRET
      },
      body: JSON.stringify({
        event: 'plans_updated',
        timestamp: new Date().toISOString()
      })
    })
  } catch (error) {
    console.error('Webhook failed:', error)
  }
}
```

## 4. Environment Variables

Add these to your ERP system's environment:

```env
# Optional API key for security
PUBLIC_API_KEY=your-secure-api-key
API_KEY_REQUIRED=true

# Webhook secret for website updates
WEBHOOK_SECRET=your-webhook-secret-here
```

## 5. CORS Configuration

Ensure your ERP system allows requests from your website:

```javascript
// In your API route or middleware
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://your-website.com',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
}

// Add to your response
return NextResponse.json(data, { headers: corsHeaders })
```

## 6. Testing the Integration

1. Ensure the ERP endpoint is accessible at: `https://erp.fashionpos.space/api/public/plans`
2. Test the endpoint returns the expected JSON format
3. Verify the website can fetch and display plans
4. Test webhook functionality (if implemented)

## 7. Admin Interface

The website includes an admin interface at `/admin/plans` that shows:
- Current plans from ERP
- Connection status
- Manual refresh option
- Direct link to ERP management

## 8. Automatic Updates

The system includes:
- 5-minute cache duration
- Auto-refresh every 10 minutes on frontend
- Webhook support for instant updates
- Fallback plans if ERP is unavailable

## Security Notes

- Use HTTPS for all communications
- Implement API key authentication
- Validate webhook signatures
- Rate limit the public API endpoint
- Monitor for unusual access patterns