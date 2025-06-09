"use client";

import type { BlogPost } from '@/lib/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface BlogContextType {
  posts: BlogPost[];
  addPost: (postData: Omit<BlogPost, 'id'>) => void;
  getPostById: (id: string) => BlogPost | undefined;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

// Helper to get initial posts from localStorage or return default
const getInitialPosts = (): BlogPost[] => {
  if (typeof window === 'undefined') {
    return []; // Default empty if on server
  }
  const storedPosts = localStorage.getItem('blogPosts');
  if (storedPosts) {
    try {
      return JSON.parse(storedPosts);
    } catch (error) {
      console.error("Failed to parse posts from localStorage", error);
      return [];
    }
  }
  // Some initial blog posts for demonstration
  return [
    {
      id: '1',
      title: 'Exploring the Mountains',
      content: 'The journey to the misty mountains was an adventure of a lifetime. We saw breathtaking views and experienced the raw beauty of nature. The air was crisp, and the silence was only broken by the rustling leaves and distant calls of birds. This is a place I will never forget.',
      date: new Date('2024-07-15').toISOString(),
      summary: 'A memorable journey into the misty mountains, filled with breathtaking views and the serene beauty of nature.'
    },
    {
      id: '2',
      title: 'The Art of Storytelling',
      content: 'Storytelling is an ancient art form that connects us across generations. A good story can transport you to another world, evoke deep emotions, and teach valuable lessons. Whether through words, images, or music, the power of narrative is undeniable.',
      date: new Date('2024-07-20').toISOString(),
      summary: 'An exploration of storytelling as an ancient art form, highlighting its power to connect, evoke emotion, and teach.'
    }
  ];
};


export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // For AI summary loading

  useEffect(() => {
    // Load posts on client mount
    setPosts(getInitialPosts());
  }, []);

  useEffect(() => {
    // Persist posts to localStorage whenever they change (client-side only)
    if (typeof window !== 'undefined' && posts.length > 0) { // Only save if posts array is not in its initial empty state before hydration
        localStorage.setItem('blogPosts', JSON.stringify(posts));
    }
  }, [posts]);


  const addPost = (postData: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...postData,
      id: crypto.randomUUID(),
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const getPostById = (id: string): BlogPost | undefined => {
    return posts.find(post => post.id === id);
  };

  return (
    <BlogContext.Provider value={{ posts, addPost, getPostById, isLoading, setIsLoading }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
