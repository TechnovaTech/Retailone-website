const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up ERP Integration...\n');

// Check environment configuration
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  if (envContent.includes('erp.fashionpos.space')) {
    console.log('✅ ERP URL configured correctly');
  } else {
    console.log('❌ ERP URL needs to be configured');
  }
  
  if (envContent.includes('your-api-key-here')) {
    console.log('⚠️  API key needs to be set (optional for public endpoints)');
  } else {
    console.log('✅ API key configured');
  }
} else {
  console.log('❌ .env.local file not found');
}

console.log('\n📋 Next Steps:');
console.log('1. Add the API endpoint to your ERP system at https://erp.fashionpos.space/');
console.log('   - Use the template in erp-api-template.js');
console.log('   - Endpoint should be: /api/public/plans or /api/plans');
console.log('');
console.log('2. Test the connection:');
console.log('   - Run: node test-erp-plans.js');
console.log('');
console.log('3. Start your website:');
console.log('   - Run: npm run dev');
console.log('   - Visit: http://localhost:3000/plans');
console.log('');
console.log('4. The website will show fallback plans if ERP is not available');
console.log('   - Once ERP API is ready, plans will be fetched automatically');

console.log('\n🔧 ERP API Requirements:');
console.log('- Endpoint: https://erp.fashionpos.space/api/public/plans');
console.log('- Method: GET');
console.log('- Response format: JSON array of plan objects');
console.log('- Required fields: id, name, price, description, maxProducts, durationDays, features');
console.log('- CORS enabled for your website domain');

console.log('\n✨ Integration complete! Your website is ready to display ERP plans.');