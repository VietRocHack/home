"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/Button';
import { motion, AnimatePresence } from 'framer-motion';

// Vietnam Flag component using the SVG from public directory
const VietnamFlag = () => (
  <Image 
    src="/Flag_of_Vietnam.svg" 
    alt="Vietnam Flag" 
    width={24} 
    height={16} 
    className="inline-block align-middle mx-1 animate-pulse"
  />
);

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState("auto");

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Disable scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (logoRef.current) {
      if (isExpanded) {
        setWidth(`${logoRef.current.scrollWidth + 40}px`); // Added extra padding
      } else {
        setWidth("90px"); // Increased width of collapsed state
      }
    }
  }, [isExpanded]);

  const isActive = (path: string) => {
    return pathname === path;
  };
  
  const handleLogoClick = () => {
    router.push('/');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/team', label: 'Team' },
    { path: '/projects', label: 'Projects' },
    { path: '/journey', label: 'Journey' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#121212]/90 backdrop-blur-md border-b border-gray-800/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
        <Link href="/">
          <div 
            ref={logoRef}
            onClick={handleLogoClick}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            style={{ width }}
            className={`font-bold text-2xl cursor-pointer transition-all duration-500 overflow-hidden whitespace-nowrap ${
              isExpanded 
                ? 'px-6 py-2 rounded-md bg-[#1A1A1A] shadow-inner shadow-black/50' 
                : 'hover:text-[var(--accent-red)]'
            }`}
          >
            <div className="flex items-center">
              {isExpanded ? (
                <>
                  <span className="text-[var(--accent-red)]">{"{"}</span>
                  <span>VietRocHack</span>
                  <VietnamFlag />
                  <span className="text-[var(--accent-red)]">{"}"}</span>
                </>
              ) : (
                <span>
                  <span className="text-[var(--accent-red)]">{"{"}</span>
                  <span>VRH</span>
                  <span className="text-[var(--accent-red)]">{"}"}</span>
                </span>
              )}
            </div>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`${isActive(link.path) ? 'text-[var(--accent-yellow)] after:w-full after:opacity-100' : 'text-[var(--foreground)]'} hover:text-[var(--accent-yellow)] transition-all duration-300 hover:translate-y-[-2px] font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[var(--accent-yellow)] after:transition-all after:duration-300 hover:after:w-full after:opacity-70 hover:after:opacity-100`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:block">
          <Link href="/rsvp">
            <Button 
              variant="primary" 
              className="px-6 py-2 shadow-lg shadow-[var(--accent-red)]/20 hover:shadow-[var(--accent-red)]/40 transition-all duration-300"
            >
              Join Team
            </Button>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[var(--foreground)] hover:text-[var(--accent-yellow)] transition-colors duration-200 p-2 rounded-lg hover:bg-white/5 active:bg-white/10"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#121212] border-b border-gray-800"
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`block py-3 px-4 rounded-lg transition-all duration-200 ${isActive(link.path) ? 'text-[var(--accent-yellow)] bg-white/5 font-medium' : 'text-[var(--foreground)] hover:bg-white/5'}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 pb-4">
                <Link href="/rsvp">
                  <Button 
                    variant="primary" 
                    className="w-full py-3 mt-2 flex justify-center items-center"
                  >
                    Join Team
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 