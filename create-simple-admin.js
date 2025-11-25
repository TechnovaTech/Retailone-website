const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

async function createSimpleAdmin() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('retalians_website');
    const admins = db.collection('admins');
    
    // Clear existing admins
    await admins.deleteMany({});
    console.log('Cleared existing admins');
    
    const plainPassword = "admin123";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    const adminData = {
      name: "Admin",
      email: "admin@retalians.com",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date()
    };
    
    await admins.insertOne(adminData);
    console.log('✅ Admin created successfully!');
    console.log('📧 Email: admin@retalians.com');
    console.log('🔑 Password: admin123');
    
    // Verify the admin was created
    const createdAdmin = await admins.findOne({ email: "admin@retalians.com" });
    console.log('✅ Verification: Admin exists in database:', !!createdAdmin);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

createSimpleAdmin();