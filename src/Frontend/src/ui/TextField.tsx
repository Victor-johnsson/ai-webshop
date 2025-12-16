import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function TextField({ label, className = '', ...props }: Props) {
  return (
    <label className={`flex flex-col text-sm ${className}`}>
      {label && <span className="mb-1 text-gray-700">{label}</span>}
      <input className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" {...props} />
    </label>
  );
}
