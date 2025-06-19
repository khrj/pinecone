import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import PineconeIcon from './PineconeIcon';
import RippleButton from './RippleButton';

interface HeroProps {
  darkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ darkMode }) => {
  const scrollToNext = () => {
    const statsSection = document.getElementById('stats');
    if (statsSection) {
      statsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      className={`relative h-screen overflow-hidden ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}
    >
      {/* More Floating Pinecone Icons - Bigger variety */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}
            style={{
              left: `${2 + (i * 5)}%`,
              top: `${10 + (i % 5) * 18}%`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 20, -20, 0],
              opacity: [0.15, 0.7, 0.15]
            }}
            transition={{
              duration: 6 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          >
            <PineconeIcon size={16 + (i % 6) * 12} />
          </motion.div>
        ))}
        
        {/* Additional larger background pinecones */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`large-${i}`}
            className={`absolute ${darkMode ? 'text-gray-700' : 'text-gray-300'}`}
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${5 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -25, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
          >
            <PineconeIcon size={40 + (i % 3) * 20} />
          </motion.div>
        ))}
      </div>

      {/* Content with proper mobile spacing */}
      <div className="relative z-10 flex items-center justify-center h-full px-6 pt-20 md:pt-0">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            className={`backdrop-blur-sm rounded-3xl p-8 md:p-12 border ${
              darkMode 
                ? 'bg-gray-900/20 border-gray-700/30' 
                : 'bg-white/20 border-gray-200/30'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Large centered PineconeIcon with mobile spacing */}
            <motion.div
              className="flex justify-center mb-6 md:mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className={`${darkMode ? 'text-amber-400' : 'text-amber-600'}`}
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <PineconeIcon size={100} className="md:w-[120px] md:h-[120px]" />
              </motion.div>
            </motion.div>

            <motion.h1 
              className={`text-4xl md:text-6xl lg:text-7xl font-light mb-4 md:mb-6 leading-tight ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Premium 
              <span className={`block font-medium bg-gradient-to-r ${
                darkMode 
                  ? 'from-amber-400 to-orange-400' 
                  : 'from-amber-600 to-orange-600'
              } bg-clip-text text-transparent`}>Pine Cones</span>
            </motion.h1>
            <motion.p 
              className={`text-lg md:text-xl mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto font-light ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Discover nature's perfect geometric design. Our hand-selected pine cones bring organic beauty and natural elegance to your space.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <RippleButton variant="primary">
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </RippleButton>
              <RippleButton variant="secondary">
                <span>Learn More</span>
              </RippleButton>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button 
        onClick={scrollToNext}
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-colors duration-300 ${
          darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
        }`}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.button>
    </section>
  );
};

export default Hero;