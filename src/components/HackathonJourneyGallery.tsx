"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllPhotos, getHackathonsByDate, Hackathon, Photo } from '@/utils/dataUtils';

interface GalleryPhoto {
  photo: Photo;
  hackathon: Hackathon;
}

export default function HackathonJourneyGallery() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'timeline' | 'hackathons'>('grid');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const slideshowTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load data
  useEffect(() => {
    const hackathons = getHackathonsByDate();
    const photos = getAllPhotos();
    setHackathons(hackathons);
    setGalleryPhotos(photos);
  }, []);

  // Slideshow timer
  useEffect(() => {
    if (isSlideshow && activePhoto !== null) {
      slideshowTimerRef.current = setTimeout(() => {
        setActivePhoto((prev) => 
          prev !== null ? (prev + 1) % filteredPhotos.length : 0
        );
      }, 5000);
    }
    
    return () => {
      if (slideshowTimerRef.current) {
        clearTimeout(slideshowTimerRef.current);
      }
    };
  }, [isSlideshow, activePhoto]);

  // Helper to format the image path correctly
  const getImagePath = (path: string) => {
    if (!path) return '/placeholder-image.svg';
    return path.startsWith('/') ? path : `/${path}`;
  };

  // Extract unique hackathon IDs for filtering
  const hackathonIds = Array.from(new Set(galleryPhotos.map(item => item.hackathon.id)));

  // Filter and sort photos
  let filteredPhotos = filter 
    ? galleryPhotos.filter(item => item.hackathon.id === filter)
    : galleryPhotos;

  // Sort photos
  filteredPhotos = [...filteredPhotos].sort((a, b) => {
    const dateA = a.hackathon.year;
    const dateB = b.hackathon.year;
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  // Helper function to get hackathon by ID
  const getHackathonName = (id: string): string => {
    const hackathon = hackathons.find(h => h.id === id);
    return hackathon ? hackathon.name : id;
  };

  // Toggle slideshow
  const toggleSlideshow = () => {
    if (isSlideshow) {
      setIsSlideshow(false);
      if (slideshowTimerRef.current) {
        clearTimeout(slideshowTimerRef.current);
      }
    } else {
      setIsSlideshow(true);
      if (activePhoto === null) {
        setActivePhoto(0);
      }
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Group photos by hackathon
  const photosByHackathon = hackathons.map(hackathon => {
    const photos = galleryPhotos.filter(item => item.hackathon.id === hackathon.id);
    return { hackathon, photos };
  });

  if (galleryPhotos.length === 0) {
    return <div className="text-center py-8">Loading photo gallery...</div>;
  }

  return (
    <div className="w-full">
      {/* Controls */}
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
      
      {/* Grid View */}
      {viewMode === 'grid' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filteredPhotos.map((item, index) => (
            <motion.div 
              key={`${item.hackathon.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group shadow-md"
              onClick={() => setActivePhoto(index)}
            >
              <Image
                src={getImagePath(item.photo.src)}
                alt={item.photo.caption}
                fill
                className="object-cover transition-all duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                <p className="text-white font-medium">{item.photo.caption}</p>
                <p className="text-gray-300 text-sm">{item.hackathon.name} • {item.hackathon.date}</p>
              </div>
              {item.hackathon.achievement && (
                <div className="absolute top-2 right-2 bg-[var(--accent-yellow)] text-black px-2 py-1 rounded-md text-xs font-medium">
                  🏆 {item.hackathon.achievement}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
      
      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 left-6 sm:left-1/2 w-0.5 bg-gray-700 transform -translate-x-1/2" />
          
          {filteredPhotos.map((item, index) => (
            <motion.div 
              key={`${item.hackathon.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`mb-12 flex flex-col sm:flex-row ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''} items-center`}
            >
              <div className="flex-1 p-4">
                <div
                  className="relative aspect-video overflow-hidden rounded-lg cursor-pointer group shadow-md"
                  onClick={() => setActivePhoto(index)}
                >
                  <Image
                    src={getImagePath(item.photo.src)}
                    alt={item.photo.caption}
                    fill
                    className="object-cover transition-all duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                    <p className="text-white font-medium">{item.photo.caption}</p>
                  </div>
                </div>
              </div>
              
              <div className="w-12 sm:w-24 flex justify-center">
                <div className={`w-5 h-5 rounded-full ${item.hackathon.achievement ? 'bg-[var(--accent-yellow)]' : 'bg-[var(--accent-red)]'} shadow-lg shadow-[var(--accent-red)]/30 z-10`} />
              </div>
              
              <div className="flex-1 p-4">
                <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg shadow-md border border-gray-800/50">
                  <h3 className="text-lg font-medium">{item.hackathon.name}</h3>
                  <p className="text-sm text-[var(--foreground-secondary)]">{item.hackathon.date}</p>
                  <p className="mt-2">{item.photo.caption}</p>
                  {item.hackathon.achievement && (
                    <div className="mt-2 inline-block bg-[var(--accent-yellow)] text-black px-2 py-1 rounded-md text-xs font-medium">
                      🏆 {item.hackathon.achievement}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Hackathons View */}
      {viewMode === 'hackathons' && (
        <div className="space-y-16">
          {photosByHackathon.map(({ hackathon, photos }) => (
            <motion.div 
              key={hackathon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/30 rounded-lg overflow-hidden shadow-lg border border-gray-800/50"
            >
              <div className="relative h-60 w-full">
                <Image
                  src={getImagePath(hackathon.mainImage)}
                  alt={hackathon.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-6">
                  <h2 className="text-2xl font-bold">{hackathon.name}</h2>
                  <p className="text-[var(--foreground-secondary)]">{hackathon.date} • {hackathon.location}</p>
                  {hackathon.achievement && (
                    <div className="mt-2 inline-block bg-[var(--accent-yellow)] text-black px-2 py-1 rounded-md text-xs font-medium">
                      🏆 {hackathon.achievement}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <p className="mb-6">{hackathon.description}</p>
                
                {/* Projects */}
                {hackathon.projects.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Projects</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {hackathon.projects.map(project => (
                        <div key={project.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                          <h4 className="font-medium">{project.name}</h4>
                          <p className="text-sm text-[var(--foreground-secondary)]">{project.tagline}</p>
                          {project.achievements.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {project.achievements.map((achievement, i) => (
                                <span key={i} className="inline-block bg-[var(--accent-yellow)] text-black px-2 py-0.5 rounded-md text-xs font-medium">
                                  🏆 {achievement}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="mt-2 flex gap-2">
                            {project.devpostLink && (
                              <Link href={project.devpostLink} target="_blank" className="text-xs bg-[#003E54] hover:bg-[#0061A8] px-2 py-1 rounded">
                                Devpost
                              </Link>
                            )}
                            {project.githubLink && (
                              <Link href={project.githubLink} target="_blank" className="text-xs bg-[#333] hover:bg-[#555] px-2 py-1 rounded">
                                GitHub
                              </Link>
                            )}
                            {project.demoLink && (
                              <Link href={project.demoLink} target="_blank" className="text-xs bg-[var(--accent-red)] hover:bg-[#FF5A58] px-2 py-1 rounded">
                                Demo
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Photos */}
                {photos.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Memories</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {photos.map((item, index) => (
                        <div 
                          key={index}
                          className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                          onClick={() => {
                            setFilter(hackathon.id);
                            setActivePhoto(index);
                          }}
                        >
                          <Image
                            src={getImagePath(item.photo.src)}
                            alt={item.photo.caption}
                            fill
                            className="object-cover transition-all duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                            <span className="text-white text-sm">View</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Lightbox */}
      <AnimatePresence>
        {activePhoto !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 bg-black ${isFullscreen ? '' : 'bg-opacity-90'} z-50 flex items-center justify-center p-4 ${isFullscreen ? 'p-0' : ''}`}
            onClick={() => {
              if (!isSlideshow) {
                setActivePhoto(null);
                setIsFullscreen(false);
              }
            }}
          >
            <motion.div 
              className={`relative ${isFullscreen ? 'w-full h-full' : 'max-w-5xl w-full max-h-[85vh] rounded-lg overflow-hidden'} flex flex-col`}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <div className={`relative w-full ${isFullscreen ? 'h-full' : 'h-[70vh]'}`}>
                <Image
                  src={getImagePath(filteredPhotos[activePhoto].photo.src)}
                  alt={filteredPhotos[activePhoto].photo.caption}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  quality={90}
                  priority
                />
              </div>
              
              {!isFullscreen && (
                <div className="bg-[#121212] p-4 rounded-b-lg">
                  <h3 className="text-xl font-medium">{filteredPhotos[activePhoto].photo.caption}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-[var(--foreground-secondary)]">
                      {filteredPhotos[activePhoto].hackathon.name} • {filteredPhotos[activePhoto].hackathon.date}
                    </p>
                    <div className="flex space-x-2">
                      <button 
                        className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full"
                        onClick={toggleSlideshow}
                        title={isSlideshow ? "Stop Slideshow" : "Start Slideshow"}
                      >
                        {isSlideshow ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </button>
                      <button 
                        className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full"
                        onClick={toggleFullscreen}
                        title="Toggle Fullscreen"
                      >
                        {isFullscreen ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L4 4m0 0h5m-5 0v5m16 7l-5 5m0 0v-5m5 5h-5" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Navigation arrows */}
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 p-3 rounded-full z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhoto((activePhoto - 1 + filteredPhotos.length) % filteredPhotos.length);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 p-3 rounded-full z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhoto((activePhoto + 1) % filteredPhotos.length);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Close button in fullscreen */}
              {isFullscreen && (
                <button 
                  className="absolute right-4 top-4 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full z-10"
                  onClick={() => {
                    if (isSlideshow) {
                      toggleSlideshow();
                    }
                    setIsFullscreen(false);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              
              {/* Close button */}
              {!isFullscreen && (
                <button 
                  className="absolute right-4 top-4 bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full"
                  onClick={() => {
                    if (isSlideshow) {
                      toggleSlideshow();
                    }
                    setActivePhoto(null);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 