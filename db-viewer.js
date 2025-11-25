const { MongoClient } = require('mongodb');

async function viewDatabase() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    // List all databases
    const adminDb = client.db().admin();
    const dbList = await adminDb.listDatabases();
    console.log('\nAll databases:');
    dbList.databases.forEach(db => console.log(`- ${db.name}`));
    
    const db = client.db('retalians_website');
    const collections = await db.listCollections().toArray();
    
    console.log('\nDatabase: retalians_website');
    console.log('Collections:', collections.map(c => c.name));
    
    for (const collection of collections) {
      const coll = db.collection(collection.name);
      const count = await coll.countDocuments();
      const sample = await coll.findOne();
      
      console.log(`\n--- ${collection.name} (${count} documents) ---`);
      if (sample) {
        console.log('Sample document:', JSON.stringify(sample, null, 2));
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.close();
  }
}

viewDatabase();