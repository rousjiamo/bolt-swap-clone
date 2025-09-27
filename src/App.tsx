import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { SwapCard } from './components/SwapCard';
import { PoolCard } from './components/PoolCard';
import { StatsCard } from './components/StatsCard';

function App() {
  const [activeView, setActiveView] = useState<'swap' | 'pool'>('swap');

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Trade crypto with confidence
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Buy, sell, and explore tokens on Ethereum and more
            </p>
          </div>

          <StatsCard />

          <div className="flex justify-center mb-8">
            <div className="flex bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-1">
              <button
                onClick={() => setActiveView('swap')}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeView === 'swap'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-pink-500'
                }`}
              >
                Swap
              </button>
              <button
                onClick={() => setActiveView('pool')}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeView === 'pool'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-pink-500'
                }`}
              >
                Pool
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            {activeView === 'swap' ? <SwapCard /> : <PoolCard />}
          </div>

          <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
            <p className="mb-4">Built with React, TypeScript, and Tailwind CSS</p>
            <div className="flex justify-center space-x-6 text-sm">
              <a href="#" className="hover:text-pink-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Help Center</a>
            </div>
          </footer>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;