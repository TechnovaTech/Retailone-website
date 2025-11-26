// Copy this to: https://erp.fashionpos.space/api/public/plans/route.js

import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET(request) {
  try {
    // Check API key
    const apiKey = request.headers.get('x-api-key')
    if (apiKey !== 'erp_091d0757a4791fa4f0e965246427a54afc150b79d7deb4777ca49be9ac93865f') {
      return NextResponse.json({ success: false, error: 'Invalid API key' }, { status: 401 })
    }

    const { db } = await connectToDatabase()
    
    // Fetch active plans
    const plans = await db.collection('plans').find({ 
      isActive: { $ne: false }
    }).sort({ sortOrder: 1 }).toArray()
    
    // Format for website
    const formattedPlans = plans.map(plan => ({
      _id: plan._id.toString(),
      id: plan._id.toString(),
      name: plan.name,
      price: plan.price,
      description: plan.description,
      maxProducts: plan.maxProducts,
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