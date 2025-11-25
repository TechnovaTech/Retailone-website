import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'

const client = new MongoClient(process.env.MONGODB_URI)

export async function POST(request) {
  try {
    const { token, newPassword } = await request.json()
    
    await client.connect()
    const db = client.db('retalians_website')
    const admins = db.collection('admins')
    
    const admin = await admins.findOne({ 
      resetToken: token,
      resetExpiry: { $gt: new Date() }
    })
    
    if (!admin) {
      return Response.json({ error: 'Invalid or expired reset token' }, { status: 400 })
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    
    await admins.updateOne(
      { _id: admin._id },
      { 
        $set: { password: hashedPassword, updatedAt: new Date() },
        $unset: { resetToken: "", resetExpiry: "" }
      }
    )
    
    return Response.json({ success: true, message: 'Password reset successfully' })
    
  } catch (error) {
    return Response.json({ error: 'Password reset failed' }, { status: 500 })
  } finally {
    await client.close()
  }
}
