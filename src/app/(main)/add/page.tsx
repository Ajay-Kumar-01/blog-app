"use client";

import BlogForm from '@/components/BlogForm';
import { useBlog } from '@/contexts/BlogContext';
import { summarizeBlogPost } from '@/ai/flows/summarize-blog-post';
import { generateBlogImage } from '@/ai/flows/generate-blog-image-flow';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

export default function AddBlogPage() {
  const { addPost, isLoading, setIsLoading } = useBlog();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: { title: string; content: string; date: string }) => {
    setIsLoading(true);
    let summary = '';
    let imageUrl: string | undefined = undefined;

    try {
      // Generate summary
      try {
        const aiSummaryResult = await summarizeBlogPost({ content: data.content });
        summary = aiSummaryResult.summary;
        toast({
          title: "Summary Generated!",
          description: "AI has successfully created a summary for your post.",
          variant: "default",
        });
      } catch (summaryError) {
        console.error("Error generating summary:", summaryError);
        toast({
          title: "Summary Generation Failed",
          description: "Could not generate AI summary. Proceeding without it.",
          variant: "destructive",
        });
        // summary will remain empty
      }

      // Generate image (even if summary failed, try to use title)
      try {
        const aiImageResult = await generateBlogImage({ title: data.title, summary: summary || data.content.substring(0, 200) }); // Use content snippet if summary failed
        imageUrl = aiImageResult.imageUrl;
        toast({
          title: "Image Generated!",
          description: "AI has successfully created a cover image for your post.",
          variant: "default",
        });
      } catch (imageError) {
        console.error("Error generating image:", imageError);
        toast({
          title: "Image Generation Failed",
          description: "Could not generate AI cover image. Using a default placeholder.",
          variant: "destructive",
        });
        imageUrl = 'https://placehold.co/600x400.png'; // Fallback placeholder
      }
      
      addPost({
        title: data.title,
        content: data.content,
        date: new Date(data.date).toISOString(),
        summary: summary,
        imageUrl: imageUrl,
      });

      toast({
        title: "Blog Post Added!",
        description: `"${data.title}" has been successfully created.`,
        variant: "default",
        duration: 5000,
      });
      router.push('/');
    } catch (error) {
      console.error("Error adding blog post:", error);
      toast({
        title: "Error Adding Post",
        description: "An unexpected error occurred while adding the blog post.",
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
