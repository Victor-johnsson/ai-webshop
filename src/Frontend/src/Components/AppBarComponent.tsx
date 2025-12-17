import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

type Props = {
  title: string;
  showCart?: boolean;
  cartItemCount?: number;
  onCartClick?: () => void;
  logoutButton?: boolean;
  onLogoutClick?: () => void;
  adminLinks?: boolean;
};

export default function AppBarComponent({
  title,
  showCart = false,
  cartItemCount = 0,
  onCartClick,
  logoutButton = false,
  onLogoutClick,
  adminLinks = false,
}: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-900/60 backdrop-blur-sm border-b border-purple-300/[0.04] z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 text-xl font-semibold text-slate-100 hover:opacity-90 transition-opacity"
        >
          <span
            className="w-2 h-2 rounded-full bg-purple-400 shadow-lg shadow-purple-400/12"
            aria-hidden="true"
          />
          <span>{title}</span>
        </Link>

         <nav className="flex items-center gap-3" aria-label="Main navigation">
           <Button variant="ghost" as-child>
             <Link to="/faq">FAQ</Link>
           </Button>
          {showCart && onCartClick && (
            <Button
              variant="ghost"
              onClick={onCartClick}
              className="relative"
              aria-label={`Cart with ${cartItemCount} items`}
            >
              Cart
              {cartItemCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[1.25rem]">
                  {cartItemCount}
                </span>
              )}
            </Button>
          )}
          {adminLinks && (
            <Button variant="outlined" as-child>
              <Link to="/admin/reviews">Reviews</Link>
            </Button>
          )}
          {logoutButton && onLogoutClick && (
            <Button variant="outlined" onClick={onLogoutClick}>
              Logout
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
