"use client";

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryPhoto } from './types';

interface PhotoLightboxProps {
  isOpen: boolean;
  photo: GalleryPhoto | null;
  photos: GalleryPhoto[];
  isFullscreen: boolean;
  isSlideshow: boolean;
  getImagePath: (path: string) => string;
  onClose: () => void;
  onToggleFullscreen: () => void;
  onToggleSlideshow: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function PhotoLightbox({
  isOpen,
  photo,
  photos,
  isFullscreen,
  isSlideshow,
  getImagePath,
  onClose,
  onToggleFullscreen,
  onToggleSlideshow,
  onPrevious,
  onNext
}: PhotoLightboxProps) {
  if (!isOpen || !photo) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 bg-black ${isFullscreen ? '' : 'bg-opacity-90'} z-50 flex items-center justify-center p-4 ${isFullscreen ? 'p-0' : ''}`}
        onClick={onClose}
      >
        <motion.div 
          className={`relative ${isFullscreen ? 'w-full h-full' : 'max-w-5xl w-full max-h-[85vh] rounded-lg overflow-hidden'} flex flex-col`}
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
        >
          <div className={`relative w-full ${isFullscreen ? 'h-full' : 'h-[70vh]'}`}>
            <Image
              src={getImagePath(photo.photo.src)}
              alt={photo.photo.caption}
              fill
              className="object-contain"
              sizes="100vw"
              quality={90}
              priority
            />
          </div>
          
          {!isFullscreen && (
            <div className="bg-[#121212] p-4 rounded-b-lg">
              <h3 className="text-xl font-medium">{photo.photo.caption}</h3>
              <div className="flex justify-between items-center mt-1">
                <p className="text-[var(--foreground-secondary)]">
                  {photo.hackathon.name} • {photo.hackathon.date}
                </p>
                <div className="flex space-x-2">
                  <button 
                    className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full"
                    onClick={onToggleSlideshow}
                    title={isSlideshow ? "Stop Slideshow" : "Start Slideshow"}
                  >
                    {isSlideshow ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>
                  <button 
                    className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full"
                    onClick={onToggleFullscreen}
                    title="Toggle Fullscreen"
                  >
                    {isFullscreen ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L4 4m0 0h5m-5 0v5m16 7l-5 5m0 0v-5m5 5h-5" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Navigation arrows */}
          {photos.length > 1 && (
            <>
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 p-3 rounded-full z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  onPrevious();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 p-3 rounded-full z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          
          {/* Close button in fullscreen */}
          {isFullscreen && (
            <button 
              className="absolute right-4 top-4 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full z-10"
              onClick={() => {
                if (isSlideshow) {
                  onToggleSlideshow();
                }
                onToggleFullscreen();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          
          {/* Close button */}
          {!isFullscreen && (
            <button 
              className="absolute right-4 top-4 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full"
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 