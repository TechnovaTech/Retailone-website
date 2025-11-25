"use client";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  detailedContent?: string;
  screenImage?: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
        <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
