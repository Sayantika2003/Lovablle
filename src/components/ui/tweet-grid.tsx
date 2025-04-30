import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from './motion';

interface TweetGridProps {
  words: string[];
  className?: string;
  highlightIndex?: number;
  animationDelay?: number;
}

const TweetGrid: React.FC<TweetGridProps> = ({ 
  words, 
  className, 
  highlightIndex = -1,
  animationDelay = 50
}) => {
  return (
    <div className={cn("grid gap-3 md:gap-4 mb-6", className)}>
      <div className={cn(
        "grid",
        words.length <= 3 ? "grid-cols-3" : words.length === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-3 md:grid-cols-5"
      )}>
        {words.map((word, idx) => (
          <div 
            key={idx}
            className={cn(
              "bg-secondary/40 rounded-xl p-4 transform hover:scale-105 transition-all overflow-hidden relative group",
              idx === highlightIndex && "bg-primary/20"
            )}
          >
            <div className="absolute inset-0 bg-primary/10 transform scale-0 group-hover:scale-100 transition-transform rounded-xl" />
            <motion.span 
              animation="wave" 
              className={cn(
                "text-2xl md:text-4xl font-bold relative z-10 block",
                idx === highlightIndex && "text-primary"
              )}
              delay={idx * animationDelay}
            >
              {word}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
};

export { TweetGrid };