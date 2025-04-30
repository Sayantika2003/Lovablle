import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const [isChanging, setIsChanging] = useState(false);
  const [exitComplete, setExitComplete] = useState(true);
  const prevPathRef = useRef<string>(pathname);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle page transitions with flowing effect
  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0);
    
    // If path changed, trigger flowing transition
    if (prevPathRef.current !== pathname) {
      setIsChanging(true);
      setExitComplete(false);
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      // Initial transition phase
      timeoutRef.current = setTimeout(() => {
        setExitComplete(true);
        
        // Complete transition phase
        timeoutRef.current = setTimeout(() => {
          setIsChanging(false);
          prevPathRef.current = pathname;
        }, 500);
      }, 300);
    }
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-hidden">
        {/* Flowing menu transition effect */}
        <div className="relative">
          {isChanging && (
            <div className="fixed inset-0 bg-background z-40 pointer-events-none">
              {!exitComplete ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Exit animation */}
                  <div className="w-4 h-4 bg-primary rounded-full animate-ping" />
                  <div className="absolute w-16 h-16 bg-primary/20 rounded-full animate-pulse" />
                  <div className="absolute w-32 h-32 bg-primary/10 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* Enter animation */}
                  <div className="mb-4">
                    <div className="w-6 h-6 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                  </div>
                  <div className="h-1 w-16 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-primary h-full animate-pulse" />
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div 
            className="animate-fade-in" 
            style={{ 
              animationDuration: '0.8s',
              animationFillMode: 'both',
              willChange: 'opacity, transform'
            }}
          >
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
