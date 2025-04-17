"use client";

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Meme } from '@/utils/dataUtils';

interface MemeLightboxProps {
  isOpen: boolean;
  meme: Meme | null;
  memes: Meme[];
  isFullscreen: boolean;
  getImagePath: (path: string) => string;
  onClose: () => void;
  onToggleFullscreen: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function MemeLightbox({
  isOpen,
  meme,
  memes,
  isFullscreen,
  getImagePath,
  onClose,
  onToggleFullscreen,
  onPrevious,
  onNext
}: MemeLightboxProps) {
  if (!isOpen || !meme) return null;
  
  const currentIndex = memes.findIndex(m => m.id === meme.id);
  const totalCount = memes.length;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 flex items-center justify-center ${isFullscreen ? 'bg-black' : 'bg-black/90'}`}
        onClick={onClose}
      >
        {/* Content */}
        <div 
          className={`relative max-w-6xl mx-auto p-4 ${isFullscreen ? 'w-full h-full' : 'w-11/12 max-h-[90vh]'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Navigation buttons */}
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full z-10 text-white hover:bg-black/80"
            onClick={onPrevious}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full z-10 text-white hover:bg-black/80"
            onClick={onNext}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          
          {/* Close button */}
          <button 
            className="absolute right-4 top-4 bg-black/50 p-2 rounded-full z-10 text-white hover:bg-black/80"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Fullscreen button */}
          <button 
            className="absolute right-16 top-4 bg-black/50 p-2 rounded-full z-10 text-white hover:bg-black/80"
            onClick={onToggleFullscreen}
          >
            {isFullscreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M15 9H19.5M15 9V4.5M15 15V19.5M15 15H19.5M9 15H4.5M9 15V19.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m9 0v4.5m0-4.5h4.5m0 9v4.5m0-4.5h-4.5m-9 0v4.5m0-4.5h-4.5" />
              </svg>
            )}
          </button>
          
          {/* Photo */}
          <div className={`relative ${isFullscreen ? 'h-full' : 'max-h-[70vh]'} flex flex-col items-center justify-center`}>
            <div className={`relative ${isFullscreen ? 'h-[80vh]' : 'h-[60vh]'} w-full`}>
              <Image
                src={getImagePath(meme.src)}
                alt={meme.caption}
                className="object-contain"
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
                unoptimized={meme.src.startsWith('http')}
              />
            </div>
            
            {/* Caption */}
            <div className="bg-black/70 p-4 w-full mt-4 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white text-xl font-medium">{meme.caption}</h3>
                <p className="text-gray-300">{currentIndex + 1} / {totalCount}</p>
              </div>
              <p className="text-gray-300 mb-2">{meme.date}</p>
              <p className="text-gray-400">{meme.context}</p>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {meme.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-[var(--accent-yellow)] text-black font-medium rounded-md text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 