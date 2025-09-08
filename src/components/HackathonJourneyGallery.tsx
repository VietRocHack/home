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
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [hackathons, setHackathons] = useState<HackathonGrouping[]>([]);
  const [memes, setMemes] = useState<Meme[]>([]);
  const [activeMeme, setActiveMeme] = useState<number | null>(null);
  const [isFullscreen] = useState(false);
  const [isSlideshow] = useState(false);
  const slideshowTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Helper: update a single query param in URL without full reload
  const updateQueryParam = () => {};

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
    
    // Deep-linking: open photo by src or meme by id
    const photoParam = searchParams?.get('photo');
    const memeParam = searchParams?.get('meme');
    
    if (photoParam && galleryPhotos.length > 0) {
      // Find index across filtered set first, fallback to all photos
      const indexInFiltered = filteredPhotos.findIndex(p => p.photo.src === photoParam);
      if (indexInFiltered >= 0) {
        setActivePhoto(indexInFiltered);
      } else {
        const indexInAll = galleryPhotos.findIndex(p => p.photo.src === photoParam);
        if (indexInAll >= 0) {
          // Ensure filter includes this photo's hackathon
          setFilter(galleryPhotos[indexInAll].hackathon.id);
          // After filter applies, try to open the first matching photo in filtered set
          const toOpen = filteredPhotos.findIndex(p => p.photo.src === photoParam);
          setActivePhoto(toOpen >= 0 ? toOpen : 0);
        }
      }
    }
    
    if (memeParam && memes.length > 0) {
      const idx = memes.findIndex(m => m.id === memeParam);
      if (idx >= 0) {
        setViewMode('fun');
        setActiveMeme(idx);
      }
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
  useEffect(() => {}, []);

  // Helper function to get hackathon by ID
  const getHackathonName = (id: string): string => {
    const hackathonGroup = hackathons.find(h => h.hackathon.id === id);
    return hackathonGroup ? hackathonGroup.hackathon.name : id;
  };

  // Toggle slideshow
  const toggleSlideshow = () => {};

  // Toggle fullscreen
  const toggleFullscreen = () => {};

  // Event handlers
  const handlePhotoClick = (index: number) => {
    setActivePhoto(index);
    // Minimal viewer: no deep link
  };

  const handleHackathonPhotoClick = (hackathonId: string, index: number) => {
    setFilter(hackathonId);
    setActivePhoto(index);
  };

  const handleMemeClick = (index: number) => {
    setActiveMeme(index);
    // Minimal viewer: no deep link
  };

  const handlePreviousPhoto = () => {
    setActivePhoto((prev) => 
      prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : 0
    );
    // Minimal viewer: no deep link
  };

  const handleNextPhoto = () => {
    setActivePhoto((prev) => 
      prev !== null ? (prev + 1) % filteredPhotos.length : 0
    );
    // Minimal viewer: no deep link
  };

  const handlePreviousMeme = () => {
    setActiveMeme((prev) => 
      prev !== null ? (prev - 1 + sortedMemes.length) % sortedMemes.length : 0
    );
    // Minimal viewer: no deep link
  };

  const handleNextMeme = () => {
    setActiveMeme((prev) => 
      prev !== null ? (prev + 1) % sortedMemes.length : 0
    );
    // Minimal viewer: no deep link
  };

  const handleCloseLightbox = () => {
    setActivePhoto(null);
    setActiveMeme(null);
    
  };

  // Keyboard navigation and ESC to close
  useEffect(() => {}, []);

  // Scroll lock when any lightbox is open
  useEffect(() => {}, []);

  // Preload neighboring images for smoother navigation
  useEffect(() => {}, []);

  useEffect(() => {}, []);

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