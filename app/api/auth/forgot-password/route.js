import { MongoClient } from 'mongodb'
import crypto from 'crypto'
import { sendResetEmail } from '@/lib/email'

const client = new MongoClient(process.env.MONGODB_URI)
const ADMIN_EMAIL = 'hello.technovatechnologies@gmail.com'

export async function POST(request) {
  try {
    await client.connect()
    const db = client.db('retalians_website')
    const admins = db.collection('admins')
    
    const allAdmins = await admins.find({}).toArray()
    
    if (allAdmins.length === 0) {
      return Response.json({ error: 'No admin accounts found' }, { status: 404 })
    }
    
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetExpiry = new Date(Date.now() + 3600000) // 1 hour
    
    await admins.updateMany(
      {},
      { $set: { resetToken, resetExpiry } }
    )
    
    const resetLink = `${process.env.NEXTAUTH_URL}/admin/reset-password?token=${resetToken}`
    
    // Send email
    const emailResult = await sendResetEmail(resetLink)
    
    if (!emailResult.success) {
      console.log('\n=== EMAIL FAILED - RESET LINK ===')
      console.log('To:', ADMIN_EMAIL)
      console.log('Reset Link:', resetLink)
      console.log('================================\n')
    }
    
    return Response.json({ 
      success: true, 
      message: `Reset link sent to ${ADMIN_EMAIL}` 
    })
    
  } catch (error) {
    return Response.json({ error: 'Failed to process request' }, { status: 500 })
  } finally {
    await client.close()
  }
}
