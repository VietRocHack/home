"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// List all team photos
const teamPhotos = [
  '/team/hophacks_2024_demo_team_pic.jpg',
  '/team/hophacks_2024_team_find_out_we_win.png',
  '/team/hophacks_2024_team_third_prize_pic.jpg',
  '/team/calhacks_2024_team_at_apple_hq.jpg',
  '/team/calhacks_2024_team_with_lananh_in_sanfrancisco.jpg',
  '/team/calhacks_2024_team_berkeley_backdrop_with_bear.jpg',
  '/team/calhacks_2024_demo_team_pic.jpg',
  '/team/calhacks_2024_team_at_google_hq.jpg',
  '/team/calhacks_2024_team_vapi_award_pic.jpg',
  '/team/calhacks_2024_team_people_choice_award_pic.jpg',
  '/team/hackutd_2024_team_at_introduction_ceremony.jpg',
  '/team/bitcamp_2025_demo_team_pic.jpg'
];

// Create a custom event name for logo-background synchronization
export const LOGO_CHANGE_EVENT = 'vietrochack-logo-change';

interface BackgroundCarouselProps {
  children: React.ReactNode;
}

export default function BackgroundCarousel({ children }: BackgroundCarouselProps) {
  // Only track a single active image index
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  
  // Timer references
  const fadeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const carouselTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isBusy = useRef(false);

  // Clear all active timers
  const clearAllTimers = () => {
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
    if (carouselTimerRef.current) {
      clearInterval(carouselTimerRef.current);
      carouselTimerRef.current = null;
    }
  };

  // Function to advance to the next image
  const advanceToNextImage = () => {
    if (isBusy.current) return;
    isBusy.current = true;
    
    // Fade out current image
    setFadeIn(false);
    
    // Wait for fade-out to complete, then change image
    fadeTimerRef.current = setTimeout(() => {
      setActiveImageIndex(prevIndex => (prevIndex + 1) % teamPhotos.length);
      
      // Wait a moment for the new image to load, then fade in
      setTimeout(() => {
        setFadeIn(true);
        isBusy.current = false;
      }, 50);
    }, 500); // Half the transition time for fade-out
  };

  // Handle logo change event
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
  }, []);

  // Start carousel timer
  const startCarouselTimer = () => {
    // Clear any existing timer first
    if (carouselTimerRef.current) {
      clearInterval(carouselTimerRef.current);
    }
    
    // Start a new timer
    carouselTimerRef.current = setInterval(() => {
      advanceToNextImage();
    }, 8000);
  };

  // Start carousel on mount and handle cleanup
  useEffect(() => {
    // Ensure image is faded in at start
    setFadeIn(true);
    
    // Start the carousel timer
    startCarouselTimer();
    
    // Cleanup on unmount
    return clearAllTimers;
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      {/* Single background image with fade effect */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-0 
          ${fadeIn ? 'opacity-40' : 'opacity-0'}`}
      >
        <Image
          src={teamPhotos[activeImageIndex]}
          alt="Team background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
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