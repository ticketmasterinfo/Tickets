import React, { useState } from 'react';
import { 
  Globe, 
  HelpCircle, 
  Tag, 
  Gift, 
  User, 
  Ticket as TicketIcon,
  ChevronDown
} from 'lucide-react';
import { PurchasedTicket } from '../../types';

interface TopUtilityBarProps {
  purchasedTickets: PurchasedTicket[];
  onOpenMyTickets: () => void;
  onOpenHelp: () => void;
  onOpenSell: () => void;
}

export const TopUtilityBar: React.FC<TopUtilityBarProps> = ({
  purchasedTickets,
  onOpenMyTickets,
  onOpenHelp,
  onOpenSell
}) => {
  const [selectedCountry, setSelectedCountry] = useState('United States (USD)');
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const countries = [
    'United States (USD)',
    'Canada (CAD)',
    'United Kingdom (GBP)',
    'Australia (AUD)',
    'European Union (EUR)'
  ];

  return (
    <div id="top-utility-bar" className="bg-[#121212] text-[#f6f6f6] border-b border-[#262626] text-[13px] py-1.5 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Region & Support */}
        <div className="flex items-center space-x-6">
          {/* Country Selector */}
          <div className="relative">
            <button 
              id="country-selector-btn"
              onClick={() => setIsCountryOpen(!isCountryOpen)}
              className="flex items-center space-x-1.5 text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1"
              aria-expanded={isCountryOpen}
              aria-label="Select Country and Currency"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-medium">{selectedCountry}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {isCountryOpen && (
              <div 
                id="country-dropdown-menu"
                className="absolute left-0 mt-2 w-48 bg-[#1f1f1f] border border-gray-700 rounded-md shadow-xl z-50 py-1"
              >
                {countries.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setSelectedCountry(c);
                      setIsCountryOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#024ddf] hover:text-white transition-colors ${
                      selectedCountry === c ? 'text-blue-400 font-semibold bg-gray-800' : 'text-gray-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick links */}
          <div className="hidden sm:flex items-center space-x-5 text-gray-300">
            <button 
              id="top-sell-btn"
              onClick={onOpenSell} 
              className="hover:text-white transition-colors flex items-center space-x-1"
            >
              <Tag className="w-3.5 h-3.5 text-green-400" />
              <span>Sell Tickets</span>
            </button>
            <button 
              id="top-gift-cards-btn"
              onClick={onOpenHelp}
              className="hover:text-white transition-colors flex items-center space-x-1"
            >
              <Gift className="w-3.5 h-3.5 text-yellow-400" />
              <span>Gift Cards</span>
            </button>
            <button 
              id="top-help-btn"
              onClick={onOpenHelp}
              className="hover:text-white transition-colors flex items-center space-x-1"
            >
              <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
              <span>Help & FAQs</span>
            </button>
          </div>
        </div>

        {/* Right Side: My Tickets & Sign In */}
        <div className="flex items-center space-x-4">
          <button
            id="top-my-tickets-btn"
            onClick={onOpenMyTickets}
            className="flex items-center space-x-1.5 bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white px-2.5 py-1 rounded border border-gray-700 transition-colors"
          >
            <TicketIcon className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold">My Tickets</span>
            {purchasedTickets.length > 0 && (
              <span id="ticket-badge-count" className="bg-[#024ddf] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full ml-1">
                {purchasedTickets.length}
              </span>
            )}
          </button>

          <button
            id="top-account-btn"
            onClick={onOpenMyTickets}
            className="flex items-center space-x-1 text-gray-200 hover:text-white transition-colors"
          >
            <User className="w-3.5 h-3.5" />
            <span className="font-medium">My Account</span>
          </button>
        </div>

      </div>
    </div>
  );
};
