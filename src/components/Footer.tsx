export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="font-body text-sm">
          &copy; {new Date().getFullYear()} Simple Blogger. All rights reserved.
        </p>
        <p className="font-body text-xs mt-1">
          Crafted with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
