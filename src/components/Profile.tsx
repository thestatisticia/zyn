import React from 'react';
import { User, Settings, LogOut, Wallet, Activity, TrendingUp } from 'lucide-react';
import { User as UserType } from '../types/market';

interface ProfileProps {
  user: UserType;
}

export function Profile({ user }: ProfileProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">User Profile</h1>
              <p className="text-gray-300 mb-4">Public Key: {user.publicKey}</p>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-orange-200 text-orange-700 text-sm rounded-full">Testnet</span>
                <span className="text-gray-300">Connected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Wallet className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{user.balance.toFixed(2)}</div>
                <div className="text-sm text-gray-300">XLM Balance</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Activity className="w-6 h-6 text-green-300" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{user.positions.length}</div>
                <div className="text-sm text-gray-300">Active Positions</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{user.marketsCreated}</div>
                <div className="text-sm text-gray-300">Markets Created</div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Actions */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Account Settings</h2>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-gray-300" />
                <span className="text-white">Settings</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <div className="flex items-center space-x-3">
                <Wallet className="w-5 h-5 text-gray-300" />
                <span className="text-white">Wallet Settings</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors">
              <div className="flex items-center space-x-3">
                <LogOut className="w-5 h-5 text-red-400" />
                <span className="text-red-400">Disconnect Wallet</span>
              </div>
              <span className="text-red-400">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 