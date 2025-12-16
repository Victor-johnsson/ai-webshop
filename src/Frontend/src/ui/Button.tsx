import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'contained' | 'outlined' | 'ghost';
};

const base = 'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium';
const variants: Record<string, string> = {
  contained: 'bg-blue-600 text-white hover:bg-blue-700',
  outlined: 'border border-gray-300 text-gray-800 hover:bg-gray-100',
  ghost: 'bg-transparent text-gray-800 hover:bg-gray-50',
};

export default function Button({ variant = 'contained', className = '', children, ...props }: Props) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
