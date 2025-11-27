import { NextResponse } from 'next/server'

// Cache for plans data
let plansCache = null
let cacheTimestamp = null
const CACHE_DURATION = 30 * 1000 // 30 seconds

const fallbackPlans = [
  {
    id: 'retalians-standard',
    name: 'Retalians Standard',
    price: 3199,
    description: 'Perfect for your business needs',
    maxProducts: 500,
    durationDays: 1095,
    features: [
      'Business Overview',
      'Inventory Management',
      'Purchase Orders',
      'Customer Management',
      'Point of Sale (POS)',
      'Bills & Invoicing',
      'Staff Management',
      'Commission Management'
    ],
    isActive: true,
    sortOrder: 1
  },
  {
    id: 'retalians-pro',
    name: 'Retalians Pro',
    price: 7999,
    description: 'Advanced features for growing businesses',
    maxProducts: 2000,
    durationDays: 365,
    features: [
      'Everything in Standard Plan',
      'Advanced Analytics & Insights',
      'Multi-store Management',
      'Employee Management System',
      'Advanced Reporting Dashboard',
      'API Integration Support',
      'Custom Fields & Categories',
      'Loyalty Program Management',
      'Supplier Management',
      'Advanced Security Features',
      'Data Export & Backup',
      'Priority Customer Support'
    ],
    isActive: true,
    sortOrder: 2
  },
  {
    id: 'retalians-enterprise',
    name: 'Retalians Enterprise',
    price: 15999,
    description: 'Complete solution for large enterprises',
    maxProducts: -1,
    durationDays: 365,
    features: [
      'Everything in Pro Plan',
      'Unlimited Products & Locations',
      'Custom Integrations',
      'White-label Solutions',
      'Advanced User Permissions',
      'Custom Workflow Automation',
      'Dedicated Account Manager',
      '24/7 Priority Support',
      'Custom Training Sessions',
      'Advanced Security & Compliance',
      'Custom Reports & Dashboards',
      'Enterprise-grade Infrastructure'
    ],
    isActive: true,
    sortOrder: 3
  }
]

async function fetchFromERP() {
  const erpApiUrl = process.env.NEXT_PUBLIC_ERP_API_BASE_URL
  const erpApiKey = process.env.NEXT_PUBLIC_ERP_API_KEY

  if (!erpApiUrl) {
    throw new Error('ERP URL not configured')
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout
  
  const response = await fetch(`${erpApiUrl}/api/public/plans?t=${Date.now()}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': erpApiKey || '',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    },
    cache: 'no-store',
    signal: controller.signal
  })
  
  clearTimeout(timeoutId)

  if (!response.ok) {
    throw new Error(`ERP API returned status: ${response.status}`)
  }

  const result = await response.json()
  
  if (!result.success || !result.data || !Array.isArray(result.data)) {
    throw new Error('Invalid ERP response format')
  }

  return result.data.map(plan => {
    let features = plan.allowedFeatures || plan.features || []
    
    // Fix concatenated features from ERP
    if (typeof features === 'string') {
      features = features.split(/(?=[A-Z])/).filter(f => f.length > 0)
    }
    
    // Map basic features to professional names
    const featureMap = {
      'inventory': 'Inventory Management',
      'pos': 'Inventory Management',
      'customers': 'Customer Management',
      'customerlist': 'Customer Management',
      'bills': 'Bills & Purchase Records',
      'bill': 'Bills & Purchase Records',
      'purchases': 'Bills & Purchase Records',
      'purchase': 'Bills & Purchase Records',
      'hr': 'HR & Staff Management',
      'staff': 'HR & Staff Management',
      'commission': 'HR & Staff Management',
      'salary': 'HR & Staff Management',
      'leaves': 'HR & Staff Management',
      'dashboard': 'Reports & Analysis',
      'analysis': 'Reports & Analysis',
      'reports': 'Reports & Analysis',
      'expense': 'Expense Tracking',
      'expenses': 'Expense Tracking',
      'service': '24/7 Support & Alerts',
      'support': '24/7 Support & Alerts',
      'alerts': '24/7 Support & Alerts',
      'multilingual': '24/7 Support & Alerts',
      'settings':'Customize Settings',
      'whatsapp':'Customize Settings',
      'referrals':'Customize Settings',
      'dropdownsettings':'Customize Settings',
    }
    
    const mappedFeatures = features.map(f => {
      const key = f.toLowerCase().trim()
      return featureMap[key] || f
    })
    
    // Remove duplicates
    const uniqueFeatures = [...new Set(mappedFeatures)]
    
    return {
      id: plan._id || plan.id,
      name: plan.name,
      price: plan.price,
      description: plan.description || `Perfect for your business needs`,
      maxProducts: plan.maxProducts === -1 ? 'Unlimited' : plan.maxProducts,
      durationDays: plan.durationDays || 365,
      features: uniqueFeatures,
      isActive: plan.isActive !== false,
      sortOrder: plan.sortOrder || 0
    }
  }).filter(plan => plan.isActive).sort((a, b) => a.sortOrder - b.sortOrder)
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