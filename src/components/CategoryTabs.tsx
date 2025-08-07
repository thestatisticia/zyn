import React from 'react';
import { Bitcoin, Trophy, Cpu, Vote, Film, TrendingUp } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All', icon: TrendingUp },
  { id: 'crypto', name: 'Crypto', icon: Bitcoin },
  { id: 'sports', name: 'Sports', icon: Trophy },
  { id: 'tech', name: 'Tech', icon: Cpu },
  { id: 'politics', name: 'Politics', icon: Vote },
  { id: 'entertainment', name: 'Entertainment', icon: Film },
];

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="bg-white/5 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 overflow-x-auto py-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}