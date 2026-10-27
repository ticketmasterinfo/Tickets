import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Ticket, 
  ShieldCheck, 
  Sparkles,
  Search,
  Filter,
  Layers,
  ChevronRight
} from 'lucide-react';
import { 
  EventItem, 
  FilterOptions, 
  SeatZone, 
  SelectedTicketGroup, 
  PurchasedTicket,
  ArtistProfile
} from './types';
import { EVENTS_DATA, SEAT_ZONES_PRESETS, getEventSeatZones } from './data/eventsData';
import { getArtistProfile } from './data/artistsData';
import { ArtistExperienceView } from './components/Artist/ArtistExperienceView';
import { TopUtilityBar } from './components/Header/TopUtilityBar';
import { MainNav } from './components/Header/MainNav';
import { OmniboxSearch } from './components/Header/OmniboxSearch';
import { HeroBillboard } from './components/Hero/HeroBillboard';
import { HeroHighlights } from './components/Hero/HeroHighlights';
import { TrendingSearches } from './components/Discovery/TrendingSearches';
import { HappeningThisWeekend } from './components/Discovery/HappeningThisWeekend';
import { SponsoredPresales } from './components/Discovery/SponsoredPresales';
import { RecentlyViewedSection } from './components/Discovery/RecentlyViewedSection';
import { PopularNearYou } from './components/Discovery/PopularNearYou';
import { CalvinHarrisPageView } from './components/Artist/CalvinHarrisPageView';
import { resolveEventForBooking } from './utils/eventResolver';
import { FeaturedSidebar } from './components/Discovery/FeaturedSidebar';
import { EventCarousel } from './components/Events/EventCarousel';
import { FilterSidebar } from './components/Discovery/FilterSidebar';
import { EventGrid } from './components/Discovery/EventGrid';
import { TicketmasterEventExperience } from './components/SeatMap/TicketmasterEventExperience';
import { CheckoutModal } from './components/Checkout/CheckoutModal';
import { MyTicketsModal } from './components/Tickets/MyTicketsModal';
import { ScannedPassModal } from './components/Tickets/ScannedPassModal';
import { EventDetailModal } from './components/EventDetail/EventDetailModal';
import { decodeTicketPass, resolveScannedPass } from './utils/ticketUrlHelper';
import { EntertainmentGuides } from './components/Discovery/EntertainmentGuides';
import { DiscoverArticles } from './components/Discovery/DiscoverArticles';
import { PopularCitiesSection } from './components/Discovery/PopularCitiesSection';
import { BrowsingPausedModal } from './components/Security/BrowsingPausedModal';
import { FeedbackWidget } from './components/Feedback/FeedbackWidget';
import { Footer } from './components/Footer/Footer';
import { SignInModal } from './components/Header/SignInModal';
import { TicketmasterTravelView } from './components/Travel/TicketmasterTravelView';
import { MobileSplashScreen } from './components/Mobile/MobileSplashScreen';
import { MobileBottomNav, MobileTab } from './components/Mobile/MobileBottomNav';
import { MobileHomeView } from './components/Mobile/MobileHomeView';
import { MobileTicketsView } from './components/Mobile/MobileTicketsView';
import { MobileAccountView } from './components/Mobile/MobileAccountView';
import { MobileWatchlistView } from './components/Mobile/MobileWatchlistView';
import { InstallAppModal } from './components/Mobile/InstallAppModal';
import { CitySelectorModal } from './components/Mobile/CitySelectorModal';
import { TicketmasterSyncModal } from './components/Admin/TicketmasterSyncModal';
import { fetchLiveEvents } from './services/eventSyncService';
import { NotificationToast } from './components/Common/NotificationToast';
import { showAppNotification } from './utils/notification';

