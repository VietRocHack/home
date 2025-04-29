"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/utils/dataUtils";

interface ProjectIntroProps {
  projects: Project[];
  onExploreClick: () => void;
  onBrowseClick: () => void;
  onProjectPreviewClick: (index: number) => void;
}

export default function ProjectIntro({ 
  projects, 
  onExploreClick, 
  onBrowseClick, 
  onProjectPreviewClick 
}: ProjectIntroProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
      <div className="text-center mb-8">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our <span className="text-[var(--accent-red)]">Projects</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          From innovative hackathon submissions to passion projects, explore the creative solutions
          we&apos;ve built across various technologies and domains.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button 
            onClick={onExploreClick} 
            className="px-6 py-3 bg-[var(--accent-red)] text-white font-medium rounded-lg hover:bg-opacity-80 transition-all flex items-center justify-center gap-2"
          >
            Start Exploring
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button 
            onClick={onBrowseClick} 
            className="px-6 py-3 bg-[var(--background-secondary)] text-white font-medium rounded-lg hover:bg-opacity-80 transition-all flex items-center justify-center gap-2"
          >
            View All Projects
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </motion.div>
      </div>
      
      <motion.div 
        className="mt-12 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-red)]/10 to-[var(--background)] rounded-lg"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {projects.slice(0, 5).map((project, index) => (
            <div 
              key={`preview-${project.id}`}
              className="aspect-video relative overflow-hidden rounded-lg cursor-pointer hover:scale-105 transition-all duration-300"
              onClick={() => onProjectPreviewClick(index)}
            >
              <Image
                src={`/${project.thumbnail}`}
                alt={project.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 hover:bg-black/30 transition-all flex items-center justify-center">
                <p className="text-white text-sm font-medium">{project.name}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 