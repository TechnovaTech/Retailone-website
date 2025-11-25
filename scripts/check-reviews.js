const { MongoClient } = require('mongodb')

const uri = 'mongodb://localhost:27017'
const dbName = 'retalians_website'

async function checkReviews() {
  const client = new MongoClient(uri)
  
  try {
    await client.connect()
    console.log('Connected to MongoDB')
    
    const db = client.db(dbName)
    const reviews = await db.collection('reviews').find({}).toArray()
    
    console.log(`Found ${reviews.length} reviews in database:`)
    reviews.forEach((review, index) => {
      console.log(`${index + 1}. ${review.customerName} - ${review.shopName} (${review.rating} stars)`)
    })
    
    if (reviews.length === 0) {
      console.log('\nNo reviews found. Adding sample reviews...')
      
      const sampleReviews = [
        {
          customerName: "Rajesh Kumar",
          shopName: "Kumar Electronics",
          rating: 5,
          comment: "Excellent POS system! Has made our billing process so much faster and efficient. The inventory management feature is outstanding.",
          createdAt: new Date()
        },
        {
          customerName: "Priya Sharma",
          shopName: "Fashion Hub",
          rating: 5,
          comment: "Amazing software for retail management. Customer support is very responsive and helpful. Highly recommended!",
          createdAt: new Date()
        },
        {
          customerName: "Amit Patel",
          shopName: "Patel General Store",
          rating: 4,
          comment: "Great features and easy to use interface. Has helped us manage our store operations much better than before.",
          createdAt: new Date()
        }
      ]
      
      const result = await db.collection('reviews').insertMany(sampleReviews)
      console.log(`Added ${result.insertedCount} sample reviews`)
    }
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await client.close()
  }
}

checkReviews()