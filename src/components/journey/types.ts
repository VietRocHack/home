import { Hackathon, Photo, Meme } from '@/utils/dataUtils';

export interface GalleryPhoto {
  photo: Photo;
  hackathon: Hackathon;
}

export type ViewMode = 'grid' | 'timeline' | 'hackathons' | 'fun';
export type SortOrder = 'newest' | 'oldest';

export interface HackathonGrouping {
  hackathon: Hackathon;
  photos: GalleryPhoto[];
} 