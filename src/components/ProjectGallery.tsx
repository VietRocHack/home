"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { getAllProjects, Project, getHackathonByProjectId } from '@/utils/dataUtils';

export default function ProjectGallery({ hackathonId }: { hackathonId?: string }) {
  const [activeProject, setActiveProject] = useState(0);
  const [previousProject, setPreviousProject] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentProjectIndexRef = useRef<number>(0);

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
  
  // Keep the ref in sync with the state
  useEffect(() => {
    currentProjectIndexRef.current = activeProject;
  }, [activeProject]);

  // Function to change project with direction animation
  const changeProject = (newIndex: number) => {
    if (newIndex === activeProject || isAnimating) return;
    
    // Set animating state
    setIsAnimating(true);
    
    // Clear existing timer when manually changing
    if (autoRotateTimerRef.current) {
      clearInterval(autoRotateTimerRef.current);
      autoRotateTimerRef.current = null;
    }
    
    // Save previous project
    setPreviousProject(activeProject);
    
    // Determine slide direction
    setSlideDirection(newIndex > activeProject ? 'left' : 'right');
    setActiveProject(newIndex);
    
    // Reset animation after it completes
    setTimeout(() => {
      setSlideDirection(null);
      setIsAnimating(false);
      
      // Restart auto-rotation after manual change
      if (!isPaused) {
        startAutoRotation();
      }
    }, 500); // Match this to the CSS transition duration
  };

  // Function to start auto-rotation
  const startAutoRotation = () => {
    // Clear any existing timer first
    if (autoRotateTimerRef.current) {
      clearInterval(autoRotateTimerRef.current);
    }
    
    // Start a new timer
    autoRotateTimerRef.current = setInterval(() => {
      if (!isAnimating && !isPaused && projects.length > 1) {
        // Use the ref to get the current index to avoid closure issues
        const nextIndex = (currentProjectIndexRef.current + 1) % projects.length;
        changeProject(nextIndex);
      }
    }, 5000);
  };

  // Auto-rotate projects
  useEffect(() => {
    if (projects.length <= 1) return;
    
    startAutoRotation();
    
    // Cleanup on unmount
    return () => {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current);
      }
    };
  }, [projects.length, isPaused]); // Keep isPaused dependency

  // Helper to format the image path correctly
  const getImagePath = (path: string) => {
    if (!path) return '/placeholder-project.svg';
    return path.startsWith('/') ? path : `/${path}`;
  };

  // Create fade-slide animations for image and content
  useEffect(() => {
    // Add custom animation keyframes
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeSlideInLeft {
        from { 
          transform: translateX(100%);
          opacity: 0;
        }
        to { 
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes fadeSlideOutLeft {
        from { 
          transform: translateX(0);
          opacity: 1;
        }
        to { 
          transform: translateX(-100%);
          opacity: 0;
        }
      }
      
      @keyframes fadeSlideInRight {
        from { 
          transform: translateX(-100%);
          opacity: 0;
        }
        to { 
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes fadeSlideOutRight {
        from { 
          transform: translateX(0);
          opacity: 1;
        }
        to { 
          transform: translateX(100%);
          opacity: 0;
        }
      }
      
      .animate-fade-slide-in-left {
        animation: fadeSlideInLeft 0.5s ease-in-out forwards;
      }
      
      .animate-fade-slide-out-left {
        animation: fadeSlideOutLeft 0.5s ease-in-out forwards;
      }
      
      .animate-fade-slide-in-right {
        animation: fadeSlideInRight 0.5s ease-in-out forwards;
      }
      
      .animate-fade-slide-out-right {
        animation: fadeSlideOutRight 0.5s ease-in-out forwards;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

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
            disabled={isAnimating}
          >
            ←
          </button>
          <button 
            onClick={() => changeProject((activeProject + 1) % projects.length)}
            className="bg-black bg-opacity-50 hover:bg-opacity-70 p-3 rounded-full text-white"
            aria-label="Next project"
            disabled={isAnimating}
          >
            →
          </button>
        </div>

        {/* Slide container */}
        <div className="relative h-[36rem]">
          {/* Previous project (visible during animation) */}
          {isAnimating && (
            <Card variant="project" className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${
              slideDirection === 'left' ? 'animate-fade-slide-out-left' : 
              slideDirection === 'right' ? 'animate-fade-slide-out-right' : ''
            }`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                {/* Project image */}
                <div className="relative h-50 lg:h-full rounded-lg overflow-hidden">
                  <Image
                    src={getImagePath(projects[previousProject].thumbnail)}
                    alt={projects[previousProject].name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                {/* Project details */}
                <div className="flex flex-col h-full max-h-full overflow-hidden">
                  <h3 className="text-2xl font-bold mb-2">{projects[previousProject].name}</h3>
                  <p className="text-[var(--accent-yellow)] mb-2">{projects[previousProject].tagline}</p>
                  
                  {/* Scrollable description */}
                  <div className="overflow-y-auto custom-scrollbar mb-4 flex-grow">
                    <p className="text-[var(--foreground-secondary)]">
                      {projects[previousProject].description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {projects[previousProject].techStack.slice(0, 5).map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {projects[previousProject].achievements.map((achievement, i) => (
                      <span key={i} className="px-3 py-1 bg-[var(--accent-red)] bg-opacity-20 text-[var(--accent-red)] rounded-full text-sm">
                        {achievement}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {projects[previousProject].githubLink && (
                      <Link href={projects[previousProject].githubLink}>
                        <Button variant="secondary" size="sm">GitHub</Button>
                      </Link>
                    )}
                    
                    {projects[previousProject].demoLink && (
                      <Link href={projects[previousProject].demoLink}>
                        <Button variant="ghost" size="sm">Live Demo</Button>
                      </Link>
                    )}
                    
                    {projects[previousProject].devpostLink && (
                      <Link href={projects[previousProject].devpostLink}>
                        <Button variant="secondary" size="sm">Devpost</Button>
                      </Link>
                    )}
                    
                    {projects[previousProject].youtubeDemo && (
                      <Link href={projects[previousProject].youtubeDemo}>
                        <Button variant="ghost" size="sm">Video Demo</Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Current project */}
          <Card variant="project" className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${
            slideDirection === 'left' ? 'animate-fade-slide-in-left' : 
            slideDirection === 'right' ? 'animate-fade-slide-in-right' : ''
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              {/* Project image */}
              <div className="relative h-50 lg:h-full rounded-lg overflow-hidden">
                <Image
                  src={getImagePath(projects[activeProject].thumbnail)}
                  alt={projects[activeProject].name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              {/* Project details */}
              <div className="flex flex-col h-full max-h-full overflow-hidden">
                <h3 className="text-2xl font-bold mb-2">{projects[activeProject].name}</h3>
                <p className="text-[var(--accent-yellow)] mb-2">{projects[activeProject].tagline}</p>
                
                {/* Scrollable description */}
                <div className="overflow-y-auto custom-scrollbar mb-4 flex-grow">
                  <p className="text-[var(--foreground-secondary)]">
                    {projects[activeProject].description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {projects[activeProject].techStack.slice(0, 5).map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
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
            disabled={isAnimating}
          />
        ))}
      </div>

      {/* Custom scrollbar styling */}
      <style jsx global>{`
        /* Custom scrollbar styling */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--accent-red);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ff5a5a;
        }
      `}</style>
    </div>
  );
} 