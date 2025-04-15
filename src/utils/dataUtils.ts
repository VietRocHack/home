import hackathonData from '@/data/hackathons.json';
import teamData from '@/data/team.json';

// Types
export interface Photo {
  src: string;
  caption: string;
  isFeatured: boolean;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  thumbnail: string;
  demoLink: string;
  githubLink: string;
  devpostLink: string;
  youtubeDemo: string | null;
  techStack: string[];
  achievements: string[];
  teamMembers: string[];
  screenshots: string[];
  featured: boolean;
}

export interface Hackathon {
  id: string;
  name: string;
  year: number;
  date: string;
  location: string;
  city: string;
  state: string;
  achievement: string;
  description: string;
  mainImage: string;
  website: string;
  photos: Photo[];
  projects: Project[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  school: string;
  major: string;
  graduation: number;
  bio: string;
  photo: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  skills: string[];
}

export interface Statistics {
  hackathonsEntered: number;
  projectsBuilt: number;
  prizesWon: number;
  codeLines: number;
  coffeeConsumed: number;
  sleepLost: string;
}

// Helper functions to access data

/**
 * Get all hackathons
 */
export function getAllHackathons(): Hackathon[] {
  return hackathonData.hackathons;
}

/**
 * Get a specific hackathon by ID
 */
export function getHackathonById(id: string): Hackathon | undefined {
  return hackathonData.hackathons.find(hackathon => hackathon.id === id);
}

/**
 * Get hackathons sorted by date (most recent first)
 */
export function getHackathonsByDate(): Hackathon[] {
  return [...hackathonData.hackathons].sort((a, b) => b.year - a.year);
}

/**
 * Get all projects from all hackathons
 */
export function getAllProjects(): Project[] {
  return hackathonData.hackathons.flatMap(hackathon => hackathon.projects);
}

/**
 * Get featured projects
 */
export function getFeaturedProjects(limit?: number): Project[] {
  const featured = getAllProjects().filter(project => project.featured);
  return limit ? featured.slice(0, limit) : featured;
}

/**
 * Get a specific project by ID
 */
export function getProjectById(id: string): Project | undefined {
  return getAllProjects().find(project => project.id === id);
}

/**
 * Get the hackathon a project belongs to
 */
export function getHackathonByProjectId(projectId: string): Hackathon | undefined {
  return hackathonData.hackathons.find(
    hackathon => hackathon.projects.some(project => project.id === projectId)
  );
}

/**
 * Get all team members
 */
export function getAllTeamMembers(): TeamMember[] {
  return teamData.team;
}

/**
 * Get a specific team member by ID
 */
export function getTeamMemberById(id: string): TeamMember | undefined {
  return teamData.team.find(member => member.id === id);
}

/**
 * Get all photos from all hackathons
 */
export function getAllPhotos(): { photo: Photo; hackathon: Hackathon }[] {
  return hackathonData.hackathons.flatMap(hackathon => 
    hackathon.photos.map(photo => ({
      photo,
      hackathon
    }))
  );
}

/**
 * Get featured photos from all hackathons
 */
export function getFeaturedPhotos(limit?: number): { photo: Photo; hackathon: Hackathon }[] {
  const featured = getAllPhotos().filter(item => item.photo.isFeatured);
  return limit ? featured.slice(0, limit) : featured;
}

/**
 * Get statistics
 */
export function getStatistics(): Statistics {
  return hackathonData.statistics;
}

/**
 * Get summary statistics (e.g., for the homepage)
 */
export function getSummaryStatistics() {
  const stats = getStatistics();
  return {
    hackathonsEntered: stats.hackathonsEntered,
    prizesWon: stats.prizesWon,
    coffeeConsumed: stats.coffeeConsumed,
    sleepLost: stats.sleepLost
  };
} 