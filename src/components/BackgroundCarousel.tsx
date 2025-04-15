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

interface BackgroundCarouselProps {
  children: React.ReactNode;
}

export default function BackgroundCarousel({ children }: BackgroundCarouselProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [nextPhotoIndex, setNextPhotoIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start transition
      setIsTransitioning(true);
      
      // After transition completes, update indices
      setTimeout(() => {
        setCurrentPhotoIndex(nextPhotoIndex);
        setNextPhotoIndex((nextPhotoIndex + 1) % teamPhotos.length);
        setIsTransitioning(false);
      }, 1000); // Match the transition duration from CSS
    }, 8000); // Change image every 8 seconds
    
    return () => clearInterval(interval);
  }, [nextPhotoIndex]);

  return (
    <div className="relative w-full min-h-[80vh] overflow-hidden">
      {/* Current photo (fading out during transition) */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          isTransitioning ? 'opacity-0' : 'opacity-30'
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
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          isTransitioning ? 'opacity-30' : 'opacity-0'
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
      
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
} 