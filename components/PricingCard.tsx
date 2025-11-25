"use client";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  features: string[];
  highlighted?: boolean;
}

export default function PricingCard({ title, price, period = "/month", features, highlighted }: PricingCardProps) {
  return (
    <div className={`p-8 rounded-2xl border-2 transition-all duration-300 ${
      highlighted 
        ? "border-blue-500 bg-blue-50 shadow-xl scale-105" 
        : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg"
    }`}>
      {highlighted && (
        <div className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold text-gray-900">{price}</span>
        {period && <span className="text-gray-600">{period}</span>}
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <Button className={`w-full ${highlighted ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"}`}>
        Get Started
      </Button>
    </div>
  );
}
