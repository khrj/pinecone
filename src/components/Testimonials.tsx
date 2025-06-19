import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

interface TestimonialsProps {
  darkMode: boolean;
}

const Testimonials: React.FC<TestimonialsProps> = ({ darkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Interior Designer",
      company: "Modern Spaces Co.",
      content: "Pinecone Inc.'s products have completely transformed how I approach natural decor. The quality is unmatched, and my clients absolutely love the authentic, premium feel these pine cones bring to their spaces.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Event Planner",
      company: "Elegant Affairs",
      content: "I've been using Pinecone Inc. for all my rustic and woodland-themed events. The consistency in quality and the variety of sizes they offer makes my job so much easier. Highly recommended!",
      rating: 5,
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
    },
    {
      id: 3,
      name: "Emma Thompson",
      role: "Craft Store Owner",
      company: "Creative Corner",
      content: "Our customers constantly ask where we source our pine cones from. Pinecone Inc. has been our secret weapon for premium craft supplies. The attention to detail is incredible.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
    }
  ];

  useEffect(() => {
    if (!isAutoScrolling || isDragging) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoScrolling, isDragging, testimonials.length]);

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  // Touch/Mouse handlers for swiping
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setIsAutoScrolling(false);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setTranslateX(diff);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 100; // Minimum swipe distance
    
    if (translateX > threshold) {
      // Swipe right - go to previous
      handlePrevious();
    } else if (translateX < -threshold) {
      // Swipe left - go to next
      handleNext();
    }
    
    setTranslateX(0);
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleEnd();
    }
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  return (
    <section 
      id="testimonials"
      className={`py-24 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      } relative overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-light mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Client 
            <span className={`block font-medium bg-gradient-to-r ${
              darkMode 
                ? 'from-purple-400 to-pink-400' 
                : 'from-purple-600 to-pink-600'
            } bg-clip-text text-transparent`}>Testimonials</span>
          </h2>
          <p className={`text-lg max-w-3xl mx-auto font-light ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Discover why industry professionals trust Pinecone Inc. for their premium pine cone needs.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div 
            ref={containerRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-700 ease-out" 
              style={{ 
                transform: `translateX(calc(-${currentIndex * 100}% + ${isDragging ? translateX : 0}px))`,
                transitionDuration: isDragging ? '0ms' : '700ms'
              }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className={`backdrop-blur-sm rounded-3xl p-12 border transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gray-800/30 border-gray-700/30' 
                      : 'bg-white/30 border-gray-200/30'
                  }`}>
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200/50"
                            draggable={false}
                          />
                          <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center ${
                            darkMode ? 'bg-gray-700' : 'bg-gray-100'
                          }`}>
                            <Quote className="w-3 h-3" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center lg:text-left">
                        {/* Stars */}
                        <div className="flex justify-center lg:justify-start mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>

                        {/* Testimonial Text */}
                        <blockquote className={`text-lg mb-6 leading-relaxed font-light ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          "{testimonial.content}"
                        </blockquote>

                        {/* Author Info */}
                        <div>
                          <div className={`text-lg font-medium mb-1 ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {testimonial.name}
                          </div>
                          <div className={`text-sm ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {testimonial.role} at {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center justify-center mt-8 space-x-4">
            <button
              onClick={handlePrevious}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                darkMode 
                  ? 'bg-gray-800 text-gray-300 hover:text-white' 
                  : 'bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? `${darkMode ? 'bg-white' : 'bg-gray-900'} w-6` 
                      : `${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={handleNext}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                darkMode 
                  ? 'bg-gray-800 text-gray-300 hover:text-white' 
                  : 'bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Mobile indicators only */}
          <div className="flex md:hidden justify-center mt-8">
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? `${darkMode ? 'bg-white' : 'bg-gray-900'} w-6` 
                      : `${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;