"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GalleryPhoto } from './types';

interface GridViewProps {
  photos: GalleryPhoto[];
  getImagePath: (path: string) => string;
  onPhotoClick: (index: number) => void;
}

export default function GridView({ photos, getImagePath, onPhotoClick }: GridViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {photos.map((item, index) => (
        <motion.div 
          key={`${item.hackathon.id}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.02 }}
          className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group shadow-md"
          onClick={() => onPhotoClick(index)}
        >
          <Image
            src={getImagePath(item.photo.src)}
            alt={item.photo.caption}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized={item.photo.src.startsWith('http')}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
            <p className="text-white font-medium">{item.photo.caption}</p>
            <p className="text-gray-300 text-sm">{item.hackathon.name} • {item.hackathon.date}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
} 