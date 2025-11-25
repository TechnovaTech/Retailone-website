const fetch = require('node-fetch');

async function testERPConnection() {
  const erpUrl = 'https://erp.fashionpos.space';
  
  console.log('Testing ERP connection...');
  
  try {
    // Test basic connectivity
    const response = await fetch(`${erpUrl}/api/public/plans`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers));
    
    if (response.ok) {
      const data = await response.json();
      console.log('Plans data:', JSON.stringify(data, null, 2));
    } else {
      console.log('Error response:', await response.text());
    }
  } catch (error) {
    console.error('Connection error:', error.message);
    
    // Try alternative endpoints
    console.log('\nTrying alternative endpoints...');
    
    const alternatives = [
      '/api/plans',
      '/plans',
      '/api/v1/plans',
      '/public/plans'
    ];
    
    for (const endpoint of alternatives) {
      try {
        console.log(`Testing: ${erpUrl}${endpoint}`);
        const altResponse = await fetch(`${erpUrl}${endpoint}`);
        console.log(`Status: ${altResponse.status}`);
        if (altResponse.ok) {
          const altData = await altResponse.text();
          console.log(`Success! Data: ${altData.substring(0, 200)}...`);
          break;
        }
      } catch (altError) {
        console.log(`Failed: ${altError.message}`);
      }
    }
  }
}

testERPConnection();