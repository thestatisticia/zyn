import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Banknote, Medal, User, Copy, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  currentUser: any;
  onConnectWallet: () => void;
  onCreateMarket: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ 
  currentUser, 
  onConnectWallet, 
  onCreateMarket, 
  searchQuery, 
  onSearchChange 
}: HeaderProps) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    console.log('Profile clicked, currentUser:', currentUser);
    console.log('showDropdown before:', showDropdown);
    setShowDropdown(!showDropdown);
    console.log('showDropdown after:', !showDropdown);
  };

  const handleCopyWalletId = () => {
    if (currentUser?.publicKey) {
      navigator.clipboard.writeText(currentUser.publicKey);
    }
  };

  const handleLogout = () => {
    // Add logout logic here
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-bold text-teal-600">Zyn</span>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-teal-600 transition-colors">Markets</a>
              <a href="#" className="text-gray-700 hover:text-teal-600 transition-colors">Portfolio</a>
              <a href="#" className="text-gray-700 hover:text-teal-600 transition-colors">Leaderboard</a>
              <a href="#" className="text-gray-700 hover:text-teal-600 transition-colors relative">
                For Creators
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600"></div>
              </a>
              <a href="#" className="text-gray-700 hover:text-teal-600 transition-colors">Campaign</a>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search markets"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Financial Display and User Section */}
          <div className="flex items-center space-x-4">
            {/* Financial Display */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
              <Banknote className="w-5 h-5 text-teal-600" />
              <span className="text-gray-700 font-medium">$100,000</span>
            </div>

            {/* Medal Display */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
              <Medal className="w-5 h-5 text-teal-600" />
              <span className="text-gray-700 font-medium">0</span>
            </div>

            {/* User Profile with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleProfileClick}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <span className="px-2 py-0.5 bg-orange-200 text-orange-700 text-xs rounded-full">Testnet</span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-4 z-50">
                  {/* Linked Wallet ID Section */}
                  <div className="px-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm font-semibold text-gray-900 mb-1">Linked Wallet ID</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 font-mono">
                          {currentUser?.publicKey ? 
                            `${currentUser.publicKey.slice(0, 6)}...${currentUser.publicKey.slice(-4)}` : 
                            'Not connected'
                          }
                        </span>
                        {currentUser?.publicKey && (
                          <button
                            onClick={handleCopyWalletId}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <Copy className="w-4 h-4 text-gray-500" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Testnet Mode Toggle */}
                  <div className="px-4 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-900">Testnet Mode</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-orange-600">on</span>
                        <div className="w-10 h-6 bg-orange-500 rounded-full relative">
                          <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  {/* <div className="px-4 mb-4">
                    <div className="space-y-2">
                      <a href="#" className="block text-sm text-gray-700 hover:text-teal-600 transition-colors">Yaptos</a>
                      <a href="#" className="block text-sm text-gray-700 hover:text-teal-600 transition-colors">About</a>
                      <a href="#" className="block text-sm text-gray-700 hover:text-teal-600 transition-colors">Terms of use</a>
                      <a href="#" className="block text-sm text-gray-700 hover:text-teal-600 transition-colors">Learn</a>
                      <a href="#" className="block text-sm text-gray-700 hover:text-teal-600 transition-colors">Contact</a>
                    </div>
                  </div> */}

                  {/* Log Out */}
                  <div className="px-4">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-700 transition-colors w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}