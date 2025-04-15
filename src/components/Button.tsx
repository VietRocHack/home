"use client";
import React from 'react';

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
  const baseStyles = 'font-medium transition-all duration-200 rounded-lg transform';
  
  const variantStyles = {
    primary: 'bg-[var(--accent-red)] text-white hover:bg-[#ff2a25] hover:-translate-y-0.5 shadow-md hover:shadow-lg hover:shadow-[var(--accent-red)]/30 active:translate-y-0 active:shadow-sm active:bg-opacity-90',
    secondary: 'bg-[var(--accent-cyan)] text-[var(--background)] hover:bg-[#19c6e0] hover:-translate-y-0.5 shadow-md hover:shadow-lg hover:shadow-[var(--accent-cyan)]/30 active:translate-y-0 active:shadow-sm active:bg-opacity-90',
    ghost: 'border border-gray-400 text-[var(--foreground)] hover:bg-gray-800 hover:border-gray-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-none',
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };
  
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed hover:transform-none hover:shadow-none' : '';
  
  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
