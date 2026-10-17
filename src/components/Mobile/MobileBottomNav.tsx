import React from 'react';

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
      className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-[#1f2024] select-none"
      aria-label="Mobile Navigation"
    >
      <div className="w-full md:max-w-md lg:max-w-lg mx-auto flex items-center justify-between px-1 pt-2 pb-[max(0.75rem,calc(env(safe-area-inset-bottom,0px)+0.25rem))]">
        {/* Tab 1: Home */}
        <button
          type="button"
          onClick={() => onChangeTab('home')}
          className="flex-1 flex flex-col items-center justify-center py-0.5 active:scale-95 transition-transform cursor-pointer"
          aria-label="Home"
        >
          <div className="h-[26px] flex items-center justify-center relative">
            {activeTab === 'home' ? (
              <div className="w-[25px] h-[25px] rounded-full bg-[#026cdf] flex items-center justify-center shadow-sm">
                <span className="font-averta font-black italic text-[14px] text-white leading-none -translate-x-[0.5px] -translate-y-[0.5px] select-none">
                  t
                </span>
              </div>
            ) : (
              <div className="w-[25px] h-[25px] rounded-full border-[1.6px] border-[#8e8e93] flex items-center justify-center">
                <span className="font-averta font-bold italic text-[13px] text-[#8e8e93] leading-none -translate-x-[0.5px] -translate-y-[0.5px] select-none">
                  t
                </span>
              </div>
            )}
          </div>
          <span 
            className={`font-averta text-[11px] font-medium tracking-tight mt-[3px] leading-tight select-none ${
              activeTab === 'home' ? 'text-white' : 'text-[#8e8e93]'
            }`}
          >
            Home
          </span>
        </button>

        {/* Tab 2: Watchlist */}
        <button
          type="button"
          onClick={() => onChangeTab('watchlist')}
          className="flex-1 flex flex-col items-center justify-center py-0.5 active:scale-95 transition-transform cursor-pointer"
          aria-label="Watchlist"
        >
          <div className="h-[26px] flex items-center justify-center relative">
            <svg
              viewBox="0 0 24 24"
              className="w-[21px] h-[21px]"
              fill={activeTab === 'watchlist' ? '#026cdf' : 'none'}
              stroke={activeTab === 'watchlist' ? '#026cdf' : '#8e8e93'}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            {watchlistCount > 0 && (
              <span className="absolute -top-1 -right-2 px-1.2 min-w-[14px] h-[14px] bg-[#026cdf] text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                {watchlistCount}
              </span>
            )}
          </div>
          <span 
            className={`font-averta text-[11px] font-medium tracking-tight mt-[3px] leading-tight select-none ${
              activeTab === 'watchlist' ? 'text-white' : 'text-[#8e8e93]'
            }`}
          >
            Watchlist
          </span>
        </button>

        {/* Tab 3: My Tickets */}
        <button
          type="button"
          onClick={() => onChangeTab('tickets')}
          className="flex-1 flex flex-col items-center justify-center py-0.5 active:scale-95 transition-transform cursor-pointer"
          aria-label="My Tickets"
        >
          <div className="h-[26px] flex items-center justify-center relative">
            <svg
              viewBox="0 0 24 24"
              className="w-[22px] h-[22px]"
              fill="none"
              stroke={activeTab === 'tickets' ? '#026cdf' : '#8e8e93'}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Back ticket tilted behind */}
              <path 
                d="m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8" 
                stroke={activeTab === 'tickets' ? '#026cdf' : '#8e8e93'}
              />
              {/* Front ticket with smooth rounded bottom resting flush at y=21 */}
              <rect 
                x="2" 
                y="8" 
                width="20" 
                height="13" 
                rx="2" 
                fill={activeTab === 'tickets' ? 'rgba(2, 108, 223, 0.15)' : 'none'}
                stroke={activeTab === 'tickets' ? '#026cdf' : '#8e8e93'}
              />
              {/* Perforation vertical dashed lines reaching bottom */}
              <path d="M6 10V8" stroke={activeTab === 'tickets' ? '#026cdf' : '#8e8e93'} />
              <path d="M6 14v1" stroke={activeTab === 'tickets' ? '#026cdf' : '#8e8e93'} />
              <path d="M6 19v2" stroke={activeTab === 'tickets' ? '#026cdf' : '#8e8e93'} />
            </svg>
            {ticketCount > 0 && (
              <span className="absolute -top-1 -right-2 px-1.2 min-w-[14px] h-[14px] bg-[#026cdf] text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                {ticketCount}
              </span>
            )}
          </div>
          <span 
            className={`font-averta text-[11px] font-medium tracking-tight mt-[3px] leading-tight select-none ${
              activeTab === 'tickets' ? 'text-white' : 'text-[#8e8e93]'
            }`}
          >
            My Tickets
          </span>
        </button>

        {/* Tab 4: Account */}
        <button
          type="button"
          onClick={() => onChangeTab('account')}
          className="flex-1 flex flex-col items-center justify-center py-0.5 active:scale-95 transition-transform cursor-pointer"
          aria-label="Account"
        >
          <div className="h-[26px] flex items-center justify-center relative">
            <svg
              viewBox="0 0 24 24"
              className="w-[23px] h-[23px]"
              fill="none"
              stroke={activeTab === 'account' ? '#ffffff' : '#8e8e93'}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Outer circle */}
              <circle cx="12" cy="12" r="9.2" />
              {/* Head */}
              <circle 
                cx="12" 
                cy="9.3" 
                r="2.8" 
                fill={activeTab === 'account' ? '#ffffff' : 'none'} 
              />
              {/* Shoulders */}
              <path d="M6.8 17.6c.7-2.3 2.6-3.6 5.2-3.6s4.5 1.3 5.2 3.6" />
            </svg>
          </div>
          <span 
            className={`font-averta text-[11px] font-medium tracking-tight mt-[3px] leading-tight select-none ${
              activeTab === 'account' ? 'text-white' : 'text-[#8e8e93]'
            }`}
          >
            Account
          </span>
        </button>
      </div>
    </nav>
  );
};

