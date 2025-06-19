import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PineconeIcon from './PineconeIcon';

const Loader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-all duration-1000 ${
      isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      {/* Animated PineconeIcon - No rotation */}
      <div className="relative">
        <motion.div
          className="text-white"
          animate={{
            scale: [1, 1.2, 1],
            opacity: isComplete ? 0 : 1
          }}
          transition={{
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: {
              duration: 0.8,
              delay: isComplete ? 0 : 0
            }
          }}
        >
          <PineconeIcon size={80} />
        </motion.div>
        
        {/* Progress indicator */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="text-white text-sm font-light mb-2 text-center">
            {progress.toString().padStart(3, '0')}
          </div>
          <div className="w-32 h-px bg-white/20">
            <motion.div 
              className="h-full bg-white transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;