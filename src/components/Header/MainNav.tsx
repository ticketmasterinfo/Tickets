import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Music, 
  Trophy, 
  Theater, 
  Users, 
  Sparkles, 
  Flame,
  ChevronRight,
  Ticket
} from 'lucide-react';

interface MainNavProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenMyTickets: () => void;
  purchasedCount: number;
}

export const MainNav: React.FC<MainNavProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenMyTickets,
  purchasedCount
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Events', icon: Sparkles },
    { id: 'Concerts', label: 'Concerts', icon: Music },
    { id: 'Sports', label: 'Sports', icon: Trophy },
    { id: 'Arts & Theater', label: 'Arts & Theater', icon: Theater },
    { id: 'Family', label: 'Family', icon: Users },
    { id: 'VIP', label: 'VIP Packages', icon: Flame, isSpecial: true }
  ];

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-[#024ddf] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Brand Logo & Category Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <button 
              id="brand-logo-btn"
              onClick={() => onSelectCategory('all')} 
              className="flex items-center space-x-1.5 focus:outline-none focus:ring-2 focus:ring-white rounded py-1 pr-2 text-left"
              aria-label="Ticketmaster Home"
            >
              <div className="flex items-center">
                <span className="text-2xl md:text-3xl font-black italic tracking-tighter text-white uppercase">
                  ticket<span className="text-[#ffb932]">master</span>
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest bg-white/20 px-1.5 py-0.5 rounded text-white">
                  LIVE
                </span>
              </div>
            </button>

            {/* Desktop Category Navigation */}
            <nav id="desktop-category-nav" className="hidden lg:flex items-center space-x-1" aria-label="Primary Navigation">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    id={`nav-cat-${cat.id.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-md text-[15px] font-semibold transition-all flex items-center space-x-1.5 ${
                      isActive 
                        ? 'bg-white text-[#024ddf] shadow-sm' 
                        : 'text-white/90 hover:bg-[#0139a7] hover:text-white'
                    } ${cat.isSpecial ? 'text-[#ffb932]' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Controls: My Tickets Quick CTA & Mobile Hamburger */}
          <div className="flex items-center space-x-3">
            <button
              id="main-nav-my-tickets-btn"
              onClick={onOpenMyTickets}
              className="hidden sm:flex items-center space-x-2 bg-[#ffb932] hover:bg-[#f59e0b] text-[#121212] font-bold text-sm px-4 py-2 rounded-md shadow-sm transition-transform active:scale-95"
            >
              <Ticket className="w-4 h-4 text-[#121212]" />
              <span>My Tickets</span>
              {purchasedCount > 0 && (
                <span className="bg-[#121212] text-white text-xs px-1.5 py-0.5 rounded-full">
                  {purchasedCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-[#0139a7] text-white focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Toggle Mobile Navigation"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-navigation-drawer"
          className="lg:hidden bg-[#0139a7] border-t border-blue-600 px-4 py-4 space-y-2 animate-in slide-in-from-top-2"
        >
          <div className="text-xs font-bold uppercase tracking-wider text-blue-200 px-2 pb-1">
            Browse Categories
          </div>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                  isActive ? 'bg-white text-[#024ddf]' : 'text-white hover:bg-blue-800'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>
            );
          })}

          <div className="pt-3 border-t border-blue-600 mt-2">
            <button
              onClick={() => {
                onOpenMyTickets();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 bg-[#ffb932] text-[#121212] font-bold py-2.5 rounded-md"
            >
              <Ticket className="w-4 h-4" />
              <span>View My Tickets ({purchasedCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
