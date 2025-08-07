import React from 'react';
import { Calendar, Users, TrendingUp, Clock } from 'lucide-react';
import { Market } from '../types/market';

interface MarketCardProps {
  market: Market;
  onPredict: (market: Market) => void;
}

export function MarketCard({ market, onPredict }: MarketCardProps) {
  const yesPercentage = (market.yesShares / (market.yesShares + market.noShares)) * 100;
  const noPercentage = 100 - yesPercentage;
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      crypto: 'from-orange-400 to-yellow-500',
      sports: 'from-green-400 to-blue-500',
      tech: 'from-purple-400 to-pink-500',
      politics: 'from-red-400 to-purple-500',
      entertainment: 'from-pink-400 to-red-500',
    };
    return colors[category as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 group hover:scale-[1.02] hover:shadow-2xl">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(market.category)} text-white mb-2`}>
            {market.category.toUpperCase()}
          </div>
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
            {market.question}
          </h3>
          <p className="text-sm text-gray-300 line-clamp-2 mb-3">{market.description}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-500/20 rounded-lg p-3 border border-green-400/30">
            <div className="flex items-center justify-between">
              <span className="text-green-300 font-medium">YES</span>
              <span className="text-white font-bold">{market.yesPrice.toFixed(2)} XLM</span>
            </div>
            <div className="text-xs text-green-200 mt-1">{yesPercentage.toFixed(1)}%</div>
          </div>
          <div className="bg-red-500/20 rounded-lg p-3 border border-red-400/30">
            <div className="flex items-center justify-between">
              <span className="text-red-300 font-medium">NO</span>
              <span className="text-white font-bold">{market.noPrice.toFixed(2)} XLM</span>
            </div>
            <div className="text-xs text-red-200 mt-1">{noPercentage.toFixed(1)}%</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-300">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4" />
              <span>{market.totalVolume.toFixed(0)} XLM</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{(market.yesShares + market.noShares).toFixed(0)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{formatDate(market.resolutionDate)}</span>
          </div>
        </div>

        <button
          onClick={() => onPredict(market)}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Make Prediction
        </button>
      </div>
    </div>
  );
}