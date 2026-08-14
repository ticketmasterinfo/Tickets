import React, { useState } from 'react';
import { 
  X, 
  QrCode, 
  Smartphone, 
  Share2, 
  DollarSign, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Info,
  Check
} from 'lucide-react';
import { PurchasedTicket } from '../../types';

interface MyTicketsModalProps {
  tickets: PurchasedTicket[];
  onClose: () => void;
}

export const MyTicketsModal: React.FC<MyTicketsModalProps> = ({
  tickets,
  onClose
}) => {
  const [activeTicketIndex, setActiveTicketIndex] = useState(0);
  const [copiedTransfer, setCopiedTransfer] = useState(false);
  const [walletAdded, setWalletAdded] = useState(false);

  if (!tickets.length) {
    return (
      <div 
        id="my-tickets-modal-backdrop"
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center shadow-2xl border border-gray-200 space-y-4">
          <div className="w-16 h-16 bg-blue-50 text-[#024ddf] rounded-full flex items-center justify-center mx-auto">
            <Smartphone className="w-8 h-8" />
          </div>
          <h3 className="type-kilimanjaro font-black text-gray-900">
            No Active Tickets Found
          </h3>
          <p className="type-rainier text-gray-500">
            You don&apos;t have any upcoming event tickets in your account yet. Explore concerts, sports, and theater shows to reserve your seats!
          </p>
          <button
            onClick={onClose}
            className="w-full bg-[#024ddf] hover:bg-[#0139a7] text-white font-bold py-3 rounded-xl transition-colors"
          >
            Explore Live Events
          </button>
        </div>
      </div>
    );
  }

  const currentTicket = tickets[activeTicketIndex] || tickets[0];

  const handleWalletAdd = () => {
    setWalletAdded(true);
    setTimeout(() => setWalletAdded(false), 3000);
  };

  const handleTransfer = () => {
    setCopiedTransfer(true);
    setTimeout(() => setCopiedTransfer(false), 3000);
  };

  return (
    <div 
      id="my-tickets-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div 
        id="my-tickets-container"
        className="bg-[#121212] text-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-800 my-auto relative animate-in zoom-in-95"
      >
        {/* Top Control Bar */}
        <div className="p-4 flex items-center justify-between border-b border-gray-800 bg-[#1a1a1a]">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-black italic uppercase tracking-tight text-white">
              ticket<span className="text-[#ffb932]">master</span>
            </span>
            <span className="bg-[#024ddf] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
              SafeTix
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg"
            aria-label="Close Tickets Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Ticket Navigation Tabs */}
        {tickets.length > 1 && (
          <div className="flex items-center justify-between px-4 py-2 bg-[#181818] border-b border-gray-800">
            <button
              onClick={() => setActiveTicketIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeTicketIndex === 0}
              className="p-1 rounded text-gray-400 hover:text-white disabled:opacity-30"
              aria-label="Previous Ticket"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-gray-300">
              Ticket {activeTicketIndex + 1} of {tickets.length}
            </span>
            <button
              onClick={() => setActiveTicketIndex((prev) => Math.min(tickets.length - 1, prev + 1))}
              disabled={activeTicketIndex === tickets.length - 1}
              className="p-1 rounded text-gray-400 hover:text-white disabled:opacity-30"
              aria-label="Next Ticket"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* DIGITAL PASS BODY */}
        <div className="p-5 space-y-5">
          
          {/* Header Pass Banner */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/8] bg-gray-900 border border-gray-700 shadow-inner">
            <img 
              src={currentTicket.event.identity.image_url} 
              alt={currentTicket.event.identity.event_title}
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent"></div>
            
            <div className="absolute bottom-3 left-3 right-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#ffb932] block">
                {currentTicket.event.identity.category} &bull; Verified Mobile Pass
              </span>
              <h3 className="type-blanc font-black text-white leading-tight line-clamp-1">
                {currentTicket.event.identity.event_title}
              </h3>
            </div>
          </div>

          {/* Seat Grid Block */}
          <div className="grid grid-cols-3 gap-2 bg-[#1a1a1a] p-3 rounded-xl border border-gray-800 text-center">
            <div className="border-r border-gray-800 pr-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase block">SECTION</span>
              <span className="text-base font-black text-white">{currentTicket.section}</span>
            </div>
            <div className="border-r border-gray-800 px-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase block">ROW</span>
              <span className="text-base font-black text-white">{currentTicket.row}</span>
            </div>
            <div className="pl-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase block">SEAT</span>
              <span className="text-base font-black text-[#ffb932]">
                {currentTicket.seatNumber.split('Seat')[1] || currentTicket.seatNumber}
              </span>
            </div>
          </div>

          {/* DYNAMIC ANIMATED SAFETIX BARCODE */}
          <div className="bg-white text-gray-900 rounded-2xl p-5 text-center shadow-lg relative overflow-hidden">
            {/* Animated SafeTix scanning beam */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#024ddf] to-transparent animate-pulse top-3"></div>

            <div className="space-y-1 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#024ddf]">
                TICKETMASTER SAFETIX &bull; VALID ENTRY
              </span>
              <p className="text-xs text-gray-500 font-medium">
                Hold near scanner at entry turnstile
              </p>
            </div>

            {/* Visual Barcode Bars */}
            <div className="py-2 flex items-center justify-center space-x-1 overflow-hidden h-20 bg-gray-50 rounded-lg border border-gray-200">
              {[3, 1, 4, 2, 5, 2, 1, 4, 3, 2, 6, 2, 1, 4, 3, 2, 5, 1, 3, 2, 4, 1, 5, 2, 3, 1, 4, 2].map((w, i) => (
                <div 
                  key={i} 
                  className={`bg-gray-900 h-16 rounded-xs ${w === 1 ? 'w-0.5' : w === 2 ? 'w-1' : w === 3 ? 'w-1.5' : w === 4 ? 'w-2' : 'w-2.5'}`}
                />
              ))}
            </div>

            {/* Dynamic Numeric Code & Refresh Notice */}
            <div className="mt-2 text-xs font-mono font-bold tracking-widest text-gray-700">
              {currentTicket.barcode}
            </div>
            <div className="text-[10px] text-gray-400 flex items-center justify-center space-x-1 mt-1">
              <ShieldCheck className="w-3 h-3 text-green-600" />
              <span>Dynamic barcode updates every 15s. Screenshots not accepted.</span>
            </div>
          </div>

          {/* Event Details Micro-list */}
          <div className="bg-[#1a1a1a] rounded-xl p-3.5 border border-gray-800 space-y-2 text-xs text-gray-300">
            <div className="flex items-center space-x-2">
              <Calendar className="w-3.5 h-3.5 text-[#024ddf]" />
              <span>{currentTicket.event.date_time.full_date_display}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-3.5 h-3.5 text-[#ffb932]" />
              <span>Doors open at {currentTicket.event.date_time.doors_time} PM</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-[#00875a]" />
              <span>{currentTicket.event.location.venue_name} &bull; {currentTicket.event.location.full_address}</span>
            </div>
          </div>

          {/* Actions: Apple Wallet, Transfer, Sell */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleWalletAdd}
              className="w-full bg-[#1e1e1e] hover:bg-[#282828] border border-gray-700 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors"
            >
              {walletAdded ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-xs">Pass Added to Wallet!</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-4 h-4 text-white" />
                  <span className="text-xs font-semibold">Add to Apple / Google Wallet</span>
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleTransfer}
                className="bg-[#1e1e1e] hover:bg-[#282828] border border-gray-700 text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-blue-400" />
                <span>{copiedTransfer ? 'Transfer Link Ready!' : 'Transfer Ticket'}</span>
              </button>

              <button
                onClick={() => alert('Official Verified Resale listing tool opened for this seat.')}
                className="bg-[#1e1e1e] hover:bg-[#282828] border border-gray-700 text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
              >
                <DollarSign className="w-3.5 h-3.5 text-green-400" />
                <span>Sell on TM Resale</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
