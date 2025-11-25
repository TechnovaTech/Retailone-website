const { MongoClient } = require('mongodb');

async function addCollections() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    const db = client.db('retalians_website');
    
    // Create collections with sample data
    await db.collection('blogs').insertOne({
      title: "Welcome to Retalians ERP",
      content: "Our comprehensive ERP solution for retail businesses",
      author: "Admin",
      createdAt: new Date()
    });
    
    await db.collection('contacts').insertOne({
      name: "John Doe",
      email: "john@example.com",
      message: "Interested in your ERP solution",
      createdAt: new Date()
    });
    
    await db.collection('services').insertOne({
      name: "Inventory Management",
      description: "Complete inventory tracking and management",
      price: 299,
      features: ["Real-time tracking", "Low stock alerts", "Barcode scanning"]
    });
    
    await db.collection('reviews').insertOne({
      customerName: "Jane Smith",
      rating: 5,
      comment: "Excellent ERP system, highly recommended!",
      createdAt: new Date()
    });
    
    console.log('Collections created successfully!');
    
    // Show all collections
    const collections = await db.listCollections().toArray();
    console.log('\nCollections in retalians_website:');
    
    for (const collection of collections) {
      const coll = db.collection(collection.name);
      const count = await coll.countDocuments();
      console.log(`- ${collection.name}: ${count} documents`);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.close();
  }
}

addCollections();