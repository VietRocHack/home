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
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentEventIndexRef = useRef<number>(0);
  
  // Load hackathon data
  useEffect(() => {
    // Use the original order from the JSON file
    const hackathons = getAllHackathons();
    setTimelineEvents(hackathons);
  }, []);
  
  // Keep the ref in sync with the state
  useEffect(() => {
    currentEventIndexRef.current = activeEvent;
    
    // Reset description expanded state when changing events
    setIsDescriptionExpanded(false);
  }, [activeEvent]);
  
  // Toggle description expanded state
  const toggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering other click handlers
    setIsDescriptionExpanded(!isDescriptionExpanded);
    setIsPaused(true); // Pause auto-rotation when expanded
  };

  // Function to change event with direction animation
  const changeEvent = (newIndex: number) => {
    if (newIndex === activeEvent || isAnimating) return;
    
    // Set animating state
    setIsAnimating(true);
    
    // Clear existing timer when manually changing
    if (autoRotateTimerRef.current) {
      clearInterval(autoRotateTimerRef.current);
      autoRotateTimerRef.current = null;
    }
    
    // Save previous event
    setPreviousEvent(activeEvent);
    
    // Determine slide direction
    setSlideDirection(newIndex > activeEvent ? 'left' : 'right');
    setActiveEvent(newIndex);
    
    // Reset animation after it completes
    setTimeout(() => {
      setSlideDirection(null);
      setIsAnimating(false);
      
      // Restart auto-rotation after manual change
      if (!isPaused) {
        startAutoRotation();
      }
    }, 500); // Match this to the CSS transition duration
  };

  // Function to start auto-rotation
  const startAutoRotation = () => {
    // Clear any existing timer first
    if (autoRotateTimerRef.current) {
      clearInterval(autoRotateTimerRef.current);
    }
    
    // Start a new timer
    autoRotateTimerRef.current = setInterval(() => {
      if (!isAnimating && !isPaused && timelineEvents.length > 1) {
        // Use the ref to get the current index to avoid closure issues
        const nextIndex = (currentEventIndexRef.current + 1) % timelineEvents.length;
        changeEvent(nextIndex);
      }
    }, 6000);
  };

  // Auto-rotate hackathons
  useEffect(() => {
    if (timelineEvents.length <= 1) return;
    
    startAutoRotation();
    
    // Cleanup on unmount
    return () => {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current);
      }
    };
  }, [timelineEvents.length, isPaused]); // Keep isPaused dependency
  
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
    // If path is a URL (starts with http:// or https://), return it as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    // Otherwise, treat as local path
    return path.startsWith('/') ? path : `/${path}`;
  };

  // If data isn't loaded yet, show a loading state
  if (timelineEvents.length === 0) {
    return <div className="text-center py-8">Loading hackathon timeline...</div>;
  }

  return (
    <div className="w-full">
      {/* Main display of current event */}
      <div className={`mb-2 relative transition-all duration-500 ease-in-out ${isDescriptionExpanded ? 'min-h-[400px]' : 'min-h-[300px]'}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => isDescriptionExpanded ? null : setIsPaused(false)}>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start overflow-hidden">
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
                  unoptimized={timelineEvents[previousEvent].mainImage.startsWith('http')}
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
                unoptimized={timelineEvents[activeEvent].mainImage.startsWith('http')}
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
          
          {/* Container for content slides - adjust height based on expanded state */}
          <div className={`relative ${isDescriptionExpanded ? 'min-h-[350px]' : 'min-h-[250px]'} transition-all duration-500 ease-in-out`}>
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
                <div className="text-[var(--foreground-secondary)] mb-6">
                  <p>{timelineEvents[previousEvent].description}</p>
                </div>
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
              
              {/* Description container */}
              <div className="flex flex-col mb-4">
                {/* Scrollable description area with adjustable height */}
                <div className={`${isDescriptionExpanded ? 'h-[250px]' : 'h-[120px]'} transition-all duration-300 ease-in-out`}>
                  <div className={`${isDescriptionExpanded ? 'h-full overflow-y-auto custom-scrollbar' : 'h-full overflow-hidden relative'}`}>
                    <div className="pr-2">
                      <p className="text-[var(--foreground-secondary)]">
                        {timelineEvents[activeEvent].description}
                      </p>
                      
                      {/* Additional details that show when expanded */}
                      {isDescriptionExpanded && (
                        <div className="mt-6">
                          <h4 className="font-semibold mb-3">Projects:</h4>
                          <div className="space-y-4">
                            {timelineEvents[activeEvent].projects.map(project => (
                              <div key={project.id} className="pl-3 border-l-2 border-[var(--accent-red)]">
                                <p className="font-medium">{project.name}</p>
                                <p className="text-sm text-[var(--foreground-secondary)]">{project.tagline}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {project.techStack.slice(0, 3).map((tech, i) => (
                                    <span key={i} className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Gradient fade effect at the bottom when not expanded */}
                    {!isDescriptionExpanded && (
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"></div>
                    )}
                  </div>
                </div>
                
                {/* Read more / Read less toggle - improved click target */}
                <div className="relative z-30 mt-2">
                  <button 
                    onClick={toggleDescription}
                    className="text-[var(--accent-yellow)] hover:underline text-sm font-medium focus:outline-none py-1 px-2 -ml-2 rounded hover:bg-gray-800 hover:bg-opacity-50"
                  >
                    {isDescriptionExpanded ? 'Read less' : 'Read more'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation buttons - moved to bottom */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => changeEvent(Math.max(0, activeEvent - 1))}
          disabled={activeEvent === 0 || isAnimating}
          className="bg-black bg-opacity-50 hover:bg-opacity-70 p-3 rounded-full text-white disabled:opacity-40 hover:scale-110 transition-transform"
          aria-label="Previous hackathon"
        >
          ←
        </button>
        <span className="text-sm text-gray-400 self-center">{activeEvent + 1} / {timelineEvents.length}</span>
        <button
          onClick={() => changeEvent(Math.min(timelineEvents.length - 1, activeEvent + 1))}
          disabled={activeEvent === timelineEvents.length - 1 || isAnimating}
          className="bg-black bg-opacity-50 hover:bg-opacity-70 p-3 rounded-full text-white disabled:opacity-40 hover:scale-110 transition-transform"
          aria-label="Next hackathon"
        >
          →
        </button>
      </div>
      
      {/* Timeline with events */}
      <div className="relative mb-8">
        {/* Timeline container */}
        <div 
          ref={timelineRef} 
          className="relative overflow-x-auto pb-4 hide-scrollbar"
          style={{ scrollbarWidth: 'none' }}
        >

        {/* Scrollable content wrapper */}
          <div className="relative min-w-max">
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
        
        /* Custom scrollbar styling */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--accent-red);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ff5a5a;
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