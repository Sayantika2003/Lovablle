import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import PostCard from '@/components/blog/PostCard';
import blogPosts from '@/data/blog-posts';
import { useLocation, useNavigate } from 'react-router-dom';
import { TweetGrid } from '@/components/ui/tweet-grid';
import { RollingGallery } from '@/components/ui/rolling-gallery';
import { FlowingMenu } from '@/components/ui/flowing-menu';

const BlogPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract unique categories
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));
  
  // Get category from URL query params
  const queryParams = new URLSearchParams(location.search);
  const categoryFromURL = queryParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFromURL);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Update URL when category changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }
    navigate({ search: params.toString() }, { replace: true });
  }, [selectedCategory, navigate]);
  
  // Filter posts based on selected category and search term
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    const matchesSearch = searchTerm 
      ? post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  // Group posts by category for menu
  const allCategories = [
    { id: 'all', title: 'All Articles' },
    ...categories.map(cat => ({ id: cat, title: cat }))
  ];
  
  return (
    <Layout>
      <div className="container py-12 md:py-20">
        <div className="text-center mb-12">
          <TweetGrid 
            words={["Explore", "Our", "Articles"]} 
            className="justify-center mb-4"
          />
          <p className="text-foreground/70 text-xl max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
            Explore our collection of articles on writing, design, technology, and productivity.
          </p>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="mb-12">
          <div className="relative max-w-xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`w-full px-5 py-3 bg-background border rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                isSearchFocused ? 'shadow-lg' : 'shadow-sm'
              }`}
            />
            <div 
              className={`absolute bottom-0 left-1/2 h-0.5 bg-primary transform -translate-x-1/2 transition-all duration-300 ${
                isSearchFocused ? 'w-1/2' : 'w-0'
              }`}
            ></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                !selectedCategory ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                  selectedCategory === category ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Featured Posts Section using RollingGallery */}
        {filteredPosts.some(post => post.featured) && (
          <div className="mb-16 animate-fade-in-up">
            <h2 className="text-2xl mb-6">Featured {selectedCategory || ''} Articles</h2>
            <RollingGallery 
              itemsPerView={1} 
              gap={24}
              className="animate-fade-in-up"
            >
              {filteredPosts
                .filter(post => post.featured)
                .map((post) => (
                  <div key={post.id} className="h-full">
                    <PostCard post={post} large />
                  </div>
                ))}
            </RollingGallery>
          </div>
        )}
        
        {/* All Articles Grid */}
        <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
          <h2 className="text-2xl mb-6">{selectedCategory ? `${selectedCategory} Articles` : 'All Articles'}</h2>
          
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10">
              {filteredPosts
                .filter(post => !post.featured || !filteredPosts.some(p => p.featured))
                .map((post, index) => (
                  <PostCard key={post.id} post={post} delay={index} />
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-foreground/70">No articles match your search criteria.</p>
              <button 
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchTerm('');
                }}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
