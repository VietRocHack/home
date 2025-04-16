"use client";

import React, { MutableRefObject } from 'react';
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
      
      {/* Filter buttons */}
      {viewMode !== 'hackathons' && (
        <div className="flex flex-wrap gap-2 mt-4 justify-center" ref={scrollRef}>
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
      )}
    </div>
  );
} 