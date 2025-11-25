const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    const db = client.db('retalians_website');
    const admins = db.collection('admins');
    
    const plainPassword = "admin123";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    // Admin credentials with hashed password
    const adminData = {
      name: "Admin",
      email: "admin@retalians.com",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date()
    };
    
    // Check if admin already exists
    const existingAdmin = await admins.findOne({ email: adminData.email });
    
    if (existingAdmin) {
      console.log('Admin already exists!');
      console.log('Email:', adminData.email);
      console.log('Password: [HIDDEN - Hashed in database]');
    } else {
      await admins.insertOne(adminData);
      console.log('Admin created successfully!');
      console.log('Email:', adminData.email);
      console.log('Password: [HIDDEN - Hashed in database]');
      console.log('Login Password:', plainPassword);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.close();
  }
}

createAdmin();