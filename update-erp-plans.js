// Script to update ERP plans via API
const fetch = require('node-fetch')

const ERP_API_URL = 'https://erp.fashionpos.space'
const API_KEY = 'erp_091d0757a4791fa4f0e965246427a54afc150b79d7deb4777ca49be9ac93865f'

const updatedPlan = {
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

async function updateERPPlan() {
  try {
    console.log('Updating ERP plan...')
    
    // Update the plan in ERP system
    const response = await fetch(`${ERP_API_URL}/api/admin/plans/retalians-standard`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify(updatedPlan)
    })
    
    if (response.ok) {
      console.log('✅ ERP plan updated successfully!')
    } else {
      console.log('❌ Failed to update ERP plan:', response.status)
    }
    
    // Verify the update
    const checkResponse = await fetch(`${ERP_API_URL}/api/public/plans`, {
      headers: {
        'x-api-key': API_KEY
      }
    })
    
    if (checkResponse.ok) {
      const data = await checkResponse.json()
      console.log('\nUpdated ERP plans:')
      data.data?.forEach(plan => {
        console.log(`- ${plan.name}: ${plan.features?.length || plan.allowedFeatures?.length} features`)
      })
    }
    
  } catch (error) {
    console.error('Error updating ERP:', error.message)
  }
}

updateERPPlan()