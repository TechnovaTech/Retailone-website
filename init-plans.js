const { MongoClient } = require('mongodb')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Retailians'

const plans = [
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
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'retalians-pro',
    name: 'Retalians Pro',
    price: 7999,
    description: 'Advanced features for growing businesses',
    maxProducts: 2000,
    durationDays: 365,
    allowedFeatures: [
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
    active: true,
    sortOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'retalians-enterprise',
    name: 'Retalians Enterprise',
    price: 15999,
    description: 'Complete solution for large enterprises',
    maxProducts: -1, // Unlimited
    durationDays: 365,
    allowedFeatures: [
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
    active: true,
    sortOrder: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

async function initializePlans() {
  const client = new MongoClient(MONGODB_URI)
  
  try {
    await client.connect()
    console.log('Connected to MongoDB')
    
    const db = client.db()
    const plansCollection = db.collection('plans')
    
    // Clear existing plans
    await plansCollection.deleteMany({})
    console.log('Cleared existing plans')
    
    // Insert new plans
    const result = await plansCollection.insertMany(plans)
    console.log(`Inserted ${result.insertedCount} plans`)
    
    // Verify insertion
    const insertedPlans = await plansCollection.find({}).toArray()
    console.log('Plans in database:')
    insertedPlans.forEach(plan => {
      console.log(`- ${plan.name}: ₹${plan.price}/year (${plan.allowedFeatures.length} features)`)
    })
    
  } catch (error) {
    console.error('Error initializing plans:', error)
  } finally {
    await client.close()
  }
}

if (require.main === module) {
  initializePlans()
}

module.exports = { initializePlans, plans }