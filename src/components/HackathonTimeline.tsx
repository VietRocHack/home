"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { getAllHackathons, Hackathon } from '@/utils/dataUtils';

export default function HackathonTimeline() {
  const [activeEvent, setActiveEvent] = useState(0);
  const [previousEvent, setPreviousEvent] = useState(0);
  const [timelineEvents, setTimelineEvents] = useState<Hackathon[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Load hackathon data
  useEffect(() => {
    // Use the original order from the JSON file
    const hackathons = [...getAllHackathons()].reverse();
    setTimelineEvents(hackathons);
  }, []);
  
  // Function to change event with direction animation
  const changeEvent = (newIndex: number) => {
    if (newIndex === activeEvent || isAnimating) return;
    
    // Set animating state
    setIsAnimating(true);
    
    // Save previous event
    setPreviousEvent(activeEvent);
    
    // Determine slide direction
    setSlideDirection(newIndex > activeEvent ? 'left' : 'right');
    setActiveEvent(newIndex);
    
    // Reset animation after it completes
    setTimeout(() => {
      setSlideDirection(null);
      setIsAnimating(false);
    }, 500); // Match this to the CSS transition duration
  };

  // Auto-rotate hackathons every 6 seconds
  useEffect(() => {
    if (timelineEvents.length <= 1 || isPaused) return;
    
    const timer = setInterval(() => {
      changeEvent((activeEvent + 1) % timelineEvents.length);
    }, 6000);
    
    return () => clearInterval(timer);
  }, [timelineEvents.length, isPaused, activeEvent]);
  
  // Auto-scroll the timeline to active event
  useEffect(() => {
    if (timelineRef.current && timelineEvents.length > 0) {
      const timelineElement = timelineRef.current;
      const activeElement = timelineElement.querySelector(`[data-index="${activeEvent}"]`);
      
      if (activeElement) {
        const scrollPosition = (activeElement as HTMLElement).offsetLeft - (timelineElement.clientWidth / 2) + ((activeElement as HTMLElement).offsetWidth / 2);
        timelineElement.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [activeEvent, timelineEvents]);

  // Helper to format the image path correctly
  const getImagePath = (path: string) => {
    if (!path) return '/placeholder-image.svg';
    return path.startsWith('/') ? path : `/${path}`;
  };

  // If data isn't loaded yet, show a loading state
  if (timelineEvents.length === 0) {
    return <div className="text-center py-8">Loading hackathon timeline...</div>;
  }

  return (
    <div className="w-full">
      {/* Main display of current event */}
      <div className="mb-10 relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}>
        
        {/* Navigation buttons */}
        <div className="flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 z-30 px-2">
          <button
            onClick={() => changeEvent(Math.max(0, activeEvent - 1))}
            disabled={activeEvent === 0 || isAnimating}
            className="bg-black bg-opacity-50 hover:bg-opacity-70 p-3 rounded-full text-white disabled:opacity-40"
            aria-label="Previous hackathon"
          >
            ←
          </button>
          <button
            onClick={() => changeEvent(Math.min(timelineEvents.length - 1, activeEvent + 1))}
            disabled={activeEvent === timelineEvents.length - 1 || isAnimating}
            className="bg-black bg-opacity-50 hover:bg-opacity-70 p-3 rounded-full text-white disabled:opacity-40"
            aria-label="Next hackathon"
          >
            →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center overflow-hidden">
          {/* Container for both slides */}
          <div className="relative h-80 z-20">
            {/* Previous event image (visible during animation) */}
            {isAnimating && (
              <div className={`absolute inset-0 rounded-lg overflow-hidden transition-transform duration-500 ease-in-out z-10 ${
                slideDirection === 'left' ? 'animate-slide-out-left' : 
                slideDirection === 'right' ? 'animate-slide-out-right' : ''
              }`}>
                <Image
                  src={getImagePath(timelineEvents[previousEvent].mainImage)}
                  alt={timelineEvents[previousEvent].name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                {timelineEvents[previousEvent].achievement && (
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="bg-[var(--accent-yellow)] text-black px-3 py-1 rounded-full text-sm font-medium">
                      {timelineEvents[previousEvent].achievement}
                    </span>
                  </div>
                )}
              </div>
            )}
            
            {/* Current event image */}
            <div className={`absolute inset-0 rounded-lg overflow-hidden transition-transform duration-500 ease-in-out z-20 ${
              slideDirection === 'left' ? 'animate-slide-in-left' : 
              slideDirection === 'right' ? 'animate-slide-in-right' : ''
            }`}>
              <Image
                src={getImagePath(timelineEvents[activeEvent].mainImage)}
                alt={timelineEvents[activeEvent].name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              {timelineEvents[activeEvent].achievement && (
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="bg-[var(--accent-yellow)] text-black px-3 py-1 rounded-full text-sm font-medium">
                    {timelineEvents[activeEvent].achievement}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Container for content slides */}
          <div className="relative h-full min-h-[250px]">
            {/* Previous event content (visible during animation) */}
            {isAnimating && (
              <div className={`absolute inset-0 transition-all duration-500 ease-in-out z-10 ${
                slideDirection === 'left' ? 'animate-fade-slide-out-left' : 
                slideDirection === 'right' ? 'animate-fade-slide-out-right' : ''
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold">{timelineEvents[previousEvent].name}</h3>
                  <span className="text-[var(--foreground-secondary)]">•</span>
                  <span className="text-[var(--accent-red)]">{timelineEvents[previousEvent].date}</span>
                </div>
                <p className="text-lg mb-2">{timelineEvents[previousEvent].location}</p>
                <p className="text-[var(--foreground-secondary)] mb-6">
                  {timelineEvents[previousEvent].description}
                </p>
              </div>
            )}
            
            {/* Current event content */}
            <div className={`absolute inset-0 transition-all duration-500 ease-in-out z-20 ${
              slideDirection === 'left' ? 'animate-fade-slide-in-left' : 
              slideDirection === 'right' ? 'animate-fade-slide-in-right' : ''
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold">{timelineEvents[activeEvent].name}</h3>
                <span className="text-[var(--foreground-secondary)]">•</span>
                <span className="text-[var(--accent-red)]">{timelineEvents[activeEvent].date}</span>
              </div>
              <p className="text-lg mb-2">{timelineEvents[activeEvent].location}</p>
              <p className="text-[var(--foreground-secondary)] mb-6">
                {timelineEvents[activeEvent].description}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Timeline with events */}
      <div className="relative mb-8">
        {/* Timeline container */}
        <div 
          ref={timelineRef} 
          className="relative overflow-x-auto pb-4 whitespace-nowrap hide-scrollbar"
          style={{ scrollbarWidth: 'none' }}
        >
          {/* Timeline line */}
          <div className="w-full h-0.5 bg-gray-700 absolute top-4 left-0 right-0 z-0"></div>
          
          {/* Timeline events */}
          <div className="inline-flex gap-12 md:gap-16 px-8 relative">
            {timelineEvents.map((event, index) => (
              <div 
                key={event.id}
                data-index={index}
                className={`relative cursor-pointer pt-8 ${index === activeEvent ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
                onClick={() => changeEvent(index)}
              >
                {/* Timeline marker - yellow full circle for prize winners, red half circle for active, gray for others */}
                <div 
                  className={`w-4 h-4 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 
                    ${event.achievement ? 
                      'bg-[var(--accent-yellow)] ring-2 ring-[var(--accent-yellow)] ring-opacity-30' : 
                      index === activeEvent ? 
                        'bg-[var(--accent-red)]' : 
                        'bg-gray-500'
                    }`}
                >
                  {/* Trophy icon for prize winners */}
                  {event.achievement && (
                    <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-[var(--accent-yellow)]" title={event.achievement}>
                      🏆
                    </span>
                  )}
                </div>
                <div className="text-center min-w-[100px] max-w-[140px]">
                  <p className="font-medium truncate">{event.name}</p>
                  <p className="text-sm text-[var(--foreground-secondary)]">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Custom styles for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {/* Add animation keyframes and custom overlay styles */}
      <style jsx global>{`
        @keyframes slideInLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes slideOutLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes slideOutRight {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
        
        @keyframes fadeSlideInLeft {
          from { 
            transform: translateX(100%);
            opacity: 0;
          }
          to { 
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeSlideOutLeft {
          from { 
            transform: translateX(0);
            opacity: 1;
          }
          to { 
            transform: translateX(-100%);
            opacity: 0;
          }
        }
        
        @keyframes fadeSlideInRight {
          from { 
            transform: translateX(-100%);
            opacity: 0;
          }
          to { 
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeSlideOutRight {
          from { 
            transform: translateX(0);
            opacity: 1;
          }
          to { 
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.5s ease-in-out forwards;
        }
        
        .animate-slide-out-left {
          animation: slideOutLeft 0.5s ease-in-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.5s ease-in-out forwards;
        }
        
        .animate-slide-out-right {
          animation: slideOutRight 0.5s ease-in-out forwards;
        }
        
        .animate-fade-slide-in-left {
          animation: fadeSlideInLeft 0.5s ease-in-out forwards;
        }
        
        .animate-fade-slide-out-left {
          animation: fadeSlideOutLeft 0.5s ease-in-out forwards;
        }
        
        .animate-fade-slide-in-right {
          animation: fadeSlideInRight 0.5s ease-in-out forwards;
        }
        
        .animate-fade-slide-out-right {
          animation: fadeSlideOutRight 0.5s ease-in-out forwards;
        }
        
        /* On small screens, ensure proper layering during cross-column animations */
        @media (max-width: 767px) {
          .animate-slide-in-left, .animate-slide-in-right,
          .animate-fade-slide-in-left, .animate-fade-slide-in-right {
            z-index: 30 !important;
          }
        }
      `}</style>
    </div>
  );
} 