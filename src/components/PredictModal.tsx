import React, { useState } from 'react';
import { X, TrendingUp, AlertCircle } from 'lucide-react';
import { Market } from '../types/market';

interface PredictModalProps {
  market: Market | null;
  onClose: () => void;
  onPredict: (marketId: string, side: 'yes' | 'no', amount: number) => void;
  userBalance: number;
}

export function PredictModal({ market, onClose, onPredict, userBalance }: PredictModalProps) {
  const [selectedSide, setSelectedSide] = useState<'yes' | 'no'>('yes');
  const [amount, setAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!market) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    
    if (numAmount > 0 && numAmount <= userBalance) {
      setIsSubmitting(true);
      try {
        await onPredict(market.id, selectedSide, numAmount);
        onClose();
      } catch (error) {
        console.error('Prediction failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const potentialPayout = selectedSide === 'yes' 
    ? parseFloat(amount) * (1 / market.yesPrice)
    : parseFloat(amount) * (1 / market.noPrice);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-xl border border-white/20 max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Make Prediction</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">{market.question}</h3>
          <p className="text-sm text-gray-300">{market.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Choose your prediction:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedSide('yes')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedSide === 'yes'
                    ? 'border-green-400 bg-green-500/20 text-green-300'
                    : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                }`}
              >
                <div className="font-semibold">YES</div>
                <div className="text-sm">{market.yesPrice.toFixed(2)} XLM</div>
              </button>
              <button
                type="button"
                onClick={() => setSelectedSide('no')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedSide === 'no'
                    ? 'border-red-400 bg-red-500/20 text-red-300'
                    : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                }`}
              >
                <div className="font-semibold">NO</div>
                <div className="text-sm">{market.noPrice.toFixed(2)} XLM</div>
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
              Amount to invest:
            </label>
            <div className="relative">
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                min="0"
                max={userBalance}
                step="0.01"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                XLM
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Balance: {userBalance.toFixed(2)} XLM</span>
              <button
                type="button"
                onClick={() => setAmount(userBalance.toString())}
                className="text-blue-400 hover:text-blue-300"
              >
                Max
              </button>
            </div>
          </div>

          {amount && parseFloat(amount) > 0 && (
            <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-blue-300 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">Potential Payout</span>
              </div>
              <div className="text-white text-lg font-bold">
                {potentialPayout.toFixed(2)} XLM
              </div>
              <div className="text-xs text-blue-200 mt-1">
                Profit: {(potentialPayout - parseFloat(amount)).toFixed(2)} XLM
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > userBalance || isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-teal-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
          >
            {isSubmitting ? 'Processing...' : 'Confirm Prediction'}
          </button>
        </form>

        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-400/30 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-yellow-200">
              Predictions are final and cannot be canceled once submitted. Market resolution depends on external verification.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}