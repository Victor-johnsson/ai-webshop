import React from 'react';
import Button from '../ui/Button';

export default function UnauthorizedComponent({ error, onLogout }: any) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-3">Unauthorized</h2>
        <p className="mb-4">{error || 'Access denied'}</p>
        <Button onClick={onLogout}>Logout</Button>
      </div>
    </div>
  );
}
