const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

async function createNewAdmin() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    const db = client.db('retalians_website');
    const admins = db.collection('admins');
    
    // Delete existing admin
    await admins.deleteMany({});
    
    const plainPassword = "admin123";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    // New admin credentials
    const adminData = {
      name: "Administrator",
      email: "admin@admin.com",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date()
    };
    
    await admins.insertOne(adminData);
    
    console.log('New admin created successfully!');
    console.log('Email:', adminData.email);
    console.log('Password:', plainPassword);
    console.log('Database contains hashed password for security');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.close();
  }
}

createNewAdmin();