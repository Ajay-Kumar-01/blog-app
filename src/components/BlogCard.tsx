"use client";

import type { BlogPost } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
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

  // Determine data-ai-hint for placeholder images
  let aiHint = "placeholder image";
  if (post.id === '1' && post.imageUrl?.includes('placehold.co')) {
    aiHint = "mountains nature";
  } else if (post.id === '2' && post.imageUrl?.includes('placehold.co')) {
    aiHint = "book storytelling";
  } else if (post.imageUrl?.includes('placehold.co')) {
    aiHint = "abstract modern"; // Generic hint for other placeholders
  }


  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeIn flex flex-col overflow-hidden" style={{ animationDelay }}>
      {post.imageUrl && (
        <div className="relative w-full h-48 sm:h-56">
          <Image
            src={post.imageUrl}
            alt={`Cover image for ${post.title}`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={post.imageUrl.includes('placehold.co') ? aiHint : undefined}
          />
        </div>
      )}
      <CardHeader className={post.imageUrl ? "pt-4" : ""}>
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
      <CardContent className="flex-grow">
        <p className="font-body text-foreground leading-relaxed line-clamp-3">{post.summary || post.content.substring(0,150) + "..."}</p>
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
