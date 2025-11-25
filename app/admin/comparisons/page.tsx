'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Star, Save, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AdminNavbar from '@/components/admin-navbar';

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

const defaultComparison: ComparisonData = {
  title: '',
  subtitle: '',
  ourSoftware: {
    name: '',
    logo: '',
    price: '',
    rating: 5,
    highlights: ['']
  },
  competitors: [{
    name: '',
    logo: '',
    price: '',
    rating: 3,
    highlights: ['']
  }],
  features: [{ name: '', ourSoftware: true, competitors: {}, highlight: false }],
  ctaText: 'Get Started Today',
  ctaLink: '/contact',
  isActive: true
};

export default function AdminComparisons() {
  const [comparisons, setComparisons] = useState<ComparisonData[]>([]);
  const [editingComparison, setEditingComparison] = useState<ComparisonData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComparisons();
  }, []);

  const fetchComparisons = async () => {
    try {
      const response = await fetch('/api/comparisons');
      if (response.ok) {
        const data = await response.json();
        setComparisons(data);
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch comparisons', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingComparison) return;

    try {
      const method = editingComparison._id ? 'PUT' : 'POST';
      const response = await fetch('/api/comparisons', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingComparison)
      });

      if (response.ok) {
        toast({ title: 'Success', description: `Comparison ${editingComparison._id ? 'updated' : 'created'} successfully` });
        fetchComparisons();
        setIsDialogOpen(false);
        setEditingComparison(null);
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save comparison', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this comparison?')) return;

    try {
      const response = await fetch(`/api/comparisons?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        toast({ title: 'Success', description: 'Comparison deleted successfully' });
        fetchComparisons();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete comparison', variant: 'destructive' });
    }
  };

  const addFeature = () => {
    if (!editingComparison) return;
    setEditingComparison({
      ...editingComparison,
      features: [...editingComparison.features, { name: '', ourSoftware: true, competitor: false, highlight: false }]
    });
  };

  const removeFeature = (index: number) => {
    if (!editingComparison) return;
    setEditingComparison({
      ...editingComparison,
      features: editingComparison.features.filter((_, i) => i !== index)
    });
  };

  const updateFeature = (index: number, field: keyof ComparisonFeature, value: any, competitorName?: string) => {
    if (!editingComparison) return;
    const updatedFeatures = [...editingComparison.features];
    if (field === 'competitors' && competitorName) {
      updatedFeatures[index] = {
        ...updatedFeatures[index],
        competitors: { ...updatedFeatures[index].competitors, [competitorName]: value }
      };
    } else {
      updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    }
    setEditingComparison({ ...editingComparison, features: updatedFeatures });
  };

  const addFeatureForAllCompetitors = () => {
    if (!editingComparison) return;
    const newCompetitors: { [key: string]: boolean | string } = {};
    editingComparison.competitors.forEach(comp => {
      newCompetitors[comp.name] = false;
    });
    setEditingComparison({
      ...editingComparison,
      features: [...editingComparison.features, { 
        name: '', 
        ourSoftware: true, 
        competitors: newCompetitors, 
        highlight: false 
      }]
    });
  };

  const addHighlight = (type: 'ourSoftware' | 'competitors', competitorIndex?: number) => {
    if (!editingComparison) return;
    if (type === 'ourSoftware') {
      setEditingComparison({
        ...editingComparison,
        ourSoftware: {
          ...editingComparison.ourSoftware,
          highlights: [...editingComparison.ourSoftware.highlights, '']
        }
      });
    } else if (competitorIndex !== undefined) {
      const updatedCompetitors = [...editingComparison.competitors];
      updatedCompetitors[competitorIndex] = {
        ...updatedCompetitors[competitorIndex],
        highlights: [...updatedCompetitors[competitorIndex].highlights, '']
      };
      setEditingComparison({ ...editingComparison, competitors: updatedCompetitors });
    }
  };

  const removeHighlight = (type: 'ourSoftware' | 'competitors', index: number, competitorIndex?: number) => {
    if (!editingComparison) return;
    if (type === 'ourSoftware') {
      setEditingComparison({
        ...editingComparison,
        ourSoftware: {
          ...editingComparison.ourSoftware,
          highlights: editingComparison.ourSoftware.highlights.filter((_, i) => i !== index)
        }
      });
    } else if (competitorIndex !== undefined) {
      const updatedCompetitors = [...editingComparison.competitors];
      updatedCompetitors[competitorIndex] = {
        ...updatedCompetitors[competitorIndex],
        highlights: updatedCompetitors[competitorIndex].highlights.filter((_, i) => i !== index)
      };
      setEditingComparison({ ...editingComparison, competitors: updatedCompetitors });
    }
  };

  const updateHighlight = (type: 'ourSoftware' | 'competitors', index: number, value: string, competitorIndex?: number) => {
    if (!editingComparison) return;
    if (type === 'ourSoftware') {
      const updatedHighlights = [...editingComparison.ourSoftware.highlights];
      updatedHighlights[index] = value;
      setEditingComparison({
        ...editingComparison,
        ourSoftware: { ...editingComparison.ourSoftware, highlights: updatedHighlights }
      });
    } else if (competitorIndex !== undefined) {
      const updatedCompetitors = [...editingComparison.competitors];
      const updatedHighlights = [...updatedCompetitors[competitorIndex].highlights];
      updatedHighlights[index] = value;
      updatedCompetitors[competitorIndex] = { ...updatedCompetitors[competitorIndex], highlights: updatedHighlights };
      setEditingComparison({ ...editingComparison, competitors: updatedCompetitors });
    }
  };

  const addCompetitor = () => {
    if (!editingComparison) return;
    setEditingComparison({
      ...editingComparison,
      competitors: [...editingComparison.competitors, {
        name: '',
        logo: '',
        price: '',
        rating: 3,
        highlights: ['']
      }]
    });
  };

  const removeCompetitor = (index: number) => {
    if (!editingComparison || editingComparison.competitors.length <= 1) return;
    const updatedCompetitors = editingComparison.competitors.filter((_, i) => i !== index);
    const updatedFeatures = editingComparison.features.map(feature => {
      const newCompetitors = { ...feature.competitors };
      delete newCompetitors[editingComparison.competitors[index].name];
      return { ...feature, competitors: newCompetitors };
    });
    setEditingComparison({ 
      ...editingComparison, 
      competitors: updatedCompetitors,
      features: updatedFeatures
    });
  };

  const updateCompetitor = (index: number, field: keyof Competitor, value: any) => {
    if (!editingComparison) return;
    const updatedCompetitors = [...editingComparison.competitors];
    const oldName = updatedCompetitors[index].name;
    updatedCompetitors[index] = { ...updatedCompetitors[index], [field]: value };
    
    if (field === 'name' && oldName !== value) {
      const updatedFeatures = editingComparison.features.map(feature => {
        const newCompetitors = { ...feature.competitors };
        if (oldName in newCompetitors) {
          newCompetitors[value] = newCompetitors[oldName];
          delete newCompetitors[oldName];
        }
        return { ...feature, competitors: newCompetitors };
      });
      setEditingComparison({ 
        ...editingComparison, 
        competitors: updatedCompetitors,
        features: updatedFeatures
      });
    } else {
      setEditingComparison({ ...editingComparison, competitors: updatedCompetitors });
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar title="Software Comparisons" subtitle="Manage competitive comparisons for your software" />
      
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-end items-center">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => setEditingComparison(defaultComparison)}
                  className="bg-[#D7263D] hover:bg-[#B91C3C] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add New Comparison
                </Button>
              </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
            <DialogHeader className="pb-4 border-b">
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {editingComparison?._id ? 'Edit' : 'Create New'} Comparison
              </DialogTitle>
            </DialogHeader>
            
            {editingComparison && (
              <div className="space-y-6">
                {/* Basic Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800">Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Comparison Title</Label>
                        <Input
                          placeholder="e.g., Retalians ERP vs SAP Business One"
                          value={editingComparison.title}
                          onChange={(e) => setEditingComparison({...editingComparison, title: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <Label className="text-sm font-medium text-gray-700">Status</Label>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={editingComparison.isActive}
                            onCheckedChange={(checked) => setEditingComparison({...editingComparison, isActive: checked})}
                          />
                          <span className={`text-sm font-medium ${
                            editingComparison.isActive ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {editingComparison.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Subtitle/Description</Label>
                      <Textarea
                        placeholder="Brief description of the comparison"
                        value={editingComparison.subtitle}
                        onChange={(e) => setEditingComparison({...editingComparison, subtitle: e.target.value})}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Software Details */}
                <div className="space-y-6">
                  <Card className="border-2 border-[#D7263D] bg-red-50">
                    <CardHeader className="bg-[#D7263D] text-white">
                      <CardTitle className="flex items-center gap-2">
                        <Star className="w-5 h-5 fill-current" />
                        Our Software
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Name"
                          value={editingComparison.ourSoftware.name}
                          onChange={(e) => setEditingComparison({
                            ...editingComparison,
                            ourSoftware: {...editingComparison.ourSoftware, name: e.target.value}
                          })}
                        />
                        <Input
                          placeholder="Price"
                          value={editingComparison.ourSoftware.price}
                          onChange={(e) => setEditingComparison({
                            ...editingComparison,
                            ourSoftware: {...editingComparison.ourSoftware, price: e.target.value}
                          })}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-gray-700">Competitor Software</CardTitle>
                      <Button onClick={addCompetitor} variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Competitor
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {editingComparison.competitors.map((competitor, compIdx) => (
                        <div key={compIdx} className="p-4 border rounded-lg bg-gray-50">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-semibold">Competitor {compIdx + 1}</h4>
                            {editingComparison.competitors.length > 1 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeCompetitor(compIdx)}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <Input
                              placeholder="Name"
                              value={competitor.name}
                              onChange={(e) => updateCompetitor(compIdx, 'name', e.target.value)}
                            />
                            <Input
                              placeholder="Price"
                              value={competitor.price}
                              onChange={(e) => updateCompetitor(compIdx, 'price', e.target.value)}
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Features */}
                <Card>
                  <CardHeader>
                    <CardTitle>Features Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {editingComparison.features.map((feature, idx) => (
                      <div key={idx} className="p-4 border rounded-lg bg-gray-50">
                        <div className="grid gap-4">
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <Label>Feature Name</Label>
                              <Input
                                placeholder="e.g., POS Integration"
                                value={feature.name}
                                onChange={(e) => updateFeature(idx, 'name', e.target.value)}
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <Label>Highlight:</Label>
                              <Switch
                                checked={feature.highlight || false}
                                onCheckedChange={(checked) => updateFeature(idx, 'highlight', checked)}
                              />
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeFeature(idx)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div>
                              <Label className="text-[#D7263D] font-semibold">Our Software</Label>
                              <Input
                                placeholder="Yes/No or custom value"
                                value={typeof feature.ourSoftware === 'boolean' ? (feature.ourSoftware ? 'Yes' : 'No') : feature.ourSoftware}
                                onChange={(e) => {
                                  const value = e.target.value.toLowerCase();
                                  updateFeature(idx, 'ourSoftware', value === 'yes' ? true : value === 'no' ? false : e.target.value);
                                }}
                              />
                            </div>
                            
                            {editingComparison.competitors.map((competitor, compIdx) => {
                              const competitorValue = feature.competitors[competitor.name] || false;
                              return (
                                <div key={compIdx}>
                                  <Label className="text-gray-600">{competitor.name || `Competitor ${compIdx + 1}`}</Label>
                                  <Input
                                    placeholder="Yes/No or custom value"
                                    value={typeof competitorValue === 'boolean' ? (competitorValue ? 'Yes' : 'No') : competitorValue}
                                    onChange={(e) => {
                                      const value = e.target.value.toLowerCase();
                                      updateFeature(idx, 'competitors', value === 'yes' ? true : value === 'no' ? false : e.target.value, competitor.name);
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button onClick={addFeatureForAllCompetitors} variant="outline" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Feature
                    </Button>
                  </CardContent>
                </Card>

                {/* CTA */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>CTA Text</Label>
                    <Input
                      value={editingComparison.ctaText}
                      onChange={(e) => setEditingComparison({...editingComparison, ctaText: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>CTA Link</Label>
                    <Input
                      value={editingComparison.ctaLink}
                      onChange={(e) => setEditingComparison({...editingComparison, ctaLink: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
        {comparisons.map((comparison) => (
          <Card key={comparison._id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {comparison.title}
                    {comparison.isActive ? (
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </CardTitle>
                  <p className="text-gray-600 mt-2">{comparison.subtitle}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingComparison(comparison);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(comparison._id!)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <strong>Our Software:</strong> {comparison.ourSoftware.name} ({comparison.ourSoftware.price})
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < comparison.ourSoftware.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {(comparison.competitors || []).length > 0 && (
                  <div>
                    <strong>Competitors:</strong>
                    <div className="mt-2 space-y-2">
                      {(comparison.competitors || []).map((competitor, idx) => (
                        <div key={idx} className="text-gray-600">
                          {competitor.name} ({competitor.price})
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < competitor.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <strong>Features:</strong> {comparison.features.length} features compared
              </div>
            </CardContent>
          </Card>
        ))}
        </div>
      </div>
    </div>
  );
}