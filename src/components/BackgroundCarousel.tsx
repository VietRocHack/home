"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { getAllPhotos } from '@/utils/dataUtils';

// Create a custom event name for logo-background synchronization
export const LOGO_CHANGE_EVENT = 'vietrochack-logo-change';

interface BackgroundCarouselProps {
  children: React.ReactNode;
}

export default function BackgroundCarousel({ children }: BackgroundCarouselProps) {
  // Get all photos from the hackathons data
  const allPhotos = getAllPhotos().map(item => item.photo.src);
  allPhotos.unshift('/team/bitcamp_2025/demo_team_pic.jpg');
  // Only track a single active image index
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  
  // Timer references
  const fadeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const carouselTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isBusy = useRef(false);
  const prevImageIndex = useRef<number | null>(null);

  // Clear all active timers
  const clearAllTimers = useCallback(() => {
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
    if (carouselTimerRef.current) {
      clearInterval(carouselTimerRef.current);
      carouselTimerRef.current = null;
    }
  }, []);

  // Get a random image index that's different from the current one
  const getRandomImageIndex = useCallback((): number => {
    if (allPhotos.length <= 1) return 0;
    
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * allPhotos.length);
    } while (randomIndex === activeImageIndex || randomIndex === prevImageIndex.current);
    
    return randomIndex;
  }, [allPhotos.length, activeImageIndex]);

  // Function to advance to the next image
  const advanceToNextImage = useCallback(() => {
    if (isBusy.current || allPhotos.length === 0) return;
    isBusy.current = true;
    
    // Fade out current image
    setFadeIn(false);
    
    // Wait for fade-out to complete, then change image
    fadeTimerRef.current = setTimeout(() => {
      prevImageIndex.current = activeImageIndex;
      const newIndex = getRandomImageIndex();
      setActiveImageIndex(newIndex);
      
      // Wait a moment for the new image to load, then fade in
      setTimeout(() => {
        setFadeIn(true);
        isBusy.current = false;
      }, 50);
    }, 500); // Half the transition time for fade-out
  }, [allPhotos.length, getRandomImageIndex, activeImageIndex]);

  

  // Start carousel timer
  const startCarouselTimer = useCallback(() => {
    // Clear any existing timer first
    if (carouselTimerRef.current) {
      clearInterval(carouselTimerRef.current);
    }
    
    // Start a new timer
    carouselTimerRef.current = setInterval(() => {
      advanceToNextImage();
    }, 8000);
  }, [advanceToNextImage]);

  // Handle logo change event (placed after startCarouselTimer to avoid TDZ)
  useEffect(() => {
    const handleLogoChange = () => {
      // Cancel any existing timers
      clearAllTimers();
      
      // Advance to the next image
      advanceToNextImage();
      
      // Start new timer after advancing
      startCarouselTimer();
    };
    
    window.addEventListener(LOGO_CHANGE_EVENT, handleLogoChange);
    return () => {
      window.removeEventListener(LOGO_CHANGE_EVENT, handleLogoChange);
    };
  }, [advanceToNextImage, clearAllTimers, startCarouselTimer]);

  // Start carousel on mount and handle cleanup
  useEffect(() => {
    // Ensure image is faded in at start
    setFadeIn(true);
    
    // Start the carousel timer
    startCarouselTimer();
    
    // Cleanup on unmount
    return clearAllTimers;
  }, [startCarouselTimer, clearAllTimers]);

  // Helper to format the image path correctly
  const getImagePath = (path: string) => {
    if (!path) return '/placeholder-image.svg';
    // If path is a URL (starts with http:// or https://), return it as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    // Otherwise, treat as local path
    return path.startsWith('/') ? path : `/${path}`;
  };

  // If there are no photos, just render the children
  if (allPhotos.length === 0) {
    return (
      <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[#0F0F0F] z-0"></div>
        <div className="relative z-20 w-full h-full flex items-center justify-center py-16">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      {/* Single background image with fade effect */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-0 
          ${fadeIn ? 'opacity-40' : 'opacity-0'}`}
      >
        <Image
          src={getImagePath(allPhotos[activeImageIndex])}
          alt="Team background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          unoptimized={allPhotos[activeImageIndex].startsWith('http')}
        />
      </div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-opacity-60 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 w-full h-full flex items-center justify-center py-16">
        {children}
      </div>
    </div>
  );
} 