"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { getAllProjects, Project, getHackathonByProjectId } from '@/utils/dataUtils';

export default function ProjectGallery({ hackathonId }: { hackathonId?: string }) {
  const [activeProject, setActiveProject] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  // Load projects
  useEffect(() => {
    const allProjects = getAllProjects();
    
    // Filter by hackathon if specified
    const filteredProjects = hackathonId 
      ? allProjects.filter(project => {
        const hackathon = getHackathonByProjectId(project.id);
        return hackathon?.id === hackathonId;
      })
      : allProjects;
    
    setProjects(filteredProjects);
  }, [hackathonId]);

  // Function to change project with direction animation
  const changeProject = (newIndex: number) => {
    if (newIndex === activeProject) return;
    
    // Determine slide direction
    setSlideDirection(newIndex > activeProject ? 'left' : 'right');
    setActiveProject(newIndex);
    
    // Reset animation after it completes
    setTimeout(() => {
      setSlideDirection(null);
    }, 500); // Match this to the CSS transition duration
  };

  // Auto-rotate projects every 5 seconds
  useEffect(() => {
    if (projects.length <= 1 || isPaused) return;
    
    const timer = setInterval(() => {
      changeProject((activeProject + 1) % projects.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [projects.length, isPaused, activeProject]);

  // Helper to format the image path correctly
  const getImagePath = (path: string) => {
    if (!path) return '/placeholder-project.svg';
    return path.startsWith('/') ? path : `/${path}`;
  };

  // If no projects, show empty state
  if (projects.length === 0) {
    return <div className="text-center py-8">No projects found.</div>;
  }

  return (
    <div className="w-full">
      {/* Project display */}
      <div className="relative mb-8 overflow-hidden" 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}>
        {/* Navigation buttons */}
        <div className="flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 px-2">
          <button 
            onClick={() => changeProject((activeProject - 1 + projects.length) % projects.length)}
            className="bg-black bg-opacity-50 hover:bg-opacity-70 p-3 rounded-full text-white"
            aria-label="Previous project"
          >
            ←
          </button>
          <button 
            onClick={() => changeProject((activeProject + 1) % projects.length)}
            className="bg-black bg-opacity-50 hover:bg-opacity-70 p-3 rounded-full text-white"
            aria-label="Next project"
          >
            →
          </button>
        </div>

        {/* Current project */}
        <Card variant="project" className={`relative transition-transform duration-500 ease-in-out ${
          slideDirection === 'left' ? 'animate-slide-left' : 
          slideDirection === 'right' ? 'animate-slide-right' : ''
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project image */}
            <div className="relative h-64 lg:h-auto rounded-lg overflow-hidden">
              <Image
                src={getImagePath(projects[activeProject].thumbnail)}
                alt={projects[activeProject].name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Project details */}
            <div>
              <h3 className="text-2xl font-bold mb-2">{projects[activeProject].name}</h3>
              <p className="text-[var(--accent-yellow)] mb-2">{projects[activeProject].tagline}</p>
              <p className="text-[var(--foreground-secondary)] mb-4">
                {projects[activeProject].description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {projects[activeProject].techStack.slice(0, 5).map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {projects[activeProject].achievements.map((achievement, i) => (
                  <span key={i} className="px-3 py-1 bg-[var(--accent-red)] bg-opacity-20 text-[var(--accent-red)] rounded-full text-sm">
                    {achievement}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-3">
                {projects[activeProject].githubLink && (
                  <Link href={projects[activeProject].githubLink}>
                    <Button variant="secondary" size="sm">GitHub</Button>
                  </Link>
                )}
                
                {projects[activeProject].demoLink && (
                  <Link href={projects[activeProject].demoLink}>
                    <Button variant="ghost" size="sm">Live Demo</Button>
                  </Link>
                )}
                
                {projects[activeProject].devpostLink && (
                  <Link href={projects[activeProject].devpostLink}>
                    <Button variant="secondary" size="sm">Devpost</Button>
                  </Link>
                )}
                
                {projects[activeProject].youtubeDemo && (
                  <Link href={projects[activeProject].youtubeDemo}>
                    <Button variant="ghost" size="sm">Video Demo</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Project navigation dots */}
      <div className="flex justify-center gap-2 mt-4">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => changeProject(index)}
            className={`w-3 h-3 rounded-full ${
              index === activeProject ? 'bg-[var(--accent-red)]' : 'bg-gray-500'
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>

      {/* Add animation keyframes */}
      <style jsx global>{`
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes slideRight {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        
        .animate-slide-left {
          animation: slideLeft 0.5s ease-in-out forwards;
        }
        
        .animate-slide-right {
          animation: slideRight 0.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
} 