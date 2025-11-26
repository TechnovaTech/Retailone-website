// Add this function to your ERP admin after save/delete operations

async function notifyWebsite() {
  try {
    // Clear website cache immediately
    await fetch('https://fashionpos.space/api/webhooks/plans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-signature': 'erp_webhook_secret_2024'
      },
      body: JSON.stringify({
        event: 'plans_updated',
        timestamp: new Date().toISOString()
      })
    })
    
    // Also notify localhost if running
    try {
      await fetch('http://localhost:3000/api/webhooks/plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-webhook-signature': 'erp_webhook_secret_2024'
        },
        body: JSON.stringify({
          event: 'plans_updated',
          timestamp: new Date().toISOString()
        })
      })
    } catch (e) {
      // Localhost might not be running
    }
    
    console.log('Website notified of plan changes')
  } catch (error) {
    console.log('Webhook failed:', error)
  }
}

// Call this after saving or deleting plans in ERP
// notifyWebsite()