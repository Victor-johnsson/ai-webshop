import React from 'react';
import { createPortal } from 'react-dom';

type Props = {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export default function Dialog({ open, onClose, title, children, className = '' }: Props) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className={`relative z-10 bg-slate-800 text-slate-100 rounded-lg shadow-md w-full max-w-2xl p-4 ${className}`}>
        {title && <div className="text-lg font-semibold mb-2 text-slate-100">{title}</div>}
        <div>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
