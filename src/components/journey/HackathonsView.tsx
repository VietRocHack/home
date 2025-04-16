"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HackathonGrouping } from './types';

interface HackathonsViewProps {
  hackathonGroups: HackathonGrouping[];
  getImagePath: (path: string) => string;
  onPhotoClick: (hackathonId: string, index: number) => void;
}

export default function HackathonsView({ 
  hackathonGroups, 
  getImagePath, 
  onPhotoClick 
}: HackathonsViewProps) {
  return (
    <div className="space-y-16">
      {hackathonGroups.map(({ hackathon, photos }) => (
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
                      onClick={() => onPhotoClick(hackathon.id, index)}
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
  );
} 