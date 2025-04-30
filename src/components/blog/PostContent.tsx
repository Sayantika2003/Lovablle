
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { BlogPost } from '@/types/blog';
import { ShareLinks } from './ShareLinks';

interface PostContentProps {
  post: BlogPost;
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Badge variant="secondary">{post.category}</Badge>
          <span className="text-sm text-foreground/60 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {post.date}
          </span>
        </div>
        <h1 className="mb-6">{post.title}</h1>
        <div className="flex items-center justify-center gap-3">
          <img 
            src={post.author.avatar} 
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover" 
          />
          <span className="font-medium">{post.author.name}</span>
        </div>
      </div>
      
      <img 
        src={post.coverImage} 
        alt={post.title}
        className="w-full h-[400px] object-cover rounded-lg mb-10" 
      />
      
      <div className="prose mx-auto" dangerouslySetInnerHTML={{ __html: post.content }} />
      
      <div className="mt-12 pt-8 border-t">
        <ShareLinks post={post} />
        
        <div className="mt-8 p-6 bg-secondary rounded-lg flex items-center gap-6">
          <img 
            src={post.author.avatar} 
            alt={post.author.name}
            className="w-20 h-20 rounded-full object-cover hidden md:block" 
          />
          <div>
            <h4 className="text-xl mb-2">Written by {post.author.name}</h4>
            <p className="text-foreground/70">{post.author.bio}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostContent;
