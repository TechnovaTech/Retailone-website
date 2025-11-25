const fetch = require('node-fetch')

async function testERPIntegration() {
  console.log('🔄 Testing ERP Integration...\n')
  
  const erpUrl = 'https://erp.fashionpos.space/api/public/plans'
  const apiKey = 'your-api-key-here' // Update this
  
  try {
    console.log(`📡 Connecting to: ${erpUrl}`)
    
    const response = await fetch(erpUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      }
    })
    
    console.log(`📊 Response Status: ${response.status}`)
    console.log(`📊 Response Headers:`, Object.fromEntries(response.headers))
    
    if (response.ok) {
      const data = await response.json()
      console.log('\n✅ ERP Connection Successful!')
      console.log(`📦 Plans Found: ${data.data?.length || 0}`)
      
      if (data.data && data.data.length > 0) {
        console.log('\n📋 Plans Preview:')
        data.data.forEach((plan, index) => {
          console.log(`  ${index + 1}. ${plan.name} - ₹${plan.price}`)
          console.log(`     Products: ${plan.maxProducts === -1 ? 'Unlimited' : plan.maxProducts}`)
          console.log(`     Features: ${plan.features?.length || 0} features`)
          console.log('')
        })
      }
      
      // Test local API
      console.log('🔄 Testing Local API...')
      const localResponse = await fetch('http://localhost:3000/api/plans')
      
      if (localResponse.ok) {
        const localData = await localResponse.json()
        console.log(`✅ Local API Working - ${localData.length} plans loaded`)
      } else {
        console.log(`❌ Local API Error: ${localResponse.status}`)
      }
      
    } else {
      console.log(`❌ ERP Connection Failed: ${response.status}`)
      const errorText = await response.text()
      console.log(`Error Details: ${errorText}`)
    }
    
  } catch (error) {
    console.log('❌ Connection Error:', error.message)
    
    if (error.code === 'ENOTFOUND') {
      console.log('💡 Possible issues:')
      console.log('   - ERP system is not accessible')
      console.log('   - Domain name resolution failed')
      console.log('   - Network connectivity issues')
    } else if (error.code === 'ECONNREFUSED') {
      console.log('💡 Possible issues:')
      console.log('   - ERP server is not running')
      console.log('   - Port is not accessible')
      console.log('   - Firewall blocking connection')
    }
  }
  
  console.log('\n📝 Next Steps:')
  console.log('1. Ensure ERP system is running at https://erp.fashionpos.space/')
  console.log('2. Add the API endpoint as described in erp-integration-guide.md')
  console.log('3. Configure CORS to allow requests from your website')
  console.log('4. Test the endpoint manually in browser or Postman')
  console.log('5. Update API key in .env.local file')
}

// Test webhook endpoint
async function testWebhook() {
  console.log('\n🔄 Testing Webhook Endpoint...')
  
  try {
    const response = await fetch('http://localhost:3000/api/webhooks/plans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-signature': 'your-webhook-secret-here'
      },
      body: JSON.stringify({
        event: 'plans_updated',
        timestamp: new Date().toISOString()
      })
    })
    
    if (response.ok) {
      console.log('✅ Webhook endpoint working')
    } else {
      console.log(`❌ Webhook failed: ${response.status}`)
    }
  } catch (error) {
    console.log('❌ Webhook error:', error.message)
  }
}

// Run tests
testERPIntegration().then(() => {
  return testWebhook()
}).then(() => {
  console.log('\n🎉 Integration test completed!')
}).catch(console.error)