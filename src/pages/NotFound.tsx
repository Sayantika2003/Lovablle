
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container py-20 md:py-32 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="relative mb-8 animate-float">
            <div className="text-[180px] font-bold text-primary/10 leading-none select-none">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-6xl md:text-8xl font-bold text-primary">404</h1>
            </div>
          </div>
          
          <h2 className="text-3xl mb-6 animate-fade-in" style={{ animationDelay: '200ms' }}>Page Not Found</h2>
          <p className="text-xl text-foreground/70 max-w-md mx-auto mb-10 animate-fade-in" style={{ animationDelay: '400ms' }}>
            We couldn't find the page you were looking for. Perhaps it has been moved or deleted.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '600ms' }}>
            <Button asChild size="lg" className="group">
              <Link to="/" className="flex items-center gap-2">
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Return to Home
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="group">
              <Link to="/blog">
                Browse Articles
                <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </Button>
          </div>
          
          <div className="mt-16 flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '800ms' }}>
            <p className="text-foreground/50">Looking for something specific?</p>
            <Link to="/blog" className="text-primary hover:underline">All Articles</Link>
            <Link to="/about" className="text-primary hover:underline">About Us</Link>
            <Link to="/subscribe" className="text-primary hover:underline">Subscribe</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
