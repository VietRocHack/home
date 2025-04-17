"use client";

import React, { MutableRefObject, useState, useEffect, useRef } from 'react';
import { ViewMode, SortOrder } from './types';

interface GalleryControlsProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
  filter: string | null;
  setFilter: (filter: string | null) => void;
  hackathonIds: string[];
  getHackathonName: (id: string) => string;
  scrollRef: MutableRefObject<HTMLDivElement | null>;
}

export default function GalleryControls({
  viewMode,
  setViewMode,
  sortOrder,
  setSortOrder,
  filter,
  setFilter,
  hackathonIds,
  getHackathonName,
  scrollRef
}: GalleryControlsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-[#0F0F0F]/90 backdrop-blur-sm rounded-xl p-4 mb-8 sticky top-20 z-10 shadow-lg border border-gray-800/50">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        {/* View Mode */}
        <div className="flex items-center space-x-2">
          <span className="text-[var(--foreground-secondary)]">View:</span>
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button 
              className={`px-3 py-1 rounded-md text-sm ${viewMode === 'grid' ? 'bg-[var(--accent-red)] text-white' : 'hover:bg-gray-700 text-gray-300'}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button 
              className={`px-3 py-1 rounded-md text-sm ${viewMode === 'timeline' ? 'bg-[var(--accent-red)] text-white' : 'hover:bg-gray-700 text-gray-300'}`}
              onClick={() => setViewMode('timeline')}
            >
              Timeline
            </button>
            <button 
              className={`px-3 py-1 rounded-md text-sm ${viewMode === 'hackathons' ? 'bg-[var(--accent-red)] text-white' : 'hover:bg-gray-700 text-gray-300'}`}
              onClick={() => setViewMode('hackathons')}
            >
              Hackathons
            </button>
            <button 
              className={`px-3 py-1 rounded-md text-sm ${viewMode === 'fun' ? 'bg-[var(--accent-red)] text-white' : 'hover:bg-gray-700 text-gray-300'}`}
              onClick={() => setViewMode('fun')}
            >
              Fun
            </button>
          </div>
        </div>
        
        {/* Order */}
        <div className="flex items-center space-x-2">
          <span className="text-[var(--foreground-secondary)]">Sort:</span>
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button 
              className={`px-3 py-1 rounded-md text-sm ${sortOrder === 'newest' ? 'bg-[var(--accent-red)] text-white' : 'hover:bg-gray-700 text-gray-300'}`}
              onClick={() => setSortOrder('newest')}
            >
              Newest First
            </button>
            <button 
              className={`px-3 py-1 rounded-md text-sm ${sortOrder === 'oldest' ? 'bg-[var(--accent-red)] text-white' : 'hover:bg-gray-700 text-gray-300'}`}
              onClick={() => setSortOrder('oldest')}
            >
              Oldest First
            </button>
          </div>
        </div>
      </div>
      
      {/* Filter controls - shown only for grid and timeline views */}
      {viewMode !== 'hackathons' && viewMode !== 'fun' && (
        <>
          {/* Mobile Dropdown - Only show on smaller screens */}
          <div className="mt-4 md:hidden" ref={dropdownRef}>
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-2 bg-gray-800 rounded-lg text-white"
              >
                <span>{filter ? getHackathonName(filter) : 'All Events'}</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {dropdownOpen && (
                <div className="absolute left-0 right-0 mt-1 py-2 bg-gray-800 rounded-lg shadow-xl z-20 max-h-60 overflow-y-auto">
                  <button 
                    className={`w-full text-left px-4 py-2 text-sm ${!filter ? 'bg-[var(--accent-red)] text-white' : 'hover:bg-gray-700 text-gray-300'}`}
                    onClick={() => {
                      setFilter(null);
                      setDropdownOpen(false);
                    }}
                  >
                    All Events
                  </button>
                  {hackathonIds.map((id) => (
                    <button 
                      key={id}
                      className={`w-full text-left px-4 py-2 text-sm ${filter === id ? 'bg-[var(--accent-yellow)] text-black' : 'hover:bg-gray-700 text-gray-300'}`}
                      onClick={() => {
                        setFilter(id);
                        setDropdownOpen(false);
                      }}
                    >
                      {getHackathonName(id)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Desktop Buttons - Only show on medium screens and up */}
          <div className="hidden md:flex flex-wrap gap-2 mt-4 justify-center" ref={scrollRef}>
            <button 
              className={`px-3 py-1 rounded-md text-sm ${!filter ? 'bg-[var(--accent-red)] text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => setFilter(null)}
            >
              All Events
            </button>
            {hackathonIds.map((id) => (
              <button 
                key={id}
                className={`px-3 py-1 rounded-md text-sm ${filter === id ? 'bg-[var(--accent-yellow)] text-black' : 'bg-gray-700 hover:bg-gray-600'}`}
                onClick={() => setFilter(id)}
              >
                {getHackathonName(id)}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
} 