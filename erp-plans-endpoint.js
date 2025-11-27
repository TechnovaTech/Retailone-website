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
    let plans = await db.collection('plans').find({ active: true }).toArray()
    
    // If no plans in database, use default plans
    if (!plans || plans.length === 0) {
      plans = [
        {
          _id: 'retalians-standard',
          name: 'Retalians Standard',
          price: 3199,
          description: 'Perfect for your business needs',
          maxProducts: 500,
          durationDays: 1095,
          allowedFeatures: [
            'Business Overview',
            'Inventory Management',
            'Purchase Orders',
            'Customer Management',
            'Point of Sale (POS)',
            'Bills & Invoicing',
            'Staff Management',
            'Commission Management'
          ],
          active: true,
          sortOrder: 1
        }
      ]
    }
    
    // Format for website
    const formattedPlans = plans.map(plan => ({
      id: plan._id.toString(),
      name: plan.name,
      price: plan.price,
      description: plan.description,
      maxProducts: plan.maxProducts,
      durationDays: plan.durationDays || 365,
      features: plan.allowedFeatures || plan.features || [],
      isActive: plan.active !== false,
      sortOrder: plan.sortOrder || 0
    }))

    return NextResponse.json({
      success: true,
      data: formattedPlans.filter(plan => plan.isActive).sort((a, b) => a.sortOrder - b.sortOrder)
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch plans' 
    }, { status: 500 })
  }
}