import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'contained' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

const base = 'inline-flex items-center justify-center gap-2 rounded-full font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2';
const sizes: Record<string, string> = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-3 text-base',
};
const variants: Record<string, string> = {
  contained:
    'bg-gradient-to-r from-brand-500 to-brand-600 text-white hover:brightness-105 shadow-[0_6px_18px_rgba(203,166,247,0.12)] ring-0',
  outlined: 'bg-transparent border border-[rgba(203,166,247,0.12)] text-slate-100 hover:bg-slate-700/30',
  ghost: 'bg-transparent text-slate-200 hover:bg-slate-700/20',
};

export default function Button({ variant = 'contained', size = 'md', className = '', children, ...props }: Props) {
  const sizeCls = sizes[size] || sizes.md;
  return (
    <button className={`${base} ${sizeCls} ${variants[variant]} ${className} focus:ring-2 focus:ring-[rgba(203,166,247,0.18)]`} {...props}>
      {children}
    </button>
  );
}
