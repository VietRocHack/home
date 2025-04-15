"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getAllPhotos, getAllHackathons, Hackathon, Photo } from '@/utils/dataUtils';

interface GalleryPhoto {
  photo: Photo;
  hackathon: Hackathon;
}

export default function PhotoGallery() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);

  // Load data
  useEffect(() => {
    const photos = getAllPhotos();
    const hackathons = getAllHackathons();
    setGalleryPhotos(photos);
    setHackathons(hackathons);
  }, []);

  // Helper to format the image path correctly
  const getImagePath = (path: string) => {
    if (!path) return '/placeholder-image.svg';
    return path.startsWith('/') ? path : `/${path}`;
  };

  // Extract unique hackathon IDs for filtering
  const hackathonIds = Array.from(new Set(galleryPhotos.map(item => item.hackathon.id)));

  // Filter photos based on selected hackathon
  const filteredPhotos = filter 
    ? galleryPhotos.filter(item => item.hackathon.id === filter)
    : galleryPhotos;

  // Helper function to get hackathon by ID
  const getHackathonName = (id: string): string => {
    const hackathon = hackathons.find(h => h.id === id);
    return hackathon ? hackathon.name : id;
  };

  if (galleryPhotos.length === 0) {
    return <div className="text-center py-8">Loading photo gallery...</div>;
  }

  // Show a message if the filtered photos are empty
  if (filteredPhotos.length === 0 && filter) {
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
          {hackathonIds.map((id) => (
            <button 
              key={id}
              className={`px-4 py-2 rounded-md ${filter === id ? 'bg-[var(--accent-cyan)] text-black' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => setFilter(id)}
            >
              {getHackathonName(id)}
            </button>
          ))}
        </div>
        
        <div className="text-center py-8">
          No photos found for {getHackathonName(filter)}. 
          <button 
            className="ml-2 text-[var(--accent-cyan)] underline"
            onClick={() => setFilter(null)}
          >
            View all photos
          </button>
        </div>
      </div>
    );
  }

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
        {hackathonIds.map((id) => (
          <button 
            key={id}
            className={`px-4 py-2 rounded-md ${filter === id ? 'bg-[var(--accent-cyan)] text-black' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => setFilter(id)}
          >
            {getHackathonName(id)}
          </button>
        ))}
      </div>
      
      {/* Photo grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPhotos.map((item, index) => (
          <div 
            key={`${item.hackathon.id}-${index}`}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => setActivePhoto(index)}
          >
            <Image
              src={getImagePath(item.photo.src)}
              alt={item.photo.caption}
              fill
              className="object-cover transition-all duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
              <p className="text-white font-medium">{item.photo.caption}</p>
              <p className="text-gray-300 text-sm">{item.hackathon.name} • {item.hackathon.location}</p>
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
                src={getImagePath(filteredPhotos[activePhoto].photo.src)}
                alt={filteredPhotos[activePhoto].photo.caption}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <div className="bg-gray-900 p-4 rounded-b-lg">
              <h3 className="text-xl font-medium">{filteredPhotos[activePhoto].photo.caption}</h3>
              <p className="text-[var(--foreground-secondary)]">
                {filteredPhotos[activePhoto].hackathon.name} • {filteredPhotos[activePhoto].hackathon.location}
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