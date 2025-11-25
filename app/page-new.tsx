"use client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";
import PricingCard from "@/components/PricingCard";
import TestimonialCard from "@/components/TestimonialCard";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  ShoppingBag,
  UserCog,
  Calendar,
  FileText,
  Settings,
  TrendingUp,
  CheckCircle2,
  Smartphone,
  Zap,
  Shield,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Store,
  Clock,
  Headphones,
  Puzzle,
} from "lucide-react";
// Use standard <img> for visuals identical to original

export default function Page() {
  const features = [
    {
      icon: LayoutDashboard,
      title: "Dashboard",
      description: "Real-time insights and analytics for your fashion business at a glance.",
      detailedContent: "Get comprehensive overview of sales, inventory levels, top-selling products, and key performance metrics. Monitor daily, weekly, and monthly trends with interactive charts and graphs. Track revenue, profit margins, and customer acquisition in real-time.",
      screenImage: "/images/dashboard.png"
    },
    {
      icon: Package,
      title: "Inventory Management",
      description: "Track stock levels, sizes, colors, and variants with ease.",
      detailedContent: "Manage complex fashion inventory with size matrices, color variants, and seasonal collections. Set automatic reorder points, track stock movements, and get low-stock alerts. Handle multi-location inventory with centralized control.",
      screenImage: "/images/inventory.png"
    },
    {
      icon: ShoppingCart,
      title: "Fashion POS",
      description: "Quick checkout with barcode scanning and multiple payment options.",
      detailedContent: "Lightning-fast point of sale system designed for fashion retail. Support for barcode scanning, size/color selection, discounts, and multiple payment methods. Works offline and syncs when connected.",
      screenImage: "/images/pospos.png"
    },
    {
      icon: Users,
      title: "Customer Management",
      description: "Build relationships with customer profiles and purchase history.",
      detailedContent: "Maintain detailed customer profiles with purchase history, preferences, and contact information. Create customer loyalty programs, send targeted promotions, and track customer lifetime value.",
      screenImage: "/images/dashboard-preview.jpg"
    },
    {
      icon: ShoppingBag,
      title: "Purchases",
      description: "Manage suppliers, orders, and procurement seamlessly.",
      detailedContent: "Streamline your procurement process with supplier management, purchase orders, and receiving workflows. Track delivery schedules, manage vendor relationships, and optimize purchasing decisions.",
      screenImage: "/images/fashionpos.png"
    },
    {
      icon: UserCog,
      title: "HR & Staff",
      description: "Employee management, roles, and performance tracking.",
      detailedContent: "Complete HR solution for fashion retail teams. Manage employee profiles, roles, permissions, and performance metrics. Track working hours, schedule shifts, and monitor productivity.",
      screenImage: "/images/dashboard.png"
    },
    {
      icon: Calendar,
      title: "Leaves & Salary",
      description: "Automated payroll, leave management, and attendance tracking.",
      detailedContent: "Automate payroll processing with integrated attendance tracking. Manage leave requests, calculate overtime, and generate pay slips. Handle tax calculations and compliance requirements.",
      screenImage: "/images/inventory.png"
    },
    {
      icon: FileText,
      title: "Bills & Invoicing",
      description: "Professional invoices and streamlined billing processes.",
      detailedContent: "Generate professional invoices with customizable templates. Handle multiple tax rates, discounts, and payment terms. Track payment status and send automated reminders to customers.",
      screenImage: "/images/pospos.png"
    },
    {
      icon: Settings,
      title: "Settings & Customization",
      description: "Tailor the system to match your unique business needs.",
      detailedContent: "Customize the system to match your brand and workflow. Configure user roles, permissions, and access levels. Set up custom fields, reports, and business rules specific to your operations.",
      screenImage: "/images/fashionpos.png"
    },
    {
      icon: TrendingUp,
      title: "Upgrade Plans",
      description: "Flexible pricing options that grow with your business.",
      detailedContent: "Choose from flexible pricing plans that scale with your business growth. Upgrade or downgrade anytime without losing data. Access premium features and priority support with higher-tier plans.",
      screenImage: "/images/dashboard-preview.jpg"
    },
  ];

  const benefits = [
    {
      icon: CheckCircle2,
      title: "All-in-One ERP",
      description: "Everything you need to run your clothing business in one powerful platform.",
    },
    {
      icon: Zap,
      title: "Made for Fashion Industry",
      description: "Purpose-built features designed specifically for clothing and retail businesses.",
    },
    {
      icon: Shield,
      title: "Easy to Use",
      description: "Intuitive interface that your team can master in minutes, not months.",
    },
    {
      icon: Smartphone,
      title: "Cloud + Mobile Access",
      description: "Access your business data anywhere, anytime from any device.",
    },
  ];

  const pricingPlans = [
    {
      title: "Starter",
      price: "₹6,999",
      features: [
        "limited users",
        "Basic inventory management",
        "POS system",
        "Customer database",
        "Email support",
        "Mobile app access",
      ],
    },
    {
      title: "Professional",
      price: "₹9,999",
      highlighted: true,
      features: [
        "Up to 10 users",
        "Advanced inventory + variants",
        "Multi-location POS",
        "HR & payroll management",
        "Priority support",
        "Custom reports",
        "API access",
      ],
    },
    {
      title: "Enterprise",
      price: "Custom",
      period: "",
      features: [
        "Unlimited users",
        "White-label option",
        "Advanced analytics",
        "Dedicated account manager",
        "Custom integrations",
        "24/7 phone support",
        "Training & onboarding",
      ],
    },
  ];

  const testimonials = [
    {
      quote:
        "This ERP transformed how we manage our boutique. Inventory tracking is seamless, and the POS system is incredibly fast. Highly recommend!",
      author: "Sarah Mitchell",
      role: "Owner, Elegance Boutique",
      image: "https://i.pravatar.cc/128?img=11",
    },
    {
      quote:
        "Finally, a system built for fashion retail! The multi-location support and real-time analytics have been game-changers for our chain of stores.",
      author: "James Rodriguez",
      role: "Operations Manager, Urban Threads",
      image: "https://i.pravatar.cc/128?img=22",
    },
    {
      quote:
        "The HR and payroll features saved us countless hours. Plus, the mobile app means I can check sales on the go. Worth every penny!",
      author: "Emily Chen",
      role: "Founder, Luxe Apparel",
      image: "/images/women2.png",
    },
    {
      quote:
        "Inventory variants and barcode POS made daily operations smooth. The team loves the clean UI.",
      author: "Olivia Park",
      role: "Visual Merchandiser, Mode Collective",
      image: "https://i.pravatar.cc/128?img=44",
    },
    {
      quote:
        "Multi-store support with unified analytics helped us spot trends faster and reduce waste.",
      author: "Daniel Rivera",
      role: "Store Manager, Trendline Apparel",
      image: "https://i.pravatar.cc/128?img=55",
    },
    {
      quote:
        "The HR and payroll module saved finance hours each week. Onboarding was seamless.",
      author: "Priya Kapoor",
      role: "Retail Director, Couture House",
      image: "/images/women1.png",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-20"
        style={{
          background: "linear-gradient(135deg, hsl(217 91% 60% / 0.95) 0%, hsl(217 100% 75% / 0.9) 50%, hsl(217 91% 60% / 0.95) 100%), url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMTAwIDAgTCAwIDAgMCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/90 text-sm font-medium">Trusted by 500+ Fashion Retailers</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Complete ERP Solution for
                <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Fashion Business
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed">
                Streamline inventory, sales, HR, and operations with our comprehensive clothing ERP platform designed for modern fashion retailers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
               
                <a href="#contact">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-6 shadow-lg font-semibold">
                    Get Started
                  </Button>
                </a>
                <a href="#demo">
                  <Button size="lg" variant="outline" className="border-2 border-white/80 text-white bg-white/20 hover:bg-white hover:text-blue-600 backdrop-blur-sm text-lg px-8 py-6 transition-all duration-300">
                    Watch Demo
                  </Button>
                </a>
              </div>
              
              <div className="flex items-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-sm">No Setup Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-sm">Cancel Anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-sm">24/7 Support</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-scale-in">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-soft">
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Live Demo
                </div>
                <img
                  src="/images/pospos.png"
                  alt="Fashion ERP Dashboard"
                  className="w-full h-auto rounded-lg shadow-card"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-4 font-medium">
              <Package className="w-4 h-4" />
              Complete ERP Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Everything Your Fashion Business Needs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From inventory management to customer relations, our comprehensive suite of tools is specifically designed for clothing and fashion retail operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 animate-scale-in auto-rows-max">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index} 
                icon={feature.icon} 
                title={feature.title} 
                description={feature.description}
                detailedContent={feature.detailedContent}
                screenImage={feature.screenImage}
              />
            ))}
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-xl flex items-center justify-center">
                <Store className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Active Retailers</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-xl flex items-center justify-center">
                <Headphones className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-xl flex items-center justify-center">
                <Puzzle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Integrations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 mb-8 font-semibold border border-blue-200">
                <Shield className="w-4 h-4" />
                Why Choose FashionPos
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">Built Specifically for Fashion Retailers</h2>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                Unlike generic ERP systems, FashionPos understands the unique challenges of fashion retail - from size variants to seasonal inventory management.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-5 p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
                    <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                      <benefit.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">{benefit.title}</h3>
                      <p className="text-slate-600 leading-relaxed text-base">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative animate-scale-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl transform rotate-3"></div>
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=500&fit=crop&crop=center"
                  alt="Fashion retail management"
                  className="relative w-full h-auto rounded-3xl shadow-2xl border-4 border-white"
                />
                
                {/* Floating cards */}
                <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-xl border border-slate-200">
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-900">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    Sales +25%
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border border-slate-200">
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-900">
                    <Package className="w-5 h-5 text-blue-600" />
                    Inventory Optimized
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo / Screenshot Section */}
      <section id="demo" className="py-24 bg-gradient-subtle scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-4 font-medium">
              <Smartphone className="w-4 h-4" />
              Live Dashboard Preview
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">See FashionPos In Action</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the power of our intuitive dashboard designed specifically for fashion retail management.
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <div className="relative bg-white rounded-3xl shadow-soft border border-border overflow-hidden animate-scale-in">
              {/* Browser mockup header */}
              <div className="flex items-center gap-2 px-6 py-4 bg-gray-50 border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded-lg px-4 py-2 text-sm text-gray-600 border border-gray-200">
                    app.fashionpos.com/dashboard
                  </div>
                </div>
              </div>
              
              <img
                src="/images/fashionpos.png"
                alt="Fashion POS interface"
                className="w-full h-auto"
              />
              
              {/* Floating feature highlights */}
              <div className="absolute top-20 left-6 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-card border border-gray-200">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Real-time Inventory
                </div>
              </div>
              
              <div className="absolute top-32 right-6 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-card border border-gray-200">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  Sales Analytics
                </div>
              </div>
            </div>

            {/* Second screenshot: Inventory */}
            <div className="relative bg-white rounded-3xl shadow-soft border border-border overflow-hidden animate-scale-in mt-8">
              {/* Browser mockup header */}
              <div className="flex items-center gap-2 px-6 py-4 bg-gray-50 border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded-lg px-4 py-2 text-sm text-gray-600 border border-gray-200">
                    app.fashionpos.com/inventory
                  </div>
                </div>
              </div>

              <img
                src="/images/inventory.png"
                alt="Inventory management overview"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-4 font-medium">
              <TrendingUp className="w-4 h-4" />
              Pricing Plans
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Choose Your Plan</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Flexible pricing that scales with your business. No hidden fees.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} title={plan.title} price={plan.price} period={plan.period} features={plan.features} highlighted={plan.highlighted} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-subtle scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Trusted by fashion retailers across the globe.</p>
          </div>
          <div className="max-w-6xl mx-auto">
            <TestimonialsCarousel testimonials={testimonials} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-4 font-medium">
              <Users className="w-4 h-4" />
              Get In Touch
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Contact Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                <p className="text-gray-600 mb-8">
                  Whether you're looking to streamline your fashion retail operations or have questions about our platform, our team is here to help.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-blue-50 border border-blue-100">
                  <div className="w-16 h-16 rounded-xl bg-blue-500 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                    <a href="mailto:info@technovatechnologies.com" className="text-blue-600 hover:text-blue-700 text-sm">
                      info@technovatechnologies.com
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-blue-50 border border-blue-100">
                  <div className="w-16 h-16 rounded-xl bg-blue-500 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 mb-2">Phone</h4>
                    <a href="tel:+919427300816" className="text-blue-600 hover:text-blue-700 text-sm">
                      +91 94273 00816
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-blue-50 border border-blue-100">
                  <div className="w-16 h-16 rounded-xl bg-blue-500 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                    <p className="text-gray-600 text-sm">
                      Technova Technologies<br />
                      Gujarat, India
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-8">
                <h4 className="font-semibold text-gray-900 mb-4">Business Hours</h4>
                <div className="space-y-2 text-gray-600">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">FashionPos</h3>
              </div>
              <p className="text-sm opacity-80 mb-4">The complete ERP solution designed specifically for modern fashion and clothing businesses.</p>
              <div className="flex gap-4">
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm opacity-80">
                <li>
                  <a href="#features" className="hover:opacity-100 hover:text-primary transition-all">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:opacity-100 hover:text-primary transition-all">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#demo" className="hover:opacity-100 hover:text-primary transition-all">
                    Demo
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100 hover:text-primary transition-all">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:opacity-100 hover:text-primary transition-all">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100 hover:text-primary transition-all">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100 hover:text-primary transition-all">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100 hover:text-primary transition-all">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-3 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:opacity-100 hover:text-primary transition-all">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100 hover:text-primary transition-all">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100 hover:text-primary transition-all">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100 hover:text-primary transition-all">
                    System Status
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm opacity-80">&copy; 2025 All rights reserved by <a href="https://www.technovatechnologies.com/" className="text-black hover:opacity-100 hover:text-primary transition-all">Technova Technologies</a></p>
              <div className="flex gap-6 text-sm opacity-80">
                <a href="#" className="hover:opacity-100 hover:text-primary transition-all">Privacy Policy</a>
                <a href="#" className="hover:opacity-100 hover:text-primary transition-all">Terms of Service</a>
                <a href="#" className="hover:opacity-100 hover:text-primary transition-all">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}