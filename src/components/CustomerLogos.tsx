import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FaLeaf, 
  FaTree, 
  FaSeedling, 
  FaHome, 
  FaPaw,
  FaAppleAlt,
  FaFeatherAlt,
  FaGlobeAmericas,
  FaMountain,
  FaCarrot
} from 'react-icons/fa';

interface CustomerLogosProps {
  darkMode: boolean;
}

const CustomerLogos: React.FC<CustomerLogosProps> = ({ darkMode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const customers = [
    { name: "EcoDesign", icon: <FaLeaf className="text-2xl" /> },
    { name: "Forest Craft Co.", icon: <FaTree className="text-2xl" /> },
    { name: "Natural Spaces", icon: <FaSeedling className="text-2xl" /> },
    { name: "Rustic Home", icon: <FaHome className="text-2xl" /> },
    { name: "Garden & Co.", icon: <FaLeaf className="text-2xl" /> },
    { name: "Woodland Decor", icon: <FaPaw className="text-2xl" /> },
    { name: "Pine & Oak", icon: <FaAppleAlt className="text-2xl" /> },
    { name: "Nature's Touch", icon: <FaFeatherAlt className="text-2xl" /> },
    { name: "Green Living", icon: <FaSeedling className="text-2xl" /> },
    { name: "Organic Spaces", icon: <FaLeaf className="text-2xl" /> },
    { name: "Earth Elements", icon: <FaMountain className="text-2xl" /> },
    { name: "Wild & Co.", icon: <FaFeatherAlt className="text-2xl" /> },
    { name: "Botanical Studio", icon: <FaLeaf className="text-2xl" /> },
    { name: "Forest & Field", icon: <FaSeedling className="text-2xl" /> },
    { name: "Natural Elements", icon: <FaLeaf className="text-2xl" /> },
    { name: "Eco Harmony", icon: <FaGlobeAmericas className="text-2xl" /> }
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = 0.5;
    const scrollInterval = 30;

    const scroll = () => {
      scrollAmount += scrollStep;
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
    };

    const interval = setInterval(scroll, scrollInterval);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="customers"
      className={`py-24 overflow-hidden ${
        darkMode 
          ? 'bg-gradient-to-b from-gray-800 to-gray-900' 
          : 'bg-gradient-to-b from-white to-gray-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-light mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Trusted by 
            <span className={`block font-medium bg-gradient-to-r ${
              darkMode 
                ? 'from-blue-400 to-cyan-400' 
                : 'from-blue-600 to-cyan-600'
            } bg-clip-text text-transparent pb-2`}>Industry Leaders</span>
          </h2>
          <p className={`text-lg max-w-3xl mx-auto font-light ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            From boutique design studios to major retail chains, businesses worldwide choose Pinecone Inc. for premium quality and reliable service.
          </p>
        </div>

        {/* Scrolling logos - properly centered with padding to ensure visibility */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex space-x-8 overflow-hidden px-8"
            style={{ 
              width: 'calc(100vw - 3rem)', 
              marginLeft: 'calc(-50vw + 50% + 1.5rem)'
            }}
          >
            {[...customers, ...customers, ...customers, ...customers].map((customer, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 w-40 h-24 flex flex-col items-center justify-center ${
                  darkMode 
                    ? 'bg-gray-800/30 border-gray-700/30 hover:bg-gray-800/50 hover:border-blue-500/30' 
                    : 'bg-white/30 border-gray-200/30 hover:bg-white/50 hover:border-blue-500/30'
                }`}>
                  <motion.div 
                    className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {customer.icon}
                  </motion.div>
                  <div className={`text-xs font-medium text-center ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {customer.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { stat: "500+", label: "Business Partners" },
            { stat: "50+", label: "Countries Served" },
            { stat: "10M+", label: "Pine Cones Delivered" },
            { stat: "24/7", label: "Customer Support" }
          ].map((item, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`text-3xl font-light mb-2 bg-gradient-to-r ${
                darkMode 
                  ? 'from-green-400 to-emerald-400' 
                  : 'from-green-600 to-emerald-600'
              } bg-clip-text text-transparent`}>
                {item.stat}
              </div>
              <div className={`text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerLogos;