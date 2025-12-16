import React from 'react';
import Button from '../ui/Button';

export default function UnauthorizedComponent({ error, onLogout }: any) {
  return (
    <div className="h-screen flex items-center justify-center bg-transparent">
      <div className="text-center card p-6 max-w-md">
        <h2 className="text-2xl font-semibold mb-3 text-slate-100">Unauthorized</h2>
        <p className="mb-4 text-slate-300">{error || 'Access denied'}</p>
        <Button onClick={onLogout}>Logout</Button>
      </div>
    </div>
  );
}
