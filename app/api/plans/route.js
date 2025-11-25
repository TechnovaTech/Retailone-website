import { NextResponse } from 'next/server'

// Cache for plans data
let plansCache = null
let cacheTimestamp = null
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

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

async function fetchFromERP() {
  const erpApiUrl = process.env.NEXT_PUBLIC_ERP_API_BASE_URL
  const erpApiKey = process.env.NEXT_PUBLIC_ERP_API_KEY

  if (!erpApiUrl) {
    throw new Error('ERP URL not configured')
  }

  const response = await fetch(`${erpApiUrl}/api/public/plans`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': erpApiKey || ''
    },
    cache: 'no-store'
  })

  if (!response.ok) {
    throw new Error(`ERP API returned status: ${response.status}`)
  }

  const result = await response.json()
  
  if (!result.success || !result.data || !Array.isArray(result.data)) {
    throw new Error('Invalid ERP response format')
  }

  return result.data.map(plan => ({
    id: plan._id || plan.id,
    name: plan.name,
    price: plan.price,
    description: plan.description || `${plan.name} - Perfect for your business needs`,
    maxProducts: plan.maxProducts === -1 ? 'Unlimited' : plan.maxProducts,
    durationDays: plan.durationDays || 365,
    features: plan.allowedFeatures || plan.features || [],
    isActive: plan.isActive !== false,
    sortOrder: plan.sortOrder || 0
  })).filter(plan => plan.isActive).sort((a, b) => a.sortOrder - b.sortOrder)
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const forceRefresh = searchParams.get('refresh') === 'true'
    
    // Check cache
    const now = Date.now()
    if (!forceRefresh && plansCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
      return NextResponse.json(plansCache)
    }

    console.log('Fetching plans from ERP:', process.env.NEXT_PUBLIC_ERP_API_BASE_URL)
    
    const plans = await fetchFromERP()
    
    // Update cache
    plansCache = plans
    cacheTimestamp = now
    
    console.log(`Successfully fetched ${plans.length} plans from ERP`)
    return NextResponse.json(plans)
    
  } catch (error) {
    console.log('Error fetching from ERP:', error.message)
    
    // Return cached data if available
    if (plansCache) {
      console.log('Returning cached plans due to ERP error')
      return NextResponse.json(plansCache)
    }
    
    console.log('Using fallback plans')
    return NextResponse.json(fallbackPlans)
  }
}

// Clear cache (for webhook)
export async function POST(request) {
  try {
    const webhookSecret = process.env.ERP_WEBHOOK_SECRET
    const signature = request.headers.get('x-webhook-signature')
    
    if (!webhookSecret || signature !== webhookSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Clear cache to force refresh
    plansCache = null
    cacheTimestamp = null
    
    console.log('Plans cache cleared via webhook')
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}