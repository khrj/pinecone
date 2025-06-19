import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaBox, 
  FaShieldAlt, 
  FaBolt, 
  FaGlobe,
  FaLeaf,
  FaTree,
  FaStar,
  FaBoxOpen
} from 'react-icons/fa';

interface ParallaxSectionProps {
  darkMode: boolean;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ darkMode }) => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [sectionProgress, setSectionProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // More dramatic parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const middleY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const features = [
    {
      id: 0,
      icon: <FaBox className="w-6 h-6" />,
      title: "Premium Selection",
      subtitle: "Hand-Curated Excellence",
      description: "Every pine cone is meticulously selected by our expert botanists from the world's most pristine forests. We examine each specimen for perfect symmetry, natural beauty, and structural integrity.",
      stats: { quality: 99.8, satisfaction: 98.5 },
      color: "from-amber-500 to-orange-500"
    },
    {
      id: 1,
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "Quality Assurance",
      subtitle: "Uncompromising Standards",
      description: "Our multi-stage quality control process ensures that only the finest pine cones reach our customers. Each batch undergoes rigorous testing for durability, appearance, and natural preservation.",
      stats: { testing: 100, approval: 97.2 },
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 2,
      icon: <FaBolt className="w-6 h-6" />,
      title: "Rapid Processing",
      subtitle: "Lightning-Fast Fulfillment",
      description: "Advanced automation and AI-powered sorting systems enable us to process orders with unprecedented speed while maintaining our exacting quality standards.",
      stats: { speed: 95.8, efficiency: 94.3 },
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      icon: <FaGlobe className="w-6 h-6" />,
      title: "Global Impact",
      subtitle: "Worldwide Excellence",
      description: "From local artisans to international corporations, our pine cones enhance projects across 50+ countries. We're proud to be the world's leading provider of premium natural materials.",
      stats: { reach: 50, customers: 15000 },
      color: "from-purple-500 to-violet-500"
    }
  ];

  // Track section visibility and scroll position
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const windowHeight = window.innerHeight;

      // Check if section is fully in view (top of section has reached top of viewport)
      const fullyInView = sectionTop <= 0 && sectionBottom > windowHeight;
      setIsInView(fullyInView);

      // Only calculate progress when section is fully in view
      if (fullyInView) {
        const sectionHeight = rect.height;
        const scrolledIntoSection = Math.abs(sectionTop);
        const progress = Math.max(0, Math.min(1, scrolledIntoSection / (sectionHeight - windowHeight)));
        setSectionProgress(progress);
        
        // Calculate which feature should be active based on scroll progress
        const featureIndex = Math.floor(progress * features.length);
        setActiveFeature(Math.min(featureIndex, features.length - 1));
      } else {
        // Reset to first feature when not in view
        setSectionProgress(0);
        setActiveFeature(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [features.length]);

  const [ref, inViewHook] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const scrollToFeature = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;
    const targetProgress = index / features.length;
    const targetScroll = sectionTop + (targetProgress * (sectionHeight - windowHeight));
    
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section 
      id="parallax"
      ref={sectionRef}
      className={`relative ${
        darkMode 
          ? 'bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800' 
          : 'bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100'
      }`}
      style={{ height: '300vh' }} // Reduced height for better mobile experience
    >
      {/* Vertical Navigation - Fixed in middle of screen when section is fully in view */}
      <motion.div 
        className="hidden lg:block fixed left-8 top-1/3 transform -translate-y-1/2 z-50"
        initial={{ opacity: 0, x: -50 }}
        animate={{ 
          opacity: isInView ? 1 : 0, 
          x: isInView ? 0 : -50 
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className={`backdrop-blur-xl rounded-2xl p-4 border ${
          darkMode 
            ? 'bg-gray-900/80 border-gray-700/50' 
            : 'bg-white/80 border-gray-200/50'
        } shadow-xl`}>
          <div className="flex flex-col space-y-4">
            {features.map((feature, index) => (
              <motion.button
                key={feature.id}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  activeFeature === index
                    ? `bg-gradient-to-r ${feature.color} text-black dark:text-white shadow-lg`
                    : `${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToFeature(index)}
              >
                {feature.icon}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Middle Layer - Medium movement */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y: middleY }}
      >
        <div className={`absolute top-40 right-20 w-8 h-8 ${
          darkMode ? 'text-gray-500' : 'text-gray-500'
        }`}>
          <FaBolt className="w-full h-full" />
        </div>
        <div className={`absolute bottom-40 left-1/4 w-10 h-10 ${
          darkMode ? 'text-gray-500' : 'text-gray-500'
        }`}>
          <FaGlobe className="w-full h-full" />
        </div>
      </motion.div>

      {/* Foreground Layer - Slowest movement */}
      <motion.div 
        className={`absolute bottom-0 left-0 right-0 h-64 ${
          darkMode 
            ? 'bg-gradient-to-t from-gray-900/30 to-transparent' 
            : 'bg-gradient-to-t from-gray-100/30 to-transparent'
        }`}
        style={{ y: foregroundY }}
      />

      {/* Content Layer - Sticky and more centered */}
      <div className="sticky top-0 h-screen flex items-center justify-center py-8 px-4">
        <motion.div 
          className={`backdrop-blur-xl rounded-3xl p-6 md:p-8 lg:p-16 border max-w-6xl w-full ${
            darkMode 
              ? 'bg-gray-900/40 border-gray-700/50' 
              : 'bg-white/40 border-gray-200/50'
          } lg:shadow-2xl`}
          style={{ y: textY }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Feature Content */}
            <div className="order-2 lg:order-1">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className={`inline-flex items-center space-x-3 mb-4 px-4 py-2 rounded-full ${
                  darkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'
                }`}>
                  <div className={`bg-gradient-to-r ${features[activeFeature].color} bg-clip-text dark:text-gray-300 text-gray-600`}>
                    {features[activeFeature].icon}
                  </div>
                  <span className={`text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {features[activeFeature].subtitle}
                  </span>
                </div>

                <h2 className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light mb-4 lg:mb-6 leading-tight ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {features[activeFeature].title}
                </h2>

                <p className={`text-sm md:text-base lg:text-lg leading-relaxed font-light mb-6 lg:mb-8 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {features[activeFeature].description}
                </p>

                {/* Feature Stats */}
                <div className="space-y-3 lg:space-y-4">
                  {Object.entries(features[activeFeature].stats).map(([key, value], index) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className={`text-xs md:text-sm font-medium capitalize ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <div className="flex items-center space-x-2 lg:space-x-3">
                        <div className={`w-20 md:w-24 lg:w-32 h-2 rounded-full ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-200'
                        }`}>
                          <motion.div 
                            className={`h-full bg-gradient-to-r ${features[activeFeature].color} rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${typeof value === 'number' && value > 100 ? 100 : value}%` }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                          />
                        </div>
                        <span className={`text-xs md:text-sm font-semibold min-w-[2.5rem] lg:min-w-[3rem] ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {typeof value === 'number' && value > 100 ? `${value.toLocaleString()}+` : `${value}%`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Visual Element */}
            <div className="relative order-1 lg:order-2">
              <motion.div 
                className={`backdrop-blur-sm rounded-3xl p-6 md:p-8 lg:p-12 border ${
                  darkMode 
                    ? 'bg-gray-800/30 border-gray-700/30' 
                    : 'bg-white/30 border-gray-200/30'
                } shadow-xl`}
                key={activeFeature}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center">
                  <div className={`w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 mx-auto mb-4 lg:mb-6 rounded-3xl bg-gradient-to-r ${features[activeFeature].color} flex items-center justify-center text-white shadow-2xl`}>
                    <div className="scale-110 md:scale-125 lg:scale-150">
                      {features[activeFeature].icon}
                    </div>
                  </div>
                  
                  <h3 className={`text-lg md:text-xl lg:text-2xl font-semibold mb-3 lg:mb-4 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {features[activeFeature].title}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3 lg:gap-4">
                    {Object.entries(features[activeFeature].stats).map(([key, value]) => (
                      <div key={key} className={`p-3 lg:p-4 rounded-2xl ${
                        darkMode ? 'bg-gray-700/30' : 'bg-gray-100/30'
                      }`}>
                        <div className={`text-lg md:text-xl lg:text-2xl font-light mb-1 bg-gradient-to-r ${features[activeFeature].color} bg-clip-text text-transparent`}>
                          {typeof value === 'number' && value > 100 ? `${value.toLocaleString()}+` : `${value}%`}
                        </div>
                        <div className={`text-xs font-medium capitalize ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ParallaxSection;