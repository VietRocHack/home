"use client";

import { useState, useEffect, useRef } from 'react';
import { getAllPhotos, getAllMemes, Meme, getAllHackathons } from '@/utils/dataUtils';
import { GalleryPhoto, ViewMode, SortOrder, HackathonGrouping } from './journey/types';
import GalleryControls from './journey/GalleryControls';
import GridView from './journey/GridView';
import TimelineView from './journey/TimelineView';
import HackathonsView from './journey/HackathonsView';
import FunThingsView from './journey/FunThingsView';
import PhotoLightbox from './journey/PhotoLightbox';
import MemeLightbox from './journey/MemeLightbox';
import { useRouter, useSearchParams } from 'next/navigation';

export default function HackathonJourneyGallery() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('hackathons');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [hackathons, setHackathons] = useState<HackathonGrouping[]>([]);
  const [memes, setMemes] = useState<Meme[]>([]);
  const [activeMeme, setActiveMeme] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const slideshowTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
  
  // Load data
  useEffect(() => {
    const hackathonsData = getAllHackathons();
    const photos = getAllPhotos();
    const memesData = getAllMemes();
    
    // Group photos by hackathon
    const groupedHackathons = hackathonsData.map(hackathon => {
      const hackathonPhotos = photos.filter(item => item.hackathon.id === hackathon.id);
      return { hackathon, photos: hackathonPhotos };
    });
    
    setHackathons(groupedHackathons);
    setGalleryPhotos(photos);
    setMemes(memesData);
  }, []);

  // Read view from URL query parameter
  useEffect(() => {
  const viewParam = searchParams?.get('view');
    if (viewParam && (viewParam === 'grid' || viewParam === 'timeline' || viewParam === 'hackathons' || viewParam === 'fun')) {
      setViewMode(viewParam as ViewMode);
    }
  }, [searchParams]);

  // Update URL when view mode changes
  const updateViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    
    // Create new URL with the updated view parameter
  const params = searchParams ? new URLSearchParams(searchParams.toString()) : new URLSearchParams();
    params.set('view', mode);
    
    // Update URL without refreshing the page
    router.push(`/journey?${params.toString()}`, { scroll: false });
  };

  // Extract unique hackathon IDs for filtering
  const hackathonIds = Array.from(new Set(galleryPhotos.map(item => item.hackathon.id)));

  // Filter and sort photos
  const filteredPhotos = filter 
    ? galleryPhotos.filter(item => item.hackathon.id === filter)
    : galleryPhotos;

  // Sort memes
  const sortedMemes = [...memes].sort((a, b) => {
    // Extract year from date string and convert to number
    const yearA = parseInt(a.date.split(' ')[1]);
    const yearB = parseInt(b.date.split(' ')[1]);
    return sortOrder === 'newest' ? yearB - yearA : yearA - yearB;
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

  const handleMemeClick = (index: number) => {
    setActiveMeme(index);
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

  const handlePreviousMeme = () => {
    setActiveMeme((prev) => 
      prev !== null ? (prev - 1 + sortedMemes.length) % sortedMemes.length : 0
    );
  };

  const handleNextMeme = () => {
    setActiveMeme((prev) => 
      prev !== null ? (prev + 1) % sortedMemes.length : 0
    );
  };

  const handleCloseLightbox = () => {
    if (isSlideshow) {
      toggleSlideshow();
    }
    setActivePhoto(null);
    setActiveMeme(null);
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
        setViewMode={updateViewMode}
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

      {viewMode === 'fun' && (
        <FunThingsView 
          memes={sortedMemes}
          getImagePath={getImagePath}
          onMemeClick={handleMemeClick}
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

      {/* Meme Lightbox */}
      <MemeLightbox 
        isOpen={activeMeme !== null}
        meme={activeMeme !== null ? sortedMemes[activeMeme] : null}
        memes={sortedMemes}
        isFullscreen={isFullscreen}
        getImagePath={getImagePath}
        onClose={handleCloseLightbox}
        onToggleFullscreen={toggleFullscreen}
        onPrevious={handlePreviousMeme}
        onNext={handleNextMeme}
      />
    </div>
  );
} 