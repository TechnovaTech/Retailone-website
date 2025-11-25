// Add this file to ERP: /api/public/plans/route.js
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Get plans from your ERP database
    const plans = await db.collection('plans').find({ active: true }).toArray()
    
    return NextResponse.json({
      success: true,
      data: plans.map(plan => ({
        _id: plan._id.toString(),
        name: plan.name,
        price: plan.price,
        description: plan.description,
        maxProducts: plan.maxProducts,
        durationDays: plan.durationDays || 365,
        features: plan.features || []
      }))
    })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}