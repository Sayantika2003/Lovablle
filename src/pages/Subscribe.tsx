
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const topicOptions = [
    { id: 'writing', label: 'Writing' },
    { id: 'design', label: 'Design' },
    { id: 'technology', label: 'Technology' },
    { id: 'productivity', label: 'Productivity' }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "You're subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail('');
      setName('');
      setInterests([]);
      setLoading(false);
    }, 1000);
  };
  
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="mb-4">Subscribe to Our Newsletter</h1>
            <p className="text-foreground/70 text-xl">
              Join our community and receive the latest articles, tips, and insights directly in your inbox.
            </p>
          </div>
          
          <div className="bg-card border rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name"
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label className="mb-2 block">Topics you're interested in</Label>
                <div className="grid grid-cols-2 gap-4">
                  {topicOptions.map(option => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={option.id}
                        checked={interests.includes(option.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setInterests([...interests, option.id]);
                          } else {
                            setInterests(interests.filter(i => i !== option.id));
                          }
                        }}
                      />
                      <Label htmlFor={option.id} className="cursor-pointer">{option.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? 'Subscribing...' : 'Subscribe Now'}
                </Button>
              </div>
              
              <p className="text-sm text-foreground/60 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
          
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="text-xl mb-2">Weekly Digests</h3>
              <p className="text-foreground/70">
                Get a curated selection of our best articles delivered every Sunday.
              </p>
            </div>
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="text-xl mb-2">Exclusive Content</h3>
              <p className="text-foreground/70">
                Subscribers get access to special articles and early previews.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Subscribe;
