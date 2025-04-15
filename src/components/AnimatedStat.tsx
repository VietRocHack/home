"use client";

import { useState, useEffect } from 'react';

interface AnimatedStatProps {
  title: string;
  value: number | string;
  subtext: string;
}

export default function AnimatedStat({ title, value, subtext }: AnimatedStatProps) {
  const [displayValue, setDisplayValue] = useState<number | string>(typeof value === 'number' ? 0 : value);
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation to count up to the target value
  useEffect(() => {
    if (typeof value !== 'number' || !isVisible) return;
    
    let start = 0;
    const end = parseInt(value.toString(), 10);
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      setDisplayValue(Math.floor(start));
      
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      }
    }, 16);
    
    return () => {
      clearInterval(timer);
    };
  }, [value, isVisible]);
  
  // Intersection observer to trigger animation when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById(`stat-${title.replace(/\s+/g, '-').toLowerCase()}`);
    if (element) observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  }, [title]);
  
  return (
    <div 
      id={`stat-${title.replace(/\s+/g, '-').toLowerCase()}`}
      className="bg-[var(--background-secondary)] p-8 rounded-lg text-center"
    >
      <h3 className="text-2xl font-bold mb-1">{title}</h3>
      <p className="text-5xl font-bold text-[var(--accent-yellow)] my-3">
        {displayValue}
      </p>
      <p className="text-[var(--foreground-secondary)]">{subtext}</p>
    </div>
  );
} 