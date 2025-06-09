"use client";

import BlogCard from '@/components/BlogCard';
import { useBlog } from '@/contexts/BlogContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function HomePage() {
  const { posts } = useBlog();

  return (
    <div className="space-y-12">
      <section className="text-center py-8 bg-card rounded-lg shadow-md animate-fadeIn">
        <h1 className="text-5xl font-headline text-primary mb-4">Welcome to Simple Blogger</h1>
        <p className="text-xl font-body text-muted-foreground max-w-2xl mx-auto">
          Discover insightful articles, stories, and ideas.
        </p>
      </section>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 animate-fadeIn" style={{animationDelay: '200ms'}}>
          <FileText size={64} className="mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-headline text-primary mb-2">No Blog Posts Yet</h2>
          <p className="font-body text-muted-foreground mb-6">
            It looks like there are no blog posts available at the moment. Why not add one?
          </p>
          <Button asChild size="lg">
            <Link href="/add" className="font-body">Add Your First Blog Post</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
