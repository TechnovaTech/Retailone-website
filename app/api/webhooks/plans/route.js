import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const webhookSecret = process.env.ERP_WEBHOOK_SECRET
    const signature = request.headers.get('x-webhook-signature')
    
    if (!webhookSecret || signature !== webhookSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await request.json()
    console.log('Received plans webhook:', body)
    
    // Clear server cache
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    await fetch(`${baseUrl}/api/plans?refresh=true`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    
    // Broadcast update to all clients
    const response = NextResponse.json({ 
      success: true, 
      message: 'Plans cache refreshed',
      timestamp: new Date().toISOString()
    })
    
    response.headers.set('X-Plans-Updated', 'true')
    
    return response
    
  } catch (error) {
    console.error('Plans webhook error:', error)
    return NextResponse.json({ 
      error: 'Internal error' 
    }, { status: 500 })
  }
}