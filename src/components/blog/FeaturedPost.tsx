
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { BlogPost } from '@/types/blog';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={cn(
        "overflow-hidden border-0 shadow-lg rounded-xl transition-all duration-500 animate-fade-in",
        isHovered ? "shadow-xl translate-y-[-5px]" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid md:grid-cols-2 gap-0">
        <div className="order-2 md:order-1 p-6 md:p-8 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Badge 
              variant="secondary" 
              className="bg-primary/10 text-primary hover:bg-primary/20"
            >
              {post.category}
            </Badge>
            <span className="text-sm text-foreground/60 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {post.date}
            </span>
          </div>
          
          <Link to={`/blog/${post.slug}`}>
            <h2 className={cn(
              "text-2xl md:text-3xl mb-4 transition-colors line-clamp-2",
              isHovered ? "text-primary" : ""
            )}>
              {post.title}
            </h2>
          </Link>
          
          <p className="text-foreground/70 text-lg mb-6 flex-1 line-clamp-3">
            {post.excerpt}
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
            <div className="flex items-center gap-3 transition-transform duration-500" style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}>
              <div className="relative">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary/30 transition-all duration-300" 
                />
                {isHovered && (
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background animate-pulse" />
                )}
              </div>
              <span className="font-medium">{post.author.name}</span>
            </div>
            
            <Button 
              asChild
              variant="outline" 
              size="sm"
              className="group relative overflow-hidden"
            >
              <Link to={`/blog/${post.slug}`} className="flex items-center gap-1">
                Read Article 
                <ArrowRight className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  isHovered ? "translate-x-1" : ""
                )} />
                <span className={cn(
                  "absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300",
                  isHovered ? "w-full" : ""
                )}></span>
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="order-1 md:order-2 h-60 md:h-auto">
          <Link to={`/blog/${post.slug}`}>
            <div className="relative h-full w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-l" />
              <img 
                src={post.coverImage} 
                alt={post.title}
                className={cn(
                  "h-full w-full object-cover transition-transform duration-700",
                  isHovered ? "scale-110" : "scale-100"
                )}
              />
            </div>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default FeaturedPost;
