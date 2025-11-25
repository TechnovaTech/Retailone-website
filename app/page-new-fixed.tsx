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
          background: "linear-gradient(135deg, hsl(217 91% 60% / 0.95) 0%, hsl(217 100% 75% / 0.9) 50%, hsl(217 91% 60% / 0.95) 100%), url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMTAwIDAgTCAwIDAgMCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0i"
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Complete ERP Solution for{" "}
              <span className="text-yellow-300">Fashion Retail</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Streamline inventory, sales, HR, and operations with our all-in-one platform designed specifically for clothing businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-8 py-4 text-lg">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Run Your Fashion Business
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From inventory management to customer relationships, our comprehensive ERP solution handles every aspect of your clothing business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Fashion ERP?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for the fashion industry with features that understand your unique challenges.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your business size and needs. All plans include core ERP features.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Fashion Retailers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our ERP solution has transformed businesses like yours.
            </p>
          </div>
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Fashion Business?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of fashion retailers who trust our ERP solution to streamline their operations and boost profitability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-8 py-4 text-lg">
                Start Your Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}