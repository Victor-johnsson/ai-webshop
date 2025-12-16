import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function TextField({ label, className = '', ...props }: Props) {
  return (
    <label className={`flex flex-col text-sm ${className}`}>
      {label && <span className="mb-1 text-slate-200">{label}</span>}
      <input className="input focus:ring-2 focus:ring-brand-500" {...props} />
    </label>
  );
}
