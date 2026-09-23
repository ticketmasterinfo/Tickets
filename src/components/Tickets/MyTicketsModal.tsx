import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Share2, 
  DollarSign, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  Check,
  Download,
  Printer,
  FileText,
  AlertCircle
} from 'lucide-react';
import { PurchasedTicket } from '../../types';
import { downloadTicketPDF, downloadAllTicketsPDF, printTicket } from '../../utils/ticketDownloader';
import { TicketmasterLogo } from '../Common/TicketmasterLogo';

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
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

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
            className="w-full bg-[#024ddf] hover:bg-[#0139a7] text-white font-bold py-3 rounded-xl transition-colors cursor-pointer"
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

  const handleDownloadCurrentTicket = () => {
    setDownloadingId(currentTicket.ticketId);
    downloadTicketPDF(currentTicket);
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccess(false);
    }, 2500);
  };

  const handleDownloadAll = () => {
    setDownloadingId('ALL');
    downloadAllTicketsPDF(tickets);
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccess(false);
    }, 2500);
  };

  const handlePrintCurrentTicket = () => {
    printTicket(currentTicket);
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
          <div className="flex items-center space-x-2.5">
            <TicketmasterLogo className="h-5 sm:h-6 w-auto" color="#ffffff" />
            <span className="bg-[#024ddf] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
              SafeTix
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg cursor-pointer"
            aria-label="Close Tickets Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Ticket Navigation Bar */}
        {tickets.length > 1 && (
          <div className="flex items-center justify-between px-4 py-2 bg-[#181818] border-b border-gray-800">
            <button
              onClick={() => setActiveTicketIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeTicketIndex === 0}
              className="p-1 rounded text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer"
              aria-label="Previous Ticket"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-gray-300">
                Ticket {activeTicketIndex + 1} of {tickets.length}
              </span>
              <button
                onClick={handleDownloadAll}
                className="text-[11px] text-[#ffb932] hover:underline font-bold ml-2 flex items-center gap-1 cursor-pointer"
                title="Download all tickets in one PDF"
              >
                <Download className="w-3 h-3" />
                <span>Download All ({tickets.length})</span>
              </button>
            </div>
            <button
              onClick={() => setActiveTicketIndex((prev) => Math.min(tickets.length - 1, prev + 1))}
              disabled={activeTicketIndex === tickets.length - 1}
              className="p-1 rounded text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer"
              aria-label="Next Ticket"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* DIGITAL PASS BODY */}
        <div className="p-5 space-y-4">
          
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
              <p className="text-xs text-blue-400 font-semibold truncate">
                {currentTicket.event.identity.main_performer}
              </p>
            </div>
          </div>

          {/* Seat Grid Block */}
          <div className="grid grid-cols-4 gap-1.5 bg-[#1a1a1a] p-3 rounded-xl border border-gray-800 text-center">
            <div className="border-r border-gray-800 pr-1">
              <span className="text-[9px] font-bold text-gray-400 uppercase block">SEC</span>
              <span className="text-sm sm:text-base font-black text-white truncate">{currentTicket.section}</span>
            </div>
            <div className="border-r border-gray-800 px-1">
              <span className="text-[9px] font-bold text-gray-400 uppercase block">ROW</span>
              <span className="text-sm sm:text-base font-black text-white">{currentTicket.row}</span>
            </div>
            <div className="border-r border-gray-800 px-1">
              <span className="text-[9px] font-bold text-gray-400 uppercase block">SEAT</span>
              <span className="text-sm sm:text-base font-black text-[#ffb932]">
                {currentTicket.seatNumber.includes('Seat') ? currentTicket.seatNumber.split('Seat')[1].trim() : currentTicket.seatNumber}
              </span>
            </div>
            <div className="pl-1">
              <span className="text-[9px] font-bold text-gray-400 uppercase block">GATE</span>
              <span className="text-xs sm:text-sm font-black text-white truncate">
                {currentTicket.gate || 'Gate 1'}
              </span>
            </div>
          </div>

          {/* DYNAMIC ANIMATED SAFETIX BARCODE */}
          <div className="bg-white text-gray-900 rounded-2xl p-4 sm:p-5 text-center shadow-lg relative overflow-hidden">
            {/* Animated SafeTix scanning beam */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#024ddf] to-transparent animate-pulse top-3"></div>

            <div className="space-y-1 mb-2 flex flex-col items-center">
              <div className="flex items-center justify-center space-x-1.5">
                <TicketmasterLogo className="h-3.5 w-auto" color="#024ddf" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#024ddf]">
                  SAFETIX™ &bull; VALID ENTRY
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium">
                Hold near scanner at entry turnstile
              </p>
            </div>

            {/* Visual Barcode Bars */}
            <div className="py-2 flex items-center justify-center space-x-1 overflow-hidden h-16 bg-gray-50 rounded-lg border border-gray-200">
              {[3, 1, 4, 2, 5, 2, 1, 4, 3, 2, 6, 2, 1, 4, 3, 2, 5, 1, 3, 2, 4, 1, 5, 2, 3, 1, 4, 2].map((w, i) => (
                <div 
                  key={i} 
                  className={`bg-gray-900 h-12 rounded-xs ${w === 1 ? 'w-0.5' : w === 2 ? 'w-1' : w === 3 ? 'w-1.5' : w === 4 ? 'w-2' : 'w-2.5'}`}
                />
              ))}
            </div>

            {/* Dynamic Numeric Code & Refresh Notice */}
            <div className="mt-2 text-xs font-mono font-bold tracking-widest text-gray-700">
              {currentTicket.barcode}
            </div>
            <div className="text-[10px] text-gray-400 flex items-center justify-center space-x-1 mt-1">
              <ShieldCheck className="w-3 h-3 text-green-600 shrink-0" />
              <span>Verified Authentic • Order #{currentTicket.orderId}</span>
            </div>
          </div>

          {/* Event Details Micro-list */}
          <div className="bg-[#1a1a1a] rounded-xl p-3.5 border border-gray-800 space-y-1.5 text-xs text-gray-300">
            <div className="flex items-center space-x-2">
              <Calendar className="w-3.5 h-3.5 text-[#024ddf] shrink-0" />
              <span className="truncate">{currentTicket.event.date_time.full_date_display}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-3.5 h-3.5 text-[#ffb932] shrink-0" />
              <span>Doors open at {currentTicket.event.date_time.doors_time} PM ({currentTicket.event.date_time.time_zone})</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-[#00875a] shrink-0" />
              <span className="truncate">{currentTicket.event.location.venue_name} &bull; {currentTicket.event.location.city}, {currentTicket.event.location.state}</span>
            </div>
          </div>

          {/* DOWNLOAD & EXPORT ACTION BUTTONS */}
          <div className="space-y-2 pt-1">
            
            {/* Primary Download PDF Action */}
            <button
              id="download-ticket-pdf-btn"
              onClick={handleDownloadCurrentTicket}
              className="w-full bg-[#024ddf] hover:bg-[#0139a7] active:bg-[#012e85] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition-colors cursor-pointer"
            >
              {downloadingId === currentTicket.ticketId ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs">Generating Authentic e-Ticket PDF...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-[#ffb932]" />
                  <span className="text-xs text-[#ffb932]">e-Ticket PDF Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-white" />
                  <span className="text-xs">Download e-Ticket (PDF)</span>
                </>
              )}
            </button>

            {/* Secondary Action Grid: Print Pass + Apple/Google Wallet */}
            <div className="grid grid-cols-2 gap-2">
              <button
                id="print-ticket-btn"
                onClick={handlePrintCurrentTicket}
                className="bg-[#1e1e1e] hover:bg-[#282828] border border-gray-700 text-white py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-gray-300" />
                <span>Print / Save Pass</span>
              </button>

              <button
                onClick={handleWalletAdd}
                className="bg-[#1e1e1e] hover:bg-[#282828] border border-gray-700 text-white py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                {walletAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400">Added to Wallet!</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-3.5 h-3.5 text-gray-300" />
                    <span>Add to Wallet</span>
                  </>
                )}
              </button>
            </div>

            {/* Tertiary Action Grid: Transfer + Resale */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleTransfer}
                className="bg-[#1e1e1e] hover:bg-[#282828] border border-gray-700 text-white py-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-blue-400" />
                <span>{copiedTransfer ? 'Link Copied!' : 'Transfer Ticket'}</span>
              </button>

              <button
                onClick={() => alert(`Official Verified Resale opened for Ticket #${currentTicket.ticketId}. You can set your price up to face value.`)}
                className="bg-[#1e1e1e] hover:bg-[#282828] border border-gray-700 text-white py-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <DollarSign className="w-3.5 h-3.5 text-green-400" />
                <span>Ticketmaster Resale</span>
              </button>
            </div>

            {/* Download All option if multiple tickets */}
            {tickets.length > 1 && (
              <button
                onClick={handleDownloadAll}
                className="w-full bg-[#181818] hover:bg-[#222222] border border-dashed border-gray-700 text-[#ffb932] py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Download All {tickets.length} Tickets in One PDF</span>
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
