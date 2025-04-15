"use client";

import { useState, useEffect, useRef } from 'react';
import { LOGO_CHANGE_EVENT } from './BackgroundCarousel';

// List of main variants
const hackVariants = [
  "VietRocHack",
  "VietTravelHack",
  "VietDMPNHack",
  "VietReactHack",
  "VietWhyHack",
  "Viet404Hack"
];

// List of rare variants that will briefly appear
const rareVariants = [
  "Địt mẹ Phúc Nguyên",
  "VietOnlyFansHack"
];

// Chance of showing the rare variant - increase for testing
const RARE_CHANCE = 0.02;

export default function RotatingLogo() {
  const [currentVariant, setCurrentVariant] = useState(0);
  const [currentRareVariant, setCurrentRareVariant] = useState(0);
  const [showRare, setShowRare] = useState(false);
  const [rareViewMode, setRareViewMode] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const previousVariantRef = useRef(currentVariant);
  const previousRareRef = useRef(showRare);

  // Function to trigger background change
  const triggerBackgroundChange = () => {
    // Dispatch custom event for background to listen to
    window.dispatchEvent(new Event(LOGO_CHANGE_EVENT));
  };

  // Monitor logo changes to sync with background
  useEffect(() => {
    // If the logo variant has changed, trigger background change
    if (previousVariantRef.current !== currentVariant || previousRareRef.current !== showRare) {
      triggerBackgroundChange();
      previousVariantRef.current = currentVariant;
      previousRareRef.current = showRare;
    }
  }, [currentVariant, showRare]);

  // Function to trigger the rare variant
  const triggerRareVariant = () => {
    // Randomly select a rare variant
    const randomRareIndex = Math.floor(Math.random() * rareVariants.length);
    setCurrentRareVariant(randomRareIndex);
    
    setShowRare(true);
    if (!rareViewMode) {
      setTimeout(() => {
        setShowRare(false);
      }, 1000);
    }
  };

  // Function to toggle rare view mode
  const toggleRareViewMode = () => {
    if (!rareViewMode) {
      // Entering rare view mode - show a random rare variant
      const randomRareIndex = Math.floor(Math.random() * rareVariants.length);
      setCurrentRareVariant(randomRareIndex);
      setShowRare(true);
    } else {
      // Exiting rare view mode
      setShowRare(false);
    }
    setRareViewMode(!rareViewMode);
  };

  useEffect(() => {
    const normalRotation = () => {
      intervalRef.current = setInterval(() => {
        if (rareViewMode) {
          // In rare view mode, rotate through rare variants
          setCurrentRareVariant((prev) => (prev + 1) % rareVariants.length);
        } else {
          // Random chance to show rare variant
          if (Math.random() < RARE_CHANCE && !showRare) {
            triggerRareVariant();
          } else {
            setCurrentVariant((prev) => (prev + 1) % hackVariants.length);
          }
        }
      }, rareViewMode ? 2000 : 4000); // Faster rotation in rare view mode
    };

    normalRotation();
    
    // Add keyboard listener for 'S' key to toggle rare view mode
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 's') {
        toggleRareViewMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [rareViewMode, showRare]);

  // Create special styles for the rare variant
  const logoStyle = showRare ? {
    color: 'var(--accent-yellow)',
    textShadow: '0 0 15px var(--accent-yellow)',
    transform: 'scale(1.1)',
    transition: 'all 0.1s ease'
  } : {};

  // Add a small indicator when in rare view mode
  const currentLogoText = showRare ? rareVariants[currentRareVariant] : hackVariants[currentVariant];

  return (
    <div className="relative flex justify-center items-center">
      <h1 
        className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 text-center"
        style={logoStyle}
      >
        {currentLogoText}
      </h1>
      {rareViewMode && (
        <div className="absolute -top-4 -right-4 text-xs px-2 py-1 bg-[var(--accent-yellow)] text-black rounded-md">
          Rare Mode
        </div>
      )}
    </div>
  );
} 