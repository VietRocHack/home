"use client";
import React, { useState } from 'react';

type CardProps = {
  children: React.ReactNode;
  variant?: 'default' | 'project' | 'team' | 'zoom';
  className?: string;
};

export default function Card({
  children,
  variant = 'default',
  className = '',
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const baseStyles = 'bg-[var(--background-secondary)] rounded-2xl shadow-lg p-6 border border-gray-800 transition-all duration-300 cursor-pointer';
  
  const variantStyles = {
    default: 'hover:shadow-xl',
    project: 'hover:border-[var(--accent-red)] hover:shadow-xl hover:shadow-[var(--accent-red)]/20 hover:-translate-y-2',
    team: 'hover:border-[var(--accent-yellow)] hover:shadow-xl hover:shadow-[var(--accent-yellow)]/20 hover:-translate-y-2',
    zoom: 'hover:scale-105 hover:shadow-xl',
  };

  const getGlowStyles = () => {
    if (!isHovered) return {};
    
    const glowColors = {
      default: 'rgba(255, 255, 255, 0.1)',
      project: 'rgba(255, 60, 56, 0.15)',
      team: 'rgba(255, 220, 0, 0.15)',
      zoom: 'rgba(34, 211, 238, 0.15)'
    };
    
    return {
      boxShadow: `0 0 20px 5px ${glowColors[variant]}`,
    };
  };
  
  return (
    <div 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={getGlowStyles()}
    >
      {children}
    </div>
  );
} 