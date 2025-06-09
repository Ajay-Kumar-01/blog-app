import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BlogProvider } from '@/contexts/BlogContext';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BlogProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </div>
    </BlogProvider>
  );
}
