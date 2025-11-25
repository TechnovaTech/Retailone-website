import { connectToDatabase } from '@/lib/mongodb'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    console.log('Login attempt for:', email)
    
    const { db } = await connectToDatabase()
    const admins = db.collection('admins')
    
    const admin = await admins.findOne({ email })
    console.log('Admin found:', admin ? 'Yes' : 'No')
    
    if (!admin) {
      console.log('No admin found with email:', email)
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    
    const passwordMatch = await bcrypt.compare(password, admin.password)
    console.log('Password match:', passwordMatch)
    
    if (!passwordMatch) {
      console.log('Password does not match')
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    
    console.log('Login successful for:', email)
    return Response.json({ success: true, admin: { email: admin.email, name: admin.name } })
    
  } catch (error) {
    console.error('Auth error:', error)
    return Response.json({ error: 'Authentication failed' }, { status: 500 })
  }
}