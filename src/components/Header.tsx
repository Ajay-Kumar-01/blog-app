"use client";

import Link from 'next/link';
import { BookOpenText, PlusCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="text-3xl font-headline hover:opacity-80 transition-opacity">
          Simple Blogger
        </Link>
        <nav className="mt-4 sm:mt-0">
          <ul className="flex space-x-6 items-center">
            <li>
              <Link href="/" className="font-body text-lg hover:text-accent-foreground transition-colors flex items-center space-x-2">
                <BookOpenText size={20} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link href="/add" className="font-body text-lg hover:text-accent-foreground transition-colors flex items-center space-x-2">
                <PlusCircle size={20} />
                <span>Add New Blog</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
