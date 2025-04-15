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
  const baseStyles = 'font-medium transition rounded-lg';
  
  const variantStyles = {
    primary: 'bg-[var(--accent-red)] text-white hover:bg-opacity-90 shadow-lg hover:shadow-[var(--accent-red)]/20',
    secondary: 'bg-[var(--accent-cyan)] text-[var(--background)] hover:bg-opacity-90 shadow-lg hover:shadow-[var(--accent-cyan)]/20',
    ghost: 'border border-gray-400 text-[var(--foreground)] hover:bg-gray-800',
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };
  
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
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
