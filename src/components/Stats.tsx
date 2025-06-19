import React, { useEffect, useState } from 'react';
import { TrendingUp, Users, Package, Star, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface StatItem {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  change: number;
  period: string;
}

interface StatsProps {
  darkMode: boolean;
}

const Stats: React.FC<StatsProps> = ({ darkMode }) => {
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0
  });

  const stats: StatItem[] = [
    {
      icon: <Package className="w-5 h-5" />,
      value: 25000,
      label: "Pine Cones Delivered",
      suffix: "+",
      change: 12.5,
      period: "vs last quarter"
    },
    {
      icon: <Users className="w-5 h-5" />,
      value: 15000,
      label: "Active Customers",
      suffix: "+",
      change: 8.2,
      period: "vs last quarter"
    },
    {
      icon: <Star className="w-5 h-5" />,
      value: 98,
      label: "Satisfaction Rate",
      suffix: "%",
      change: 2.1,
      period: "vs last quarter"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      value: 150,
      label: "Revenue Growth",
      suffix: "%",
      change: -3.2,
      period: "vs last quarter"
    }
  ];

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    stats.forEach((stat, index) => {
      let currentStep = 0;
      const increment = stat.value / steps;

      const timer = setInterval(() => {
        currentStep++;
        const currentValue = Math.min(increment * currentStep, stat.value);
        
        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(currentValue);
          return newCounters;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepTime);
    });
  }, [inView]);

  return (
    <section 
      id="stats"
      ref={ref} 
      className={`py-24 ${
        darkMode 
          ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
          : 'bg-gradient-to-b from-gray-50 to-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-light mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Performance 
            <span className={`block font-medium ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Analytics</span>
          </h2>
          <p className={`text-lg max-w-3xl mx-auto font-light ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Real-time insights into our business performance and customer satisfaction metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="group">
              <div className={`backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70' 
                  : 'bg-white/50 border-gray-200/50 hover:bg-white/70'
              } shadow-xl`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className={`flex items-center space-x-1 text-xs font-medium ${
                    stat.change >= 0 
                      ? 'text-green-500' 
                      : 'text-red-500'
                  }`}>
                    {stat.change >= 0 ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    <span>{Math.abs(stat.change)}%</span>
                  </div>
                </div>
                
                <div className={`text-3xl font-light mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {counters[index].toLocaleString()}{stat.suffix}
                </div>
                
                <div className={`text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {stat.label}
                </div>
                
                <div className={`text-xs ${
                  darkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {stat.period}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Professional Charts Section */}
        <div className={`backdrop-blur-xl rounded-3xl p-8 lg:p-12 border ${
          darkMode 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white/50 border-gray-200/50'
        } shadow-xl`}>
          <div className="mb-12">
            <h3 className={`text-3xl font-light mb-3 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Business Intelligence Dashboard
            </h3>
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Key performance indicators and growth metrics
            </p>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            {/* Revenue Chart */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`text-lg font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Quarterly Revenue
                  </h4>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Last 5 quarters
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-green-500">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-medium">+23.5%</span>
                </div>
              </div>
              
              <div className="relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between opacity-20">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`h-px ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`} />
                  ))}
                </div>
                
                <div className="relative flex justify-between items-end h-80 px-4">
                  {[
                    { period: 'Q1 \'23', value: 65, amount: '$2.1M', growth: '+12%' },
                    { period: 'Q2 \'23', value: 75, amount: '$2.8M', growth: '+18%' },
                    { period: 'Q3 \'23', value: 85, amount: '$3.4M', growth: '+21%' },
                    { period: 'Q4 \'23', value: 95, amount: '$4.2M', growth: '+24%' },
                    { period: 'Q1 \'24', value: 100, amount: '$4.8M', growth: '+23%' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center space-y-3 flex-1 group">
                      {/* Value label */}
                      <div className={`text-xs font-semibold px-2 py-1 rounded-md transition-all duration-300 ${
                        darkMode 
                          ? 'text-white bg-gray-700/50 group-hover:bg-gray-700' 
                          : 'text-gray-900 bg-gray-100/50 group-hover:bg-gray-100'
                      }`}>
                        {item.amount}
                      </div>
                      
                      {/* Growth indicator */}
                      <div className="text-xs text-green-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.growth}
                      </div>
                      
                      {/* Bar */}
                      <div className="relative w-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner" style={{ height: '240px' }}>
                        <div 
                          className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 via-blue-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out shadow-lg"
                          style={{ 
                            height: inView ? `${item.value}%` : '0%',
                            transitionDelay: `${idx * 150}ms`
                          }}
                        />
                        {/* Highlight effect */}
                        <div 
                          className="absolute bottom-0 w-full bg-gradient-to-t from-transparent via-white/20 to-white/40 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            height: inView ? `${item.value}%` : '0%',
                            transitionDelay: `${idx * 150}ms`
                          }}
                        />
                      </div>
                      
                      {/* Period label */}
                      <span className={`text-xs font-medium ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {item.period}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Customer Satisfaction */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`text-lg font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Customer Satisfaction
                  </h4>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Key satisfaction metrics
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-green-500">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-medium">+5.2%</span>
                </div>
              </div>
              
              <div className="relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between opacity-20">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`h-px ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`} />
                  ))}
                </div>
                
                <div className="relative flex justify-between items-end h-80 px-4">
                  {[
                    { metric: 'Quality', value: 98, color: 'from-emerald-600 via-emerald-500 to-green-400', score: '4.9/5' },
                    { metric: 'Service', value: 96, color: 'from-blue-600 via-blue-500 to-cyan-400', score: '4.8/5' },
                    { metric: 'Speed', value: 94, color: 'from-purple-600 via-purple-500 to-violet-400', score: '4.7/5' },
                    { metric: 'Value', value: 92, color: 'from-orange-600 via-orange-500 to-amber-400', score: '4.6/5' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center space-y-3 flex-1 group">
                      {/* Score label */}
                      <div className={`text-xs font-semibold px-2 py-1 rounded-md transition-all duration-300 ${
                        darkMode 
                          ? 'text-white bg-gray-700/50 group-hover:bg-gray-700' 
                          : 'text-gray-900 bg-gray-100/50 group-hover:bg-gray-100'
                      }`}>
                        {item.score}
                      </div>
                      
                      {/* Percentage */}
                      <div className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.value}%
                      </div>
                      
                      {/* Bar */}
                      <div className="relative w-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner" style={{ height: '240px' }}>
                        <div 
                          className={`absolute bottom-0 w-full bg-gradient-to-t ${item.color} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                          style={{ 
                            height: inView ? `${item.value}%` : '0%',
                            transitionDelay: `${idx * 120}ms`
                          }}
                        />
                        {/* Highlight effect */}
                        <div 
                          className="absolute bottom-0 w-full bg-gradient-to-t from-transparent via-white/20 to-white/40 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            height: inView ? `${item.value}%` : '0%',
                            transitionDelay: `${idx * 120}ms`
                          }}
                        />
                      </div>
                      
                      {/* Metric label */}
                      <span className={`text-xs font-medium ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {item.metric}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Market Distribution */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`text-lg font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Global Market Share
                  </h4>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Regional distribution
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-blue-500">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-medium">+8.1%</span>
                </div>
              </div>
              
              <div className="relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between opacity-20">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`h-px ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`} />
                  ))}
                </div>
                
                <div className="relative flex justify-between items-end h-80 px-4">
                  {[
                    { region: 'N. America', value: 45, color: 'from-blue-600 via-blue-500 to-cyan-400', customers: '6.8K' },
                    { region: 'Europe', value: 30, color: 'from-emerald-600 via-emerald-500 to-green-400', customers: '4.5K' },
                    { region: 'Asia Pacific', value: 20, color: 'from-purple-600 via-purple-500 to-violet-400', customers: '3.0K' },
                    { region: 'Others', value: 5, color: 'from-gray-600 via-gray-500 to-slate-400', customers: '0.7K' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center space-y-3 flex-1 group">
                      {/* Customer count */}
                      <div className={`text-xs font-semibold px-2 py-1 rounded-md transition-all duration-300 ${
                        darkMode 
                          ? 'text-white bg-gray-700/50 group-hover:bg-gray-700' 
                          : 'text-gray-900 bg-gray-100/50 group-hover:bg-gray-100'
                      }`}>
                        {item.customers}
                      </div>
                      
                      {/* Percentage */}
                      <div className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.value}%
                      </div>
                      
                      {/* Bar */}
                      <div className="relative w-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner" style={{ height: '240px' }}>
                        <div 
                          className={`absolute bottom-0 w-full bg-gradient-to-t ${item.color} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                          style={{ 
                            height: inView ? `${item.value}%` : '0%',
                            transitionDelay: `${idx * 100}ms`
                          }}
                        />
                        {/* Highlight effect */}
                        <div 
                          className="absolute bottom-0 w-full bg-gradient-to-t from-transparent via-white/20 to-white/40 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            height: inView ? `${item.value}%` : '0%',
                            transitionDelay: `${idx * 100}ms`
                          }}
                        />
                      </div>
                      
                      {/* Region label */}
                      <span className={`text-xs font-medium text-center leading-tight ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {item.region}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;