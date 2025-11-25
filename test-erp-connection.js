require('dotenv').config({ path: '.env.local' });

async function testERPConnection() {
  const erpApiUrl = process.env.NEXT_PUBLIC_ERP_API_BASE_URL;
  const erpApiKey = process.env.NEXT_PUBLIC_ERP_API_KEY;

  if (!erpApiUrl) {
    console.error('❌ NEXT_PUBLIC_ERP_API_BASE_URL not configured');
    return false;
  }

  try {
    console.log(`🔍 Testing connection to: ${erpApiUrl}/api/public/plans`);
    
    const response = await fetch(`${erpApiUrl}/api/public/plans`, {
      headers: {
        'Content-Type': 'application/json',
        ...(erpApiKey && { 'x-api-key': erpApiKey })
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ ERP connection successful');
      console.log(`📊 Found ${data.length || 0} plans`);
      return true;
    } else {
      console.error(`❌ ERP API returned status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error('❌ ERP connection failed:', error.message);
    return false;
  }
}

if (require.main === module) {
  testERPConnection();
}

module.exports = testERPConnection;