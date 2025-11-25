const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const dbName = 'retalians_website'

async function hashAdminPasswords() {
  const client = new MongoClient(uri)
  
  try {
    await client.connect()
    console.log('Connected to MongoDB')
    
    const db = client.db(dbName)
    const admins = db.collection('admins')
    
    const allAdmins = await admins.find({}).toArray()
    
    for (const admin of allAdmins) {
      // Check if password is already hashed (bcrypt hashes start with $2a$ or $2b$)
      if (!admin.password.startsWith('$2')) {
        const hashedPassword = await bcrypt.hash(admin.password, 10)
        await admins.updateOne(
          { _id: admin._id },
          { $set: { password: hashedPassword } }
        )
        console.log(`✓ Hashed password for: ${admin.email}`)
      } else {
        console.log(`- Password already hashed for: ${admin.email}`)
      }
    }
    
    console.log('\nAll admin passwords have been hashed!')
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await client.close()
  }
}

hashAdminPasswords()
