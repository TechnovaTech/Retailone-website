const { MongoClient } = require('mongodb')

const uri = 'mongodb://localhost:27017'
const dbName = 'retalians_website'

async function initializeDatabase() {
  const client = new MongoClient(uri)
  
  try {
    await client.connect()
    console.log('Connected to MongoDB')
    
    const db = client.db(dbName)
    
    // Create collections
    const collections = ['contacts', 'blogs', 'reviews', 'services', 'about-stats']
    
    for (const collectionName of collections) {
      try {
        await db.createCollection(collectionName)
        console.log(`Created collection: ${collectionName}`)
      } catch (error) {
        if (error.code === 48) {
          console.log(`Collection ${collectionName} already exists`)
        } else {
          console.error(`Error creating collection ${collectionName}:`, error.message)
        }
      }
    }
    
    console.log('Database initialization completed')
    
  } catch (error) {
    console.error('Error initializing database:', error)
  } finally {
    await client.close()
  }
}

initializeDatabase()