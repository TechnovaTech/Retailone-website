import { NextResponse } from 'next/server'

const fallbackPlans = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 5000,
    description: 'Perfect for small businesses',
    maxProducts: 100,
    durationDays: 365,
    features: ['Inventory Management', 'Basic Reporting', 'Customer Management']
  },
  {
    id: 'pro',
    name: 'Professional Plan',
    price: 12000,
    description: 'Ideal for growing businesses',
    maxProducts: 500,
    durationDays: 365,
    features: ['Advanced Inventory', 'Analytics', 'Multi-location Support']
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    price: 25000,
    description: 'Complete solution for large businesses',
    maxProducts: -1,
    durationDays: 365,
    features: ['Unlimited Products', 'Custom Integrations', '24/7 Support']
  }
]

export async function GET() {
  try {
    const erpApiUrl = process.env.NEXT_PUBLIC_ERP_API_BASE_URL
    const erpApiKey = process.env.NEXT_PUBLIC_ERP_API_KEY

    if (!erpApiUrl) {
      console.log('ERP URL not configured, using fallback')
      return NextResponse.json(fallbackPlans)
    }

    console.log('Fetching plans from ERP:', `${erpApiUrl}/api/plans`)
        
    const response = await fetch(`${erpApiUrl}/api/plans`, {
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    if (response.ok) {
      const result = await response.json()
      
      if (result.data && Array.isArray(result.data)) {
        // Format ERP data for website
        const formattedPlans = result.data.map(plan => ({
          id: plan._id || plan.id,
          name: plan.name,
          price: plan.price,
          description: plan.description || `${plan.name} - Perfect for your business needs`,
          maxProducts: plan.maxProducts,
          durationDays: plan.durationDays,
          features: plan.allowedFeatures || plan.features || []
        }))
        
        console.log(`Successfully fetched ${formattedPlans.length} plans from ERP`)
        return NextResponse.json(formattedPlans)
      }
    } else {
      console.log(`ERP API returned status: ${response.status}`)
    }
    
    console.log('ERP fetch failed, using fallback plans')
    return NextResponse.json(fallbackPlans)
  } catch (error) {
    console.log('Error fetching from ERP:', error.message)
    return NextResponse.json(fallbackPlans)
  }
}