
import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PostContent from '@/components/blog/PostContent';
import NewsletterForm from '@/components/blog/NewsletterForm';
import PostCard from '@/components/blog/PostCard';
import blogPosts from '@/data/blog-posts';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Find the current post based on slug
  const currentPost = blogPosts.find(post => post.slug === slug);
  
  // Get related posts (same category but not the current post)
  const relatedPosts = currentPost 
    ? blogPosts
        .filter(post => post.category === currentPost.category && post.id !== currentPost.id)
        .slice(0, 3)
    : [];
  
  // Get trending posts (could be based on views in a real app)
  const trendingPosts = blogPosts
    .filter(post => post.id !== currentPost?.id)
    .sort(() => Math.random() - 0.5) // Random for demo purposes
    .slice(0, 2);
  
  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  // If post not found, redirect to blog page
  if (!currentPost) {
    return <Navigate to="/blog" replace />;
  }
  
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="mb-8 animate-fade-in">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-sm text-foreground/60 hover:text-primary transition-colors mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to all articles
          </Link>
          
          <Link to={`/blog?category=${currentPost.category}`}>
            <Badge 
              variant="secondary" 
              className="mb-2 bg-primary/10 text-primary hover:bg-primary/20 animate-fade-in"
            >
              {currentPost.category}
            </Badge>
          </Link>
        </div>
        
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            <PostContent post={currentPost} />
            
            {/* Tags Section */}
            {currentPost.tags && currentPost.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
                {currentPost.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="hover:bg-secondary transition-colors">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Newsletter CTA */}
            <div className="mt-16 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <Card className="bg-secondary/30 border-0">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-medium mb-2">Enjoyed this article?</h3>
                    <p className="text-foreground/70">Subscribe to get the latest posts delivered right to your inbox.</p>
                  </div>
                  <NewsletterForm />
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-24">
              <div className="mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <h3 className="text-lg font-medium mb-4 pb-2 border-b">Trending Articles</h3>
                <div className="space-y-4">
                  {trendingPosts.map((post, index) => (
                    <Link 
                      key={post.id} 
                      to={`/blog/${post.slug}`}
                      className="flex gap-4 group animate-fade-in"
                      style={{ animationDelay: `${150 + (index * 50)}ms` }}
                    >
                      <div className="w-16 h-16 overflow-hidden rounded flex-shrink-0">
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-sm text-foreground/60 mt-1">{post.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '250ms' }}>
                <h3 className="text-lg font-medium mb-4 pb-2 border-b">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(blogPosts.map(post => post.category))).map((category, index) => (
                    <Link 
                      key={category} 
                      to={`/blog?category=${category}`}
                      className="px-3 py-1 bg-secondary/50 rounded-full text-sm hover:bg-secondary transition-colors animate-fade-in"
                      style={{ animationDelay: `${300 + (index * 50)}ms` }}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <h2 className="text-center text-3xl mb-10">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((post, index) => (
                <PostCard key={post.id} post={post} delay={index + 1} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BlogPost;