export default function App() {
  // Primary States (initialized with seed events, updated via official TM sync)
  const [events, setEvents] = useState<EventItem[]>(EVENTS_DATA);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Filter & Search State
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    subcategory: 'all',
    city: 'all',
    dateRange: 'all',
    minPrice: 0,
    maxPrice: 900,
    searchQuery: '',
    sortBy: 'date_asc',
    venue: 'all'
  });

  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');

  // Booking & Seating State
  const [bookingEvent, setBookingEvent] = useState<EventItem | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<ArtistProfile | null>(null);
  const [selectedZone, setSelectedZone] = useState<SeatZone | null>(SEAT_ZONES_PRESETS.default[1]); // Default to GA Floor
  const [ticketQuantity, setTicketQuantity] = useState<number>(2);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Modals State
  const [detailEvent, setDetailEvent] = useState<EventItem | null>(null);
  const [checkoutData, setCheckoutData] = useState<{ event: EventItem; group: SelectedTicketGroup } | null>(null);
  const [isMyTicketsOpen, setIsMyTicketsOpen] = useState(false);
  const [isBrowsingPausedOpen, setIsBrowsingPausedOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isTravelOpen, setIsTravelOpen] = useState(false);
  const [isCalvinHarrisOpen, setIsCalvinHarrisOpen] = useState(false);
  const [scannedPassData, setScannedPassData] = useState<{ event: EventItem; ticket: PurchasedTicket } | null>(null);

  // Mobile App Dedicated States
  const [showSplash, setShowSplash] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('desktop');
  const [mobileTab, setMobileTab] = useState<MobileTab>('home');
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isCitySelectorOpen, setIsCitySelectorOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState('Los Angeles, California');
  const [watchlistArtists, setWatchlistArtists] = useState<string[]>([
    'Olivia Rodrigo',
    'Metallica',
    'Calvin Harris',
    'Taylor Swift'
  ]);

  const handleToggleWatchlistArtist = (artistName: string) => {
    setWatchlistArtists(prev => 
      prev.includes(artistName) ? prev.filter(a => a !== artistName) : [...prev, artistName]
    );
  };

  // Load live synchronized events from Ticketmaster server API
  useEffect(() => {
    let isMounted = true;
    fetchLiveEvents()
      .then(res => {
        if (isMounted && res.events && res.events.length > 0) {
          setEvents(res.events);
        }
      })
      .catch(err => {
        console.warn('Initial live events fetch fallback:', err);
      });
    return () => { isMounted = false; };
  }, []);

  // Splash effect for each time reload or the app is entered / resumed from background
  useEffect(() => {
    let wasHidden = false;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        wasHidden = true;
      } else if (wasHidden) {
        wasHidden = false;
        setShowSplash(true);
      }
    };

    const handleWindowFocus = () => {
      if (wasHidden) {
        wasHidden = false;
        setShowSplash(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, []);

  // Listen for scanned pass QR code link from any device (?pass=...)
  useEffect(() => {
    const handleCheckScannedUrl = () => {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      const rawPass = params.get('pass') || params.get('ticket');
      if (rawPass) {
        const decoded = decodeTicketPass(rawPass);
        if (decoded) {
          const resolved = resolveScannedPass(decoded, events);
          setScannedPassData(resolved);
        }
      }
    };

    handleCheckScannedUrl();
    window.addEventListener('popstate', handleCheckScannedUrl);
    return () => window.removeEventListener('popstate', handleCheckScannedUrl);
  }, [events]);

  const handleCloseScannedPass = () => {
    setScannedPassData(null);
    if (typeof window !== 'undefined' && window.history) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  const handleOpenScannedPassFromTicket = (ticket: PurchasedTicket) => {
    setScannedPassData({ event: ticket.event, ticket });
  };

  // User Authentication State
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>({
    name: 'Alex Morgan',
    email: 'ticketmastersincinfo@gmail.com'
  });

  // Purchased Tickets store with 1 initial sample ticket for instant exploration
  const [purchasedTickets, setPurchasedTickets] = useState<PurchasedTicket[]>([
    {
      ticketId: 'TIX-928410',
      orderId: 'TM-71049281',
      event: EVENTS_DATA[0], // Eagles
      zoneName: 'Lower Bowl - Section 102 (Center)',
      section: 'SEC-102',
      row: 'B',
      seatNumber: 'Seat 14',
      price: 185,
      totalPaid: 218.75,
      barcode: '4928194018274',
      purchaseDate: 'Aug 10, 2026',
      attendeeName: 'Alex Morgan',
      attendeeEmail: 'ticketmastersincinfo@gmail.com'
    }
  ]);

  // Featured Events for Hero Billboard
  const featuredEvents = useMemo(() => {
    return events.filter(e => e.identity.is_featured);
  }, [events]);

  // Filtered Events Calculation
  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Filter by Category
    if (filters.category !== 'all') {
      if (filters.category === 'VIP') {
        result = result.filter(e => e.pricing.max_price >= 500 || e.identity.is_featured);
      } else {
        result = result.filter(e => e.identity.category.toLowerCase() === filters.category.toLowerCase());
      }
    }

    // Filter by City
    if (filters.city !== 'all') {
      result = result.filter(e => e.location.city.toLowerCase().includes(filters.city.toLowerCase()));
    }

    // Filter by Venue
    if (filters.venue !== 'all') {
      result = result.filter(e => e.location.venue_name.toLowerCase().includes(filters.venue.toLowerCase()));
    }

    // Filter by Max Price
    result = result.filter(e => e.pricing.min_price <= filters.maxPrice);

    // Filter by Search Query
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(e => 
        e.identity.event_title.toLowerCase().includes(q) ||
        e.identity.main_performer.toLowerCase().includes(q) ||
        e.location.venue_name.toLowerCase().includes(q) ||
        e.location.city.toLowerCase().includes(q) ||
        e.identity.category.toLowerCase().includes(q) ||
        e.identity.subcategory.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (filters.sortBy === 'date_asc') {
      result.sort((a, b) => new Date(a.date_time.exact_date).getTime() - new Date(b.date_time.exact_date).getTime());
    } else if (filters.sortBy === 'date_desc') {
      result.sort((a, b) => new Date(b.date_time.exact_date).getTime() - new Date(a.date_time.exact_date).getTime());
    } else if (filters.sortBy === 'price_asc') {
      result.sort((a, b) => a.pricing.min_price - b.pricing.min_price);
    } else if (filters.sortBy === 'price_desc') {
      result.sort((a, b) => b.pricing.min_price - a.pricing.min_price);
    }

    return result;
  }, [events, filters]);

  // Handlers
  const handleCategorySelect = (category: string) => {
    setSelectedArtist(null);
    setActiveCategory(category);
    setFilters(prev => ({ ...prev, category: category }));
    
    // If currently in booking view, return to home discovery
    if (bookingEvent) {
      setBookingEvent(null);
    }

    // Smooth scroll down to discovery section
    const el = document.getElementById('discovery-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isCalvin = (name?: string) => {
    return Boolean(name && name.toLowerCase().includes('calvin'));
  };

  const handleOpenArtist = (performerName: string) => {
    if (isCalvin(performerName)) {
      setIsCalvinHarrisOpen(true);
      setBookingEvent(null);
      setSelectedArtist(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const profile = getArtistProfile(performerName, events);
    setSelectedArtist(profile);
    setBookingEvent(null);
    if (detailEvent) {
      setDetailEvent(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (event?: EventItem) => {
    const targetEvent = event || EVENTS_DATA[0];
    if (
      isCalvin(targetEvent.identity?.main_performer) ||
      isCalvin(targetEvent.identity?.event_title)
    ) {
      setIsCalvinHarrisOpen(true);
      return;
    }
    setBookingEvent(targetEvent);
    const zones = getEventSeatZones(targetEvent);
    setSelectedZone(zones[1] || zones[0]);
    setSelectedSeats([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseBooking = () => {
    setBookingEvent(null);
    setSelectedSeats([]);
  };

  const handleToggleSeat = (seatId: string) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(s => s !== seatId);
      } else {
        if (prev.length >= ticketQuantity) {
          return [...prev.slice(1), seatId];
        }
        return [...prev, seatId];
      }
    });
  };

  const handleOrderComplete = (newTickets: PurchasedTicket[] | PurchasedTicket) => {
    const ticketsArray = Array.isArray(newTickets) ? newTickets : [newTickets];
    setPurchasedTickets(prev => [...ticketsArray, ...prev]);
    setCheckoutData(null);
    setBookingEvent(null);
    setIsMyTicketsOpen(true);
  };

  const handleSearchPerformer = (performerName: string) => {
    if (isCalvin(performerName)) {
      setIsCalvinHarrisOpen(true);
      setBookingEvent(null);
      setSelectedArtist(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const resolved = resolveEventForBooking(performerName, events);
    handleOpenBooking(resolved);
  };

  if (isCalvinHarrisOpen) {
    return (
      <CalvinHarrisPageView 
        onBack={() => setIsCalvinHarrisOpen(false)}
        onOpenBooking={(event) => {
          setIsCalvinHarrisOpen(false);
          setBookingEvent(event);
          const zones = getEventSeatZones(event);
          setSelectedZone(zones[1] || zones[0]);
          setSelectedSeats([]);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  if (isTravelOpen) {
    return (
      <div className="min-h-screen flex flex-col bg-[#121212] text-white font-averta">
        <TicketmasterTravelView 
          onBackToHome={() => {
            setIsTravelOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectEvent={(event) => {
            setIsTravelOpen(false);
            handleOpenBooking(event);
          }}
          events={events}
        />
        {checkoutData && (
          <CheckoutModal 
            event={checkoutData.event}
            ticketGroup={checkoutData.group}
            onClose={() => setCheckoutData(null)}
            onOrderComplete={handleOrderComplete}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen min-h-dvh flex flex-col bg-[#121212] text-white font-averta">
      {/* 0. AUTHENTIC MOBILE APP SPLASH LOADING SCREEN (IMG_6272) */}
      {showSplash && (
        <MobileSplashScreen 
          onComplete={() => setShowSplash(false)}
          durationMs={1500}
        />
      )}

      {viewMode === 'mobile' ? (
        /* ==================== AUTHENTIC MOBILE APPLICATION (iOS & ANDROID) ==================== */
        <div className="flex-1 w-full bg-[#121212] flex flex-col items-center min-h-screen min-h-dvh">
          <div className="w-full md:max-w-md lg:max-w-lg bg-[#121212] min-h-screen min-h-dvh text-white flex flex-col relative md:shadow-2xl md:border-x md:border-white/5 pb-[calc(5rem+env(safe-area-inset-bottom,0px))] pt-safe">
            {/* Mobile View Routing */}
            {bookingEvent ? (
              <TicketmasterEventExperience 
                event={bookingEvent}
                onBack={handleCloseBooking}
                onProceedToCheckout={(group) => setCheckoutData({ event: bookingEvent, group })}
                currentUser={currentUser}
              />
            ) : selectedArtist ? (
              <div>
                <button
                  onClick={() => setSelectedArtist(null)}
                  className="p-4 inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <ArtistExperienceView 
                  artist={selectedArtist}
                  onBack={() => setSelectedArtist(null)}
                  onSelectEvent={handleOpenBooking}
                />
              </div>
            ) : mobileTab === 'home' ? (
              <MobileHomeView 
                events={events}
                currentCity={currentCity}
                onOpenCitySelector={() => setIsCitySelectorOpen(true)}
                onSelectEvent={handleOpenBooking}
                onViewEventDetails={(evt) => setDetailEvent(evt)}
                onSelectArtist={handleOpenArtist}
                onToggleWatchlistArtist={handleToggleWatchlistArtist}
                watchlistArtists={watchlistArtists}
                onOpenInstallModal={() => setIsInstallModalOpen(true)}
              />
            ) : mobileTab === 'watchlist' ? (
              <MobileWatchlistView 
                watchlistArtists={watchlistArtists}
                onRemoveWatchlistArtist={handleToggleWatchlistArtist}
                onExploreTrending={() => setMobileTab('home')}
                events={events}
                onViewEventDetails={(evt) => setDetailEvent(evt)}
              />
            ) : mobileTab === 'tickets' ? (
              <MobileTicketsView 
                tickets={purchasedTickets}
                currentUser={currentUser}
                onOpenSignIn={() => setIsSignInModalOpen(true)}
                onOpenTicketPass={handleOpenScannedPassFromTicket}
                onSelectEventForBooking={handleOpenBooking}
              />
            ) : (
              <MobileAccountView 
                currentUser={currentUser}
                onOpenSignIn={() => setIsSignInModalOpen(true)}
                onSignOut={() => setCurrentUser(null)}
                onOpenInstallModal={() => setIsInstallModalOpen(true)}
                onRelaunchSplash={() => setShowSplash(true)}
                onSwitchToDesktop={() => setViewMode('desktop')}
                favoritesCount={watchlistArtists.length}
                onNavigateToFavorites={() => setMobileTab('watchlist')}
                currentCity={currentCity}
                onOpenCitySelector={() => setIsCitySelectorOpen(true)}
                onUpdateUser={setCurrentUser}
                onOpenSyncModal={() => setIsSyncModalOpen(true)}
              />
            )}

            {/* Persistent Mobile Bottom Navigation Bar matching IMG_6273, IMG_6274, IMG_6275 */}
            <MobileBottomNav 
              activeTab={mobileTab}
              onChangeTab={(tab) => {
                setMobileTab(tab);
                if (bookingEvent) setBookingEvent(null);
                if (selectedArtist) setSelectedArtist(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              ticketCount={purchasedTickets.length}
              watchlistCount={watchlistArtists.length}
            />
          </div>
        </div>
      ) : (
        /* ==================== DESKTOP DISCOVERY PORTAL VIEW ==================== */
        <div className="flex-1 flex flex-col bg-[#f6f6f6]">
          {/* 1. TOP UTILITY BAR (#121212) */}
          <TopUtilityBar 
            purchasedTickets={purchasedTickets}
            onOpenMyTickets={() => setIsMyTicketsOpen(true)}
            onOpenHelp={() => setIsBrowsingPausedOpen(true)}
            onOpenSell={() => {
              showAppNotification('Ticketmaster Resale Marketplace: Select tickets in "My Tickets" to list at verified fan face-value.', 'Ticketmaster Resale');
            }}
            onOpenTravel={() => {
              setIsTravelOpen(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenSignIn={() => setIsSignInModalOpen(true)}
            onOpenSecurityStatus={() => setIsBrowsingPausedOpen(true)}
            user={currentUser}
            onSignOut={() => setCurrentUser(null)}
            onOpenSync={() => setIsSyncModalOpen(true)}
          />

          {/* 2. DUAL-BAR MAIN HEADER (#024ddf) */}
          <MainNav 
            activeCategory={activeCategory}
            onSelectCategory={handleCategorySelect}
            onOpenMyTickets={() => setIsMyTicketsOpen(true)}
            onOpenSignIn={() => setIsSignInModalOpen(true)}
            purchasedCount={purchasedTickets.length}
            events={events}
            searchQuery={filters.searchQuery}
            onSearchChange={(q) => setFilters(prev => ({ ...prev, searchQuery: q }))}
            selectedCity={filters.city}
            onCityChange={(c) => setFilters(prev => ({ ...prev, city: c }))}
            onSelectEvent={handleOpenBooking}
            onSelectPerformer={handleOpenArtist}
            onExecuteSearch={() => {
              if (isCalvin(filters.searchQuery)) {
                setIsCalvinHarrisOpen(true);
                return;
              }
              const el = document.getElementById('discovery-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            user={currentUser}
            onSignOut={() => setCurrentUser(null)}
          />


      {/* VIEW ORCHESTRATION: SEATING/BOOKING VIEW OR HOME DISCOVERY VIEW */}
      {bookingEvent ? (
        <TicketmasterEventExperience 
          event={bookingEvent}
          onBack={handleCloseBooking}
          onProceedToCheckout={(group) => setCheckoutData({ event: bookingEvent, group })}
          currentUser={currentUser}
        />
      ) : selectedArtist ? (
        /* ==================== DEDICATED ARTIST TOUR & TICKET PAGE ==================== */
        <main id="artist-experience-view" className="flex-1 w-full">
          <ArtistExperienceView 
            artist={selectedArtist}
            onBack={() => {
              setSelectedArtist(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectEvent={(event) => {
              handleOpenBooking(event);
            }}
          />
        </main>
      ) : (
        /* ==================== HOME / DISCOVERY EXPERIENCE ==================== */
        <main id="discovery-experience-view" className="flex-1 w-full pb-16">
          
          {/* 3. HERO HIGHLIGHTS BANNER & SPOTLIGHTS (Matching exact template) */}
          <HeroHighlights 
            onSelectEvent={(name?: string) => handleSearchPerformer(name || 'Pentatonix')}
            onExploreCategory={handleCategorySelect}
          />

          {/* 5. INTEGRATED 3-INPUT OMNIBOX SEARCH WIDGET */}
          <div className="-mt-7 md:-mt-9 mb-8 relative z-30">
            <OmniboxSearch 
              events={events}
              searchQuery={filters.searchQuery}
              onSearchChange={(q) => setFilters(prev => ({ ...prev, searchQuery: q }))}
              selectedCity={filters.city}
              onCityChange={(c) => setFilters(prev => ({ ...prev, city: c }))}
              dateRange={filters.dateRange}
              onDateRangeChange={(r) => setFilters(prev => ({ ...prev, dateRange: r }))}
              onSelectEvent={handleOpenBooking}
              onSelectPerformer={handleOpenArtist}
              onExecuteSearch={() => {
                if (isCalvin(filters.searchQuery)) {
                  setIsCalvinHarrisOpen(true);
                  return;
                }
                const el = document.getElementById('discovery-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">

            {/* 6. TRENDING SEARCHES CAROUSEL */}
            <TrendingSearches onSelectPerformer={handleSearchPerformer} />

            {/* 7. HAPPENING THIS WEEKEND CAROUSEL */}
            <HappeningThisWeekend onSelectEvent={handleSearchPerformer} />

            {/* 7.1 RECENTLY VIEWED (Template Section) */}
            <RecentlyViewedSection onSelectEvent={handleSearchPerformer} />

            {/* 8. SPONSORED PRESALES AND OFFERS */}
            <SponsoredPresales 
              onSelectEvent={handleSearchPerformer}
              onOpenCitySelector={() => {
                const el = document.getElementById('discovery-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 9. CATEGORY HORIZONTAL SNAP CAROUSELS */}
            <div className="space-y-4 pt-2">
              {/* Carousel 1: Popular Concert Tours */}
              <EventCarousel 
                title="Hot & Trending Concert Tours"
                subtitle="The biggest arena and stadium spectacles happening nationwide"
                badgeText="HIGH DEMAND"
                events={events.filter(e => e.identity.category === 'Concerts')}
                onSelectEvent={handleOpenBooking}
                onViewDetails={(evt) => setDetailEvent(evt)}
                onSelectPerformer={handleOpenArtist}
                onViewAll={() => handleCategorySelect('Concerts')}
              />

              {/* Carousel 2: Marquee Sports Showcases */}
              <EventCarousel 
                title="Live Sports & Championships"
                subtitle="NBA basketball clashes, MLB showdowns, and WWE spectacles"
                badgeText="OFFICIAL TICKETS"
                events={events.filter(e => e.identity.category === 'Sports')}
                onSelectEvent={handleOpenBooking}
                onViewDetails={(evt) => setDetailEvent(evt)}
                onSelectPerformer={handleOpenArtist}
                onViewAll={() => handleCategorySelect('Sports')}
              />

              {/* Carousel 3: Broadway & Theater */}
              <EventCarousel 
                title="Broadway Theater & Live Comedy"
                subtitle="Award-winning musicals, plays, and premier stand-up comedy showcases"
                badgeText="STAGE EXPERIENCES"
                events={events.filter(e => e.identity.category === 'Arts & Theater')}
                onSelectEvent={handleOpenBooking}
                onViewDetails={(evt) => setDetailEvent(evt)}
                onSelectPerformer={handleOpenArtist}
                onViewAll={() => handleCategorySelect('Arts & Theater')}
              />
            </div>

            {/* 10. POPULAR NEAR YOU (Concerts, Sports, Theater, Family) */}
            <PopularNearYou 
              onSelectCategory={handleCategorySelect}
              onSelectPerformer={handleSearchPerformer}
            />

            {/* 11. ENTERTAINMENT GUIDES CAROUSEL */}
            <EntertainmentGuides onSelectCategory={(cat) => handleCategorySelect(cat)} />

            {/* 12. DISCOVERY GRID WITH FILTER SIDEBAR & FEATURED SIDEBAR */}
            <section id="discovery-section" className="pt-8">
              <div className="mb-6">
                <span className="type-snowdon text-[#024ddf] font-black uppercase tracking-wider block mb-1">
                  Explore All Offerings
                </span>
                <h2 className="type-everest text-gray-900 font-extrabold tracking-tight">
                  Find Live Event Tickets Near You
                </h2>
                <p className="type-etna text-gray-500 mt-1">
                  Filter by performer, city, price range, and date timeframe with verified primary seats.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left: Filter Sidebar + Featured Ad Units (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="sticky top-20">
                    <FilterSidebar 
                      filters={filters}
                      onChangeFilters={(newF) => setFilters(prev => ({ ...prev, ...newF }))}
                      onResetFilters={() => setFilters({
                        category: 'all',
                        subcategory: 'all',
                        city: 'all',
                        dateRange: 'all',
                        minPrice: 0,
                        maxPrice: 900,
                        searchQuery: '',
                        sortBy: 'date_asc',
                        venue: 'all'
                      })}
                      totalFilteredCount={filteredEvents.length}
                    />

                    {/* Featured Sidebar (Hotels, Deals, VIP, Sell) */}
                    <div className="mt-6">
                      <FeaturedSidebar onActionClick={(actionId) => {
                        if (actionId === 'featured-vip') {
                          handleCategorySelect('VIP');
                        } else if (actionId === 'featured-sell') {
                          showAppNotification('Ticketmaster Verified Resale: Enter your event code or select tickets in "My Tickets" to list safely.', 'Ticketmaster Resale');
                        } else if (actionId === 'featured-hotels') {
                          setIsTravelOpen(true);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else {
                          const el = document.getElementById('discovery-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }} />
                    </div>
                  </div>
                </div>

                {/* Right: Event Stream Grid (8 cols) */}
                <div className="lg:col-span-8">
                  <EventGrid 
                    events={filteredEvents}
                    totalCount={events.length}
                    filters={filters}
                    onChangeFilters={(newF) => setFilters(prev => ({ ...prev, ...newF }))}
                    onResetFilters={() => setFilters({
                      category: 'all',
                      subcategory: 'all',
                      city: 'all',
                      dateRange: 'all',
                      minPrice: 0,
                      maxPrice: 900,
                      searchQuery: '',
                      sortBy: 'date_asc',
                      venue: 'all'
                    })}
                    onSelectEvent={handleOpenBooking}
                    onViewDetails={(evt) => setDetailEvent(evt)}
                    onSelectPerformer={handleOpenArtist}
                    layout={layoutMode}
                    onToggleLayout={(l) => setLayoutMode(l)}
                  />
                </div>

              </div>
            </section>

            {/* 13. DISCOVER MORE EDITORIAL ARTICLES */}
            <div className="mt-8">
              <DiscoverArticles />
            </div>

            {/* 14. POPULAR METRO CITIES */}
            <div className="mt-4">
              <PopularCitiesSection onSelectCity={(city) => {
                setFilters(prev => ({ ...prev, city: city }));
                const el = document.getElementById('discovery-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }} />
            </div>

          </div>

        </main>
      )}

      {/* COMPREHENSIVE DARK FOOTER FOR DESKTOP VIEW */}
      <Footer />
    </div>
  )}

      {/* 15. CHECKOUT MODAL */}
      {checkoutData && (
        <CheckoutModal 
          event={checkoutData.event}
          ticketGroup={checkoutData.group}
          onClose={() => setCheckoutData(null)}
          onOrderComplete={handleOrderComplete}
        />
      )}

      {/* 16. MY TICKETS SAFETIX MODAL */}
      {isMyTicketsOpen && (
        <MyTicketsModal 
          tickets={purchasedTickets}
          onClose={() => setIsMyTicketsOpen(false)}
          onOpenScannedPass={handleOpenScannedPassFromTicket}
        />
      )}

      {/* 16.1 SCANNED QR CODE VERIFIED PASS MODAL (Triggered when scanned by any device or via preview) */}
      {scannedPassData && (
        <ScannedPassModal 
          event={scannedPassData.event}
          ticket={scannedPassData.ticket}
          onClose={handleCloseScannedPass}
          onViewEventDetails={(ev) => {
            setDetailEvent(ev);
            handleCloseScannedPass();
          }}
        />
      )}

      {/* 17. EVENT DETAIL MODAL */}
      {detailEvent && (
        <EventDetailModal 
          event={detailEvent}
          onClose={() => setDetailEvent(null)}
          onSelectEventForBooking={handleOpenBooking}
          onOpenArtist={handleOpenArtist}
        />
      )}

      {/* 18. BROWSING ACTIVITY PAUSED / SECURITY CHECK MODAL */}
      <BrowsingPausedModal 
        isOpen={isBrowsingPausedOpen}
        onClose={() => setIsBrowsingPausedOpen(false)}
        onSignIn={() => {
          setIsBrowsingPausedOpen(false);
          setIsSignInModalOpen(true);
        }}
      />

      {/* 19. SIGN IN / REGISTER MODAL */}
      <SignInModal 
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        currentUserEmail={currentUser?.email}
        onSuccessSignIn={(email, name) => {
          setCurrentUser({ email, name });
          setIsSignInModalOpen(false);
        }}
      />

      {/* 20. DOWNLOAD PHONE APPLICATION MODAL (iOS & ANDROID) */}
      <InstallAppModal 
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      {/* 21. CITY SELECTOR MODAL */}
      <CitySelectorModal 
        isOpen={isCitySelectorOpen}
        currentCity={currentCity}
        onSelectCity={(city) => {
          setCurrentCity(city);
          setFilters(prev => ({ ...prev, city: city.split(',')[0].trim() }));
        }}
        onClose={() => setIsCitySelectorOpen(false)}
      />

      {/* 22. TICKETMASTER AUTOMATIC DISCOVERY SYNC MODAL */}
      <TicketmasterSyncModal 
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        events={events}
        onEventsUpdated={(updatedEvents) => setEvents(updatedEvents)}
      />

      {/* 23. FLOATING BOTTOM-RIGHT FEEDBACK WIDGET */}
      <FeedbackWidget />

      {/* 24. IN-APP TOAST NOTIFICATION SYSTEM */}
      <NotificationToast />

    </div>
  );
}

