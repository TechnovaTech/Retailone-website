import { MongoClient, ObjectId } from 'mongodb'

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const dbName = process.env.MONGODB_DB || 'retalians_website'

let client
let clientPromise

if (!client) {
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db(dbName)
    const collection = db.collection('services')
    
    const services = await collection.find({}).sort({ createdAt: -1 }).toArray()
    
    return Response.json(services)
  } catch (error) {
    console.error('Error fetching services:', error)
    return Response.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { name, icon } = await request.json()
    
    const client = await clientPromise
    const db = client.db(dbName)
    const collection = db.collection('services')
    
    const service = {
      name,
      icon,
      createdAt: new Date()
    }
    
    const result = await collection.insertOne(service)
    
    return Response.json({ success: true, id: result.insertedId })
  } catch (error) {
    console.error('Error saving service:', error)
    return Response.json({ error: 'Failed to save service' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const { _id, name, icon } = await request.json()
    
    const client = await clientPromise
    const db = client.db(dbName)
    const collection = db.collection('services')
    
    await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { name, icon, updatedAt: new Date() } }
    )
    
    return Response.json({ success: true })
  } catch (error) {
    console.error('Error updating service:', error)
    return Response.json({ error: 'Failed to update service' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    const client = await clientPromise
    const db = client.db(dbName)
    const collection = db.collection('services')
    
    await collection.deleteOne({ _id: new ObjectId(id) })
    
    return Response.json({ success: true })
  } catch (error) {
    console.error('Error deleting service:', error)
    return Response.json({ error: 'Failed to delete service' }, { status: 500 })
  }
}