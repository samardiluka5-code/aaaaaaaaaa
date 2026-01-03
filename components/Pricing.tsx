
import React from 'react';
import { Check, Zap, Star } from 'lucide-react';
import { UserPlan } from '../types';

interface PricingProps {
  currentPlan: UserPlan;
  onUpgrade: (plan: UserPlan) => void;
}

export const Pricing: React.FC<PricingProps> = ({ currentPlan, onUpgrade }) => {
  const plans = [
    {
      name: UserPlan.FREE,
      price: "$0",
      description: "Basic cleanup for hobbyists",
      features: ["5 credits/month", "Standard resolution", "Basic prompt processing", "Community support"],
      icon: <Zap className="w-6 h-6 text-gray-500" />,
      buttonText: "Current Plan",
      disabled: currentPlan === UserPlan.FREE
    },
    {
      name: UserPlan.PREMIUM,
      price: "$19",
      description: "Pro features for e-commerce",
      features: ["Unlimited credits", "HD 2K/4K outputs", "Priority GPU processing", "Advanced prompt logic", "Email support"],
      icon: <Star className="w-6 h-6 text-amber-500" />,
      buttonText: "Upgrade with Stripe",
      highlight: true,
      disabled: currentPlan === UserPlan.PREMIUM
    }
  ];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Choose Your Creative Power
        </h2>
        <p className="mt-4 text-xl text-gray-600">
          Professional product photos at your fingertips.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative p-8 rounded-3xl border-2 transition-all duration-300 ${
              plan.highlight 
                ? 'border-indigo-600 shadow-xl bg-indigo-50/30' 
                : 'border-gray-200 bg-white hover:border-indigo-200 shadow-sm'
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-sm font-bold rounded-full">
                MOST POPULAR
              </span>
            )}
            
            <div className="flex justify-between items-start mb-6">
              <div>
                {plan.icon}
                <h3 className="text-2xl font-bold text-gray-900 mt-2">{plan.name}</h3>
              </div>
              <div className="text-right">
                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                <span className="text-gray-500 ml-1">/mo</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-8">{plan.description}</p>
            
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => onUpgrade(plan.name)}
              disabled={plan.disabled}
              className={`w-full py-4 px-6 rounded-xl font-bold transition-all ${
                plan.highlight
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
