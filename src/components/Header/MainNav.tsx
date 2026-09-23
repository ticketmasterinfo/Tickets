import React, { useState, useRef, useEffect } from 'react';
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
  Ticket,
  Search,
  MapPin,
  Calendar,
  ChevronDown,
  User,
  Tag,
  HelpCircle,
  LogOut,
  ExternalLink
} from 'lucide-react';
import { EventItem } from '../../types';
import { CITIES_LIST } from '../../data/eventsData';
import { TicketmasterLogo } from '../Common/TicketmasterLogo';

interface MainNavProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenMyTickets: () => void;
  onOpenSignIn: () => void;
  purchasedCount: number;
  events: EventItem[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  onSelectEvent: (event: EventItem) => void;
  onSelectPerformer?: (performerName: string) => void;
  onExecuteSearch: () => void;
  user?: { name: string; email: string } | null;
  onSignOut?: () => void;
}

export const MainNav: React.FC<MainNavProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenMyTickets,
  onOpenSignIn,
  purchasedCount,
  events,
  searchQuery,
  onSearchChange,
  selectedCity,
  onCityChange,
  onSelectEvent,
  onSelectPerformer,
  onExecuteSearch,
  user = { name: 'Alex Morgan', email: 'ticketmastersincinfo@gmail.com' },
  onSignOut
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: 'Concerts', label: 'Concerts', icon: Music },
    { id: 'Sports', label: 'Sports', icon: Trophy },
    { id: 'Arts & Theater', label: 'Arts & Theater', icon: Theater },
    { id: 'Family', label: 'Family', icon: Users },
    { id: 'VIP', label: 'VIP', icon: Sparkles },
    { id: 'Deals', label: 'Deals', icon: Tag }
  ];

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsAutocompleteOpen(false);
        setIsCityDropdownOpen(false);
      }
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter matching suggestions
  const matchingEvents = searchQuery.trim() === '' 
    ? [] 
    : events.filter(e => {
        const q = searchQuery.toLowerCase();
        return (
          e.identity.event_title.toLowerCase().includes(q) ||
          e.identity.main_performer.toLowerCase().includes(q) ||
          e.location.venue_name.toLowerCase().includes(q) ||
          e.location.city.toLowerCase().includes(q) ||
          e.identity.category.toLowerCase().includes(q)
        );
      }).slice(0, 5);

  const handleQueryInputChange = (val: string) => {
    onSearchChange(val);
    if (val.trim().length > 0) {
      setIsAutocompleteOpen(true);
    } else {
      setIsAutocompleteOpen(false);
    }
  };

  const handleClearSearch = () => {
    onSearchChange('');
    setIsAutocompleteOpen(false);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAutocompleteOpen(false);
    setIsMobileSearchOpen(false);
    onExecuteSearch();
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-[#024ddf] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <nav aria-label="Main Navigation" className="flex items-center justify-between h-16 w-full gap-2 md:gap-4">
          
          {/* LEFT: Mobile Menu Button & Brand Logo */}
          <div className="flex items-center shrink-0">
            <button 
              type="button" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden mr-2 p-2 text-white hover:bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-white cursor-pointer" 
              aria-label="Open site navigation menu" 
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor">
                  <path d="M23 5.75H1V4.25H23zM1 11.25H17V12.75H1zM13 18.25H1V19.75H13z" />
                </svg>
              )}
            </button>

            {/* Ticketmaster Brand Logo */}
            <a 
              href="https://www.ticketmaster.com/"
              aria-label="Ticketmaster Home page"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
                onSearchChange('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="flex items-center mr-2 md:mr-6 focus:outline-none focus:ring-2 focus:ring-white rounded p-1"
            >
              <TicketmasterLogo className="h-6 md:h-7 w-auto" color="#ffffff" />
            </a>

            {/* Desktop Category Navigation */}
            <ul aria-label="Categories" role="list" className="hidden xl:flex items-center space-x-1 m-0 p-0">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <li key={cat.id} role="listitem" className="list-none">
                    <button 
                      type="button"
                      onClick={() => {
                        onSelectCategory(cat.id);
                        const el = document.getElementById('discovery-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`px-2.5 py-1.5 rounded text-[14px] font-semibold transition-colors duration-200 ease-out cursor-pointer whitespace-nowrap ${
                        isActive 
                          ? 'bg-white text-[#024ddf] font-bold shadow-xs' 
                          : 'text-white/95 hover:bg-white/14 active:bg-[#012e85]/90 hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* CENTER: Integrated Search Bar with Location Pill & Instant Autocomplete */}
          <div className="hidden md:flex flex-1 max-w-xl mx-2 relative" ref={searchContainerRef}>
            <form 
              onSubmit={handleSearchSubmit}
              className="w-full bg-white text-gray-900 rounded-full flex items-center px-3 py-1 shadow-sm border border-transparent focus-within:ring-2 focus-within:ring-[#ffb932] transition-all"
            >
              <Search className="w-4 h-4 text-gray-500 shrink-0 mr-2" />
              
              <input 
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => handleQueryInputChange(e.target.value)}
                onFocus={() => {
                  if (searchQuery.trim().length > 0) setIsAutocompleteOpen(true);
                }}
                placeholder="Find millions of live experiences"
                className="w-full text-xs lg:text-sm bg-transparent border-none outline-none focus:outline-none text-gray-800 placeholder-gray-500 font-medium"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 mr-1"
                  aria-label="Clear search input"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Integrated City Selector Pill */}
              <div className="relative shrink-0 border-l border-gray-200 pl-2 ml-1" ref={cityDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                  className="flex items-center space-x-1 text-xs text-gray-700 hover:text-[#024ddf] font-semibold py-1 px-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label={`Selected city: ${selectedCity === 'all' ? 'All Cities' : selectedCity}`}
                >
                  <MapPin className="w-3 h-3 text-[#024ddf]" />
                  <span className="max-w-[75px] truncate">
                    {selectedCity === 'all' ? 'All Cities' : selectedCity}
                  </span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                {isCityDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white text-gray-900 rounded-xl shadow-2xl border border-gray-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                      Popular Locations
                    </div>
                    <div className="max-h-60 overflow-y-auto py-1">
                      {CITIES_LIST.map((city) => {
                        const val = city === 'All Cities' ? 'all' : city;
                        const isSelected = selectedCity === val || (selectedCity === 'all' && city === 'All Cities');
                        return (
                          <button
                            key={city}
                            type="button"
                            onClick={() => {
                              onCityChange(val);
                              setIsCityDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-blue-50 transition-colors ${
                              isSelected ? 'text-[#024ddf] font-bold bg-blue-50/50' : 'text-gray-700'
                            }`}
                          >
                            <span>{city}</span>
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#024ddf]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Search Button */}
              <button
                type="submit"
                className="bg-[#024ddf] hover:bg-[#0139a7] text-white p-1.5 rounded-full ml-1 shrink-0 transition-colors cursor-pointer"
                aria-label="Submit search"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Instant Predictive Autocomplete Dropdown */}
            {isAutocompleteOpen && matchingEvents.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white text-gray-900 rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-2 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Matching Live Experiences ({matchingEvents.length})
                  </span>
                  <button
                    onClick={() => setIsAutocompleteOpen(false)}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    Close
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto divide-y divide-gray-100">
                  {matchingEvents.map((evt) => (
                    <button
                      key={evt.identity.event_id}
                      type="button"
                      onClick={() => {
                        onSelectEvent(evt);
                        setIsAutocompleteOpen(false);
                      }}
                      className="w-full p-3 flex items-center gap-3 text-left hover:bg-blue-50/60 transition-colors group cursor-pointer"
                    >
                      <img 
                        src={evt.identity.image_url} 
                        alt={evt.identity.event_title}
                        className="w-14 h-10 object-cover rounded-md shrink-0 group-hover:scale-105 transition-transform" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-100 text-[#024ddf]">
                            {evt.identity.category}
                          </span>
                          <span className="text-xs text-gray-500 truncate">
                            {evt.date_time.exact_date}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-gray-900 truncate group-hover:text-[#024ddf]">
                          {evt.identity.event_title}
                        </p>
                        <p className="text-xs text-gray-500 truncate flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                          <span>{evt.location.venue_name} • {evt.location.city}, {evt.location.state}</span>
                        </p>
                        {onSelectPerformer && evt.identity.main_performer && (
                          <span 
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsAutocompleteOpen(false);
                              onSelectPerformer(evt.identity.main_performer);
                            }}
                            className="inline-block text-[11px] font-bold text-[#024ddf] hover:underline mt-0.5 cursor-pointer"
                          >
                            View {evt.identity.main_performer} Tour Page &rarr;
                          </span>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <span className="block text-xs font-extrabold text-gray-900">
                          From ${evt.pricing.min_price}
                        </span>
                        <span className="inline-block text-[11px] text-[#024ddf] font-semibold group-hover:underline">
                          See Tickets &rarr;
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="p-2.5 bg-gray-50 text-center border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="text-xs font-bold text-[#024ddf] hover:underline"
                  >
                    View all results for &ldquo;{searchQuery}&rdquo; &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Search Toggle (Mobile), My Tickets & Account Menu */}
          <div className="flex items-center space-x-1 md:space-x-3">
            
            {/* Mobile Search Toggle */}
            <button 
              type="button"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-md focus:outline-none cursor-pointer"
              aria-label="Toggle mobile search"
            >
              {isMobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>

            {/* My Tickets Button */}
            <button 
              type="button"
              id="main-nav-my-tickets-btn"
              onClick={onOpenMyTickets}
              className="flex items-center space-x-1.5 text-white font-semibold text-[14px] hover:bg-white/14 active:bg-[#012e85]/90 px-2.5 md:px-3 py-1.5 rounded-md transition-colors duration-200 cursor-pointer"
              aria-label={`View My Tickets (${purchasedCount} purchased)`}
            >
              <Ticket className="w-4 h-4 text-[#ffb932]" />
              <span className="hidden sm:inline">My Tickets</span>
              {purchasedCount > 0 && (
                <span className="bg-[#ffb932] text-[#121212] font-black text-xs px-1.5 py-0.2 rounded-full shadow-xs">
                  {purchasedCount}
                </span>
              )}
            </button>

            {/* Sign In / Account Dropdown */}
            <div className="relative" ref={accountMenuRef}>
              <button 
                type="button"
                id="main-nav-account-btn"
                onClick={() => {
                  if (user) {
                    setIsAccountMenuOpen(!isAccountMenuOpen);
                  } else {
                    onOpenSignIn();
                  }
                }}
                className="flex items-center space-x-1.5 text-white font-semibold text-[14px] hover:bg-white/14 active:bg-[#012e85]/90 px-2.5 md:px-3 py-1.5 rounded-md transition-colors duration-200 cursor-pointer"
                aria-expanded={isAccountMenuOpen}
                aria-label="User account menu"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="hidden sm:inline">
                  {user ? `Hi, ${user.name.split(' ')[0]}` : 'Sign In'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-white/70 hidden sm:inline" />
              </button>

              {isAccountMenuOpen && (
                <div 
                  id="main-account-dropdown"
                  className="absolute right-0 mt-2 w-64 bg-white text-[#121212] rounded-xl shadow-2xl border border-gray-200 py-2 divide-y divide-gray-100 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  {user ? (
                    <>
                      <div className="px-4 py-2.5 bg-gray-50/70">
                        <p className="text-xs font-bold text-gray-900">{user.name}</p>
                        <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#024ddf]">
                          Verified Fan Account
                        </span>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setIsAccountMenuOpen(false);
                            onOpenMyTickets();
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-[#024ddf] flex items-center justify-between"
                        >
                          <span className="flex items-center space-x-2">
                            <Ticket className="w-3.5 h-3.5 text-[#024ddf]" />
                            <span className="font-semibold">My Tickets</span>
                          </span>
                          {purchasedCount > 0 && (
                            <span className="bg-[#024ddf] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                              {purchasedCount}
                            </span>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setIsAccountMenuOpen(false);
                            alert('Ticketmaster Resale: Manage your ticket listings and payouts.');
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-[#024ddf] flex items-center space-x-2"
                        >
                          <Tag className="w-3.5 h-3.5 text-yellow-600" />
                          <span>Sell on Ticketmaster</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsAccountMenuOpen(false);
                            alert('Ticketmaster Help Center: Find FAQs, event guidelines, and contact support.');
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-[#024ddf] flex items-center space-x-2"
                        >
                          <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Help Center</span>
                        </button>
                      </div>
                      <div className="pt-1">
                        <button
                          onClick={() => {
                            setIsAccountMenuOpen(false);
                            if (onSignOut) onSignOut();
                            else onOpenSignIn();
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center space-x-2"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out / Switch User</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-3 space-y-2">
                      <p className="text-xs text-gray-600">Sign in to access your tickets, save favorites, and manage orders.</p>
                      <button
                        onClick={() => {
                          setIsAccountMenuOpen(false);
                          onOpenSignIn();
                        }}
                        className="w-full py-2 bg-[#024ddf] hover:bg-[#0139a7] text-white text-xs font-bold rounded-lg transition-colors"
                      >
                        Sign In / Register
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </nav>
      </div>

      {/* MOBILE SEARCH BAR (Animated expansion) */}
      {isMobileSearchOpen && (
        <div className="md:hidden bg-[#0139a7] px-4 py-2.5 border-t border-blue-500/40 animate-in slide-in-from-top-1 duration-150">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => handleQueryInputChange(e.target.value)}
              placeholder="Search artist, event or venue..."
              className="w-full bg-white text-gray-900 rounded-full pl-9 pr-8 py-2 text-xs placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ffb932]"
              autoFocus
            />
            <Search className="w-4 h-4 text-gray-500 absolute left-3 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-2.5 p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {matchingEvents.length > 0 && (
            <div className="mt-2 bg-white text-gray-900 rounded-xl shadow-xl overflow-hidden divide-y divide-gray-100 max-h-64 overflow-y-auto">
              {matchingEvents.map((evt) => (
                <button
                  key={evt.identity.event_id}
                  onClick={() => {
                    onSelectEvent(evt);
                    setIsMobileSearchOpen(false);
                  }}
                  className="w-full p-2.5 flex items-center gap-2.5 text-left hover:bg-blue-50"
                >
                  <img 
                    src={evt.identity.image_url} 
                    alt={evt.identity.event_title} 
                    className="w-10 h-8 object-cover rounded" 
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold truncate text-gray-900">{evt.identity.event_title}</p>
                    <p className="text-[10px] text-gray-500 truncate">{evt.location.venue_name} • {evt.location.city}</p>
                  </div>
                  <span className="text-xs font-bold text-[#024ddf] shrink-0">${evt.pricing.min_price}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MOBILE DRAWER NAVIGATION MENU */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-navigation-drawer"
          className="lg:hidden bg-[#0139a7] border-t border-blue-600 px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200"
        >
          {/* User Account Quick Tile */}
          <div className="bg-blue-900/40 p-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">{user ? user.name : 'Welcome, Guest'}</p>
                <p className="text-[10px] text-blue-200">{user ? user.email : 'Sign in to access your tickets'}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSignIn();
              }}
              className="text-xs font-bold bg-white text-[#024ddf] px-2.5 py-1 rounded"
            >
              {user ? 'Account' : 'Sign In'}
            </button>
          </div>

          <div className="text-[11px] font-bold uppercase tracking-wider text-blue-200 px-1">
            Browse By Category
          </div>

          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setIsMobileMenuOpen(false);
                    const el = document.getElementById('discovery-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg text-xs font-bold transition-colors ${
                    isActive ? 'bg-white text-[#024ddf]' : 'bg-blue-800/40 text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick links in mobile drawer */}
          <div className="pt-2 border-t border-blue-500/30 space-y-1 text-xs text-blue-100">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenMyTickets();
              }}
              className="w-full flex items-center justify-between py-2 px-2 rounded hover:bg-white/10 text-left font-semibold text-white"
            >
              <span className="flex items-center space-x-2">
                <Ticket className="w-4 h-4 text-[#ffb932]" />
                <span>My Tickets</span>
              </span>
              {purchasedCount > 0 && (
                <span className="bg-[#ffb932] text-[#121212] font-black text-xs px-2 py-0.5 rounded-full">
                  {purchasedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                alert('Ticketmaster Resale Marketplace: List your tickets with verified fan security.');
              }}
              className="w-full flex items-center space-x-2 py-2 px-2 rounded hover:bg-white/10 text-left font-semibold text-white"
            >
              <Tag className="w-4 h-4 text-yellow-400" />
              <span>Sell Tickets</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                alert('Ticketmaster Travel: Book verified hotels next to your concert and game venues.');
              }}
              className="w-full flex items-center space-x-2 py-2 px-2 rounded hover:bg-white/10 text-left font-semibold text-white"
            >
              <ExternalLink className="w-4 h-4 text-blue-300" />
              <span>Hotels & Travel</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
