import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { motion } from './motion';

interface FlowingMenuItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface FlowingMenuProps {
  items: FlowingMenuItem[];
  className?: string;
  activeId?: string;
  onChange?: (id: string) => void;
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({
  items,
  className,
  activeId,
  onChange,
}) => {
  const [activeItem, setActiveItem] = useState<string>(activeId || items[0]?.id || '');

  const handleItemClick = useCallback((id: string) => {
    setActiveItem(id);
    onChange?.(id);
  }, [onChange]);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-wrap gap-2 md:gap-4 mb-8">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm md:text-base relative overflow-hidden group transition-all duration-300",
              activeItem === item.id 
                ? "bg-primary text-primary-foreground font-medium shadow-md" 
                : "bg-secondary/50 hover:bg-secondary"
            )}
          >
            <span className="relative z-10">{item.title}</span>
            <span 
              className={cn(
                "absolute bottom-0 left-0 w-full h-full bg-primary/10 transform origin-bottom transition-transform duration-500",
                activeItem === item.id ? "scale-y-100" : "scale-y-0 group-hover:scale-y-50"
              )}
            />
            <span 
              className="absolute top-0 left-0 w-1 h-1 rounded-full bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ 
                boxShadow: "0 0 20px 2px var(--primary)" 
              }}
            />
          </button>
        ))}
      </div>
      
      <div className="relative min-h-[200px]">
        <AnimatePresence mode="wait">
          {items.map((item) => 
            activeItem === item.id && (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {item.content}
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export { FlowingMenu, type FlowingMenuItem };