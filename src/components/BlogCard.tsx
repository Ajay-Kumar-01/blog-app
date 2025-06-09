"use client";

import type { BlogPost } from '@/lib/types';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const animationDelay = `${index * 100}ms`;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeIn" style={{ animationDelay }}>
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary hover:text-accent transition-colors">
          <Link href={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center text-muted-foreground pt-1">
          <CalendarDays size={16} className="mr-2" />
          <span className="font-body">{format(new Date(post.date), 'MMMM d, yyyy')}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-body text-foreground leading-relaxed line-clamp-3">{post.summary}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="text-primary hover:text-accent p-0">
          <Link href={`/blog/${post.id}`} className="font-body flex items-center">
            Read More <ArrowRight size={16} className="ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
