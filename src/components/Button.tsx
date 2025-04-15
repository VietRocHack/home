"use client";
import React, { useState } from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const baseStyles = 'font-medium transition-all duration-300 rounded-lg transform cursor-pointer overflow-hidden';
  
  const variantStyles = {
    primary: `bg-[var(--accent-red)] text-white hover:bg-[#ff2a25] hover:-translate-y-1 
      shadow-md hover:shadow-lg hover:shadow-[var(--accent-red)]/30 active:translate-y-0 
      active:shadow-sm active:bg-opacity-90 relative 
      after:absolute after:inset-0 after:rounded-lg after:opacity-0 
      after:bg-white after:mix-blend-overlay hover:after:opacity-20 
      after:transition-opacity after:duration-300
      animate-gradient`,
    
    secondary: `bg-[var(--accent-yellow)] text-[var(--background)] hover:bg-[#eecf00] hover:-translate-y-1 
      shadow-md hover:shadow-lg hover:shadow-[var(--accent-yellow)]/30 active:translate-y-0 
      active:shadow-sm active:bg-opacity-90 relative 
      after:absolute after:inset-0 after:rounded-lg after:opacity-0 
      after:bg-white after:mix-blend-overlay hover:after:opacity-20 
      after:transition-opacity after:duration-300`,
    
    ghost: `border border-gray-400 text-[var(--foreground)] hover:bg-gray-800 
      hover:border-[var(--accent-yellow)]/40 hover:-translate-y-1 hover:shadow-md active:translate-y-0 
      active:shadow-none hover:text-white relative
      after:absolute after:inset-0 after:rounded-lg after:opacity-0 
      after:bg-[var(--accent-yellow)]/10 hover:after:opacity-30 
      after:transition-opacity after:duration-300`,
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };
  
  const disabledStyles = disabled 
    ? 'opacity-50 cursor-not-allowed hover:transform-none hover:shadow-none after:hidden' 
    : '';
  
  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (disabled) return;
        setIsHovered(true);
        
        if (variant === 'primary') {
          e.currentTarget.style.animation = 'pulse 2s infinite ease-in-out';
        } else if (variant === 'secondary') {
          e.currentTarget.style.animation = 'glow 2s infinite ease-in-out';
        }
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        setIsHovered(false);
        
        if (variant === 'primary' || variant === 'secondary') {
          e.currentTarget.style.animation = 'none';
        }
      }}
    >
      {children}
      
      {/* Shine effect for ghost button */}
      {variant === 'ghost' && !disabled && isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
          <div className="shine-effect"></div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 60, 56, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(255, 60, 56, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 60, 56, 0);
          }
        }
        
        @keyframes glow {
          0% {
            box-shadow: 0 0 5px rgba(255, 220, 0, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 220, 0, 0.8);
          }
          100% {
            box-shadow: 0 0 5px rgba(255, 220, 0, 0.5);
          }
        }
        
        .shine-effect {
          position: absolute;
          top: -100%;
          left: -100%;
          right: -100%;
          bottom: -100%;
          background: linear-gradient(
            115deg,
            transparent 0%,
            transparent 25%,
            rgba(255, 220, 0, 0.15) 45%,
            rgba(255, 220, 0, 0.3) 50%,
            rgba(255, 220, 0, 0.15) 55%,
            transparent 75%,
            transparent 100%
          );
          pointer-events: none;
          transform: rotate(35deg) translateY(0%);
          animation: shine 1.5s ease-in-out;
        }
        
        @keyframes shine {
          0% {
            transform: rotate(35deg) translateY(-120%);
          }
          100% {
            transform: rotate(35deg) translateY(120%);
          }
        }
      `}</style>
    </button>
  );
}
