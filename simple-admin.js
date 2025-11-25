const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

async function createSimpleAdmin() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    const db = client.db('retalians_website');
    const admins = db.collection('admins');
    
    // Delete existing admin
    await admins.deleteMany({});
    
    const plainPassword = "admin123";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    // Admin credentials with hashed password
    const adminData = {
      name: "Admin",
      email: "admin@admin.com",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date()
    };
    
    await admins.insertOne(adminData);
    
    console.log('Admin created with hashed password!');
    console.log('Email: admin@admin.com');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.close();
  }
}

createSimpleAdmin();