import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
let client: MongoClient

export async function GET() {
  try {
    client = new MongoClient(uri)
    await client.connect()
    const db = client.db('retalians')
    const collection = db.collection('socialMedia')
    
    const socialMedia = await collection.findOne({})
    
    const result = {
      instagram: socialMedia?.instagram || '',
      youtube: socialMedia?.youtube || '',
      twitter: socialMedia?.twitter || '',
      whatsapp: socialMedia?.whatsapp || ''
    }
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching social media:', error)
    return NextResponse.json({
      instagram: '',
      youtube: '',
      twitter: '',
      whatsapp: ''
    })
  } finally {
    if (client) {
      await client.close()
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { instagram, youtube, twitter, whatsapp } = await request.json()
    
    client = new MongoClient(uri)
    await client.connect()
    const db = client.db('retalians')
    const collection = db.collection('socialMedia')
    
    await collection.replaceOne(
      {},
      { instagram, youtube, twitter, whatsapp },
      { upsert: true }
    )
    
    return NextResponse.json({ message: 'Social media links updated successfully' })
  } catch (error) {
    console.error('Error updating social media:', error)
    return NextResponse.json({ error: 'Failed to update social media links' }, { status: 500 })
  } finally {
    if (client) {
      await client.close()
    }
  }
}