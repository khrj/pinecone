import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaBox, 
  FaBolt, 
  FaShieldAlt, 
  FaLeaf, 
  FaStar, 
  FaGlobe 
} from 'react-icons/fa';
import RippleButton from './RippleButton';

interface FeaturesProps {
  darkMode: boolean;
}

const Features: React.FC<FeaturesProps> = ({ darkMode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: <FaBox className="w-6 h-6" />,
      title: "Premium Quality",
      description: "Hand-selected pine cones from the world's finest forests, ensuring consistent quality and natural beauty.",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50 dark:bg-amber-900/20"
    },
    {
      icon: <FaBolt className="w-6 h-6" />,
      title: "Fast Delivery",
      description: "Lightning-fast shipping with real-time tracking. Get your pine cones delivered within 24-48 hours.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee with our premium quality assurance program and easy returns.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      icon: <FaLeaf className="w-6 h-6" />,
      title: "Sustainable Sourcing",
      description: "Ethically sourced from sustainable forests with zero environmental impact and carbon-neutral shipping.",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      icon: <FaStar className="w-6 h-6" />,
      title: "Expert Curation",
      description: "Each pine cone is carefully inspected by our team of botanical experts for perfect shape and condition.",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      icon: <FaGlobe className="w-6 h-6" />,
      title: "Global Reach",
      description: "Serving customers worldwide with localized support and region-specific pine cone varieties.",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50 dark:bg-pink-900/20"
    }
  ];

  return (
    <section 
      id="features"
      ref={ref}
      className={`py-24 ${
        darkMode 
          ? 'bg-gradient-to-b from-gray-800 to-gray-900' 
          : 'bg-gradient-to-b from-white to-gray-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-4xl md:text-5xl font-light mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Unparalleled 
            <span className={`block font-medium bg-gradient-to-r ${
              darkMode 
                ? 'from-amber-400 to-orange-400' 
                : 'from-amber-600 to-orange-600'
            } bg-clip-text text-transparent`}>Pine Cone Capabilities</span>
          </h2>
          <p className={`text-lg max-w-3xl mx-auto font-light ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Experience the perfect blend of natural beauty, premium quality, and exceptional service 
            that sets Pinecone Inc. apart from the competition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className={`backdrop-blur-xl rounded-2xl p-8 border transition-all duration-300 hover:scale-105 h-full ${
                darkMode 
                  ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70' 
                  : 'bg-white/50 border-gray-200/50 hover:bg-white/70'
              } shadow-xl`}>
                <div className={`w-16 h-16 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 dark:text-gray-300 text-gray-600`}>
                  <div className={`bg-gradient-to-r ${feature.color} bg-clip-text`}>
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className={`text-xl font-semibold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                
                <p className={`text-sm leading-relaxed ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Showcase */}
        <motion.div 
          className={`backdrop-blur-xl rounded-3xl p-12 border ${
            darkMode 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white/50 border-gray-200/50'
          } shadow-xl`}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className={`text-3xl font-light mb-6 p-1 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Advanced Pine Cone 
                <span className={`block font-medium bg-gradient-to-r ${
                  darkMode 
                    ? 'from-green-400 to-emerald-400' 
                    : 'from-green-600 to-emerald-600'
                } bg-clip-text text-transparent pb-1`}>Processing System</span>
              </h3>
              <p className={`text-lg mb-8 leading-relaxed font-light ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Our state-of-the-art processing facility uses AI-powered quality control 
                and precision sorting to ensure every pine cone meets our exacting standards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <RippleButton variant="primary">
                  <span>Learn More</span>
                </RippleButton>
                <RippleButton variant="secondary">
                  <span>View Process</span>
                </RippleButton>
              </div>
            </div>
            
            <div className="relative">
              <div className={`backdrop-blur-sm rounded-2xl p-8 border ${
                darkMode 
                  ? 'bg-gray-700/30 border-gray-600/30' 
                  : 'bg-gray-100/30 border-gray-300/30'
              }`}>
                <div className="space-y-4">
                  {[
                    { label: "Quality Control", value: 99.8, color: "from-green-500 to-emerald-500" },
                    { label: "Processing Speed", value: 95.2, color: "from-blue-500 to-cyan-500" },
                    { label: "Customer Satisfaction", value: 98.5, color: "from-purple-500 to-violet-500" },
                    { label: "Sustainability Score", value: 97.1, color: "from-amber-500 to-orange-500" }
                  ].map((metric, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className={`text-sm font-medium ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {metric.label}
                        </span>
                        <span className={`text-sm font-semibold ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {metric.value}%
                        </span>
                      </div>
                      <div className={`h-2 rounded-full ${
                        darkMode ? 'bg-gray-600' : 'bg-gray-200'
                      } overflow-hidden`}>
                        <motion.div 
                          className={`h-full bg-gradient-to-r ${metric.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${metric.value}%` } : {}}
                          transition={{ duration: 1, delay: 1 + idx * 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;