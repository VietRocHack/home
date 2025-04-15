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
  const baseStyles = 'bg-[var(--background-secondary)] rounded-2xl shadow-lg p-6 border border-gray-800';
  
  const variantStyles = {
    default: '',
    project: 'hover:border-[var(--accent-red)] transition duration-300',
    team: 'hover:border-[var(--accent-yellow)] transition duration-300',
    zoom: 'hover:scale-105 transition duration-300',
  };
  
  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
} 