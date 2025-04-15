"use client";

import { useState } from 'react';
import Image from 'next/image';

// Photo gallery data with captions and hackathon details
const galleryPhotos = [
  {
    src: '/team/hophacks_2024_demo_team_pic.jpg',
    caption: 'Demoing our project at HopHacks 2024',
    event: 'HopHacks 2024',
    location: 'Johns Hopkins University'
  },
  {
    src: '/team/hophacks_2024_team_find_out_we_win.png',
    caption: 'The moment we found out we won!',
    event: 'HopHacks 2024',
    location: 'Johns Hopkins University'
  },
  {
    src: '/team/hophacks_2024_team_third_prize_pic.jpg',
    caption: 'Accepting our 3rd place prize at HopHacks',
    event: 'HopHacks 2024',
    location: 'Johns Hopkins University'
  },
  {
    src: '/team/calhacks_2024_team_at_apple_hq.jpg',
    caption: 'Visit to Apple HQ during CalHacks',
    event: 'CalHacks 2024',
    location: 'Berkeley, CA'
  },
  {
    src: '/team/calhacks_2024_team_with_lananh_in_sanfrancisco.jpg',
    caption: 'Team exploring San Francisco',
    event: 'CalHacks 2024',
    location: 'San Francisco, CA'
  },
  {
    src: '/team/calhacks_2024_team_berkeley_backdrop_with_bear.jpg',
    caption: 'Posing with the Berkeley Bear',
    event: 'CalHacks 2024',
    location: 'UC Berkeley'
  },
  {
    src: '/team/calhacks_2024_demo_team_pic.jpg',
    caption: 'Team demo at CalHacks',
    event: 'CalHacks 2024',
    location: 'Berkeley, CA'
  },
  {
    src: '/team/calhacks_2024_team_at_google_hq.jpg',
    caption: 'Visit to Google campus',
    event: 'CalHacks 2024',
    location: 'Mountain View, CA'
  },
  {
    src: '/team/calhacks_2024_team_vapi_award_pic.jpg',
    caption: 'Winner of the VAPI API prize',
    event: 'CalHacks 2024',
    location: 'UC Berkeley'
  },
  {
    src: '/team/calhacks_2024_team_people_choice_award_pic.jpg',
    caption: 'People\'s Choice Award winners',
    event: 'CalHacks 2024',
    location: 'UC Berkeley'
  },
  {
    src: '/team/hackutd_2024_team_at_introduction_ceremony.jpg',
    caption: 'At the HackUTD opening ceremony',
    event: 'HackUTD 2024',
    location: 'University of Texas at Dallas'
  },
  {
    src: '/team/bitcamp_2025_demo_team_pic.jpg',
    caption: 'Presenting at Bitcamp',
    event: 'Bitcamp 2025',
    location: 'University of Maryland'
  }
];

export default function PhotoGallery() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  // Extract unique events for filtering
  const events = Array.from(new Set(galleryPhotos.map(photo => photo.event)));

  // Filter photos based on selected event
  const filteredPhotos = filter 
    ? galleryPhotos.filter(photo => photo.event === filter)
    : galleryPhotos;

  return (
    <div className="w-full">
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <button 
          className={`px-4 py-2 rounded-md ${!filter ? 'bg-[var(--accent-red)] text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
          onClick={() => setFilter(null)}
        >
          All Events
        </button>
        {events.map((event, i) => (
          <button 
            key={i}
            className={`px-4 py-2 rounded-md ${filter === event ? 'bg-[var(--accent-cyan)] text-black' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => setFilter(event)}
          >
            {event}
          </button>
        ))}
      </div>
      
      {/* Photo grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPhotos.map((photo, index) => (
          <div 
            key={index} 
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => setActivePhoto(index)}
          >
            <Image
              src={photo.src}
              alt={photo.caption}
              fill
              className="object-cover transition-all duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white font-medium">{photo.caption}</p>
              <p className="text-gray-300 text-sm">{photo.event} • {photo.location}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Lightbox */}
      {activePhoto !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[70vh]">
              <Image
                src={filteredPhotos[activePhoto].src}
                alt={filteredPhotos[activePhoto].caption}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <div className="bg-gray-900 p-4 rounded-b-lg">
              <h3 className="text-xl font-medium">{filteredPhotos[activePhoto].caption}</h3>
              <p className="text-[var(--foreground-secondary)]">
                {filteredPhotos[activePhoto].event} • {filteredPhotos[activePhoto].location}
              </p>
            </div>
            
            {/* Navigation arrows */}
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setActivePhoto((activePhoto - 1 + filteredPhotos.length) % filteredPhotos.length);
              }}
            >
              ←
            </button>
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setActivePhoto((activePhoto + 1) % filteredPhotos.length);
              }}
            >
              →
            </button>
            
            {/* Close button */}
            <button 
              className="absolute right-2 top-2 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full"
              onClick={() => setActivePhoto(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 