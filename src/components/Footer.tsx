"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--background-secondary)] py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">VietRocHack</h3>
            <p className="text-[var(--foreground-secondary)]">
              A Vietnamese hackathon team from the University of Rochester dedicated to creativity and innovation.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-[var(--foreground-secondary)] hover:text-[var(--accent-cyan)] transition">Home</Link>
              </li>
              <li>
                <Link href="/team" className="text-[var(--foreground-secondary)] hover:text-[var(--accent-cyan)] transition">Team</Link>
              </li>
              <li>
                <Link href="/projects" className="text-[var(--foreground-secondary)] hover:text-[var(--accent-cyan)] transition">Projects</Link>
              </li>
              <li>
                <Link href="/vision" className="text-[var(--foreground-secondary)] hover:text-[var(--accent-cyan)] transition">Vision</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[var(--foreground-secondary)] hover:text-[var(--accent-cyan)] transition">Email</a>
              </li>
              <li>
                <a href="#" className="text-[var(--foreground-secondary)] hover:text-[var(--accent-cyan)] transition">GitHub</a>
              </li>
              <li>
                <a href="#" className="text-[var(--foreground-secondary)] hover:text-[var(--accent-cyan)] transition">LinkedIn</a>
              </li>
              <li>
                <a href="#" className="text-[var(--foreground-secondary)] hover:text-[var(--accent-cyan)] transition">Instagram</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <Link href="/contact" className="px-4 py-2 bg-[var(--accent-red)] text-white rounded-lg font-medium hover:bg-opacity-90 transition inline-block">
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