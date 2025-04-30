
import React from 'react';
import Layout from '@/components/layout/Layout';
import { authors } from '@/data/blog-posts';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const teamMembers = Object.values(authors);
  
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h1 className="mb-6">About InkWell</h1>
          <p className="text-xl text-foreground/70 mb-6">
            InkWell was founded with a simple mission: to create a space where ideas can flow freely and writing can flourish.
          </p>
          <p className="text-lg text-foreground/70">
            We believe in the power of words to inspire, educate, and connect. Our platform is designed to support writers and readers alike, creating a community around thoughtful content.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
            <h2 className="text-3xl mb-4">Our Story</h2>
            <p className="text-lg text-foreground/70 mb-4">
              InkWell began in 2023 when a group of writers, designers, and developers came together with a shared frustration: existing blogging platforms were either too complex or too limiting.
            </p>
            <p className="text-lg text-foreground/70 mb-4">
              We set out to create something different—a platform that combines beautiful design with powerful features, all while keeping the focus on what matters most: the content.
            </p>
            <p className="text-lg text-foreground/70">
              Today, InkWell hosts thousands of articles from writers around the world, covering topics from technology and design to personal development and creativity.
            </p>
          </div>
          <div className="relative animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full -z-10 animate-pulse-light"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full -z-10 animate-pulse-light" style={{ animationDelay: '1s' }}></div>
            <img
              src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="A notebook and coffee on a desk"
              className="rounded-lg w-full h-auto object-cover shadow-lg transform hover:scale-[1.02] transition-transform"
            />
          </div>
        </div>
        
        <div className="mb-20">
          <h2 className="text-3xl text-center mb-12 animate-fade-in" style={{ animationDelay: '150ms' }}>Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card 
                key={member.name} 
                className="overflow-hidden border bg-card hover:shadow-lg transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${300 + (index * 100)}ms` }}
              >
                <div className="p-6 text-center">
                  <div className="w-32 h-32 mx-auto mb-6 relative">
                    <div className="absolute inset-0 rounded-full bg-primary/10 transform scale-[0.8] group-hover:scale-[0.95] transition-transform duration-500"></div>
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover border-2 border-primary/20 relative z-10 transform group-hover:scale-[1.1] transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-sm text-primary/80 mb-3">{member.role || 'Editor'}</p>
                  <p className="text-foreground/70">{member.bio}</p>
                  <div className="flex justify-center space-x-3 mt-4">
                    <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="relative overflow-hidden rounded-2xl animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent -z-10"></div>
          <div className="p-10 md:p-16">
            <h2 className="text-3xl mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                  </svg>
                </div>
                <h3 className="text-xl mb-3">Quality Over Quantity</h3>
                <p className="text-foreground/70">
                  We believe in publishing fewer, more thoughtful articles rather than flooding the web with content.
                </p>
              </div>
              <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                  </svg>
                </div>
                <h3 className="text-xl mb-3">Design Matters</h3>
                <p className="text-foreground/70">
                  Good design isn't just about aesthetics—it's about creating experiences that respect and engage readers.
                </p>
              </div>
              <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl mb-3">Inclusivity</h3>
                <p className="text-foreground/70">
                  We're committed to creating a platform where diverse voices and perspectives can thrive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
