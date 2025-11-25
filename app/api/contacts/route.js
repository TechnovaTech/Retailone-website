import { MongoClient, ObjectId } from 'mongodb'
import nodemailer from 'nodemailer'

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const dbName = process.env.MONGODB_DB || 'retalians_website'

let client
let clientPromise

if (!client) {
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

async function sendContactEmail(contactData) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'hello.technovatechnologies@gmail.com',
    subject: `New Contact Form Submission - ${contactData.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
        <h2 style="color: #D7263D;">New Contact Form Submission</h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Contact Details:</h3>
          <p><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Phone:</strong> ${contactData.phone}</p>
          <p><strong>Subject:</strong> ${contactData.subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
            ${contactData.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p style="color: #666; font-size: 12px;">Submitted on: ${new Date().toLocaleString()}</p>
      </div>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error: error.message }
  }
}

export async function POST(request) {
  try {
    const { firstName, lastName, email, phone, subject, message } = await request.json()
    
    const client = await clientPromise
    const db = client.db(dbName)
    const collection = db.collection('contacts')
    
    const contactMessage = {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
      createdAt: new Date(),
      status: 'unread'
    }
    
    const result = await collection.insertOne(contactMessage)
    
    // Send email notification (don't fail if email fails)
    try {
      await sendContactEmail(contactMessage)
    } catch (emailError) {
      console.error('Email send failed:', emailError)
    }
    
    return Response.json({ success: true, id: result.insertedId })
  } catch (error) {
    console.error('Error saving contact:', error)
    return Response.json({ error: 'Failed to save contact' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db(dbName)
    const collection = db.collection('contacts')
    
    const contacts = await collection.find({}).sort({ createdAt: -1 }).toArray()
    
    return Response.json(contacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return Response.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const { id, status } = await request.json()
    
    const client = await clientPromise
    const db = client.db(dbName)
    const collection = db.collection('contacts')
    
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    )
    
    return Response.json({ success: true })
  } catch (error) {
    console.error('Error updating contact:', error)
    return Response.json({ error: 'Failed to update contact' }, { status: 500 })
  }
}