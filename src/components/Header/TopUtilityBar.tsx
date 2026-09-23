import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown
} from 'lucide-react';
import { PurchasedTicket } from '../../types';

interface TopUtilityBarProps {
  purchasedTickets?: PurchasedTicket[];
  onOpenMyTickets?: () => void;
  onOpenHelp: () => void;
  onOpenSell: () => void;
  onOpenSignIn?: () => void;
  onOpenSecurityStatus?: () => void;
  onSelectCountry?: (country: string) => void;
  user?: { name: string; email: string } | null;
  onSignOut?: () => void;
}

export const TopUtilityBar: React.FC<TopUtilityBarProps> = ({
  onOpenHelp,
  onOpenSell,
  onSelectCountry
}) => {
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedCountryLabel, setSelectedCountryLabel] = useState('United States (USD)');
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);

  const countries = [
    { code: 'US', label: 'United States (USD)' },
    { code: 'CA', label: 'Canada (CAD)' },
    { code: 'UK', label: 'United Kingdom (GBP)' },
    { code: 'AU', label: 'Australia (AUD)' },
    { code: 'IE', label: 'Ireland (EUR)' },
    { code: 'MX', label: 'Mexico (MXN)' }
  ];

  // Close country dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setIsCountryOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div id="top-utility-bar" className="bg-[#121212] text-[#f6f6f6] border-b border-[#262626] text-[14px] px-4 md:px-8 select-none h-11 flex items-center">
      <div className="sc-a618d3b1-0 gFMDrF h-full w-full flex items-center justify-between">
        
        {/* Left Side: Country Picker ("US") */}
        <div className="sc-39b36d9a-0 jbRPoP relative" ref={countryRef}>
          <button 
            id="country-selector-btn"
            title={selectedCountryLabel}
            aria-expanded={isCountryOpen}
            onClick={() => setIsCountryOpen(!isCountryOpen)}
            className="sc-39b36d9a-2 Sajtl"
            aria-label={`${selectedCountryLabel} selected, change country`}
          >
            <svg fill="none" viewBox="0 0 512 512" width="1.5em" height="1.5em" aria-hidden="true" className="sc-39b36d9a-5 GMtQO">
              <path fill="#FFF" d="M503.2 322.8c5.7-21.3 8.8-43.7 8.8-66.8l-8.8-66.8a254.6 254.6 0 0 0-28.8-66.8l-59-66.7A255 255 0 0 0 256 0h-.2A255 255 0 0 0 96.6 55.7l-59 66.7a254.6 254.6 0 0 0-28.8 66.8L0 256v.1c0 23 3 45.4 8.8 66.7l28.8 66.8a257.3 257.3 0 0 0 59 66.7L256 512l159.4-55.7a257.3 257.3 0 0 0 59-66.7z"></path>
              <path fill="#D80027" d="M503.2 189.2c5.7 21.3 8.8 43.7 8.8 66.8H0c0-23.1 3-45.5 8.8-66.8zM415.4 55.7a257.3 257.3 0 0 1 59 66.7H37.6a257.3 257.3 0 0 1 59-66.7zm59 333.9c12.6-20.6 22.4-43 28.8-66.8H8.8a254.6 254.6 0 0 0 28.8 66.8zm-59 66.7H96.6A255 255 0 0 0 255.8 512h.4a255 255 0 0 0 159.2-55.7"></path>
              <path fill="#0052B4" d="M0 245.6A256 256 0 0 1 256 0v256H0z"></path>
              <path fill="#FFF" fillRule="evenodd" d="M109.5 46a256 256 0 0 1 26.2-16l1 3h27.8L142 49.2l8.7 26.6L128 59.5l-22.6 16.4 8.6-26.6zm-80 90.4c6-11.1 12.7-21.8 20.1-32l3.8 11.7h28l-22.7 16.4 8.7 26.6-22.6-16.4L22.2 159l7.4-22.7Zm181.7-130 8.6 26.5h28L225 49.3l8.7 26.6-22.6-16.4-22.6 16.4 8.7-26.6L174.7 33h27.9l8.6-26.5ZM128 89.6l8.6 26.5h28l-22.7 16.4 8.7 26.6-22.6-16.4-22.6 16.4 8.6-26.6-22.5-16.4h27.9zm91.8 26.5-8.6-26.5-8.6 26.5h-28l22.7 16.4-8.7 26.6 22.6-16.4 22.6 16.4-8.7-26.6 22.6-16.4zm-175 56.7 8.6 26.5h28l-22.7 16.4 8.7 26.6-22.6-16.4-22.6 16.4 8.7-26.6-22.6-16.4h27.9zm91.8 26.5-8.6-26.5-8.6 26.5h-28l22.6 16.4-8.6 26.6 22.6-16.4 22.6 16.4-8.7-26.6 22.6-16.4zm74.6-26.5 8.6 26.5h28L225 215.7l8.7 26.6-22.6-16.4-22.6 16.4 8.7-26.6-22.6-16.4h27.9l8.6-26.5Z" clipRule="evenodd"></path>
            </svg>
            <span aria-hidden="true">{selectedCountry}</span>
            <span className="VisuallyHidden-sc-8buqks-0 jZNwtS">{selectedCountryLabel} selected, change country</span>
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

        {/* Additional Navigation Links */}
        <nav aria-label="Additional Links" className="sc-a618d3b1-2 gLPCaG">
          <ul role="list" className="UnstyledList-sc-ix96mm-0 sc-a618d3b1-3 hFFFXm cCqgoW">
            <li role="listitem">
              <a 
                href="https://travel.ticketmaster.com/?_uid=889e276a-3cb8-4acf-a535-a4c4c098cbbc&utm_source=TM_Homepage_Homepage_NAV_Icon_TTravel&utm_medium=TMUS_header_icon&utm_campaign=Nav_TM_Homepage&utm_id=TTravel_TM_Homepage_Nav_Icon" 
                className="sc-a618d3b1-4 ibHGSp"
                onClick={(e) => { e.preventDefault(); alert('Ticketmaster Travel: Book nearby hotels for your event nights.'); }}
              >
                <svg className="BaseSvg-sc-yh8lnd-0 EventHotelsIcon___StyledBaseSvg-sc-mxpuhn-0 ibzDQZ sc-a618d3b1-7 eOiYfI" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false">
                  <path d="M18.5 10H17V7.22L16.1 6H7.9L7 7.22V10H5.5V4.58L6.24 3.5H17.76L18.5 4.58zM17 11.5H20.38L21.5 12.62V17.5H2.5V12.62L3.62 11.5zM15.5 10H8.5V7.72L8.66 7.5H15.34L15.5 7.72zM4 4.11V10H3L1 12V22H2.5V19H21.5V22H23V12L21 10H20V4.11L18.55 2H5.45z"></path>
                </svg>
                <span>Hotels</span>
              </a>
            </li>
            <li role="listitem">
              <a 
                href="https://www.ticketmaster.com/sell" 
                className="sc-a618d3b1-4 ibHGSp"
                onClick={(e) => { e.preventDefault(); onOpenSell(); }}
              >
                Sell
              </a>
            </li>
            <li role="listitem">
              <a 
                href="https://www.ticketmaster.com/giftcards" 
                className="sc-a618d3b1-4 ibHGSp"
                onClick={(e) => { e.preventDefault(); onOpenHelp(); }}
              >
                <svg className="BaseSvg-sc-yh8lnd-0 PaymentGiftCardIcon___StyledBaseSvg-sc-1y41zf9-0 ibzDQZ sc-a618d3b1-5 dlkGxy" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false">
                  <path d="M1 3.25H23V17.57L19.92 20.75H1zM2.5 4.75V9.39H4V7.09L5.56 6.07 7.75 7.96V4.74zM7.12 9.39 5.5 7.99V9.4zM9.25 4.75V8.35L11.95 6.06 13.5 7.1V9.39H21.5V4.75zM12 9.39V7.99L10.34 9.38zM6.87 10.89H2.5V19.25H7.75V12.43L5.66 16.35 4.34 15.65zM9.25 19.25H19.28L21.5 16.95V10.9H10.13L12.66 15.65 11.34 16.35 9.25 12.43z"></path>
                </svg>
                <span>Gift Cards</span>
              </a>
            </li>
            <li role="listitem">
              <a 
                href="https://help.ticketmaster.com" 
                className="sc-a618d3b1-4 ibHGSp"
                onClick={(e) => { e.preventDefault(); onOpenHelp(); }}
              >
                Help
              </a>
            </li>
            <li role="listitem">
              <a 
                href="https://www.ticketmaster.com/vip?landing=c&awtrc=true&ac_link=ntm_vipguide_header_launch" 
                className="sc-a618d3b1-4 ibHGSp"
                onClick={(e) => { e.preventDefault(); alert('Ticketmaster VIP: Browse VIP packages, soundchecks, and meet & greets.'); }}
              >
                VIP
              </a>
            </li>
          </ul>
        </nav>

        {/* PayPal Preferred Payments Partner */}
        <div className="sc-a618d3b1-1 bbMoWu h-full flex items-center">
          <a 
            id="top-paypal-partner"
            href="https://www.paypal.com/cm/home" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="sc-1947e591-0 fbRQkm h-full flex items-center !p-0"
            title="PayPal Preferred Payments Partner"
          >
            <img 
              src="//uk.tmconst.com/rc-fb209c0d/images/ads/paypal_small.svg" 
              alt="PayPal Preferred Payments Partner" 
              className="sc-1947e591-1 MkPJj !h-full w-auto object-contain max-h-full"
              referrerPolicy="no-referrer"
            />
          </a>
        </div>

      </div>
    </div>
  );
};
