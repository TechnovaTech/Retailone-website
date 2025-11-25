import nodemailer from 'nodemailer'

export async function sendResetEmail(resetLink) {
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
    subject: 'Retalians Web - Admin Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
        <h2 style="color: #D7263D;">Retalians Web</h2>
        <h3 style="color: #333;">Password Reset Request</h3>
        <p>You requested to reset your admin password for Retalians Web.</p>
        <p>Click the button below to reset your password:</p>
        <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #D7263D; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">Reset Password</a>
        <p>Or copy this link: <a href="${resetLink}">${resetLink}</a></p>
        <p style="color: #666;">This link will expire in 1 hour.</p>
        <p style="color: #999; font-size: 12px;">If you didn't request this, please ignore this email.</p>
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
