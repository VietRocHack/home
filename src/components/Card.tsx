"use client";
import React from 'react';

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
  const baseStyles = 'bg-[var(--background-secondary)] rounded-2xl shadow-lg p-6 border border-gray-800 transition-all duration-300';
  
  const variantStyles = {
    default: 'hover:shadow-xl',
    project: 'hover:border-[var(--accent-red)] hover:shadow-xl hover:shadow-[var(--accent-red)]/10 hover:-translate-y-1',
    team: 'hover:border-[var(--accent-yellow)] hover:shadow-xl hover:shadow-[var(--accent-yellow)]/10 hover:-translate-y-1',
    zoom: 'hover:scale-105 hover:shadow-xl',
  };
  
  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
} 