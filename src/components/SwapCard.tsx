import React, { useState, useEffect } from 'react';
import { ArrowUpDown, Settings, Info } from 'lucide-react';
import { TokenSelector } from './TokenSelector';

interface Token {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  icon: string;
}

export const SwapCard: React.FC = () => {
  const [tokenFrom, setTokenFrom] = useState<Token | null>({
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2451.23,
    change24h: 2.34,
    icon: '🔷'
  });
  const [tokenTo, setTokenTo] = useState<Token | null>({
    symbol: 'USDC',
    name: 'USD Coin',
    price: 1.00,
    change24h: 0.01,
    icon: '💵'
  });
  const [amountFrom, setAmountFrom] = useState('');
  const [amountTo, setAmountTo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [slippage, setSlippage] = useState('0.5');

  useEffect(() => {
    if (amountFrom && tokenFrom && tokenTo) {
      const exchangeRate = tokenFrom.price / tokenTo.price;
      const calculatedAmount = (parseFloat(amountFrom) * exchangeRate).toFixed(6);
      setAmountTo(calculatedAmount);
    } else {
      setAmountTo('');
    }
  }, [amountFrom, tokenFrom, tokenTo]);

  const handleSwapTokens = () => {
    setTokenFrom(tokenTo);
    setTokenTo(tokenFrom);
    setAmountFrom(amountTo);
    setAmountTo(amountFrom);
  };

  const handleSwap = async () => {
    if (!tokenFrom || !tokenTo || !amountFrom) return;
    
    setIsLoading(true);
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    // Reset form
    setAmountFrom('');
    setAmountTo('');
  };

  const canSwap = tokenFrom && tokenTo && amountFrom && parseFloat(amountFrom) > 0;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Swap</h2>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Settings size={18} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {showSettings && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Slippage tolerance
                </span>
                <div className="flex items-center space-x-1">
                  <Info size={14} className="text-gray-400" />
                </div>
              </div>
              <div className="flex space-x-2">
                {['0.1', '0.5', '1.0'].map((value) => (
                  <button
                    key={value}
                    onClick={() => setSlippage(value)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      slippage === value
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {value}%
                  </button>
                ))}
                <input
                  type="text"
                  value={slippage}
                  onChange={(e) => setSlippage(e.target.value)}
                  className="w-16 px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 border-none rounded-lg text-center focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
            </div>
          )}

          <div className="space-y-4">
            {/* From Token */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  From
                </label>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Balance: 0.0
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <TokenSelector
                  selectedToken={tokenFrom}
                  onTokenSelect={setTokenFrom}
                  label="From"
                />
                <input
                  type="text"
                  value={amountFrom}
                  onChange={(e) => setAmountFrom(e.target.value)}
                  placeholder="0.0"
                  className="flex-1 bg-transparent text-2xl font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-right"
                />
              </div>
              {tokenFrom && amountFrom && (
                <div className="mt-2 text-right text-sm text-gray-500 dark:text-gray-400">
                  ~${(parseFloat(amountFrom) * tokenFrom.price).toFixed(2)}
                </div>
              )}
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSwapTokens}
                className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 transform hover:scale-110"
              >
                <ArrowUpDown size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* To Token */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  To
                </label>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Balance: 0.0
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <TokenSelector
                  selectedToken={tokenTo}
                  onTokenSelect={setTokenTo}
                  label="To"
                />
                <input
                  type="text"
                  value={amountTo}
                  readOnly
                  placeholder="0.0"
                  className="flex-1 bg-transparent text-2xl font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-right"
                />
              </div>
              {tokenTo && amountTo && (
                <div className="mt-2 text-right text-sm text-gray-500 dark:text-gray-400">
                  ~${(parseFloat(amountTo) * tokenTo.price).toFixed(2)}
                </div>
              )}
            </div>
          </div>

          {/* Price Info */}
          {tokenFrom && tokenTo && amountFrom && (
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Rate</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  1 {tokenFrom.symbol} = {(tokenFrom.price / tokenTo.price).toFixed(6)} {tokenTo.symbol}
                </span>
              </div>
            </div>
          )}

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            disabled={!canSwap || isLoading}
            className={`w-full mt-6 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
              canSwap && !isLoading
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white transform hover:scale-[1.02]'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Swapping...</span>
              </div>
            ) : !tokenFrom || !tokenTo ? (
              'Select Tokens'
            ) : !amountFrom || parseFloat(amountFrom) <= 0 ? (
              'Enter Amount'
            ) : (
              'Swap'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};