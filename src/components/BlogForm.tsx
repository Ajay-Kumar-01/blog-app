"use client";

import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface BlogFormProps {
  onSubmit: (data: { title: string; content: string; date: string }) => Promise<void>;
  isSubmitting: boolean;
}

export default function BlogForm({ onSubmit, isSubmitting }: BlogFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !content || !date) {
      alert('Please fill in all fields.'); // Basic validation
      return;
    }
    await onSubmit({ title, content, date });
    // Optionally clear form fields after submission
    // setTitle('');
    // setContent('');
    // setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-xl animate-fadeIn">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-primary">Create a New Blog Post</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="font-headline text-lg">Title</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog post title"
              required
              className="font-body"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content" className="font-headline text-lg">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post content here..."
              required
              rows={10}
              className="font-body"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date" className="font-headline text-lg">Publication Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="font-body"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting} className="w-full font-body text-lg py-6">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              'Add Blog Post'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
