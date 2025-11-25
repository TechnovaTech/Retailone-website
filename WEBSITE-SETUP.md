# Website Setup Guide

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create `.env.local`:
```env
# ERP Integration
NEXT_PUBLIC_ERP_API_BASE_URL=https://erp.fashionpos.space
NEXT_PUBLIC_ERP_API_KEY=fashionpos2024
ERP_WEBHOOK_SECRET=webhook-secret-123

# Database (Optional)
MONGODB_URI=mongodb://localhost:27017/retalians

# Email (Optional)
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
```

### 3. Run Website
```bash
npm run dev
```

## 📋 Features Ready

### ✅ Dynamic Plans
- **URL**: `/plans`
- **Admin**: `/admin/plans`
- **Auto-sync** from ERP system
- **Manual refresh** available

### ✅ Admin Panel
- **Login**: `/admin`
- **Plans Management**: `/admin/plans`
- **Other Sections**: Reviews, Blogs, Messages, etc.

### ✅ API Endpoints
- **Plans**: `/api/plans`
- **Webhook**: `/api/webhooks/plans`
- **Auto-refresh** every 5 minutes

## 🔧 ERP Integration

### Required in ERP System
Add this endpoint at `https://erp.fashionpos.space/api/public/plans`:

```javascript
export async function GET() {
  const plans = await db.collection('plans').find({ active: true }).toArray()
  
  return NextResponse.json({
    success: true,
    data: plans.map(plan => ({
      _id: plan._id.toString(),
      name: plan.name,
      price: plan.price,
      description: plan.description,
      maxProducts: plan.maxProducts,
      durationDays: plan.durationDays || 365,
      features: plan.features || []
    }))
  })
}
```

### Database Schema (ERP)
```javascript
{
  name: "Basic Plan",
  price: 5000,
  description: "Perfect for small businesses",
  maxProducts: 100,
  durationDays: 365,
  features: ["Feature 1", "Feature 2"],
  active: true
}
```

## 🎯 How It Works

1. **Super admin adds plan in ERP** → Stored in ERP database
2. **Website fetches plans** → From ERP API endpoint
3. **Plans display automatically** → On website `/plans` page
4. **Admin can monitor** → Via `/admin/plans` dashboard

## 🔄 Testing

```bash
# Test ERP connection
node test-erp-integration.js

# Check plans API
curl http://localhost:3000/api/plans
```

## ✅ Done!

- Plans sync automatically from ERP
- No manual plan management needed
- Real-time updates
- Admin monitoring available