"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--background-secondary)] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl hover:text-[var(--accent-red)] transition-colors duration-200">
          VietRocHack
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link 
            href="/" 
            className={`${isActive('/') ? 'text-[var(--accent-cyan)]' : 'text-[var(--foreground)]'} hover:text-[var(--accent-cyan)] transition-all duration-200 hover:translate-y-[-2px] font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[var(--accent-cyan)] after:transition-all after:duration-300 hover:after:w-full`}
          >
            Home
          </Link>
          <Link 
            href="/team" 
            className={`${isActive('/team') ? 'text-[var(--accent-cyan)]' : 'text-[var(--foreground)]'} hover:text-[var(--accent-cyan)] transition-all duration-200 hover:translate-y-[-2px] font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[var(--accent-cyan)] after:transition-all after:duration-300 hover:after:w-full`}
          >
            Team
          </Link>
          <Link 
            href="/projects" 
            className={`${isActive('/projects') ? 'text-[var(--accent-cyan)]' : 'text-[var(--foreground)]'} hover:text-[var(--accent-cyan)] transition-all duration-200 hover:translate-y-[-2px] font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[var(--accent-cyan)] after:transition-all after:duration-300 hover:after:w-full`}
          >
            Projects
          </Link>
          <Link 
            href="/vision" 
            className={`${isActive('/vision') ? 'text-[var(--accent-cyan)]' : 'text-[var(--foreground)]'} hover:text-[var(--accent-cyan)] transition-all duration-200 hover:translate-y-[-2px] font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[var(--accent-cyan)] after:transition-all after:duration-300 hover:after:w-full`}
          >
            Vision
          </Link>
          <Link 
            href="/contact" 
            className={`${isActive('/contact') ? 'text-[var(--accent-cyan)]' : 'text-[var(--foreground)]'} hover:text-[var(--accent-cyan)] transition-all duration-200 hover:translate-y-[-2px] font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[var(--accent-cyan)] after:transition-all after:duration-300 hover:after:w-full`}
          >
            Contact
          </Link>
        </nav>
        
        {/* Mobile menu button */}
        <button className="md:hidden text-[var(--foreground)] hover:text-[var(--accent-cyan)] transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
} 