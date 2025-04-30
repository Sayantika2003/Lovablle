
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MotionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-up' | 'scale-in' | 'slide-in-right' | 'float' | 'wave' | 'bounce' | 'pulse';
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export const motion = {
  div: ({
    children,
    className,
    animation = 'fade-in',
    delay = 0,
    duration = 0.5,
    threshold = 0.1,
    once = true,
    ...props
  }: MotionProps & React.HTMLAttributes<HTMLDivElement>) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && ref.current) {
              observer.unobserve(ref.current);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        },
        { threshold }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [once, threshold]);

    const animationClass = {
      'fade-in': 'animate-fade-in',
      'slide-up': 'animate-slide-up',
      'scale-in': 'animate-scale-in',
      'slide-in-right': 'animate-slide-in-right',
      'float': 'animate-float',
      'wave': 'animate-wave',
      'bounce': 'animate-bounce',
      'pulse': 'animate-pulse-light'
    }[animation];

    return (
      <div
        ref={ref}
        className={cn(
          className,
          isVisible ? animationClass : 'opacity-0',
          'transition-all'
        )}
        style={{
          animationDelay: `${delay}ms`,
          animationDuration: `${duration}s`,
          animationFillMode: 'both',
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
  
  span: ({
    children,
    className,
    animation = 'fade-in',
    delay = 0,
    duration = 0.5,
    threshold = 0.1,
    once = true,
    ...props
  }: MotionProps & React.HTMLAttributes<HTMLSpanElement>) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && ref.current) {
              observer.unobserve(ref.current);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        },
        { threshold }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [once, threshold]);

    const animationClass = {
      'fade-in': 'animate-fade-in',
      'slide-up': 'animate-slide-up',
      'scale-in': 'animate-scale-in',
      'slide-in-right': 'animate-slide-in-right',
      'float': 'animate-float',
      'wave': 'animate-wave',
      'bounce': 'animate-bounce',
      'pulse': 'animate-pulse-light'
    }[animation];

    return (
      <span
        ref={ref}
        className={cn(
          className,
          isVisible ? animationClass : 'opacity-0',
          'transition-all'
        )}
        style={{
          animationDelay: `${delay}ms`,
          animationDuration: `${duration}s`,
          animationFillMode: 'both',
          display: 'inline-block'
        }}
        {...props}
      >
        {children}
      </span>
    );
  }
};

export default motion;
