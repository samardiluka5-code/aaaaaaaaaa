
import React, { useState } from 'react';
import { X, CreditCard, Lock, ShieldCheck, Loader2 } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  planName: string;
  price: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSuccess, planName, price }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Checkout</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-8">
          <div className="mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-medium">Selected Plan</p>
              <p className="text-lg font-bold text-gray-900">{planName}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-indigo-600">{price}</p>
              <p className="text-xs text-gray-400">per month</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email address</label>
              <input
                required
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Card information</label>
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <input
                    required
                    type="text"
                    name="cardNumber"
                    placeholder="Card number"
                    className="w-full outline-none text-gray-900"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex">
                  <input
                    required
                    type="text"
                    name="expiry"
                    placeholder="MM / YY"
                    className="w-1/2 px-4 py-3 border-r border-gray-200 outline-none"
                    value={formData.expiry}
                    onChange={handleInputChange}
                  />
                  <input
                    required
                    type="text"
                    name="cvc"
                    placeholder="CVC"
                    className="w-1/2 px-4 py-3 outline-none"
                    value={formData.cvc}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Pay {price}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              Secure Payment
            </div>
            <div className="h-3 w-px bg-gray-200"></div>
            <div>Powered by Stripe</div>
          </div>
        </div>
      </div>
    </div>
  );
};
