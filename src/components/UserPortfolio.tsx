import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Trophy, Target } from 'lucide-react';
import { User, UserPosition } from '../types/market';

interface UserPortfolioProps {
  user: User;
  positions: UserPosition[];
}

export function UserPortfolio({ user, positions }: UserPortfolioProps) {
  const totalValue = positions.reduce((sum, pos) => sum + pos.currentValue, 0);
  const totalInvested = positions.reduce((sum, pos) => sum + (pos.shares * pos.averagePrice), 0);
  const totalReturn = totalValue - totalInvested;
  const returnPercentage = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Your Portfolio</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-400/30">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-5 h-5 text-blue-300" />
            <span className="text-sm text-blue-200">Balance</span>
          </div>
          <div className="text-xl font-bold text-white">{user.balance.toFixed(2)} XLM</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-400/30">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-5 h-5 text-green-300" />
            <span className="text-sm text-green-200">Portfolio Value</span>
          </div>
          <div className="text-xl font-bold text-white">{totalValue.toFixed(2)} XLM</div>
        </div>

        <div className={`rounded-lg p-4 border ${
          totalReturn >= 0 
            ? 'bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-400/30' 
            : 'bg-gradient-to-br from-red-500/20 to-red-600/20 border-red-400/30'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            {totalReturn >= 0 ? (
              <TrendingUp className="w-5 h-5 text-green-300" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-300" />
            )}
            <span className={`text-sm ${totalReturn >= 0 ? 'text-green-200' : 'text-red-200'}`}>
              Total Return
            </span>
          </div>
          <div className={`text-xl font-bold ${totalReturn >= 0 ? 'text-green-300' : 'text-red-300'}`}>
            {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)} XLM
          </div>
          <div className={`text-xs ${totalReturn >= 0 ? 'text-green-200' : 'text-red-200'}`}>
            {returnPercentage >= 0 ? '+' : ''}{returnPercentage.toFixed(1)}%
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-400/30">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="w-5 h-5 text-purple-300" />
            <span className="text-sm text-purple-200">Markets Created</span>
          </div>
          <div className="text-xl font-bold text-white">{user.marketsCreated}</div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Active Positions</h3>
        {positions.length > 0 ? (
          <div className="space-y-3">
            {positions.map((position, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Market #{position.marketId}</div>
                    <div className="text-sm text-gray-300">
                      {position.shares} shares @ {position.averagePrice.toFixed(3)} XLM
                    </div>
                    <div className={`text-sm font-medium ${
                      position.side === 'yes' ? 'text-green-300' : 'text-red-300'
                    }`}>
                      {position.side.toUpperCase()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{position.currentValue.toFixed(2)} XLM</div>
                    <div className={`text-sm ${
                      position.currentValue >= position.shares * position.averagePrice
                        ? 'text-green-300'
                        : 'text-red-300'
                    }`}>
                      {position.currentValue >= position.shares * position.averagePrice ? '+' : ''}
                      {(position.currentValue - position.shares * position.averagePrice).toFixed(2)} XLM
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <div className="text-gray-300">No active positions</div>
            <div className="text-sm text-gray-400">Start predicting on markets to see your positions here</div>
          </div>
        )}
      </div>
    </div>
  );
}