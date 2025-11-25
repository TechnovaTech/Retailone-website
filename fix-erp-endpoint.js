// Update your ERP endpoint to remove API key check temporarily
// In your ERP: app/api/public/plans/route.js

export async function GET(request) {
  try {
    // Remove this API key check temporarily
    // const apiKey = request.headers.get('x-api-key')
    // if (apiKey !== process.env.NEXTAUTH_SECRET) {
    //   return NextResponse.json({ success: false, error: 'Invalid API key' }, { status: 401 })
    // }

    const client = new MongoClient(process.env.MONGODB_URI)
    await client.connect()
    const db = client.db()
    
    const plans = await db.collection('plans').find({ active: true }).toArray()
    
    const formattedPlans = plans.map(plan => ({
      id: plan._id.toString(),
      name: plan.name,
      price: plan.price,
      description: plan.description,
      maxProducts: plan.maxProducts,
      durationDays: plan.durationDays || 365,
      features: plan.features || []
    }))

    await client.close()

    return NextResponse.json({
      success: true,
      data: formattedPlans
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch plans' 
    }, { status: 500 })
  }
}