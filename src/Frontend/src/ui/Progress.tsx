import React from 'react';

export function LinearProgress() {
  return (
    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
      <div className="h-2 w-1/3 bg-brand-600 animate-pulse" />
    </div>
  );
}

export function CircularProgress() {
  return (
    <div className="w-12 h-12 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
  );
}

export default LinearProgress;
