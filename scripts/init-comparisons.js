const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

const sampleComparisons = [
  {
    title: "Choose the Best ERP Solution for Your Business",
    subtitle: "Compare features and pricing to make the right decision for your company",
    ourSoftware: {
      name: "RETALIANS ERP",
      logo: "",
      price: "₹15,000/month",
      rating: 5,
      highlights: [
        "Complete retail solution",
        "Easy to use interface",
        "24/7 customer support",
        "Quick implementation",
        "Affordable pricing"
      ]
    },
    competitors: [
      {
        name: "SAP Business One",
        logo: "",
        price: "₹45,000/month",
        rating: 3,
        highlights: [
          "Enterprise features",
          "Complex setup",
          "Limited support"
        ]
      },
      {
        name: "Tally Prime",
        logo: "",
        price: "₹18,000/year",
        rating: 3,
        highlights: [
          "Basic accounting",
          "Limited inventory",
          "No POS integration"
        ]
      },
      {
        name: "Zoho Books",
        logo: "",
        price: "₹2,400/month",
        rating: 4,
        highlights: [
          "Cloud-based",
          "Basic features",
          "Limited customization"
        ]
      }
    ],
    features: [
      {
        name: "Monthly Price",
        ourSoftware: "₹15,000",
        competitors: {
          "SAP Business One": "₹45,000",
          "Tally Prime": "₹1,500",
          "Zoho Books": "₹2,400"
        },
        highlight: false
      },
      {
        name: "Implementation Time",
        ourSoftware: "2-4 weeks",
        competitors: {
          "SAP Business One": "3-6 months",
          "Tally Prime": "1-2 weeks",
          "Zoho Books": "1-3 weeks"
        },
        highlight: false
      },
      {
        name: "POS Integration",
        ourSoftware: true,
        competitors: {
          "SAP Business One": "Limited",
          "Tally Prime": false,
          "Zoho Books": false
        },
        highlight: true
      },
      {
        name: "Multi-Store Management",
        ourSoftware: true,
        competitors: {
          "SAP Business One": true,
          "Tally Prime": false,
          "Zoho Books": "Limited"
        },
        highlight: true
      },
      {
        name: "Real-time Inventory Tracking",
        ourSoftware: true,
        competitors: {
          "SAP Business One": "Basic",
          "Tally Prime": "Limited",
          "Zoho Books": false
        },
        highlight: true
      },
      {
        name: "Mobile App Access",
        ourSoftware: true,
        competitors: {
          "SAP Business One": false,
          "Tally Prime": false,
          "Zoho Books": true
        },
        highlight: true
      },
      {
        name: "Customer Support",
        ourSoftware: "24/7",
        competitors: {
          "SAP Business One": "Business Hours",
          "Tally Prime": "Email Only",
          "Zoho Books": "Business Hours"
        },
        highlight: true
      },
      {
        name: "Training Required",
        ourSoftware: "Minimal",
        competitors: {
          "SAP Business One": "Extensive",
          "Tally Prime": "Moderate",
          "Zoho Books": "Basic"
        },
        highlight: false
      },
      {
        name: "Free Trial Period",
        ourSoftware: true,
        competitors: {
          "SAP Business One": false,
          "Tally Prime": "Limited",
          "Zoho Books": true
        },
        highlight: false
      },
      {
        name: "Cloud-based Solution",
        ourSoftware: true,
        competitors: {
          "SAP Business One": "Hybrid",
          "Tally Prime": false,
          "Zoho Books": true
        },
        highlight: false
      }
    ],
    ctaText: "Get Started Today",
    ctaLink: "/contact",
    isActive: true
  },

];

async function initComparisons() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('retalians_website');
    const collection = db.collection('comparisons');
    
    // Clear existing comparisons
    await collection.deleteMany({});
    console.log('Cleared existing comparisons');
    
    // Insert sample comparisons
    const result = await collection.insertMany(sampleComparisons);
    console.log(`Inserted ${result.insertedCount} sample comparisons`);
    
    console.log('Sample comparisons initialized successfully!');
  } catch (error) {
    console.error('Error initializing comparisons:', error);
  } finally {
    await client.close();
  }
}

initComparisons();