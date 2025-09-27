import React, { useState } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';

interface Token {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  icon: string;
}

interface TokenSelectorProps {
  selectedToken: Token | null;
  onTokenSelect: (token: Token) => void;
  label: string;
}

const POPULAR_TOKENS: Token[] = [
  { symbol: 'ETH', name: 'Ethereum', price: 2451.23, change24h: 2.34, icon: '🔷' },
  { symbol: 'USDC', name: 'USD Coin', price: 1.00, change24h: 0.01, icon: '💵' },
  { symbol: 'USDT', name: 'Tether USD', price: 1.00, change24h: -0.01, icon: '💰' },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', price: 67845.12, change24h: 1.87, icon: '₿' },
  { symbol: 'UNI', name: 'Uniswap', price: 8.45, change24h: 5.23, icon: '🦄' },
  { symbol: 'LINK', name: 'Chainlink', price: 14.87, change24h: -1.45, icon: '🔗' },
  { symbol: 'AAVE', name: 'Aave', price: 89.23, change24h: 3.12, icon: '👻' },
  { symbol: 'MKR', name: 'Maker', price: 1234.56, change24h: -2.34, icon: '🏛️' },
];

export const TokenSelector: React.FC<TokenSelectorProps> = ({
  selectedToken,
  onTokenSelect,
  label
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTokens = POPULAR_TOKENS.filter(token =>
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTokenSelect = (token: Token) => {
    onTokenSelect(token);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl px-3 py-2 transition-all duration-200 min-w-0"
      >
        {selectedToken ? (
          <>
            <span className="text-2xl">{selectedToken.icon}</span>
            <div className="flex flex-col items-start min-w-0">
              <span className="font-semibold text-gray-900 dark:text-white truncate">
                {selectedToken.symbol}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {selectedToken.name}
              </span>
            </div>
          </>
        ) : (
          <span className="text-gray-500 dark:text-gray-400">Select Token</span>
        )}
        <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Select a Token
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search name or paste address"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500"
                />
              </div>
            </div>

            <div className="p-2 max-h-96 overflow-y-auto">
              <div className="space-y-1">
                {filteredTokens.map((token) => (
                  <button
                    key={token.symbol}
                    onClick={() => handleTokenSelect(token)}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{token.icon}</span>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {token.symbol}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {token.name}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900 dark:text-white">
                        ${token.price.toLocaleString()}
                      </div>
                      <div className={`text-sm ${
                        token.change24h >= 0 
                          ? 'text-green-500' 
                          : 'text-red-500'
                      }`}>
                        {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};