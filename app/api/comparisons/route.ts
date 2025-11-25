import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const db = client.db('retalians_website');
    const comparisons = await db.collection('comparisons').find({}).toArray();
    
    return NextResponse.json(comparisons);
  } catch (error) {
    console.error('Error fetching comparisons:', error);
    return NextResponse.json({ error: 'Failed to fetch comparisons' }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    await client.connect();
    const db = client.db('retalians_website');
    
    const comparison = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('comparisons').insertOne(comparison);
    
    return NextResponse.json({ 
      message: 'Comparison created successfully', 
      id: result.insertedId 
    });
  } catch (error) {
    console.error('Error creating comparison:', error);
    return NextResponse.json({ error: 'Failed to create comparison' }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    await client.connect();
    const db = client.db('retalians_website');
    
    const result = await db.collection('comparisons').updateOne(
      { _id: new ObjectId(_id) },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Comparison not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Comparison updated successfully' });
  } catch (error) {
    console.error('Error updating comparison:', error);
    return NextResponse.json({ error: 'Failed to update comparison' }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    await client.connect();
    const db = client.db('retalians_website');
    
    const result = await db.collection('comparisons').deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Comparison not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Comparison deleted successfully' });
  } catch (error) {
    console.error('Error deleting comparison:', error);
    return NextResponse.json({ error: 'Failed to delete comparison' }, { status: 500 });
  } finally {
    await client.close();
  }
}