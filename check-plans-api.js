// Quick test to check what the API is returning
const fetch = require('node-fetch')

async function checkAPI() {
  try {
    console.log('Testing API at http://localhost:3000/api/plans')
    const response = await fetch('http://localhost:3000/api/plans?refresh=true')
    const data = await response.json()
    
    console.log('\nAPI Response:')
    console.log(JSON.stringify(data, null, 2))
    
    if (Array.isArray(data) && data.length > 0) {
      const standardPlan = data.find(p => p.name.includes('Standard'))
      if (standardPlan) {
        console.log('\nRetalians Standard Plan Features:')
        standardPlan.features.forEach((f, i) => console.log(`${i+1}. ${f}`))
      }
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

checkAPI()