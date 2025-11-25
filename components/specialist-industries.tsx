"use client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";
import PricingCard from "@/components/PricingCard";
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
}