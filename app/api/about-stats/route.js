import { connectToDatabase } from '@/lib/mongodb'

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const stats = await db.collection('aboutStats').findOne({}, { projection: { _id: 0 } })
    
    if (!stats) {
      return Response.json({
        customers: '5000+',
        teamMembers: '100+',
        yearsExperience: '7+'
      })
    }
    
    return Response.json(stats)
  } catch (error) {
    return Response.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const data = await request.json()
    console.log('Received data:', data)
    
    const { customers, teamMembers, yearsExperience } = data
    
    if (!customers || !teamMembers || !yearsExperience) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    const { db } = await connectToDatabase()
    console.log('Connected to database')
    
    const result = await db.collection('aboutStats').replaceOne(
      {},
      { customers, teamMembers, yearsExperience },
      { upsert: true }
    )
    
    console.log('Save result:', result)
    return Response.json({ success: true, result })
  } catch (error) {
    console.error('Save error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}