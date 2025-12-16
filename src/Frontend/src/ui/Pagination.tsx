import React from 'react';

type Props = {
  count: number;
  page: number;
  onChange: (_: any, value: number) => void;
};

export default function Pagination({ count, page, onChange }: Props) {
  const pages = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <div className="inline-flex gap-2">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(null, p)}
          className={`px-3 py-1 rounded-md ${p === page ? 'bg-brand-600 text-white' : 'bg-slate-700 text-slate-100'}`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
