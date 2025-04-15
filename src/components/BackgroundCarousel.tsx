"use client";

import { useState, useEffect } from 'react';
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
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [nextPhotoIndex, setNextPhotoIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSyncedChange, setIsSyncedChange] = useState(false);

  // Handle logo change event to sync background change
  useEffect(() => {
    const handleLogoChange = () => {
      if (!isTransitioning) {
        setIsSyncedChange(true);
        changeBackgroundImage();
      }
    };

    // Listen for the custom logo change event
    window.addEventListener(LOGO_CHANGE_EVENT, handleLogoChange);
    
    return () => {
      window.removeEventListener(LOGO_CHANGE_EVENT, handleLogoChange);
    };
  }, [isTransitioning]);

  // Function to change the background image
  const changeBackgroundImage = () => {
    // Start transition
    setIsTransitioning(true);
    
    // After transition completes, update indices
    setTimeout(() => {
      setCurrentPhotoIndex(nextPhotoIndex);
      setNextPhotoIndex((nextPhotoIndex + 1) % teamPhotos.length);
      setIsTransitioning(false);
      setIsSyncedChange(false);
    }, 1000); // Match the transition duration from CSS
  };

  // Automatic background rotation (but only when not in synced mode)
  useEffect(() => {
    if (isSyncedChange) return;
    
    const interval = setInterval(() => {
      changeBackgroundImage();
    }, 8000); // Change image every 8 seconds
    
    return () => clearInterval(interval);
  }, [nextPhotoIndex, isSyncedChange]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      {/* Current photo (fading out during transition) */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-0 ${
          isTransitioning ? 'opacity-0' : 'opacity-40'
        }`}
      >
        <Image
          src={teamPhotos[currentPhotoIndex]}
          alt="Team background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>
      
      {/* Next photo (fading in during transition) */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-0 ${
          isTransitioning ? 'opacity-40' : 'opacity-0'
        }`}
      >
        <Image
          src={teamPhotos[nextPhotoIndex]}
          alt="Team background"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      
      {/* Dark overlay to ensure text readability but not too dark */}
      <div className="absolute inset-0 bg-opacity-60 z-10"></div>
      
      {/* Content - centered vertically and horizontally */}
      <div className="relative z-20 w-full h-full flex items-center justify-center py-16">
        {children}
      </div>
    </div>
  );
} 