"use client";

import { useState, useEffect } from 'react';

interface AnimatedStatProps {
  title: string;
  value: number | string;
  subtext: string;
}

export default function AnimatedStat({ title, value, subtext }: AnimatedStatProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById(`stat-${title.replace(/\s+/g, '-').toLowerCase()}`);
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [title]);
  
  useEffect(() => {
    if (!isAnimated || typeof value !== 'number') return;
    
    let start = 0;
    const end = value;
    const duration = 2000;
    const startTime = performance.now();
    
    const animateCount = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentCount = Math.floor(progress * (end - start) + start);
      
      setDisplayValue(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    
    requestAnimationFrame(animateCount);
  }, [isAnimated, value]);
  
  return (
    <div 
      id={`stat-${title.replace(/\s+/g, '-').toLowerCase()}`}
      className="bg-[var(--background-secondary)] p-8 rounded-lg text-center"
    >
      <h3 className="text-2xl font-bold mb-1">{title}</h3>
      <p className="text-5xl font-bold text-[var(--accent-cyan)] my-3">
        {typeof value === 'number' ? displayValue : value}
      </p>
      <p className="text-[var(--foreground-secondary)]">{subtext}</p>
    </div>
  );
} 