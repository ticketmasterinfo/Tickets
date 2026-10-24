import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  ShieldCheck, 
  Maximize2, 
  Minimize2, 
  RotateCw, 
  Sparkles, 
  CheckCircle2, 
  QrCode as QrCodeIcon,
  Barcode as BarcodeIcon,
  Smartphone,
  ExternalLink,
  Copy
} from 'lucide-react';
import { PurchasedTicket } from '../../types';
import { TicketmasterLogo } from '../Common/TicketmasterLogo';
import { generateTicketVerificationUrl } from '../../utils/ticketUrlHelper';

interface TicketQRCodeProps {
  ticket: PurchasedTicket;
  showToggle?: boolean;
  onOpenScannedPass?: (ticket: PurchasedTicket) => void;
}

export const TicketQRCode: React.FC<TicketQRCodeProps> = ({ 
  ticket,
  showToggle = true,
  onOpenScannedPass
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [displayMode, setDisplayMode] = useState<'qr' | 'barcode'>('qr');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isCopiedUrl, setIsCopiedUrl] = useState<boolean>(false);

  // Generate the full verifiable URL for this exact event & ticket
  const verificationUrl = generateTicketVerificationUrl(ticket);

  // Generate QR Code data URL
  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(verificationUrl, {
      width: 320,
      margin: 1,
      errorCorrectionLevel: 'M',
      color: {
        dark: '#111827',
        light: '#ffffff'
      }
    })
      .then((url) => {
        if (isMounted) setQrDataUrl(url);
      })
      .catch((err) => {
        console.error('Failed to generate SafeTix QR Code', err);
      });

    return () => {
      isMounted = false;
    };
  }, [ticket.ticketId, ticket.barcode, verificationUrl]);

  const handleCopyCode = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(ticket.barcode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleCopyScanUrl = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(verificationUrl);
      setIsCopiedUrl(true);
      setTimeout(() => setIsCopiedUrl(false), 2000);
    }
  };

  const handleOpenDirect = () => {
    if (onOpenScannedPass) {
      onOpenScannedPass(ticket);
    } else if (typeof window !== 'undefined') {
      window.open(verificationUrl, '_blank');
    }
  };

  return (
    <div className="w-full">
      {/* Container simulating high-security digital pass */}
      <div 
        className="bg-white text-gray-900 rounded-2xl p-4 sm:p-5 text-center shadow-lg relative overflow-hidden border border-gray-200"
      >
        {/* SafeTix Verified security indicator bar */}
        <div className="absolute inset-x-0 h-1 bg-[#024ddf] top-0" />

        {/* Header with SafeTix Brand & Scanner Status */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 mb-3">
          <div className="flex items-center space-x-1.5">
            <TicketmasterLogo className="h-4 w-auto" color="#024ddf" />
            <span className="bg-[#024ddf]/10 text-[#024ddf] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#024ddf]" />
              SafeTix™ Pass
            </span>
          </div>

          {/* View Mode Switcher (QR vs Barcode) */}
          {showToggle && (
            <div className="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200">
              <button
                type="button"
                onClick={() => setDisplayMode('qr')}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                  displayMode === 'qr' 
                    ? 'bg-white text-[#024ddf] shadow-xs' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                title="Show 2D Optical QR Pass"
              >
                <QrCodeIcon className="w-3 h-3" />
                <span>QR</span>
              </button>
              <button
                type="button"
                onClick={() => setDisplayMode('barcode')}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                  displayMode === 'barcode' 
                    ? 'bg-white text-[#024ddf] shadow-xs' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                title="Show 1D Barcode"
              >
                <BarcodeIcon className="w-3 h-3" />
                <span>Barcode</span>
              </button>
            </div>
          )}
        </div>

        {/* 1. QR CODE PASS VIEW */}
        {displayMode === 'qr' ? (
          <div className="flex flex-col items-center justify-center my-1 relative">
            
            {/* High-Contrast QR Code Display Container */}
            <div className="relative p-2.5 bg-white rounded-xl border-2 border-gray-900/10 shadow-inner group">
              
              {qrDataUrl ? (
                <div className="relative">
                  <img 
                    src={qrDataUrl} 
                    alt={`SafeTix Entry Pass QR Code for ${ticket.event.identity.event_title}`} 
                    className="w-48 h-48 sm:w-52 sm:h-52 object-contain rounded-md"
                  />
                  
                  {/* Central Circular Ticketmaster Brand Badge */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-[#024ddf] border-2 border-white shadow-md flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                        <path d="M10.736 15.86c0-.522.08-.993.159-1.307l1.286-5.88h3.154l.554-2.562h-3.155l.87-4-3.785 1.23-.606 2.77H6.667l-.556 2.561h2.552l-.998 4.55c-.237 1.07-.45 2.09-.45 3.135 0 2.59 1.682 3.532 4.073 3.532.607 0 1.288-.186 1.895-.316l.604-2.72a4.716 4.716 0 0 1-1.71.314c-.789 0-1.34-.496-1.34-1.307z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-48 h-48 sm:w-52 sm:h-52 flex flex-col items-center justify-center bg-gray-50 rounded-lg text-gray-400">
                  <RotateCw className="w-6 h-6 animate-spin text-[#024ddf] mb-2" />
                  <span className="text-xs">Generating Scannable Pass...</span>
                </div>
              )}

              {/* Tap to Fullscreen Button */}
              <button
                type="button"
                onClick={() => setIsFullscreen(true)}
                className="absolute bottom-2 right-2 bg-gray-900/80 hover:bg-gray-900 text-white p-1.5 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
                title="Enlarge QR Code for turnstile scanning"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Turnstile scanning instruction & live dynamic refresh */}
            <div className="mt-3 flex items-center justify-center space-x-2 text-xs font-semibold text-gray-700">
              <Smartphone className="w-4 h-4 text-[#024ddf] shrink-0" />
              <span>Scan with any phone camera or turnstile reader</span>
            </div>

            {/* Anti-Screenshot Security Banner */}
            <div className="mt-2 flex items-center justify-center space-x-2 text-[11px] text-gray-500 bg-gray-50 border border-gray-200/80 px-3 py-1.5 rounded-full w-full max-w-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
              <span className="font-mono text-gray-600 font-bold">Encodes this exact concert</span>
              <span className="text-gray-300">&bull;</span>
              <span className="text-emerald-600 font-bold">
                Active & Verified
              </span>
            </div>

            {/* Interactive Preview / Test Scan Link */}
            <div className="mt-2.5 flex items-center space-x-2 w-full max-w-xs justify-center">
              <button
                type="button"
                onClick={handleOpenDirect}
                className="flex-1 bg-[#024ddf]/10 hover:bg-[#024ddf]/20 text-[#024ddf] text-[11px] font-bold py-1.5 px-2.5 rounded-lg transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                title="Simulate scanning this QR code"
              >
                <span>Test Scan Pass Preview</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </button>
              <button
                type="button"
                onClick={handleCopyScanUrl}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-medium py-1.5 px-2.5 rounded-lg transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                title="Copy the scannable URL link"
              >
                {isCopiedUrl ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-green-600" />
                    <span className="text-green-600 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>

          </div>
        ) : (
          /* 2. BARCODE VIEW FALLBACK */
          <div className="py-2">
            <div className="py-3 flex items-center justify-center space-x-1 overflow-hidden h-16 bg-gray-50 rounded-lg border border-gray-200">
              {[3, 1, 4, 2, 5, 2, 1, 4, 3, 2, 6, 2, 1, 4, 3, 2, 5, 1, 3, 2, 4, 1, 5, 2, 3, 1, 4, 2].map((w, i) => (
                <div 
                  key={i} 
                  className={`bg-gray-900 h-12 rounded-xs ${w === 1 ? 'w-0.5' : w === 2 ? 'w-1' : w === 3 ? 'w-1.5' : w === 4 ? 'w-2' : 'w-2.5'}`}
                />
              ))}
            </div>
            <div className="mt-2 text-xs text-gray-500 font-medium">
              1D Turnstile Laser Barcode Backup
            </div>
          </div>
        )}

        {/* Dynamic Numeric Code & Authentication Meta */}
        <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
          <div className="text-left">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">Entry Pass Code</span>
            <button
              type="button"
              onClick={handleCopyCode}
              className="font-mono font-bold tracking-wider text-gray-800 hover:text-[#024ddf] transition-colors flex items-center gap-1 cursor-pointer"
              title="Click to copy barcode"
            >
              <span>{ticket.barcode.replace(/(\d{4})/g, '$1 ').trim()}</span>
              {isCopied && <CheckCircle2 className="w-3.5 h-3.5 text-green-600 inline" />}
            </button>
          </div>

          <div className="text-right">
            <div className="text-[10px] text-green-700 font-bold flex items-center justify-end space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600 shrink-0" />
              <span>Verified Entry</span>
            </div>
            <span className="text-[10px] text-gray-400 block font-mono">
              Gate: {ticket.gate || 'Turnstile A'}
            </span>
          </div>
        </div>

      </div>

      {/* FULLSCREEN ZOOM MODAL (For effortless turnstile scanning) */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in-95"
          onClick={() => setIsFullscreen(false)}
        >
          <div 
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
              aria-label="Close fullscreen QR pass"
            >
              <Minimize2 className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center space-x-2 pt-2">
              <TicketmasterLogo className="h-5 w-auto" color="#024ddf" />
              <span className="bg-[#024ddf] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
                SafeTix™
              </span>
            </div>

            <div>
              <h4 className="text-base font-extrabold text-gray-900 leading-tight">
                {ticket.event.identity.event_title}
              </h4>
              <p className="text-xs text-gray-500 font-semibold mt-0.5">
                Sec {ticket.section} &bull; Row {ticket.row} &bull; Seat {ticket.seatNumber}
              </p>
            </div>

            {/* High-res Enlarged QR Code */}
            <div className="relative inline-block p-4 bg-white rounded-2xl border-2 border-gray-900 shadow-md">
              <img 
                src={qrDataUrl} 
                alt="SafeTix Fullscreen QR Code" 
                className="w-64 h-64 sm:w-72 sm:h-72 object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-[#024ddf] border-3 border-white shadow-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                    <path d="M10.736 15.86c0-.522.08-.993.159-1.307l1.286-5.88h3.154l.554-2.562h-3.155l.87-4-3.785 1.23-.606 2.77H6.667l-.556 2.561h2.552l-.998 4.55c-.237 1.07-.45 2.09-.45 3.135 0 2.59 1.682 3.532 4.073 3.532.607 0 1.288-.186 1.895-.316l.604-2.72a4.716 4.716 0 0 1-1.71.314c-.789 0-1.34-.496-1.34-1.307z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="text-xs font-mono font-bold tracking-widest text-gray-800">
              {ticket.barcode.replace(/(\d{4})/g, '$1 ').trim()}
            </div>

            <div className="bg-blue-50 border border-blue-200 text-[#024ddf] text-xs py-2 px-3 rounded-xl font-medium">
              Scanning URL: Opens this verified concert pass on any phone or scanner
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleOpenDirect}
                className="flex-1 bg-[#024ddf] hover:bg-[#0139a7] text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Preview Scanned Event</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsFullscreen(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
