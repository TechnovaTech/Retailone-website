// Add this to your ERP system at https://erp.fashionpos.space/
// File: pages/api/public/plans.js or app/api/public/plans/route.js

import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb' // Your DB connection

export async function GET(request) {
  try {
    // Check API key
    const apiKey = request.headers.get('x-api-key')
    if (apiKey !== process.env.NEXTAUTH_SECRET) {
      return NextResponse.json({ success: false, error: 'Invalid API key' }, { status: 401 })
    }

    const { db } = await connectToDatabase()
    
    // Fetch plans from your ERP database
    const plans = await db.collection('plans').find({ active: true }).toArray()
    
    // Format for website
    const formattedPlans = plans.map(plan => ({
      id: plan._id.toString(),
      name: plan.name,
      price: plan.price,
      description: plan.description,
      maxProducts: plan.maxProducts,
      durationDays: plan.durationDays || 365,
      features: plan.features || []
    }))

    return NextResponse.json({
      success: true,
      data: formattedPlans
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch plans' 
    }, { status: 500 })
  }
}