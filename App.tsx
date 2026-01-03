
import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { ImageEditor } from './components/ImageEditor';
import { Pricing } from './components/Pricing';
import { CheckoutModal } from './components/CheckoutModal';
import { UserPlan } from './types';
import { CheckCircle2, ChevronRight, Play, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState<UserPlan>(UserPlan.FREE);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const pricingRef = useRef<HTMLElement>(null);

  const handleUpgradeClick = (plan: UserPlan) => {
    if (plan === UserPlan.PREMIUM) {
      setIsCheckoutOpen(true);
    }
  };

  const handlePaymentSuccess = () => {
    setIsCheckoutOpen(false);
    setCurrentPlan(UserPlan.PREMIUM);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 5000);
  };

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative">
      {showSuccessToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[110] bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <div className="bg-green-500 p-1 rounded-full">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold">Upgrade successful!</p>
            <p className="text-sm text-gray-400">Welcome to Premium</p>
          </div>
        </div>
      )}

      <Header plan={currentPlan} onPricingClick={scrollToPricing} />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-6 border border-indigo-100">
                <Sparkles className="w-4 h-4" />
                Next-gen AI Editing
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-none mb-6">
                Clean up photos with <span className="text-indigo-600">AI instructions.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                No complex tools. Just type what you want to fix—remove backgrounds, erase shadows, or add filters in seconds.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
                  className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg"
                >
                  Start Editing Free
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button 
                   onClick={scrollToPricing}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-bold flex items-center justify-center gap-2 hover:border-indigo-400 transition-all shadow-sm"
                >
                  <Play className="w-4 h-4 fill-current" />
                  View Pricing
                </button>
              </div>
              
              <div className="mt-12 flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  No CC required
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Free 5 credits
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Gemini 2.5 Flash
                </div>
              </div>
            </div>

            {/* Editor Component */}
            <div id="editor-section">
              <ImageEditor />
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 -left-64 w-[600px] h-[600px] bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-64 w-[600px] h-[600px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </section>

        {/* Features / Why us section */}
        <section className="bg-white py-24 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Background Removal</h3>
                <p className="text-gray-600">Perfect cutouts for products using Gemini's advanced semantic understanding.</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Instant Cleanup</h3>
                <p className="text-gray-600">Dust, scratches, and unwanted shadows disappear with a simple text command.</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.172-1.172a4 4 0 115.656 5.656L10 17.657" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Batch Processing</h3>
                <p className="text-gray-600">Apply the same instruction to multiple photos to keep your catalog consistent.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <div ref={pricingRef as any}>
          <Pricing currentPlan={currentPlan} onUpgrade={handleUpgradeClick} />
        </div>
      </main>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={handlePaymentSuccess}
        planName="Premium Plan"
        price="$19"
      />

      <footer className="bg-gray-900 text-gray-400 py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white">
              SnapEdit AI
            </span>
          </div>
          
          <div className="flex gap-12 text-sm">
             <div className="space-y-4">
               <h4 className="text-white font-bold">Product</h4>
               <ul className="space-y-2 text-gray-500">
                 <li>Features</li>
                 <li>Showcase</li>
                 <li>Pricing</li>
               </ul>
             </div>
             <div className="space-y-4">
               <h4 className="text-white font-bold">Company</h4>
               <ul className="space-y-2 text-gray-500">
                 <li>About</li>
                 <li>Blog</li>
                 <li>Careers</li>
               </ul>
             </div>
             <div className="space-y-4">
               <h4 className="text-white font-bold">Legal</h4>
               <ul className="space-y-2 text-gray-500">
                 <li>Privacy</li>
                 <li>Terms</li>
                 <li>Cookie Policy</li>
               </ul>
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-800 text-center text-xs text-gray-600">
          © 2024 SnapEdit AI Inc. All rights reserved. Powered by Google Gemini. Payments handled by Stripe.
        </div>
      </footer>
    </div>
  );
};

export default App;
