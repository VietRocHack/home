"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Meme } from '@/utils/dataUtils';

interface FunThingsViewProps {
  memes: Meme[];
  getImagePath: (path: string) => string;
  onMemeClick: (index: number) => void;
}

export default function FunThingsView({ memes, getImagePath, onMemeClick }: FunThingsViewProps) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">Fun Things</h2>
        <p className="text-[var(--foreground-secondary)]">Behind-the-scenes moments and team memories</p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {memes.map((meme, index) => (
          <motion.div 
            key={meme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.03 }}
            className="relative overflow-hidden rounded-lg cursor-pointer group bg-gray-900 shadow-xl"
            onClick={() => onMemeClick(index)}
          >
            <div className="aspect-square relative">
              <Image
                src={getImagePath(meme.src)}
                alt={meme.caption}
                fill
                className="object-cover transition-all duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-lg text-white mb-1">{meme.caption}</h3>
              <p className="text-gray-300 text-sm mb-2">{meme.date}</p>
              <p className="text-gray-400 text-sm">{meme.context}</p>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {meme.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-2 py-1 bg-[var(--accent-yellow)] text-black font-medium rounded-md text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 