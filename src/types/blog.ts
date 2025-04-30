
export interface Author {
  name: string;
  avatar: string;
  bio: string;
  role?: string;
  social?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  category: string;
  author: Author;
  featured?: boolean;
  readingTime?: string;
  tags?: string[];
  likes?: number;
  views?: number;
}

export interface BlogCategory {
  name: string;
  slug: string;
  description?: string;
  postCount?: number;
}

