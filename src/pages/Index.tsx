import React, { useRef, useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import FeaturedPost from '@/components/blog/FeaturedPost';
import PostCard from '@/components/blog/PostCard';
import NewsletterForm from '@/components/blog/NewsletterForm';
import blogPosts from '@/data/blog-posts';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { motion } from '@/components/ui/motion';
import { TweetGrid } from '@/components/ui/tweet-grid';
import { RollingGallery } from '@/components/ui/rolling-gallery';
import { FlowingMenu, FlowingMenuItem } from '@/components/ui/flowing-menu';

const Index = () => {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.filter(post => !post.featured).slice(0, 4);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
  
  // Group posts by category for the category showcase
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));
  const postsByCategory = categories.reduce((acc, category) => {
    acc[category] = blogPosts.filter(post => post.category === category).slice(0, 3);
    return acc;
  }, {} as Record<string, typeof blogPosts>);
  
  // Category sections for FlowingMenu
  const categorySections: FlowingMenuItem[] = categories.map(category => ({
    id: category,
    title: category,
    content: (
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl">Top {category} Articles</h3>
          <Link 
            to={`/blog?category=${category}`} 
            className="text-primary flex items-center gap-1 hover:gap-2 transition-all"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {postsByCategory[category]?.map((post, postIndex) => (
            <PostCard 
              key={post.id} 
              post={post} 
              delay={postIndex}
            />
          ))}
        </div>
      </div>
    )
  }));

  // Check if gallery is in viewport for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsGalleryVisible(entry.isIntersecting);
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
  
  return (
    <Layout>
      {/* Hero Section with Tweet Grid for Main Heading */}
      <section className="container relative py-20 md:py-28 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-60 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary rounded-full blur-3xl opacity-60" />
        </div>
        
        <div className="text-center mb-12 md:mb-20 max-w-3xl mx-auto relative z-10">
          {/* Tweet Grid for main heading */}
          <TweetGrid
            words={["Discover", "Stories", "That", "Matter"]}
            highlightIndex={3}
            className="mb-8"
          />
          
          <p className="text-foreground/70 text-xl max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '150ms' }}>
            A modern blogging platform for sharing thoughts, ideas, and stories with thoughtful readers around the world.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mt-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Button asChild size="lg" className="group relative overflow-hidden">
              <Link to="/blog">
                <span className="relative z-10">Start Reading</span>
                <span className="absolute bottom-0 left-0 w-full h-full bg-primary/20 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group relative overflow-hidden">
              <Link to="/about">
                <span className="relative z-10">Learn More</span>
                <span className="absolute inset-0 bg-primary/10 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-md"></span>
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Scroll Indicator with enhanced animation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-light">
          <ChevronDown className="h-8 w-8 text-primary/60" />
        </div>
        
        {/* Featured Posts using RollingGallery instead of Carousel */}
        {featuredPosts.length > 0 && (
          <div className="relative mb-20">
            <h2 className="text-center text-3xl mb-8 animate-fade-in">Featured Posts</h2>
            <RollingGallery 
              itemsPerView={2} 
              gap={24}
              className="animate-fade-in-up"
            >
              {featuredPosts.map((post) => (
                <div key={post.id} className="h-full">
                  <FeaturedPost post={post} />
                </div>
              ))}
            </RollingGallery>
          </div>
        )}
      </section>
      
      {/* Recent Articles Section with Animated Cards */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        
        {/* Wavy divider */}
        <div className="absolute top-0 left-0 w-full">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                  className="fill-background" />
          </svg>
        </div>
        
        <div className="container relative z-10">
          <div className="flex justify-between items-baseline mb-10">
            <h2 className="text-3xl">Recent Articles</h2>
            <Link to="/blog" className="text-primary flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentPosts.map((post, index) => (
              <PostCard key={post.id} post={post} delay={index} />
            ))}
          </div>
        </div>
        
        {/* Wavy divider (bottom) */}
        <div className="absolute bottom-0 left-0 w-full transform rotate-180">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                  className="fill-background" />
          </svg>
        </div>
      </section>
      
      {/* Explore Categories Section with FlowingMenu */}
      <section className="container py-20" ref={galleryRef}>
        <div className={`text-center mb-12 transition-opacity-slow transition-transform-slow ${isGalleryVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}>
          <h2 className="mb-4">Explore Categories</h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Dive into articles organized by interest areas. Find exactly what you're looking for or discover something new.
          </p>
        </div>
        
        <div className={`transition-opacity-slow transition-transform-slow ${isGalleryVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}>
          <FlowingMenu items={categorySections} />
        </div>
      </section>
      
      {/* Reader Testimonials - Tweet Grid */}
      <section className="py-16 bg-secondary/40">
        <div className="container">
          <h2 className="text-3xl text-center mb-12">Reader Testimonials</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div 
                key={i}
                animation="scale-in"
                delay={i * 150}
                className="bg-background p-6 rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                    <span className="text-xl text-primary font-semibold">{String.fromCharCode(64 + i)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Reader {i}</h4>
                    <p className="text-sm text-foreground/60">@reader{i}</p>
                  </div>
                </div>
                <p className="mb-4">Really enjoying the insights from InkWell's articles! The writing tips have been invaluable for my own work.</p>
                <div className="flex items-center justify-between text-sm text-foreground/60">
                  <span>2 days ago</span>
                  <div className="flex gap-4">
                    <span className="hover:text-primary cursor-pointer transition-colors">♥ 24</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">↺ 5</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section with Enhanced Design */}
      <section className="container py-16">
        <div className="bg-secondary/60 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full transform translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary/10 rounded-full transform -translate-x-1/3 translate-y-1/3 blur-3xl"></div>
          
          <NewsletterForm />
        </div>
      </section>
    </Layout>
  );
};

export default Index;
