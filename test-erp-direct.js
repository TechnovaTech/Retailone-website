async function testERPConnection() {
  const erpApiUrl = 'https://erp.fashionpos.space';
  const erpApiKey = 'erp-system-secret-key-2024-fashion-store';

  const endpoints = [
    '/api/public/plans',
    '/api/plans', 
    '/plans'
  ];

  console.log(`🔍 Testing ERP connection to: ${erpApiUrl}`);

  for (const endpoint of endpoints) {
    try {
      console.log(`\n📡 Testing: ${erpApiUrl}${endpoint}`);
      
      const response = await fetch(`${erpApiUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': erpApiKey
        }
      });

      console.log(`📊 Status: ${response.status}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Success! Data received:');
        console.log(JSON.stringify(data, null, 2));
        return true;
      } else {
        const errorText = await response.text();
        console.log(`❌ Error response: ${errorText}`);
      }
    } catch (error) {
      console.log(`❌ Request failed: ${error.message}`);
    }
  }
  
  console.log('\n❌ All endpoints failed');
  return false;
}

testERPConnection();