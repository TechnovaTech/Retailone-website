#!/usr/bin/env node

// Simple setup script for plans
const { initializePlans } = require('./init-plans')

console.log('Setting up Retalians Standard and other plans...')
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Configured' : 'Not configured')

initializePlans()
  .then(() => {
    console.log('\n✅ Plans setup completed successfully!')
    console.log('\nYou can now:')
    console.log('1. Start your development server: npm run dev')
    console.log('2. Visit /plans to see the updated plans')
    console.log('3. Test the API at /api/plans')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Setup failed:', error.message)
    process.exit(1)
  })