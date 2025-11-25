async function testPlansFormat() {
  try {
    const response = await fetch('https://erp.fashionpos.space/api/plans', {
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      const result = await response.json();
      
      if (result.data && Array.isArray(result.data)) {
        const formattedPlans = result.data.map(plan => ({
          id: plan._id || plan.id,
          name: plan.name,
          price: plan.price,
          description: plan.description || `${plan.name} - Perfect for your business needs`,
          maxProducts: plan.maxProducts,
          durationDays: plan.durationDays,
          features: plan.allowedFeatures || plan.features || []
        }));
        
        console.log('✅ Successfully formatted plans:');
        console.log(`📊 Total plans: ${formattedPlans.length}`);
        console.log('\n🔍 Sample formatted plan:');
        console.log(JSON.stringify(formattedPlans[0], null, 2));
        
        return formattedPlans;
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testPlansFormat();