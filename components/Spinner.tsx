
import React from 'react';

interface SpinnerProps {
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ className = 'w-8 h-8' }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="50" cy="50" r="45" strokeWidth="5" stroke="rgba(79, 70, 229, 0.3)" />
      <path
        d="M50 5 A 45 45 0 0 1 95 50"
        strokeWidth="5"
        stroke="rgb(129, 140, 248)"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};
