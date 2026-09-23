import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  Search, 
  X, 
  ChevronDown, 
  Music, 
  Building2,
  CalendarCheck
} from 'lucide-react';
import { EventItem } from '../../types';
import { CITIES_LIST } from '../../data/eventsData';

interface OmniboxSearchProps {
  events: EventItem[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  dateRange: string;
  onDateRangeChange: (range: 'all' | 'today' | 'this_weekend' | 'this_month' | 'future') => void;
  onSelectEvent: (event: EventItem) => void;
  onSelectPerformer?: (performerName: string) => void;
  onExecuteSearch: () => void;
}

export const OmniboxSearch: React.FC<OmniboxSearchProps> = ({
  events,
  searchQuery,
  onSearchChange,
  selectedCity,
  onCityChange,
  dateRange,
  onDateRangeChange,
  onSelectEvent,
  onSelectPerformer,
  onExecuteSearch
}) => {
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const dateOptions: { id: 'all' | 'today' | 'this_weekend' | 'this_month' | 'future'; label: string }[] = [
    { id: 'all', label: 'All Dates' },
    { id: 'today', label: 'Today / Tonight' },
    { id: 'this_weekend', label: 'This Weekend' },
    { id: 'this_month', label: 'August - September' },
    { id: 'future', label: 'Next 30 Days' }
  ];

  // Filter autocomplete suggestions based on query
  const matchingEvents = searchQuery.trim() === '' 
    ? [] 
    : events.filter(e => 
        e.identity.event_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.identity.main_performer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.location.venue_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.identity.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsAutocompleteOpen(false);
        setIsCityDropdownOpen(false);
        setIsDateDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleQueryChange = (val: string) => {
    onSearchChange(val);
    if (val.trim().length > 0) {
      setIsAutocompleteOpen(true);
    } else {
      setIsAutocompleteOpen(false);
    }
  };

  const selectedDateLabel = dateOptions.find(d => d.id === dateRange)?.label || 'All Dates';

  return (
    <div className="relative z-30 w-full max-w-6xl mx-auto px-4" ref={searchRef}>
      <div 
        id="omnibox-container"
        className="bg-white rounded-xl shadow-xl border border-gray-200 p-2 md:p-2.5 flex flex-col md:flex-row items-stretch md:items-center gap-2"
      >
        {/* Field 1: Location Control */}
        <div className="relative flex-1 min-w-[170px]">
          <button
            type="button"
            id="omnibox-location-btn"
            onClick={() => {
              setIsCityDropdownOpen(!isCityDropdownOpen);
              setIsDateDropdownOpen(false);
              setIsAutocompleteOpen(false);
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 text-left border md:border-none border-gray-200 transition-colors focus:ring-2 focus:ring-[#024ddf]"
            aria-expanded={isCityDropdownOpen}
            aria-label="Filter by Location"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <MapPin className="w-5 h-5 text-[#024ddf] shrink-0" />
              <div className="truncate">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Location
                </span>
                <span className="block text-sm font-semibold text-gray-900 truncate">
                  {selectedCity === 'all' ? 'All Cities' : selectedCity}
                </span>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 ml-1" />
          </button>

          {/* City Dropdown */}
          {isCityDropdownOpen && (
            <div 
              id="omnibox-city-menu"
              className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 py-2 max-h-64 overflow-y-auto"
            >
              <div className="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase">Select Region</div>
              {CITIES_LIST.map((city) => {
                const cityKey = city === 'All Cities' ? 'all' : city.split(',')[0].trim();
                const isSelected = (selectedCity === 'all' && city === 'All Cities') || selectedCity === cityKey;
                return (
                  <button
                    key={city}
                    onClick={() => {
                      onCityChange(cityKey);
                      setIsCityDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${
                      isSelected ? 'bg-blue-50 text-[#024ddf] font-bold' : 'text-gray-700'
                    }`}
                  >
                    <span>{city}</span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-[#024ddf]"></span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-gray-200 self-center"></div>

        {/* Field 2: Dates Control */}
        <div className="relative flex-1 min-w-[170px]">
          <button
            type="button"
            id="omnibox-dates-btn"
            onClick={() => {
              setIsDateDropdownOpen(!isDateDropdownOpen);
              setIsCityDropdownOpen(false);
              setIsAutocompleteOpen(false);
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 text-left border md:border-none border-gray-200 transition-colors focus:ring-2 focus:ring-[#024ddf]"
            aria-expanded={isDateDropdownOpen}
            aria-label="Filter by Date"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <Calendar className="w-5 h-5 text-[#024ddf] shrink-0" />
              <div className="truncate">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Dates
                </span>
                <span className="block text-sm font-semibold text-gray-900 truncate">
                  {selectedDateLabel}
                </span>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 ml-1" />
          </button>

          {/* Date Range Dropdown */}
          {isDateDropdownOpen && (
            <div 
              id="omnibox-date-menu"
              className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 py-2"
            >
              <div className="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase">Select Timeframe</div>
              {dateOptions.map((opt) => {
                const isSelected = dateRange === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      onDateRangeChange(opt.id);
                      setIsDateDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${
                      isSelected ? 'bg-blue-50 text-[#024ddf] font-bold' : 'text-gray-700'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-[#024ddf]"></span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-gray-200 self-center"></div>

        {/* Field 3: Search Query with Predictive Autocomplete */}
        <div className="relative flex-[2] min-w-[220px]">
          <div className="flex items-center px-3 py-1.5 rounded-lg border md:border-none border-gray-200">
            <Search className="w-5 h-5 text-[#024ddf] shrink-0 mr-2.5" />
            <div className="flex-1">
              <label htmlFor="omnibox-search-input" className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Search
              </label>
              <input
                id="omnibox-search-input"
                type="text"
                placeholder="Search by Artist, Event, Venue, or Genre..."
                value={searchQuery}
                onChange={(e) => handleQueryChange(e.target.value)}
                onFocus={() => {
                  if (searchQuery.trim().length > 0) setIsAutocompleteOpen(true);
                  setIsCityDropdownOpen(false);
                  setIsDateDropdownOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsAutocompleteOpen(false);
                    onExecuteSearch();
                  }
                }}
                className="w-full text-sm font-semibold text-gray-900 placeholder-gray-400 bg-transparent border-none outline-none focus:outline-none p-0"
                autoComplete="off"
              />
            </div>
            {searchQuery && (
              <button 
                id="omnibox-clear-query-btn"
                onClick={() => {
                  onSearchChange('');
                  setIsAutocompleteOpen(false);
                }}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
                aria-label="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Predictive Dropdown */}
          {isAutocompleteOpen && matchingEvents.length > 0 && (
            <div 
              id="omnibox-autocomplete-dropdown"
              className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden divide-y divide-gray-100 max-h-96 overflow-y-auto"
            >
              <div className="p-2 bg-gray-50 text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center justify-between">
                <span>Matching Live Events & Performers</span>
                <span>{matchingEvents.length} results</span>
              </div>
              {matchingEvents.map((evt) => (
                <div
                  key={evt.identity.event_id}
                  onClick={() => {
                    onSelectEvent(evt);
                    setIsAutocompleteOpen(false);
                  }}
                  className="p-3 hover:bg-blue-50/80 cursor-pointer flex items-center space-x-3.5 transition-colors group"
                >
                  <img 
                    src={evt.identity.image_url} 
                    alt={evt.identity.event_title}
                    className="w-12 h-12 rounded-lg object-cover shadow-sm shrink-0 group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#024ddf] bg-blue-100/70 px-1.5 py-0.5 rounded">
                        {evt.identity.category}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <CalendarCheck className="w-3 h-3 mr-1" />
                        {evt.date_time.exact_date}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 truncate mt-0.5">
                      {evt.identity.event_title}
                    </h4>
                    <p className="text-xs text-gray-500 truncate flex items-center mt-0.5">
                      <Building2 className="w-3 h-3 mr-1" />
                      {evt.location.venue_name} • {evt.location.city}, {evt.location.state}
                    </p>
                    {onSelectPerformer && evt.identity.main_performer && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsAutocompleteOpen(false);
                          onSelectPerformer(evt.identity.main_performer);
                        }}
                        className="text-[11px] font-bold text-[#024ddf] hover:underline mt-1 inline-flex items-center"
                      >
                        <span>View {evt.identity.main_performer} Tour Dates &rarr;</span>
                      </button>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs text-gray-500 block">From</span>
                    <span className="text-sm font-bold text-[#024ddf]">
                      ${evt.pricing.min_price.toFixed(0)}
                    </span>
                  </div>
                </div>
              ))}
              <div className="p-2 bg-gray-50 text-center">
                <button
                  onClick={() => {
                    setIsAutocompleteOpen(false);
                    onExecuteSearch();
                  }}
                  className="text-xs font-bold text-[#024ddf] hover:underline"
                >
                  View all matching results for &ldquo;{searchQuery}&rdquo; →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          id="omnibox-submit-btn"
          type="button"
          onClick={() => {
            setIsAutocompleteOpen(false);
            onExecuteSearch();
          }}
          className="bg-[#024ddf] hover:bg-[#0139a7] text-white font-bold px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all shrink-0 active:scale-95 shadow-sm"
          aria-label="Find Tickets"
        >
          <Search className="w-4 h-4" />
          <span>Find Tickets</span>
        </button>

      </div>
    </div>
  );
};
