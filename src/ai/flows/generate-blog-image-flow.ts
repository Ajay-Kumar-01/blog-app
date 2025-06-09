'use server';
/**
 * @fileOverview A blog post image generation AI agent.
 *
 * - generateBlogImage - A function that handles the blog post image generation process.
 * - GenerateBlogImageInput - The input type for the generateBlogImage function.
 * - GenerateBlogImageOutput - The return type for the generateBlogImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogImageInputSchema = z.object({
  title: z.string().describe('The title of the blog post.'),
  summary: z.string().describe('A concise summary of the blog post content.'),
});
export type GenerateBlogImageInput = z.infer<typeof GenerateBlogImageInputSchema>;

const GenerateBlogImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image for the blog post.'),
});
export type GenerateBlogImageOutput = z.infer<typeof GenerateBlogImageOutputSchema>;

export async function generateBlogImage(input: GenerateBlogImageInput): Promise<GenerateBlogImageOutput> {
  return generateBlogImageFlow(input);
}

const generateBlogImageFlow = ai.defineFlow(
  {
    name: 'generateBlogImageFlow',
    inputSchema: GenerateBlogImageInputSchema,
    outputSchema: GenerateBlogImageOutputSchema,
  },
  async (input) => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp',
      prompt: `Generate a visually appealing and relevant blog post cover image.
      The image should be abstract, conceptual, or illustrative, suitable for a general interest or tech blog.
      Style: modern, clean, digital art. Avoid text in the image.
      Blog Post Title: "${input.title}"
      Blog Post Summary: "${input.summary}"`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // Must include TEXT even if only IMAGE is primary
        // Optional: Specify aspect ratio if the model supports it, e.g., target_size: "16:9"
        // For now, we'll rely on model defaults and handle aspect ratio in display.
      },
       safetySettings: [ // Added safety settings to be less restrictive for creative content
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
      ],
    });

    if (!media || !media.url) {
      throw new Error('Image generation failed or returned no media URL.');
    }
    
    return { imageUrl: media.url };
  }
);
