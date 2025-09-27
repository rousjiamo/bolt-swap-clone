import React, { useState } from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import { TokenSelector } from './TokenSelector';

interface Token {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  icon: string;
}

interface Pool {
  token0: Token;
  token1: Token;
  tvl: number;
  volume24h: number;
  fees24h: number;
  apr: number;
}

const POPULAR_POOLS: Pool[] = [
  {
    token0: { symbol: 'ETH', name: 'Ethereum', price: 2451.23, change24h: 2.34, icon: '🔷' },
    token1: { symbol: 'USDC', name: 'USD Coin', price: 1.00, change24h: 0.01, icon: '💵' },
    tvl: 123456789,
    volume24h: 45678901,
    fees24h: 12345,
    apr: 8.45
  },
  {
    token0: { symbol: 'WBTC', name: 'Wrapped Bitcoin', price: 67845.12, change24h: 1.87, icon: '₿' },
    token1: { symbol: 'ETH', name: 'Ethereum', price: 2451.23, change24h: 2.34, icon: '🔷' },
    tvl: 87654321,
    volume24h: 23456789,
    fees24h: 8765,
    apr: 12.67
  },
  {
    token0: { symbol: 'UNI', name: 'Uniswap', price: 8.45, change24h: 5.23, icon: '🦄' },
    token1: { symbol: 'ETH', name: 'Ethereum', price: 2451.23, change24h: 2.34, icon: '🔷' },
    tvl: 34567890,
    volume24h: 12345678,
    fees24h: 4567,
    apr: 15.32
  }
];

export const PoolCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'add' | 'pools'>('pools');
  const [token0, setToken0] = useState<Token | null>(null);
  const [token1, setToken1] = useState<Token | null>(null);
  const [amount0, setAmount0] = useState('');
  const [amount1, setAmount1] = useState('');

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-1 mb-6">
            <button
              onClick={() => setActiveTab('pools')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'pools'
                  ? 'bg-pink-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-pink-500'
              }`}
            >
              Pools
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'add'
                  ? 'bg-pink-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-pink-500'
              }`}
            >
              Add Liquidity
            </button>
          </div>

          {activeTab === 'pools' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Popular Pools
                </h3>
                <button
                  onClick={() => setActiveTab('add')}
                  className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200"
                >
                  <Plus size={16} />
                  <span>Add Liquidity</span>
                </button>
              </div>

              <div className="space-y-3">
                {POPULAR_POOLS.map((pool, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center -space-x-2">
                          <span className="text-2xl z-10">{pool.token0.icon}</span>
                          <span className="text-2xl">{pool.token1.icon}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {pool.token0.symbol}/{pool.token1.symbol}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {pool.token0.name} / {pool.token1.name}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-8 text-right">
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">TVL</div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            ${(pool.tvl / 1000000).toFixed(1)}M
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Volume 24h</div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            ${(pool.volume24h / 1000000).toFixed(1)}M
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Fees 24h</div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            ${pool.fees24h.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">APR</div>
                          <div className="font-medium text-green-500">
                            {pool.apr.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Liquidity
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Token A
                    </label>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Balance: 0.0
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TokenSelector
                      selectedToken={token0}
                      onTokenSelect={setToken0}
                      label="Token A"
                    />
                    <input
                      type="text"
                      value={amount0}
                      onChange={(e) => setAmount0(e.target.value)}
                      placeholder="0.0"
                      className="flex-1 bg-transparent text-2xl font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-right"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <Plus size={20} className="text-gray-600 dark:text-gray-400" />
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Token B
                    </label>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Balance: 0.0
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TokenSelector
                      selectedToken={token1}
                      onTokenSelect={setToken1}
                      label="Token B"
                    />
                    <input
                      type="text"
                      value={amount1}
                      onChange={(e) => setAmount1(e.target.value)}
                      placeholder="0.0"
                      className="flex-1 bg-transparent text-2xl font-semibold text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-right"
                    />
                  </div>
                </div>
              </div>

              {token0 && token1 && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 dark:text-gray-400">Pool Share</span>
                    <span className="text-gray-900 dark:text-white font-medium">0.00%</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 dark:text-gray-400">Fees (0.3%)</span>
                    <span className="text-gray-900 dark:text-white font-medium">Earned by LPs</span>
                  </div>
                </div>
              )}

              <button
                disabled={!token0 || !token1 || !amount0 || !amount1}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  token0 && token1 && amount0 && amount1
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white transform hover:scale-[1.02]'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                }`}
              >
                {!token0 || !token1 ? 'Select Tokens' : !amount0 || !amount1 ? 'Enter Amounts' : 'Add Liquidity'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};