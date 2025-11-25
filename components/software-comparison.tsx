'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Star, ArrowRight } from 'lucide-react';

interface ComparisonFeature {
  name: string;
  ourSoftware: boolean | string;
  competitors: { [key: string]: boolean | string };
  highlight?: boolean;
}

interface Competitor {
  name: string;
  logo?: string;
  price: string;
  rating: number;
  highlights: string[];
}

interface ComparisonData {
  _id?: string;
  title: string;
  subtitle: string;
  ourSoftware: {
    name: string;
    logo?: string;
    price: string;
    rating: number;
    highlights: string[];
  };
  competitors: Competitor[];
  features: ComparisonFeature[];
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
}

export default function SoftwareComparison() {
  const [comparisons, setComparisons] = useState<ComparisonData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComparisons();
  }, []);

  const fetchComparisons = async () => {
    try {
      const response = await fetch('/api/comparisons');
      if (response.ok) {
        const data = await response.json();
        setComparisons(data.filter((comp: ComparisonData) => comp.isActive));
      }
    } catch (error) {
      console.error('Error fetching comparisons:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderFeatureValue = (value: boolean | string, isOurs: boolean = false) => {
    if (typeof value === 'boolean') {
      return (
        <div className="flex justify-center">
          {value ? (
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          ) : (
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="text-center">
        <span className={`text-sm font-semibold ${isOurs ? 'text-[#D7263D]' : 'text-gray-700'}`}>
          {value}
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-lg w-64 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (comparisons.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {comparisons.map((comparison, index) => (
          <div key={comparison._id || index} className="mb-24">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {comparison.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {comparison.subtitle}
              </p>
            </div>



            {/* Perfect Comparison Table */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 max-w-7xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 bg-red-50 border-r border-gray-200 min-w-[200px]">
                        Feature
                      </th>
                      <th className="px-4 py-4 text-center text-sm font-bold text-white bg-gradient-to-r from-[#D7263D] to-[#F03A47] border-r border-red-500 relative min-w-[150px]">
                        <div className="font-bold text-base">{comparison.ourSoftware.name}</div>
                        <div className="text-xs mt-1 opacity-90">{comparison.ourSoftware.price}</div>
                      </th>
                      {(comparison.competitors || []).map((competitor, idx) => (
                        <th key={idx} className="px-4 py-4 text-center text-sm font-semibold text-gray-700 bg-gray-100 border-r border-gray-200 min-w-[150px]">
                          <div className="font-semibold">{competitor.name}</div>
                          <div className="text-xs mt-1 text-gray-600">{competitor.price}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.features.map((feature, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-red-50' : 'bg-white'}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-800 border-r border-gray-200">
                          <div className="flex items-center gap-2">
                            {feature.name}
                            {feature.highlight && (
                              <Badge className="bg-[#D7263D] text-white text-xs px-2 py-1">
                                ⭐ Key
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center border-r border-gray-200 bg-red-50">
                          {renderFeatureValue(feature.ourSoftware, true)}
                        </td>
                        {(comparison.competitors || []).map((competitor, compIdx) => (
                          <td key={compIdx} className="px-4 py-4 text-center border-r border-gray-200">
                            {renderFeatureValue((feature.competitors && feature.competitors[competitor.name]) || false)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#D7263D] to-[#F03A47] hover:from-[#B91C3C] hover:to-[#DC2626] text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                onClick={() => window.open(comparison.ctaLink, '_blank')}
              >
                {comparison.ctaText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}