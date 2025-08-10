
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { List, X, CreditCard, Users, LogIn, LayoutDashboard, User, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import krownLogo from '@/assets/krown-logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when changing routes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Cafés', path: '/cafes', icon: <List className="w-4 h-4" /> },
    { name: 'DineOut', path: '/dineout', icon: <CreditCard className="w-4 h-4" /> },
    { name: 'My Pass', path: '/loyalty-card', icon: <CreditCard className="w-4 h-4" /> },
    { name: 'Refer', path: '/referral', icon: <Users className="w-4 h-4" /> },
    { name: 'Profile', path: '/profile', icon: <User className="w-4 h-4" /> },
    { name: 'Login', path: '/login', icon: <LogIn className="w-4 h-4" /> },
    { name: 'Admin', path: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8",
        isScrolled ? "py-3 glass backdrop-blur-xl" : "py-5 bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-sm"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <NavLink to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <img 
              src={krownLogo}
              alt="Krown Logo"
              className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300" 
            />
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse-soft opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-bold text-xl hidden md:block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            BrewPass
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-2">
          {navItems.map((item) => (
            <NavLink 
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              <span className="flex items-center space-x-2">
                {item.icon} <span>{item.name}</span>
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-3 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-all duration-300"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5 text-primary" />
          ) : (
            <List className="w-5 h-5 text-primary" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 z-40 backdrop-blur-xl pt-20 px-6 transition-all duration-300 ease-in-out",
        "bg-gradient-to-br from-background/95 via-primary/10 to-accent/10",
        isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}>
        <nav className="flex flex-col space-y-4 items-center pt-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center space-x-3 text-lg font-medium py-4 px-6 rounded-full transition-all duration-300 w-64 justify-center",
                "border backdrop-blur-sm",
                isActive 
                  ? "bg-gradient-to-r from-primary to-accent text-white border-primary/30 shadow-lg" 
                  : "bg-white/20 text-foreground border-primary/20 hover:bg-primary/10 hover:border-primary/40"
              )}
            >
              {item.icon} <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
