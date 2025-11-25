const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting deployment process...');

// Check if production environment file exists
if (!fs.existsSync('.env.production')) {
  console.error('❌ .env.production file not found!');
  console.log('Please create .env.production with your live ERP API details');
  process.exit(1);
}

try {
  // Copy production env to .env.local for build
  execSync('copy .env.production .env.local', { stdio: 'inherit' });
  
  // Build the application
  console.log('📦 Building application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Test the connection to ERP API
  console.log('🔗 Testing ERP connection...');
  const testConnection = require('./test-erp-connection.js');
  
  console.log('✅ Deployment ready!');
  console.log('Run: npm start');
  
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}