async function testNewKey() {
  const erpUrl = 'https://erp.fashionpos.space';
  const apiKey = 'erp_091d0757a4791fa4f0e965246427a54afc150b79d7deb4777ca49be9ac93865f';
  
  console.log('Testing with new API key...');
  
  try {
    const response = await fetch(`${erpUrl}/api/public/plans`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      }
    });
    
    console.log('Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('SUCCESS! Plans data:', JSON.stringify(data, null, 2));
    } else {
      const errorText = await response.text();
      console.log('Error response:', errorText);
    }
  } catch (error) {
    console.error('Connection error:', error.message);
  }
}

testNewKey();