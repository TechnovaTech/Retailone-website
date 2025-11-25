'use client';

import { useState } from 'react';

export default function BookTrialCTA() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store user data in localStorage (can be replaced with API call)
    const existingData = JSON.parse(localStorage.getItem('trialUsers') || '[]');
    existingData.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem('trialUsers', JSON.stringify(existingData));

    // TODO: WhatsApp API Integration
    // Send notification via WhatsApp API after form submit
    // Example: sendWhatsAppNotification(formData.phone, "Welcome to Fashion ERP Trial!");
    
    // Show success message
    setShowSuccess(true);
    
    // Redirect to thank-you page after 3 seconds
    setTimeout(() => {
      window.location.href = '/thank-you';
    }, 3000);
  };

  return (
    <>
      {/* Sticky Top Navbar Button */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            FashionERP
          </div>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Book Free Trial
          </button>
        </div>
      </div>

      {/* Hero Section CTA Button */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white pt-20">
        <div className="text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your Fashion Business
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Experience the power of our Fashion ERP with a 7-day free trial. No credit card required.
          </p>
          
          {/* Main CTA Button - Large, Centered, Green Gradient */}
          <button
            onClick={() => setIsPopupOpen(true)}
            className="px-12 py-5 text-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-bold shadow-2xl hover:shadow-green-500/50 hover:scale-110 transition-all duration-300 animate-pulse-slow"
          >
            Book Free Trial
          </button>
        </div>
      </div>

      {/* Popup Form Modal */}
      {isPopupOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsPopupOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full mx-4 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>

            {!showSuccess ? (
              <>
                {/* Form Header */}
                <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                  Start Your Free Trial
                </h2>
                <p className="text-gray-600 mb-8 text-center">
                  Get 7 days of full access to Fashion ERP
                </p>

                {/* Trial Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      placeholder="you@company.com"
                    />
                  </div>

                  {/* Phone / WhatsApp Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  {/* Company / Store Name Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company / Store Name *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      placeholder="Your business name"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    Start My Free Trial
                  </button>
                </form>

                <p className="text-xs text-gray-500 text-center mt-6">
                  No credit card required • Cancel anytime
                </p>
              </>
            ) : (
              /* Success Message */
              <div className="text-center py-8 animate-fadeIn">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Thank You!
                </h3>
                <p className="text-gray-600 text-lg">
                  Your 7-day Fashion ERP trial has started.
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  Redirecting to thank you page...
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.9;
          }
        }
      `}</style>
    </>
  );
}
