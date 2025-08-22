"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--background-secondary)] py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About</h3>
            <p className="text-[var(--foreground-secondary)] mb-2">Team of Vietnamese students from University of Rochester who build cool things in hackathons.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Pages</h3>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-[var(--foreground-secondary)] hover:text-[var(--accent-yellow)] transition-all duration-200 hover:translate-x-1 inline-block">Home</Link>
              <Link href="/team" className="text-[var(--foreground-secondary)] hover:text-[var(--accent-yellow)] transition-all duration-200 hover:translate-x-1 inline-block">Team</Link>
              <Link href="/projects" className="text-[var(--foreground-secondary)] hover:text-[var(--accent-yellow)] transition-all duration-200 hover:translate-x-1 inline-block">Projects</Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-[var(--foreground-secondary)] hover:text-[var(--accent-yellow)] transition-all duration-200 hover:translate-x-1 inline-block">Email</a>
              <a href="#" className="text-[var(--foreground-secondary)] hover:text-[var(--accent-yellow)] transition-all duration-200 hover:translate-x-1 inline-block">GitHub</a>
              <a href="#" className="text-[var(--foreground-secondary)] hover:text-[var(--accent-yellow)] transition-all duration-200 hover:translate-x-1 inline-block">LinkedIn</a>
              <a href="#" className="text-[var(--foreground-secondary)] hover:text-[var(--accent-yellow)] transition-all duration-200 hover:translate-x-1 inline-block">Instagram</a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <Link href="/contact" className="px-4 py-2 bg-[var(--accent-red)] text-white rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200 inline-block hover:shadow-lg hover:shadow-[var(--accent-red)]/20 hover:translate-y-[-2px] active:translate-y-0 active:shadow-sm">
              Get in Touch
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-[var(--foreground-secondary)]">
          <p>© {new Date().getFullYear()} VietRocHack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 