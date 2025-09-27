import React, { useState } from 'react';
import { Moon, Sun, Wallet, ChevronDown, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isConnected, setIsConnected] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const connectWallet = () => {
    setIsConnected(!isConnected);
  };

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                UniClone
              </h1>
            </div>
            <nav className="hidden md:ml-8 md:flex space-x-8">
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 px-3 py-2 text-sm font-medium transition-colors">
                Swap
              </a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 px-3 py-2 text-sm font-medium transition-colors">
                Pool
              </a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 px-3 py-2 text-sm font-medium transition-colors">
                Vote
              </a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 px-3 py-2 text-sm font-medium transition-colors">
                Charts
              </a>
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={connectWallet}
              className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
            >
              <Wallet size={18} />
              <span>
                {isConnected ? '0x1234...5678' : 'Connect Wallet'}
              </span>
              {isConnected && <ChevronDown size={16} />}
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-pink-500">Swap</a>
            <a href="#" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-pink-500">Pool</a>
            <a href="#" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-pink-500">Vote</a>
            <a href="#" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-pink-500">Charts</a>
            <div className="flex items-center justify-between px-3 py-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={connectWallet}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-xl font-medium"
              >
                {isConnected ? '0x1234...5678' : 'Connect'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};