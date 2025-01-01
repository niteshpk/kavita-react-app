import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/use-auth';
import { cn } from '../../lib/utils';
import { userNavItems, adminNavItems } from './nav-items';

export function Navbar() {
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [...userNavItems, ...(isAdmin ? adminNavItems : [])];

  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-primary/10"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium",
                  "hover:bg-primary/10 transition-colors",
                  location.pathname === href ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop profile menu */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/profile"
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium",
                "hover:bg-primary/10 transition-colors",
                location.pathname === '/profile' ? "text-primary" : "text-muted-foreground"
              )}
            >
              <User className="h-4 w-4" />
              <span>{user?.name || 'Profile'}</span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-primary/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium w-full",
                  "hover:bg-primary/10 transition-colors",
                  location.pathname === href ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
            <hr className="border-border my-2" />
            <Link
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium w-full",
                "hover:bg-primary/10 transition-colors",
                location.pathname === '/profile' ? "text-primary" : "text-muted-foreground"
              )}
            >
              <User className="h-4 w-4" />
              <span>{user?.name || 'Profile'}</span>
            </Link>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                logout();
              }}
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-primary/10 transition-colors w-full"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}