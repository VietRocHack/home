"use client";

import React from 'react';
import Image from 'next/image';
import { Meme } from '@/utils/dataUtils';

interface MemeLightboxProps {
  isOpen: boolean;
  meme: Meme | null;
  getImagePath: (path: string) => string;
  onClose: () => void;
}

export default function MemeLightbox({
  isOpen,
  meme,
  getImagePath,
  onClose
}: MemeLightboxProps) {
  if (!isOpen || !meme) return null;
  
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full max-h-[85vh] rounded-lg bg-[#121212] overflow-visible"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 left-3 md:top-6 md:left-6 right-auto bg-black/60 hover:bg-black/80 p-2 md:p-3 rounded-full z-20 pointer-events-auto"
          onClick={onClose}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative w-full h-[70vh]">
          <Image
            src={getImagePath(meme.src)}
            alt={meme.caption}
            className="object-contain"
            fill
            sizes="100vw"
            priority
            unoptimized={meme.src.startsWith('http')}
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-medium">{meme.caption}</h3>
          <p className="text-[var(--foreground-secondary)] mt-1">{meme.context}</p>
        </div>
      </div>
    </div>
  );
}