import React, { useState, useMemo } from 'react';
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
  PurchasedTicket 
} from './types';
import { EVENTS_DATA, SEAT_ZONES_PRESETS } from './data/eventsData';
import { TopUtilityBar } from './components/Header/TopUtilityBar';
import { MainNav } from './components/Header/MainNav';
import { OmniboxSearch } from './components/Header/OmniboxSearch';
import { HeroBillboard } from './components/Hero/HeroBillboard';
import { EventCarousel } from './components/Events/EventCarousel';
import { FilterSidebar } from './components/Discovery/FilterSidebar';
import { EventGrid } from './components/Discovery/EventGrid';
import { InteractiveSeatMap } from './components/SeatMap/InteractiveSeatMap';
import { TicketDrawer } from './components/SeatMap/TicketDrawer';
import { CheckoutModal } from './components/Checkout/CheckoutModal';
import { MyTicketsModal } from './components/Tickets/MyTicketsModal';
import { EventDetailModal } from './components/EventDetail/EventDetailModal';
import { Footer } from './components/Footer/Footer';

export default function App() {
  // Primary States
  const [events] = useState<EventItem[]>(EVENTS_DATA);
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
  const [selectedZone, setSelectedZone] = useState<SeatZone | null>(SEAT_ZONES_PRESETS.default[1]); // Default to GA Floor
  const [ticketQuantity, setTicketQuantity] = useState<number>(2);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Modals State
  const [detailEvent, setDetailEvent] = useState<EventItem | null>(null);
  const [checkoutData, setCheckoutData] = useState<{ event: EventItem; group: SelectedTicketGroup } | null>(null);
  const [isMyTicketsOpen, setIsMyTicketsOpen] = useState(false);

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
      result.sort((a, b) => b.pricing.max_price - a.pricing.max_price);
    } else if (filters.sortBy === 'popularity') {
      result.sort((a, b) => (b.identity.is_selling_fast ? 1 : 0) - (a.identity.is_selling_fast ? 1 : 0));
    }

    return result;
  }, [events, filters]);

  // Handler for category selection from main nav
  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    setFilters(prev => ({ ...prev, category }));
    // Scroll smoothly to discovery grid if on home page
    if (!bookingEvent) {
      const el = document.getElementById('discovery-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handler for opening booking seating view
  const handleOpenBooking = (event: EventItem) => {
    setBookingEvent(event);
    setSelectedZone(SEAT_ZONES_PRESETS.default[1]);
    setSelectedSeats([]);
    setTicketQuantity(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler for individual seat dot toggle
  const handleToggleSeat = (seatId: string) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(s => s !== seatId);
      } else {
        if (prev.length >= ticketQuantity) {
          // Replace first selected seat or expand
          return [...prev.slice(1), seatId];
        }
        return [...prev, seatId];
      }
    });
  };

  // Handler for completing checkout
  const handleOrderComplete = (newTickets: PurchasedTicket[]) => {
    setPurchasedTickets(prev => [...newTickets, ...prev]);
    setCheckoutData(null);
    setBookingEvent(null);
    setIsMyTicketsOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6] text-[#121212] flex flex-col font-sans">
      
      {/* 1. TOP UTILITY BAR (#121212) */}
      <TopUtilityBar 
        purchasedTickets={purchasedTickets}
        onOpenMyTickets={() => setIsMyTicketsOpen(true)}
        onOpenHelp={() => alert('Ticketmaster 24/7 Fan Support: 1-800-653-8000')}
        onOpenSell={() => alert('Ticketmaster Verified Resale tool: List your tickets instantly at official prices.')}
      />

      {/* 2. PRIMARY STICKY MAIN HEADER (#024ddf) */}
      <MainNav 
        activeCategory={activeCategory}
        onSelectCategory={handleCategorySelect}
        onOpenMyTickets={() => setIsMyTicketsOpen(true)}
        purchasedCount={purchasedTickets.length}
      />

      {/* CONDITIONAL VIEW: INTERACTIVE SEATING EXPERIENCE vs DISCOVERY PORTAL */}
      {bookingEvent ? (
        /* ==================== INTERACTIVE SEATING & BOOKING VIEW ==================== */
        <main id="seating-experience-view" className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-6 w-full space-y-6">
          
          {/* Breadcrumb & Navigation Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
            <button
              id="back-to-discovery-btn"
              onClick={() => setBookingEvent(null)}
              className="flex items-center space-x-2 text-sm font-bold text-[#024ddf] hover:text-[#0139a7] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Events</span>
            </button>

            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>Home</span>
              <ChevronRight className="w-3 h-3" />
              <span>{bookingEvent.identity.category}</span>
              <ChevronRight className="w-3 h-3" />
              <span className="font-bold text-gray-800">{bookingEvent.identity.main_performer}</span>
            </div>
          </div>

          {/* Event Header Banner */}
          <div className="bg-[#121212] text-white p-6 rounded-2xl border border-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center space-x-4">
              <img 
                src={bookingEvent.identity.image_url} 
                alt={bookingEvent.identity.event_title}
                className="w-20 h-20 rounded-xl object-cover border border-white/20 shadow-md shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="bg-[#024ddf] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
                    {bookingEvent.identity.category}
                  </span>
                  <span className="text-xs text-gray-300 font-semibold">
                    {bookingEvent.identity.subcategory}
                  </span>
                </div>
                <h1 className="type-everest text-white font-black leading-tight">
                  {bookingEvent.identity.event_title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-300 mt-1">
                  <span className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 text-[#ffb932] mr-1" />
                    {bookingEvent.date_time.full_date_display}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 mr-1" />
                    {bookingEvent.location.venue_name} &bull; {bookingEvent.location.full_address}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setDetailEvent(bookingEvent)}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-xl border border-white/20 transition-colors shrink-0"
            >
              Tour & Venue Info
            </button>
          </div>

          {/* Interactive Seating Map & Ticket Selection Drawer Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Vector SVG Interactive Seating Chart (7 cols) */}
            <div className="lg:col-span-7">
              <InteractiveSeatMap 
                event={bookingEvent}
                selectedZone={selectedZone}
                onSelectZone={(zone) => setSelectedZone(zone)}
                selectedSeats={selectedSeats}
                onToggleSeat={handleToggleSeat}
                ticketQuantity={ticketQuantity}
              />
            </div>

            {/* Right: Itemized Ticket Selection & Fee Drawer (5 cols) */}
            <div className="lg:col-span-5 sticky top-20">
              <TicketDrawer 
                event={bookingEvent}
                selectedZone={selectedZone}
                quantity={ticketQuantity}
                onQuantityChange={(qty) => setTicketQuantity(qty)}
                selectedSeats={selectedSeats}
                onProceedToCheckout={(group) => setCheckoutData({ event: bookingEvent, group })}
              />
            </div>

          </div>

        </main>
      ) : (
        /* ==================== HOME / DISCOVERY EXPERIENCE ==================== */
        <main id="discovery-experience-view" className="flex-1 w-full pb-16">
          
          {/* 3. HERO SPOTLIGHT BILLBOARD (16:9 / 21:9 ratio) */}
          <HeroBillboard 
            featuredEvents={featuredEvents}
            onSelectEvent={handleOpenBooking}
            onViewDetails={(evt) => setDetailEvent(evt)}
          />

          {/* 4. INTEGRATED 3-INPUT OMNIBOX SEARCH WIDGET */}
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
              onExecuteSearch={() => {
                const el = document.getElementById('discovery-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>

          {/* 5. CATEGORY HORIZONTAL SNAP CAROUSELS */}
          <div className="space-y-2">
            {/* Carousel 1: Popular Concert Tours */}
            <EventCarousel 
              title="Hot & Trending Concert Tours"
              subtitle="The biggest arena and stadium spectacles happening nationwide"
              badgeText="HIGH DEMAND"
              events={events.filter(e => e.identity.category === 'Concerts')}
              onSelectEvent={handleOpenBooking}
              onViewDetails={(evt) => setDetailEvent(evt)}
              onViewAll={() => handleCategorySelect('Concerts')}
            />

            {/* Carousel 2: Marquee Sports Showcases */}
            <EventCarousel 
              title="Live Sports & Championships"
              subtitle="NBA basketball clashes, NHL rivalries, and WWE spectacles"
              badgeText="OFFICIAL TICKETS"
              events={events.filter(e => e.identity.category === 'Sports')}
              onSelectEvent={handleOpenBooking}
              onViewDetails={(evt) => setDetailEvent(evt)}
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
              onViewAll={() => handleCategorySelect('Arts & Theater')}
            />
          </div>

          {/* 6. DISCOVERY GRID & FILTER SIDEBAR SECTION */}
          <section id="discovery-section" className="pt-10 max-w-7xl mx-auto px-4 md:px-8">
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
              
              {/* Left: Filter Sidebar (4 cols) */}
              <div className="lg:col-span-4 sticky top-20">
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
                  layout={layoutMode}
                  onToggleLayout={(l) => setLayoutMode(l)}
                />
              </div>

            </div>
          </section>

        </main>
      )}

      {/* 7. CHECKOUT MODAL */}
      {checkoutData && (
        <CheckoutModal 
          event={checkoutData.event}
          ticketGroup={checkoutData.group}
          onClose={() => setCheckoutData(null)}
          onOrderComplete={handleOrderComplete}
        />
      )}

      {/* 8. MY TICKETS SAFETIX MODAL */}
      {isMyTicketsOpen && (
        <MyTicketsModal 
          tickets={purchasedTickets}
          onClose={() => setIsMyTicketsOpen(false)}
        />
      )}

      {/* 9. EVENT DETAIL MODAL */}
      {detailEvent && (
        <EventDetailModal 
          event={detailEvent}
          onClose={() => setDetailEvent(null)}
          onSelectEventForBooking={handleOpenBooking}
        />
      )}

      {/* 10. COMPREHENSIVE DARK FOOTER (#121212) */}
      <Footer />

    </div>
  );
}
