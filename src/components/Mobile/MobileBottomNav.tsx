import React from 'react';
import { Bookmark, User } from 'lucide-react';

export type MobileTab = 'home' | 'watchlist' | 'tickets' | 'account';

interface MobileBottomNavProps {
  activeTab: MobileTab;
  onChangeTab: (tab: MobileTab) => void;
  ticketCount?: number;
  watchlistCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onChangeTab,
  ticketCount = 0,
  watchlistCount = 0
}) => {
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#121212] border-t border-[#26282e] px-2 py-1.5 pb-safe select-none shadow-[0_-4px_20px_rgba(0,0,0,0.5)]"
      aria-label="Mobile Navigation"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* Tab 1: Home */}
        <button
          onClick={() => onChangeTab('home')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all ${
            activeTab === 'home' ? 'text-[#1e70ff]' : 'text-[#8e8e93] hover:text-white'
          }`}
          aria-label="Home"
        >
          <div className="relative flex items-center justify-center">
            {activeTab === 'home' ? (
              <div className="w-6 h-6 rounded-full bg-[#1e70ff] flex items-center justify-center text-black font-black italic text-xs tracking-tighter">
                t
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full border border-[#8e8e93] flex items-center justify-center text-[#8e8e93] font-bold italic text-xs tracking-tighter">
                t
              </div>
            )}
          </div>
          <span className={`text-[10px] mt-1 font-medium tracking-tight ${
            activeTab === 'home' ? 'font-semibold text-white' : ''
          }`}>
            Home
          </span>
        </button>

        {/* Tab 2: Watchlist */}
        <button
          onClick={() => onChangeTab('watchlist')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all relative ${
            activeTab === 'watchlist' ? 'text-[#1e70ff]' : 'text-[#8e8e93] hover:text-white'
          }`}
          aria-label="Watchlist"
        >
          <div className="relative">
            <Bookmark className={`w-5 h-5 ${activeTab === 'watchlist' ? 'fill-[#1e70ff] text-[#1e70ff]' : ''}`} />
            {watchlistCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-[#1e70ff] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {watchlistCount}
              </span>
            )}
          </div>
          <span className={`text-[10px] mt-1 font-medium tracking-tight ${
            activeTab === 'watchlist' ? 'font-semibold text-white' : ''
          }`}>
            Watchlist
          </span>
        </button>

        {/* Tab 3: My Tickets */}
        <button
          onClick={() => onChangeTab('tickets')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all relative ${
            activeTab === 'tickets' ? 'text-[#1e70ff]' : 'text-[#8e8e93] hover:text-white'
          }`}
          aria-label="My Tickets"
        >
          <div className="relative">
            {/* Custom Layered Pass Icon matching Ticketmaster app */}
            <div className={`w-5 h-5 relative flex items-center justify-center ${
              activeTab === 'tickets' ? 'text-[#1e70ff]' : 'text-[#8e8e93]'
            }`}>
              <svg 
                viewBox="0 0 24 24" 
                fill={activeTab === 'tickets' ? 'currentColor' : 'none'} 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5"
              >
                <rect x="2" y="5" width="20" height="14" rx="2" fill={activeTab === 'tickets' ? '#1e70ff' : 'none'} stroke={activeTab === 'tickets' ? '#1e70ff' : 'currentColor'} />
                <line x1="2" y1="10" x2="22" y2="10" stroke={activeTab === 'tickets' ? '#121212' : 'currentColor'} />
              </svg>
            </div>
            {ticketCount > 0 && (
              <span className="absolute -top-1 -right-2 px-1.5 py-0.2 bg-[#1e70ff] text-white text-[9px] font-bold rounded-full">
                {ticketCount}
              </span>
            )}
          </div>
          <span className={`text-[10px] mt-1 font-medium tracking-tight ${
            activeTab === 'tickets' ? 'font-semibold text-white' : ''
          }`}>
            My Tickets
          </span>
        </button>

        {/* Tab 4: Account */}
        <button
          onClick={() => onChangeTab('account')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all ${
            activeTab === 'account' ? 'text-[#1e70ff]' : 'text-[#8e8e93] hover:text-white'
          }`}
          aria-label="Account"
        >
          <div className="relative">
            <User className={`w-5 h-5 ${activeTab === 'account' ? 'text-[#1e70ff]' : ''}`} />
          </div>
          <span className={`text-[10px] mt-1 font-medium tracking-tight ${
            activeTab === 'account' ? 'font-semibold text-white' : ''
          }`}>
            Account
          </span>
        </button>
      </div>
    </nav>
  );
};
