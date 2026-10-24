import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  ExternalLink, 
  X, 
  Info,
  Smartphone,
  Copy,
  ChevronRight,
  BookmarkCheck
} from 'lucide-react';
import { EventItem, PurchasedTicket } from '../../types';
import { TicketmasterLogo } from '../Common/TicketmasterLogo';

interface ScannedPassModalProps {
  event: EventItem;
  ticket: PurchasedTicket;
  onClose: () => void;
  onViewEventDetails: (event: EventItem) => void;
}

export const ScannedPassModal: React.FC<ScannedPassModalProps> = ({
  event,
  ticket,
  onClose,
  onViewEventDetails
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [walletAdded, setWalletAdded] = useState(false);

  const handleShare = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleAddToWallet = () => {
    setWalletAdded(true);
    setTimeout(() => setWalletAdded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Outer Card Container */}
      <div 
        className="bg-[#121212] text-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-gray-800 relative flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black text-white p-2 rounded-full backdrop-blur-md border border-white/10 transition-colors cursor-pointer"
          aria-label="Close verified pass"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto custom-scrollbar flex-1 pb-6">
          
          {/* 1. Official Verification Status Banner */}
          <div className="bg-gradient-to-r from-emerald-950 via-[#00875a]/30 to-emerald-950 p-4 border-b border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 animate-pulse">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                    SafeTix™ Verified Entry Pass
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="text-[11px] text-emerald-200/80 font-medium">
                  Official ticket valid for admission &bull; SafeTix™ Encrypted
                </p>
              </div>
            </div>
            <TicketmasterLogo className="h-4 w-auto hidden sm:block opacity-90" color="#ffffff" />
          </div>

          {/* 2. Concert / Event Hero Billboard */}
          <div className="relative aspect-[21/9] sm:aspect-[16/7] w-full overflow-hidden bg-gray-900">
            <img 
              src={event.identity.banner_url || event.identity.image_url} 
              alt={event.identity.event_title}
              className="w-full h-full object-cover object-center filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />
            
            {/* Category / Genre Badge */}
            <div className="absolute top-3 left-4 flex items-center space-x-2">
              <span className="bg-[#024ddf] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md tracking-wider">
                {event.identity.category}
              </span>
              {event.identity.subgenre && (
                <span className="bg-black/60 backdrop-blur-md text-gray-200 text-[10px] font-bold uppercase px-2 py-1 rounded-full border border-white/10">
                  {event.identity.subgenre}
                </span>
              )}
            </div>

            {/* Concert / Event Title Overlay */}
            <div className="absolute bottom-3 left-4 right-4">
              {event.identity.main_performer && event.identity.main_performer !== event.identity.event_title && (
                <p className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-0.5">
                  {event.identity.main_performer}
                </p>
              )}
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md">
                {event.identity.event_title}
              </h2>
            </div>
          </div>

          {/* 3. Event Schedule & Venue Information Card */}
          <div className="px-4 sm:px-6 pt-4 space-y-3">
            
            <div className="bg-[#1c1c1c] rounded-2xl p-4 border border-gray-800 space-y-2.5">
              {/* Date & Time */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#024ddf]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4 text-[#024ddf]" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">
                    {event.date_time.full_date_display || event.date_time.exact_date}
                  </div>
                  <div className="text-xs text-gray-400 flex items-center space-x-2 mt-0.5">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <span>Show: {event.date_time.start_time || '7:30 PM'}</span>
                    <span>&bull;</span>
                    <span>Doors: {event.date_time.doors_time || '6:00 PM'}</span>
                  </div>
                </div>
              </div>

              {/* Venue & Location */}
              <div className="flex items-start space-x-3 pt-2 border-t border-gray-800/80">
                <div className="w-8 h-8 rounded-lg bg-[#024ddf]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#024ddf]" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-extrabold text-white">
                    {event.location.venue_name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {event.location.full_address || `${event.location.city}, ${event.location.state}`}
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Ticket Admission Credentials Grid */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#222222] rounded-2xl p-4 border border-gray-700/80 shadow-inner">
              <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 mb-2">
                <span className="uppercase tracking-wider">Admission Details</span>
                <span className="text-[#ffb932]">{ticket.zoneName}</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-black/60 rounded-xl p-2.5 border border-white/5">
                  <div className="text-[10px] font-bold text-gray-400 uppercase">SEC</div>
                  <div className="text-base sm:text-lg font-black text-white mt-0.5 truncate">
                    {ticket.section.replace('SEC-', '')}
                  </div>
                </div>

                <div className="bg-black/60 rounded-xl p-2.5 border border-white/5">
                  <div className="text-[10px] font-bold text-gray-400 uppercase">ROW</div>
                  <div className="text-base sm:text-lg font-black text-white mt-0.5">
                    {ticket.row}
                  </div>
                </div>

                <div className="bg-black/60 rounded-xl p-2.5 border border-white/5">
                  <div className="text-[10px] font-bold text-[#ffb932] uppercase">SEAT</div>
                  <div className="text-base sm:text-lg font-black text-[#ffb932] mt-0.5">
                    {ticket.seatNumber.replace('Seat ', '')}
                  </div>
                </div>

                <div className="bg-black/60 rounded-xl p-2.5 border border-white/5">
                  <div className="text-[10px] font-bold text-emerald-400 uppercase">GATE</div>
                  <div className="text-xs sm:text-sm font-black text-emerald-400 mt-1 truncate">
                    {ticket.gate || 'Turnstile 1'}
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Live Turnstile Verification & Barcode Card */}
            <div className="bg-white text-gray-900 rounded-2xl p-4 text-center shadow-lg relative overflow-hidden border border-gray-200">
              
              {/* Dynamic Scanning Line */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#024ddf] to-transparent animate-pulse top-0" />
              
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
                <div className="flex items-center space-x-1.5">
                  <TicketmasterLogo className="h-3.5 w-auto" color="#024ddf" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#024ddf]">
                    SafeTix™ Turnstile Token
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-emerald-600 font-bold text-[10px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Turnstile Ready</span>
                </div>
              </div>

              {/* 1D Laser Barcode Backup */}
              <div className="py-1 flex items-center justify-center space-x-1 overflow-hidden h-14 bg-gray-50 rounded-lg border border-gray-200">
                {[3, 1, 4, 2, 5, 2, 1, 4, 3, 2, 6, 2, 1, 4, 3, 2, 5, 1, 3, 2, 4, 1, 5, 2, 3, 1, 4, 2].map((w, i) => (
                  <div 
                    key={i} 
                    className={`bg-gray-900 h-10 rounded-xs ${w === 1 ? 'w-0.5' : w === 2 ? 'w-1' : w === 3 ? 'w-1.5' : w === 4 ? 'w-2' : 'w-2.5'}`}
                  />
                ))}
              </div>

              <div className="mt-2 text-xs font-mono font-bold tracking-widest text-gray-900">
                {ticket.barcode.replace(/(\d{4})/g, '$1 ').trim()}
              </div>

              <div className="mt-2 text-[11px] text-gray-500 flex items-center justify-between pt-2 border-t border-gray-100">
                <span>Pass: <strong className="text-gray-800">#{ticket.ticketId}</strong></span>
                <span>Attendee: <strong className="text-gray-800">{ticket.attendeeName}</strong></span>
              </div>
            </div>

            {/* 6. Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {/* Add to Apple / Google Wallet */}
              <button
                type="button"
                onClick={handleAddToWallet}
                className="flex items-center justify-center space-x-1.5 bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white py-2.5 px-3 rounded-xl text-xs font-bold transition-all border border-gray-800 cursor-pointer"
              >
                {walletAdded ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Added to Wallet!</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-4 h-4 text-gray-300" />
                    <span>Add to Wallet</span>
                  </>
                )}
              </button>

              {/* Share / Copy Verification Link */}
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center justify-center space-x-1.5 bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white py-2.5 px-3 rounded-xl text-xs font-bold transition-all border border-gray-800 cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-gray-300" />
                    <span>Share Pass Link</span>
                  </>
                )}
              </button>
            </div>

            {/* 7. Primary Action: View Full Event Details & Concert Lineup */}
            <button
              type="button"
              onClick={() => {
                onViewEventDetails(event);
                onClose();
              }}
              className="w-full bg-[#024ddf] hover:bg-[#0139a7] text-white py-3.5 px-4 rounded-xl text-sm font-extrabold shadow-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer mt-2"
            >
              <span>View Full Concert Details, Lineup & Map</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* 8. Close & Back to Ticketmaster Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-transparent hover:bg-white/5 text-gray-400 hover:text-white py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              ← Back to Ticketmaster Marketplace
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};
