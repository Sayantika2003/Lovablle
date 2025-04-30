
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { BlogPost } from '@/types/blog';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: BlogPost;
  delay?: number;
}

const PostCard: React.FC<PostCardProps> = ({ post, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  // Handle touch events for mobile
  const handleTouchStart = () => {
    setIsTapped(true);
    // Reset the tapped state after animation completes
    setTimeout(() => setIsTapped(false), 300);
  };

  return (
    <Card 
      className={cn(
        "flex flex-col h-full overflow-hidden border rounded-lg transition-all duration-500 animate-fade-in",
        "hover:shadow-lg hover:-translate-y-1",
        "group cursor-pointer relative",
        isTapped && "scale-98"
      )}
      style={{ animationDelay: `${delay * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
    >
      {/* Card glow effect */}
      <div 
        className={cn(
          "absolute -inset-px bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 rounded-lg opacity-0 blur transition-opacity duration-500",
          isHovered && "opacity-100"
        )}
      />
      
      <Link to={`/blog/${post.slug}`} className="block overflow-hidden relative">
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-b from-transparent to-primary/30 opacity-0 transition-opacity duration-300 z-10",
            isHovered && "opacity-100"
          )}
        />
        <img 
          src={post.coverImage} 
          alt={post.title}
          className={cn(
            "w-full h-48 object-cover transition-all duration-500",
            isHovered ? "scale-110" : "scale-100"
          )}
        />
      </Link>
      
      <CardContent className="flex-1 p-6 flex flex-col relative z-10 bg-card">
        <div className="flex items-center gap-2 mb-3">
          <Badge 
            variant="secondary" 
            className={cn(
              "transition-all duration-300",
              isHovered ? "bg-primary/20 text-primary" : ""
            )}
          >
            {post.category}
          </Badge>
          <span className="text-sm text-foreground/60 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {post.date}
          </span>
        </div>
        
        <Link to={`/blog/${post.slug}`}>
          <h3 
            className={cn(
              "text-xl font-medium mb-3 transition-colors duration-300",
              isHovered ? "text-primary" : ""
            )}
          >
            {post.title}
          </h3>
        </Link>
        
        <p className="text-foreground/70 mb-6 flex-1">
          {post.excerpt}
        </p>
        
        <div 
          className={cn(
            "flex items-center gap-3 mt-auto transition-all duration-500",
            isHovered ? "translate-x-2" : ""
          )}
        >
          <img 
            src={post.author.avatar} 
            alt={post.author.name}
            className={cn(
              "w-8 h-8 rounded-full object-cover transition-all duration-300",
              isHovered ? "scale-110 ring-2 ring-primary/20" : ""
            )}
          />
          <span className="text-sm font-medium">{post.author.name}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
