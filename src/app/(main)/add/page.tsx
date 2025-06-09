"use client";

import BlogForm from '@/components/BlogForm';
import { useBlog } from '@/contexts/BlogContext';
import { summarizeBlogPost } from '@/ai/flows/summarize-blog-post';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";


export default function AddBlogPage() {
  const { addPost, isLoading, setIsLoading } = useBlog();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: { title: string; content: string; date: string }) => {
    setIsLoading(true);
    try {
      const aiResult = await summarizeBlogPost({ content: data.content });
      const summary = aiResult.summary;
      
      addPost({
        title: data.title,
        content: data.content,
        date: new Date(data.date).toISOString(), // Ensure ISO string format
        summary: summary,
      });

      toast({
        title: "Blog Post Added!",
        description: `"${data.title}" has been successfully created.`,
        variant: "default",
      });
      router.push('/');
    } catch (error) {
      console.error("Error adding blog post:", error);
      toast({
        title: "Error",
        description: "Failed to add blog post. AI summary might have failed or another issue occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <BlogForm onSubmit={handleSubmit} isSubmitting={isLoading} />
    </div>
  );
}
