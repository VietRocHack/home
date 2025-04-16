"use client";

import { useState, useEffect, useRef } from 'react';
import { getAllPhotos, getHackathonsByDate } from '@/utils/dataUtils';
import { GalleryPhoto, ViewMode, SortOrder, HackathonGrouping } from './journey/types';
import GalleryControls from './journey/GalleryControls';
import GridView from './journey/GridView';
import TimelineView from './journey/TimelineView';
import HackathonsView from './journey/HackathonsView';
import PhotoLightbox from './journey/PhotoLightbox';

export default function HackathonJourneyGallery() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [hackathons, setHackathons] = useState<HackathonGrouping[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const slideshowTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Helper to format the image path correctly
  const getImagePath = (path: string) => {
    if (!path) return '/placeholder-image.svg';
    return path.startsWith('/') ? path : `/${path}`;
  };
  
  // Load data
  useEffect(() => {
    const hackathonsData = getHackathonsByDate();
    const photos = getAllPhotos();
    
    // Group photos by hackathon
    const groupedHackathons = hackathonsData.map(hackathon => {
      const hackathonPhotos = photos.filter(item => item.hackathon.id === hackathon.id);
      return { hackathon, photos: hackathonPhotos };
    });
    
    setHackathons(groupedHackathons);
    setGalleryPhotos(photos);
  }, []);

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

  // Slideshow timer
  useEffect(() => {
    if (isSlideshow && activePhoto !== null && filteredPhotos.length > 0) {
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
  }, [isSlideshow, activePhoto, filteredPhotos]);

  // Helper function to get hackathon by ID
  const getHackathonName = (id: string): string => {
    const hackathonGroup = hackathons.find(h => h.hackathon.id === id);
    return hackathonGroup ? hackathonGroup.hackathon.name : id;
  };

  // Toggle slideshow
  const toggleSlideshow = () => {
    setIsSlideshow(prev => {
      if (prev) {
        if (slideshowTimerRef.current) {
          clearTimeout(slideshowTimerRef.current);
        }
        return false;
      } else {
        if (activePhoto === null && filteredPhotos.length > 0) {
          setActivePhoto(0);
        }
        return true;
      }
    });
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  // Event handlers
  const handlePhotoClick = (index: number) => {
    setActivePhoto(index);
  };

  const handleHackathonPhotoClick = (hackathonId: string, index: number) => {
    setFilter(hackathonId);
    setActivePhoto(index);
  };

  const handlePreviousPhoto = () => {
    setActivePhoto((prev) => 
      prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : 0
    );
  };

  const handleNextPhoto = () => {
    setActivePhoto((prev) => 
      prev !== null ? (prev + 1) % filteredPhotos.length : 0
    );
  };

  const handleCloseLightbox = () => {
    if (isSlideshow) {
      toggleSlideshow();
    }
    setActivePhoto(null);
    setIsFullscreen(false);
  };

  if (galleryPhotos.length === 0) {
    return <div className="text-center py-8">Loading photo gallery...</div>;
  }

  return (
    <div className="w-full">
      {/* Gallery Controls */}
      <GalleryControls 
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        filter={filter}
        setFilter={setFilter}
        hackathonIds={hackathonIds}
        getHackathonName={getHackathonName}
        scrollRef={scrollRef}
      />
      
      {/* View Components */}
      {viewMode === 'grid' && (
        <GridView 
          photos={filteredPhotos}
          getImagePath={getImagePath}
          onPhotoClick={handlePhotoClick}
        />
      )}
      
      {viewMode === 'timeline' && (
        <TimelineView 
          photos={filteredPhotos}
          getImagePath={getImagePath}
          onPhotoClick={handlePhotoClick}
        />
      )}
      
      {viewMode === 'hackathons' && (
        <HackathonsView 
          hackathonGroups={hackathons}
          getImagePath={getImagePath}
          onPhotoClick={handleHackathonPhotoClick}
        />
      )}
      
      {/* Photo Lightbox */}
      <PhotoLightbox 
        isOpen={activePhoto !== null}
        photo={activePhoto !== null ? filteredPhotos[activePhoto] : null}
        photos={filteredPhotos}
        isFullscreen={isFullscreen}
        isSlideshow={isSlideshow}
        getImagePath={getImagePath}
        onClose={handleCloseLightbox}
        onToggleFullscreen={toggleFullscreen}
        onToggleSlideshow={toggleSlideshow}
        onPrevious={handlePreviousPhoto}
        onNext={handleNextPhoto}
      />
    </div>
  );
} 