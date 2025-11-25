// Mock NextResponse for testing
const NextResponse = {
  json: (data) => ({ data })
};

// Set environment variables
process.env.NEXT_PUBLIC_ERP_API_BASE_URL = 'https://erp.fashionpos.space';

// Import and test the API route logic
async function testAPIRoute() {
  console.log('🧪 Testing Plans API Route Logic...\n');
  
  try {
    const erpApiUrl = process.env.NEXT_PUBLIC_ERP_API_BASE_URL;
    
    if (!erpApiUrl) {
      console.log('❌ ERP URL not configured');
      return;
    }

    console.log('📡 Fetching from:', `${erpApiUrl}/api/plans`);
        
    const response = await fetch(`${erpApiUrl}/api/plans`, {
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });

    if (response.ok) {
      const result = await response.json();
      
      if (result.data && Array.isArray(result.data)) {
        // Format ERP data for website (same logic as in route.js)
        const formattedPlans = result.data.map(plan => ({
          id: plan._id || plan.id,
          name: plan.name,
          price: plan.price,
          description: plan.description || `${plan.name} - Perfect for your business needs`,
          maxProducts: plan.maxProducts,
          durationDays: plan.durationDays,
          features: plan.allowedFeatures || plan.features || []
        }));
        
        console.log(`✅ Successfully formatted ${formattedPlans.length} plans`);
        console.log('\n📋 Plans Summary:');
        formattedPlans.forEach((plan, i) => {
          console.log(`${i + 1}. ${plan.name} - ₹${plan.price} (${plan.features.length} features)`);
        });
        
        console.log('\n🔍 Sample Plan Details:');
        console.log(JSON.stringify(formattedPlans[0], null, 2));
        
        return formattedPlans;
      }
    } else {
      console.log(`❌ ERP API returned status: ${response.status}`);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

testAPIRoute();