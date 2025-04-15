"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { getHackathonsByDate, Hackathon } from '@/utils/dataUtils';

export default function HackathonTimeline() {
  const [activeEvent, setActiveEvent] = useState(0);
  const [timelineEvents, setTimelineEvents] = useState<Hackathon[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Load hackathon data
  useEffect(() => {
    const hackathons = getHackathonsByDate();
    setTimelineEvents(hackathons);
  }, []);
  
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

  // If data isn't loaded yet, show a loading state
  if (timelineEvents.length === 0) {
    return <div className="text-center py-8">Loading hackathon timeline...</div>;
  }

  return (
    <div className="w-full">
      {/* Main display of current event */}
      <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative h-80 rounded-lg overflow-hidden">
          <Image
            src={timelineEvents[activeEvent].mainImage}
            alt={timelineEvents[activeEvent].name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className="bg-[var(--accent-cyan)] text-black px-3 py-1 rounded-full text-sm font-medium">
              {timelineEvents[activeEvent].achievement}
            </span>
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold">{timelineEvents[activeEvent].name}</h3>
            <span className="text-[var(--foreground-secondary)]">•</span>
            <span className="text-[var(--accent-red)]">{timelineEvents[activeEvent].date}</span>
          </div>
          <p className="text-lg mb-2">{timelineEvents[activeEvent].location}</p>
          <p className="text-[var(--foreground-secondary)] mb-6">
            {timelineEvents[activeEvent].description}
          </p>
          
          <div className="flex gap-3">
            <button 
              className="px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setActiveEvent(prev => Math.max(0, prev - 1))}
              disabled={activeEvent === 0}
            >
              Previous
            </button>
            <button 
              className="px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setActiveEvent(prev => Math.min(timelineEvents.length - 1, prev + 1))}
              disabled={activeEvent === timelineEvents.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      
      {/* Timeline scroll */}
      <div 
        ref={timelineRef} 
        className="relative overflow-x-auto pb-4 whitespace-nowrap hide-scrollbar"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="w-full h-0.5 bg-gray-700 absolute top-4 left-0 right-0 z-0"></div>
        
        <div className="inline-flex gap-16 px-8 relative">
          {timelineEvents.map((event, index) => (
            <div 
              key={event.id}
              data-index={index}
              className={`relative cursor-pointer pt-8 ${index === activeEvent ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
              onClick={() => setActiveEvent(index)}
            >
              <div 
                className={`w-4 h-4 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 ${
                  index === activeEvent ? 'bg-[var(--accent-red)]' : 'bg-gray-500'
                }`}
              ></div>
              <div className="text-center min-w-[120px]">
                <p className="font-medium">{event.name}</p>
                <p className="text-sm text-[var(--foreground-secondary)]">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Custom styles for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
} 