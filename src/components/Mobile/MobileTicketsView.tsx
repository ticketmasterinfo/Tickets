import React, { useState } from 'react';
import { 
  QrCode, 
  Share2, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  Download, 
  ExternalLink,
  Plus
} from 'lucide-react';
import { PurchasedTicket, EventItem } from '../../types';
import { showAppNotification } from '../../utils/notification';

interface MobileTicketsViewProps {
  tickets: PurchasedTicket[];
  currentUser: { name: string; email: string } | null;
  onOpenSignIn: () => void;
  onOpenTicketPass: (ticket: PurchasedTicket) => void;
  onSelectEventForBooking: (event: EventItem) => void;
}

export const MobileTicketsView: React.FC<MobileTicketsViewProps> = ({
  tickets,
  currentUser,
  onOpenSignIn,
  onOpenTicketPass,
  onSelectEventForBooking
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  return (
    <div className="w-full min-h-[85vh] pb-28 bg-[#121212] text-white select-none flex flex-col">
      {/* Top Header matching IMG_6275 */}
      <div className="pt-4 px-5 pb-3 flex items-center justify-between border-b border-white/5 bg-[#121212]">
        <div className="flex items-center gap-2">
          <h1 className="text-base font-bold tracking-tight text-white">My Events</h1>
          {/* US Flag Circle Badge */}
          <span className="text-base" role="img" aria-label="United States">🇺🇸</span>
        </div>
        <button 
          onClick={() => showAppNotification('SafeTix Help: Present your verified barcode or QR pass at any gate turnstile. Screenshots cannot be scanned.', 'SafeTix Turnstile Entry')}
          className="text-xs font-semibold text-white/80 hover:text-white cursor-pointer"
        >
          Help
        </button>
      </div>

      {/* Tabs if user has tickets */}
      {tickets.length > 0 && (
        <div className="flex border-b border-white/10 px-4 bg-[#15171c]">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`py-3 px-4 font-bold text-xs border-b-2 transition ${
              activeTab === 'upcoming'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            Upcoming ({tickets.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`py-3 px-4 font-bold text-xs border-b-2 transition ${
              activeTab === 'past'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            Past Events (0)
          </button>
        </div>
      )}

      {/* Main Content Area */}
      {tickets.length === 0 || (!currentUser && tickets.length === 0) ? (
        /* Empty / Signed Out State matching IMG_6275 */
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
          {/* Layered Phones & Ticket Graphic Illustration matching IMG_6275 */}
          <div className="relative w-44 h-44 mb-8 flex items-center justify-center">
            {/* Background floating ticket element */}
            <div className="absolute w-28 h-40 bg-gradient-to-tr from-blue-700 to-blue-500 rounded-2xl rotate-12 shadow-2xl border border-white/20 flex flex-col p-2.5 opacity-90">
              <div className="w-full h-8 bg-white/20 rounded-lg mb-2 flex items-center justify-center">
                <span className="text-[9px] font-black text-white italic">TICKET</span>
              </div>
              <div className="flex-1 border border-dashed border-white/40 rounded-lg flex items-center justify-center">
                <span className="text-2xl text-white">★</span>
              </div>
            </div>

            {/* Foreground angled phone frame */}
            <div className="absolute w-28 h-44 bg-[#1e222d] border-2 border-white/90 rounded-2xl -rotate-12 shadow-2xl flex flex-col p-2 z-10">
              <div className="w-8 h-1 bg-white/60 rounded-full mx-auto mb-2"></div>
              {/* Phone screen ticket card */}
              <div className="flex-1 bg-gradient-to-b from-[#024ddf] to-[#012877] rounded-lg p-2 flex flex-col items-center justify-between text-white">
                <span className="text-[8px] font-black italic tracking-tighter">ticketmaster</span>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-lg">★</span>
                </div>
                {/* Barcode representation */}
                <div className="w-full flex justify-between gap-[1px] h-3 bg-white/30 rounded p-[1px]">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={i} className="flex-1 bg-white"></div>
                  ))}
                </div>
              </div>
              <div className="w-2.5 h-2.5 rounded-full border border-white/40 mx-auto mt-1.5"></div>
            </div>

            {/* Accent geometric lines matching the graphic */}
            <div className="absolute -left-2 bottom-6 w-12 h-2.5 bg-blue-600 rounded-sm -z-0"></div>
            <div className="absolute -right-2 top-16 w-14 h-2.5 bg-white/90 rounded-sm -z-0"></div>
          </div>

          {/* Heading matching IMG_6275 */}
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white max-w-xs uppercase leading-tight mb-2">
            Sign In To See Your Upcoming Events
          </h2>

          {/* Subtitle matching IMG_6275 */}
          <p className="text-xs sm:text-sm text-white/60 max-w-xs mb-8">
            Your tickets will display here once you are signed into your account.
          </p>

          {/* Large Blue Sign In Button matching IMG_6275 */}
          <button
            onClick={onOpenSignIn}
            className="w-full max-w-xs py-3.5 px-6 rounded-xl bg-[#024ddf] hover:bg-[#0056e0] active:scale-[0.98] text-white font-bold text-sm shadow-xl shadow-blue-900/40 transition"
          >
            Sign In
          </button>
        </div>
      ) : (
        /* Populated Tickets List with interactive SafeTix passes */
        <div className="p-4 space-y-4">
          <div className="bg-blue-950/40 border border-blue-500/30 rounded-2xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-white">SafeTix™ Active Passes</p>
              <p className="text-white/60">Tap any ticket to open turnstile scannable barcode.</p>
            </div>
          </div>

          {tickets.map((ticket) => (
            <div 
              key={ticket.ticketId}
              onClick={() => onOpenTicketPass(ticket)}
              className="bg-[#1c1e24] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition cursor-pointer group shadow-lg"
            >
              {/* Event Image & Header */}
              <div className="relative aspect-[16/7] bg-black">
                <img 
                  src={ticket.event.identity.image_url} 
                  alt={ticket.event.identity.event_title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1e24] via-transparent to-black/60 flex flex-col justify-between p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-300 bg-blue-900/80 px-2 py-0.5 rounded backdrop-blur-sm">
                      Verified SafeTix
                    </span>
                    <span className="text-[11px] font-semibold text-white/90">
                      {ticket.orderId}
                    </span>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-base text-white line-clamp-1">
                    {ticket.event.identity.event_title}
                  </h3>
                  <p className="text-xs text-white/70 flex items-center gap-1.5 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>{ticket.event.date_time.full_date_display}</span>
                  </p>
                  <p className="text-xs text-white/60 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-white/40" />
                    <span>{ticket.event.location.venue_name} • {ticket.event.location.city}</span>
                  </p>
                </div>

                {/* Seat Details Grid */}
                <div className="grid grid-cols-4 gap-2 py-2 px-3 bg-[#121212] rounded-xl text-center border border-white/5">
                  <div>
                    <span className="text-[10px] text-white/50 block font-semibold">SEC</span>
                    <span className="text-xs font-black text-white">{ticket.section.replace('SEC-', '')}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/50 block font-semibold">ROW</span>
                    <span className="text-xs font-black text-white">{ticket.row}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/50 block font-semibold">SEAT</span>
                    <span className="text-xs font-black text-white">{ticket.seatNumber.replace('Seat ', '')}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/50 block font-semibold">GATE</span>
                    <span className="text-xs font-black text-blue-400">{ticket.gate || '1'}</span>
                  </div>
                </div>

                {/* View Barcode Action */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenTicketPass(ticket);
                  }}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white flex items-center justify-center gap-2 shadow-md transition"
                >
                  <QrCode className="w-4 h-4" />
                  <span>View Barcode & Turnstile Pass</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
