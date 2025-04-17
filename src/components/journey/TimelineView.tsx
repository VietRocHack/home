"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GalleryPhoto } from './types';

interface TimelineViewProps {
  photos: GalleryPhoto[];
  getImagePath: (path: string) => string;
  onPhotoClick: (index: number) => void;
}

export default function TimelineView({ photos, getImagePath, onPhotoClick }: TimelineViewProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute top-0 bottom-0 left-6 sm:left-1/2 w-0.5 bg-gray-700 transform -translate-x-1/2" />
      
      {photos.map((item, index) => (
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
              onClick={() => onPhotoClick(index)}
            >
              <Image
                src={getImagePath(item.photo.src)}
                alt={item.photo.caption}
                fill
                className="object-cover transition-all duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
                unoptimized={item.photo.src.startsWith('http')}
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
  );
} 