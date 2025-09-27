import React from 'react';
import { TrendingUp, DollarSign, Activity } from 'lucide-react';

export const StatsCard: React.FC = () => {
  const stats = [
    {
      title: 'Total Value Locked',
      value: '$4.2B',
      change: '+2.4%',
      icon: DollarSign,
      positive: true
    },
    {
      title: '24h Volume',
      value: '$1.8B',
      change: '+12.7%',
      icon: Activity,
      positive: true
    },
    {
      title: 'Total Pools',
      value: '12,847',
      change: '+156',
      icon: TrendingUp,
      positive: true
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className={`text-sm ${
                  stat.positive ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl">
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};