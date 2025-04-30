
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 py-4 transition-all duration-300",
      scrolled ? "bg-background/95 backdrop-blur-md border-b shadow-sm" : "bg-transparent"
    )}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-2xl font-title font-bold relative overflow-hidden group">
          <span className="block transition-transform duration-300 group-hover:-translate-y-full">InkWell</span>
          <span className="absolute top-0 left-0 h-full w-full text-primary transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">InkWell</span>
        </Link>
        
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  asChild 
                  className={cn(
                    "px-4 py-2 hover:text-primary transition-colors",
                    location.pathname === '/' && "text-primary font-medium"
                  )}
                >
                  <Link to="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={cn(
                    "px-4 py-2 hover:text-primary transition-colors",
                    location.pathname.includes('/blog') && "text-primary font-medium"
                  )}
                >
                  Blog
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <div className="grid grid-cols-2 gap-3">
                      <Link 
                        to="/blog" 
                        className="group rounded-md p-3 hover:bg-accent transition-colors"
                      >
                        <div className="text-lg font-medium mb-1 group-hover:text-primary transition-colors">All Articles</div>
                        <p className="text-sm text-foreground/70">Browse our full collection of articles</p>
                      </Link>
                      <Link 
                        to="/blog?category=writing" 
                        className="group rounded-md p-3 hover:bg-accent transition-colors"
                      >
                        <div className="text-lg font-medium mb-1 group-hover:text-primary transition-colors">Writing Tips</div>
                        <p className="text-sm text-foreground/70">Improve your writing skills</p>
                      </Link>
                      <Link 
                        to="/blog?category=creativity" 
                        className="group rounded-md p-3 hover:bg-accent transition-colors"
                      >
                        <div className="text-lg font-medium mb-1 group-hover:text-primary transition-colors">Creativity</div>
                        <p className="text-sm text-foreground/70">Spark your creative thinking</p>
                      </Link>
                      <Link 
                        to="/blog?category=productivity" 
                        className="group rounded-md p-3 hover:bg-accent transition-colors"
                      >
                        <div className="text-lg font-medium mb-1 group-hover:text-primary transition-colors">Productivity</div>
                        <p className="text-sm text-foreground/70">Optimize your workflow</p>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink 
                  asChild 
                  className={cn(
                    "px-4 py-2 hover:text-primary transition-colors",
                    location.pathname === '/about' && "text-primary font-medium"
                  )}
                >
                  <Link to="/about">About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            asChild
            className="relative overflow-hidden group"
          >
            <Link to="/subscribe">
              <span className="block transition-all duration-300 group-hover:scale-105">Subscribe</span>
              <span className="absolute inset-0 h-full w-full bg-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Link>
          </Button>
          
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-xl py-2 hover:text-primary transition-colors">
                  Home
                </Link>
                <Link to="/blog" className="text-xl py-2 hover:text-primary transition-colors">
                  Blog
                </Link>
                <Link to="/about" className="text-xl py-2 hover:text-primary transition-colors">
                  About
                </Link>
                <Button asChild className="mt-4">
                  <Link to="/subscribe">Subscribe</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
