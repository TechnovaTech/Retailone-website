import { ObjectId } from 'mongodb'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const reviews = await db.collection('reviews').find({}).sort({ createdAt: -1 }).toArray()
    console.log('API: Found', reviews.length, 'reviews in database')
    return Response.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return Response.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()
    const reviewData = {
      ...body,
      createdAt: new Date(),
      rating: parseInt(body.rating)
    }
    const result = await db.collection('reviews').insertOne(reviewData)
    return Response.json({ success: true, id: result.insertedId })
  } catch (error) {
    console.error('Error creating review:', error)
    return Response.json({ error: 'Failed to create review' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()
    const { _id, ...updateData } = body
    await db.collection('reviews').updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    )
    return Response.json({ success: true })
  } catch (error) {
    console.error('Error updating review:', error)
    return Response.json({ error: 'Failed to update review' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { db } = await connectToDatabase()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    await db.collection('reviews').deleteOne({ _id: new ObjectId(id) })
    return Response.json({ success: true })
  } catch (error) {
    console.error('Error deleting review:', error)
    return Response.json({ error: 'Failed to delete review' }, { status: 500 })
  }
}