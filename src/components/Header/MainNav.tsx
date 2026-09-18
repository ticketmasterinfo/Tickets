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
    { id: 'Concerts', label: 'Concerts', href: '/discover/concerts', testId: 'Concerts', icon: Music },
    { id: 'Sports', label: 'Sports', href: '/discover/sports', testId: 'Sports', icon: Trophy },
    { id: 'Arts & Theater', label: 'Arts, Theater & Comedy', href: '/discover/arts-theater', testId: 'Arts, Theater & Comedy', icon: Theater },
    { id: 'Family', label: 'Family', href: '/discover/family', testId: 'Family', icon: Users },
    { id: 'Cities', label: 'Cities', href: '/discover/cities', testId: 'Cities', icon: Sparkles }
  ];

  return (
    <header id="main-header" className="sc-9c727161-0 lgQjZq sticky top-0 z-40 bg-[#024ddf] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <nav data-testid="stickyHeader" aria-label="Main Navigation" className="sc-9c727161-1 eDZLXk flex items-center justify-between h-16 w-full">
          <div className="sc-9c727161-2 gxRBRI flex items-center">
            <div className="sc-b49c9602-1 kCDysV flex items-center">
              <button 
                type="button" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="IconButton__Button-sc-19baojp-0 jgJQcZ sc-509a78dc-0 bQhINN sc-b49c9602-2 dROoME lg:hidden mr-2 p-2 text-white hover:bg-white/10 rounded focus:outline-none focus:ring-2 focus:ring-white" 
                aria-label="Open site navigation menu" 
                aria-expanded={isMobileMenuOpen}
              >
                <svg viewBox="0 0 24 24" width="1.5em" height="1.5em" aria-hidden="true" focusable="false" className="BaseSvg-sc-yh8lnd-0 NavigationMenuHamburgerIcon___StyledBaseSvg-sc-gmmn25-0 ibzDQZ">
                  <path d="M23 5.75H1V4.25H23zM1 11.25H17V12.75H1zM13 18.25H1V19.75H13z"></path>
                </svg>
              </button>
              <a 
                href="https://www.ticketmaster.com/"
                aria-label="Ticketmaster Home page"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCategory('all');
                }} 
                className="sc-b49c9602-3 gLBBAS flex items-center mr-6 focus:outline-none focus:ring-2 focus:ring-white rounded p-1"
              >
                <svg className="sc-b49c9602-0 htQIVU h-6 w-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135 24" fill="#fff">
                  <path d="M41.57 6.27c-4.02 0-6.97 3.63-6.97 7.4 0 3.62 2.38 5.32 5.9 5.32 1.3 0 2.66-.3 3.9-.68l.4-2.5a8.98 8.98 0 0 1-3.75.86c-2.04 0-3.23-.71-3.39-2.62l-.02-.34v-.1a6.46 6.46 0 0 1 .52-2.41c.61-1.55 1.48-2.62 3.36-2.62 1.33 0 2.02.73 2.02 2.03 0 .28-.02.54-.07.83H39.1a7.57 7.57 0 0 0-.34 2.17h7.5c.2-.9.32-1.8.32-2.72 0-3.09-2-4.62-5.02-4.62zm-5.4.28h-4.15l-4.44 4.41h-.05L29.65 1h-3.19l-3.78 17.7h3.11l1.38-6.44h.05l3.16 6.45h3.6l-3.7-6.62 5.88-5.54zm15.16 8.8a5 5 0 0 1 .15-1.18l1.16-5.3h2.86l.5-2.32h-2.86l.79-3.61-3.42 1.1-.55 2.5h-2.3l-.51 2.32h2.3l-.9 4.11c-.2.97-.4 1.89-.4 2.83 0 2.34 1.52 3.2 3.69 3.2.54 0 1.16-.18 1.7-.3l.56-2.45a4.28 4.28 0 0 1-1.55.28c-.72 0-1.22-.44-1.22-1.18zm-47.14 0c0-.47.07-.9.14-1.18l1.16-5.3h2.86l.5-2.32H5.99l.79-3.61-3.43 1.1-.54 2.5H.5L0 8.87h2.3l-.9 4.11c-.21.97-.4 1.89-.4 2.83C1 18.14 2.52 19 4.69 19c.54 0 1.16-.18 1.7-.3l.56-2.45a4.27 4.27 0 0 1-1.55.28c-.71 0-1.22-.44-1.22-1.18zm12.48-1.98c0-2.29 1.42-4.65 3.97-4.65.88 0 1.7.21 2.33.62l.78-2.6a11.4 11.4 0 0 0-3.19-.47c-4.4 0-7.22 3.23-7.22 7.48 0 3.14 2.04 5.24 5.2 5.24 1.05 0 2.1-.1 3.07-.57l.36-2.5c-.83.4-1.81.61-2.6.61-2.18 0-2.7-1.58-2.7-3.16zM14.5 1.31h-3.19l-.67 3.02h3.2l.66-3.02zm-4.36 5.24L7.54 18.7h3.19l2.61-12.16h-3.19zm72.06-.27c-1.43 0-2.81.26-4.17.73l-.45 2.53a9.48 9.48 0 0 1 4.02-.95c1.12 0 2.45.35 2.45 1.58 0 .36 0 .71-.1 1.04h-1.11c-3 0-7.52.3-7.52 4.32 0 2.24 1.57 3.47 3.78 3.47 1.76 0 2.86-.78 3.95-2.15h.05l-.33 1.87h2.68c.29-2.3 1.5-7.06 1.5-8.7 0-2.85-2.3-3.74-4.75-3.74zM80 16.68c-.82 0-1.62-.42-1.62-1.27 0-2.05 2.56-2.31 4.1-2.31h1.13c-.5 1.96-1.24 3.58-3.61 3.58zM71.6 6.27c-1.72 0-3.5.73-4.31 2.31h-.05c-.17-1.47-1.67-2.31-3.12-2.31-1.5 0-2.9.66-3.75 1.9h-.05l.29-1.62h-2.98l-.26 1.35-2.23 10.8h3.18l1.26-5.78c.4-1.63 1-4.2 3.16-4.2.82 0 1.5.57 1.5 1.46 0 .74-.23 1.87-.4 2.6l-1.28 5.93h3.18L67 12.92c.4-1.65.95-4.2 3.17-4.2.8 0 1.5.57 1.5 1.46 0 .74-.24 1.87-.4 2.6l-1.3 5.93h3.2l1.27-5.81c.27-1 .55-2.22.55-3.3a3.4 3.4 0 0 0-3.4-3.33zm41.24 0c-4.02 0-6.97 3.63-6.97 7.4 0 3.62 2.38 5.32 5.9 5.32 1.3 0 2.66-.3 3.9-.68l.4-2.5a9 9 0 0 1-3.75.86c-2.04 0-3.23-.71-3.38-2.62-.01-.12-.03-.22-.03-.34v-.1c.02-.84.2-1.66.53-2.41.6-1.55 1.47-2.62 3.35-2.62 1.33 0 2.02.73 2.02 2.03 0 .28-.02.54-.07.83h-4.36a7.57 7.57 0 0 0-.34 2.17h7.5c.2-.9.32-1.8.32-2.72 0-3.09-2-4.62-5.02-4.62zm10.18 2.57h-.05l.43-2.3h-3.05l-.28 1.64-2.19 10.53h3.19l1.14-5.46c.4-1.96 1.5-3.96 3.76-3.96.4 0 .85.07 1.2.19l.68-3.1a4.9 4.9 0 0 0-1.22-.11c-1.47 0-3.04 1.25-3.61 2.57zm-20.87 6.51c0-.47.07-.9.14-1.18l1.17-5.3h2.85l.5-2.32h-2.85l.78-3.61-3.42 1.1-.55 2.5h-2.3l-.5 2.32h2.3l-.9 4.11c-.22.97-.4 1.89-.4 2.83 0 2.34 1.52 3.2 3.68 3.2.55 0 1.17-.18 1.71-.3l.55-2.45c-.4.17-.98.28-1.55.28-.71 0-1.21-.44-1.21-1.18zm-13.31-5.21c0 3.04 4.13 3.23 4.13 5.2 0 .98-1.12 1.33-2.19 1.33a6.01 6.01 0 0 1-3.04-.94l-.7 2.53a8.8 8.8 0 0 0 3.74.73c2.74 0 5.52-.95 5.52-4.1 0-2.98-4.14-3.55-4.14-5.08 0-.97 1.19-1.23 2.14-1.23.9 0 1.79.26 2.13.44l.69-2.38a13.27 13.27 0 0 0-2.98-.37c-2.53 0-5.3 1.01-5.3 3.87zm43.23-3.86A2.74 2.74 0 0 0 129.33 9c0 1.5 1.23 2.72 2.74 2.72A2.73 2.73 0 0 0 134.81 9c0-1.5-1.23-2.72-2.74-2.72zm.01 5.04A2.23 2.23 0 0 1 129.86 9c0-1.3.95-2.31 2.22-2.31 1.26 0 2.21 1.01 2.21 2.31s-.95 2.32-2.2 2.32zm1.28-3.02c0-.6-.36-.9-1.1-.9h-1.23v3.2h.52V9.17h.44l.9 1.41h.55l-.91-1.4c.5 0 .83-.38.83-.89zm-1.81.48V7.8h.62c.34 0 .66.1.66.47 0 .41-.26.5-.66.5h-.62z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Category Links List */}
          <ul aria-label="Categories" role="list" className="UnstyledList-sc-ix96mm-0 sc-40575f6-0 hFFFXm ikTAQV hidden lg:flex items-center space-x-1 m-0 p-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <li key={cat.id} role="listitem" className="sc-1fbd0e2a-1 iWLNiF list-none">
                  <a 
                    href={cat.href} 
                    role="button" 
                    aria-expanded="false" 
                    aria-controls="" 
                    tabIndex={0} 
                    data-testid={cat.testId} 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      if (cat.id === 'Cities') {
                        const el = document.getElementById('popular-cities-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        onSelectCategory(cat.id);
                      }
                    }}
                    className={`sc-1fbd0e2a-0 ceNYbE px-3 py-1.5 rounded text-[15px] font-semibold transition-colors duration-200 ease-out ${
                      isActive 
                        ? 'is-active bg-white text-[#024ddf] font-bold shadow-xs' 
                        : 'text-white/95 hover:bg-white/14 active:bg-[#012e85]/90 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </a>
                </li>
              );
            })}
            <li role="listitem" className="sc-1fbd0e2a-1 iWLNiF list-none">
              <button 
                role="button" 
                aria-expanded="false" 
                aria-controls="" 
                tabIndex={0} 
                data-testid="More" 
                onClick={() => onSelectCategory('all')}
                className="sc-1fbd0e2a-0 eTwfaS px-3 py-1.5 rounded text-[15px] font-semibold transition-colors duration-200 ease-out text-white/95 hover:bg-white/14 active:bg-[#012e85]/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer"
              >
                More
              </button>
            </li>
          </ul>

          {/* Right Action Buttons */}
          <div className="sc-9c727161-3 bqirRC flex items-center space-x-2">
            <button 
              aria-expanded="true" 
              onClick={() => {
                const searchInput = document.getElementById('search-query-input') || document.querySelector('input[type="text"]');
                if (searchInput) (searchInput as HTMLInputElement).focus();
              }}
              className="sc-9c727161-4 htmrzb flex items-center justify-center p-2 text-white hover:bg-white/14 active:bg-[#012e85]/90 rounded transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer"
            >
              <svg viewBox="0 0 23 24" width="1.5em" height="1.5em" aria-hidden="true" focusable="false" className="BaseSvg-sc-yh8lnd-0 NavigationSearchIcon___StyledBaseSvg-sc-lgk0r3-0 ibzDQZ">
                <path d="M3.78 4.78 1.62 10 3.78 15.22 9 17.38 14.22 15.22 16.38 10 14.22 4.78 9 2.62zM9 1 15.36 3.64 18 10 15.67 15.61 21.78 21.72 20.72 22.78 14.62 16.68 9 19 2.64 16.36 0 10 2.64 3.64z"></path>
              </svg>
              <span className="sc-9c727161-5 hYsqkJ sr-only">Toggle search bar</span>
            </button>

            <button 
              data-testid="accountLink" 
              role="link" 
              onClick={onOpenMyTickets}
              className="sc-574d9268-0 bqynt flex items-center space-x-2 text-white font-semibold text-[15px] hover:text-white hover:bg-white/14 active:bg-[#012e85]/90 px-3 py-1.5 rounded transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" width="24px" height="24px" aria-hidden="true" focusable="false" className="BaseSvg-sc-yh8lnd-0 AccountUserIcon___StyledBaseSvg-sc-hut8xm-0 ibzDQZ fill-current">
                <path d="M8 6.5A4 4 0 1 1 16 6.5 4 4 0 0 1 8 6.5M12 1A5.5 5.5 0 1 0 12 12 5.5 5.5 0 0 0 12 1M18.49 13H5.43L1 16.9V23H23V16.88zM2.5 17.58 6 14.5H17.93L21.5 17.57V21.5H2.5z"></path>
              </svg>
              <span>{purchasedCount > 0 ? `My Tickets (${purchasedCount})` : 'Sign In/Register'}</span>
            </button>
          </div>
        </nav>
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
                  if (cat.id === 'Cities') {
                    const el = document.getElementById('popular-cities-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    onSelectCategory(cat.id);
                  }
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-sm font-semibold transition-colors duration-200 ease-out ${
                  isActive ? 'bg-white text-[#024ddf]' : 'text-white hover:bg-white/14 active:bg-[#012e85]'
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
