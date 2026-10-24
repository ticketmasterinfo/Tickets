import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  Info, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Check, 
  SlidersHorizontal, 
  X, 
  Ticket, 
  ExternalLink, 
  ChevronRight,
  Filter,
  DollarSign
} from 'lucide-react';
import { EventItem, SeatZone, SeatUnit, SelectedTicketGroup } from '../../types';
import { getEventSeatZones } from '../../data/eventsData';
import { TicketmasterLogo } from '../Common/TicketmasterLogo';

interface TicketmasterEventExperienceProps {
  event: EventItem;
  onBack: () => void;
  onProceedToCheckout: (ticketGroup: SelectedTicketGroup) => void;
  currentUser?: { name: string; email: string } | null;
}

export const TicketmasterEventExperience: React.FC<TicketmasterEventExperienceProps> = ({
  event,
  onBack,
  onProceedToCheckout
}) => {
  // Available seat zones for this event
  const zones = useMemo(() => getEventSeatZones(event), [event]);

  // View mode for mobile/desktop: 'split' on desktop, 'map' | 'list' on mobile
  const [mobileViewTab, setMobileViewTab] = useState<'map' | 'list'>('map');

  // Interactive Map State
  const [selectedZone, setSelectedZone] = useState<SeatZone>(zones[1] || zones[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredZone, setHoveredZone] = useState<SeatZone | null>(null);
  const [isSectionDetailedView, setIsSectionDetailedView] = useState<boolean>(false);
  const [hoveredSeat, setHoveredSeat] = useState<SeatUnit | null>(null);

  // Filters State
  const [ticketQuantity, setTicketQuantity] = useState<number>(2);
  const [ticketTypeFilter, setTicketTypeFilter] = useState<'all' | 'standard' | 'resale' | 'vip' | 'pit'>('all');
  const [sortBy, setSortBy] = useState<'lowest_price' | 'best_seats'>('lowest_price');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(event.pricing.max_price);
  const [showEventInfoModal, setShowEventInfoModal] = useState<boolean>(false);
  const [showFeeBreakdown, setShowFeeBreakdown] = useState<boolean>(false);

  // Selected individual seat IDs
  const [selectedSeats, setSelectedSeats] = useState<string[]>([
    `${zones[1]?.code || 'SEC-102'}-B14`,
    `${zones[1]?.code || 'SEC-102'}-B15`
  ]);

  const category = event.identity.category;

  // Generate dynamic seat grid for selected section
  const sectionSeats = useMemo((): SeatUnit[] => {
    if (!selectedZone) return [];
    const seats: SeatUnit[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const seatsPerRow = 12;

    rows.forEach((row, rIdx) => {
      for (let s = 1; s <= seatsPerRow; s++) {
        const id = `${selectedZone.code}-${row}${s}`;
        // Deterministic availability pattern based on index
        const isSold = (rIdx * 12 + s) % 5 === 1 || (rIdx === 0 && s > 9);
        const isResale = (rIdx * 12 + s) % 7 === 3;
        const isVip = selectedZone.tier === 'VIP' || (rIdx === 0 && s <= 4);
        const isSelected = selectedSeats.includes(id);

        seats.push({
          id,
          zoneId: selectedZone.id,
          section: selectedZone.code,
          row,
          number: s,
          status: isSelected ? 'selected' : isSold ? 'reserved' : 'available',
          price: isResale ? Math.round(selectedZone.price * 1.15) : isVip ? Math.round(selectedZone.price * 1.35) : selectedZone.price,
          x: 40 + s * 38,
          y: 70 + rIdx * 36
        });
      }
    });

    return seats;
  }, [selectedZone, selectedSeats]);

  // Handle Clicking a Seat in Detailed View
  const handleToggleSeat = (seat: SeatUnit) => {
    if (seat.status === 'reserved') return;

    setSelectedSeats(prev => {
      if (prev.includes(seat.id)) {
        const next = prev.filter(s => s !== seat.id);
        if (next.length > 0) setTicketQuantity(next.length);
        return next;
      } else {
        if (prev.length >= ticketQuantity) {
          // Replace oldest selection
          return [...prev.slice(1), seat.id];
        } else {
          return [...prev, seat.id];
        }
      }
    });
  };

  // Select PIT Area directly
  const handleSelectPit = () => {
    const pitZone = zones.find(z => z.tier === 'Floor') || zones[1] || zones[0];
    setSelectedZone(pitZone);
    setIsSectionDetailedView(false);
    setSelectedSeats(Array.from({ length: ticketQuantity }, (_, i) => `PIT-GA-STAND-${i + 1}`));
  };

  // Generate available ticket inventory options for the sidebar
  const ticketOptions = useMemo(() => {
    const list: Array<{
      id: string;
      zone: SeatZone;
      section: string;
      row: string;
      seatNumbers: string;
      pricePerTicket: number;
      type: 'Standard Ticket' | 'Verified Resale Ticket' | 'VIP Package' | 'General Admission';
      badgeColor: string;
      viewNote: string;
    }> = [];

    zones.forEach((zone) => {
      const isFloor = zone.tier === 'Floor';
      const isVip = zone.tier === 'VIP';

      if (isFloor) {
        list.push({
          id: `opt-${zone.id}-ga`,
          zone,
          section: zone.code,
          row: 'GA',
          seatNumbers: 'Standing Room Only',
          pricePerTicket: zone.price,
          type: 'General Admission',
          badgeColor: 'bg-emerald-950 text-emerald-400 border-emerald-800/40',
          viewNote: 'Stage-side general admission access • Directly in front of performers'
        });
      }

      if (isVip) {
        list.push({
          id: `opt-${zone.id}-vip`,
          zone,
          section: zone.code,
          row: 'Row A',
          seatNumbers: `Seats 1-${ticketQuantity}`,
          pricePerTicket: zone.price,
          type: 'VIP Package',
          badgeColor: 'bg-amber-950 text-amber-400 border-amber-800/40',
          viewNote: 'VIP Diamond Club Entry • Dedicated lounge voucher & exclusive gift'
        });
      }

      // Standard Rows
      ['Row B', 'Row C', 'Row E'].forEach((row, rIdx) => {
        const isResale = rIdx === 1;
        const price = isResale ? Math.round(zone.price * 1.12) : zone.price;
        list.push({
          id: `opt-${zone.id}-${row}`,
          zone,
          section: zone.code,
          row,
          seatNumbers: `Seats ${10 + rIdx * 2}-${10 + rIdx * 2 + ticketQuantity - 1}`,
          pricePerTicket: price,
          type: isResale ? 'Verified Resale Ticket' : 'Standard Ticket',
          badgeColor: isResale 
            ? 'bg-rose-950 text-rose-300 border-rose-800/40' 
            : 'bg-blue-950 text-blue-400 border-blue-800/40',
          viewNote: zone.description
        });
      });
    });

    // Apply Filter
    const filtered = list.filter(item => {
      if (item.pricePerTicket > maxPriceFilter) return false;
      if (ticketTypeFilter === 'standard' && item.type !== 'Standard Ticket') return false;
      if (ticketTypeFilter === 'resale' && item.type !== 'Verified Resale Ticket') return false;
      if (ticketTypeFilter === 'vip' && item.type !== 'VIP Package') return false;
      if (ticketTypeFilter === 'pit' && item.type !== 'General Admission') return false;
      return true;
    });

    // Sort
    if (sortBy === 'lowest_price') {
      filtered.sort((a, b) => a.pricePerTicket - b.pricePerTicket);
    } else {
      filtered.sort((a, b) => b.pricePerTicket - a.pricePerTicket);
    }

    return filtered;
  }, [zones, ticketQuantity, maxPriceFilter, ticketTypeFilter, sortBy]);

  // Select a ticket card option
  const handleSelectTicketOption = (option: typeof ticketOptions[0]) => {
    setSelectedZone(option.zone);
    if (option.type === 'General Admission') {
      setIsSectionDetailedView(false);
      setSelectedSeats(Array.from({ length: ticketQuantity }, (_, i) => `PIT-GA-STAND-${i + 1}`));
    } else {
      setIsSectionDetailedView(true);
      setZoomLevel(1.3);
      const newSeats: string[] = [];
      for (let i = 0; i < ticketQuantity; i++) {
        newSeats.push(`${option.section}-${option.row.replace('Row ', '')}${14 + i}`);
      }
      setSelectedSeats(newSeats);
    }
  };

  // Price calculations
  const unitPrice = selectedZone ? selectedZone.price : event.pricing.min_price;
  const subtotalBase = unitPrice * ticketQuantity;
  const serviceFeePerTicket = Math.round(unitPrice * 0.14 * 100) / 100;
  const totalServiceFees = serviceFeePerTicket * ticketQuantity;
  const facilityChargePerTicket = 4.50;
  const totalFacilityCharges = facilityChargePerTicket * ticketQuantity;
  const orderProcessingFee = 4.00;
  const grandTotal = subtotalBase + totalServiceFees + totalFacilityCharges + orderProcessingFee;

  // Checkout submission
  const handleCheckout = () => {
    const isPitSelected = selectedSeats.some(s => s.includes('PIT') || s.includes('STAND'));
    const group: SelectedTicketGroup = {
      zoneId: selectedZone ? selectedZone.id : 'standard-zone',
      zoneName: selectedZone ? selectedZone.name : 'Standard Seating',
      section: selectedZone ? selectedZone.code : 'SEC-102',
      row: isPitSelected ? 'GA' : (selectedSeats[0]?.split('-')[1]?.charAt(0) || 'B'),
      quantity: ticketQuantity,
      unitPrice,
      serviceFee: totalServiceFees,
      facilityFee: totalFacilityCharges,
      processingFee: orderProcessingFee,
      selectedSeats: selectedSeats.length ? selectedSeats : [`Sec ${selectedZone?.code || '102'} Row B Seats 14-${14 + ticketQuantity - 1}`]
    };
    onProceedToCheckout(group);
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white flex flex-col font-averta select-none">
      
      {/* =========================================================================
          1. TOP NAVIGATION & EVENT HEADER (Ticketmaster Official Style)
         ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#141416]/95 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back button & Event Summary */}
          <div className="flex items-center gap-3 md:gap-4 min-w-0">
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition cursor-pointer shrink-0"
              title="Back to All Events"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#026cdf] bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/40">
                  {event.identity.category}
                </span>
                <span className="text-xs text-white/50 hidden sm:inline truncate">
                  {event.location.venue_name}
                </span>
              </div>
              <h1 className="text-sm md:text-base font-extrabold text-white truncate tracking-tight mt-0.5">
                {event.identity.event_title}
              </h1>
              <p className="text-xs text-white/60 truncate flex items-center gap-2">
                <span>{event.date_time.full_date_display}</span>
                <span className="text-white/30">•</span>
                <span>{event.location.city}, {event.location.state}</span>
              </p>
            </div>
          </div>

          {/* Event Info & SafeTix Badge */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowEventInfoModal(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/80 hover:text-white border border-white/10 transition cursor-pointer"
            >
              <Info className="w-4 h-4 text-[#026cdf]" />
              <span>Event Info</span>
            </button>

            {event.identity.event_url && (
              <a
                href={event.identity.event_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/70 hover:text-white border border-white/10 transition"
                title="View original event listing on Ticketmaster.com"
              >
                <span>ticketmaster.com</span>
                <ExternalLink className="w-3 h-3 text-[#026cdf]" />
              </a>
            )}

            <div className="flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">SafeTix™ Verified</span>
            </div>
          </div>
        </div>

        {/* Quick Filter Bar (Quantity, Price, Types) */}
        <div className="max-w-7xl mx-auto pt-2.5 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar border-t border-white/5 mt-2">
          
          {/* Quantity Selector Pills */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs font-bold text-white/50 mr-1">Qty:</span>
            {[1, 2, 3, 4, 6, 8].map(qty => (
              <button
                key={qty}
                onClick={() => {
                  setTicketQuantity(qty);
                  if (selectedZone) {
                    const rowLetter = selectedZone.code.charAt(0) || 'B';
                    const newSeats = Array.from({ length: qty }, (_, i) => `${selectedZone.code}-${rowLetter}${14 + i}`);
                    setSelectedSeats(newSeats);
                  }
                }}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                  ticketQuantity === qty
                    ? 'bg-[#026cdf] text-white shadow-md'
                    : 'bg-[#1c1c20] text-white/70 hover:bg-white/10 border border-white/10'
                }`}
              >
                {qty}
              </button>
            ))}
          </div>

          {/* Ticket Type Filter Pills */}
          <div className="flex items-center gap-1.5 shrink-0">
            {[
              { id: 'all', label: 'All Tickets' },
              { id: 'standard', label: 'Standard' },
              { id: 'pit', label: 'Floor / PIT' },
              { id: 'vip', label: 'VIP Packages' },
              { id: 'resale', label: 'Resale' }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setTicketTypeFilter(type.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  ticketTypeFilter === type.id
                    ? 'bg-white text-black font-bold'
                    : 'bg-[#1c1c20] text-white/70 hover:text-white border border-white/10'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Mobile View Switcher (Map vs List) */}
          <div className="flex md:hidden items-center bg-[#1c1c20] p-0.5 rounded-xl border border-white/10 shrink-0">
            <button
              onClick={() => setMobileViewTab('map')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                mobileViewTab === 'map' ? 'bg-[#026cdf] text-white' : 'text-white/60'
              }`}
            >
              Map
            </button>
            <button
              onClick={() => setMobileViewTab('list')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                mobileViewTab === 'list' ? 'bg-[#026cdf] text-white' : 'text-white/60'
              }`}
            >
              Tickets ({ticketOptions.length})
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. MAIN SEATING & TICKET SELECTION WORKSPACE
         ========================================================================= */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ==================== LEFT / MAIN COLUMN: INTERACTIVE MAP ==================== */}
        <div className={`lg:col-span-8 flex flex-col space-y-4 ${
          mobileViewTab === 'list' ? 'hidden lg:flex' : 'flex'
        }`}>
          
          {/* Venue Interactive Map Container */}
          <div className="relative bg-[#161619] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 min-h-[520px] flex flex-col justify-between">
            
            {/* Map Header Overlay */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 z-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {event.location.venue_name}
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                  {isSectionDetailedView && selectedZone 
                    ? `${selectedZone.name} (${selectedZone.code}) • Row View` 
                    : 'Select a Section or PIT Area'}
                </h2>
              </div>

              {/* Zoom & View Controls */}
              <div className="flex items-center gap-2">
                {isSectionDetailedView && (
                  <button
                    onClick={() => {
                      setIsSectionDetailedView(false);
                      setZoomLevel(1);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Venue Overview</span>
                  </button>
                )}

                <div className="flex items-center bg-[#222226] rounded-xl p-1 border border-white/10">
                  <button
                    onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.0))}
                    className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
                    className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setZoomLevel(1);
                      setIsSectionDetailedView(false);
                    }}
                    className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
                    title="Reset View"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* SVG Venue Map Canvas */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center overflow-hidden py-4">
              <div 
                className="w-full h-full transition-transform duration-300 ease-out origin-center flex items-center justify-center"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {!isSectionDetailedView ? (
                  /* ----------------- FULL VENUE MAP VIEW (ADAPTIVE BY CATEGORY) ----------------- */
                  <svg 
                    viewBox="0 0 600 520" 
                    className="w-full h-full max-h-[480px] drop-shadow-2xl select-none"
                  >
                    <defs>
                      <linearGradient id="stageGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#026cdf" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#002b66" stopOpacity="0.95" />
                      </linearGradient>
                      <linearGradient id="catwalkGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#026cdf" stopOpacity="0.9" />
                      </linearGradient>
                      <linearGradient id="pitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.30" />
                        <stop offset="100%" stopColor="#059669" stopOpacity="0.55" />
                      </linearGradient>
                      <linearGradient id="courtWood" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#d97706" stopOpacity="0.75" />
                        <stop offset="100%" stopColor="#b45309" stopOpacity="0.85" />
                      </linearGradient>
                      <linearGradient id="theatreCurtain" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#be123c" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#881337" stopOpacity="0.95" />
                      </linearGradient>
                    </defs>

                    {/* ================= CASE 1: CONCERT STADIUM / ARENA ================= */}
                    {category === 'Concerts' && (
                      <g id="concert-stadium-layout">
                        {/* 1. Main Stage Structure */}
                        <g transform="translate(160, 20)">
                          <rect 
                            x="0" 
                            y="0" 
                            width="280" 
                            height="55" 
                            rx="14" 
                            fill="url(#stageGlow)" 
                            stroke="#60a5fa" 
                            strokeWidth="2.5"
                          />
                          {/* LED Backdrop & Light Rig */}
                          <rect x="25" y="8" width="230" height="8" rx="3" fill="#93c5fd" opacity="0.8" />
                          <text 
                            x="140" 
                            y="38" 
                            textAnchor="middle" 
                            fill="#ffffff" 
                            fontSize="14" 
                            fontWeight="900" 
                            letterSpacing="4"
                          >
                            ★ MAIN STAGE ★
                          </text>
                        </g>

                        {/* Catwalk / Runway extending to Center B-Stage */}
                        <g transform="translate(285, 75)">
                          <rect x="0" y="0" width="30" height="90" fill="url(#catwalkGlow)" stroke="#93c5fd" strokeWidth="1.5" />
                          {/* Diamond B-Stage */}
                          <polygon points="15,80 45,105 15,130 -15,105" fill="url(#stageGlow)" stroke="#60a5fa" strokeWidth="2" />
                          <circle cx="15" cy="105" r="7" fill="#ffffff" />
                        </g>

                        {/* LEFT PIT - GENERAL ADMISSION */}
                        <g 
                          onClick={handleSelectPit}
                          onMouseEnter={() => setHoveredZone(zones.find(z => z.tier === 'Floor') || zones[1])}
                          onMouseLeave={() => setHoveredZone(null)}
                          className="cursor-pointer transition-transform hover:scale-[1.01]"
                        >
                          <rect 
                            x="160" 
                            y="85" 
                            width="115" 
                            height="85" 
                            rx="10" 
                            fill="url(#pitGradient)" 
                            stroke="#34d399" 
                            strokeWidth="2"
                            strokeDasharray="4 2"
                          />
                          <text x="217" y="122" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="800">
                            LEFT GA PIT
                          </text>
                          <text x="217" y="140" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="600">
                            From ${zones.find(z => z.tier === 'Floor')?.price || event.pricing.min_price}
                          </text>
                        </g>

                        {/* RIGHT PIT - GENERAL ADMISSION */}
                        <g 
                          onClick={handleSelectPit}
                          onMouseEnter={() => setHoveredZone(zones.find(z => z.tier === 'Floor') || zones[1])}
                          onMouseLeave={() => setHoveredZone(null)}
                          className="cursor-pointer transition-transform hover:scale-[1.01]"
                        >
                          <rect 
                            x="325" 
                            y="85" 
                            width="115" 
                            height="85" 
                            rx="10" 
                            fill="url(#pitGradient)" 
                            stroke="#34d399" 
                            strokeWidth="2"
                            strokeDasharray="4 2"
                          />
                          <text x="382" y="122" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="800">
                            RIGHT GA PIT
                          </text>
                          <text x="382" y="140" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="600">
                            From ${zones.find(z => z.tier === 'Floor')?.price || event.pricing.min_price}
                          </text>
                        </g>

                        {/* Sound Mixing Console */}
                        <g transform="translate(260, 310)">
                          <rect x="0" y="0" width="80" height="24" rx="4" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
                          <text x="40" y="16" textAnchor="middle" fill="#71717a" fontSize="9" fontWeight="700">
                            MIX / SOUND
                          </text>
                        </g>
                      </g>
                    )}

                    {/* ================= CASE 2: SPORTS ARENA / BASKETBALL COURT ================= */}
                    {category === 'Sports' && (
                      <g id="sports-arena-layout">
                        {/* Center Basketball Hardwood Court */}
                        <g transform="translate(190, 60)">
                          <rect x="0" y="0" width="220" height="130" rx="8" fill="url(#courtWood)" stroke="#fef08a" strokeWidth="2.5" />
                          {/* Court Markings */}
                          <line x1="110" y1="0" x2="110" y2="130" stroke="#ffffff" strokeWidth="1.5" />
                          <circle cx="110" cy="65" r="24" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                          {/* 3 Point Arcs */}
                          <path d="M 0 25 A 45 45 0 0 1 0 105" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                          <path d="M 220 25 A 45 45 0 0 0 220 105" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                          {/* Center Court Logo */}
                          <text x="110" y="69" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">
                            COURT
                          </text>
                        </g>

                        {/* Courtside VIP Front Row Left & Right */}
                        <g 
                          onClick={() => {
                            const vipZone = zones.find(z => z.tier === 'VIP') || zones[0];
                            setSelectedZone(vipZone);
                            setIsSectionDetailedView(true);
                            setZoomLevel(1.3);
                          }}
                          className="cursor-pointer"
                        >
                          <rect x="180" y="40" width="240" height="15" rx="3" fill="#ffb932" opacity="0.85" />
                          <text x="300" y="52" textAnchor="middle" fill="#000000" fontSize="9" fontWeight="900">
                            COURTSIDE VIP (ROW 1)
                          </text>
                        </g>
                      </g>
                    )}

                    {/* ================= CASE 3: ARTS & THEATRE / BROADWAY ================= */}
                    {category === 'Arts & Theater' && (
                      <g id="theatre-layout">
                        {/* Proscenium Stage with Red Velvet Curtains */}
                        <g transform="translate(160, 20)">
                          <path d="M 0 60 Q 140 30 280 60 L 280 10 L 0 10 Z" fill="url(#theatreCurtain)" stroke="#fda4af" strokeWidth="2" />
                          <text x="140" y="38" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900">
                            ★ PROSCENIUM STAGE ★
                          </text>
                          {/* Orchestra Pit */}
                          <path d="M 40 62 Q 140 78 240 62" fill="none" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="3 3" />
                          <text x="140" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="700">
                            ORCHESTRA PIT
                          </text>
                        </g>
                      </g>
                    )}

                    {/* ================= UNIVERSAL SEAT ZONES & SECTIONS ================= */}
                    {zones.map((zone) => {
                      if (zone.tier === 'Floor' && category === 'Concerts') return null; // Rendered in GA PIT
                      const isSelected = selectedZone?.id === zone.id;
                      const isHovered = hoveredZone?.id === zone.id;

                      let dPath = '';
                      let textX = zone.centerPos.x;
                      let textY = zone.centerPos.y;

                      if (zone.tier === 'VIP') {
                        dPath = 'M 140 185 L 460 185 L 440 225 L 160 225 Z';
                        textX = 300;
                        textY = 210;
                      } else if (zone.code.includes('102') || zone.code.includes('CTR') || zone.code.includes('101')) {
                        dPath = 'M 200 238 L 400 238 L 390 298 L 210 298 Z';
                        textX = 300;
                        textY = 272;
                      } else if (zone.code.includes('104') || zone.centerPos.x < 250) {
                        dPath = 'M 110 238 L 185 238 L 195 298 L 100 298 Z';
                        textX = 145;
                        textY = 272;
                      } else if (zone.code.includes('106') || zone.centerPos.x > 350) {
                        dPath = 'M 415 238 L 490 238 L 500 298 L 405 298 Z';
                        textX = 455;
                        textY = 272;
                      } else if (zone.tier === 'Lower') {
                        dPath = 'M 85 315 L 515 315 L 490 378 L 110 378 Z';
                        textX = 300;
                        textY = 352;
                      } else {
                        // Upper Balcony / 300 Level
                        dPath = 'M 65 390 L 535 390 L 505 460 L 95 460 Z';
                        textX = 300;
                        textY = 430;
                      }

                      return (
                        <g 
                          key={zone.id}
                          onClick={() => {
                            setSelectedZone(zone);
                            setIsSectionDetailedView(true);
                            setZoomLevel(1.3);
                          }}
                          onMouseEnter={() => setHoveredZone(zone)}
                          onMouseLeave={() => setHoveredZone(null)}
                          className="cursor-pointer transition-all duration-150"
                        >
                          <path 
                            d={dPath}
                            fill={isSelected ? '#026cdf' : isHovered ? zone.hoverColor : zone.color}
                            stroke={isSelected ? '#ffffff' : '#141416'}
                            strokeWidth={isSelected ? '3' : '1.5'}
                            fillOpacity={isSelected ? 0.95 : 0.82}
                          />
                          <text 
                            x={textX} 
                            y={textY - 4} 
                            textAnchor="middle" 
                            fill="#ffffff" 
                            fontSize="11" 
                            fontWeight="800"
                          >
                            {zone.code}
                          </text>
                          <text 
                            x={textX} 
                            y={textY + 11} 
                            textAnchor="middle" 
                            fill="#ffffff" 
                            fontSize="10" 
                            fontWeight="600" 
                            opacity="0.9"
                          >
                            ${zone.price}
                          </text>
                        </g>
                      );
                    })}

                  </svg>
                ) : (
                  /* ----------------- SECTION ZOOMED SEAT GRID VIEW ----------------- */
                  <div className="w-full flex flex-col items-center">
                    <div className="w-full max-w-lg bg-[#111113] p-4 sm:p-6 rounded-2xl border border-white/10 shadow-inner">
                      
                      {/* Section Stage Direction Indicator */}
                      <div className="w-full py-1.5 mb-4 bg-gradient-to-r from-blue-900/40 via-blue-500/30 to-blue-900/40 border border-blue-500/30 rounded-lg text-center text-[10px] font-black uppercase tracking-wider text-blue-300">
                        ▲ STAGE THIS DIRECTION ▲
                      </div>

                      {/* Seat Circles Matrix */}
                      <div className="space-y-2.5 overflow-x-auto pb-2">
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(row => (
                          <div key={row} className="flex items-center gap-2">
                            <span className="w-5 text-xs font-bold text-white/50 text-right shrink-0">
                              {row}
                            </span>
                            <div className="flex gap-1.5 sm:gap-2">
                              {sectionSeats
                                .filter(s => s.row === row)
                                .map(seat => {
                                  const isSelected = selectedSeats.includes(seat.id);
                                  const isReserved = seat.status === 'reserved';

                                  return (
                                    <button
                                      key={seat.id}
                                      onClick={() => handleToggleSeat(seat)}
                                      onMouseEnter={() => setHoveredSeat(seat)}
                                      onMouseLeave={() => setHoveredSeat(null)}
                                      disabled={isReserved}
                                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-[10px] font-bold flex items-center justify-center transition-transform active:scale-90 cursor-pointer ${
                                        isSelected
                                          ? 'bg-[#00875a] text-white shadow-lg ring-2 ring-white ring-offset-2 ring-offset-black scale-105'
                                          : isReserved
                                          ? 'bg-white/10 text-white/20 cursor-not-allowed'
                                          : 'bg-[#026cdf] hover:bg-[#0056e0] text-white shadow-sm'
                                      }`}
                                      title={`${selectedZone.code} • Row ${seat.row} • Seat ${seat.number} - $${seat.price}`}
                                    >
                                      {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : seat.number}
                                    </button>
                                  );
                                })}
                            </div>
                            <span className="w-5 text-xs font-bold text-white/50 text-left shrink-0">
                              {row}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Hovered Seat Tooltip */}
                      {hoveredSeat && (
                        <div className="mt-4 p-2.5 bg-[#1c1c20] rounded-xl border border-white/10 text-xs flex items-center justify-between">
                          <span className="font-bold text-white">
                            {hoveredSeat.section} • Row {hoveredSeat.row} • Seat {hoveredSeat.number}
                          </span>
                          <span className="text-[#026cdf] font-black text-sm">
                            ${hoveredSeat.price} ea
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Map Legend */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-white/70">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#026cdf]" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#00875a] flex items-center justify-center text-white">
                    <Check className="w-2 h-2" />
                  </span>
                  <span>Selected ({selectedSeats.length})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-white/20" />
                  <span>Unavailable</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ffb932]" />
                  <span>VIP Lounge</span>
                </div>
              </div>

              <span className="text-[11px] text-white/40">
                Ticketmaster SafeTix™ Encrypted
              </span>
            </div>
          </div>
        </div>

        {/* ==================== RIGHT / SIDEBAR COLUMN: TICKET OPTIONS FEED ==================== */}
        <div className={`lg:col-span-4 flex flex-col space-y-4 ${
          mobileViewTab === 'map' ? 'hidden lg:flex' : 'flex'
        }`}>
          
          {/* Ticket Feed Header */}
          <div className="bg-[#161619] border border-white/10 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-white">
                  Available Tickets ({ticketOptions.length})
                </h3>
                <p className="text-xs text-white/50">
                  {ticketQuantity} Ticket{ticketQuantity > 1 ? 's' : ''} • Real-time inventory
                </p>
              </div>

              <div className="flex items-center bg-[#222226] rounded-xl p-0.5 border border-white/10">
                <button
                  onClick={() => setSortBy('lowest_price')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                    sortBy === 'lowest_price' ? 'bg-[#026cdf] text-white' : 'text-white/60'
                  }`}
                >
                  Lowest Price
                </button>
                <button
                  onClick={() => setSortBy('best_seats')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                    sortBy === 'best_seats' ? 'bg-[#026cdf] text-white' : 'text-white/60'
                  }`}
                >
                  Best Seats
                </button>
              </div>
            </div>

            {/* Ticket Options Scrollable Cards */}
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {ticketOptions.map((opt) => {
                const isSelected = selectedZone?.id === opt.zone.id;

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectTicketOption(opt)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1e1e24] border-[#026cdf] shadow-lg ring-1 ring-[#026cdf]'
                        : 'bg-[#18181c] border-white/5 hover:border-white/20 hover:bg-[#1c1c20]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${opt.badgeColor}`}>
                          {opt.type}
                        </span>
                        <h4 className="text-sm font-bold text-white mt-1.5">
                          {opt.section} • {opt.row}
                        </h4>
                        <p className="text-xs text-white/50">
                          {opt.seatNumbers}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-base font-extrabold text-white block">
                          ${opt.pricePerTicket}
                        </span>
                        <span className="text-[10px] text-white/40">
                          ea + fees
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-white/60 line-clamp-1 mt-2 pt-2 border-t border-white/5">
                      {opt.viewNote}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. STICKY ORDER SUMMARY & PROCEED TO CHECKOUT ACTION BAR
         ========================================================================= */}
      <div className="sticky bottom-0 z-30 bg-[#141416]/95 backdrop-blur-md border-t border-white/10 px-4 md:px-8 py-3.5 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left: Selected Tickets Summary */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#026cdf]/20 border border-[#026cdf]/40 flex items-center justify-center text-[#026cdf] shrink-0">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  {ticketQuantity}x {selectedZone?.name || 'Standard Entry'}
                </span>
                <span className="text-xs text-[#026cdf] font-semibold bg-blue-950/80 px-2 py-0.5 rounded">
                  {selectedZone?.code}
                </span>
              </div>
              <p className="text-xs text-white/50">
                {selectedSeats.length ? selectedSeats.join(', ') : 'Best Available Consecutive Seats'}
              </p>
            </div>
          </div>

          {/* Right: Transparent Price Total & Checkout Button */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-right">
              <div className="flex items-baseline gap-1.5 justify-end">
                <span className="text-xs text-white/50">Total</span>
                <span className="text-xl font-extrabold text-white">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowFeeBreakdown(!showFeeBreakdown)}
                className="text-[11px] text-[#026cdf] hover:underline cursor-pointer"
              >
                {showFeeBreakdown ? 'Hide Fee Breakdown' : 'All-In Fee Breakdown'}
              </button>
            </div>

            <button
              onClick={handleCheckout}
              className="bg-[#026cdf] hover:bg-[#0056e0] active:scale-95 text-white font-extrabold text-sm px-7 py-3 rounded-xl shadow-lg flex items-center gap-2 transition cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Collapsible Fee Breakdown Card */}
        {showFeeBreakdown && (
          <div className="max-w-7xl mx-auto mt-3 p-4 bg-[#1c1c20] rounded-xl border border-white/10 text-xs text-white/70 space-y-1.5 animate-in slide-in-from-bottom-2 duration-150">
            <div className="flex justify-between font-semibold text-white">
              <span>{ticketQuantity}x Tickets (${unitPrice.toFixed(2)} ea)</span>
              <span>${subtotalBase.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Fee (${serviceFeePerTicket.toFixed(2)} x {ticketQuantity})</span>
              <span>${totalServiceFees.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Facility Charge (${facilityChargePerTicket.toFixed(2)} x {ticketQuantity})</span>
              <span>${totalFacilityCharges.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Order Processing Fee</span>
              <span>${orderProcessingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-white/10 font-bold text-white text-sm">
              <span>Grand Total</span>
              <span className="text-emerald-400">${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          4. EVENT INFO & VENUE POLICIES MODAL
         ========================================================================= */}
      {showEventInfoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161619] border border-white/10 rounded-2xl max-w-lg w-full p-6 text-white space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">
                Event & Venue Information
              </h3>
              <button
                onClick={() => setShowEventInfoModal(false)}
                className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-white/80 leading-relaxed">
              <div>
                <p className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">
                  About {event.identity.event_title}
                </p>
                <p>{event.description.full_description}</p>
              </div>

              <div>
                <p className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">
                  Special Venue Notices
                </p>
                <p>{event.description.special_notices}</p>
              </div>

              <div>
                <p className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">
                  Venue & Parking
                </p>
                <p>{event.location.full_address}</p>
                <p className="mt-1 text-white/60">{event.location.parking_info}</p>
              </div>

              <div>
                <p className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">
                  SafeTix™ Mobile Entry
                </p>
                <p>{event.description.entry_requirements}</p>
              </div>
            </div>

            <button
              onClick={() => setShowEventInfoModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#026cdf] hover:bg-[#0056e0] text-white font-bold text-xs transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
