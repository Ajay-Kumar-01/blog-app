"use client";

import { useBlog } from '@/contexts/BlogContext';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { BlogPost } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CalendarDays, FileWarning } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BlogDetailPage() {
  const { getPostById } = useBlog();
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const id = typeof params.id === 'string' ? params.id : undefined;

  useEffect(() => {
    if (id) {
      const foundPost = getPostById(id);
      setPost(foundPost);
    }
    setLoading(false);
  }, [id, getPostById]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="font-headline text-2xl text-primary">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-16 animate-fadeIn">
        <FileWarning size={64} className="mx-auto text-destructive mb-4" />
        <h1 className="text-4xl font-headline text-destructive mb-4">Post Not Found</h1>
        <p className="font-body text-lg text-muted-foreground mb-8">
          Sorry, we couldn't find the blog post you're looking for.
        </p>
        <Button onClick={() => router.push('/')} className="font-body">
          <ArrowLeft size={20} className="mr-2" /> Go Back to Home
        </Button>
      </div>
    );
  }

  // Determine data-ai-hint for placeholder images
  let aiHint = "placeholder image";
  if (post.id === '1' && post.imageUrl?.includes('placehold.co')) {
    aiHint = "mountains nature";
  } else if (post.id === '2' && post.imageUrl?.includes('placehold.co')) {
    aiHint = "book storytelling";
  } else if (post.imageUrl?.includes('placehold.co')) {
    aiHint = "abstract modern";
  }

  return (
    <article className="max-w-4xl mx-auto animate-fadeIn">
      <Button onClick={() => router.back()} variant="outline" className="mb-8 font-body">
        <ArrowLeft size={18} className="mr-2" /> Back to Posts
      </Button>
      <Card className="shadow-xl overflow-hidden">
        {post.imageUrl && (
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={post.imageUrl}
              alt={`Cover image for ${post.title}`}
              layout="fill"
              objectFit="cover"
              priority={true} // Prioritize loading for LCP
              data-ai-hint={post.imageUrl.includes('placehold.co') ? aiHint : undefined}
            />
          </div>
        )}
        <CardHeader className={`pb-4 ${post.imageUrl ? 'pt-6' : ''}`}>
          <h1 className="text-4xl md:text-5xl font-headline text-primary mb-3">{post.title}</h1>
          <div className="flex items-center text-muted-foreground text-sm">
            <CalendarDays size={16} className="mr-2" />
            <span className="font-body">Published on {format(new Date(post.date), 'MMMM d, yyyy')}</span>
          </div>
        </CardHeader>
        <CardContent>
          {post.summary && (
            <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground my-6 py-3 bg-accent/10 rounded-r-md">
              <p className="font-body text-lg leading-relaxed">{post.summary}</p>
            </blockquote>
          )}
          <div className="prose prose-lg max-w-none font-body text-foreground mt-6"
            style={{
              // @ts-ignore
              '--tw-prose-body': 'hsl(var(--foreground))',
              '--tw-prose-headings': 'hsl(var(--primary))',
              '--tw-prose-links': 'hsl(var(--accent))',
              '--tw-prose-bold': 'hsl(var(--foreground))',
              '--tw-prose-bullets': 'hsl(var(--muted-foreground))',
              '--tw-prose-hr': 'hsl(var(--border))',
              '--tw-prose-quotes': 'hsl(var(--muted-foreground))',
              '--tw-prose-quote-borders': 'hsl(var(--accent))',
            }}
          >
            {post.content.split('\n').map((paragraph, index) => (
              paragraph.trim() !== '' && <p key={index}>{paragraph}</p>
            ))}
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
