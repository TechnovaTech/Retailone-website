// Test script to verify plans display correctly
const fetch = require('node-fetch')

async function testPlansAPI() {
  try {
    console.log('Testing local plans API...')
    
    // Test local API
    const response = await fetch('http://localhost:3000/api/plans')
    const plans = await response.json()
    
    console.log(`\nFound ${plans.length} plans:`)
    console.log('=' .repeat(50))
    
    plans.forEach((plan, index) => {
      console.log(`\n${index + 1}. ${plan.name}`)
      console.log(`   Price: ₹${plan.price}/year`)
      console.log(`   Description: ${plan.description}`)
      console.log(`   Max Products: ${plan.maxProducts === -1 ? 'Unlimited' : plan.maxProducts}`)
      console.log(`   Duration: ${plan.durationDays} days`)
      console.log(`   Features (${plan.features.length}):`)
      plan.features.forEach((feature, i) => {
        console.log(`     ${i + 1}. ${feature}`)
      })
    })
    
    // Verify Retalians Standard plan
    const standardPlan = plans.find(p => p.name === 'Retalians Standard')
    if (standardPlan) {
      console.log('\n✅ Retalians Standard plan found!')
      console.log(`   Price: ₹${standardPlan.price}`)
      console.log(`   Products: ${standardPlan.maxProducts}`)
      console.log(`   Features: ${standardPlan.features.length}`)
      
      // Check for key features
      const keyFeatures = [
        'Complete Dashboard Analytics',
        'Advanced Inventory Management',
        'Point of Sale (POS) System',
        'Customer Relationship Management',
        'Automated Bill Generation',
        'Comprehensive Reports & Analytics'
      ]
      
      const missingFeatures = keyFeatures.filter(f => !standardPlan.features.includes(f))
      if (missingFeatures.length === 0) {
        console.log('✅ All key features present')
      } else {
        console.log('❌ Missing features:', missingFeatures)
      }
    } else {
      console.log('❌ Retalians Standard plan not found!')
    }
    
  } catch (error) {
    console.error('Error testing plans API:', error.message)
  }
}

if (require.main === module) {
  testPlansAPI()
}

module.exports = { testPlansAPI }