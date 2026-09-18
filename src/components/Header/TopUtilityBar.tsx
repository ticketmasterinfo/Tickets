import React, { useState } from 'react';
import { 
  Ticket as TicketIcon,
  User,
  ChevronDown
} from 'lucide-react';
import { PurchasedTicket } from '../../types';

interface TopUtilityBarProps {
  purchasedTickets: PurchasedTicket[];
  onOpenMyTickets: () => void;
  onOpenHelp: () => void;
  onOpenSell: () => void;
  onOpenSecurityStatus?: () => void;
  onSelectCountry?: (country: string) => void;
}

export const TopUtilityBar: React.FC<TopUtilityBarProps> = ({
  purchasedTickets,
  onOpenMyTickets,
  onOpenHelp,
  onOpenSell,
  onOpenSecurityStatus,
  onSelectCountry
}) => {
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedCountryLabel, setSelectedCountryLabel] = useState('United States (USD)');
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const countries = [
    { code: 'US', label: 'United States (USD)' },
    { code: 'CA', label: 'Canada (CAD)' },
    { code: 'UK', label: 'United Kingdom (GBP)' },
    { code: 'AU', label: 'Australia (AUD)' },
    { code: 'IE', label: 'Ireland (EUR)' },
    { code: 'MX', label: 'Mexico (MXN)' }
  ];

  return (
    <div id="top-utility-bar" className="bg-[#121212] text-[#f6f6f6] border-b border-[#262626] text-[13px] py-1 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Country Picker, Additional Links, and PayPal partner */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          
          {/* Country selector with Flag Icon & Code */}
          <div className="relative">
            <button 
              id="country-selector-btn"
              title={selectedCountryLabel}
              onClick={() => setIsCountryOpen(!isCountryOpen)}
              className="sc-39b36d9a-2 Sajtl flex items-center space-x-1.5 text-gray-200 hover:text-white px-1.5 py-0.5 rounded transition-colors duration-200 hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              aria-expanded={isCountryOpen}
              aria-label={`${selectedCountryLabel} selected, change country`}
            >
              {/* Circular Stylized US Flag */}
              <svg 
                viewBox="0 0 512 512" 
                width="16" 
                height="16" 
                aria-hidden="true" 
                className="shrink-0 rounded-full"
              >
                <path fill="#FFF" d="M503.2 322.8c5.7-21.3 8.8-43.7 8.8-66.8l-8.8-66.8a254.6 254.6 0 0 0-28.8-66.8l-59-66.7A255 255 0 0 0 256 0h-.2A255 255 0 0 0 96.6 55.7l-59 66.7a254.6 254.6 0 0 0-28.8 66.8L0 256v.1c0 23 3 45.4 8.8 66.7l28.8 66.8a257.3 257.3 0 0 0 59 66.7L256 512l159.4-55.7a257.3 257.3 0 0 0 59-66.7z" />
                <path fill="#D80027" d="M503.2 189.2c5.7 21.3 8.8 43.7 8.8 66.8H0c0-23.1 3-45.5 8.8-66.8zM415.4 55.7a257.3 257.3 0 0 1 59 66.7H37.6a257.3 257.3 0 0 1 59-66.7zm59 333.9c12.6-20.6 22.4-43 28.8-66.8H8.8a254.6 254.6 0 0 0 28.8 66.8zm-59 66.7H96.6A255 255 0 0 0 255.8 512h.4a255 255 0 0 0 159.2-55.7" />
                <path fill="#0052B4" d="M0 245.6A256 256 0 0 1 256 0v256H0z" />
              </svg>
              <span className="font-bold text-xs">{selectedCountry}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {isCountryOpen && (
              <div 
                id="country-dropdown-menu"
                className="absolute left-0 mt-1.5 w-52 bg-[#1f1f1f] border border-gray-700 rounded-md shadow-2xl z-50 py-1"
              >
                <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-800">
                  Select Region
                </div>
                {countries.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setSelectedCountry(c.code);
                      setSelectedCountryLabel(c.label);
                      setIsCountryOpen(false);
                      if (onSelectCountry) onSelectCountry(c.code);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#024ddf] hover:text-white transition-colors ${
                      selectedCountry === c.code ? 'text-blue-400 font-bold bg-gray-800' : 'text-gray-200'
                    }`}
                  >
                    <span>{c.label}</span>
                    {selectedCountry === c.code && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ticketmaster Additional Links */}
          <nav aria-label="Additional Links" className="hidden sm:flex items-center space-x-4 text-xs font-medium text-gray-300">
            {/* Hotels Link */}
            <a 
              href="#hotels"
              onClick={(e) => { e.preventDefault(); alert('Ticketmaster Travel: Book nearby hotels for your event nights.'); }}
              className="hover:text-white flex items-center space-x-1 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current text-blue-400" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M18.5 10H17V7.22L16.1 6H7.9L7 7.22V10H5.5V4.58L6.24 3.5H17.76L18.5 4.58zM17 11.5H20.38L21.5 12.62V17.5H2.5V12.62L3.62 11.5zM15.5 10H8.5V7.72L8.66 7.5H15.34L15.5 7.72zM4 4.11V10H3L1 12V22H2.5V19H21.5V22H23V12L21 10H20V4.11L18.55 2H5.45z" />
              </svg>
              <span>Hotels</span>
            </a>

            {/* Sell Link */}
            <button 
              id="top-sell-btn"
              onClick={onOpenSell} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Sell
            </button>

            {/* Gift Cards Link */}
            <a 
              href="#giftcards"
              onClick={(e) => { e.preventDefault(); onOpenHelp(); }}
              className="hover:text-white flex items-center space-x-1 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current text-yellow-400" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M1 3.25H23V17.57L19.92 20.75H1zM2.5 4.75V9.39H4V7.09L5.56 6.07 7.75 7.96V4.74zM7.12 9.39 5.5 7.99V9.4zM9.25 4.75V8.35L11.95 6.06 13.5 7.1V9.39H21.5V4.75zM12 9.39V7.99L10.34 9.38zM6.87 10.89H2.5V19.25H7.75V12.43L5.66 16.35 4.34 15.65zM9.25 19.25H19.28L21.5 16.95V10.9H10.13L12.66 15.65 11.34 16.35 9.25 12.43z" />
              </svg>
              <span>Gift Cards</span>
            </a>

            {/* Help Link */}
            <button 
              id="top-help-btn"
              onClick={onOpenHelp}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Help
            </button>

            {/* VIP Link */}
            <a 
              href="#vip"
              onClick={(e) => { e.preventDefault(); alert('Ticketmaster VIP: Browse VIP packages, soundchecks, and meet & greets.'); }}
              className="hover:text-[#ffb932] transition-colors font-bold text-yellow-400"
            >
              VIP
            </a>
          </nav>

          {/* PayPal Preferred Partner badge */}
          <div className="hidden lg:flex items-center pl-2 border-l border-gray-800">
            <span className="text-[11px] text-gray-400 flex items-center space-x-1.5">
              <span className="font-extrabold italic text-[#0079c1]">Pay<span className="text-[#00457c]">Pal</span></span>
              <span className="text-gray-500 font-medium">Preferred Payments Partner</span>
            </span>
          </div>

        </div>

        {/* Right Side: Security status, My Tickets & Account */}
        <div className="flex items-center space-x-3">
          {onOpenSecurityStatus && (
            <button
              id="top-security-status-btn"
              onClick={onOpenSecurityStatus}
              title="View session security status"
              className="hidden md:flex items-center space-x-1.5 text-gray-300 hover:text-white px-2 py-1 rounded text-xs transition-colors duration-200 hover:bg-white/10 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Session: Active</span>
            </button>
          )}

          <button
            id="top-my-tickets-btn"
            onClick={onOpenMyTickets}
            className="flex items-center space-x-1.5 bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white px-2.5 py-1 rounded border border-gray-700 transition-colors duration-200 cursor-pointer text-xs"
          >
            <TicketIcon className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold">My Tickets</span>
            {purchasedTickets.length > 0 && (
              <span className="bg-[#024ddf] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {purchasedTickets.length}
              </span>
            )}
          </button>

          <button
            id="top-account-btn"
            onClick={onOpenMyTickets}
            className="flex items-center space-x-1 text-gray-200 hover:text-white px-2 py-1 rounded transition-colors duration-200 hover:bg-white/10 cursor-pointer text-xs"
          >
            <User className="w-3.5 h-3.5" />
            <span className="font-medium">Sign In</span>
          </button>
        </div>

      </div>
    </div>
  );
};
