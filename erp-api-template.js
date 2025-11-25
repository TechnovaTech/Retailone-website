// ERP API Template - Add this to your ERP system at https://erp.fashionpos.space/
// This should be accessible at: https://erp.fashionpos.space/api/public/plans

// Example Express.js route (adapt to your ERP framework)
app.get('/api/public/plans', async (req, res) => {
  try {
    // Fetch plans from your ERP database
    // Replace this with your actual database query
    const plans = await db.collection('plans').find({ active: true }).toArray();
    
    // Format plans for website consumption
    const formattedPlans = plans.map(plan => ({
      id: plan._id || plan.id,
      name: plan.name,
      price: plan.price,
      description: plan.description,
      maxProducts: plan.maxProducts || plan.product_limit,
      durationDays: plan.durationDays || plan.validity_days || 365,
      features: plan.features || []
    }));

    res.json({
      success: true,
      data: formattedPlans
    });
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch plans'
    });
  }
});

// Alternative simpler format
app.get('/api/plans', async (req, res) => {
  try {
    const plans = [
      {
        id: 'starter',
        name: 'Starter Plan',
        price: 3000,
        description: 'Perfect for new businesses',
        maxProducts: 50,
        durationDays: 365,
        features: [
          'Basic Inventory',
          'Sales Management',
          'Customer Database',
          'Basic Reports'
        ]
      },
      {
        id: 'growth',
        name: 'Growth Plan', 
        price: 8000,
        description: 'For expanding businesses',
        maxProducts: 250,
        durationDays: 365,
        features: [
          'Advanced Inventory',
          'Multi-location Support',
          'Advanced Analytics',
          'API Access',
          'Priority Support'
        ]
      },
      {
        id: 'premium',
        name: 'Premium Plan',
        price: 15000,
        description: 'Complete business solution',
        maxProducts: 1000,
        durationDays: 365,
        features: [
          'Unlimited Features',
          'Custom Integrations',
          'Dedicated Support',
          'Advanced Security',
          'Custom Reports',
          'Training Included'
        ]
      }
    ];

    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// CORS configuration (if needed)
app.use('/api/public/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-api-key');
  next();
});