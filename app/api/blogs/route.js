import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('retalians_website')
    const blogs = await db.collection('blogs').find({}).sort({ createdAt: -1 }).toArray()
    return NextResponse.json(blogs)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise
    const db = client.db('retalians_website')
    const body = await request.json()
    const blogData = {
      ...body,
      createdAt: new Date(),
      status: 'Published'
    }
    const result = await db.collection('blogs').insertOne(blogData)
    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const client = await clientPromise
    const db = client.db('retalians_website')
    const body = await request.json()
    const { _id, ...updateData } = body
    const { ObjectId } = require('mongodb')
    await db.collection('blogs').updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const client = await clientPromise
    const db = client.db('retalians_website')
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const { ObjectId } = require('mongodb')
    await db.collection('blogs').deleteOne({ _id: new ObjectId(id) })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 })
  }
}