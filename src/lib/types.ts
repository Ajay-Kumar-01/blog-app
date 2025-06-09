export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string; // Store as ISO string, format for display
  summary: string;
  imageUrl?: string; // Optional: URL or data URI for the post image
}
