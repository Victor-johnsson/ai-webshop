import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

type Props = {
  title: string;
  showCart?: boolean;
  cartItemCount?: number;
  onCartClick?: () => void;
  logoutButton?: boolean;
  onLogoutClick?: () => void;
  adminLinks?: boolean;
};

export default function AppBarComponent({ title, showCart, cartItemCount = 0, onCartClick, logoutButton, onLogoutClick, adminLinks = false }: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[rgba(31,29,46,0.6)] backdrop-blur-sm border-b border-[rgba(203,166,247,0.04)] z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <Link to="/" className="flex items-center gap-3 text-xl font-semibold text-slate-100 hover:opacity-90">
            <span className="w-2 h-2 rounded-full bg-[var(--cp-mauve)] shadow-[0_4px_14px_rgba(203,166,247,0.12)]" />
            <span>{title}</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {showCart && (
            <Button variant="ghost" onClick={onCartClick} className="relative">
              Cart
              {cartItemCount > 0 && <span className="ml-2 inline-block bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full">{cartItemCount}</span>}
            </Button>
          )}
          {adminLinks && (
            <Link to="/admin/reviews">
              <Button variant="outlined">Reviews</Button>
            </Link>
          )}
          {logoutButton && (
            <Button variant="outlined" onClick={onLogoutClick}>Logout</Button>
          )}
        </div>
      </div>
    </header>
  );
}
