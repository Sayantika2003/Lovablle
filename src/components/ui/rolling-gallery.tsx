import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { motion } from './motion';

interface RollingGalleryProps {
  children: React.ReactNode[];
  className?: string;
  itemsPerView?: number;
  autoplay?: boolean;
  interval?: number;
  gap?: number;
}

const RollingGallery: React.FC<RollingGalleryProps> = ({ 
  children,
  className,
  itemsPerView = 3,
  autoplay = true,
  interval = 5000,
  gap = 20
}) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Adjust responsive items per view
  const getActualItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return Math.min(2, itemsPerView);
    }
    return itemsPerView;
  };
  
  const actualItemsPerView = getActualItemsPerView();
  const totalSlides = Math.max(children.length - actualItemsPerView + 1, 1);

  // Auto-scroll effect
  useEffect(() => {
    if (!autoplay || isHovering) return;
    
    const timer = setInterval(() => {
      if (isVisible) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoplay, interval, totalSlides, isHovering, isVisible]);

  // Check if gallery is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  return (
    <div 
      className={cn("relative", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      ref={galleryRef}
    >
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ 
            transform: `translateX(-${activeIndex * (100 / actualItemsPerView)}%)`,
            gap: `${gap}px`,
          }}
        >
          {children.map((child, index) => (
            <div 
              key={index} 
              className="flex-none"
              style={{ width: `calc(${100 / actualItemsPerView}% - ${gap * (actualItemsPerView - 1) / actualItemsPerView}px)` }}
            >
              <motion.div 
                animation="fade-in-up" 
                delay={index * 100}
                className="h-full"
              >
                {child}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      
      {totalSlides > 1 && (
        <>
          <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-primary/20 transition-colors z-10"
            aria-label="Previous slide"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-primary/20 transition-colors z-10"
            aria-label="Next slide"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {totalSlides > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === activeIndex
                  ? "w-6 bg-primary"
                  : "bg-foreground/20 hover:bg-foreground/40"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export { RollingGallery };