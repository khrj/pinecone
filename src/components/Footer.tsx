import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaTwitter, 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLeaf
} from 'react-icons/fa';
import PineconeIcon from './PineconeIcon';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Our Story', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Blog', href: '#' }
    ],
    products: [
      { name: 'Premium Pine Cones', href: '#' },
      { name: 'Bulk Orders', href: '#' },
      { name: 'Custom Collections', href: '#' },
      { name: 'Seasonal Varieties', href: '#' },
      { name: 'Gift Sets', href: '#' }
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Shipping Info', href: '#' },
      { name: 'Returns', href: '#' },
      { name: 'FAQ', href: '#' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Sustainability', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: <FaTwitter className="w-5 h-5" />, href: '#', name: 'Twitter' },
    { icon: <FaFacebook className="w-5 h-5" />, href: '#', name: 'Facebook' },
    { icon: <FaInstagram className="w-5 h-5" />, href: '#', name: 'Instagram' },
    { icon: <FaLinkedin className="w-5 h-5" />, href: '#', name: 'LinkedIn' }
  ];

  return (
    <footer className={`relative ${
      darkMode 
        ? 'bg-gradient-to-b from-gray-900 to-black' 
        : 'bg-gradient-to-b from-gray-50 to-gray-100'
    }`}>
      {/* Decorative top border */}
      <div className={`h-px bg-gradient-to-r ${
        darkMode 
          ? 'from-transparent via-gray-700 to-transparent' 
          : 'from-transparent via-gray-300 to-transparent'
      }`} />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className={`w-10 h-10 rounded-xl ${darkMode ? 'bg-white' : 'bg-gray-900'} flex items-center justify-center`}>
                <PineconeIcon 
                  className={darkMode ? 'text-gray-900' : 'text-white'} 
                  size={24} 
                />
              </div>
              <span className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Pinecone Inc.
              </span>
            </div>
            
            <p className={`text-base leading-relaxed mb-6 max-w-md ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              The world's leading provider of premium pine cones. We bring nature's perfect geometric design to your space with unmatched quality and service.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  123 Forest Avenue, Pine Valley, CA 90210
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  +1 (555) 123-PINE
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  hello@pinecone-inc.com
                </span>
              </div>
            </div>
          </div>

          {/* Footer links */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 lg:col-span-3">
            <div>
              <h3 className={`text-sm font-semibold mb-4 uppercase tracking-wider ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.href}
                      className={`text-sm transition-colors duration-200 ${
                        darkMode 
                          ? 'text-gray-400 hover:text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={`text-sm font-semibold mb-4 uppercase tracking-wider ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Products
              </h3>
              <ul className="space-y-3">
                {footerLinks.products.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.href}
                      className={`text-sm transition-colors duration-200 ${
                        darkMode 
                          ? 'text-gray-400 hover:text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={`text-sm font-semibold mb-4 uppercase tracking-wider ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Support
              </h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.href}
                      className={`text-sm transition-colors duration-200 ${
                        darkMode 
                          ? 'text-gray-400 hover:text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className={`rounded-2xl p-8 mb-12 border ${
          darkMode 
            ? 'bg-gray-800/30 border-gray-700/30' 
            : 'bg-white/30 border-gray-200/30'
        } backdrop-blur-sm`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <FaLeaf className={`w-5 h-5 ${
                  darkMode ? 'text-green-400' : 'text-green-600'
                }`} />
                <h3 className={`text-xl font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Stay Connected with Nature
                </h3>
              </div>
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Get the latest updates on new pine cone varieties, seasonal collections, and exclusive offers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-3 rounded-lg border text-sm transition-colors duration-200 ${
                  darkMode 
                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-400' 
                    : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-600'
                } focus:outline-none focus:ring-2 focus:ring-green-500/20`}
              />
              <motion.button
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  darkMode 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                } shadow-lg hover:shadow-xl`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className={`pt-8 border-t ${
          darkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                © {currentYear} Pinecone Inc. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                {footerLinks.legal.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className={`text-xs transition-colors duration-200 ${
                      darkMode 
                        ? 'text-gray-500 hover:text-gray-300' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    darkMode 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
        <div className={`absolute top-20 left-20 w-16 h-16 ${
          darkMode ? 'text-gray-600' : 'text-gray-400'
        }`}>
          <FaLeaf className="w-full h-full" />
        </div>
        <div className={`absolute bottom-20 right-20 w-12 h-12 ${
          darkMode ? 'text-gray-600' : 'text-gray-400'
        }`}>
          <PineconeIcon size={48} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;