import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { CategoryTabs } from './components/CategoryTabs';
import { MarketCard } from './components/MarketCard';
import { PredictModal } from './components/PredictModal';
import { CreateMarketModal } from './components/CreateMarketModal';
import { UserPortfolio } from './components/UserPortfolio';
import { Profile } from './components/Profile';
import { useStellar } from './hooks/useStellar';
import { mockMarkets } from './data/mockMarkets';
import { Market, User, UserPosition } from './types/market';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [markets, setMarkets] = useState<Market[]>(mockMarkets);
  const [userPositions, setUserPositions] = useState<UserPosition[]>([]);

  const { isConnected, publicKey, balance, connectWallet } = useStellar();

  const currentUser: User | null = isConnected ? {
    publicKey,
    balance,
    positions: userPositions,
    marketsCreated: 3,
    totalVolume: 15420,
  } : null;

  const filteredMarkets = useMemo(() => {
    let filtered = markets;

    if (activeCategory !== 'all') {
      filtered = filtered.filter(market => market.category === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(market =>
        market.question.toLowerCase().includes(query) ||
        market.description.toLowerCase().includes(query) ||
        market.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered.sort((a, b) => b.totalVolume - a.totalVolume);
  }, [markets, activeCategory, searchQuery]);

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      alert('Failed to connect wallet. Please try again.');
    }
  };

  const handlePredict = async (marketId: string, side: 'yes' | 'no', amount: number) => {
    if (!currentUser) return;

    // Mock prediction logic
    const market = markets.find(m => m.id === marketId);
    if (!market) return;

    const price = side === 'yes' ? market.yesPrice : market.noPrice;
    const shares = amount / price;

    // Update market
    const updatedMarkets = markets.map(m => {
      if (m.id === marketId) {
        return {
          ...m,
          totalVolume: m.totalVolume + amount,
          [side === 'yes' ? 'yesShares' : 'noShares']: m[side === 'yes' ? 'yesShares' : 'noShares'] + shares,
        };
      }
      return m;
    });

    setMarkets(updatedMarkets);

    // Add position
    const newPosition: UserPosition = {
      marketId,
      shares,
      side,
      averagePrice: price,
      currentValue: shares * price, // In reality, this would change based on market prices
    };

    setUserPositions(prev => [...prev, newPosition]);
  };

  const handleCreateMarket = async (marketData: any) => {
    if (!currentUser) return;

    const newMarket: Market = {
      id: (markets.length + 1).toString(),
      ...marketData,
      creator: currentUser.publicKey,
      createdAt: new Date(),
      totalVolume: 0,
      yesPrice: 0.5,
      noPrice: 0.5,
      yesShares: 0,
      noShares: 0,
      status: 'active',
    };

    setMarkets(prev => [newMarket, ...prev]);
  };

  const totalVolume = markets.reduce((sum, market) => sum + market.totalVolume, 0);
  const totalMarkets = markets.length;
  const activeUsers = 1247; // Mock data

  return (
    <>
      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{totalVolume.toLocaleString()}</div>
                <div className="text-sm text-gray-300">Total Volume (XLM)</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-300" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{totalMarkets}</div>
                <div className="text-sm text-gray-300">Active Markets</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Users className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{activeUsers.toLocaleString()}</div>
                <div className="text-sm text-gray-300">Active Users</div>
              </div>
            </div>
          </div>

          {currentUser && (
            <button
              onClick={() => setShowPortfolio(!showPortfolio)}
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-200 text-left group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-teal-500/20 rounded-lg group-hover:bg-teal-500/30 transition-colors">
                  <Activity className="w-6 h-6 text-teal-300" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{userPositions.length}</div>
                  <div className="text-sm text-gray-300">Your Positions</div>
                </div>
              </div>
            </button>
          )}
        </div> */}

        {/* Portfolio Section */}
        {showPortfolio && currentUser && (
          <div className="mb-8">
            <UserPortfolio user={currentUser} positions={userPositions} />
          </div>
        )}

        {/* Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarkets.map((market) => (
            <MarketCard
              key={market.id}
              market={market}
              onPredict={setSelectedMarket}
            />
          ))}
        </div>

        {filteredMarkets.length === 0 && (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <div className="text-xl text-white mb-2">No markets found</div>
            <div className="text-gray-300">
              {searchQuery ? 'Try adjusting your search terms' : 'Be the first to create a market in this category!'}
            </div>
          </div>
        )}
      </main>

      <PredictModal
        market={selectedMarket}
        onClose={() => setSelectedMarket(null)}
        onPredict={handlePredict}
        userBalance={currentUser?.balance || 0}
      />

      <CreateMarketModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateMarket={handleCreateMarket}
      />
    </>
  );
}

function App() {
  const { isConnected, publicKey, balance } = useStellar();
  const [searchQuery, setSearchQuery] = useState('');

  const currentUser: User | null = isConnected ? {
    publicKey,
    balance,
    positions: [],
    marketsCreated: 3,
    totalVolume: 15420,
  } : null;

  const handleConnectWallet = async () => {
    // This will be handled by the HomePage component
  };

  const handleCreateMarket = () => {
    // This will be handled by the HomePage component
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900">
        <Header
          currentUser={currentUser}
          onConnectWallet={handleConnectWallet}
          onCreateMarket={handleCreateMarket}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/profile" 
            element={
              currentUser ? (
                <Profile user={currentUser} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;