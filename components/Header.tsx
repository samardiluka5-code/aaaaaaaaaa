
import React from 'react';
import { Camera, Sparkles, CreditCard, User } from 'lucide-react';
import { UserPlan } from '../types';

interface HeaderProps {
  plan: UserPlan;
  onPricingClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ plan, onPricingClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              SnapEdit AI
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onPricingClick}
              className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <CreditCard className="w-4 h-4" />
              Pricing
            </button>
            
            <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 rounded text-xs font-bold ${
                plan === UserPlan.PREMIUM 
                  ? 'bg-amber-100 text-amber-700 border border-amber-200' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {plan}
              </span>
              <button className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
